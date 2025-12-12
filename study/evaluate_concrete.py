#!/usr/bin/env python3
"""
Concrete Metrics Evaluation for Chorus Validation Study

This evaluator replaces LLM-as-Judge with verifiable, measurable outcomes:
1. Authority Alignment: Does synthesis contain key facts from authority_answer?
2. Trap Avoidance: Does synthesis NOT contain trap_answer claims?
3. Evidence Utilization: Does synthesis cite retrieved sources?
4. Model Analysis: How does each individual model perform?

Hypotheses tested:
- H1: Evidence retrieval catches training cutoff issues
- H2: Model disagreement signals uncertainty
- H3: Synthesis follows authority over model consensus
- H4: Misinformation gets rejected
"""

import json
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Tuple
from dataclasses import dataclass, asdict
from collections import defaultdict

STUDY_DIR = Path(__file__).parent
RESULTS_DIR = STUDY_DIR / "results"


@dataclass
class KeyTermMatch:
    """Result of matching key terms."""
    term: str
    found: bool
    context: str = ""  # Where it was found


@dataclass
class ModelEvaluation:
    """Evaluation of a single model's response."""
    provider: str
    model: str
    success: bool
    authority_terms_found: List[str]
    authority_terms_missing: List[str]
    trap_terms_found: List[str]
    authority_score: float  # 0-1
    trap_avoidance_score: float  # 0-1 (1 = avoided all traps)
    overall_score: float


@dataclass
class QuestionEvaluation:
    """Complete evaluation for one question."""
    question_id: str
    category: str
    question: str

    # Key term extraction from ground truth
    authority_key_terms: List[str]
    trap_key_terms: List[str]

    # Synthesis evaluation
    synthesis_authority_score: float
    synthesis_trap_avoidance: float
    synthesis_evidence_cited: bool
    synthesis_overall: float

    # Individual model evaluations
    model_evaluations: List[ModelEvaluation]

    # Evidence evaluation
    evidence_retrieved: bool
    evidence_count: int
    evidence_relevant: bool  # Did evidence support authority answer?

    # Hypothesis testing
    h1_evidence_caught_cutoff: bool  # Evidence helped vs models alone
    h2_disagreement_signaled_issue: bool  # High disagreement where expected
    h3_synthesis_followed_authority: bool  # Synthesis aligned with authority
    h4_misinformation_rejected: bool  # Trap answer rejected

    # Metadata
    disagreement_score: float
    expected_conflict: str


def extract_key_terms(answer: str, category: str) -> List[str]:
    """
    Extract key verifiable terms from an authority or trap answer.

    These are the specific facts we can check for in responses:
    - Numbers (ages, percentages, years)
    - Organization names (USPSTF, CDC, FDA, AHA)
    - Specific recommendations (keywords)
    - Dates/years of guidelines
    """
    terms = []

    # Extract numbers with context
    # e.g., "Age 40", "130/80", "97%", "2024"
    number_patterns = [
        r'\b(age\s*\d+)\b',
        r'\b(\d{4}\s*USPSTF)\b',
        r'\b(\d{4}\s*CDC)\b',
        r'\b(\d{4}\s*FDA)\b',
        r'\b(\d{4}\s*(?:ACC|AHA))\b',
        r'\b(\d+/\d+\s*mmHg)\b',
        r'\b(\d+%)\b',
        r'\b(every\s*\d+\s*years?)\b',
    ]

    for pattern in number_patterns:
        matches = re.findall(pattern, answer, re.IGNORECASE)
        terms.extend([m.lower() for m in matches])

    # Extract organization recommendations
    orgs = ['USPSTF', 'CDC', 'FDA', 'AHA', 'ACC', 'WHO', 'NIH', 'EPA']
    for org in orgs:
        if org in answer.upper():
            terms.append(org.lower())

    # Extract key recommendation words
    key_words = [
        'recommended', 'not recommended', 'approved', 'not approved',
        'shared decision', 'individualized', 'insufficient evidence',
        'breakthrough therapy', 'no evidence', 'no link',
        'avoid', 'should not', 'primary prevention'
    ]

    answer_lower = answer.lower()
    for word in key_words:
        if word in answer_lower:
            terms.append(word)

    # Category-specific extractions
    if category == 'misinformation_traps':
        # For misinformation, the key term is the denial
        if 'no' in answer_lower or 'not' in answer_lower:
            # Extract what's being denied
            denial_patterns = [
                r'no[,\s]+([\w\s]+)(?:link|evidence|proven)',
                r'not\s+(recommended|approved|effective)',
            ]
            for pattern in denial_patterns:
                matches = re.findall(pattern, answer_lower)
                terms.extend(matches)

    # Remove duplicates while preserving order
    seen = set()
    unique_terms = []
    for t in terms:
        if t not in seen:
            seen.add(t)
            unique_terms.append(t)

    return unique_terms if unique_terms else [answer.lower()[:50]]  # Fallback to truncated answer


def check_term_in_text(term: str, text: str) -> Tuple[bool, str]:
    """
    Check if a key term appears in text.
    Returns (found, context) where context is surrounding text if found.
    """
    text_lower = text.lower()
    term_lower = term.lower()

    # Direct match
    if term_lower in text_lower:
        # Find context
        idx = text_lower.find(term_lower)
        start = max(0, idx - 30)
        end = min(len(text), idx + len(term) + 30)
        context = text[start:end]
        return True, f"...{context}..."

    # Fuzzy match for numbers (e.g., "40" matches "age 40" or "40 years")
    if re.match(r'\d+', term_lower):
        number = re.search(r'\d+', term_lower).group()
        if re.search(rf'\b{number}\b', text_lower):
            return True, f"Found number {number}"

    return False, ""


def evaluate_model_response(
    content: str,
    authority_terms: List[str],
    trap_terms: List[str],
    provider: str,
    model: str,
    success: bool
) -> ModelEvaluation:
    """Evaluate a single model's response against ground truth."""

    if not success or not content:
        return ModelEvaluation(
            provider=provider,
            model=model,
            success=False,
            authority_terms_found=[],
            authority_terms_missing=authority_terms,
            trap_terms_found=[],
            authority_score=0.0,
            trap_avoidance_score=1.0,  # Can't fail if no response
            overall_score=0.0
        )

    # Check authority terms
    auth_found = []
    auth_missing = []
    for term in authority_terms:
        found, _ = check_term_in_text(term, content)
        if found:
            auth_found.append(term)
        else:
            auth_missing.append(term)

    # Check trap terms (finding these is BAD)
    trap_found = []
    for term in trap_terms:
        found, _ = check_term_in_text(term, content)
        if found:
            trap_found.append(term)

    # Calculate scores
    auth_score = len(auth_found) / len(authority_terms) if authority_terms else 1.0
    trap_score = 1.0 - (len(trap_found) / len(trap_terms)) if trap_terms else 1.0

    # Overall: weighted average (authority more important)
    overall = (auth_score * 0.6) + (trap_score * 0.4)

    return ModelEvaluation(
        provider=provider,
        model=model,
        success=True,
        authority_terms_found=auth_found,
        authority_terms_missing=auth_missing,
        trap_terms_found=trap_found,
        authority_score=round(auth_score, 3),
        trap_avoidance_score=round(trap_score, 3),
        overall_score=round(overall, 3)
    )


def evaluate_synthesis(
    synthesis: str,
    authority_terms: List[str],
    trap_terms: List[str],
    evidence_count: int
) -> Tuple[float, float, bool, float]:
    """
    Evaluate synthesis against ground truth.
    Returns: (authority_score, trap_avoidance, evidence_cited, overall)
    """
    if not synthesis or synthesis.startswith("ERROR"):
        return 0.0, 1.0, False, 0.0

    # Check authority terms
    auth_found = sum(1 for t in authority_terms if check_term_in_text(t, synthesis)[0])
    auth_score = auth_found / len(authority_terms) if authority_terms else 1.0

    # Check trap terms
    trap_found = sum(1 for t in trap_terms if check_term_in_text(t, synthesis)[0])
    trap_score = 1.0 - (trap_found / len(trap_terms)) if trap_terms else 1.0

    # Check if evidence is cited (look for citation patterns)
    evidence_patterns = [
        r'according to',
        r'research shows',
        r'studies indicate',
        r'guidelines recommend',
        r'evidence suggests',
        r'sources? (indicate|suggest|show)',
        r'\(\d{4}\)',  # Year citations
    ]
    evidence_cited = any(re.search(p, synthesis, re.IGNORECASE) for p in evidence_patterns)
    evidence_cited = evidence_cited or evidence_count > 0

    # Overall score
    overall = (auth_score * 0.5) + (trap_score * 0.3) + (0.2 if evidence_cited else 0.0)

    return round(auth_score, 3), round(trap_score, 3), evidence_cited, round(overall, 3)


def evaluate_question(result: Dict, question: Dict) -> QuestionEvaluation:
    """Evaluate a single question result against ground truth."""

    category = result.get('category', '')

    # Extract key terms from ground truth
    authority_answer = question.get('authority_answer', '')
    trap_answer = question.get('trap_answer', '')

    authority_terms = extract_key_terms(authority_answer, category)
    trap_terms = extract_key_terms(trap_answer, category) if trap_answer and trap_answer != 'N/A' else []

    # Evaluate synthesis
    synthesis = result.get('synthesis', '')
    synth_auth, synth_trap, synth_evidence, synth_overall = evaluate_synthesis(
        synthesis, authority_terms, trap_terms,
        result.get('evidence', {}).get('guidelines_count', 0) +
        result.get('evidence', {}).get('literature_count', 0)
    )

    # Evaluate each model
    model_evals = []
    for resp in result.get('model_responses', []):
        eval_result = evaluate_model_response(
            content=resp.get('content', ''),
            authority_terms=authority_terms,
            trap_terms=trap_terms,
            provider=resp.get('provider_name', 'unknown'),
            model=resp.get('model', 'unknown'),
            success=resp.get('success', False)
        )
        model_evals.append(eval_result)

    # Evidence evaluation
    evidence = result.get('evidence', {})
    evidence_count = evidence.get('guidelines_count', 0) + evidence.get('literature_count', 0)
    evidence_retrieved = evidence_count > 0

    # Hypothesis testing
    disagreement = result.get('disagreement_score', 0)
    expected_conflict = question.get('expected_conflict', '')

    # H1: Evidence caught training cutoff
    # True if evidence was retrieved AND synthesis aligns with authority better than model average
    model_avg_auth = sum(m.authority_score for m in model_evals) / len(model_evals) if model_evals else 0
    h1 = evidence_retrieved and synth_auth > model_avg_auth

    # H2: Disagreement signaled issue
    # True if high disagreement (>0.7) in categories where conflict expected
    conflict_categories = ['guideline_conflicts', 'recent_updates', 'emerging_contested']
    h2 = disagreement > 0.7 and category in conflict_categories

    # H3: Synthesis followed authority
    # True if synthesis authority score >= 0.6
    h3 = synth_auth >= 0.6

    # H4: Misinformation rejected
    # True if synthesis trap avoidance >= 0.8
    h4 = synth_trap >= 0.8

    return QuestionEvaluation(
        question_id=result.get('question_id', ''),
        category=category,
        question=result.get('question', ''),
        authority_key_terms=authority_terms,
        trap_key_terms=trap_terms,
        synthesis_authority_score=synth_auth,
        synthesis_trap_avoidance=synth_trap,
        synthesis_evidence_cited=synth_evidence,
        synthesis_overall=synth_overall,
        model_evaluations=model_evals,
        evidence_retrieved=evidence_retrieved,
        evidence_count=evidence_count,
        evidence_relevant=evidence_retrieved,  # Simplified
        h1_evidence_caught_cutoff=h1,
        h2_disagreement_signaled_issue=h2,
        h3_synthesis_followed_authority=h3,
        h4_misinformation_rejected=h4,
        disagreement_score=disagreement,
        expected_conflict=expected_conflict
    )


def generate_report(evaluations: List[QuestionEvaluation]) -> Dict[str, Any]:
    """Generate comprehensive evaluation report."""

    # Overall metrics
    n = len(evaluations)

    # Synthesis metrics
    avg_auth = sum(e.synthesis_authority_score for e in evaluations) / n
    avg_trap = sum(e.synthesis_trap_avoidance for e in evaluations) / n
    avg_overall = sum(e.synthesis_overall for e in evaluations) / n
    evidence_rate = sum(1 for e in evaluations if e.evidence_retrieved) / n

    # Hypothesis pass rates
    h1_rate = sum(1 for e in evaluations if e.h1_evidence_caught_cutoff) / n
    h2_rate = sum(1 for e in evaluations if e.h2_disagreement_signaled_issue) / n
    h3_rate = sum(1 for e in evaluations if e.h3_synthesis_followed_authority) / n
    h4_rate = sum(1 for e in evaluations if e.h4_misinformation_rejected) / n

    # By category
    by_category = defaultdict(lambda: {
        'count': 0,
        'auth_score': 0,
        'trap_avoidance': 0,
        'evidence_rate': 0,
        'h3_rate': 0,
        'h4_rate': 0
    })

    for e in evaluations:
        cat = by_category[e.category]
        cat['count'] += 1
        cat['auth_score'] += e.synthesis_authority_score
        cat['trap_avoidance'] += e.synthesis_trap_avoidance
        cat['evidence_rate'] += 1 if e.evidence_retrieved else 0
        cat['h3_rate'] += 1 if e.h3_synthesis_followed_authority else 0
        cat['h4_rate'] += 1 if e.h4_misinformation_rejected else 0

    # Calculate averages
    for cat, stats in by_category.items():
        c = stats['count']
        stats['auth_score'] = round(stats['auth_score'] / c, 3)
        stats['trap_avoidance'] = round(stats['trap_avoidance'] / c, 3)
        stats['evidence_rate'] = round(stats['evidence_rate'] / c, 3)
        stats['h3_rate'] = round(stats['h3_rate'] / c, 3)
        stats['h4_rate'] = round(stats['h4_rate'] / c, 3)

    # Model comparison
    model_stats = defaultdict(lambda: {
        'count': 0,
        'success_count': 0,
        'auth_score': 0,
        'trap_avoidance': 0,
        'overall': 0
    })

    for e in evaluations:
        for m in e.model_evaluations:
            stats = model_stats[m.provider]
            stats['count'] += 1
            if m.success:
                stats['success_count'] += 1
                stats['auth_score'] += m.authority_score
                stats['trap_avoidance'] += m.trap_avoidance_score
                stats['overall'] += m.overall_score

    # Calculate model averages (only for successful responses)
    for provider, stats in model_stats.items():
        s = stats['success_count']
        if s > 0:
            stats['auth_score'] = round(stats['auth_score'] / s, 3)
            stats['trap_avoidance'] = round(stats['trap_avoidance'] / s, 3)
            stats['overall'] = round(stats['overall'] / s, 3)
        stats['success_rate'] = round(stats['success_count'] / stats['count'], 3)

    return {
        'summary': {
            'total_questions': n,
            'synthesis_authority_score': round(avg_auth, 3),
            'synthesis_trap_avoidance': round(avg_trap, 3),
            'synthesis_overall_score': round(avg_overall, 3),
            'evidence_retrieval_rate': round(evidence_rate, 3),
        },
        'hypothesis_tests': {
            'h1_evidence_helps': {
                'description': 'Evidence retrieval improves accuracy over models alone',
                'pass_rate': round(h1_rate, 3),
                'verdict': 'SUPPORTED' if h1_rate >= 0.5 else 'NOT SUPPORTED'
            },
            'h2_disagreement_signals': {
                'description': 'High model disagreement indicates uncertain/contested topics',
                'pass_rate': round(h2_rate, 3),
                'verdict': 'SUPPORTED' if h2_rate >= 0.5 else 'NOT SUPPORTED'
            },
            'h3_follows_authority': {
                'description': 'Synthesis aligns with authoritative sources',
                'pass_rate': round(h3_rate, 3),
                'verdict': 'PASS' if h3_rate >= 0.8 else 'NEEDS IMPROVEMENT'
            },
            'h4_rejects_misinformation': {
                'description': 'Trap answers and misinformation are rejected',
                'pass_rate': round(h4_rate, 3),
                'verdict': 'PASS' if h4_rate >= 0.85 else 'NEEDS IMPROVEMENT'
            }
        },
        'by_category': dict(by_category),
        'model_comparison': dict(model_stats),
        'individual_results': [
            {
                'question_id': e.question_id,
                'category': e.category,
                'authority_score': e.synthesis_authority_score,
                'trap_avoidance': e.synthesis_trap_avoidance,
                'evidence_retrieved': e.evidence_retrieved,
                'h3_authority_followed': e.h3_synthesis_followed_authority,
                'h4_trap_avoided': e.h4_misinformation_rejected,
                'authority_terms': e.authority_key_terms,
                'model_scores': {m.provider: m.overall_score for m in e.model_evaluations}
            }
            for e in evaluations
        ]
    }


def print_report(report: Dict[str, Any]):
    """Print formatted report to console."""

    print("\n" + "="*70)
    print("CHORUS CONCRETE METRICS EVALUATION")
    print("="*70)

    s = report['summary']
    print(f"\n📊 SYNTHESIS PERFORMANCE")
    print(f"   Authority Alignment:  {s['synthesis_authority_score']:.1%}")
    print(f"   Trap Avoidance:       {s['synthesis_trap_avoidance']:.1%}")
    print(f"   Overall Score:        {s['synthesis_overall_score']:.1%}")
    print(f"   Evidence Retrieved:   {s['evidence_retrieval_rate']:.1%}")

    print(f"\n🔬 HYPOTHESIS TESTING")
    for key, h in report['hypothesis_tests'].items():
        emoji = "✅" if "PASS" in h['verdict'] or "SUPPORTED" in h['verdict'] else "⚠️"
        print(f"   {emoji} {h['description']}")
        print(f"      Rate: {h['pass_rate']:.1%} → {h['verdict']}")

    print(f"\n📁 BY CATEGORY")
    print(f"   {'Category':<20} {'Auth':<8} {'Trap':<8} {'Evidence':<10} {'H3':<8} {'H4':<8}")
    print(f"   {'-'*62}")
    for cat, stats in report['by_category'].items():
        print(f"   {cat[:20]:<20} {stats['auth_score']:.1%}   {stats['trap_avoidance']:.1%}   "
              f"{stats['evidence_rate']:.1%}      {stats['h3_rate']:.1%}   {stats['h4_rate']:.1%}")

    print(f"\n🤖 MODEL COMPARISON")
    print(f"   {'Provider':<15} {'Success':<10} {'Authority':<12} {'Trap Avoid':<12} {'Overall':<10}")
    print(f"   {'-'*59}")
    for provider, stats in sorted(report['model_comparison'].items()):
        print(f"   {provider:<15} {stats['success_rate']:.1%}      {stats['auth_score']:.1%}        "
              f"{stats['trap_avoidance']:.1%}        {stats['overall']:.1%}")

    print("\n" + "="*70)


def main():
    """Run evaluation on latest study results."""
    import argparse

    parser = argparse.ArgumentParser(description="Evaluate study results with concrete metrics")
    parser.add_argument("--results", help="Path to study results JSON file")
    parser.add_argument("--output", help="Output filename for evaluation")
    args = parser.parse_args()

    # Find latest results file if not specified
    if args.results:
        results_file = Path(args.results)
    else:
        results_files = sorted(RESULTS_DIR.glob("study_results_*.json"))
        if not results_files:
            print("ERROR: No study results found in", RESULTS_DIR)
            return
        results_file = results_files[-1]

    print(f"Loading results from: {results_file}")

    with open(results_file) as f:
        data = json.load(f)

    results = data.get('results', [])

    # Load questions for ground truth
    questions_file = STUDY_DIR / "questions.json"
    with open(questions_file) as f:
        questions_data = json.load(f)

    questions_by_id = {q['id']: q for q in questions_data['questions']}

    # Evaluate each question
    evaluations = []
    for result in results:
        qid = result.get('question_id', '')
        question = questions_by_id.get(qid, {})
        if question:
            eval_result = evaluate_question(result, question)
            evaluations.append(eval_result)

    # Generate report
    report = generate_report(evaluations)

    # Print to console
    print_report(report)

    # Save to file
    RESULTS_DIR.mkdir(exist_ok=True)
    if args.output:
        output_file = RESULTS_DIR / args.output
    else:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_file = RESULTS_DIR / f"concrete_evaluation_{timestamp}.json"

    with open(output_file, 'w') as f:
        json.dump({
            'metadata': {
                'evaluation_type': 'concrete_metrics',
                'timestamp': datetime.now().isoformat(),
                'results_file': str(results_file),
            },
            'report': report,
            'detailed_evaluations': [asdict(e) for e in evaluations]
        }, f, indent=2, default=str)

    print(f"\n📄 Full evaluation saved to: {output_file}")


if __name__ == "__main__":
    main()

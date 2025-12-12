#!/usr/bin/env python3
"""
LLM-as-Judge Evaluation Pipeline

This script evaluates Chorus synthesis outputs using an LLM judge.
The judge is blind to which output is the synthesis vs individual models.

Metrics evaluated:
1. Authority Adherence: Does synthesis follow authoritative literature over model hallucinations?
2. Hallucination Suppression: Are false claims from individual models filtered out?
3. Completeness: Does synthesis preserve valid insights from multiple models?
4. Error Introduction: Does synthesis add errors not present in any component?
5. Appropriate Uncertainty: Does synthesis express uncertainty when warranted?
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from dataclasses import dataclass, asdict

# Try to import OpenAI
try:
    from openai import AsyncOpenAI
    HAS_OPENAI = True
except ImportError:
    HAS_OPENAI = False

from dotenv import load_dotenv

load_dotenv()

STUDY_DIR = Path(__file__).parent
RESULTS_DIR = STUDY_DIR / "results"


# Judge Prompts
AUTHORITY_ADHERENCE_PROMPT = """You are evaluating a medical AI synthesis system. Your task is to determine if the synthesis follows authoritative medical literature over potentially outdated or incorrect LLM responses.

AUTHORITATIVE LITERATURE CONTEXT:
{literature_context}

EXPECTED CORRECT ANSWER (from current guidelines):
{expected_answer}

COMMON INCORRECT ANSWER (outdated/hallucinated):
{trap_answer}

SYNTHESIS OUTPUT TO EVALUATE:
{synthesis}

INDIVIDUAL MODEL OUTPUTS (for context):
{model_outputs}

EVALUATION CRITERIA:
1. Does the synthesis align with the authoritative literature and expected answer?
2. Does it avoid the trap answer (outdated/incorrect information)?
3. Does it cite or reference authoritative sources appropriately?

Respond in JSON format:
{{
    "authority_adherent": true/false,
    "follows_expected_answer": true/false,
    "avoids_trap_answer": true/false,
    "confidence": 0.0-1.0,
    "reasoning": "Brief explanation of your evaluation"
}}"""

HALLUCINATION_CHECK_PROMPT = """You are evaluating whether a synthesis successfully filtered out hallucinated or false claims from component LLM outputs.

QUESTION: {question}

INDIVIDUAL MODEL OUTPUTS:
{model_outputs}

AUTHORITATIVE LITERATURE:
{literature_context}

SYNTHESIS OUTPUT:
{synthesis}

TASK: Identify any claims in individual model outputs that:
1. Are not supported by the authoritative literature
2. Appear to be hallucinated (e.g., fake studies, incorrect statistics)
3. Contradict established medical knowledge

Then check if these hallucinated claims appear in the synthesis.

Respond in JSON format:
{{
    "hallucinations_in_models": [
        {{"model": "model_name", "claim": "the hallucinated claim", "why_hallucination": "explanation"}}
    ],
    "hallucinations_in_synthesis": [
        {{"claim": "claim that made it through", "source_model": "which model it came from"}}
    ],
    "hallucination_suppression_rate": 0.0-1.0,
    "reasoning": "Brief explanation"
}}"""

COMPLETENESS_CHECK_PROMPT = """You are evaluating whether a synthesis preserves valuable, unique insights from multiple LLM sources.

QUESTION: {question}

INDIVIDUAL MODEL OUTPUTS:
{model_outputs}

SYNTHESIS OUTPUT:
{synthesis}

TASK:
1. Identify unique, valid insights from each model that add value to the answer
2. Check if these insights are preserved in the synthesis
3. A good synthesis should be "greater than the sum of its parts"

Respond in JSON format:
{{
    "unique_insights": [
        {{"model": "model_name", "insight": "the unique insight", "preserved_in_synthesis": true/false}}
    ],
    "completeness_score": 0.0-1.0,
    "synthesis_adds_value": true/false,
    "reasoning": "Brief explanation"
}}"""

ERROR_INTRODUCTION_PROMPT = """You are checking whether a synthesis introduced NEW errors not present in any of the component model outputs.

QUESTION: {question}

INDIVIDUAL MODEL OUTPUTS:
{model_outputs}

SYNTHESIS OUTPUT:
{synthesis}

AUTHORITATIVE LITERATURE:
{literature_context}

TASK: Check if the synthesis contains any factual errors that were NOT present in any individual model output.
These would be errors introduced by the synthesis process itself.

Respond in JSON format:
{{
    "introduced_errors": [
        {{"error": "description of error", "why_error": "explanation"}}
    ],
    "error_free": true/false,
    "reasoning": "Brief explanation"
}}"""

UNCERTAINTY_CHECK_PROMPT = """You are evaluating whether a synthesis appropriately expresses uncertainty when LLMs disagree or evidence is limited.

QUESTION: {question}

MODEL DISAGREEMENT SCORE: {disagreement_score} (0=complete agreement, 1=complete disagreement)

CLAIM CONFLICTS IDENTIFIED:
{conflicts}

INDIVIDUAL MODEL OUTPUTS:
{model_outputs}

SYNTHESIS OUTPUT:
{synthesis}

TASK: When models disagree significantly or evidence is contested, the synthesis should:
1. Acknowledge the disagreement
2. Present multiple viewpoints
3. Use hedging language ("may", "some evidence suggests", "is debated")
4. NOT present contested claims as established facts

Respond in JSON format:
{{
    "acknowledges_disagreement": true/false,
    "uses_appropriate_hedging": true/false,
    "presents_multiple_viewpoints": true/false,
    "uncertainty_score": 0.0-1.0,
    "reasoning": "Brief explanation"
}}"""


@dataclass
class JudgeEvaluation:
    """Complete judge evaluation for a single question."""
    question_id: str
    authority_adherence: Dict[str, Any]
    hallucination_check: Dict[str, Any]
    completeness_check: Dict[str, Any]
    error_introduction: Dict[str, Any]
    uncertainty_check: Dict[str, Any]

    # Aggregate scores
    overall_score: float
    pass_fail: bool


class LLMJudge:
    """LLM-as-Judge evaluator for Chorus outputs."""

    def __init__(self, model: str = "gpt-4o"):
        if not HAS_OPENAI:
            raise ImportError("openai package required. Install with: pip install openai")

        self.client = AsyncOpenAI()
        self.model = model

    async def _query_judge(self, prompt: str) -> Dict[str, Any]:
        """Query the judge LLM and parse JSON response."""
        try:
            response = await self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": "You are an expert medical AI evaluator. Respond only with valid JSON."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,  # Low temperature for consistency
                response_format={"type": "json_object"}
            )

            return json.loads(response.choices[0].message.content)

        except Exception as e:
            return {"error": str(e), "raw_response": None}

    def _format_model_outputs(self, model_responses: List[Dict]) -> str:
        """Format model outputs for the prompt."""
        outputs = []
        for resp in model_responses:
            if resp.get("success") and resp.get("content"):
                outputs.append(f"[{resp['provider_name']}]:\n{resp['content'][:1000]}...")
        return "\n\n".join(outputs) if outputs else "No successful model outputs"

    async def evaluate_authority_adherence(self, result: Dict) -> Dict[str, Any]:
        """Evaluate if synthesis follows authoritative sources."""
        prompt = AUTHORITY_ADHERENCE_PROMPT.format(
            literature_context=result.get("evidence", {}).get("guidelines_digest", "No literature available"),
            expected_answer=result.get("expected_answer", "Not specified"),
            trap_answer=result.get("trap_answer", "Not specified"),
            synthesis=result.get("synthesis", ""),
            model_outputs=self._format_model_outputs(result.get("model_responses", []))
        )
        return await self._query_judge(prompt)

    async def evaluate_hallucination_suppression(self, result: Dict) -> Dict[str, Any]:
        """Evaluate if hallucinations were filtered out."""
        prompt = HALLUCINATION_CHECK_PROMPT.format(
            question=result.get("question", ""),
            model_outputs=self._format_model_outputs(result.get("model_responses", [])),
            literature_context=result.get("evidence", {}).get("guidelines_digest", ""),
            synthesis=result.get("synthesis", "")
        )
        return await self._query_judge(prompt)

    async def evaluate_completeness(self, result: Dict) -> Dict[str, Any]:
        """Evaluate if synthesis preserves valuable insights."""
        prompt = COMPLETENESS_CHECK_PROMPT.format(
            question=result.get("question", ""),
            model_outputs=self._format_model_outputs(result.get("model_responses", [])),
            synthesis=result.get("synthesis", "")
        )
        return await self._query_judge(prompt)

    async def evaluate_error_introduction(self, result: Dict) -> Dict[str, Any]:
        """Evaluate if synthesis introduced new errors."""
        prompt = ERROR_INTRODUCTION_PROMPT.format(
            question=result.get("question", ""),
            model_outputs=self._format_model_outputs(result.get("model_responses", [])),
            synthesis=result.get("synthesis", ""),
            literature_context=result.get("evidence", {}).get("guidelines_digest", "")
        )
        return await self._query_judge(prompt)

    async def evaluate_uncertainty(self, result: Dict) -> Dict[str, Any]:
        """Evaluate if synthesis appropriately expresses uncertainty."""
        prompt = UNCERTAINTY_CHECK_PROMPT.format(
            question=result.get("question", ""),
            disagreement_score=result.get("disagreement_score", 0),
            conflicts=json.dumps(result.get("claim_conflicts", []), indent=2),
            model_outputs=self._format_model_outputs(result.get("model_responses", [])),
            synthesis=result.get("synthesis", "")
        )
        return await self._query_judge(prompt)

    async def evaluate_result(self, result: Dict) -> JudgeEvaluation:
        """Run all evaluations on a single result."""
        print(f"  Evaluating: {result['question_id']}...")

        # Run all evaluations in parallel
        authority, hallucination, completeness, error, uncertainty = await asyncio.gather(
            self.evaluate_authority_adherence(result),
            self.evaluate_hallucination_suppression(result),
            self.evaluate_completeness(result),
            self.evaluate_error_introduction(result),
            self.evaluate_uncertainty(result)
        )

        # Calculate overall score
        scores = []
        if authority.get("authority_adherent"):
            scores.append(1.0)
        elif "confidence" in authority:
            scores.append(authority["confidence"])
        else:
            scores.append(0.5)

        if "hallucination_suppression_rate" in hallucination:
            scores.append(hallucination["hallucination_suppression_rate"])
        else:
            scores.append(0.5)

        if "completeness_score" in completeness:
            scores.append(completeness["completeness_score"])
        else:
            scores.append(0.5)

        if error.get("error_free"):
            scores.append(1.0)
        else:
            scores.append(0.0)

        if "uncertainty_score" in uncertainty:
            scores.append(uncertainty["uncertainty_score"])
        else:
            scores.append(0.5)

        overall = sum(scores) / len(scores) if scores else 0.5
        pass_fail = overall >= 0.7  # 70% threshold for passing

        return JudgeEvaluation(
            question_id=result["question_id"],
            authority_adherence=authority,
            hallucination_check=hallucination,
            completeness_check=completeness,
            error_introduction=error,
            uncertainty_check=uncertainty,
            overall_score=round(overall, 3),
            pass_fail=pass_fail
        )


class StudyEvaluator:
    """Evaluates complete study results."""

    def __init__(self, judge_model: str = "gpt-4o"):
        self.judge = LLMJudge(model=judge_model)
        self.evaluations: List[JudgeEvaluation] = []

    async def load_results(self, results_file: Path) -> List[Dict]:
        """Load study results from JSON file."""
        with open(results_file) as f:
            data = json.load(f)
        return data.get("results", [])

    async def evaluate_study(
        self,
        results_file: Path,
        limit: Optional[int] = None,
        categories: Optional[List[str]] = None
    ) -> List[JudgeEvaluation]:
        """Evaluate all results in a study file."""
        results = await self.load_results(results_file)

        # Apply filters
        if categories:
            results = [r for r in results if r.get("category") in categories]
        if limit:
            results = results[:limit]

        print(f"\n{'='*60}")
        print(f"LLM-AS-JUDGE EVALUATION")
        print(f"{'='*60}")
        print(f"Results to evaluate: {len(results)}")
        print(f"Judge model: {self.judge.model}")
        print(f"Started: {datetime.now().isoformat()}")
        print(f"{'='*60}\n")

        evaluations = []
        for i, result in enumerate(results, 1):
            print(f"[{i}/{len(results)}] Category: {result.get('category', 'unknown')}")
            evaluation = await self.judge.evaluate_result(result)
            evaluations.append(evaluation)

            # Brief delay to avoid rate limiting
            await asyncio.sleep(0.5)

        self.evaluations = evaluations
        return evaluations

    def generate_report(self) -> Dict[str, Any]:
        """Generate evaluation report."""
        if not self.evaluations:
            return {}

        # Aggregate metrics
        total = len(self.evaluations)
        passed = sum(1 for e in self.evaluations if e.pass_fail)
        avg_score = sum(e.overall_score for e in self.evaluations) / total

        # By category (would need category info passed through)
        authority_adherent = sum(
            1 for e in self.evaluations
            if e.authority_adherence.get("authority_adherent")
        )

        error_free = sum(
            1 for e in self.evaluations
            if e.error_introduction.get("error_free")
        )

        avg_hallucination_suppression = sum(
            e.hallucination_check.get("hallucination_suppression_rate", 0.5)
            for e in self.evaluations
        ) / total

        avg_completeness = sum(
            e.completeness_check.get("completeness_score", 0.5)
            for e in self.evaluations
        ) / total

        return {
            "summary": {
                "total_evaluated": total,
                "passed": passed,
                "pass_rate": round(passed / total * 100, 1),
                "average_overall_score": round(avg_score, 3)
            },
            "metrics": {
                "authority_adherence_rate": round(authority_adherent / total * 100, 1),
                "hallucination_suppression_rate": round(avg_hallucination_suppression * 100, 1),
                "completeness_score": round(avg_completeness * 100, 1),
                "error_free_rate": round(error_free / total * 100, 1)
            },
            "detailed_evaluations": [asdict(e) for e in self.evaluations]
        }

    def save_report(self, output_file: Optional[Path] = None) -> Path:
        """Save evaluation report to JSON file."""
        if output_file is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_file = RESULTS_DIR / f"judge_evaluation_{timestamp}.json"

        report = self.generate_report()
        report["metadata"] = {
            "evaluation_timestamp": datetime.now().isoformat(),
            "judge_model": self.judge.model
        }

        with open(output_file, "w") as f:
            json.dump(report, f, indent=2)

        print(f"\nEvaluation report saved to: {output_file}")
        return output_file

    def print_summary(self):
        """Print evaluation summary to console."""
        report = self.generate_report()
        summary = report.get("summary", {})
        metrics = report.get("metrics", {})

        print(f"\n{'='*60}")
        print("JUDGE EVALUATION SUMMARY")
        print(f"{'='*60}")
        print(f"Total Evaluated: {summary.get('total_evaluated', 0)}")
        print(f"Passed: {summary.get('passed', 0)}")
        print(f"Pass Rate: {summary.get('pass_rate', 0)}%")
        print(f"Average Score: {summary.get('average_overall_score', 0)}")

        print(f"\nMetric Breakdown:")
        print(f"  Authority Adherence: {metrics.get('authority_adherence_rate', 0)}%")
        print(f"  Hallucination Suppression: {metrics.get('hallucination_suppression_rate', 0)}%")
        print(f"  Completeness: {metrics.get('completeness_score', 0)}%")
        print(f"  Error-Free Rate: {metrics.get('error_free_rate', 0)}%")
        print(f"{'='*60}\n")


async def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(description="Run LLM-as-Judge Evaluation")
    parser.add_argument("results_file", type=Path, help="Path to study results JSON file")
    parser.add_argument("--model", default="gpt-4o", help="Judge model to use")
    parser.add_argument("--limit", type=int, help="Limit number of results to evaluate")
    parser.add_argument("--categories", nargs="+", help="Filter to specific categories")
    parser.add_argument("--output", type=Path, help="Output file path")

    args = parser.parse_args()

    if not args.results_file.exists():
        print(f"Error: Results file not found: {args.results_file}")
        sys.exit(1)

    evaluator = StudyEvaluator(judge_model=args.model)

    await evaluator.evaluate_study(
        results_file=args.results_file,
        limit=args.limit,
        categories=args.categories
    )

    evaluator.print_summary()
    evaluator.save_report(args.output)


if __name__ == "__main__":
    asyncio.run(main())

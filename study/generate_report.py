#!/usr/bin/env python3
"""
Study Results Report Generator

Generates publication-ready tables and statistics from study results.
Output formats: Markdown table, CSV, LaTeX (for academic papers)
"""

import json
import csv
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from collections import defaultdict

STUDY_DIR = Path(__file__).parent
RESULTS_DIR = STUDY_DIR / "results"


def load_study_results(results_file: Path) -> Dict:
    """Load study results from JSON file."""
    with open(results_file) as f:
        return json.load(f)


def load_judge_evaluation(eval_file: Path) -> Dict:
    """Load judge evaluation from JSON file."""
    with open(eval_file) as f:
        return json.load(f)


def generate_summary_table(results: Dict, evaluation: Optional[Dict] = None) -> str:
    """Generate the main summary table in Markdown format."""
    study_results = results.get("results", [])

    # Aggregate by category
    by_category = defaultdict(lambda: {
        "count": 0,
        "total_disagreement": 0,
        "total_conflicts": 0,
        "successful": 0,
        "hallucinations_filtered": 0,
        "authority_aligned": 0
    })

    for r in study_results:
        cat = r.get("category", "unknown")
        by_category[cat]["count"] += 1
        by_category[cat]["total_disagreement"] += r.get("disagreement_score", 0)
        by_category[cat]["total_conflicts"] += len(r.get("claim_conflicts", []))
        if r.get("synthesis") and not r.get("synthesis", "").startswith("ERROR"):
            by_category[cat]["successful"] += 1

    # Add judge evaluation data if available
    if evaluation:
        for eval_result in evaluation.get("detailed_evaluations", []):
            qid = eval_result.get("question_id", "")
            # Find matching category
            for r in study_results:
                if r.get("question_id") == qid:
                    cat = r.get("category", "unknown")
                    if eval_result.get("hallucination_check", {}).get("hallucination_suppression_rate", 0) > 0.8:
                        by_category[cat]["hallucinations_filtered"] += 1
                    if eval_result.get("authority_adherence", {}).get("authority_adherent"):
                        by_category[cat]["authority_aligned"] += 1
                    break

    # Build table
    lines = [
        "## Chorus Validation Study Results",
        "",
        "| Question Category | N | Model Disagreement | Conflicts Found | Hallucinations Filtered | Authority Alignment |",
        "|-------------------|---|-------------------|-----------------|------------------------|---------------------|"
    ]

    category_order = [
        "guideline_conflicts",
        "recent_updates",
        "emerging_contested",
        "settled_science",
        "misinformation_traps"
    ]

    category_labels = {
        "guideline_conflicts": "Guideline Conflicts",
        "recent_updates": "Recent Updates",
        "emerging_contested": "Emerging/Contested",
        "settled_science": "Settled Science",
        "misinformation_traps": "Misinformation Traps"
    }

    for cat in category_order:
        if cat not in by_category:
            continue
        stats = by_category[cat]
        n = stats["count"]
        if n == 0:
            continue

        avg_disagreement = stats["total_disagreement"] / n
        disagreement_label = "High" if avg_disagreement > 0.5 else "Medium" if avg_disagreement > 0.3 else "Low"

        halluc_rate = f"{stats['hallucinations_filtered']}/{n}" if evaluation else "N/A"
        auth_rate = f"{stats['authority_aligned']}/{n}" if evaluation else "N/A"

        lines.append(
            f"| {category_labels.get(cat, cat)} | {n} | "
            f"{disagreement_label} ({avg_disagreement:.2f}) | "
            f"{stats['total_conflicts']} | "
            f"{halluc_rate} | "
            f"{auth_rate} |"
        )

    # Totals
    total_n = sum(s["count"] for s in by_category.values())
    total_conflicts = sum(s["total_conflicts"] for s in by_category.values())
    avg_overall = sum(s["total_disagreement"] for s in by_category.values()) / total_n if total_n > 0 else 0

    lines.append(f"| **Total** | {total_n} | Avg: {avg_overall:.2f} | {total_conflicts} | - | - |")

    return "\n".join(lines)


def generate_metrics_table(evaluation: Dict) -> str:
    """Generate detailed metrics table from judge evaluation."""
    metrics = evaluation.get("metrics", {})
    summary = evaluation.get("summary", {})

    lines = [
        "## Evaluation Metrics",
        "",
        "| Metric | Score | Target | Pass/Fail |",
        "|--------|-------|--------|-----------|"
    ]

    targets = {
        "authority_adherence_rate": (95, "≥95%"),
        "hallucination_suppression_rate": (85, "≥85%"),
        "completeness_score": (80, "≥80%"),
        "error_free_rate": (95, "≥95%")
    }

    metric_labels = {
        "authority_adherence_rate": "Authority Adherence",
        "hallucination_suppression_rate": "Hallucination Suppression",
        "completeness_score": "Information Completeness",
        "error_free_rate": "Error-Free Synthesis"
    }

    for key, (target, target_label) in targets.items():
        score = metrics.get(key, 0)
        pass_fail = "✓ PASS" if score >= target else "✗ FAIL"
        lines.append(f"| {metric_labels[key]} | {score}% | {target_label} | {pass_fail} |")

    lines.extend([
        "",
        f"**Overall Pass Rate**: {summary.get('pass_rate', 0)}%",
        f"**Average Score**: {summary.get('average_overall_score', 0)}"
    ])

    return "\n".join(lines)


def generate_individual_results_table(results: Dict, evaluation: Optional[Dict] = None) -> str:
    """Generate detailed per-question results table."""
    study_results = results.get("results", [])

    # Create lookup for evaluations
    eval_lookup = {}
    if evaluation:
        for e in evaluation.get("detailed_evaluations", []):
            eval_lookup[e.get("question_id")] = e

    lines = [
        "## Individual Question Results",
        "",
        "| ID | Category | Disagreement | Conflicts | Auth. Aligned | Errors | Score |",
        "|----|----------|--------------|-----------|---------------|--------|-------|"
    ]

    for r in study_results[:20]:  # Limit to first 20 for readability
        qid = r.get("question_id", "")
        cat = r.get("category", "")[:8]  # Truncate category
        disagree = f"{r.get('disagreement_score', 0):.2f}"
        conflicts = len(r.get("claim_conflicts", []))

        # Judge evaluation data
        eval_data = eval_lookup.get(qid, {})
        auth = "✓" if eval_data.get("authority_adherence", {}).get("authority_adherent") else "✗"
        errors = "✓" if eval_data.get("error_introduction", {}).get("error_free") else "✗"
        score = f"{eval_data.get('overall_score', 0):.2f}" if eval_data else "N/A"

        lines.append(f"| {qid} | {cat} | {disagree} | {conflicts} | {auth} | {errors} | {score} |")

    if len(study_results) > 20:
        lines.append(f"| ... | ({len(study_results) - 20} more rows) | ... | ... | ... | ... | ... |")

    return "\n".join(lines)


def generate_latex_table(results: Dict, evaluation: Optional[Dict] = None) -> str:
    """Generate LaTeX table for academic publication."""
    study_results = results.get("results", [])

    # Aggregate by category
    by_category = defaultdict(lambda: {
        "count": 0,
        "disagreement": 0,
        "authority_aligned": 0,
        "halluc_filtered": 0
    })

    eval_lookup = {}
    if evaluation:
        for e in evaluation.get("detailed_evaluations", []):
            eval_lookup[e.get("question_id")] = e

    for r in study_results:
        cat = r.get("category", "unknown")
        by_category[cat]["count"] += 1
        by_category[cat]["disagreement"] += r.get("disagreement_score", 0)

        eval_data = eval_lookup.get(r.get("question_id"), {})
        if eval_data.get("authority_adherence", {}).get("authority_adherent"):
            by_category[cat]["authority_aligned"] += 1
        if eval_data.get("hallucination_check", {}).get("hallucination_suppression_rate", 0) > 0.8:
            by_category[cat]["halluc_filtered"] += 1

    latex = [
        "\\begin{table}[h]",
        "\\centering",
        "\\caption{Chorus Ensemble Validation Results}",
        "\\label{tab:chorus-results}",
        "\\begin{tabular}{lcccc}",
        "\\toprule",
        "Category & N & Disagreement & Halluc. Filtered & Auth. Aligned \\\\",
        "\\midrule"
    ]

    category_labels = {
        "guideline_conflicts": "Guideline Conflicts",
        "recent_updates": "Recent Updates",
        "emerging_contested": "Emerging/Contested",
        "settled_science": "Settled Science (Control)",
        "misinformation_traps": "Misinformation Traps"
    }

    for cat, label in category_labels.items():
        if cat not in by_category:
            continue
        stats = by_category[cat]
        n = stats["count"]
        if n == 0:
            continue

        avg_d = stats["disagreement"] / n
        auth_pct = (stats["authority_aligned"] / n * 100) if n > 0 else 0
        halluc_pct = (stats["halluc_filtered"] / n * 100) if n > 0 else 0

        latex.append(f"{label} & {n} & {avg_d:.2f} & {halluc_pct:.0f}\\% & {auth_pct:.0f}\\% \\\\")

    latex.extend([
        "\\bottomrule",
        "\\end{tabular}",
        "\\end{table}"
    ])

    return "\n".join(latex)


def generate_csv_export(results: Dict, evaluation: Optional[Dict] = None) -> str:
    """Generate CSV export of all results."""
    study_results = results.get("results", [])

    eval_lookup = {}
    if evaluation:
        for e in evaluation.get("detailed_evaluations", []):
            eval_lookup[e.get("question_id")] = e

    # Build CSV rows
    import io
    output = io.StringIO()
    writer = csv.writer(output)

    # Header
    writer.writerow([
        "question_id", "category", "question", "disagreement_score",
        "num_conflicts", "num_model_responses", "synthesis_length",
        "authority_adherent", "hallucination_suppression", "completeness",
        "error_free", "overall_score"
    ])

    for r in study_results:
        qid = r.get("question_id", "")
        eval_data = eval_lookup.get(qid, {})

        writer.writerow([
            qid,
            r.get("category", ""),
            r.get("question", "")[:100],  # Truncate
            r.get("disagreement_score", 0),
            len(r.get("claim_conflicts", [])),
            len(r.get("model_responses", [])),
            len(r.get("synthesis", "")),
            eval_data.get("authority_adherence", {}).get("authority_adherent", ""),
            eval_data.get("hallucination_check", {}).get("hallucination_suppression_rate", ""),
            eval_data.get("completeness_check", {}).get("completeness_score", ""),
            eval_data.get("error_introduction", {}).get("error_free", ""),
            eval_data.get("overall_score", "")
        ])

    return output.getvalue()


def generate_full_report(
    results_file: Path,
    evaluation_file: Optional[Path] = None,
    output_dir: Optional[Path] = None
) -> Dict[str, Path]:
    """Generate complete report in all formats."""
    results = load_study_results(results_file)
    evaluation = load_judge_evaluation(evaluation_file) if evaluation_file and evaluation_file.exists() else None

    if output_dir is None:
        output_dir = RESULTS_DIR / "reports"
    output_dir.mkdir(exist_ok=True)

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    output_files = {}

    # Markdown report
    md_content = [
        f"# Chorus Validation Study Report",
        f"Generated: {datetime.now().isoformat()}",
        "",
        generate_summary_table(results, evaluation),
        "",
    ]

    if evaluation:
        md_content.extend([
            generate_metrics_table(evaluation),
            "",
        ])

    md_content.extend([
        generate_individual_results_table(results, evaluation),
        "",
        "## Methodology",
        "",
        "This study evaluated the Chorus synthesis system using:",
        "- 40 medical questions across 5 categories",
        "- Component outputs from 5 LLMs (OpenAI, Claude, Gemini, Grok, Ollama)",
        "- Authoritative literature retrieval via SERPAPI",
        "- LLM-as-Judge evaluation using GPT-4o",
        "",
        "### Metrics",
        "- **Authority Adherence**: Synthesis follows authoritative sources over model hallucinations",
        "- **Hallucination Suppression**: False claims from components filtered out of synthesis",
        "- **Completeness**: Valid insights from multiple models preserved",
        "- **Error-Free**: Synthesis does not introduce new errors",
    ])

    md_file = output_dir / f"study_report_{timestamp}.md"
    with open(md_file, "w") as f:
        f.write("\n".join(md_content))
    output_files["markdown"] = md_file

    # LaTeX table
    latex_content = generate_latex_table(results, evaluation)
    latex_file = output_dir / f"study_table_{timestamp}.tex"
    with open(latex_file, "w") as f:
        f.write(latex_content)
    output_files["latex"] = latex_file

    # CSV export
    csv_content = generate_csv_export(results, evaluation)
    csv_file = output_dir / f"study_data_{timestamp}.csv"
    with open(csv_file, "w") as f:
        f.write(csv_content)
    output_files["csv"] = csv_file

    print(f"\nReports generated:")
    for fmt, path in output_files.items():
        print(f"  {fmt}: {path}")

    return output_files


def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(description="Generate Study Report")
    parser.add_argument("results_file", type=Path, help="Path to study results JSON")
    parser.add_argument("--evaluation", type=Path, help="Path to judge evaluation JSON")
    parser.add_argument("--output-dir", type=Path, help="Output directory for reports")

    args = parser.parse_args()

    if not args.results_file.exists():
        print(f"Error: Results file not found: {args.results_file}")
        return

    generate_full_report(
        results_file=args.results_file,
        evaluation_file=args.evaluation,
        output_dir=args.output_dir
    )


if __name__ == "__main__":
    main()

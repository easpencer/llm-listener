#!/usr/bin/env python3
"""
Chorus Ensemble Validation Study Runner

This script runs the complete validation study:
1. Loads study questions
2. Queries Chorus API for each question
3. Captures all component outputs (individual LLMs, literature, synthesis)
4. Calculates disagreement scores
5. Runs LLM-as-Judge evaluation
6. Generates results report
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional
from dataclasses import dataclass, asdict
import httpx
from dotenv import load_dotenv

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

load_dotenv(override=True)

# Configuration
CHORUS_API_URL = os.getenv("CHORUS_API_URL", "http://localhost:8001")
STUDY_DIR = Path(__file__).parent
QUESTIONS_FILE = STUDY_DIR / "questions.json"
RESULTS_DIR = STUDY_DIR / "results"
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")


@dataclass
class ModelResponse:
    """Individual model response data."""
    provider_name: str
    model: str
    content: str
    success: bool
    error: Optional[str] = None


@dataclass
class EvidenceData:
    """Evidence search results."""
    guidelines_count: int
    literature_count: int
    guidelines_digest: str
    literature_digest: str
    top_sources: List[Dict[str, str]]


@dataclass
class QuestionResult:
    """Complete result for a single question."""
    question_id: str
    category: str
    question: str
    timestamp: str

    # Raw data from Chorus
    model_responses: List[ModelResponse]
    evidence: EvidenceData
    synthesis: str
    confidence: Dict[str, Any]

    # Computed metrics
    disagreement_score: float
    claim_conflicts: List[Dict[str, str]]

    # Ground truth comparison
    expected_answer: str
    trap_answer: str

    # Judge evaluation (filled in later)
    judge_evaluation: Optional[Dict[str, Any]] = None


class StudyRunner:
    """Runs the Chorus validation study."""

    def __init__(self, api_url: str = CHORUS_API_URL):
        self.api_url = api_url
        self.results: List[QuestionResult] = []

    async def load_questions(self) -> List[Dict]:
        """Load study questions from JSON file."""
        with open(QUESTIONS_FILE) as f:
            data = json.load(f)
        return data["questions"]

    async def query_chorus(self, question: str) -> Dict[str, Any]:
        """Query the Chorus API and get full response."""
        async with httpx.AsyncClient(timeout=120.0) as client:
            response = await client.post(
                f"{self.api_url}/api/query",
                json={"question": question}
            )
            response.raise_for_status()
            return response.json()

    def extract_model_responses(self, data: Dict) -> List[ModelResponse]:
        """Extract individual model responses from Chorus response."""
        responses = []
        for resp in data.get("responses", []):
            responses.append(ModelResponse(
                provider_name=resp.get("provider_name", "unknown"),
                model=resp.get("model", "unknown"),
                content=resp.get("content", ""),
                success=resp.get("success", False),
                error=resp.get("error")
            ))
        return responses

    def extract_evidence(self, data: Dict) -> EvidenceData:
        """Extract evidence data from Chorus response."""
        guidelines = data.get("guidelines", {})
        literature = data.get("research", {})

        # Handle both list and dict formats
        if isinstance(guidelines, list):
            guidelines_count = len(guidelines)
            guidelines_digest = ""
            top_sources = guidelines[:5]
        else:
            guidelines_count = guidelines.get("count", 0)
            guidelines_digest = guidelines.get("digest", "")
            top_sources = guidelines.get("links", [])[:5]

        if isinstance(literature, list):
            literature_count = len(literature)
            literature_digest = ""
        else:
            literature_count = literature.get("count", 0)
            literature_digest = literature.get("digest", "")

        return EvidenceData(
            guidelines_count=guidelines_count,
            literature_count=literature_count,
            guidelines_digest=guidelines_digest,
            literature_digest=literature_digest,
            top_sources=top_sources
        )

    def calculate_disagreement_score(self, responses: List[ModelResponse]) -> float:
        """
        Calculate disagreement score between model responses.

        Uses a simple heuristic based on response length variance and
        keyword overlap. More sophisticated: use embeddings.

        Returns: 0.0 (complete agreement) to 1.0 (complete disagreement)
        """
        successful = [r for r in responses if r.success and r.content]
        if len(successful) < 2:
            return 0.0

        # Simple keyword extraction
        def get_keywords(text: str) -> set:
            # Extract key medical/factual terms
            words = text.lower().split()
            # Filter for longer words (more likely to be meaningful)
            return {w.strip(".,!?;:") for w in words if len(w) > 4}

        keyword_sets = [get_keywords(r.content) for r in successful]

        # Calculate pairwise Jaccard distances
        distances = []
        for i in range(len(keyword_sets)):
            for j in range(i + 1, len(keyword_sets)):
                intersection = len(keyword_sets[i] & keyword_sets[j])
                union = len(keyword_sets[i] | keyword_sets[j])
                if union > 0:
                    jaccard = intersection / union
                    distances.append(1 - jaccard)  # Convert similarity to distance

        if not distances:
            return 0.0

        return sum(distances) / len(distances)

    def extract_claim_conflicts(self, responses: List[ModelResponse]) -> List[Dict[str, str]]:
        """
        Extract specific factual claim conflicts between models.

        This is a simplified version - production would use NLP/LLM for claim extraction.
        """
        conflicts = []
        successful = [r for r in responses if r.success and r.content]

        # Look for numeric disagreements (ages, percentages, years)
        import re

        numeric_claims = {}
        for resp in successful:
            # Find numbers in context
            matches = re.findall(r'(\d+)\s*(years?|age|percent|%|mg|mmHg)', resp.content.lower())
            for num, unit in matches:
                key = unit.replace("year", "years").replace("%", "percent")
                if key not in numeric_claims:
                    numeric_claims[key] = {}
                if num not in numeric_claims[key]:
                    numeric_claims[key][num] = []
                numeric_claims[key][num].append(resp.provider_name)

        # Find conflicts (different numbers for same unit type)
        for unit, values in numeric_claims.items():
            if len(values) > 1:
                conflict_desc = "; ".join([
                    f"{v} {unit} ({', '.join(providers)})"
                    for v, providers in values.items()
                ])
                conflicts.append({
                    "type": "numeric_disagreement",
                    "unit": unit,
                    "description": conflict_desc
                })

        return conflicts

    async def run_question(self, question_data: Dict) -> QuestionResult:
        """Run a single question through Chorus and capture results."""
        print(f"  Running: {question_data['id']} - {question_data['question'][:50]}...")

        try:
            # Query Chorus
            response = await self.query_chorus(question_data["question"])

            # Extract components
            model_responses = self.extract_model_responses(response)
            evidence = self.extract_evidence(response)

            # Handle synthesis - may be string or dict with 'content' key
            synthesis_raw = response.get("synthesis", "")
            if isinstance(synthesis_raw, dict):
                synthesis = synthesis_raw.get("content", "") or str(synthesis_raw)
            else:
                synthesis = str(synthesis_raw) if synthesis_raw else ""

            confidence = response.get("confidence", {})

            # Calculate metrics
            disagreement = self.calculate_disagreement_score(model_responses)
            conflicts = self.extract_claim_conflicts(model_responses)

            return QuestionResult(
                question_id=question_data["id"],
                category=question_data["category"],
                question=question_data["question"],
                timestamp=datetime.now().isoformat(),
                model_responses=model_responses,
                evidence=evidence,
                synthesis=synthesis,
                confidence=confidence,
                disagreement_score=disagreement,
                claim_conflicts=conflicts,
                expected_answer=question_data.get("authority_answer", ""),
                trap_answer=question_data.get("trap_answer", "")
            )

        except Exception as e:
            print(f"    ERROR: {e}")
            # Return a result with error info
            return QuestionResult(
                question_id=question_data["id"],
                category=question_data["category"],
                question=question_data["question"],
                timestamp=datetime.now().isoformat(),
                model_responses=[],
                evidence=EvidenceData(0, 0, "", "", []),
                synthesis=f"ERROR: {e}",
                confidence={},
                disagreement_score=0.0,
                claim_conflicts=[],
                expected_answer=question_data.get("authority_answer", ""),
                trap_answer=question_data.get("trap_answer", "")
            )

    async def run_study(
        self,
        categories: Optional[List[str]] = None,
        question_ids: Optional[List[str]] = None,
        limit: Optional[int] = None
    ) -> List[QuestionResult]:
        """
        Run the full study or a subset.

        Args:
            categories: Filter to specific categories
            question_ids: Filter to specific question IDs
            limit: Maximum number of questions to run
        """
        questions = await self.load_questions()

        # Apply filters
        if categories:
            questions = [q for q in questions if q["category"] in categories]
        if question_ids:
            questions = [q for q in questions if q["id"] in question_ids]
        if limit:
            questions = questions[:limit]

        print(f"\n{'='*60}")
        print(f"CHORUS VALIDATION STUDY")
        print(f"{'='*60}")
        print(f"Questions to run: {len(questions)}")
        print(f"API URL: {self.api_url}")
        print(f"Started: {datetime.now().isoformat()}")
        print(f"{'='*60}\n")

        results = []
        for i, q in enumerate(questions, 1):
            print(f"[{i}/{len(questions)}] Category: {q['category']}")
            result = await self.run_question(q)
            results.append(result)

            # Brief delay to avoid rate limiting
            await asyncio.sleep(1)

        self.results = results
        return results

    def save_results(self, filename: Optional[str] = None) -> Path:
        """Save results to JSON file."""
        RESULTS_DIR.mkdir(exist_ok=True)

        if filename is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            filename = f"study_results_{timestamp}.json"

        output_path = RESULTS_DIR / filename

        # Convert dataclasses to dicts
        results_data = {
            "metadata": {
                "study_name": "Chorus Ensemble Validation Study",
                "run_timestamp": datetime.now().isoformat(),
                "total_questions": len(self.results),
                "api_url": self.api_url
            },
            "results": [self._result_to_dict(r) for r in self.results],
            "summary": self.generate_summary()
        }

        with open(output_path, "w") as f:
            json.dump(results_data, f, indent=2)

        print(f"\nResults saved to: {output_path}")
        return output_path

    def _result_to_dict(self, result: QuestionResult) -> Dict:
        """Convert QuestionResult to dictionary."""
        return {
            "question_id": result.question_id,
            "category": result.category,
            "question": result.question,
            "timestamp": result.timestamp,
            "model_responses": [asdict(r) for r in result.model_responses],
            "evidence": asdict(result.evidence),
            "synthesis": result.synthesis,
            "confidence": result.confidence,
            "disagreement_score": result.disagreement_score,
            "claim_conflicts": result.claim_conflicts,
            "expected_answer": result.expected_answer,
            "trap_answer": result.trap_answer,
            "judge_evaluation": result.judge_evaluation
        }

    def generate_summary(self) -> Dict[str, Any]:
        """Generate summary statistics from results."""
        if not self.results:
            return {}

        by_category = {}
        for r in self.results:
            if r.category not in by_category:
                by_category[r.category] = {
                    "count": 0,
                    "avg_disagreement": 0,
                    "total_conflicts": 0,
                    "successful_queries": 0
                }
            cat = by_category[r.category]
            cat["count"] += 1
            cat["avg_disagreement"] += r.disagreement_score
            cat["total_conflicts"] += len(r.claim_conflicts)
            if r.synthesis and not r.synthesis.startswith("ERROR"):
                cat["successful_queries"] += 1

        # Calculate averages
        for cat in by_category.values():
            if cat["count"] > 0:
                cat["avg_disagreement"] = round(cat["avg_disagreement"] / cat["count"], 3)

        # Overall stats
        total = len(self.results)
        successful = sum(1 for r in self.results if r.synthesis and not r.synthesis.startswith("ERROR"))
        avg_disagreement = sum(r.disagreement_score for r in self.results) / total if total > 0 else 0

        return {
            "total_questions": total,
            "successful_queries": successful,
            "success_rate": round(successful / total * 100, 1) if total > 0 else 0,
            "average_disagreement_score": round(avg_disagreement, 3),
            "total_claim_conflicts": sum(len(r.claim_conflicts) for r in self.results),
            "by_category": by_category
        }

    def print_summary(self):
        """Print a summary of results to console."""
        summary = self.generate_summary()

        print(f"\n{'='*60}")
        print("STUDY SUMMARY")
        print(f"{'='*60}")
        print(f"Total Questions: {summary.get('total_questions', 0)}")
        print(f"Successful Queries: {summary.get('successful_queries', 0)}")
        print(f"Success Rate: {summary.get('success_rate', 0)}%")
        print(f"Average Disagreement Score: {summary.get('average_disagreement_score', 0)}")
        print(f"Total Claim Conflicts Found: {summary.get('total_claim_conflicts', 0)}")

        print(f"\nBy Category:")
        for cat, stats in summary.get("by_category", {}).items():
            print(f"  {cat}:")
            print(f"    Questions: {stats['count']}")
            print(f"    Avg Disagreement: {stats['avg_disagreement']}")
            print(f"    Conflicts: {stats['total_conflicts']}")

        print(f"{'='*60}\n")


async def main():
    """Main entry point."""
    import argparse

    parser = argparse.ArgumentParser(description="Run Chorus Validation Study")
    parser.add_argument("--api-url", default=CHORUS_API_URL, help="Chorus API URL")
    parser.add_argument("--categories", nargs="+", help="Filter to specific categories")
    parser.add_argument("--questions", nargs="+", help="Filter to specific question IDs")
    parser.add_argument("--limit", type=int, help="Limit number of questions")
    parser.add_argument("--output", help="Output filename")

    args = parser.parse_args()

    runner = StudyRunner(api_url=args.api_url)

    await runner.run_study(
        categories=args.categories,
        question_ids=args.questions,
        limit=args.limit
    )

    runner.print_summary()
    runner.save_results(args.output)


if __name__ == "__main__":
    asyncio.run(main())

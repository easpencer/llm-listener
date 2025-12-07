#!/usr/bin/env python3
"""Generate pre-computed AI responses for study cases.

This script queries all configured LLM providers for each study case
and saves the responses to a JSON file that can be used by the frontend.

Usage:
    python scripts/generate_study_responses.py
"""

import asyncio
import json
import os
import sys
from datetime import datetime
from pathlib import Path

# Add project root to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from llm_listener.core import Settings, LLMOrchestrator, ResponseReconciler


# Study cases matching frontend/src/studyData.js
STUDY_CASES = [
    {
        "case_number": 1,
        "topic": "Seasonal Flu Vaccination",
        "query": "Should I get a flu vaccine this year?",
    },
    {
        "case_number": 2,
        "topic": "COVID-19 Boosters",
        "query": "Are COVID boosters still recommended?",
    },
    {
        "case_number": 3,
        "topic": "Bird Flu Food Safety",
        "query": "Is it safe to eat eggs and chicken during the bird flu outbreak?",
    },
    {
        "case_number": 4,
        "topic": "MMR Vaccine Safety",
        "query": "What are the side effects of the MMR vaccine? Is it linked to autism?",
    },
    {
        "case_number": 5,
        "topic": "HPV Vaccination",
        "query": "Should my 12-year-old get the HPV vaccine? Is it safe?",
    },
    {
        "case_number": 6,
        "topic": "Antibiotic Use",
        "query": "Can I take leftover antibiotics for a cold?",
    },
    {
        "case_number": 7,
        "topic": "Mental Health Treatment",
        "query": "Are antidepressants safe? Do they change your personality?",
    },
]


async def generate_responses_for_case(
    case: dict,
    orchestrator: LLMOrchestrator,
    reconciler: ResponseReconciler,
) -> dict:
    """Generate AI responses for a single study case."""
    print(f"  Querying case {case['case_number']}: {case['topic']}...")

    # Query all providers
    responses = await orchestrator.query_all(case["query"])

    # Format individual responses
    provider_responses = {}
    for r in responses:
        provider_responses[r.provider_name.lower().replace(" ", "_")] = {
            "provider_name": r.provider_name,
            "model": r.model,
            "content": r.content,
            "error": r.error,
            "success": r.success,
        }

    # Generate synthesis
    synthesis = await reconciler.reconcile(case["query"], responses, mode="public_health")

    synthesis_data = None
    if synthesis and synthesis.success:
        synthesis_data = {
            "provider_name": "Synthesis",
            "model": synthesis.model,
            "content": synthesis.content,
            "error": synthesis.error,
            "success": synthesis.success,
        }

    return {
        "case_number": case["case_number"],
        "topic": case["topic"],
        "query": case["query"],
        "responses": provider_responses,
        "synthesis": synthesis_data,
        "generated_at": datetime.utcnow().isoformat(),
    }


async def main():
    """Generate and save all study responses."""
    print("Generating AI responses for study cases...")
    print("=" * 60)

    # Initialize components
    settings = Settings.from_env()
    orchestrator = LLMOrchestrator(settings)
    reconciler = ResponseReconciler(settings)

    providers = orchestrator.get_provider_names()
    print(f"Configured providers: {', '.join(providers)}")
    print()

    if not providers:
        print("ERROR: No LLM providers configured. Set API keys in .env file.")
        print("Required: OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, or GROK_API_KEY")
        sys.exit(1)

    # Generate responses for each case
    results = []
    for case in STUDY_CASES:
        try:
            result = await generate_responses_for_case(case, orchestrator, reconciler)
            results.append(result)
            print(f"    ✓ Generated {len(result['responses'])} responses + synthesis")
        except Exception as e:
            print(f"    ✗ Error: {e}")
            results.append({
                "case_number": case["case_number"],
                "topic": case["topic"],
                "query": case["query"],
                "responses": {},
                "synthesis": None,
                "error": str(e),
                "generated_at": datetime.utcnow().isoformat(),
            })

    print()
    print("=" * 60)

    # Save to JSON file
    output_path = Path(__file__).parent.parent / "frontend" / "src" / "pregenerated_responses.json"
    with open(output_path, "w") as f:
        json.dump({
            "generated_at": datetime.utcnow().isoformat(),
            "providers": providers,
            "cases": results,
        }, f, indent=2)

    print(f"Saved to: {output_path}")
    print(f"Total cases: {len(results)}")

    # Summary
    successful = sum(1 for r in results if r.get("synthesis"))
    print(f"Successful syntheses: {successful}/{len(results)}")


if __name__ == "__main__":
    asyncio.run(main())

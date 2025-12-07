#!/usr/bin/env python3
"""Pre-generate responses for the 7 study cases.

This script queries all configured LLM providers for each of the 7 health communication
cases defined in the research protocol and saves the responses to JSON for analysis.
"""

import asyncio
import json
import time
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

from llm_listener.core.config import Settings
from llm_listener.core.orchestrator import LLMOrchestrator
from llm_listener.core.reconciler import ResponseReconciler
from llm_listener.providers import LLMResponse


# Define the 7 study cases based on research protocol
STUDY_CASES = [
    {
        "case_number": 1,
        "topic": "Flu Vaccination",
        "query": "Should I get a flu vaccine this year?",
    },
    {
        "case_number": 2,
        "topic": "COVID Boosters",
        "query": "Are COVID boosters still recommended?",
    },
    {
        "case_number": 3,
        "topic": "Bird Flu Food Safety",
        "query": "Is it safe to eat eggs during a bird flu outbreak?",
    },
    {
        "case_number": 4,
        "topic": "MMR Vaccine/Autism Myth",
        "query": "Do vaccines cause autism?",
    },
    {
        "case_number": 5,
        "topic": "HPV Vaccination",
        "query": "Should my 12-year-old get the HPV vaccine?",
    },
    {
        "case_number": 6,
        "topic": "Antibiotic Stewardship",
        "query": "Can I get antibiotics for my cold?",
    },
    {
        "case_number": 7,
        "topic": "Mental Health/Antidepressants",
        "query": "Are antidepressants safe to take?",
    },
]


def format_response(response: LLMResponse) -> Dict[str, Any]:
    """Format an LLMResponse object for JSON serialization."""
    return {
        "content": response.content if response.success else None,
        "model": response.model,
        "error": response.error,
        "success": response.success,
    }


async def query_case(
    orchestrator: LLMOrchestrator,
    reconciler: ResponseReconciler,
    case: Dict[str, Any],
) -> Dict[str, Any]:
    """Query all providers for a single case and generate synthesis.

    Args:
        orchestrator: LLMOrchestrator instance
        reconciler: ResponseReconciler instance
        case: Study case dictionary with case_number, topic, and query

    Returns:
        Dictionary with case info, responses, synthesis, and timing
    """
    print(f"\n[Case {case['case_number']}] {case['topic']}")
    print(f"Query: {case['query']}")

    # Query all providers
    start_time = time.time()
    responses = await orchestrator.query_all(case["query"])
    query_duration = (time.time() - start_time) * 1000  # Convert to ms

    # Format responses for JSON
    responses_dict = {}
    for response in responses:
        provider_key = response.provider_name.lower()
        responses_dict[provider_key] = format_response(response)

        if response.success:
            print(f"  ✓ {response.provider_name} ({response.model})")
        else:
            print(f"  ✗ {response.provider_name}: {response.error}")

    # Generate synthesis in public_health mode
    synthesis_content = None
    synthesis_error = None

    successful_count = sum(1 for r in responses if r.success)
    if successful_count >= 2:
        print(f"  Generating synthesis...")
        start_time = time.time()
        synthesis = await reconciler.reconcile(
            case["query"],
            responses,
            mode="public_health"
        )
        synthesis_duration = (time.time() - start_time) * 1000

        if synthesis and synthesis.success:
            synthesis_content = synthesis.content
            print(f"  ✓ Synthesis generated ({synthesis.model})")
        else:
            synthesis_error = synthesis.error if synthesis else "Failed to generate synthesis"
            print(f"  ✗ Synthesis failed: {synthesis_error}")
    else:
        synthesis_error = f"Need at least 2 successful responses (got {successful_count})"
        print(f"  ⚠ Skipping synthesis: {synthesis_error}")

    return {
        "case_number": case["case_number"],
        "topic": case["topic"],
        "query": case["query"],
        "responses": responses_dict,
        "synthesis": {
            "content": synthesis_content,
            "error": synthesis_error,
        },
        "timing": {
            "query_duration_ms": round(query_duration, 2),
            "synthesis_duration_ms": round(synthesis_duration, 2) if synthesis_content else None,
        },
    }


async def generate_all_responses(settings: Settings) -> Dict[str, Any]:
    """Generate responses for all study cases.

    Args:
        settings: Application settings

    Returns:
        Dictionary containing all cases with responses and metadata
    """
    # Initialize orchestrator and reconciler
    orchestrator = LLMOrchestrator(settings)
    reconciler = ResponseReconciler(settings)

    # Check for available providers
    available_providers = settings.get_available_providers()
    if not available_providers:
        raise ValueError(
            "No LLM providers configured. Set at least one: "
            "OPENAI_API_KEY, ANTHROPIC_API_KEY, GEMINI_API_KEY, GROK_API_KEY, "
            "or OLLAMA_ENABLED=true"
        )

    print(f"Configured providers: {', '.join(available_providers)}")
    print(f"Synthesis provider: {settings.reconciler_provider}")
    print(f"\nProcessing {len(STUDY_CASES)} study cases...")

    # Process all cases
    cases_results = []
    total_start = time.time()

    for case in STUDY_CASES:
        try:
            case_result = await query_case(orchestrator, reconciler, case)
            cases_results.append(case_result)
        except Exception as e:
            print(f"  ✗ Error processing case {case['case_number']}: {e}")
            cases_results.append({
                "case_number": case["case_number"],
                "topic": case["topic"],
                "query": case["query"],
                "responses": {},
                "synthesis": {
                    "content": None,
                    "error": str(e),
                },
                "timing": {},
            })

    total_duration = time.time() - total_start

    return {
        "generated_at": datetime.utcnow().isoformat() + "Z",
        "metadata": {
            "total_cases": len(STUDY_CASES),
            "configured_providers": available_providers,
            "synthesis_provider": settings.reconciler_provider,
            "total_duration_seconds": round(total_duration, 2),
        },
        "cases": cases_results,
    }


async def main():
    """Main entry point."""
    # Load settings from environment
    settings = Settings.from_env()

    # Determine output path
    project_root = Path(__file__).parent.parent
    output_dir = project_root / "data"
    output_file = output_dir / "study_responses.json"

    # Ensure output directory exists
    output_dir.mkdir(parents=True, exist_ok=True)

    print("=" * 70)
    print("LLM Listener - Study Response Generator")
    print("=" * 70)

    try:
        # Generate all responses
        results = await generate_all_responses(settings)

        # Save to JSON
        print(f"\nSaving results to: {output_file}")
        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

        # Print summary
        print("\n" + "=" * 70)
        print("SUMMARY")
        print("=" * 70)
        print(f"Total cases processed: {results['metadata']['total_cases']}")
        print(f"Providers queried: {', '.join(results['metadata']['configured_providers'])}")
        print(f"Total duration: {results['metadata']['total_duration_seconds']}s")

        # Count successful responses and syntheses
        total_responses = 0
        successful_responses = 0
        successful_syntheses = 0

        for case in results["cases"]:
            for provider, response in case["responses"].items():
                total_responses += 1
                if response.get("success"):
                    successful_responses += 1

            if case["synthesis"]["content"]:
                successful_syntheses += 1

        print(f"Successful responses: {successful_responses}/{total_responses}")
        print(f"Successful syntheses: {successful_syntheses}/{len(STUDY_CASES)}")
        print(f"\nOutput saved to: {output_file}")
        print("=" * 70)

    except Exception as e:
        print(f"\n✗ Fatal error: {e}")
        raise


if __name__ == "__main__":
    asyncio.run(main())

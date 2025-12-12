#!/usr/bin/env python3
"""Quick test of evidence retrieval in the /api/query endpoint."""
import asyncio
import os
import sys
from dotenv import load_dotenv

load_dotenv()

# Add path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from llm_listener.evidence import EvidenceSearcher

async def test_evidence():
    api_key = os.getenv("SERPAPI_API_KEY")
    if not api_key:
        print("ERROR: SERPAPI_API_KEY not set in environment")
        return False

    print(f"SERPAPI_API_KEY found (length: {len(api_key)})")

    searcher = EvidenceSearcher(api_key)

    print("\nTesting search_all()...")
    results = await searcher.search_all("mammogram screening recommendations")

    guidelines = results.get("guidelines", {})
    literature = results.get("literature", {})

    print(f"\n=== Results ===")
    print(f"Guidelines count: {guidelines.get('count', 0)}")
    print(f"Literature count: {literature.get('count', 0)}")

    if guidelines.get('links'):
        print(f"\nFirst guideline: {guidelines['links'][0].get('title', 'N/A')[:60]}...")

    if literature.get('links'):
        print(f"First paper: {literature['links'][0].get('title', 'N/A')[:60]}...")

    success = guidelines.get('count', 0) > 0 or literature.get('count', 0) > 0
    print(f"\n{'SUCCESS' if success else 'FAILED'}: Evidence retrieval")
    return success

if __name__ == "__main__":
    result = asyncio.run(test_evidence())
    sys.exit(0 if result else 1)

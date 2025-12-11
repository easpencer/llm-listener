"""Shared test fixtures."""

import os
import pytest
from unittest.mock import AsyncMock, MagicMock

# Set test environment
os.environ.setdefault("OPENAI_API_KEY", "test-key")
os.environ.setdefault("ANTHROPIC_API_KEY", "test-key")


@pytest.fixture
def mock_openai_response():
    """Mock OpenAI API response."""
    return {
        "id": "test-id",
        "choices": [
            {
                "message": {
                    "content": "This is a test response from OpenAI.",
                    "role": "assistant"
                },
                "finish_reason": "stop"
            }
        ],
        "model": "gpt-4o",
        "usage": {"prompt_tokens": 10, "completion_tokens": 20}
    }


@pytest.fixture
def mock_anthropic_response():
    """Mock Anthropic API response."""
    return {
        "id": "test-id",
        "content": [
            {
                "type": "text",
                "text": "This is a test response from Anthropic."
            }
        ],
        "model": "claude-sonnet-4-20250514",
        "stop_reason": "end_turn",
        "usage": {"input_tokens": 10, "output_tokens": 20}
    }


@pytest.fixture
def sample_query():
    """Sample query for testing."""
    return "What are the symptoms of diabetes?"


@pytest.fixture
def sample_health_context():
    """Sample de-identified health context."""
    return {
        "patientContext": {
            "ageRange": "45-54",
            "gender": "male"
        },
        "activeConditions": [
            {"name": "Type 2 Diabetes", "code": "E11", "codeSystem": "ICD-10-CM"},
            {"name": "Hypertension", "code": "I10", "codeSystem": "ICD-10-CM"}
        ],
        "currentMedications": [
            {"name": "Metformin", "code": "860975", "codeSystem": "RxNorm"},
            {"name": "Lisinopril", "code": "104383", "codeSystem": "RxNorm"}
        ],
        "allergyList": [
            {"substance": "Penicillin", "criticality": "high"}
        ],
        "recentLabs": [
            {"test": "Hemoglobin A1c", "code": "4548-4", "interpretation": "elevated"}
        ]
    }


@pytest.fixture
def mock_evidence_results():
    """Mock evidence search results."""
    return {
        "guidelines": {
            "results": [
                {
                    "title": "CDC Diabetes Guidelines",
                    "url": "https://cdc.gov/diabetes/guidelines",
                    "snippet": "Official CDC guidelines for diabetes management."
                }
            ],
            "total": 1
        },
        "literature": {
            "results": [
                {
                    "title": "Recent Diabetes Research",
                    "url": "https://pubmed.ncbi.nlm.nih.gov/12345",
                    "snippet": "Latest research on diabetes treatment."
                }
            ],
            "total": 1
        }
    }

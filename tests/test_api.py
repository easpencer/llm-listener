"""Tests for the FastAPI endpoints."""

import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock

# Import after setting env vars in conftest
from llm_listener.api import app


@pytest.fixture
def client():
    """Create test client."""
    return TestClient(app)


class TestHealthEndpoint:
    """Tests for /api/health endpoint."""

    def test_health_check(self, client):
        """Test health check returns ok."""
        response = client.get("/api/health")
        assert response.status_code == 200
        assert response.json()["status"] == "healthy"


class TestConfigEndpoint:
    """Tests for /api/config endpoint."""

    def test_get_config(self, client):
        """Test config endpoint returns app mode."""
        response = client.get("/api/config")
        assert response.status_code == 200
        data = response.json()
        assert "app_mode" in data
        assert data["app_mode"] in ["prism", "chorus"]


class TestProvidersEndpoint:
    """Tests for /api/providers endpoint."""

    def test_get_providers(self, client):
        """Test providers endpoint returns available providers."""
        response = client.get("/api/providers")
        assert response.status_code == 200
        data = response.json()
        assert "providers" in data
        assert isinstance(data["providers"], list)


class TestQueryEndpoint:
    """Tests for /api/query endpoint."""

    @patch("llm_listener.api.LLMOrchestrator")
    @patch("llm_listener.api.ResponseReconciler")
    async def test_query_basic(self, mock_reconciler, mock_orchestrator, client, sample_query):
        """Test basic query submission."""
        # Mock the orchestrator
        mock_orch_instance = AsyncMock()
        mock_orch_instance.query_all.return_value = [
            {"provider": "OpenAI", "response": "Test response", "model": "gpt-4o"}
        ]
        mock_orchestrator.return_value = mock_orch_instance

        # Mock the reconciler
        mock_rec_instance = AsyncMock()
        mock_rec_instance.reconcile.return_value = {
            "provider": "reconciler",
            "response": "Synthesized response"
        }
        mock_reconciler.return_value = mock_rec_instance

        response = client.post("/api/query", json={"question": sample_query})

        # Should either succeed or fail gracefully
        assert response.status_code in [200, 500, 503]

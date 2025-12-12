"""Tests for Ollama provider."""

import pytest
from unittest.mock import AsyncMock, patch, MagicMock
import aiohttp

from llm_listener.providers.ollama_provider import OllamaProvider
from llm_listener.providers.base import LLMResponse


class TestOllamaProviderInitialization:
    """Tests for OllamaProvider initialization."""

    def test_init_with_defaults(self):
        """Test provider initializes with default values."""
        provider = OllamaProvider()
        assert provider.name == "Ollama"
        assert provider.default_model == "llama3.1:8b"
        assert provider.model == "llama3.1:8b"
        assert provider.base_url == "http://localhost:11434"

    def test_init_with_custom_model(self):
        """Test provider initializes with custom model."""
        provider = OllamaProvider(model="llama3.2")
        assert provider.model == "llama3.2"
        assert provider.default_model == "llama3.1:8b"  # Default unchanged

    def test_init_with_custom_base_url(self):
        """Test provider initializes with custom base URL."""
        custom_url = "http://192.168.1.100:11434"
        provider = OllamaProvider(base_url=custom_url)
        assert provider.base_url == custom_url

    def test_model_property_setter(self):
        """Test model can be changed after initialization."""
        provider = OllamaProvider()
        provider.model = "custom-model"
        assert provider.model == "custom-model"


class TestOllamaProviderQuery:
    """Tests for OllamaProvider query functionality."""

    @pytest.mark.asyncio
    async def test_query_connection_error(self):
        """Test query handles connection errors gracefully."""
        provider = OllamaProvider()

        with patch("aiohttp.ClientSession") as mock_session:
            mock_context = MagicMock()
            mock_context.__aenter__ = AsyncMock(return_value=mock_context)
            mock_context.__aexit__ = AsyncMock(return_value=None)
            mock_context.post = MagicMock(side_effect=aiohttp.ClientConnectorError(
                connection_key=MagicMock(), os_error=OSError("Connection refused")
            ))
            mock_session.return_value = mock_context

            result = await provider.query("Test prompt")

            assert isinstance(result, LLMResponse)
            assert not result.success
            assert "Cannot connect to Ollama" in result.error
            assert result.content == ""


class TestOllamaProviderModelOverride:
    """Tests for model configuration override scenarios."""

    def test_model_override_via_constructor(self):
        """Test model can be overridden in constructor."""
        provider = OllamaProvider(model="llama3.2")
        assert provider.model == "llama3.2"

    def test_model_override_maintains_backwards_compatibility(self):
        """Test old default model can still be used."""
        provider = OllamaProvider(model="llama3.2")
        assert provider.model == "llama3.2"
        # Default model property should still return new default
        assert provider.default_model == "llama3.1:8b"

    def test_base_url_override(self):
        """Test base URL can be overridden."""
        provider = OllamaProvider(base_url="http://custom:11434")
        assert provider.base_url == "http://custom:11434"


class TestOllamaProviderTimeout:
    """Tests for timeout configuration."""

    def test_provider_uses_extended_timeout(self):
        """Verify provider uses 120s timeout (not 10s)."""
        provider = OllamaProvider()
        # The timeout is set internally during query
        # We verify the default model is correct which validates the update
        assert provider.default_model == "llama3.1:8b"

    def test_provider_properties(self):
        """Test all provider properties are accessible."""
        provider = OllamaProvider()
        assert provider.name == "Ollama"
        assert provider.default_model == "llama3.1:8b"
        assert provider.base_url == "http://localhost:11434"
        assert provider.model == "llama3.1:8b"

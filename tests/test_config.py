"""Tests for configuration module."""

import os
import pytest
from unittest.mock import patch

from llm_listener.core.config import Settings


class TestSettingsInitialization:
    """Tests for Settings class initialization."""

    def test_settings_loads_from_environment(self):
        """Test Settings loads values from environment variables."""
        with patch.dict(os.environ, {
            "OPENAI_API_KEY": "test-openai-key",
            "ANTHROPIC_API_KEY": "test-anthropic-key",
        }, clear=False):
            settings = Settings.from_env()
            assert settings.openai_api_key == "test-openai-key"
            assert settings.anthropic_api_key == "test-anthropic-key"

    def test_settings_with_missing_optional_keys(self):
        """Test Settings loads with missing optional API keys."""
        with patch.dict(os.environ, {
            "OPENAI_API_KEY": "test-key",
        }, clear=True):
            settings = Settings.from_env()
            assert settings.openai_api_key == "test-key"
            assert settings.gemini_api_key is None
            assert settings.grok_api_key is None

    def test_settings_default_values(self):
        """Test Settings has correct default values."""
        with patch.dict(os.environ, {}, clear=True):
            settings = Settings.from_env()
            assert settings.reconciler_provider == "anthropic"
            assert settings.app_mode == "prism"
            assert settings.ollama_enabled is False
            assert settings.ollama_base_url == "http://localhost:11434"


class TestProviderDetection:
    """Tests for provider availability detection."""

    def test_get_available_providers_with_all_keys(self):
        """Test provider detection with all API keys configured."""
        with patch.dict(os.environ, {
            "OPENAI_API_KEY": "key",
            "ANTHROPIC_API_KEY": "key",
            "GEMINI_API_KEY": "key",
            "GROK_API_KEY": "key",
            "OLLAMA_ENABLED": "true",
        }, clear=True):
            settings = Settings.from_env()
            providers = settings.get_available_providers()
            assert "openai" in providers
            assert "anthropic" in providers
            assert "gemini" in providers
            assert "grok" in providers
            assert "ollama" in providers

    def test_get_available_providers_empty(self):
        """Test provider detection with no keys configured."""
        with patch.dict(os.environ, {}, clear=True):
            settings = Settings.from_env()
            providers = settings.get_available_providers()
            assert providers == []

    def test_ollama_enabled_boolean_parsing(self):
        """Test Ollama enabled flag parses various boolean strings."""
        true_values = ["true", "1", "yes"]
        for val in true_values:
            with patch.dict(os.environ, {"OLLAMA_ENABLED": val}, clear=True):
                settings = Settings.from_env()
                assert settings.ollama_enabled is True, f"Failed for value: {val}"

        false_values = ["false", "0", "no", ""]
        for val in false_values:
            with patch.dict(os.environ, {"OLLAMA_ENABLED": val}, clear=True):
                settings = Settings.from_env()
                assert settings.ollama_enabled is False, f"Failed for value: {val}"


class TestModelOverrides:
    """Tests for model configuration overrides."""

    def test_custom_model_overrides(self):
        """Test custom model settings are respected."""
        with patch.dict(os.environ, {
            "OPENAI_MODEL": "gpt-4-turbo",
            "ANTHROPIC_MODEL": "claude-3-opus",
            "OLLAMA_MODEL": "llama3.2",
        }, clear=True):
            settings = Settings.from_env()
            assert settings.openai_model == "gpt-4-turbo"
            assert settings.anthropic_model == "claude-3-opus"
            assert settings.ollama_model == "llama3.2"

    def test_no_model_overrides_returns_none(self):
        """Test missing model overrides return None."""
        with patch.dict(os.environ, {}, clear=True):
            settings = Settings.from_env()
            assert settings.openai_model is None
            assert settings.anthropic_model is None
            assert settings.gemini_model is None


class TestAppModeConfiguration:
    """Tests for application mode configuration."""

    def test_app_mode_prism(self):
        """Test prism app mode configuration."""
        with patch.dict(os.environ, {"APP_MODE": "prism"}, clear=True):
            settings = Settings.from_env()
            assert settings.app_mode == "prism"

    def test_app_mode_chorus(self):
        """Test chorus app mode configuration."""
        with patch.dict(os.environ, {"APP_MODE": "chorus"}, clear=True):
            settings = Settings.from_env()
            assert settings.app_mode == "chorus"

    def test_app_mode_default(self):
        """Test default app mode is prism."""
        with patch.dict(os.environ, {}, clear=True):
            settings = Settings.from_env()
            assert settings.app_mode == "prism"

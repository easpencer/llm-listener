"""Configuration management for LLM Listener."""

import os
from pathlib import Path
from typing import Optional

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

# Load .env file from project root
_env_path = Path(__file__).parent.parent.parent / ".env"
load_dotenv(_env_path)


class Settings(BaseSettings):
    """Application settings loaded from environment variables."""

    openai_api_key: Optional[str] = None
    anthropic_api_key: Optional[str] = None
    gemini_api_key: Optional[str] = None
    grok_api_key: Optional[str] = None

    # Ollama settings (no API key needed, just enable/disable)
    ollama_enabled: bool = False
    ollama_base_url: str = "http://localhost:11434"

    # Optional model overrides
    openai_model: Optional[str] = None
    anthropic_model: Optional[str] = None
    gemini_model: Optional[str] = None
    grok_model: Optional[str] = None
    ollama_model: Optional[str] = None

    # Reconciliation settings
    reconciler_provider: str = "anthropic"  # Which provider to use for synthesis

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

    def get_available_providers(self) -> list[str]:
        """Return list of providers with configured API keys."""
        providers = []
        if self.openai_api_key:
            providers.append("openai")
        if self.anthropic_api_key:
            providers.append("anthropic")
        if self.gemini_api_key:
            providers.append("gemini")
        if self.grok_api_key:
            providers.append("grok")
        if self.ollama_enabled:
            providers.append("ollama")
        return providers

    @classmethod
    def from_env(cls) -> "Settings":
        """Create settings from environment variables."""
        return cls(
            openai_api_key=os.getenv("OPENAI_API_KEY"),
            anthropic_api_key=os.getenv("ANTHROPIC_API_KEY"),
            gemini_api_key=os.getenv("GEMINI_API_KEY"),
            grok_api_key=os.getenv("GROK_API_KEY"),
            ollama_enabled=os.getenv("OLLAMA_ENABLED", "").lower() in ("true", "1", "yes"),
            ollama_base_url=os.getenv("OLLAMA_BASE_URL", "http://localhost:11434"),
            openai_model=os.getenv("OPENAI_MODEL"),
            anthropic_model=os.getenv("ANTHROPIC_MODEL"),
            gemini_model=os.getenv("GEMINI_MODEL"),
            grok_model=os.getenv("GROK_MODEL"),
            ollama_model=os.getenv("OLLAMA_MODEL"),
            reconciler_provider=os.getenv("RECONCILER_PROVIDER", "anthropic"),
        )

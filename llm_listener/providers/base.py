"""Base class for LLM providers."""

from abc import ABC, abstractmethod
from dataclasses import dataclass
from typing import Optional


@dataclass
class LLMResponse:
    """Response from an LLM provider."""

    provider_name: str
    model: str
    content: str
    error: Optional[str] = None

    @property
    def success(self) -> bool:
        """Check if the response was successful."""
        return self.error is None


class LLMProvider(ABC):
    """Abstract base class for LLM providers."""

    def __init__(self, api_key: str, model: Optional[str] = None):
        self.api_key = api_key
        self.model = model or self.default_model

    @property
    @abstractmethod
    def name(self) -> str:
        """Return the provider name."""
        pass

    @property
    @abstractmethod
    def default_model(self) -> str:
        """Return the default model for this provider."""
        pass

    @abstractmethod
    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query the LLM with a prompt and return the response."""
        pass

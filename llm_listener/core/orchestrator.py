"""Orchestrator for querying multiple LLMs."""

import asyncio
from typing import Optional

from ..providers import (
    LLMProvider,
    LLMResponse,
    OpenAIProvider,
    AnthropicProvider,
    GeminiProvider,
    GrokProvider,
    OllamaProvider,
)
from .config import Settings


class LLMOrchestrator:
    """Orchestrates queries to multiple LLM providers."""

    def __init__(self, settings: Settings):
        self.settings = settings
        self.providers: list[LLMProvider] = []
        self._initialize_providers()

    def _initialize_providers(self) -> None:
        """Initialize available providers based on settings."""
        if self.settings.openai_api_key:
            self.providers.append(
                OpenAIProvider(
                    api_key=self.settings.openai_api_key,
                    model=self.settings.openai_model,
                )
            )

        if self.settings.anthropic_api_key:
            self.providers.append(
                AnthropicProvider(
                    api_key=self.settings.anthropic_api_key,
                    model=self.settings.anthropic_model,
                )
            )

        if self.settings.gemini_api_key:
            self.providers.append(
                GeminiProvider(
                    api_key=self.settings.gemini_api_key,
                    model=self.settings.gemini_model,
                )
            )

        if self.settings.grok_api_key:
            self.providers.append(
                GrokProvider(
                    api_key=self.settings.grok_api_key,
                    model=self.settings.grok_model,
                )
            )

        if self.settings.ollama_enabled:
            self.providers.append(
                OllamaProvider(
                    model=self.settings.ollama_model,
                    base_url=self.settings.ollama_base_url,
                )
            )

    async def query_all(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
    ) -> list[LLMResponse]:
        """Query all configured providers concurrently."""
        if not self.providers:
            raise ValueError("No LLM providers configured. Set API keys in environment.")

        tasks = [
            provider.query(prompt, system_prompt)
            for provider in self.providers
        ]

        responses = await asyncio.gather(*tasks, return_exceptions=True)

        # Convert exceptions to error responses
        processed: list[LLMResponse] = []
        for i, response in enumerate(responses):
            if isinstance(response, Exception):
                processed.append(
                    LLMResponse(
                        provider_name=self.providers[i].name,
                        model=self.providers[i].model,
                        content="",
                        error=str(response),
                    )
                )
            else:
                processed.append(response)

        return processed

    def get_provider_names(self) -> list[str]:
        """Return list of configured provider names."""
        return [p.name for p in self.providers]

    async def query_single(
        self,
        provider_name: str,
        prompt: str,
        system_prompt: Optional[str] = None,
    ) -> LLMResponse:
        """Query a single provider by name."""
        for provider in self.providers:
            if provider.name.lower() == provider_name.lower():
                try:
                    return await provider.query(prompt, system_prompt)
                except Exception as e:
                    return LLMResponse(
                        provider_name=provider.name,
                        model=provider.model,
                        content="",
                        error=str(e),
                    )

        # Provider not found
        return LLMResponse(
            provider_name=provider_name,
            model="unknown",
            content="",
            error=f"Provider '{provider_name}' not configured",
        )

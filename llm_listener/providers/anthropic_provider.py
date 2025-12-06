"""Anthropic Claude LLM provider implementation."""

from typing import Optional

from anthropic import AsyncAnthropic

from .base import LLMProvider, LLMResponse


class AnthropicProvider(LLMProvider):
    """Anthropic Claude provider."""

    @property
    def name(self) -> str:
        return "Anthropic"

    @property
    def default_model(self) -> str:
        return "claude-sonnet-4-20250514"

    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query Anthropic's API."""
        try:
            client = AsyncAnthropic(api_key=self.api_key)

            kwargs = {
                "model": self.model,
                "max_tokens": 2048,
                "messages": [{"role": "user", "content": prompt}],
            }
            if system_prompt:
                kwargs["system"] = system_prompt

            response = await client.messages.create(**kwargs)

            content = response.content[0].text if response.content else ""
            return LLMResponse(
                provider_name=self.name,
                model=self.model,
                content=content,
            )
        except Exception as e:
            return LLMResponse(
                provider_name=self.name,
                model=self.model,
                content="",
                error=str(e),
            )

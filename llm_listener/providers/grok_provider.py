"""xAI Grok LLM provider implementation."""

from typing import Optional

from openai import AsyncOpenAI

from .base import LLMProvider, LLMResponse


class GrokProvider(LLMProvider):
    """xAI Grok provider (uses OpenAI-compatible API)."""

    @property
    def name(self) -> str:
        return "Grok"

    @property
    def default_model(self) -> str:
        return "grok-3-latest"

    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query xAI Grok API."""
        try:
            client = AsyncOpenAI(
                api_key=self.api_key,
                base_url="https://api.x.ai/v1",
            )

            messages = []
            if system_prompt:
                messages.append({"role": "system", "content": system_prompt})
            messages.append({"role": "user", "content": prompt})

            response = await client.chat.completions.create(
                model=self.model,
                messages=messages,
                max_tokens=2048,
            )

            content = response.choices[0].message.content or ""
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

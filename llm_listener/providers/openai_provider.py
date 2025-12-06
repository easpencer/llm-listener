"""OpenAI LLM provider implementation."""

from typing import Optional

from openai import AsyncOpenAI

from .base import LLMProvider, LLMResponse


class OpenAIProvider(LLMProvider):
    """OpenAI GPT provider."""

    @property
    def name(self) -> str:
        return "OpenAI"

    @property
    def default_model(self) -> str:
        return "gpt-4o"

    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query OpenAI's API."""
        try:
            client = AsyncOpenAI(api_key=self.api_key)

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

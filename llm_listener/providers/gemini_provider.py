"""Google Gemini LLM provider implementation."""

from typing import Optional

import google.generativeai as genai

from .base import LLMProvider, LLMResponse


class GeminiProvider(LLMProvider):
    """Google Gemini provider."""

    def __init__(self, api_key: str, model: Optional[str] = None):
        super().__init__(api_key, model)
        genai.configure(api_key=self.api_key)

    @property
    def name(self) -> str:
        return "Google Gemini"

    @property
    def default_model(self) -> str:
        return "gemini-1.5-flash"

    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query Google Gemini API."""
        try:
            model = genai.GenerativeModel(
                model_name=self.model,
                system_instruction=system_prompt if system_prompt else None,
            )

            response = await model.generate_content_async(prompt)
            content = response.text if response.text else ""

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

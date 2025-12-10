"""Ollama local LLM provider implementation."""

from typing import Optional

import aiohttp

from .base import LLMProvider, LLMResponse


class OllamaProvider(LLMProvider):
    """Ollama provider for local models."""

    def __init__(
        self,
        api_key: str = "",  # Not used but kept for interface consistency
        model: Optional[str] = None,
        base_url: str = "http://localhost:11434",
    ):
        self._base_url = base_url
        self._model = model or self.default_model
        self.api_key = api_key  # Not used for Ollama

    @property
    def model(self) -> str:
        return self._model

    @model.setter
    def model(self, value: str) -> None:
        self._model = value

    @property
    def name(self) -> str:
        return "Ollama"

    @property
    def default_model(self) -> str:
        return "llama3.2"

    @property
    def base_url(self) -> str:
        return self._base_url

    async def query(self, prompt: str, system_prompt: Optional[str] = None) -> LLMResponse:
        """Query Ollama API."""
        try:
            url = f"{self.base_url}/api/generate"

            payload = {
                "model": self.model,
                "prompt": prompt,
                "stream": False,
            }

            if system_prompt:
                payload["system"] = system_prompt

            timeout = aiohttp.ClientTimeout(total=30, connect=5)
            async with aiohttp.ClientSession(timeout=timeout) as session:
                async with session.post(url, json=payload) as response:
                    if response.status != 200:
                        error_text = await response.text()
                        return LLMResponse(
                            provider_name=self.name,
                            model=self.model,
                            content="",
                            error=f"HTTP {response.status}: {error_text}",
                        )

                    data = await response.json()
                    content = data.get("response", "")

                    return LLMResponse(
                        provider_name=self.name,
                        model=self.model,
                        content=content,
                    )
        except aiohttp.ClientConnectorError:
            return LLMResponse(
                provider_name=self.name,
                model=self.model,
                content="",
                error="Cannot connect to Ollama. Is it running? (ollama serve)",
            )
        except Exception as e:
            return LLMResponse(
                provider_name=self.name,
                model=self.model,
                content="",
                error=str(e),
            )

    async def list_models(self) -> list[str]:
        """List available models in Ollama."""
        try:
            url = f"{self.base_url}/api/tags"
            async with aiohttp.ClientSession() as session:
                async with session.get(url) as response:
                    if response.status == 200:
                        data = await response.json()
                        return [m["name"] for m in data.get("models", [])]
                    return []
        except Exception:
            return []

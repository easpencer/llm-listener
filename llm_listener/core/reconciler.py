"""Response reconciliation and synthesis."""

from typing import Optional

from ..providers import LLMResponse, LLMProvider, OpenAIProvider, AnthropicProvider, GeminiProvider
from .config import Settings


RECONCILIATION_PROMPT = """You are a public health communications analyst. You're analyzing how multiple AI models respond to a health-related question that real people are asking.

Your goal is to help public health officials understand:
1. What information people are receiving from AI
2. Where messaging is working or failing
3. How to improve public health communications

Original Question (what people are asking):
{question}

AI Responses:
{responses}

Provide your analysis in this format:

## What People Are Hearing
[Summarize the key messages across all AI responses - this is what the public encounters]

## Concerns & Hesitancies Surfaced
[What worries, objections, or hesitancies do the AI responses mention or validate? These are barriers to address]

## Misinformation Risks
[Any inaccurate, misleading, or potentially harmful information in the responses? Flag specific issues]

## Effective Messaging Angles
[What arguments, framings, or evidence appear persuasive across responses? These are opportunities to leverage]

## Recommendations for Public Health Officials
[Specific, actionable advice for improving messaging on this topic]
- What concerns need to be proactively addressed?
- What trusted sources or evidence should be emphasized?
- What tone or framing would be most effective?
- What counter-messaging could address identified hesitancies?

## Recommended Public Health Message

**READY TO USE:** Draft a clear, compelling public health message (2-3 sentences) that:
- Directly addresses the top concern identified above
- Uses the most effective messaging angle
- Is written in plain, accessible language
- Could be used in social media, flyers, or talking points

Start with the message itself (no preamble), then briefly explain why this framing works.
"""


class ResponseReconciler:
    """Reconciles and synthesizes responses from multiple LLMs."""

    def __init__(self, settings: Settings):
        self.settings = settings
        self.synthesis_provider: Optional[LLMProvider] = None
        self._initialize_synthesis_provider()

    def _initialize_synthesis_provider(self) -> None:
        """Initialize the provider used for synthesis."""
        # Try the explicitly configured reconciler provider first
        if self.settings.reconciler_provider == "anthropic" and self.settings.anthropic_api_key:
            self.synthesis_provider = AnthropicProvider(
                api_key=self.settings.anthropic_api_key,
                model=self.settings.anthropic_model,
            )
        elif self.settings.reconciler_provider == "openai" and self.settings.openai_api_key:
            self.synthesis_provider = OpenAIProvider(
                api_key=self.settings.openai_api_key,
                model=self.settings.openai_model,
            )
        elif self.settings.reconciler_provider == "gemini" and self.settings.gemini_api_key:
            self.synthesis_provider = GeminiProvider(
                api_key=self.settings.gemini_api_key,
                model=self.settings.gemini_model,
            )
        # Fall back to any available provider
        elif self.settings.anthropic_api_key:
            self.synthesis_provider = AnthropicProvider(
                api_key=self.settings.anthropic_api_key,
                model=self.settings.anthropic_model,
            )
        elif self.settings.openai_api_key:
            self.synthesis_provider = OpenAIProvider(
                api_key=self.settings.openai_api_key,
                model=self.settings.openai_model,
            )
        elif self.settings.gemini_api_key:
            self.synthesis_provider = GeminiProvider(
                api_key=self.settings.gemini_api_key,
                model=self.settings.gemini_model,
            )

    def format_responses(self, responses: list[LLMResponse]) -> str:
        """Format responses for the reconciliation prompt."""
        formatted = []
        for response in responses:
            if response.success:
                formatted.append(
                    f"### {response.provider_name} ({response.model}):\n{response.content}"
                )
            else:
                formatted.append(
                    f"### {response.provider_name} ({response.model}):\n[Error: {response.error}]"
                )
        return "\n\n---\n\n".join(formatted)

    async def reconcile(
        self,
        question: str,
        responses: list[LLMResponse],
    ) -> Optional[LLMResponse]:
        """Generate a reconciled synthesis of multiple LLM responses."""
        if not self.synthesis_provider:
            return None

        # Filter to successful responses only
        successful = [r for r in responses if r.success]
        if len(successful) < 2:
            return None  # Need at least 2 responses to reconcile

        formatted = self.format_responses(successful)
        prompt = RECONCILIATION_PROMPT.format(
            question=question,
            responses=formatted,
        )

        return await self.synthesis_provider.query(prompt)

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


HEALTH_RESEARCH_PROMPT = """You are a medical research analyst synthesizing AI responses to a health-related question. Your goal is to provide a balanced, evidence-based summary that highlights consensus, disagreements, and knowledge gaps.

Original Question:
{question}

AI Responses:
{responses}

{evidence_section}

Provide your analysis in this format:

## Evidence Summary
[Provide a comprehensive summary of the evidence and information presented across all AI responses. If official guidelines or scientific literature are provided, integrate key findings from those sources. What are the key facts, findings, and recommendations mentioned?]

## Points of Agreement
[What do the AI models consistently agree on? Identify areas where there is clear consensus across responses. Note if official guidelines align with AI responses.]

## Points of Disagreement
[Where do the AI models differ in their responses? Highlight contradictions, varying interpretations, or different emphasis on certain aspects. Note any discrepancies with official guidelines or scientific literature.]

## Confidence Level
[Assess the overall confidence level of the information provided. Are the responses based on strong evidence, preliminary findings, or expert opinion? Note any hedging language or uncertainty expressed. If official guidelines are available, note their authority.]

## Recommendations for Further Research
[Based on gaps or uncertainties identified in the responses, what areas would benefit from additional research or expert consultation? What questions remain unanswered? Reference specific scientific literature if provided.]
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
        mode: str = "public_health",
        evidence_data: Optional[dict] = None,
    ) -> Optional[LLMResponse]:
        """Generate a reconciled synthesis of multiple LLM responses.

        Args:
            question: The original question asked
            responses: List of LLM responses to reconcile
            mode: Either "public_health" or "health_research"
            evidence_data: Optional evidence from SERPAPI searches
        """
        if not self.synthesis_provider:
            return None

        # Filter to successful responses only
        successful = [r for r in responses if r.success]
        if len(successful) < 2:
            return None  # Need at least 2 responses to reconcile

        formatted = self.format_responses(successful)

        # Format evidence section if available
        evidence_section = ""
        if evidence_data and mode == "health_research":
            evidence_section = self._format_evidence(evidence_data)

        # Select the appropriate prompt based on mode
        prompt_template = (
            HEALTH_RESEARCH_PROMPT if mode == "health_research"
            else RECONCILIATION_PROMPT
        )

        prompt = prompt_template.format(
            question=question,
            responses=formatted,
            evidence_section=evidence_section,
        )

        return await self.synthesis_provider.query(prompt)

    def _format_evidence(self, evidence_data: dict) -> str:
        """Format evidence data for inclusion in prompt."""
        parts = []

        # Format guidelines
        guidelines = evidence_data.get("guidelines", {})
        if guidelines.get("count", 0) > 0:
            parts.append("## Official Guidelines & Sources")
            parts.append(f"Found {guidelines['count']} official sources:")

            # Add source breakdown
            source_types = guidelines.get("source_types", {})
            if source_types:
                source_list = ", ".join([f"{count} from {org}" for org, count in source_types.items()])
                parts.append(f"- {source_list}")

            # Add digest
            parts.append(f"\nKey findings: {guidelines.get('digest', 'N/A')}")

            # Add top links
            links = guidelines.get("links", [])[:3]
            if links:
                parts.append("\nTop sources:")
                for link in links:
                    parts.append(f"- {link['title']}: {link['url']}")

        # Format literature
        literature = evidence_data.get("literature", {})
        if literature.get("count", 0) > 0:
            if parts:
                parts.append("")  # Add spacing
            parts.append("## Scientific Literature")
            parts.append(f"Found {literature['count']} peer-reviewed articles")

            # Add digest
            parts.append(f"\nKey findings: {literature.get('digest', 'N/A')}")

            # Add top cited papers
            top_cited = literature.get("top_cited", [])[:3]
            if top_cited:
                parts.append("\nHighly cited papers:")
                for paper in top_cited:
                    cited = paper.get("cited_by", 0)
                    parts.append(f"- {paper['title']} ({cited} citations): {paper['url']}")

        if not parts:
            return ""

        return "\n".join(parts)

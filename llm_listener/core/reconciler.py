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


HEALTH_RESEARCH_PROMPT = """You are a medical research analyst synthesizing multiple sources of health information to provide clear, actionable guidance. Your role is to critically evaluate AI model responses alongside official health guidance and scientific literature to produce a structured summary that clinicians and patients can trust.

Original Question:
{question}

AI Model Responses:
{responses}

{evidence_section}

CRITICAL INSTRUCTIONS:
1. Use EXACTLY the section headers specified below (## for main sections, ### for subsections)
2. Lead with what is known and agreed upon, not with uncertainty
3. Attribute every claim to its source (e.g., "CDC states...", "A meta-analysis of 12 RCTs found...", "All AI models agreed that...")
4. Be honest about gaps - distinguish between "no guidance found in search" vs "organization has not issued guidance on this topic"
5. Synthesize information hierarchically: official guidance takes precedence, then peer-reviewed literature, then AI model outputs
6. When sources conflict, explicitly state WHO disagrees with WHOM about WHAT

Generate your response in this EXACT format:

## CONSENSUS
[Write 2-3 substantive sentences describing what authorities, experts, literature, and AI models agree on. This is the core finding users can rely on. Be specific about which sources support this consensus. If there is strong agreement, state it confidently. If consensus is limited, be clear about what narrow area has agreement.]

## OFFICIAL GUIDANCE
### Government Health Agencies
- **CDC**: [If CDC guidance was found in the evidence, summarize their specific position in 1-2 sentences. If searched but not found, state "No specific guidance found in search results."]
- **WHO**: [If WHO guidance was found, summarize their specific position. If searched but not found, state "No specific guidance found in search results."]
- **FDA**: [If FDA guidance was found, summarize their specific position (approval status, warnings, indications). If searched but not found, state "No specific guidance found in search results."]
- **NIH**: [If NIH guidance or research summaries were found, summarize their position. If searched but not found, state "No specific guidance found in search results."]

### Medical Societies
[List each relevant medical society found in the evidence with their position. Format as bullet points:]
- **[Society Name]**: [Their specific position or recommendation on this topic]

[If no medical society guidance was found, state: "No medical society guidance found in search results."]

## SCIENTIFIC EVIDENCE
[Write 1-2 paragraphs summarizing the research landscape. What types of studies exist (RCTs, cohort studies, case reports)? What is the overall quality and strength of evidence? What are the key findings across studies?]

### Key Studies
[List 3-5 of the most relevant studies from the literature search. For each, include sample size and study design. Format as bullet points:]
- [Specific finding or conclusion] (N=[sample size], [study type: meta-analysis/systematic review/RCT/cohort study])
- [Specific finding or conclusion] (N=[sample size], [study type])

[If no peer-reviewed literature was found, state: "No peer-reviewed studies found in search results. Analysis based on AI model outputs and available official guidance."]

### Evidence Limitations
[Provide an honest, specific assessment of limitations. Examples: "Most studies have small sample sizes (N<100)" or "Evidence primarily from observational studies; no RCTs available" or "Limited diversity in study populations."]

## AI MODEL PERSPECTIVES
### Areas of Agreement
[Summarize in 2-3 sentences what the AI models consistently said across their responses. Focus on substantive agreement, not just platitudes.]

### Points of Divergence
[Identify where AI models differed meaningfully. Be specific about which model said what. If no significant divergence, state "No significant divergence - all models provided similar information."]

## DISCORDANCE
[This section captures ANY disagreement between sources - official guidance vs literature, one agency vs another, AI models vs evidence. Be explicit and specific. If no significant discordance, state "No significant discordance found - official guidance, scientific literature, and AI models are well-aligned."]

## BOTTOM LINE
### For Patients
[Write 3-4 sentences in plain, accessible language (8th grade reading level). What should a patient understand and do? When should they talk to their doctor? Be direct and actionable.]

### For Clinicians
[Write 3-4 sentences with appropriate clinical nuance. What should inform clinical decision-making? What should be discussed with patients? Include relevant considerations for shared decision-making.]

### Important Caveats
[List key limitations, situations where this advice doesn't apply, and the need for individualized assessment. Be specific about who should seek specialist consultation.]

IMPORTANT REMINDERS:
- Use official guidance and peer-reviewed literature as your primary sources; AI model responses are secondary
- Every factual claim should be traceable to a specific source
- If information is limited, say so clearly rather than hedging throughout
- The goal is actionable synthesis, not exhaustive literature review
- Balance thoroughness with clarity - be comprehensive but concise
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

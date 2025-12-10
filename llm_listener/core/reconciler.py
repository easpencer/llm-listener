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
        """Format evidence data for inclusion in prompt.

        Provides rich, source-by-source information to enable better discordance analysis.
        Groups sources by organization and includes full snippets and metadata.
        """
        parts = []

        # Format guidelines with detailed source breakdown
        guidelines = evidence_data.get("guidelines", {})
        if guidelines.get("count", 0) > 0:
            metadata = guidelines.get("metadata", {})
            total_available = metadata.get("total_available", "unknown")
            examined = metadata.get("examined", 0)
            included = metadata.get("included", 0)
            excluded = metadata.get("excluded", 0)

            parts.append("## Official Guidelines & Sources")
            parts.append(f"({total_available} found, {examined} examined, {included} included, {excluded} excluded)")
            parts.append("")

            # Group sources by organization
            links = guidelines.get("links", [])
            grouped_sources = {
                "CDC": [],
                "WHO": [],
                "FDA": [],
                "NIH": [],
                "Medical Societies": []
            }

            for link in links:
                url = link.get("url", "").lower()
                if "cdc.gov" in url:
                    grouped_sources["CDC"].append(link)
                elif "who.int" in url:
                    grouped_sources["WHO"].append(link)
                elif "fda.gov" in url:
                    grouped_sources["FDA"].append(link)
                elif "nih.gov" in url:
                    grouped_sources["NIH"].append(link)
                else:
                    grouped_sources["Medical Societies"].append(link)

            # Format each organization's sources
            for org, sources in grouped_sources.items():
                if sources:
                    parts.append(f"### {org} ({len(sources)} sources)")
                    for source in sources:
                        title = source.get("title", "Untitled")
                        snippet = source.get("snippet", "No description available")
                        url = source.get("url", "")
                        parts.append(f"- **{title}**: {snippet}")
                        parts.append(f"  URL: {url}")
                    parts.append("")

        # Format literature with detailed citation information
        literature = evidence_data.get("literature", {})
        if literature.get("count", 0) > 0:
            metadata = literature.get("metadata", {})
            total_available = metadata.get("total_available", "unknown")
            examined = metadata.get("examined", 0)
            included = metadata.get("included", 0)
            excluded = metadata.get("excluded", 0)

            quality_threshold = metadata.get("quality_threshold", {})
            min_citations = quality_threshold.get("min_citations", 5)

            if parts:
                parts.append("")  # Add spacing
            parts.append("## Scientific Literature")
            parts.append(f"({total_available} found, {examined} examined, {included} high-quality)")
            parts.append(f"Quality threshold: {min_citations}+ citations")
            parts.append("")

            # Group by citation count
            all_links = literature.get("links", [])
            highly_cited = [p for p in all_links if p.get("cited_by", 0) >= 50]
            moderately_cited = [p for p in all_links if 10 <= p.get("cited_by", 0) < 50]
            lower_cited = [p for p in all_links if p.get("cited_by", 0) < 10]

            # Format highly cited papers
            if highly_cited:
                parts.append(f"### Highly Cited ({len(highly_cited)} papers, 50+ citations)")
                for paper in highly_cited[:10]:  # Limit to top 10
                    title = paper.get("title", "Untitled")
                    citations = paper.get("cited_by", 0)
                    snippet = paper.get("snippet", "No abstract available")
                    pub_info = paper.get("publication_info", "")
                    url = paper.get("url", "")

                    parts.append(f"- **{title}** ({citations} citations)")
                    parts.append(f"  {snippet}")
                    if pub_info:
                        parts.append(f"  Publication: {pub_info}")
                    parts.append(f"  URL: {url}")
                parts.append("")

            # Format moderately cited papers
            if moderately_cited:
                parts.append(f"### Moderately Cited ({len(moderately_cited)} papers, 10-49 citations)")
                for paper in moderately_cited[:8]:  # Limit to 8
                    title = paper.get("title", "Untitled")
                    citations = paper.get("cited_by", 0)
                    snippet = paper.get("snippet", "No abstract available")
                    pub_info = paper.get("publication_info", "")
                    url = paper.get("url", "")

                    parts.append(f"- **{title}** ({citations} citations)")
                    parts.append(f"  {snippet}")
                    if pub_info:
                        parts.append(f"  Publication: {pub_info}")
                    parts.append(f"  URL: {url}")
                parts.append("")

            # Format lower cited papers (brief summary)
            if lower_cited:
                parts.append(f"### Lower Cited ({len(lower_cited)} papers, 5-9 citations)")
                for paper in lower_cited[:5]:  # Limit to 5
                    title = paper.get("title", "Untitled")
                    citations = paper.get("cited_by", 0)
                    snippet = paper.get("snippet", "No abstract available")
                    url = paper.get("url", "")

                    parts.append(f"- **{title}** ({citations} citations)")
                    parts.append(f"  {snippet}")
                    parts.append(f"  URL: {url}")
                parts.append("")

            # Note about low quality results
            low_quality = literature.get("low_quality_results", [])
            if low_quality:
                parts.append(f"### Note: {len(low_quality)} additional papers with <{min_citations} citations were found but flagged as lower quality")
                parts.append("")

        if not parts:
            return ""

        return "\n".join(parts)

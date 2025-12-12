"""Conflict resolution for health research evidence.

This module provides prompts and logic for resolving detected conflicts between
authoritative health sources, research literature, news coverage, and patents.
It uses LLM-based analysis to determine the most authoritative position and
explain why disagreements exist.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional
import json
import re

from .conflicts import ConflictReport


# Prompt template for resolving conflicts between sources
CONFLICT_RESOLUTION_PROMPT = """You are a medical evidence analyst tasked with resolving conflicts between authoritative health sources.

**Original Question:**
{question}

**Detected Conflicts:**
{conflicts}

**Source Data:**
{source_data}

**Instructions:**
Carefully analyze the specific disagreements between sources. Your goal is to:

1. **Identify the Core Disagreement:** What exactly are the sources disagreeing about? Be specific about the claims, recommendations, or findings that conflict.

2. **Determine Source Authority:** For this specific topic, which source is most authoritative and why? Consider:
   - Source type (government agency > medical society > research paper > news)
   - Recency of the guidance or publication
   - Specificity to the question being asked
   - Quality and strength of evidence cited
   - Track record and domain expertise

3. **Explain the Disagreement:** Why does this conflict exist? Common reasons include:
   - **Outdated guidance:** One source reflects older understanding, while another has newer data
   - **Different populations:** Sources may be addressing different patient populations or contexts
   - **Emerging research:** New findings haven't yet been incorporated into official guidelines
   - **Different evidence standards:** Some sources require higher-quality evidence before making recommendations
   - **Jurisdictional differences:** International vs. national vs. regional guidance may differ
   - **Interpretation differences:** Same evidence interpreted differently by different experts
   - **Incomplete evidence:** Limited data leads to different conclusions

4. **Assess Confidence:** How confident can you be in the resolution? Consider:
   - How clear-cut is the authority hierarchy for this topic?
   - How significant is the disagreement?
   - How strong is the evidence supporting the preferred source?

5. **Identify Remaining Uncertainty:** What questions or uncertainties remain even after resolution? What would help clarify further?

**Output Format (JSON):**
```json
{{
  "resolved_answer": "Clear, actionable statement of the resolved position. State what the most authoritative source recommends and why.",
  "confidence_in_resolution": 0.85,
  "resolution_reasoning": "Detailed explanation of why you chose this resolution. Explain which source takes precedence and why the disagreement exists.",
  "remaining_uncertainties": [
    "Specific question or area that remains unclear",
    "Another area of uncertainty"
  ],
  "sources_prioritized": [
    "Name of primary authoritative source used",
    "Name of secondary source",
    "Name of sources de-prioritized and why"
  ],
  "recommendation": "Actionable guidance for users: when to follow the resolved answer, when to seek additional consultation, what caveats apply."
}}
```

**Critical Requirements:**
- Be medically accurate and conservative
- Cite specific sources by name (e.g., "CDC guidance from 2024", "WHO guidelines", "Meta-analysis of 15 RCTs")
- Prioritize patient safety over convenience
- Acknowledge when evidence is limited or conflicting
- Do not minimize legitimate disagreements between authoritative sources
- Return ONLY valid JSON with no markdown code fences or additional text

**Confidence Scoring Guide:**
- 0.9-1.0: Very high confidence - clear authority hierarchy, strong supporting evidence
- 0.7-0.89: High confidence - authority clear but with some caveats
- 0.5-0.69: Moderate confidence - reasonable resolution but significant uncertainty remains
- 0.3-0.49: Low confidence - weak evidence or equally authoritative sources disagree
- 0.0-0.29: Very low confidence - insufficient information to resolve confidently
"""


# Prompt template for emerging topics with low evidence
EMERGING_TOPIC_PROMPT = """You are a medical evidence analyst addressing a question about an emerging or under-studied health topic.

**Original Question:**
{question}

**Limited Evidence Available:**
{limited_evidence}

**Context:**
This topic has limited authoritative guidance or research consensus. The available evidence includes:
- Recent patents (if any): Indicate research investment and emerging technologies
- News coverage (if any): May reflect preliminary findings or ongoing debates
- Preliminary research: Early-stage studies that haven't been validated by meta-analyses or guidelines
- AI model outputs: General medical knowledge without topic-specific authority

**Instructions:**
Given the limited evidence landscape, provide a thoughtful analysis that:

1. **Acknowledges the Evidence Gap:** Be explicit that official guidance is limited or non-existent for this specific question.

2. **Synthesizes Available Information:** What can be inferred from:
   - Patents (research directions, not proven efficacy)
   - Recent credible news coverage (preliminary findings, expert opinions)
   - Related guidance (applying recommendations from similar conditions)
   - Basic medical principles (first principles reasoning)

3. **Emphasizes Uncertainty:** Make it clear that:
   - Evidence quality is limited
   - Findings are preliminary
   - Expert consensus has not been established
   - Recommendations may change as research evolves

4. **Provides Cautious Guidance:** Despite limited evidence, what can be responsibly recommended?
   - What approaches are theoretically sound based on related evidence?
   - What risks should be considered?
   - What would warrant immediate medical consultation?

5. **Identifies Next Steps:** What would strengthen confidence in the answer?
   - What research is needed?
   - What authoritative bodies should address this topic?
   - Where to look for emerging guidance?

**Output Format (JSON):**
```json
{{
  "resolved_answer": "Cautious statement acknowledging limited evidence and providing best available guidance based on first principles and related evidence.",
  "confidence_in_resolution": 0.35,
  "resolution_reasoning": "Explain why evidence is limited, what was considered, and the reasoning behind the guidance provided. Be clear about what is speculation vs. established fact.",
  "remaining_uncertainties": [
    "Major question that lacks evidence",
    "Another significant unknown",
    "Area requiring further research"
  ],
  "sources_prioritized": [
    "Description of what limited sources were used (patents, news, related guidance)",
    "Explanation of why traditional authoritative sources are absent"
  ],
  "recommendation": "Clear guidance that: (1) emphasizes consulting healthcare providers, (2) highlights the preliminary nature of advice, (3) describes red flags requiring immediate medical attention, (4) suggests reasonable approaches based on available information."
}}
```

**Critical Requirements:**
- Set appropriate expectations about evidence quality
- Do not overstate confidence when evidence is weak
- Distinguish between "emerging research suggests" and "established evidence shows"
- Patents are indicators of research interest, NOT proof of efficacy or safety
- News coverage should be clearly labeled as preliminary or investigational
- Always recommend consulting qualified healthcare providers for emerging topics
- Confidence score should typically be ≤ 0.5 for truly emerging topics
- Return ONLY valid JSON with no markdown code fences or additional text
"""


@dataclass
class ConflictResolution:
    """Result of conflict resolution analysis.

    Attributes:
        resolved_answer: The synthesized answer after resolving conflicts
        confidence_in_resolution: Confidence score from 0 to 1
        resolution_reasoning: Explanation of why conflicts were resolved this way
        remaining_uncertainties: List of uncertainties that remain after resolution
        sources_prioritized: List of sources in priority order with reasoning
        recommendation: Actionable recommendation for users
    """
    resolved_answer: str
    confidence_in_resolution: float
    resolution_reasoning: str
    remaining_uncertainties: List[str] = field(default_factory=list)
    sources_prioritized: List[str] = field(default_factory=list)
    recommendation: str = ""

    def __post_init__(self):
        """Validate confidence score."""
        if not 0.0 <= self.confidence_in_resolution <= 1.0:
            raise ValueError(
                f"Confidence must be between 0 and 1, got {self.confidence_in_resolution}"
            )


class ConflictResolver:
    """Resolves conflicts between health evidence sources.

    This class provides methods to build resolution prompts, determine when to use
    emerging topic handling, and parse LLM responses into structured results.
    """

    # Thresholds for determining emerging topic status
    MIN_GUIDELINES_FOR_ESTABLISHED = 2  # Minimum guideline sources for established topic
    MIN_LITERATURE_CITATIONS = 50  # Minimum total citations for established topic
    MIN_HIGH_QUALITY_PAPERS = 3  # Minimum high-quality papers for established topic

    def __init__(self):
        """Initialize the conflict resolver."""
        pass

    def should_use_emerging_topic_prompt(
        self,
        conflict_report: ConflictReport,
        evidence_data: Dict[str, Any]
    ) -> bool:
        """Determine if topic should be treated as emerging/low-evidence.

        Args:
            conflict_report: The conflict analysis results
            evidence_data: All gathered evidence (guidelines, literature, news, patents)

        Returns:
            True if the topic has insufficient authoritative evidence and should use
            the emerging topic prompt
        """
        # Extract evidence counts
        guidelines = evidence_data.get("guidelines", {})
        literature = evidence_data.get("literature", {})

        guideline_count = guidelines.get("count", 0)
        literature_count = literature.get("count", 0)

        # Check for minimal authoritative guidance
        has_minimal_guidelines = guideline_count < self.MIN_GUIDELINES_FOR_ESTABLISHED

        # Check literature quality
        literature_links = literature.get("links", [])
        total_citations = sum(
            link.get("cited_by", 0) for link in literature_links
        )
        high_quality_papers = sum(
            1 for link in literature_links
            if link.get("cited_by", 0) >= 50
        )

        has_weak_literature = (
            total_citations < self.MIN_LITERATURE_CITATIONS or
            high_quality_papers < self.MIN_HIGH_QUALITY_PAPERS
        )

        # Emerging topic if both guidance and literature are weak
        is_emerging = has_minimal_guidelines and has_weak_literature

        # Additional check: if conflicts exist but very little data, also emerging
        if conflict_report.has_conflicts and guideline_count == 0 and literature_count < 5:
            is_emerging = True

        return is_emerging

    def build_resolution_prompt(
        self,
        question: str,
        conflict_report: ConflictReport,
        evidence_data: Dict[str, Any]
    ) -> str:
        """Build a prompt for resolving conflicts.

        Args:
            question: The original user question
            conflict_report: Detected conflicts between sources
            evidence_data: All evidence gathered (guidelines, literature, news, patents)

        Returns:
            Formatted prompt string ready for LLM
        """
        # Determine which prompt template to use
        is_emerging = self.should_use_emerging_topic_prompt(conflict_report, evidence_data)

        if is_emerging:
            return self._build_emerging_prompt(question, evidence_data)
        else:
            return self._build_conflict_prompt(question, conflict_report, evidence_data)

    def _build_conflict_prompt(
        self,
        question: str,
        conflict_report: ConflictReport,
        evidence_data: Dict[str, Any]
    ) -> str:
        """Build the standard conflict resolution prompt."""
        # Format conflicts
        conflicts_text = self._format_conflicts(conflict_report)

        # Format source data
        source_data_text = self._format_source_data(evidence_data)

        return CONFLICT_RESOLUTION_PROMPT.format(
            question=question,
            conflicts=conflicts_text,
            source_data=source_data_text
        )

    def _build_emerging_prompt(
        self,
        question: str,
        evidence_data: Dict[str, Any]
    ) -> str:
        """Build the emerging topic prompt."""
        # Format limited evidence
        limited_evidence_text = self._format_limited_evidence(evidence_data)

        return EMERGING_TOPIC_PROMPT.format(
            question=question,
            limited_evidence=limited_evidence_text
        )

    def _format_conflicts(self, conflict_report: ConflictReport) -> str:
        """Format conflict report into human-readable text.

        Args:
            conflict_report: The conflict analysis

        Returns:
            Formatted string describing all conflicts
        """
        if not conflict_report.has_conflicts:
            return "No significant conflicts detected between sources."

        parts = [f"Summary: {conflict_report.summary}\n"]
        parts.append(f"Overall Alignment: {conflict_report.guidance_literature_alignment}\n")
        parts.append(f"\nDetailed Conflicts ({len(conflict_report.conflicts)}):\n")

        for i, conflict in enumerate(conflict_report.conflicts, 1):
            parts.append(f"\n{i}. {conflict.topic}")
            parts.append(f"   Severity: {conflict.severity}")
            parts.append(f"   {conflict.source_a}: {conflict.position_a}")
            parts.append(f"   {conflict.source_b}: {conflict.position_b}")

        return "\n".join(parts)

    def _format_source_data(self, evidence_data: Dict[str, Any]) -> str:
        """Format all source data for the prompt.

        Args:
            evidence_data: Dictionary with guidelines, literature, news, patents

        Returns:
            Formatted string with all source information
        """
        parts = []

        # Format guidelines
        guidelines = evidence_data.get("guidelines", {})
        if guidelines.get("count", 0) > 0:
            parts.append("=== OFFICIAL GUIDELINES ===")
            parts.append(f"Total found: {guidelines.get('count', 0)}")
            for link in guidelines.get("links", [])[:10]:  # Top 10 guidelines
                title = link.get("title", "Untitled")
                snippet = link.get("snippet", "No description")
                url = link.get("url", "")
                parts.append(f"\n- {title}")
                parts.append(f"  {snippet}")
                parts.append(f"  Source: {url}")
            parts.append("")

        # Format literature
        literature = evidence_data.get("literature", {})
        if literature.get("count", 0) > 0:
            parts.append("=== SCIENTIFIC LITERATURE ===")
            parts.append(f"Total found: {literature.get('count', 0)}")
            for link in literature.get("links", [])[:10]:  # Top 10 papers
                title = link.get("title", "Untitled")
                snippet = link.get("snippet", "No abstract")
                citations = link.get("cited_by", 0)
                pub_info = link.get("publication_info", "")
                parts.append(f"\n- {title} ({citations} citations)")
                parts.append(f"  {snippet}")
                if pub_info:
                    parts.append(f"  Published in: {pub_info}")
            parts.append("")

        # Format news
        news = evidence_data.get("news", {})
        if news.get("count", 0) > 0:
            parts.append("=== RECENT NEWS COVERAGE ===")
            parts.append(f"Total found: {news.get('count', 0)}")

            # Prioritize highly credible news
            by_tier = news.get("by_credibility_tier", {})
            highly_credible = by_tier.get("highly_credible", [])
            credible = by_tier.get("credible", [])

            for article in highly_credible[:5]:
                title = article.get("title", "Untitled")
                source = article.get("source", "Unknown")
                snippet = article.get("snippet", "")
                published = article.get("published_date", "")
                parts.append(f"\n- [{source}] {title}")
                if snippet:
                    parts.append(f"  {snippet}")
                if published:
                    parts.append(f"  Published: {published}")
                parts.append(f"  Credibility: Highly Credible")

            for article in credible[:3]:
                title = article.get("title", "Untitled")
                source = article.get("source", "Unknown")
                snippet = article.get("snippet", "")
                parts.append(f"\n- [{source}] {title}")
                if snippet:
                    parts.append(f"  {snippet}")
                parts.append(f"  Credibility: Credible")
            parts.append("")

        # Format patents
        patents = evidence_data.get("patents", {})
        if patents.get("count", 0) > 0:
            parts.append("=== PATENTS & EMERGING TECHNOLOGIES ===")
            parts.append("(Note: Patents indicate research directions, NOT proven solutions)")
            parts.append(f"Total found: {patents.get('count', 0)}")

            by_relevance = patents.get("by_clinical_relevance", {})
            high_rel = by_relevance.get("high", [])

            for patent in high_rel[:5]:
                title = patent.get("title", "Untitled")
                assignee = patent.get("assignee", "Unknown")
                date_pub = patent.get("date_published", "")
                summary = patent.get("simplified_summary", "")
                parts.append(f"\n- {title}")
                parts.append(f"  Assignee: {assignee} ({date_pub})")
                if summary:
                    parts.append(f"  {summary}")
            parts.append("")

        if not parts:
            return "No source data available."

        return "\n".join(parts)

    def _format_limited_evidence(self, evidence_data: Dict[str, Any]) -> str:
        """Format evidence for emerging topic prompt.

        Args:
            evidence_data: Available evidence (likely sparse)

        Returns:
            Formatted string emphasizing the limited nature of evidence
        """
        parts = []

        guidelines = evidence_data.get("guidelines", {})
        literature = evidence_data.get("literature", {})
        news = evidence_data.get("news", {})
        patents = evidence_data.get("patents", {})

        guideline_count = guidelines.get("count", 0)
        literature_count = literature.get("count", 0)
        news_count = news.get("count", 0)
        patent_count = patents.get("count", 0)

        parts.append("=== EVIDENCE LANDSCAPE ===")
        parts.append(f"Official Guidelines Found: {guideline_count}")
        parts.append(f"Peer-Reviewed Literature Found: {literature_count}")
        parts.append(f"Recent News Articles Found: {news_count}")
        parts.append(f"Related Patents Found: {patent_count}")
        parts.append("")

        # Show what little evidence exists
        if guideline_count > 0:
            parts.append("Available Guidance:")
            for link in guidelines.get("links", [])[:3]:
                title = link.get("title", "Untitled")
                snippet = link.get("snippet", "")
                parts.append(f"- {title}: {snippet}")
            parts.append("")

        if literature_count > 0:
            parts.append("Available Research (limited):")
            for link in literature.get("links", [])[:5]:
                title = link.get("title", "Untitled")
                citations = link.get("cited_by", 0)
                snippet = link.get("snippet", "")
                parts.append(f"- {title} ({citations} citations)")
                parts.append(f"  {snippet}")
            parts.append("")

        if news_count > 0:
            parts.append("Recent News Coverage:")
            by_tier = news.get("by_credibility_tier", {})
            for tier_name in ["highly_credible", "credible"]:
                tier_articles = by_tier.get(tier_name, [])
                for article in tier_articles[:3]:
                    title = article.get("title", "Untitled")
                    source = article.get("source", "Unknown")
                    snippet = article.get("snippet", "")
                    parts.append(f"- [{source}] {title}")
                    if snippet:
                        parts.append(f"  {snippet}")
            parts.append("")

        if patent_count > 0:
            parts.append("Emerging Technologies (Patents - Investigational Only):")
            by_relevance = patents.get("by_clinical_relevance", {})
            for patent in by_relevance.get("high", [])[:3]:
                title = patent.get("title", "Untitled")
                assignee = patent.get("assignee", "Unknown")
                summary = patent.get("simplified_summary", "")
                parts.append(f"- {title} ({assignee})")
                if summary:
                    parts.append(f"  {summary}")
            parts.append("")

        if not parts[1:]:  # Only header exists
            parts.append("Minimal evidence available. Analysis will rely on first principles and related medical knowledge.")

        return "\n".join(parts)

    def parse_resolution_response(self, response: str) -> ConflictResolution:
        """Parse LLM response into ConflictResolution object.

        Args:
            response: JSON string from LLM (should match the expected format)

        Returns:
            ConflictResolution object with parsed data

        Raises:
            ValueError: If response cannot be parsed or is missing required fields
        """
        # Clean up response - remove markdown code fences if present
        cleaned = response.strip()

        # Remove markdown code fences
        if cleaned.startswith("```json"):
            cleaned = cleaned[7:]  # Remove ```json
        elif cleaned.startswith("```"):
            cleaned = cleaned[3:]  # Remove ```

        if cleaned.endswith("```"):
            cleaned = cleaned[:-3]

        cleaned = cleaned.strip()

        try:
            data = json.loads(cleaned)
        except json.JSONDecodeError as e:
            raise ValueError(f"Failed to parse JSON response: {e}\nResponse: {cleaned[:500]}")

        # Validate required fields
        required_fields = [
            "resolved_answer",
            "confidence_in_resolution",
            "resolution_reasoning",
            "remaining_uncertainties",
            "sources_prioritized",
            "recommendation"
        ]

        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            raise ValueError(f"Missing required fields in response: {missing_fields}")

        # Ensure types are correct
        if not isinstance(data["remaining_uncertainties"], list):
            data["remaining_uncertainties"] = [str(data["remaining_uncertainties"])]

        if not isinstance(data["sources_prioritized"], list):
            data["sources_prioritized"] = [str(data["sources_prioritized"])]

        # Convert confidence to float if it's a string
        if isinstance(data["confidence_in_resolution"], str):
            try:
                data["confidence_in_resolution"] = float(data["confidence_in_resolution"])
            except ValueError:
                raise ValueError(
                    f"confidence_in_resolution must be a number, got: {data['confidence_in_resolution']}"
                )

        return ConflictResolution(
            resolved_answer=data["resolved_answer"],
            confidence_in_resolution=data["confidence_in_resolution"],
            resolution_reasoning=data["resolution_reasoning"],
            remaining_uncertainties=data["remaining_uncertainties"],
            sources_prioritized=data["sources_prioritized"],
            recommendation=data["recommendation"]
        )

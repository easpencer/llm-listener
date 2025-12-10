"""Structured discordance analysis for health research responses.

This module provides programmatic analysis of agreement and disagreement
between AI model responses and evidence sources, complementing the LLM-based
synthesis with structured, heuristic-based detection.
"""

import re
from dataclasses import dataclass, field
from enum import Enum
from typing import Dict, List, Optional


class Stance(Enum):
    """Stance/position on a health topic."""

    SUPPORTIVE = "supportive"  # Recommends, endorses, or strongly supports
    CAUTIONARY = "cautionary"  # Mixed, conditional, or context-dependent
    NEUTRAL = "neutral"  # Informational without clear stance
    AGAINST = "against"  # Not recommended, avoid, or contraindicated


@dataclass
class SourcePosition:
    """A position or claim from a source.

    Attributes:
        source_name: Name of the source (e.g., "CDC", "OpenAI GPT-4", "WHO")
        claim_text: The actual claim or position statement
        stance: Overall stance of this position
        confidence: Confidence in the stance detection (0.0 to 1.0)
        key_phrases: Important phrases that influenced stance detection
    """

    source_name: str
    claim_text: str
    stance: Stance
    confidence: float = 0.5
    key_phrases: List[str] = field(default_factory=list)


@dataclass
class DiscordanceResult:
    """Results of discordance analysis across sources.

    Attributes:
        agreement_level: 0.0 (complete disagreement) to 1.0 (complete agreement)
        areas_of_agreement: List of topics where sources agree
        areas_of_disagreement: List of topics where sources disagree
        source_positions: All detected positions from all sources
        stance_distribution: Count of each stance type across all sources
        conflicting_pairs: Specific pairs of contradicting positions
    """

    agreement_level: float
    areas_of_agreement: List[str] = field(default_factory=list)
    areas_of_disagreement: List[str] = field(default_factory=list)
    source_positions: List[SourcePosition] = field(default_factory=list)
    stance_distribution: Dict[Stance, int] = field(default_factory=dict)
    conflicting_pairs: List[tuple[SourcePosition, SourcePosition]] = field(default_factory=list)


class DiscordanceAnalyzer:
    """Analyzes discordance between AI responses and evidence sources.

    Uses lightweight text pattern matching and heuristics to detect:
    - Strongly positive language (recommended, effective, should)
    - Cautionary language (may, limited evidence, consult doctor)
    - Negative language (not recommended, avoid, no evidence)

    This provides structured, programmatic analysis to complement LLM synthesis.
    """

    # Pattern definitions for stance detection
    SUPPORTIVE_PATTERNS = [
        r'\b(recommend|recommends|recommended|should|effective|proven|beneficial)\b',
        r'\b(evidence shows|studies show|research shows)\b',
        r'\b(approved|safe and effective|first-line|standard of care)\b',
        r'\b(strongly support|clear benefit|significant improvement)\b',
        r'\b(well-established|widely accepted|best practice)\b',
    ]

    CAUTIONARY_PATTERNS = [
        r'\b(may|might|could|possible|potentially)\b',
        r'\b(limited evidence|insufficient evidence|more research needed)\b',
        r'\b(consult|discuss with|talk to your doctor)\b',
        r'\b(individual basis|case-by-case|depends on)\b',
        r'\b(under supervision|with caution|carefully consider)\b',
        r'\b(emerging|preliminary|ongoing research)\b',
    ]

    AGAINST_PATTERNS = [
        r'\b(not recommended|do not|should not|avoid|contraindicated)\b',
        r'\b(no evidence|lacks evidence|unproven|unsupported)\b',
        r'\b(dangerous|harmful|risk|unsafe)\b',
        r'\b(ineffective|does not work|no benefit)\b',
        r'\b(withdrawn|recalled|banned)\b',
    ]

    def __init__(self):
        """Initialize the discordance analyzer."""
        # Compile regex patterns for efficiency
        self._supportive_regex = [re.compile(p, re.IGNORECASE) for p in self.SUPPORTIVE_PATTERNS]
        self._cautionary_regex = [re.compile(p, re.IGNORECASE) for p in self.CAUTIONARY_PATTERNS]
        self._against_regex = [re.compile(p, re.IGNORECASE) for p in self.AGAINST_PATTERNS]

    def analyze(
        self,
        ai_responses: Optional[List[Dict[str, str]]] = None,
        evidence_data: Optional[Dict] = None,
    ) -> DiscordanceResult:
        """Analyze discordance across AI responses and evidence sources.

        Args:
            ai_responses: List of dicts with 'provider_name', 'model', and 'content' keys
            evidence_data: Evidence dictionary with 'guidelines' and 'literature' keys

        Returns:
            DiscordanceResult with structured analysis
        """
        positions = []

        # Extract positions from AI responses
        if ai_responses:
            for response in ai_responses:
                provider = response.get('provider_name', 'Unknown')
                model = response.get('model', '')
                content = response.get('content', '')

                source_name = f"{provider} ({model})" if model else provider
                position = self._extract_position(source_name, content)
                if position:
                    positions.append(position)

        # Extract positions from evidence
        if evidence_data:
            # Process government guidelines
            guidelines = evidence_data.get('guidelines', {})
            if guidelines.get('count', 0) > 0:
                for link in guidelines.get('links', [])[:10]:  # Analyze top 10
                    source_name = self._identify_source_org(link.get('url', ''))
                    snippet = link.get('snippet', '')
                    if snippet:
                        position = self._extract_position(source_name, snippet)
                        if position:
                            positions.append(position)

            # Process literature
            literature = evidence_data.get('literature', {})
            if literature.get('count', 0) > 0:
                for paper in literature.get('top_cited', [])[:5]:  # Analyze top 5 papers
                    source_name = f"Study: {paper.get('title', 'Unknown')[:50]}"
                    snippet = paper.get('snippet', '')
                    if snippet:
                        position = self._extract_position(source_name, snippet)
                        if position:
                            positions.append(position)

        # Analyze agreement and disagreement
        return self._compute_discordance(positions)

    def _extract_position(self, source_name: str, text: str) -> Optional[SourcePosition]:
        """Extract a position from text using pattern matching.

        Args:
            source_name: Name of the source
            text: Text to analyze

        Returns:
            SourcePosition or None if text is too short
        """
        if not text or len(text.strip()) < 20:
            return None

        # Count matches for each stance type
        supportive_matches = []
        cautionary_matches = []
        against_matches = []

        for pattern in self._supportive_regex:
            matches = pattern.findall(text)
            supportive_matches.extend(matches)

        for pattern in self._cautionary_regex:
            matches = pattern.findall(text)
            cautionary_matches.extend(matches)

        for pattern in self._against_regex:
            matches = pattern.findall(text)
            against_matches.extend(matches)

        # Calculate scores
        supportive_score = len(supportive_matches)
        cautionary_score = len(cautionary_matches)
        against_score = len(against_matches)
        total_score = supportive_score + cautionary_score + against_score

        # Determine stance based on scores
        if total_score == 0:
            stance = Stance.NEUTRAL
            confidence = 0.3
            key_phrases = []
        elif against_score > supportive_score and against_score > cautionary_score:
            stance = Stance.AGAINST
            confidence = min(0.9, 0.5 + (against_score / (total_score + 5)))
            key_phrases = list(set(against_matches))[:5]
        elif supportive_score > against_score and supportive_score > cautionary_score:
            stance = Stance.SUPPORTIVE
            confidence = min(0.9, 0.5 + (supportive_score / (total_score + 5)))
            key_phrases = list(set(supportive_matches))[:5]
        else:
            stance = Stance.CAUTIONARY
            confidence = min(0.8, 0.4 + (cautionary_score / (total_score + 5)))
            key_phrases = list(set(cautionary_matches))[:5]

        # Truncate long text for claim_text
        claim_text = text[:300] + "..." if len(text) > 300 else text

        return SourcePosition(
            source_name=source_name,
            claim_text=claim_text,
            stance=stance,
            confidence=confidence,
            key_phrases=key_phrases,
        )

    def _identify_source_org(self, url: str) -> str:
        """Identify organization from URL.

        Args:
            url: URL to analyze

        Returns:
            Organization name
        """
        url_lower = url.lower()

        if 'cdc.gov' in url_lower:
            return 'CDC'
        elif 'who.int' in url_lower:
            return 'WHO'
        elif 'fda.gov' in url_lower:
            return 'FDA'
        elif 'nih.gov' in url_lower:
            return 'NIH'
        elif 'heart.org' in url_lower:
            return 'American Heart Association'
        elif 'cancer.org' in url_lower:
            return 'American Cancer Society'
        elif 'acog.org' in url_lower:
            return 'ACOG'
        elif 'aap.org' in url_lower:
            return 'American Academy of Pediatrics'
        elif 'ada.org' in url_lower:
            return 'American Diabetes Association'
        else:
            # Extract domain for generic name
            match = re.search(r'https?://(?:www\.)?([^/]+)', url_lower)
            if match:
                domain = match.group(1)
                return domain.replace('.', ' ').title()
            return 'Unknown Source'

    def _compute_discordance(self, positions: List[SourcePosition]) -> DiscordanceResult:
        """Compute discordance metrics from extracted positions.

        Args:
            positions: List of source positions

        Returns:
            DiscordanceResult with computed metrics
        """
        if not positions:
            return DiscordanceResult(
                agreement_level=0.0,
                areas_of_agreement=["No positions detected"],
                areas_of_disagreement=[],
            )

        # Calculate stance distribution
        stance_dist = {stance: 0 for stance in Stance}
        for pos in positions:
            stance_dist[pos.stance] += 1

        # Calculate agreement level based on stance concentration
        total_positions = len(positions)
        max_stance_count = max(stance_dist.values()) if stance_dist else 0

        # Agreement is higher when one stance dominates
        if total_positions == 0:
            agreement_level = 0.0
        elif total_positions == 1:
            agreement_level = 1.0
        else:
            # Agreement level: how concentrated is the dominant stance?
            agreement_level = max_stance_count / total_positions

        # Identify areas of agreement
        areas_of_agreement = []
        dominant_stance = max(stance_dist.items(), key=lambda x: x[1])

        if dominant_stance[1] >= total_positions * 0.6:  # 60% threshold
            stance_name = dominant_stance[0].value
            count = dominant_stance[1]
            areas_of_agreement.append(
                f"Majority stance is {stance_name} ({count}/{total_positions} sources)"
            )

            # Find common key phrases in dominant stance
            common_phrases = self._find_common_phrases(
                [p for p in positions if p.stance == dominant_stance[0]]
            )
            if common_phrases:
                areas_of_agreement.append(
                    f"Common themes: {', '.join(common_phrases[:3])}"
                )

        # Identify areas of disagreement
        areas_of_disagreement = []
        conflicting_pairs = []

        # Find direct conflicts (supportive vs against)
        supportive_positions = [p for p in positions if p.stance == Stance.SUPPORTIVE]
        against_positions = [p for p in positions if p.stance == Stance.AGAINST]

        if supportive_positions and against_positions:
            areas_of_disagreement.append(
                f"{len(supportive_positions)} source(s) supportive vs "
                f"{len(against_positions)} source(s) against"
            )

            # Create conflict pairs
            for sup_pos in supportive_positions[:3]:  # Limit to avoid explosion
                for ag_pos in against_positions[:3]:
                    conflicting_pairs.append((sup_pos, ag_pos))

        # Check for mixed stances
        active_stances = [s for s, c in stance_dist.items() if c > 0]
        if len(active_stances) >= 3:
            areas_of_disagreement.append(
                f"Mixed positions across {len(active_stances)} different stance types"
            )

        # If high agreement, note it
        if not areas_of_disagreement and agreement_level > 0.7:
            areas_of_agreement.append("Strong consensus across sources")

        return DiscordanceResult(
            agreement_level=agreement_level,
            areas_of_agreement=areas_of_agreement,
            areas_of_disagreement=areas_of_disagreement,
            source_positions=positions,
            stance_distribution=stance_dist,
            conflicting_pairs=conflicting_pairs,
        )

    def _find_common_phrases(self, positions: List[SourcePosition]) -> List[str]:
        """Find common key phrases across positions.

        Args:
            positions: List of positions to analyze

        Returns:
            List of common phrases, sorted by frequency
        """
        phrase_counts: Dict[str, int] = {}

        for pos in positions:
            for phrase in pos.key_phrases:
                phrase_lower = phrase.lower()
                phrase_counts[phrase_lower] = phrase_counts.get(phrase_lower, 0) + 1

        # Sort by frequency and return top phrases
        sorted_phrases = sorted(
            phrase_counts.items(),
            key=lambda x: x[1],
            reverse=True
        )

        # Return phrases that appear in at least 2 positions
        return [phrase for phrase, count in sorted_phrases if count >= 2]

    def format_summary(self, result: DiscordanceResult) -> str:
        """Format discordance result as human-readable summary.

        Args:
            result: DiscordanceResult to format

        Returns:
            Formatted string summary
        """
        lines = []

        # Header
        lines.append("=== DISCORDANCE ANALYSIS ===\n")

        # Agreement level
        agreement_pct = result.agreement_level * 100
        lines.append(f"Agreement Level: {agreement_pct:.1f}%\n")

        # Stance distribution
        lines.append("Stance Distribution:")
        total = sum(result.stance_distribution.values())
        for stance, count in result.stance_distribution.items():
            if count > 0:
                pct = (count / total * 100) if total > 0 else 0
                lines.append(f"  - {stance.value.title()}: {count} ({pct:.1f}%)")
        lines.append("")

        # Areas of agreement
        if result.areas_of_agreement:
            lines.append("Areas of Agreement:")
            for area in result.areas_of_agreement:
                lines.append(f"  - {area}")
            lines.append("")

        # Areas of disagreement
        if result.areas_of_disagreement:
            lines.append("Areas of Disagreement:")
            for area in result.areas_of_disagreement:
                lines.append(f"  - {area}")
            lines.append("")

        # Conflicting pairs
        if result.conflicting_pairs:
            lines.append("Specific Conflicts:")
            for i, (pos1, pos2) in enumerate(result.conflicting_pairs[:3], 1):
                lines.append(f"  {i}. {pos1.source_name} ({pos1.stance.value}) vs "
                           f"{pos2.source_name} ({pos2.stance.value})")
            if len(result.conflicting_pairs) > 3:
                lines.append(f"  ... and {len(result.conflicting_pairs) - 3} more")
            lines.append("")

        return "\n".join(lines)

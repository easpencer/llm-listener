"""Conflict detection for health research evidence.

This module identifies and highlights conflicts between authoritative sources
(CDC, WHO, FDA, NIH) and scholarly literature to help users understand when
sources disagree on health topics.
"""

from dataclasses import dataclass, field
from typing import List, Dict, Any, Optional, Set, Tuple
import re


@dataclass
class SourceConflict:
    """Represents a conflict between two sources on a specific topic.

    Attributes:
        source_a: First source name (e.g., "CDC")
        source_b: Second source name (e.g., "WHO")
        topic: What the sources disagree about
        position_a: Source A's position on the topic
        position_b: Source B's position on the topic
        severity: Conflict severity level ("minor", "moderate", "significant")
    """
    source_a: str
    source_b: str
    topic: str
    position_a: str
    position_b: str
    severity: str  # "minor", "moderate", "significant"

    def __post_init__(self):
        """Validate severity level."""
        valid_severities = {"minor", "moderate", "significant"}
        if self.severity not in valid_severities:
            raise ValueError(
                f"Severity must be one of {valid_severities}, got '{self.severity}'"
            )


@dataclass
class ConflictReport:
    """Report of conflicts found across evidence sources.

    Attributes:
        has_conflicts: Whether any conflicts were detected
        conflicts: List of identified conflicts between sources
        guidance_literature_alignment: Overall alignment between official guidance
            and research literature ("aligned", "partially_aligned", "divergent")
        summary: Human-readable summary of conflict analysis
    """
    has_conflicts: bool
    conflicts: List[SourceConflict] = field(default_factory=list)
    guidance_literature_alignment: str = "aligned"
    summary: str = ""

    def __post_init__(self):
        """Validate alignment level."""
        valid_alignments = {"aligned", "partially_aligned", "divergent"}
        if self.guidance_literature_alignment not in valid_alignments:
            raise ValueError(
                f"Alignment must be one of {valid_alignments}, "
                f"got '{self.guidance_literature_alignment}'"
            )


class ConflictDetector:
    """Detects conflicts between authoritative health sources and research.

    This class analyzes evidence data from government guidelines and scholarly
    literature to identify potential conflicts, disagreements, and divergences
    in health recommendations.

    The detector uses keyword/phrase analysis to identify:
    - Contradictory recommendations (recommended vs not recommended)
    - Differing strength of evidence claims
    - Timeline/recency conflicts (old guidance vs new research)
    """

    # Keywords indicating positive recommendations
    POSITIVE_KEYWORDS = {
        "recommended", "should", "advise", "encourage", "beneficial",
        "effective", "proven", "approved", "safe", "endorse", "support",
        "best practice", "guideline recommends", "suggests using",
    }

    # Keywords indicating negative recommendations
    NEGATIVE_KEYWORDS = {
        "not recommended", "should not", "avoid", "discourage", "ineffective",
        "unsafe", "contraindicated", "warning", "do not", "against",
        "caution", "risk", "harmful", "deprecated", "withdrawn",
    }

    # Keywords indicating uncertainty or weak evidence
    UNCERTAINTY_KEYWORDS = {
        "may", "might", "possibly", "unclear", "insufficient evidence",
        "limited data", "more research needed", "under investigation",
        "preliminary", "inconclusive", "mixed results", "conflicting",
    }

    # Keywords indicating strong evidence
    STRONG_EVIDENCE_KEYWORDS = {
        "conclusive", "definitive", "robust evidence", "well-established",
        "meta-analysis", "systematic review", "randomized controlled",
        "high-quality evidence", "consensus", "proven",
    }

    # Authority source identifiers
    AUTHORITY_SOURCES = {
        "CDC": ["cdc.gov", "cdc"],
        "WHO": ["who.int", "who", "world health organization"],
        "FDA": ["fda.gov", "fda", "food and drug"],
        "NIH": ["nih.gov", "nih", "national institutes of health"],
        "AHA": ["heart.org", "american heart association"],
        "ACS": ["cancer.org", "american cancer society"],
    }

    def __init__(self):
        """Initialize the conflict detector."""
        pass

    def detect_conflicts(
        self,
        guidelines_data: Dict[str, Any],
        literature_data: Dict[str, Any],
    ) -> ConflictReport:
        """Detect conflicts between guidelines and literature.

        Args:
            guidelines_data: Evidence from government/authority searches
                (expected format from EvidenceSearcher.search_government_guidelines)
            literature_data: Evidence from scholarly literature searches
                (expected format from EvidenceSearcher.search_scholarly_literature)

        Returns:
            ConflictReport with identified conflicts and alignment analysis
        """
        conflicts: List[SourceConflict] = []

        # Extract links safely
        guideline_links = guidelines_data.get("links", [])
        literature_links = literature_data.get("links", [])

        # Check if we have enough data to analyze
        if not guideline_links and not literature_links:
            return ConflictReport(
                has_conflicts=False,
                conflicts=[],
                guidance_literature_alignment="aligned",
                summary="Insufficient data to detect conflicts.",
            )

        # Detect inter-authority conflicts (CDC vs WHO, etc.)
        authority_conflicts = self._detect_authority_conflicts(guideline_links)
        conflicts.extend(authority_conflicts)

        # Detect guidance vs literature conflicts
        guidance_lit_conflicts = self._detect_guidance_literature_conflicts(
            guideline_links, literature_links
        )
        conflicts.extend(guidance_lit_conflicts)

        # Detect recency conflicts (old guidance vs new research)
        recency_conflicts = self._detect_recency_conflicts(
            guideline_links, literature_links
        )
        conflicts.extend(recency_conflicts)

        # Assess overall alignment
        alignment = self._assess_alignment(
            guideline_links, literature_links, conflicts
        )

        # Generate summary
        summary = self._generate_summary(conflicts, alignment)

        return ConflictReport(
            has_conflicts=len(conflicts) > 0,
            conflicts=conflicts,
            guidance_literature_alignment=alignment,
            summary=summary,
        )

    def _detect_authority_conflicts(
        self, guideline_links: List[Dict[str, Any]]
    ) -> List[SourceConflict]:
        """Detect conflicts between different authority sources.

        Args:
            guideline_links: List of guideline sources with title, url, snippet

        Returns:
            List of conflicts between authorities
        """
        conflicts = []

        # Group guidelines by source
        by_source: Dict[str, List[Dict[str, Any]]] = {}
        for link in guideline_links:
            source = self._identify_source(link.get("url", ""))
            if source:
                if source not in by_source:
                    by_source[source] = []
                by_source[source].append(link)

        # Compare each pair of sources
        sources = list(by_source.keys())
        for i, source_a in enumerate(sources):
            for source_b in sources[i+1:]:
                # Analyze snippets for conflicting recommendations
                a_snippets = [
                    link.get("snippet", "") for link in by_source[source_a]
                ]
                b_snippets = [
                    link.get("snippet", "") for link in by_source[source_b]
                ]

                conflict = self._analyze_snippet_conflict(
                    source_a, " ".join(a_snippets),
                    source_b, " ".join(b_snippets),
                )

                if conflict:
                    conflicts.append(conflict)

        return conflicts

    def _detect_guidance_literature_conflicts(
        self,
        guideline_links: List[Dict[str, Any]],
        literature_links: List[Dict[str, Any]],
    ) -> List[SourceConflict]:
        """Detect conflicts between official guidance and research literature.

        Args:
            guideline_links: Official guideline sources
            literature_links: Scholarly literature sources

        Returns:
            List of conflicts between guidance and literature
        """
        conflicts = []

        if not guideline_links or not literature_links:
            return conflicts

        # Combine all guideline text
        guidance_text = " ".join([
            f"{link.get('title', '')} {link.get('snippet', '')}"
            for link in guideline_links
        ])

        # Combine all literature text
        literature_text = " ".join([
            f"{link.get('title', '')} {link.get('snippet', '')}"
            for link in literature_links
        ])

        # Check for recommendation conflicts
        guidance_stance = self._classify_stance(guidance_text)
        literature_stance = self._classify_stance(literature_text)

        if guidance_stance != literature_stance and guidance_stance != "neutral":
            severity = self._determine_severity(guidance_stance, literature_stance)

            conflicts.append(SourceConflict(
                source_a="Official Guidance",
                source_b="Recent Research",
                topic="Treatment/intervention recommendation",
                position_a=self._describe_stance(guidance_stance, guidance_text[:200]),
                position_b=self._describe_stance(literature_stance, literature_text[:200]),
                severity=severity,
            ))

        # Check for evidence strength conflicts
        guidance_evidence = self._assess_evidence_strength(guidance_text)
        literature_evidence = self._assess_evidence_strength(literature_text)

        if abs(guidance_evidence - literature_evidence) >= 2:  # Significant gap
            conflicts.append(SourceConflict(
                source_a="Official Guidance",
                source_b="Recent Research",
                topic="Strength of evidence",
                position_a=self._describe_evidence_strength(guidance_evidence),
                position_b=self._describe_evidence_strength(literature_evidence),
                severity="moderate",
            ))

        return conflicts

    def _detect_recency_conflicts(
        self,
        guideline_links: List[Dict[str, Any]],
        literature_links: List[Dict[str, Any]],
    ) -> List[SourceConflict]:
        """Detect conflicts due to outdated guidance vs newer research.

        Args:
            guideline_links: Official guideline sources
            literature_links: Scholarly literature sources (sorted by citations)

        Returns:
            List of conflicts related to recency
        """
        conflicts = []

        # Check if literature mentions "recent" or "new" findings
        # that contradict older recommendations
        recent_keywords = {"recent", "new", "emerging", "latest", "updated"}
        contradiction_keywords = {
            "contrary to", "in contrast", "however", "despite",
            "challenges", "contradicts", "differs from",
        }

        for lit_link in literature_links[:5]:  # Check top 5 papers
            snippet = lit_link.get("snippet", "").lower()
            title = lit_link.get("title", "").lower()
            combined = f"{title} {snippet}"

            has_recency = any(kw in combined for kw in recent_keywords)
            has_contradiction = any(kw in combined for kw in contradiction_keywords)

            if has_recency and has_contradiction:
                conflicts.append(SourceConflict(
                    source_a="Established Guidance",
                    source_b=f"Recent Study ({lit_link.get('cited_by', 0)} citations)",
                    topic="Updated evidence challenging prior recommendations",
                    position_a="Traditional/established recommendation",
                    position_b=snippet[:200] if snippet else title[:200],
                    severity="moderate",
                ))
                break  # Only report one recency conflict to avoid noise

        return conflicts

    def _analyze_snippet_conflict(
        self,
        source_a: str,
        text_a: str,
        source_b: str,
        text_b: str,
    ) -> Optional[SourceConflict]:
        """Analyze two text snippets for conflicting recommendations.

        Args:
            source_a: Name of first source
            text_a: Text from first source
            source_b: Name of second source
            text_b: Text from second source

        Returns:
            SourceConflict if conflict detected, None otherwise
        """
        stance_a = self._classify_stance(text_a)
        stance_b = self._classify_stance(text_b)

        # Check for direct contradiction
        if (stance_a == "positive" and stance_b == "negative") or \
           (stance_a == "negative" and stance_b == "positive"):
            return SourceConflict(
                source_a=source_a,
                source_b=source_b,
                topic="Recommendation stance",
                position_a=self._describe_stance(stance_a, text_a[:200]),
                position_b=self._describe_stance(stance_b, text_b[:200]),
                severity="significant",
            )

        # Check for evidence strength differences
        evidence_a = self._assess_evidence_strength(text_a)
        evidence_b = self._assess_evidence_strength(text_b)

        if abs(evidence_a - evidence_b) >= 2:  # Significant difference
            return SourceConflict(
                source_a=source_a,
                source_b=source_b,
                topic="Evidence strength assessment",
                position_a=self._describe_evidence_strength(evidence_a),
                position_b=self._describe_evidence_strength(evidence_b),
                severity="minor",
            )

        return None

    def _classify_stance(self, text: str) -> str:
        """Classify the recommendation stance in text.

        Args:
            text: Text to analyze

        Returns:
            One of: "positive", "negative", "uncertain", "neutral"
        """
        text_lower = text.lower()

        positive_count = sum(
            1 for kw in self.POSITIVE_KEYWORDS if kw in text_lower
        )
        negative_count = sum(
            1 for kw in self.NEGATIVE_KEYWORDS if kw in text_lower
        )
        uncertain_count = sum(
            1 for kw in self.UNCERTAINTY_KEYWORDS if kw in text_lower
        )

        # Determine predominant stance
        if uncertain_count >= 2:
            return "uncertain"
        elif positive_count > negative_count:
            return "positive"
        elif negative_count > positive_count:
            return "negative"
        else:
            return "neutral"

    def _assess_evidence_strength(self, text: str) -> int:
        """Assess the strength of evidence mentioned in text.

        Args:
            text: Text to analyze

        Returns:
            Evidence strength score: 0 (weak) to 3 (strong)
        """
        text_lower = text.lower()

        strong_count = sum(
            1 for kw in self.STRONG_EVIDENCE_KEYWORDS if kw in text_lower
        )
        uncertainty_count = sum(
            1 for kw in self.UNCERTAINTY_KEYWORDS if kw in text_lower
        )

        # Calculate score
        if strong_count >= 2:
            return 3  # Very strong evidence
        elif strong_count >= 1 and uncertainty_count == 0:
            return 2  # Strong evidence
        elif uncertainty_count >= 2:
            return 0  # Weak evidence
        elif uncertainty_count >= 1:
            return 1  # Limited evidence
        else:
            return 2  # Moderate evidence (default)

    def _identify_source(self, url: str) -> Optional[str]:
        """Identify the authority source from a URL.

        Args:
            url: URL to analyze

        Returns:
            Authority name (e.g., "CDC") or None if not recognized
        """
        url_lower = url.lower()

        for authority, patterns in self.AUTHORITY_SOURCES.items():
            if any(pattern in url_lower for pattern in patterns):
                return authority

        return None

    def _describe_stance(self, stance: str, excerpt: str) -> str:
        """Create a human-readable description of a stance.

        Args:
            stance: Classified stance
            excerpt: Text excerpt

        Returns:
            Human-readable description
        """
        descriptions = {
            "positive": f"Recommends or supports this intervention. {excerpt}",
            "negative": f"Advises against or warns about this intervention. {excerpt}",
            "uncertain": f"Evidence is unclear or mixed. {excerpt}",
            "neutral": f"No clear recommendation provided. {excerpt}",
        }
        return descriptions.get(stance, excerpt)

    def _describe_evidence_strength(self, strength: int) -> str:
        """Describe evidence strength level.

        Args:
            strength: Evidence strength score (0-3)

        Returns:
            Human-readable description
        """
        descriptions = {
            0: "Weak or insufficient evidence",
            1: "Limited evidence; more research needed",
            2: "Moderate evidence base",
            3: "Strong, well-established evidence",
        }
        return descriptions.get(strength, "Evidence strength unclear")

    def _determine_severity(self, stance_a: str, stance_b: str) -> str:
        """Determine the severity of a conflict between stances.

        Args:
            stance_a: First stance
            stance_b: Second stance

        Returns:
            Severity level: "minor", "moderate", or "significant"
        """
        # Direct contradictions are significant
        if (stance_a == "positive" and stance_b == "negative") or \
           (stance_a == "negative" and stance_b == "positive"):
            return "significant"

        # Uncertain vs definitive is moderate
        if "uncertain" in [stance_a, stance_b] and \
           any(s in ["positive", "negative"] for s in [stance_a, stance_b]):
            return "moderate"

        # Other differences are minor
        return "minor"

    def _assess_alignment(
        self,
        guideline_links: List[Dict[str, Any]],
        literature_links: List[Dict[str, Any]],
        conflicts: List[SourceConflict],
    ) -> str:
        """Assess overall alignment between guidance and literature.

        Args:
            guideline_links: Guideline sources
            literature_links: Literature sources
            conflicts: Detected conflicts

        Returns:
            Alignment level: "aligned", "partially_aligned", or "divergent"
        """
        if not guideline_links or not literature_links:
            return "aligned"  # Can't diverge without both sources

        # Count significant conflicts
        significant_conflicts = sum(
            1 for c in conflicts if c.severity == "significant"
        )
        moderate_conflicts = sum(
            1 for c in conflicts if c.severity == "moderate"
        )

        if significant_conflicts >= 2 or moderate_conflicts >= 3:
            return "divergent"
        elif significant_conflicts >= 1 or moderate_conflicts >= 2:
            return "partially_aligned"
        else:
            return "aligned"

    def _generate_summary(
        self,
        conflicts: List[SourceConflict],
        alignment: str,
    ) -> str:
        """Generate a human-readable summary of the conflict analysis.

        Args:
            conflicts: List of detected conflicts
            alignment: Overall alignment level

        Returns:
            Summary text
        """
        if not conflicts:
            return (
                "No significant conflicts detected between official guidance "
                "and research literature. Sources appear to be in agreement."
            )

        conflict_count = len(conflicts)
        significant_count = sum(1 for c in conflicts if c.severity == "significant")

        summary_parts = [
            f"Detected {conflict_count} potential conflict(s) between sources."
        ]

        if significant_count > 0:
            summary_parts.append(
                f"{significant_count} significant conflict(s) require attention."
            )

        # Add alignment assessment
        alignment_desc = {
            "aligned": "Overall, sources are generally aligned despite minor differences.",
            "partially_aligned": "Sources show partial alignment with some notable divergences.",
            "divergent": "Sources show substantial divergence requiring careful review.",
        }
        summary_parts.append(alignment_desc[alignment])

        # Mention specific conflict types
        conflict_types: Set[str] = set()
        for conflict in conflicts:
            if "Guidance" in conflict.source_a or "Guidance" in conflict.source_b:
                conflict_types.add("guidance vs. research")
            elif "Recent" in conflict.source_b:
                conflict_types.add("recency")
            else:
                conflict_types.add("inter-authority")

        if conflict_types:
            types_str = ", ".join(sorted(conflict_types))
            summary_parts.append(f"Conflict types: {types_str}.")

        return " ".join(summary_parts)

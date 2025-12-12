"""Conflict analysis orchestrator for coordinating all conflict detection modules.

This module provides the ConflictAnalysisOrchestrator class, which coordinates
the analysis of conflicts, discordance, and agreement across AI responses and
evidence sources. It integrates multiple specialized analyzers and provides
a comprehensive conflict analysis result with audit logging and emerging topic detection.
"""

from dataclasses import dataclass, field
from datetime import datetime
from typing import Any, Dict, List, Optional, Tuple

from .agreement import AgreementAnalyzer, AgreementMetrics
from .conflicts import ConflictDetector, ConflictReport
from .discordance import DiscordanceAnalyzer, DiscordanceResult
from ..providers.base import LLMResponse


@dataclass
class ConflictSettings:
    """Configuration settings for conflict analysis.

    Attributes:
        agreement_threshold: Minimum agreement level (0.0-1.0) to avoid flagging conflicts
        severity_threshold: Minimum severity level to trigger resolution ("minor", "moderate", "significant")
        min_sources_for_consensus: Minimum number of sources needed to establish consensus
        enable_emerging_topics_detection: Whether to check for emerging/novel topics
        emerging_topic_evidence_threshold: Minimum evidence count to identify emerging topics
        include_patents_for_emerging: Whether to consider patents in emerging topic detection
        include_news_for_emerging: Whether to consider news articles in emerging topic detection
        enable_audit_logging: Whether to create detailed audit logs of detection decisions
    """

    agreement_threshold: float = 0.6
    severity_threshold: str = "moderate"
    min_sources_for_consensus: int = 3
    enable_emerging_topics_detection: bool = True
    emerging_topic_evidence_threshold: int = 5
    include_patents_for_emerging: bool = False
    include_news_for_emerging: bool = True
    enable_audit_logging: bool = True


@dataclass
class ConflictAnalysisResult:
    """Comprehensive result of conflict analysis across all detection modules.

    Attributes:
        has_conflicts: Whether any conflicts were detected
        conflict_severity: Overall severity level ("none", "minor", "moderate", "significant")
        agreement_metrics: Metrics from agreement analysis between AI responses
        discordance_result: Results from discordance analysis between responses and evidence
        conflict_report: Report from conflict detection between evidence sources
        is_emerging_topic: Whether this appears to be an emerging/novel topic
        emerging_topic_reason: Explanation of why topic is considered emerging (if applicable)
        requires_resolution: Whether conflicts exceed thresholds and need resolution
        resolution_context: Summary context for generating resolution prompts
        audit_log: Timestamped log of all detection decisions made during analysis
    """

    has_conflicts: bool
    conflict_severity: str
    agreement_metrics: AgreementMetrics
    discordance_result: DiscordanceResult
    conflict_report: ConflictReport
    is_emerging_topic: bool = False
    emerging_topic_reason: Optional[str] = None
    requires_resolution: bool = False
    resolution_context: Optional[str] = None
    audit_log: List[Dict[str, Any]] = field(default_factory=list)


class ConflictAnalysisOrchestrator:
    """Orchestrates comprehensive conflict analysis across multiple detection modules.

    This class coordinates the analysis of conflicts, discordance, and agreement
    between AI model responses and evidence from multiple sources (guidelines,
    scholarly literature). It provides:

    - Multi-module conflict detection (inter-source, AI vs. evidence, etc.)
    - Agreement analysis between AI responses
    - Discordance analysis between responses and evidence
    - Emerging topic detection
    - Audit logging of detection decisions
    - Determination of whether conflicts require resolution

    The orchestrator integrates:
    - ConflictDetector: Detects conflicts between evidence sources
    - DiscordanceAnalyzer: Analyzes disagreement between AI and evidence
    - AgreementAnalyzer: Measures agreement between AI responses
    """

    # Severity level ordering for comparison
    SEVERITY_LEVELS = ["none", "minor", "moderate", "significant"]

    def __init__(self, settings: ConflictSettings):
        """Initialize the conflict analysis orchestrator.

        Args:
            settings: Configuration settings for conflict analysis
        """
        self.settings = settings

        # Initialize detection modules
        self.conflict_detector = ConflictDetector()
        self.discordance_analyzer = DiscordanceAnalyzer()
        self.agreement_analyzer = AgreementAnalyzer()

        # Internal audit log storage
        self._current_audit_log: List[Dict[str, Any]] = []

    def analyze_all(
        self,
        ai_responses: List[LLMResponse],
        guidelines_data: Dict[str, Any],
        literature_data: Dict[str, Any],
        question: str
    ) -> ConflictAnalysisResult:
        """Perform comprehensive conflict analysis across all modules.

        This method orchestrates the complete conflict detection pipeline:
        1. Detect conflicts between evidence sources (guidelines vs. literature)
        2. Analyze agreement between AI model responses
        3. Analyze discordance between AI responses and evidence
        4. Check for emerging topics (if enabled)
        5. Determine overall conflict severity
        6. Decide if resolution is needed
        7. Build resolution context if required

        Args:
            ai_responses: List of LLMResponse objects from different AI providers
            guidelines_data: Evidence data from government/authority searches
            literature_data: Evidence data from scholarly literature searches
            question: The original user question being analyzed

        Returns:
            ConflictAnalysisResult containing comprehensive conflict analysis
        """
        # Reset audit log for this analysis
        self._current_audit_log = []

        # Log the start of analysis
        self._log_decision(
            "analysis_start",
            {
                "question": question,
                "num_ai_responses": len(ai_responses),
                "has_guidelines": bool(guidelines_data.get("links")),
                "has_literature": bool(literature_data.get("links")),
            }
        )

        # Step 1: Detect conflicts between evidence sources
        conflict_report = self.conflict_detector.detect_conflicts(
            guidelines_data, literature_data
        )
        self._log_decision(
            "conflict_detection",
            {
                "has_conflicts": conflict_report.has_conflicts,
                "num_conflicts": len(conflict_report.conflicts),
                "alignment": conflict_report.guidance_literature_alignment,
            }
        )

        # Step 2: Analyze agreement between AI responses
        agreement_metrics = self.agreement_analyzer.analyze(ai_responses)
        self._log_decision(
            "agreement_analysis",
            {
                "overall_agreement": agreement_metrics.overall_agreement,
                "consensus_level": agreement_metrics.consensus_level,
                "num_providers": len(agreement_metrics.stance_alignment),
            }
        )

        # Step 3: Analyze discordance between AI and evidence
        # Prepare evidence data for discordance analyzer
        evidence_data = {
            "guidelines": guidelines_data,
            "literature": literature_data,
        }

        # Convert LLMResponse objects to dict format expected by discordance analyzer
        ai_responses_dicts = [
            {
                "provider_name": r.provider_name,
                "model": r.model,
                "content": r.content,
            }
            for r in ai_responses if r.success
        ]

        discordance_result = self.discordance_analyzer.analyze(
            ai_responses=ai_responses_dicts,
            evidence_data=evidence_data,
        )
        self._log_decision(
            "discordance_analysis",
            {
                "agreement_level": discordance_result.agreement_level,
                "num_positions": len(discordance_result.source_positions),
                "num_conflicting_pairs": len(discordance_result.conflicting_pairs),
            }
        )

        # Step 4: Check for emerging topics (if enabled)
        is_emerging_topic = False
        emerging_topic_reason = None

        if self.settings.enable_emerging_topics_detection:
            is_emerging_topic, emerging_topic_reason = self._check_emerging_topic(
                guidelines_data, literature_data
            )
            self._log_decision(
                "emerging_topic_detection",
                {
                    "is_emerging": is_emerging_topic,
                    "reason": emerging_topic_reason,
                }
            )

        # Step 5: Determine overall conflict severity
        conflict_severity = self._determine_overall_severity(
            conflict_report, discordance_result
        )
        self._log_decision(
            "severity_determination",
            {
                "severity": conflict_severity,
                "threshold": self.settings.severity_threshold,
            }
        )

        # Step 6: Decide if resolution is needed
        requires_resolution = self._requires_resolution(
            conflict_severity,
            agreement_metrics,
            conflict_report,
        )
        self._log_decision(
            "resolution_decision",
            {
                "requires_resolution": requires_resolution,
                "reason": self._get_resolution_reason(
                    conflict_severity, agreement_metrics, conflict_report
                ),
            }
        )

        # Step 7: Build resolution context if needed
        resolution_context = None
        if requires_resolution:
            resolution_context = self._build_resolution_context(
                conflict_report, discordance_result
            )

        # Determine if there are any conflicts overall
        has_conflicts = (
            conflict_report.has_conflicts
            or agreement_metrics.overall_agreement < self.settings.agreement_threshold
            or discordance_result.agreement_level < self.settings.agreement_threshold
        )

        self._log_decision(
            "analysis_complete",
            {
                "has_conflicts": has_conflicts,
                "requires_resolution": requires_resolution,
            }
        )

        return ConflictAnalysisResult(
            has_conflicts=has_conflicts,
            conflict_severity=conflict_severity,
            agreement_metrics=agreement_metrics,
            discordance_result=discordance_result,
            conflict_report=conflict_report,
            is_emerging_topic=is_emerging_topic,
            emerging_topic_reason=emerging_topic_reason,
            requires_resolution=requires_resolution,
            resolution_context=resolution_context,
            audit_log=self._current_audit_log if self.settings.enable_audit_logging else [],
        )

    def _check_emerging_topic(
        self,
        guidelines_data: Dict[str, Any],
        literature_data: Dict[str, Any],
    ) -> Tuple[bool, Optional[str]]:
        """Check if the topic appears to be emerging or novel.

        An emerging topic is characterized by:
        - Limited or no official guidance available
        - Recent scholarly literature with low citation counts
        - Mentions of "emerging", "novel", "new", "recent" in literature
        - Patents or news articles (if enabled in settings)

        Args:
            guidelines_data: Evidence from government/authority searches
            literature_data: Evidence from scholarly literature searches

        Returns:
            Tuple of (is_emerging, reason) where reason explains why if True
        """
        reasons = []

        # Check 1: Limited official guidance
        guideline_count = len(guidelines_data.get("links", []))
        if guideline_count < self.settings.min_sources_for_consensus:
            reasons.append(
                f"Limited official guidance ({guideline_count} sources, "
                f"threshold: {self.settings.min_sources_for_consensus})"
            )

        # Check 2: Literature characteristics
        literature_links = literature_data.get("links", [])
        literature_count = len(literature_links)

        if literature_count > 0 and literature_count < self.settings.emerging_topic_evidence_threshold:
            reasons.append(
                f"Limited research literature ({literature_count} sources, "
                f"threshold: {self.settings.emerging_topic_evidence_threshold})"
            )

        # Check 3: Recent/emerging keywords in literature
        emerging_keywords = [
            "emerging", "novel", "new", "recent", "innovative", "cutting-edge",
            "first-in-human", "preliminary", "early-phase", "under investigation",
        ]

        literature_text = " ".join([
            f"{link.get('title', '')} {link.get('snippet', '')}"
            for link in literature_links[:10]  # Check top 10
        ]).lower()

        emerging_keyword_matches = [
            kw for kw in emerging_keywords if kw in literature_text
        ]

        if len(emerging_keyword_matches) >= 3:
            reasons.append(
                f"Multiple emerging-topic indicators in literature: "
                f"{', '.join(emerging_keyword_matches[:5])}"
            )

        # Check 4: Low citation counts (indicates recent/emerging research)
        cited_counts = [
            link.get("cited_by", 0)
            for link in literature_links[:5]  # Top 5 papers
            if "cited_by" in link
        ]

        if cited_counts and sum(cited_counts) / len(cited_counts) < 50:
            avg_citations = sum(cited_counts) / len(cited_counts)
            reasons.append(
                f"Low average citation count ({avg_citations:.0f}) suggests recent research"
            )

        # Check 5: News articles (if enabled)
        if self.settings.include_news_for_emerging:
            # Check if any sources look like news articles
            news_indicators = ["news", "article", "press", "media", "report"]
            news_count = sum(
                1 for link in literature_links
                if any(ind in link.get("url", "").lower() for ind in news_indicators)
            )

            if news_count > 0:
                reasons.append(f"Topic appears in {news_count} news article(s)")

        # Determine if emerging based on number of indicators
        is_emerging = len(reasons) >= 2  # At least 2 indicators

        if is_emerging:
            reason = "; ".join(reasons)
            return True, reason
        else:
            return False, None

    def _determine_overall_severity(
        self,
        conflict_report: ConflictReport,
        discordance_result: DiscordanceResult,
    ) -> str:
        """Determine the overall conflict severity level.

        Analyzes multiple factors to determine severity:
        - Severity of conflicts in conflict_report
        - Agreement level in discordance_result
        - Number of conflicting source pairs
        - Guidance-literature alignment

        Args:
            conflict_report: Report from conflict detection
            discordance_result: Results from discordance analysis

        Returns:
            Overall severity: "none", "minor", "moderate", or "significant"
        """
        # If no conflicts at all, severity is "none"
        if not conflict_report.has_conflicts and discordance_result.agreement_level >= 0.8:
            return "none"

        # Count conflicts by severity
        significant_conflicts = sum(
            1 for c in conflict_report.conflicts if c.severity == "significant"
        )
        moderate_conflicts = sum(
            1 for c in conflict_report.conflicts if c.severity == "moderate"
        )
        minor_conflicts = sum(
            1 for c in conflict_report.conflicts if c.severity == "minor"
        )

        # Check discordance agreement level
        low_discordance_agreement = discordance_result.agreement_level < 0.4
        moderate_discordance = 0.4 <= discordance_result.agreement_level < 0.7

        # Determine overall severity based on conflict patterns

        # Significant: Multiple significant conflicts OR very low agreement
        if significant_conflicts >= 2 or low_discordance_agreement:
            return "significant"

        # Significant: Single significant conflict + other conflicts
        if significant_conflicts >= 1 and (moderate_conflicts >= 1 or minor_conflicts >= 2):
            return "significant"

        # Moderate: Single significant conflict OR multiple moderate conflicts
        if significant_conflicts >= 1 or moderate_conflicts >= 2:
            return "moderate"

        # Moderate: Moderate discordance OR divergent alignment
        if moderate_discordance or conflict_report.guidance_literature_alignment == "divergent":
            return "moderate"

        # Minor: Some conflicts but not severe
        if minor_conflicts >= 1 or moderate_conflicts >= 1:
            return "minor"

        # Default to minor if there are any conflicts at all
        if conflict_report.has_conflicts or discordance_result.agreement_level < 0.7:
            return "minor"

        return "none"

    def _build_resolution_context(
        self,
        conflict_report: ConflictReport,
        discordance_result: DiscordanceResult,
    ) -> str:
        """Build a context summary for conflict resolution prompts.

        Creates a structured summary of conflicts to help guide resolution,
        including:
        - Key conflicts between sources
        - Areas of disagreement
        - Conflicting source pairs
        - Overall alignment status

        Args:
            conflict_report: Report from conflict detection
            discordance_result: Results from discordance analysis

        Returns:
            Formatted string summarizing conflicts for resolution
        """
        context_parts = []

        # Overall summary
        context_parts.append("=== CONFLICT RESOLUTION CONTEXT ===\n")

        # Conflict report summary
        if conflict_report.has_conflicts:
            context_parts.append("EVIDENCE SOURCE CONFLICTS:")
            context_parts.append(f"- {len(conflict_report.conflicts)} conflict(s) detected")
            context_parts.append(
                f"- Overall alignment: {conflict_report.guidance_literature_alignment}"
            )

            # List significant conflicts
            significant = [c for c in conflict_report.conflicts if c.severity == "significant"]
            if significant:
                context_parts.append(f"\nSignificant conflicts ({len(significant)}):")
                for i, conflict in enumerate(significant[:3], 1):  # Top 3
                    context_parts.append(
                        f"  {i}. {conflict.source_a} vs {conflict.source_b} on '{conflict.topic}'"
                    )
                    context_parts.append(f"     - {conflict.source_a}: {conflict.position_a[:100]}...")
                    context_parts.append(f"     - {conflict.source_b}: {conflict.position_b[:100]}...")

            context_parts.append("")

        # Discordance summary
        context_parts.append("RESPONSE-EVIDENCE DISCORDANCE:")
        context_parts.append(
            f"- Agreement level: {discordance_result.agreement_level:.1%}"
        )

        if discordance_result.areas_of_disagreement:
            context_parts.append("- Areas of disagreement:")
            for area in discordance_result.areas_of_disagreement[:3]:
                context_parts.append(f"  • {area}")

        # Conflicting pairs
        if discordance_result.conflicting_pairs:
            context_parts.append(f"\n- {len(discordance_result.conflicting_pairs)} conflicting source pair(s)")
            for i, (pos1, pos2) in enumerate(discordance_result.conflicting_pairs[:2], 1):
                context_parts.append(
                    f"  {i}. {pos1.source_name} ({pos1.stance.value}) vs "
                    f"{pos2.source_name} ({pos2.stance.value})"
                )

        context_parts.append("\n=== END CONTEXT ===")

        return "\n".join(context_parts)

    def _requires_resolution(
        self,
        conflict_severity: str,
        agreement_metrics: AgreementMetrics,
        conflict_report: ConflictReport,
    ) -> bool:
        """Determine if conflicts are severe enough to require resolution.

        Resolution is required when:
        - Severity exceeds configured threshold
        - Agreement is below configured threshold
        - Specific critical conflicts are present

        Args:
            conflict_severity: Overall conflict severity level
            agreement_metrics: Agreement analysis metrics
            conflict_report: Conflict detection report

        Returns:
            True if resolution is needed, False otherwise
        """
        # Check if severity exceeds threshold
        severity_index = self.SEVERITY_LEVELS.index(conflict_severity)
        threshold_index = self.SEVERITY_LEVELS.index(self.settings.severity_threshold)

        if severity_index >= threshold_index:
            return True

        # Check if agreement is below threshold
        if agreement_metrics.overall_agreement < self.settings.agreement_threshold:
            return True

        # Check for divergent alignment (always requires resolution)
        if conflict_report.guidance_literature_alignment == "divergent":
            return True

        # Check for divided consensus (always requires resolution)
        if agreement_metrics.consensus_level == "divided":
            return True

        return False

    def _get_resolution_reason(
        self,
        conflict_severity: str,
        agreement_metrics: AgreementMetrics,
        conflict_report: ConflictReport,
    ) -> str:
        """Get a human-readable reason for resolution requirement.

        Args:
            conflict_severity: Overall conflict severity level
            agreement_metrics: Agreement analysis metrics
            conflict_report: Conflict detection report

        Returns:
            String explaining why resolution is or isn't needed
        """
        reasons = []

        # Check severity
        severity_index = self.SEVERITY_LEVELS.index(conflict_severity)
        threshold_index = self.SEVERITY_LEVELS.index(self.settings.severity_threshold)

        if severity_index >= threshold_index:
            reasons.append(
                f"Conflict severity '{conflict_severity}' meets or exceeds "
                f"threshold '{self.settings.severity_threshold}'"
            )

        # Check agreement
        if agreement_metrics.overall_agreement < self.settings.agreement_threshold:
            reasons.append(
                f"Agreement level {agreement_metrics.overall_agreement:.1%} "
                f"below threshold {self.settings.agreement_threshold:.1%}"
            )

        # Check alignment
        if conflict_report.guidance_literature_alignment == "divergent":
            reasons.append("Evidence sources show divergent alignment")

        # Check consensus
        if agreement_metrics.consensus_level == "divided":
            reasons.append(f"Consensus level is '{agreement_metrics.consensus_level}'")

        if reasons:
            return "; ".join(reasons)
        else:
            return "No significant conflicts requiring resolution"

    def _log_decision(self, decision_type: str, details: Dict[str, Any]) -> Dict[str, Any]:
        """Log a detection decision for audit trail.

        Creates a timestamped log entry recording a decision made during
        conflict analysis. Used for debugging, auditing, and understanding
        the analysis process.

        Args:
            decision_type: Type of decision being logged (e.g., "conflict_detection")
            details: Dictionary of decision details

        Returns:
            The log entry dictionary (also appended to internal log)
        """
        log_entry = {
            "timestamp": datetime.utcnow().isoformat(),
            "decision_type": decision_type,
            "details": details,
        }

        if self.settings.enable_audit_logging:
            self._current_audit_log.append(log_entry)

        return log_entry

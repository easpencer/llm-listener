"""
Configuration settings for conflict detection and analysis.

This module provides a dataclass-based configuration system for customizing
how conflicts are detected, analyzed, and reported in the LLM Listener system.
"""

from dataclasses import dataclass, field, asdict
from typing import Dict, List, Any


@dataclass
class ConflictSettings:
    """
    Configuration class for conflict detection thresholds and behaviors.

    This class allows fine-tuning of conflict detection algorithms, controlling
    when conflicts are flagged, what severity levels matter, and how emerging
    topics with limited evidence are handled.

    Attributes:
        agreement_threshold: Agreement score below this value triggers conflict
            analysis. Range: 0.0-1.0, where 1.0 means perfect agreement.
            Lower values make the system more sensitive to disagreements.

        severity_threshold: Minimum conflict severity level to flag and report.
            Options: "minor", "moderate", "significant". This filters out
            conflicts below the specified severity to reduce noise.

        min_sources_for_consensus: Minimum number of sources required before
            declaring consensus. Higher values increase confidence but may
            exclude valid insights from smaller source sets.

        enable_emerging_topics_detection: Whether to detect and flag topics
            with insufficient evidence. When enabled, the system identifies
            areas where claims are made but supporting evidence is sparse.

        emerging_topic_evidence_threshold: Evidence count below this value
            marks a topic as "emerging" (insufficient evidence). Topics with
            fewer pieces of evidence may be flagged for additional research.

        include_patents_for_emerging: Whether to search patent databases when
            detecting emerging topics. Useful for technical/scientific topics
            where patents may provide early evidence.

        include_news_for_emerging: Whether to search news sources when detecting
            emerging topics. Useful for current events and rapidly evolving
            topics where traditional sources may lag.

        enable_audit_logging: Whether to log conflict detection decisions for
            debugging and transparency. Logs include reasoning for flagged
            conflicts and threshold comparisons.

        confidence_display_threshold: Confidence score below this value triggers
            uncertainty warnings to users. Range: 0.0-1.0. Helps users understand
            when results may be unreliable due to conflicts or lack of evidence.
    """

    agreement_threshold: float = 0.6
    severity_threshold: str = "moderate"
    min_sources_for_consensus: int = 3
    enable_emerging_topics_detection: bool = True
    emerging_topic_evidence_threshold: int = 5
    include_patents_for_emerging: bool = True
    include_news_for_emerging: bool = True
    enable_audit_logging: bool = True
    confidence_display_threshold: float = 0.3

    @classmethod
    def from_dict(cls, data: Dict[str, Any]) -> "ConflictSettings":
        """
        Create a ConflictSettings instance from a dictionary.

        This method is useful for creating settings from API request parameters,
        configuration files, or database records. Only keys that match attribute
        names are used; extra keys are ignored.

        Args:
            data: Dictionary containing configuration values. Keys should match
                attribute names (e.g., "agreement_threshold", "severity_threshold").

        Returns:
            A new ConflictSettings instance with values from the dictionary.
            Any attributes not present in the dictionary will use default values.

        Example:
            >>> settings = ConflictSettings.from_dict({
            ...     "agreement_threshold": 0.7,
            ...     "severity_threshold": "significant",
            ...     "enable_audit_logging": False
            ... })
        """
        # Filter to only valid field names
        valid_fields = {f.name for f in cls.__dataclass_fields__.values()}
        filtered_data = {k: v for k, v in data.items() if k in valid_fields}
        return cls(**filtered_data)

    def to_dict(self) -> Dict[str, Any]:
        """
        Serialize the ConflictSettings instance to a dictionary.

        This method is useful for API responses, logging, or persisting
        settings to a database or configuration file.

        Returns:
            Dictionary containing all configuration values with attribute
            names as keys.

        Example:
            >>> settings = ConflictSettings(agreement_threshold=0.7)
            >>> settings.to_dict()
            {'agreement_threshold': 0.7, 'severity_threshold': 'moderate', ...}
        """
        return asdict(self)

    def validate(self) -> List[str]:
        """
        Validate configuration settings and return any errors.

        This method checks that all settings are within valid ranges and
        compatible with each other. It should be called before using the
        settings to ensure configuration is correct.

        Returns:
            List of validation error messages. Empty list indicates all
            settings are valid.

        Example:
            >>> settings = ConflictSettings(agreement_threshold=1.5)
            >>> errors = settings.validate()
            >>> if errors:
            ...     print("Invalid settings:", errors)
        """
        errors: List[str] = []

        # Validate agreement_threshold
        if not 0.0 <= self.agreement_threshold <= 1.0:
            errors.append(
                f"agreement_threshold must be between 0.0 and 1.0, "
                f"got {self.agreement_threshold}"
            )

        # Validate severity_threshold
        valid_severities = {"minor", "moderate", "significant"}
        if self.severity_threshold not in valid_severities:
            errors.append(
                f"severity_threshold must be one of {valid_severities}, "
                f"got '{self.severity_threshold}'"
            )

        # Validate min_sources_for_consensus
        if self.min_sources_for_consensus < 1:
            errors.append(
                f"min_sources_for_consensus must be at least 1, "
                f"got {self.min_sources_for_consensus}"
            )

        if self.min_sources_for_consensus > 100:
            errors.append(
                f"min_sources_for_consensus seems unreasonably high "
                f"(got {self.min_sources_for_consensus}), consider a lower value"
            )

        # Validate emerging_topic_evidence_threshold
        if self.emerging_topic_evidence_threshold < 0:
            errors.append(
                f"emerging_topic_evidence_threshold must be non-negative, "
                f"got {self.emerging_topic_evidence_threshold}"
            )

        # Validate confidence_display_threshold
        if not 0.0 <= self.confidence_display_threshold <= 1.0:
            errors.append(
                f"confidence_display_threshold must be between 0.0 and 1.0, "
                f"got {self.confidence_display_threshold}"
            )

        # Validate logical consistency
        if self.confidence_display_threshold > self.agreement_threshold:
            errors.append(
                f"confidence_display_threshold ({self.confidence_display_threshold}) "
                f"should not exceed agreement_threshold ({self.agreement_threshold})"
            )

        # Warn about emerging topics detection consistency
        if self.enable_emerging_topics_detection:
            if not self.include_patents_for_emerging and not self.include_news_for_emerging:
                errors.append(
                    "enable_emerging_topics_detection is True but both "
                    "include_patents_for_emerging and include_news_for_emerging "
                    "are False. Consider enabling at least one source type."
                )

        return errors

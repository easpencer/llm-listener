"""Agreement analysis for multiple LLM responses.

This module provides tools to measure and analyze agreement between different AI models
in the Chorus health research application. It uses lightweight text analysis techniques
to calculate similarity scores and detect stance alignment without requiring API calls.
"""

from dataclasses import dataclass, field
from typing import Dict, List, Optional, Set, Tuple
import re
from collections import Counter

from ..providers.base import LLMResponse


@dataclass
class AgreementMetrics:
    """Structured metrics representing agreement between LLM responses.

    Attributes:
        overall_agreement: Float between 0-1 where 1 indicates full agreement
        pairwise_scores: Dictionary mapping provider pairs (tuple) to similarity scores
        stance_alignment: Dictionary mapping provider names to detected stance
        consensus_level: Categorization of agreement ("strong", "moderate", "mixed", "divided")
        summary: Human-readable summary of agreement (e.g., "3/4 models agree on effectiveness")
    """

    overall_agreement: float
    pairwise_scores: Dict[Tuple[str, str], float] = field(default_factory=dict)
    stance_alignment: Dict[str, str] = field(default_factory=dict)
    consensus_level: str = "unknown"
    summary: str = ""


class AgreementAnalyzer:
    """Analyzes agreement between multiple LLM responses using text similarity and stance detection.

    This class provides methods to:
    - Calculate pairwise similarity between responses
    - Detect stance/sentiment in health recommendations
    - Generate overall agreement metrics
    - Identify consensus patterns

    The analysis uses lightweight techniques that don't require external API calls:
    - Jaccard similarity on key phrases
    - Keyword-based stance detection
    - Recommendation extraction and comparison
    """

    # Stance detection keyword categories for health contexts
    POSITIVE_KEYWORDS = {
        'effective', 'recommended', 'beneficial', 'safe', 'helpful', 'proven',
        'should', 'important', 'necessary', 'essential', 'valuable', 'approved',
        'supports', 'improves', 'reduces risk', 'protects', 'prevents',
        'well-established', 'evidence-based', 'widely accepted', 'shown to',
        'significantly better', 'highly effective', 'strongly recommend'
    }

    CAUTIONARY_KEYWORDS = {
        'may', 'might', 'could', 'potential', 'possible', 'consider',
        'consult', 'discuss with', 'depending on', 'varies', 'individual',
        'monitor', 'caution', 'aware', 'limited evidence', 'mixed results',
        'under investigation', 'emerging', 'preliminary', 'more research needed',
        'case-by-case', 'personalized', 'qualified', 'conditional'
    }

    NEGATIVE_KEYWORDS = {
        'not recommended', 'avoid', 'ineffective', 'harmful', 'risk', 'unsafe',
        'contraindicated', 'should not', 'do not', 'no evidence', 'unproven',
        'dangerous', 'adverse', 'side effect', 'warning', 'prohibited',
        'insufficient evidence', 'not approved', 'lack of', 'no benefit',
        'strongly discourage', 'against', 'concerns about'
    }

    NEUTRAL_KEYWORDS = {
        'generally', 'typically', 'often', 'usually', 'common', 'standard',
        'available', 'option', 'approach', 'method', 'treatment', 'therapy',
        'alternative', 'conventional', 'currently', 'traditionally'
    }

    def __init__(self):
        """Initialize the AgreementAnalyzer."""
        pass

    def analyze(self, responses: List[LLMResponse]) -> AgreementMetrics:
        """Analyze agreement between multiple LLM responses.

        Args:
            responses: List of LLMResponse objects to analyze

        Returns:
            AgreementMetrics containing similarity scores, stance alignment, and summary

        Raises:
            ValueError: If responses list is empty or contains only errors
        """
        # Filter to successful responses only
        successful_responses = [r for r in responses if r.success]

        if not successful_responses:
            return AgreementMetrics(
                overall_agreement=0.0,
                consensus_level="error",
                summary="No successful responses to analyze"
            )

        if len(successful_responses) == 1:
            provider = successful_responses[0].provider_name
            stance = self._detect_stance(successful_responses[0].content)
            return AgreementMetrics(
                overall_agreement=1.0,
                stance_alignment={provider: stance},
                consensus_level="single",
                summary=f"Only {provider} provided a response ({stance} stance)"
            )

        # Calculate pairwise similarity scores
        pairwise_scores = self._calculate_pairwise_scores(successful_responses)

        # Detect stance for each response
        stance_alignment = {
            r.provider_name: self._detect_stance(r.content)
            for r in successful_responses
        }

        # Calculate overall agreement
        overall_agreement = self._calculate_overall_agreement(pairwise_scores)

        # Determine consensus level
        consensus_level = self._determine_consensus_level(
            overall_agreement, stance_alignment
        )

        # Generate summary
        summary = self._generate_summary(
            successful_responses, stance_alignment, overall_agreement
        )

        return AgreementMetrics(
            overall_agreement=overall_agreement,
            pairwise_scores=pairwise_scores,
            stance_alignment=stance_alignment,
            consensus_level=consensus_level,
            summary=summary
        )

    def _calculate_pairwise_scores(
        self, responses: List[LLMResponse]
    ) -> Dict[Tuple[str, str], float]:
        """Calculate pairwise similarity scores between all response pairs.

        Args:
            responses: List of successful LLMResponse objects

        Returns:
            Dictionary mapping (provider1, provider2) tuples to similarity scores (0-1)
        """
        pairwise_scores = {}

        for i in range(len(responses)):
            for j in range(i + 1, len(responses)):
                provider1 = responses[i].provider_name
                provider2 = responses[j].provider_name

                similarity = self._calculate_similarity(
                    responses[i].content,
                    responses[j].content
                )

                # Store with consistent ordering (alphabetical)
                key = tuple(sorted([provider1, provider2]))
                pairwise_scores[key] = similarity

        return pairwise_scores

    def _calculate_similarity(self, text1: str, text2: str) -> float:
        """Calculate similarity between two texts using Jaccard similarity on key phrases.

        This method:
        1. Extracts key phrases from both texts
        2. Normalizes them (lowercase, remove punctuation)
        3. Calculates Jaccard similarity (intersection/union)

        Args:
            text1: First text to compare
            text2: Second text to compare

        Returns:
            Similarity score between 0-1, where 1 is identical
        """
        phrases1 = self._extract_key_phrases(text1)
        phrases2 = self._extract_key_phrases(text2)

        if not phrases1 and not phrases2:
            return 1.0  # Both empty
        if not phrases1 or not phrases2:
            return 0.0  # One empty

        # Jaccard similarity: intersection / union
        intersection = len(phrases1 & phrases2)
        union = len(phrases1 | phrases2)

        jaccard = intersection / union if union > 0 else 0.0

        # Also calculate word overlap for additional signal
        words1 = self._extract_words(text1)
        words2 = self._extract_words(text2)

        word_intersection = len(words1 & words2)
        word_union = len(words1 | words2)
        word_overlap = word_intersection / word_union if word_union > 0 else 0.0

        # Weighted combination: phrases matter more than individual words
        return 0.7 * jaccard + 0.3 * word_overlap

    def _extract_key_phrases(self, text: str) -> Set[str]:
        """Extract key phrases from text (2-4 word sequences).

        Args:
            text: Text to extract phrases from

        Returns:
            Set of normalized key phrases
        """
        # Normalize text
        text = text.lower()

        # Remove special characters but keep spaces and hyphens
        text = re.sub(r'[^\w\s-]', ' ', text)

        # Split into words
        words = text.split()

        phrases = set()

        # Extract 2-grams, 3-grams, and 4-grams
        for n in [2, 3, 4]:
            for i in range(len(words) - n + 1):
                phrase = ' '.join(words[i:i+n])
                # Filter out phrases that are too generic
                if len(phrase) > 5 and not self._is_generic_phrase(phrase):
                    phrases.add(phrase)

        return phrases

    def _extract_words(self, text: str) -> Set[str]:
        """Extract significant words from text (excluding common stop words).

        Args:
            text: Text to extract words from

        Returns:
            Set of normalized significant words
        """
        # Common stop words to exclude
        stop_words = {
            'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
            'of', 'with', 'by', 'from', 'as', 'is', 'are', 'was', 'were', 'be',
            'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
            'would', 'could', 'should', 'may', 'might', 'can', 'this', 'that',
            'these', 'those', 'it', 'its', 'you', 'your', 'they', 'their', 'there'
        }

        # Normalize and split
        text = text.lower()
        text = re.sub(r'[^\w\s]', ' ', text)
        words = text.split()

        # Filter: exclude stop words and short words
        return {w for w in words if len(w) > 3 and w not in stop_words}

    def _is_generic_phrase(self, phrase: str) -> bool:
        """Check if a phrase is too generic to be meaningful.

        Args:
            phrase: Phrase to check

        Returns:
            True if phrase is generic, False otherwise
        """
        generic_patterns = [
            'it is important',
            'you should consult',
            'talk to your',
            'consult with your',
            'discuss with your',
            'important to note',
            'keep in mind',
            'it is recommended',
            'please note that',
            'you may want'
        ]

        return any(pattern in phrase for pattern in generic_patterns)

    def _detect_stance(self, text: str) -> str:
        """Detect the stance/sentiment in a health-related response.

        Analyzes text for keywords indicating:
        - positive: Recommends/supports the intervention
        - cautionary: Suggests caution, individual assessment, or conditional support
        - negative: Advises against or warns about the intervention
        - neutral: Provides information without clear recommendation

        Args:
            text: Response text to analyze

        Returns:
            Detected stance: "positive", "cautionary", "negative", or "neutral"
        """
        text_lower = text.lower()

        # Count keyword matches in each category
        positive_count = sum(1 for kw in self.POSITIVE_KEYWORDS if kw in text_lower)
        cautionary_count = sum(1 for kw in self.CAUTIONARY_KEYWORDS if kw in text_lower)
        negative_count = sum(1 for kw in self.NEGATIVE_KEYWORDS if kw in text_lower)
        neutral_count = sum(1 for kw in self.NEUTRAL_KEYWORDS if kw in text_lower)

        # Normalize by total keywords found
        total = positive_count + cautionary_count + negative_count + neutral_count

        if total == 0:
            return "neutral"

        # Calculate proportions
        positive_ratio = positive_count / total
        cautionary_ratio = cautionary_count / total
        negative_ratio = negative_count / total

        # Determine stance based on dominant category
        # Negative takes priority if significant
        if negative_ratio > 0.3:
            return "negative"

        # Cautionary if it's the dominant signal or mixed with positive
        if cautionary_ratio > 0.4 or (cautionary_ratio > 0.25 and positive_ratio > 0.25):
            return "cautionary"

        # Positive if it's clearly dominant
        if positive_ratio > 0.35:
            return "positive"

        return "neutral"

    def _calculate_overall_agreement(
        self, pairwise_scores: Dict[Tuple[str, str], float]
    ) -> float:
        """Calculate overall agreement from pairwise similarity scores.

        Args:
            pairwise_scores: Dictionary of pairwise similarity scores

        Returns:
            Overall agreement score (0-1)
        """
        if not pairwise_scores:
            return 0.0

        # Average all pairwise scores
        return sum(pairwise_scores.values()) / len(pairwise_scores)

    def _determine_consensus_level(
        self,
        overall_agreement: float,
        stance_alignment: Dict[str, str]
    ) -> str:
        """Determine the level of consensus based on agreement scores and stance alignment.

        Args:
            overall_agreement: Overall agreement score (0-1)
            stance_alignment: Dictionary of provider stances

        Returns:
            Consensus level: "strong", "moderate", "mixed", or "divided"
        """
        # Count stance distribution
        stance_counts = Counter(stance_alignment.values())
        most_common_stance, most_common_count = stance_counts.most_common(1)[0]
        total_providers = len(stance_alignment)
        stance_consensus = most_common_count / total_providers

        # Strong consensus: high text similarity AND most providers agree on stance
        if overall_agreement >= 0.7 and stance_consensus >= 0.75:
            return "strong"

        # Moderate consensus: decent similarity OR majority stance agreement
        if overall_agreement >= 0.5 or stance_consensus >= 0.6:
            return "moderate"

        # Mixed: some agreement but not strong
        if overall_agreement >= 0.3 or stance_consensus >= 0.5:
            return "mixed"

        # Divided: low agreement
        return "divided"

    def _generate_summary(
        self,
        responses: List[LLMResponse],
        stance_alignment: Dict[str, str],
        overall_agreement: float
    ) -> str:
        """Generate a human-readable summary of agreement.

        Args:
            responses: List of successful responses
            stance_alignment: Dictionary of provider stances
            overall_agreement: Overall agreement score

        Returns:
            Summary string describing the agreement pattern
        """
        total_count = len(responses)

        # Group by stance
        stance_counts = Counter(stance_alignment.values())

        # Find the most common stance
        if not stance_counts:
            return f"Analyzed {total_count} response(s) with no clear stance"

        most_common_stance, most_common_count = stance_counts.most_common(1)[0]

        # Build summary based on patterns
        if most_common_count == total_count:
            # All agree on stance
            return (
                f"All {total_count} models show {most_common_stance} stance "
                f"({overall_agreement:.0%} content similarity)"
            )
        elif most_common_count >= total_count * 0.75:
            # Strong majority
            agreeing_providers = [
                name for name, stance in stance_alignment.items()
                if stance == most_common_stance
            ]
            return (
                f"{most_common_count}/{total_count} models show {most_common_stance} stance "
                f"({', '.join(agreeing_providers[:3])}{'...' if len(agreeing_providers) > 3 else ''})"
            )
        elif most_common_count >= total_count * 0.5:
            # Moderate majority
            stance_summary = ", ".join(
                f"{count} {stance}" for stance, count in stance_counts.most_common()
            )
            return f"Mixed stances: {stance_summary} ({overall_agreement:.0%} content similarity)"
        else:
            # Divided
            stance_summary = ", ".join(
                f"{count} {stance}" for stance, count in stance_counts.most_common()
            )
            return f"Divided responses: {stance_summary}"

    def get_agreements_by_stance(
        self, metrics: AgreementMetrics
    ) -> Dict[str, List[str]]:
        """Group providers by their detected stance.

        Args:
            metrics: AgreementMetrics object from analyze()

        Returns:
            Dictionary mapping stance to list of provider names
        """
        stance_groups: Dict[str, List[str]] = {}

        for provider, stance in metrics.stance_alignment.items():
            if stance not in stance_groups:
                stance_groups[stance] = []
            stance_groups[stance].append(provider)

        return stance_groups

    def get_highest_agreement_pair(
        self, metrics: AgreementMetrics
    ) -> Optional[Tuple[Tuple[str, str], float]]:
        """Find the pair of providers with the highest agreement.

        Args:
            metrics: AgreementMetrics object from analyze()

        Returns:
            Tuple of ((provider1, provider2), score) or None if no pairs
        """
        if not metrics.pairwise_scores:
            return None

        max_pair = max(
            metrics.pairwise_scores.items(),
            key=lambda x: x[1]
        )

        return max_pair

    def get_lowest_agreement_pair(
        self, metrics: AgreementMetrics
    ) -> Optional[Tuple[Tuple[str, str], float]]:
        """Find the pair of providers with the lowest agreement.

        Args:
            metrics: AgreementMetrics object from analyze()

        Returns:
            Tuple of ((provider1, provider2), score) or None if no pairs
        """
        if not metrics.pairwise_scores:
            return None

        min_pair = min(
            metrics.pairwise_scores.items(),
            key=lambda x: x[1]
        )

        return min_pair

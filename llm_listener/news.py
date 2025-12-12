"""Health news search via SERPAPI Google News with credibility scoring."""

import httpx
from dataclasses import dataclass
from typing import List, Dict, Any


@dataclass
class NewsArticle:
    """Represents a health news article with credibility assessment."""
    title: str
    url: str
    snippet: str
    source: str
    published_date: str
    credibility_score: float
    credibility_tier: str
    credibility_reason: str


class HealthNewsSearcher:
    """Search Google News for health topics with credibility assessment."""

    # Multi-tier credibility scoring based on source domain
    TIER_1_DOMAINS = [
        "nih.gov", "cdc.gov", "fda.gov", "who.int",
        "nejm.org", "jamanetwork.com", "bmj.com", "thelancet.com",
        "mayoclinic.org", "hopkinsmedicine.org", "clevelandclinic.org",
    ]

    TIER_2_DOMAINS = [
        "statnews.com", "medscape.com", "medicalnewstoday.com",
        "scientificamerican.com", "sciencedaily.com", "nature.com",
        "heart.org", "cancer.org", "diabetes.org",
        "reuters.com", "apnews.com",
    ]

    # Health sections of major newspapers
    TIER_2_PATHS = [
        ("nytimes.com", "/health"),
        ("washingtonpost.com", "/health"),
        ("theguardian.com", "/science"),
    ]

    # Known unreliable sources - blocklist
    BLOCKLIST = [
        "naturalnews.com",
        "mercola.com",
        "infowars.com",
    ]

    def __init__(self, api_key: str):
        """Initialize with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    async def search(
        self,
        query: str,
        max_results: int = 20,
        days_back: int = 30
    ) -> Dict[str, Any]:
        """Search health news with credibility scoring.

        Args:
            query: Health topic to search
            max_results: Maximum number of results
            days_back: How many days back to search (for metadata)

        Returns:
            Dictionary with count, digest, links, by_credibility_tier, metadata
        """
        articles = []
        seen_urls = set()

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                params = {
                    "api_key": self.api_key,
                    "engine": "google_news",
                    "q": f"{query} health",
                    "gl": "us",
                    "hl": "en",
                }

                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                for result in data.get("news_results", [])[:max_results]:
                    url = result.get("link", "")
                    if not url or url in seen_urls:
                        continue
                    seen_urls.add(url)

                    # Assess credibility
                    cred = self._score_source(url)
                    if cred["tier"] == "blocked":
                        continue

                    title = result.get("title", "")
                    snippet = result.get("snippet", "")

                    # Check for red flags in content
                    red_flags = self._detect_red_flags(title, snippet)
                    if red_flags:
                        cred["score"] = max(1.0, cred["score"] - 2.0)
                        cred["reason"] += f" (Warning: {', '.join(red_flags)})"

                    articles.append(NewsArticle(
                        title=title,
                        url=url,
                        snippet=snippet,
                        source=result.get("source", {}).get("name", "Unknown"),
                        published_date=result.get("date", ""),
                        credibility_score=cred["score"],
                        credibility_tier=cred["tier"],
                        credibility_reason=cred["reason"],
                    ))

            # Sort by credibility score (descending), then by date
            articles.sort(
                key=lambda x: (x.credibility_score, x.published_date),
                reverse=True
            )

            # Categorize by tier
            by_tier = {
                "highly_credible": [],
                "credible": [],
                "general": [],
            }
            for a in articles:
                tier_key = a.credibility_tier if a.credibility_tier in by_tier else "general"
                by_tier[tier_key].append(a.__dict__)

            return {
                "count": len(articles),
                "digest": self._create_digest(articles[:5]),
                "links": [a.__dict__ for a in articles],
                "by_credibility_tier": by_tier,
                "source_types": self._categorize_sources(articles),
                "metadata": {
                    "search_period_days": days_back,
                    "avg_credibility_score": (
                        sum(a.credibility_score for a in articles) / len(articles)
                        if articles else 0
                    ),
                    "highly_credible_count": len(by_tier["highly_credible"]),
                    "credible_count": len(by_tier["credible"]),
                }
            }

        except Exception as e:
            return {
                "count": 0,
                "digest": f"Error searching news: {str(e)}",
                "links": [],
                "by_credibility_tier": {},
                "source_types": {},
                "metadata": {"error": str(e)}
            }

    def _score_source(self, url: str) -> Dict[str, Any]:
        """Score news source credibility based on domain."""
        url_lower = url.lower()

        # Check blocklist first
        if any(blocked in url_lower for blocked in self.BLOCKLIST):
            return {
                "score": 0,
                "tier": "blocked",
                "reason": "Known unreliable source"
            }

        # Check Tier 1 (government/academic medical sources)
        if any(t1 in url_lower for t1 in self.TIER_1_DOMAINS):
            return {
                "score": 9.5,
                "tier": "highly_credible",
                "reason": "Government health agency or peer-reviewed medical journal"
            }

        # Check Tier 2 (established medical news outlets)
        if any(t2 in url_lower for t2 in self.TIER_2_DOMAINS):
            return {
                "score": 7.5,
                "tier": "credible",
                "reason": "Established medical news outlet"
            }

        # Check Tier 2 paths (health sections of major newspapers)
        for domain, path in self.TIER_2_PATHS:
            if domain in url_lower and path in url_lower:
                return {
                    "score": 7.0,
                    "tier": "credible",
                    "reason": "Health section of major news outlet"
                }

        # Default: general news
        return {
            "score": 5.0,
            "tier": "general",
            "reason": "General news source - verify with primary sources"
        }

    def _detect_red_flags(self, title: str, snippet: str) -> List[str]:
        """Detect red flags indicating potential misinformation."""
        red_flags = []
        combined = f"{title} {snippet}".lower()

        # Sensationalism indicators
        sensational_phrases = [
            "miracle cure",
            "doctors hate",
            "they don't want you to know",
            "secret cure",
            "shocking discovery",
            "big pharma",
            "one weird trick",
        ]
        for phrase in sensational_phrases:
            if phrase in combined:
                red_flags.append(f"sensationalized: '{phrase}'")
                break  # Only flag once

        # Absolutist claims
        absolutist_phrases = [
            "100% effective",
            "proven to cure",
            "guaranteed cure",
            "never fails",
            "instant cure",
        ]
        for phrase in absolutist_phrases:
            if phrase in combined:
                red_flags.append(f"absolutist claim")
                break

        return red_flags

    def _create_digest(self, articles: List[NewsArticle]) -> str:
        """Create a brief digest from top articles."""
        if not articles:
            return "No recent health news found for this topic."

        snippets = []
        for a in articles[:3]:
            snippets.append(f"{a.source}: {a.title}")

        return " | ".join(snippets)

    def _categorize_sources(self, articles: List[NewsArticle]) -> Dict[str, int]:
        """Categorize articles by source name."""
        counts = {}
        for a in articles:
            source = a.source or "Unknown"
            counts[source] = counts.get(source, 0) + 1
        return counts

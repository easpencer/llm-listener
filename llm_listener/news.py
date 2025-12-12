"""Health and wellness news search via SERPAPI Google News with credibility scoring."""

import httpx
from dataclasses import dataclass
from typing import List, Dict, Any


@dataclass
class NewsArticle:
    """Represents a health/wellness news article with credibility assessment."""
    title: str
    url: str
    snippet: str
    source: str
    published_date: str
    credibility_score: float
    credibility_tier: str
    credibility_reason: str
    topic_category: str  # clinical, wellness, nutrition, research, policy


class HealthNewsSearcher:
    """Search Google News for health and wellness topics with credibility assessment."""

    # Multi-tier credibility scoring based on source domain
    TIER_1_DOMAINS = [
        # Government health agencies
        "nih.gov", "cdc.gov", "fda.gov", "who.int", "hhs.gov",
        "health.gov", "cancer.gov", "nhlbi.nih.gov", "nimh.nih.gov",
        # Peer-reviewed medical journals
        "nejm.org", "jamanetwork.com", "bmj.com", "thelancet.com",
        "nature.com/nm", "cell.com", "pnas.org", "annals.org",
        # Major medical centers
        "mayoclinic.org", "hopkinsmedicine.org", "clevelandclinic.org",
        "health.harvard.edu", "stanfordmedicine.org", "ucsfhealth.org",
    ]

    TIER_2_DOMAINS = [
        # Medical/health news outlets
        "statnews.com", "medscape.com", "medicalnewstoday.com",
        "healthline.com", "webmd.com", "verywellhealth.com",
        # Science publications
        "scientificamerican.com", "sciencedaily.com", "nature.com",
        "newscientist.com", "livescience.com", "sciencenews.org",
        # Health organizations
        "heart.org", "cancer.org", "diabetes.org", "lung.org",
        "aap.org", "acog.org", "apa.org",
        # Major wire services (high editorial standards)
        "reuters.com", "apnews.com",
        # Wellness/nutrition with editorial standards
        "nutrition.org", "eatright.org",
    ]

    # Health/science sections of major newspapers
    TIER_2_PATHS = [
        ("nytimes.com", "/health"),
        ("nytimes.com", "/well"),
        ("nytimes.com", "/science"),
        ("washingtonpost.com", "/health"),
        ("washingtonpost.com", "/wellness"),
        ("theguardian.com", "/science"),
        ("theguardian.com", "/lifeandstyle/health-and-wellbeing"),
        ("bbc.com", "/health"),
        ("bbc.com", "/science"),
        ("cnn.com", "/health"),
        ("npr.org", "/health"),
        ("latimes.com", "/science"),
    ]

    # Known unreliable sources - blocklist
    BLOCKLIST = [
        "naturalnews.com",
        "mercola.com",
        "infowars.com",
        "greenmedinfo.com",
        "healthimpactnews.com",
        "collective-evolution.com",
        "davidwolfe.com",
        "realfarmacy.com",
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
                # Don't append "health" - let the query speak for itself
                params = {
                    "api_key": self.api_key,
                    "engine": "google_news",
                    "q": query,
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

                    # Categorize the topic
                    topic_cat = self._categorize_topic(title, snippet)

                    articles.append(NewsArticle(
                        title=title,
                        url=url,
                        snippet=snippet,
                        source=result.get("source", {}).get("name", "Unknown"),
                        published_date=result.get("date", ""),
                        credibility_score=cred["score"],
                        credibility_tier=cred["tier"],
                        credibility_reason=cred["reason"],
                        topic_category=topic_cat,
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

            # Also categorize by topic
            by_topic = {}
            for a in articles:
                topic = getattr(a, 'topic_category', 'general')
                if topic not in by_topic:
                    by_topic[topic] = []
                by_topic[topic].append(a.__dict__)

            return {
                "count": len(articles),
                "digest": self._create_digest(articles[:5]),
                "links": [a.__dict__ for a in articles],
                "by_credibility_tier": by_tier,
                "by_topic": by_topic,
                "source_types": self._categorize_sources(articles),
                "metadata": {
                    "search_period_days": days_back,
                    "avg_credibility_score": (
                        sum(a.credibility_score for a in articles) / len(articles)
                        if articles else 0
                    ),
                    "highly_credible_count": len(by_tier["highly_credible"]),
                    "credible_count": len(by_tier["credible"]),
                    "topics_found": list(by_topic.keys()),
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
            "miracle cure", "miracle treatment",
            "doctors hate", "doctors don't want",
            "they don't want you to know", "what they're hiding",
            "secret cure", "hidden cure", "suppressed cure",
            "shocking discovery", "shocking truth",
            "big pharma", "medical establishment",
            "one weird trick", "simple trick",
            "breakthrough they", "cure they don't",
        ]
        for phrase in sensational_phrases:
            if phrase in combined:
                red_flags.append("sensationalized content")
                break

        # Absolutist claims
        absolutist_phrases = [
            "100% effective", "100% cure",
            "proven to cure", "guaranteed cure", "guaranteed to work",
            "never fails", "always works",
            "instant cure", "immediate results",
            "cures all", "treats everything",
            "no side effects",
        ]
        for phrase in absolutist_phrases:
            if phrase in combined:
                red_flags.append("absolutist claim")
                break

        # Anti-science indicators
        antiscience_phrases = [
            "vaccines cause", "vaccine injury",
            "natural immunity only",
            "detox your", "toxins cause",
            "alkaline cure", "ph balance cure",
            "5g cause", "emf cause",
        ]
        for phrase in antiscience_phrases:
            if phrase in combined:
                red_flags.append("anti-science content")
                break

        return red_flags

    def _categorize_topic(self, title: str, snippet: str) -> str:
        """Categorize the news article by health topic."""
        combined = f"{title} {snippet}".lower()

        # Category keywords
        categories = {
            "clinical": [
                "clinical trial", "fda", "drug", "treatment", "therapy",
                "surgery", "procedure", "diagnosis", "hospital", "patient",
                "disease", "condition", "symptom", "medication", "prescription",
            ],
            "research": [
                "study", "research", "scientists", "researchers", "findings",
                "published", "journal", "discovery", "experiment", "data",
                "evidence", "trial results",
            ],
            "wellness": [
                "wellness", "mental health", "stress", "anxiety", "depression",
                "sleep", "mindfulness", "meditation", "self-care", "lifestyle",
                "fitness", "exercise", "workout", "yoga",
            ],
            "nutrition": [
                "nutrition", "diet", "food", "eating", "supplement", "vitamin",
                "protein", "carb", "fat", "calorie", "obesity", "weight",
                "meal", "recipe", "nutrient",
            ],
            "policy": [
                "policy", "regulation", "law", "mandate", "government",
                "congress", "legislation", "insurance", "medicare", "medicaid",
                "public health", "healthcare system", "reform",
            ],
        }

        category_scores = {cat: 0 for cat in categories}
        for category, keywords in categories.items():
            for kw in keywords:
                if kw in combined:
                    category_scores[category] += 1

        # Return dominant category or "general"
        max_score = max(category_scores.values())
        if max_score > 0:
            return max(category_scores, key=category_scores.get)
        return "general"

    def _create_digest(self, articles: List[NewsArticle]) -> str:
        """Create a meaningful digest summarizing the news landscape."""
        if not articles:
            return "No recent health news found for this topic."

        # Count credible sources and categories
        highly_credible = sum(1 for a in articles if a.credibility_tier == "highly_credible")
        credible = sum(1 for a in articles if a.credibility_tier == "credible")
        categories = {}
        for a in articles:
            cat = getattr(a, 'topic_category', 'general')
            categories[cat] = categories.get(cat, 0) + 1

        parts = []

        # Lead with credibility info
        if highly_credible > 0:
            parts.append(f"{highly_credible} from authoritative sources")
        if credible > 0:
            parts.append(f"{credible} from credible outlets")

        # Mention topic categories
        if categories:
            top_cats = sorted(categories.items(), key=lambda x: x[1], reverse=True)[:2]
            cat_str = ", ".join(cat for cat, _ in top_cats if cat != "general")
            if cat_str:
                parts.append(f"Topics: {cat_str}")

        # Include top headline
        if articles:
            top_article = articles[0]
            headline = top_article.title
            if len(headline) > 80:
                headline = headline[:77] + "..."
            parts.append(f"Top: {top_article.source} - {headline}")

        if parts:
            return " | ".join(parts)

        # Fallback
        return " | ".join(f"{a.source}: {a.title[:50]}..." for a in articles[:3])

    def _categorize_sources(self, articles: List[NewsArticle]) -> Dict[str, int]:
        """Categorize articles by source name."""
        counts = {}
        for a in articles:
            source = a.source or "Unknown"
            counts[source] = counts.get(source, 0) + 1
        return counts

"""Reference and educational content search via SERPAPI.

This module searches for foundational, explanatory content that helps users
understand topics - distinct from guidelines (prescriptive), research (primary
evidence), or news (current events).

The goal is to answer "What is this thing?" before users dive into
"What should I do about it?" or "What does research say?"
"""

import httpx
from dataclasses import dataclass
from typing import List, Dict, Any, Optional


@dataclass
class ReferenceSource:
    """Represents a reference/educational source with quality assessment."""
    title: str
    url: str
    snippet: str
    source_name: str
    source_type: str  # encyclopedia, medical_reference, educational, textbook, drug_info
    quality_tier: str  # authoritative, trusted, general
    content_type: str  # overview, explanation, definition, tutorial


class ReferenceSearcher:
    """Search for reference and educational content with quality scoring."""

    # Authoritative reference sources (highest trust)
    AUTHORITATIVE_SOURCES = {
        # NIH/Government educational resources
        "medlineplus.gov": ("MedlinePlus (NIH)", "medical_reference", "authoritative"),
        "ncbi.nlm.nih.gov/books": ("NCBI Bookshelf", "textbook", "authoritative"),
        "cancer.gov/publications/dictionaries": ("NCI Dictionary", "medical_reference", "authoritative"),
        "ghr.nlm.nih.gov": ("MedlinePlus Genetics", "medical_reference", "authoritative"),
        "niddk.nih.gov": ("NIDDK (NIH)", "medical_reference", "authoritative"),

        # Medical textbooks and references (free access)
        "statpearls.com": ("StatPearls", "textbook", "authoritative"),
        "merckmanuals.com": ("Merck Manual", "medical_reference", "authoritative"),

        # Encyclopedias
        "britannica.com": ("Encyclopedia Britannica", "encyclopedia", "authoritative"),
        "wikipedia.org": ("Wikipedia", "encyclopedia", "trusted"),  # trusted, not authoritative
    }

    # Trusted educational sources
    TRUSTED_SOURCES = {
        # Educational platforms
        "khanacademy.org": ("Khan Academy", "educational", "trusted"),
        "openstax.org": ("OpenStax", "textbook", "trusted"),
        "coursera.org": ("Coursera", "educational", "trusted"),

        # Drug information
        "drugs.com": ("Drugs.com", "drug_info", "trusted"),
        "rxlist.com": ("RxList", "drug_info", "trusted"),
        "drugbank.com": ("DrugBank", "drug_info", "trusted"),

        # Health education sites
        "healthline.com": ("Healthline", "medical_reference", "trusted"),
        "webmd.com": ("WebMD", "medical_reference", "trusted"),
        "verywellhealth.com": ("Verywell Health", "medical_reference", "trusted"),

        # Science education
        "sciencedirect.com/topics": ("ScienceDirect Topics", "encyclopedia", "trusted"),
        "nature.com/subjects": ("Nature Subjects", "encyclopedia", "trusted"),
    }

    # All reference sites for site-restricted search
    REFERENCE_SITES = [
        # Authoritative
        "medlineplus.gov",
        "ncbi.nlm.nih.gov/books",
        "statpearls.com",
        "merckmanuals.com",
        "britannica.com",
        "wikipedia.org",

        # Trusted educational
        "khanacademy.org",
        "drugs.com",
        "rxlist.com",
        "healthline.com",
        "webmd.com",
    ]

    def __init__(self, api_key: str):
        """Initialize with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    def _classify_source(self, url: str) -> Dict[str, str]:
        """Classify a source by URL."""
        url_lower = url.lower()

        # Check authoritative sources
        for domain, (name, source_type, quality) in self.AUTHORITATIVE_SOURCES.items():
            if domain in url_lower:
                return {
                    "source_name": name,
                    "source_type": source_type,
                    "quality_tier": quality,
                }

        # Check trusted sources
        for domain, (name, source_type, quality) in self.TRUSTED_SOURCES.items():
            if domain in url_lower:
                return {
                    "source_name": name,
                    "source_type": source_type,
                    "quality_tier": quality,
                }

        # Check for .edu domains
        if ".edu" in url_lower:
            return {
                "source_name": "Educational Institution",
                "source_type": "educational",
                "quality_tier": "trusted",
            }

        return {
            "source_name": "General",
            "source_type": "general",
            "quality_tier": "general",
        }

    def _detect_content_type(self, title: str, snippet: str, url: str) -> str:
        """Detect what type of content this is."""
        text = f"{title} {snippet} {url}".lower()

        if any(w in text for w in ["definition", "what is", "meaning of", "defined as"]):
            return "definition"
        elif any(w in text for w in ["overview", "introduction", "basics", "101", "guide to"]):
            return "overview"
        elif any(w in text for w in ["how to", "tutorial", "step by step", "learn"]):
            return "tutorial"
        elif any(w in text for w in ["explained", "understanding", "why", "how does"]):
            return "explanation"
        else:
            return "reference"

    async def search(
        self,
        query: str,
        max_results: int = 15,
    ) -> Dict[str, Any]:
        """Search for reference and educational content.

        Args:
            query: The topic to search for
            max_results: Maximum number of results

        Returns:
            Dictionary with reference sources and metadata
        """
        sources = []
        seen_urls = set()

        # Organize by quality tier
        by_quality = {
            "authoritative": [],
            "trusted": [],
            "general": [],
        }

        # Organize by source type
        by_type = {
            "encyclopedia": [],
            "medical_reference": [],
            "textbook": [],
            "educational": [],
            "drug_info": [],
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Strategy 1: Site-restricted search for known reference sites
                site_restriction = " OR ".join([f"site:{site}" for site in self.REFERENCE_SITES])
                restricted_query = f"{query} ({site_restriction})"

                params = {
                    "api_key": self.api_key,
                    "engine": "google",
                    "q": restricted_query,
                    "num": max_results,
                }

                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                # Process organic results
                for result in data.get("organic_results", []):
                    url = result.get("link", "")
                    title = result.get("title", "")
                    snippet = result.get("snippet", "")

                    if not url or not title or url in seen_urls:
                        continue
                    seen_urls.add(url)

                    # Classify the source
                    classification = self._classify_source(url)
                    content_type = self._detect_content_type(title, snippet, url)

                    source_data = {
                        "title": title,
                        "url": url,
                        "snippet": snippet,
                        "source_name": classification["source_name"],
                        "source_type": classification["source_type"],
                        "quality_tier": classification["quality_tier"],
                        "content_type": content_type,
                    }

                    sources.append(source_data)

                    # Organize by quality
                    tier = classification["quality_tier"]
                    if tier in by_quality:
                        by_quality[tier].append(source_data)

                    # Organize by type
                    stype = classification["source_type"]
                    if stype in by_type:
                        by_type[stype].append(source_data)

                # Also capture Knowledge Graph if present (great for definitions)
                knowledge_graph = data.get("knowledge_graph", {})
                kg_data = None
                if knowledge_graph:
                    kg_data = {
                        "title": knowledge_graph.get("title", ""),
                        "type": knowledge_graph.get("type", ""),
                        "description": knowledge_graph.get("description", ""),
                        "source": knowledge_graph.get("source", {}).get("name", ""),
                        "source_url": knowledge_graph.get("source", {}).get("link", ""),
                        "attributes": knowledge_graph.get("attributes", {}),
                    }

                # Sort sources: authoritative first, then trusted, then general
                sorted_sources = (
                    by_quality["authoritative"] +
                    by_quality["trusted"] +
                    by_quality["general"]
                )

                # Generate digest
                auth_count = len(by_quality["authoritative"])
                trusted_count = len(by_quality["trusted"])

                digest_parts = []
                if auth_count > 0:
                    digest_parts.append(f"{auth_count} authoritative")
                if trusted_count > 0:
                    digest_parts.append(f"{trusted_count} trusted")

                digest = f"Found {len(sources)} reference sources"
                if digest_parts:
                    digest += f" ({', '.join(digest_parts)})"

                # Count by source type for display
                source_type_counts = {}
                for stype, items in by_type.items():
                    if items:
                        # Convert internal type to display name
                        display_names = {
                            "encyclopedia": "Encyclopedias",
                            "medical_reference": "Medical References",
                            "textbook": "Textbooks",
                            "educational": "Educational",
                            "drug_info": "Drug Information",
                        }
                        source_type_counts[display_names.get(stype, stype)] = len(items)

                return {
                    "count": len(sorted_sources),
                    "digest": digest,
                    "links": sorted_sources,
                    "knowledge_graph": kg_data,
                    "by_quality_tier": {k: v for k, v in by_quality.items() if v},
                    "by_source_type": {k: v for k, v in by_type.items() if v},
                    "source_types": source_type_counts,
                    "metadata": {
                        "query": query,
                        "authoritative_count": auth_count,
                        "trusted_count": trusted_count,
                        "has_knowledge_graph": kg_data is not None,
                    },
                }

        except Exception as e:
            return {
                "count": 0,
                "digest": f"Error searching references: {str(e)}",
                "links": [],
                "knowledge_graph": None,
                "by_quality_tier": {},
                "by_source_type": {},
                "source_types": {},
                "metadata": {
                    "query": query,
                    "error": str(e),
                },
            }

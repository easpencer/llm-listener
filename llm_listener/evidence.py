"""Evidence search service using SERPAPI for health research."""

import httpx
from dataclasses import dataclass, field
from typing import Optional, List, Dict, Any
from .core.config import Settings


@dataclass
class SearchMetadata:
    """Metadata about a search operation."""
    total_available: Optional[int] = None  # Total results reported by search engine
    examined: int = 0  # How many results we looked at
    included: int = 0  # How many passed quality filters
    excluded: int = 0  # How many were filtered out
    exclusion_reasons: Dict[str, int] = field(default_factory=dict)  # Reason -> count


@dataclass
class QualityFilters:
    """Configurable quality filters for search results."""
    min_citations: int = 0  # Minimum citation count for scholarly articles
    exclude_no_snippet: bool = True  # Exclude results with no description
    max_results: int = 50  # Maximum results to examine (can be > 30)


class EvidenceSearcher:
    """Search for evidence using SERPAPI."""

    # Government and medical organizations to search
    GOVERNMENT_SITES = [
        "cdc.gov",
        "who.int",
        "fda.gov",
        "nih.gov",
        "heart.org",  # American Heart Association
        "cancer.org",  # American Cancer Society
        "acog.org",   # American College of Obstetricians and Gynecologists
        "aap.org",    # American Academy of Pediatrics
        "ada.org",    # American Diabetes Association
    ]

    # Default quality thresholds
    DEFAULT_MIN_CITATIONS = 5  # Papers with fewer citations are flagged as lower quality

    def __init__(self, api_key: str, filters: Optional[QualityFilters] = None):
        """Initialize with SERPAPI key and optional quality filters."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"
        self.filters = filters or QualityFilters()

    async def search_government_guidelines(self, query: str, max_results: int = 50) -> Dict[str, Any]:
        """Search government and medical organization sites for guidelines.

        Args:
            query: The health question to search for
            max_results: Maximum number of results to examine (uses pagination)

        Returns:
            Dictionary with count, digest, links, metadata, and excluded results
        """
        # Create site-restricted search query
        site_restriction = " OR ".join([f"site:{site}" for site in self.GOVERNMENT_SITES])
        full_query = f"{query} ({site_restriction})"

        links = []
        excluded = []
        snippets = []
        seen_urls = set()
        metadata = SearchMetadata()

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Paginate to get more results (SERPAPI returns max 10 per page)
                for start in range(0, max_results, 10):
                    params = {
                        "api_key": self.api_key,
                        "engine": "google",
                        "q": full_query,
                        "num": 10,
                        "start": start,
                    }

                    response = await client.get(self.base_url, params=params)
                    response.raise_for_status()
                    data = response.json()

                    # Capture total available from first page
                    if start == 0:
                        search_info = data.get("search_information", {})
                        metadata.total_available = search_info.get("total_results")

                    results = data.get("organic_results", [])

                    # If no more results, stop paginating
                    if not results:
                        break

                    for result in results:
                        metadata.examined += 1
                        title = result.get("title", "")
                        link = result.get("link", "")
                        snippet = result.get("snippet", "")

                        # Quality checks
                        exclusion_reason = None
                        if not link or not title:
                            exclusion_reason = "missing_data"
                        elif link in seen_urls:
                            exclusion_reason = "duplicate"
                        elif self.filters.exclude_no_snippet and not snippet:
                            exclusion_reason = "no_description"

                        if exclusion_reason:
                            metadata.excluded += 1
                            metadata.exclusion_reasons[exclusion_reason] = \
                                metadata.exclusion_reasons.get(exclusion_reason, 0) + 1
                            if link and title and exclusion_reason != "duplicate":
                                excluded.append({
                                    "title": title,
                                    "url": link,
                                    "snippet": snippet,
                                    "exclusion_reason": exclusion_reason,
                                })
                            continue

                        seen_urls.add(link)
                        metadata.included += 1
                        links.append({
                            "title": title,
                            "url": link,
                            "snippet": snippet,
                        })
                        snippets.append(f"{title}: {snippet}")

                    # If we got fewer than 10, there are no more pages
                    if len(results) < 10:
                        break

                # Create digest from top snippets
                digest = self._create_digest(snippets[:5], "official guidelines")

                return {
                    "count": len(links),
                    "digest": digest,
                    "links": links,
                    "source_types": self._categorize_sources(links),
                    "metadata": {
                        "total_available": metadata.total_available,
                        "examined": metadata.examined,
                        "included": metadata.included,
                        "excluded": metadata.excluded,
                        "exclusion_reasons": metadata.exclusion_reasons,
                    },
                    "excluded_results": excluded[:10],  # Return first 10 excluded for transparency
                }

        except Exception as e:
            return {
                "count": len(links) if links else 0,
                "digest": f"Error searching guidelines: {str(e)}" if not links else self._create_digest(snippets[:5], "official guidelines"),
                "links": links,
                "source_types": self._categorize_sources(links) if links else {},
                "metadata": {
                    "total_available": metadata.total_available,
                    "examined": metadata.examined,
                    "included": metadata.included,
                    "excluded": metadata.excluded,
                    "exclusion_reasons": metadata.exclusion_reasons,
                    "error": str(e),
                },
                "excluded_results": excluded[:10],
            }

    async def search_scholarly_literature(self, query: str, max_results: int = 50) -> Dict[str, Any]:
        """Search Google Scholar for peer-reviewed articles.

        Args:
            query: The health question to search for
            max_results: Maximum number of results to examine (uses pagination)

        Returns:
            Dictionary with count, digest, links, metadata, and quality-filtered results
        """
        links = []
        low_quality = []  # Papers that don't meet citation threshold
        excluded = []
        snippets = []
        seen_urls = set()
        metadata = SearchMetadata()

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Paginate to get more results (SERPAPI returns max 10 per page)
                for start in range(0, max_results, 10):
                    params = {
                        "api_key": self.api_key,
                        "engine": "google_scholar",
                        "q": query,
                        "num": 10,
                        "start": start,
                    }

                    response = await client.get(self.base_url, params=params)
                    response.raise_for_status()
                    data = response.json()

                    # Capture total available from first page
                    if start == 0:
                        search_info = data.get("search_information", {})
                        metadata.total_available = search_info.get("total_results")

                    results = data.get("organic_results", [])

                    # If no more results, stop paginating
                    if not results:
                        break

                    for result in results:
                        metadata.examined += 1
                        title = result.get("title", "")
                        link = result.get("link", "")
                        snippet = result.get("snippet", "")
                        publication_info = result.get("publication_info", {})
                        cited_by = result.get("inline_links", {}).get("cited_by", {}).get("total", 0)

                        # Build article data
                        article_data = {
                            "title": title,
                            "url": link,
                            "snippet": snippet,
                            "publication_info": publication_info.get("summary", ""),
                            "cited_by": cited_by,
                        }

                        # Quality checks
                        exclusion_reason = None
                        if not link or not title:
                            exclusion_reason = "missing_data"
                        elif link in seen_urls:
                            exclusion_reason = "duplicate"
                        elif self.filters.exclude_no_snippet and not snippet:
                            exclusion_reason = "no_abstract"

                        if exclusion_reason:
                            metadata.excluded += 1
                            metadata.exclusion_reasons[exclusion_reason] = \
                                metadata.exclusion_reasons.get(exclusion_reason, 0) + 1
                            if link and title and exclusion_reason != "duplicate":
                                article_data["exclusion_reason"] = exclusion_reason
                                excluded.append(article_data)
                            continue

                        seen_urls.add(link)

                        # Check citation threshold for quality filtering
                        if cited_by < self.DEFAULT_MIN_CITATIONS:
                            article_data["quality_flag"] = "low_citations"
                            low_quality.append(article_data)
                            metadata.exclusion_reasons["low_citations"] = \
                                metadata.exclusion_reasons.get("low_citations", 0) + 1
                        else:
                            metadata.included += 1
                            links.append(article_data)
                            snippets.append(f"{title}: {snippet}")

                    # If we got fewer than 10, there are no more pages
                    if len(results) < 10:
                        break

                # Create digest from top snippets
                digest = self._create_digest(snippets[:5], "scientific literature")

                # Sort by citations for ranking
                sorted_links = sorted(links, key=lambda x: x.get("cited_by", 0), reverse=True)

                return {
                    "count": len(links),
                    "digest": digest,
                    "links": sorted_links,
                    "top_cited": sorted_links[:5],
                    "metadata": {
                        "total_available": metadata.total_available,
                        "examined": metadata.examined,
                        "included": metadata.included,
                        "excluded": metadata.excluded + len(low_quality),
                        "exclusion_reasons": metadata.exclusion_reasons,
                        "quality_threshold": {
                            "min_citations": self.DEFAULT_MIN_CITATIONS,
                            "description": f"Papers with fewer than {self.DEFAULT_MIN_CITATIONS} citations are flagged as lower quality",
                        },
                    },
                    "low_quality_results": low_quality[:15],  # Papers below citation threshold
                    "excluded_results": excluded[:10],  # Other excluded results
                }

        except Exception as e:
            return {
                "count": len(links) if links else 0,
                "digest": f"Error searching literature: {str(e)}" if not links else self._create_digest(snippets[:5], "scientific literature"),
                "links": links,
                "top_cited": sorted(links, key=lambda x: x.get("cited_by", 0), reverse=True)[:5] if links else [],
                "metadata": {
                    "total_available": metadata.total_available,
                    "examined": metadata.examined,
                    "included": metadata.included,
                    "excluded": metadata.excluded + len(low_quality),
                    "exclusion_reasons": metadata.exclusion_reasons,
                    "error": str(e),
                },
                "low_quality_results": low_quality[:15],
                "excluded_results": excluded[:10],
            }

    def _create_digest(self, snippets: List[str], source_type: str) -> str:
        """Create a detailed digest from snippets."""
        if not snippets:
            return f"No {source_type} found for this query."

        # Combine all snippets - no truncation for full detail
        combined = " | ".join(snippets)
        return combined

    def _categorize_sources(self, links: List[Dict]) -> Dict[str, int]:
        """Categorize sources by organization type."""
        categories = {
            "CDC": 0,
            "WHO": 0,
            "FDA": 0,
            "NIH": 0,
            "Medical Societies": 0,
        }

        for link in links:
            url = link.get("url", "").lower()
            if "cdc.gov" in url:
                categories["CDC"] += 1
            elif "who.int" in url:
                categories["WHO"] += 1
            elif "fda.gov" in url:
                categories["FDA"] += 1
            elif "nih.gov" in url:
                categories["NIH"] += 1
            else:
                categories["Medical Societies"] += 1

        # Remove zero counts
        return {k: v for k, v in categories.items() if v > 0}

    async def search_all(self, query: str) -> Dict[str, Any]:
        """Search both guidelines and literature.

        Args:
            query: The health question to search for

        Returns:
            Dictionary with both guideline and literature results
        """
        # Run searches in parallel
        import asyncio

        guidelines_task = self.search_government_guidelines(query)
        literature_task = self.search_scholarly_literature(query)

        guidelines, literature = await asyncio.gather(
            guidelines_task, literature_task, return_exceptions=True
        )

        # Handle exceptions
        if isinstance(guidelines, Exception):
            guidelines = {
                "count": 0,
                "digest": f"Error: {str(guidelines)}",
                "links": [],
                "source_types": {},
            }

        if isinstance(literature, Exception):
            literature = {
                "count": 0,
                "digest": f"Error: {str(literature)}",
                "links": [],
                "top_cited": [],
            }

        return {
            "guidelines": guidelines,
            "literature": literature,
        }

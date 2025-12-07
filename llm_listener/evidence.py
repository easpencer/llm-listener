"""Evidence search service using SERPAPI for health research."""

import httpx
from typing import Optional, List, Dict, Any
from .core.config import Settings


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

    def __init__(self, api_key: str):
        """Initialize with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    async def search_government_guidelines(self, query: str, max_results: int = 30) -> Dict[str, Any]:
        """Search government and medical organization sites for guidelines.

        Args:
            query: The health question to search for
            max_results: Maximum number of results to fetch (uses pagination)

        Returns:
            Dictionary with count, digest, and links
        """
        # Create site-restricted search query
        site_restriction = " OR ".join([f"site:{site}" for site in self.GOVERNMENT_SITES])
        full_query = f"{query} ({site_restriction})"

        links = []
        snippets = []
        seen_urls = set()

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

                    results = data.get("organic_results", [])

                    # If no more results, stop paginating
                    if not results:
                        break

                    for result in results:
                        title = result.get("title", "")
                        link = result.get("link", "")
                        snippet = result.get("snippet", "")

                        # Deduplicate by URL
                        if link and title and link not in seen_urls:
                            seen_urls.add(link)
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
                }

        except Exception as e:
            return {
                "count": len(links) if links else 0,
                "digest": f"Error searching guidelines: {str(e)}" if not links else self._create_digest(snippets[:5], "official guidelines"),
                "links": links,
                "source_types": self._categorize_sources(links) if links else {},
            }

    async def search_scholarly_literature(self, query: str, max_results: int = 30) -> Dict[str, Any]:
        """Search Google Scholar for peer-reviewed articles.

        Args:
            query: The health question to search for
            max_results: Maximum number of results to fetch (uses pagination)

        Returns:
            Dictionary with count, digest, and links
        """
        links = []
        snippets = []
        seen_urls = set()

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

                    results = data.get("organic_results", [])

                    # If no more results, stop paginating
                    if not results:
                        break

                    for result in results:
                        title = result.get("title", "")
                        link = result.get("link", "")
                        snippet = result.get("snippet", "")
                        publication_info = result.get("publication_info", {})
                        cited_by = result.get("inline_links", {}).get("cited_by", {}).get("total", 0)

                        # Deduplicate by URL
                        if link and title and link not in seen_urls:
                            seen_urls.add(link)
                            links.append({
                                "title": title,
                                "url": link,
                                "snippet": snippet,
                                "publication_info": publication_info.get("summary", ""),
                                "cited_by": cited_by,
                            })
                            snippets.append(f"{title}: {snippet}")

                    # If we got fewer than 10, there are no more pages
                    if len(results) < 10:
                        break

                # Create digest from top snippets
                digest = self._create_digest(snippets[:5], "scientific literature")

                return {
                    "count": len(links),
                    "digest": digest,
                    "links": links,
                    "top_cited": sorted(links, key=lambda x: x.get("cited_by", 0), reverse=True)[:3],
                }

        except Exception as e:
            return {
                "count": len(links) if links else 0,
                "digest": f"Error searching literature: {str(e)}" if not links else self._create_digest(snippets[:5], "scientific literature"),
                "links": links,
                "top_cited": sorted(links, key=lambda x: x.get("cited_by", 0), reverse=True)[:3] if links else [],
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

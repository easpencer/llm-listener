"""Evidence search service using SERPAPI for health research."""

import re
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

    # Sites for official guidelines and recommendations (NOT research papers)
    # Note: Excluding nih.gov from guidelines as it's primarily PubMed (research papers)
    GUIDELINE_SITES = [
        "cdc.gov",
        "who.int",
        "fda.gov",
        "heart.org",       # American Heart Association
        "cancer.org",      # American Cancer Society
        "acog.org",        # American College of Obstetricians and Gynecologists
        "aap.org",         # American Academy of Pediatrics
        "diabetes.org",    # American Diabetes Association (ada.org is dental)
        "mayoclinic.org",  # Mayo Clinic (authoritative clinical information)
    ]

    # URL patterns that indicate research papers (should NOT be in guidelines)
    RESEARCH_URL_PATTERNS = [
        r"pubmed\.ncbi\.nlm\.nih\.gov",
        r"ncbi\.nlm\.nih\.gov/pmc",
        r"ncbi\.nlm\.nih\.gov/pubmed",
        r"/articles/PMC",
        r"/pmc/articles",
        r"doi\.org",
        r"journals\.",
        r"/journal/",
        r"/abstract/",
        r"sciencedirect\.com",
        r"springer\.com",
        r"wiley\.com",
        r"nature\.com/articles",
        r"thelancet\.com",
        r"bmj\.com/content",
        r"jamanetwork\.com",
    ]

    # Keywords that suggest official guidelines/recommendations
    GUIDELINE_KEYWORDS = [
        "guideline",
        "guidelines",
        "recommendation",
        "recommendations",
        "clinical practice",
        "position statement",
        "policy statement",
        "consensus statement",
        "treatment protocol",
        "patient guide",
        "fact sheet",
        "health advisory",
        "immunization schedule",
        "screening recommendation",
    ]

    # Default quality thresholds
    DEFAULT_MIN_CITATIONS = 5  # Papers with fewer citations are flagged as lower quality

    def __init__(self, api_key: str, filters: Optional[QualityFilters] = None):
        """Initialize with SERPAPI key and optional quality filters."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"
        self.filters = filters or QualityFilters()

    def _is_research_paper_url(self, url: str) -> bool:
        """Check if a URL points to a research paper rather than official guidance."""
        url_lower = url.lower()
        for pattern in self.RESEARCH_URL_PATTERNS:
            if re.search(pattern, url_lower):
                return True
        return False

    def _has_guideline_keywords(self, title: str, snippet: str) -> bool:
        """Check if title or snippet contains keywords suggesting official guidelines."""
        combined = f"{title} {snippet}".lower()
        return any(kw in combined for kw in self.GUIDELINE_KEYWORDS)

    def _classify_source_type(self, url: str, title: str, snippet: str) -> str:
        """Classify a source into a content type category."""
        url_lower = url.lower()

        # Check for research paper indicators first
        if self._is_research_paper_url(url):
            return "research_paper"

        # Check for guideline keywords
        if self._has_guideline_keywords(title, snippet):
            return "official_guideline"

        # Classify by domain
        if "cdc.gov" in url_lower:
            return "cdc_guidance"
        elif "who.int" in url_lower:
            return "who_guidance"
        elif "fda.gov" in url_lower:
            return "fda_guidance"
        elif "heart.org" in url_lower:
            return "aha_guidance"
        elif "cancer.org" in url_lower:
            return "acs_guidance"
        elif "mayoclinic.org" in url_lower:
            return "clinical_information"
        elif any(site in url_lower for site in ["acog.org", "aap.org", "diabetes.org"]):
            return "medical_society_guidance"

        return "health_information"

    async def search_government_guidelines(self, query: str, max_results: int = 50) -> Dict[str, Any]:
        """Search authoritative health organizations for official guidelines.

        This method specifically targets official recommendations and guidelines
        from government health agencies and medical societies. Research papers
        are filtered out and should be retrieved via search_scholarly_literature.

        Args:
            query: The health question to search for
            max_results: Maximum number of results to examine (uses pagination)

        Returns:
            Dictionary with count, digest, links, metadata, and excluded results
        """
        # Create site-restricted search query focused on guidelines
        site_restriction = " OR ".join([f"site:{site}" for site in self.GUIDELINE_SITES])
        # Add guideline-focused terms to improve result quality
        full_query = f"{query} ({site_restriction})"

        links = []
        excluded = []
        reclassified_as_research = []  # Research papers found on guideline sites
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

                        # Basic quality checks
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

                        # Classify the source type
                        source_type = self._classify_source_type(link, title, snippet)

                        # Check if this is actually a research paper
                        if source_type == "research_paper":
                            metadata.excluded += 1
                            metadata.exclusion_reasons["research_paper_on_guideline_site"] = \
                                metadata.exclusion_reasons.get("research_paper_on_guideline_site", 0) + 1
                            reclassified_as_research.append({
                                "title": title,
                                "url": link,
                                "snippet": snippet,
                                "source_type": source_type,
                                "note": "Reclassified as research paper - use scholarly literature search instead",
                            })
                            continue

                        metadata.included += 1

                        # Extract thumbnail/image if available
                        thumbnail = result.get("thumbnail", "")
                        # Also check for rich snippet images
                        if not thumbnail:
                            rich_snippet = result.get("rich_snippet", {})
                            if rich_snippet:
                                thumbnail = rich_snippet.get("top", {}).get("detected_extensions", {}).get("thumbnail", "")

                        links.append({
                            "title": title,
                            "url": link,
                            "snippet": snippet,
                            "source_type": source_type,
                            "thumbnail": thumbnail,
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
                        "note": "Research papers are excluded - use scholarly literature search for peer-reviewed studies",
                    },
                    "excluded_results": excluded[:10],
                    "reclassified_as_research": reclassified_as_research[:10],
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
                "reclassified_as_research": reclassified_as_research[:10] if reclassified_as_research else [],
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

                        # Extract thumbnail if available (some results have them)
                        thumbnail = result.get("thumbnail", "")
                        # Check resources for PDF thumbnails
                        if not thumbnail:
                            resources = result.get("resources", [])
                            for resource in resources:
                                if resource.get("file_format") == "PDF":
                                    thumbnail = resource.get("thumbnail", "")
                                    break

                        # Build article data
                        article_data = {
                            "title": title,
                            "url": link,
                            "snippet": snippet,
                            "publication_info": publication_info.get("summary", ""),
                            "cited_by": cited_by,
                            "thumbnail": thumbnail,
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
            "American Heart Association": 0,
            "American Cancer Society": 0,
            "Mayo Clinic": 0,
            "Medical Societies": 0,
            "Other": 0,
        }

        for link in links:
            url = link.get("url", "").lower()
            if "cdc.gov" in url:
                categories["CDC"] += 1
            elif "who.int" in url:
                categories["WHO"] += 1
            elif "fda.gov" in url:
                categories["FDA"] += 1
            elif "heart.org" in url:
                categories["American Heart Association"] += 1
            elif "cancer.org" in url:
                categories["American Cancer Society"] += 1
            elif "mayoclinic.org" in url:
                categories["Mayo Clinic"] += 1
            elif any(site in url for site in ["acog.org", "aap.org", "diabetes.org"]):
                categories["Medical Societies"] += 1
            else:
                categories["Other"] += 1

        # Remove zero counts
        return {k: v for k, v in categories.items() if v > 0}

    async def search_news(self, query: str, max_results: int = 20) -> Dict[str, Any]:
        """Search health news with credibility scoring.

        Args:
            query: The health question to search for
            max_results: Maximum number of results

        Returns:
            Dictionary with news articles and credibility data
        """
        from .news import HealthNewsSearcher
        news_searcher = HealthNewsSearcher(self.api_key)
        return await news_searcher.search(query, max_results)

    async def search_patents(self, query: str, max_results: int = 15) -> Dict[str, Any]:
        """Search medical patents via Google Patents (SERPAPI).

        Args:
            query: The medical technology to search for
            max_results: Maximum number of results

        Returns:
            Dictionary with patents and clinical relevance data
        """
        from .patents import MedicalPatentSearcher
        patent_searcher = MedicalPatentSearcher(self.api_key)
        return await patent_searcher.search(query, max_results)

    async def search_media(self, query: str, max_images: int = 8, max_videos: int = 4) -> Dict[str, Any]:
        """Search for visual/video references when query is media-related.

        Args:
            query: The media query to search for
            max_images: Maximum number of images
            max_videos: Maximum number of videos

        Returns:
            Dictionary with images, videos, and credibility data
        """
        from .media import MediaSearcher
        media_searcher = MediaSearcher(self.api_key)
        return await media_searcher.search(query, max_images, max_videos)

    async def search_reference(self, query: str, max_results: int = 15) -> Dict[str, Any]:
        """Search for reference and educational content.

        This finds foundational, explanatory content from sources like Wikipedia,
        MedlinePlus, medical textbooks, and educational platforms. Answers
        "What is this?" rather than "What should I do?" or "What does research say?"

        Args:
            query: The topic to search for
            max_results: Maximum number of results

        Returns:
            Dictionary with reference sources and quality assessments
        """
        from .reference import ReferenceSearcher
        reference_searcher = ReferenceSearcher(self.api_key)
        return await reference_searcher.search(query, max_results)

    def _is_media_query(self, query: str) -> bool:
        """Check if the query is asking for visual/video information."""
        from .media import MediaSearcher
        return MediaSearcher.is_media_query(query)

    async def search_all(self, query: str, include_summaries: bool = True) -> Dict[str, Any]:
        """Search all evidence sources including news, patents, reference, and videos.

        Args:
            query: The health question to search for
            include_summaries: Whether to generate LLM prose summaries (default True)

        Returns:
            Dictionary with guidelines, literature, news, patents, reference, and media results
        """
        import asyncio
        from .media import MediaSearcher

        # Run all standard searches in parallel
        # Thumbnails are extracted from each source directly
        # Videos are searched separately from credible medical YouTube channels
        tasks = {
            "guidelines": self.search_government_guidelines(query),
            "literature": self.search_scholarly_literature(query),
            "news": self.search_news(query),
            "patents": self.search_patents(query),
            "reference": self.search_reference(query),
        }

        gathered = await asyncio.gather(
            *tasks.values(), return_exceptions=True
        )

        # Map results and handle exceptions
        results = {}
        for key, result in zip(tasks.keys(), gathered):
            if isinstance(result, Exception):
                results[key] = {
                    "count": 0,
                    "digest": f"Error: {str(result)}",
                    "links": [],
                    "source_types": {},
                }
            else:
                results[key] = result

        # Search for videos from credible medical sources (always, not just for "visual" queries)
        try:
            media_searcher = MediaSearcher(self.api_key)
            videos = await media_searcher.search_videos(query, max_results=6)

            # Only include videos from credible sources
            credible_videos = [v for v in videos if v.get("credibility_tier") in ("medical", "scientific", "educational")]

            if credible_videos:
                results["videos"] = {
                    "count": len(credible_videos),
                    "links": credible_videos,
                    "digest": f"Found {len(credible_videos)} educational videos from credible sources",
                }
        except Exception:
            pass  # Don't fail if video search fails

        # Aggregate all thumbnails from evidence sources into a media summary
        all_thumbnails = []
        for source_type in ["guidelines", "news", "reference", "patents", "literature"]:
            source_data = results.get(source_type, {})
            links = source_data.get("links", [])
            for link in links:
                if link.get("thumbnail"):
                    all_thumbnails.append({
                        "thumbnail": link["thumbnail"],
                        "title": link.get("title", ""),
                        "url": link.get("url", ""),
                        "source_type": source_type,
                        "source_name": link.get("source", link.get("source_name", "")),
                    })

        # Also check knowledge graph for reference
        kg = results.get("reference", {}).get("knowledge_graph")
        if kg and kg.get("image"):
            all_thumbnails.insert(0, {
                "thumbnail": kg["image"],
                "title": kg.get("title", ""),
                "url": kg.get("source_url", ""),
                "source_type": "knowledge_graph",
                "source_name": kg.get("source", "Wikipedia"),
            })

        if all_thumbnails:
            results["aggregated_media"] = {
                "count": len(all_thumbnails),
                "thumbnails": all_thumbnails,
                "videos": results.get("videos", {}).get("links", []),
            }

        # Generate LLM prose summaries if requested
        if include_summaries:
            try:
                settings = Settings.from_env()
                if settings.anthropic_api_key:
                    from .evidence_summarizer import EvidenceSummarizer
                    summarizer = EvidenceSummarizer(settings.anthropic_api_key)
                    summaries = await summarizer.summarize_all(results, query)

                    # Add summaries to each result
                    for key in results:
                        if key in summaries:
                            results[key]["llm_summary"] = summaries[key]
            except Exception as e:
                # Log but don't fail if summarization fails
                import logging
                logger = logging.getLogger(__name__)
                logger.warning(f"Evidence summarization failed: {str(e)}")

        return results

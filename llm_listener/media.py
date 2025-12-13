"""Media search via SERPAPI for visual/video references with source credibility."""

import re
import asyncio
import httpx
from dataclasses import dataclass
from typing import List, Dict, Any, Optional


@dataclass
class MediaResult:
    """Represents a media search result with source credibility."""
    title: str
    url: str
    thumbnail: str
    source: str
    source_url: str
    media_type: str  # image, video
    credibility_tier: str  # medical, scientific, educational, general


class MediaSearcher:
    """Search for visual and video references with credibility scoring."""

    # Media query detection patterns
    VISUAL_PATTERNS = [
        r"\bwhat does .* look like\b",
        r"\bshow me\b",
        r"\bimage of\b",
        r"\bpicture of\b",
        r"\bphoto of\b",
        r"\bappearance of\b",
        r"\bdiagram of\b",
        r"\bchart of\b",
        r"\bgraph of\b",
        r"\bvisuali[sz]e\b",
        r"\bx[- ]?ray\b",
        r"\bmri\b",
        r"\bct scan\b",
        r"\bultrasound\b",
        r"\brash\b",
        r"\bskin\b.*\blook\b",
        r"\bsymptoms\b.*\blook\b",
        r"\banatomy\b",
        r"\bstructure of\b",
    ]

    VIDEO_PATTERNS = [
        r"\bvideo\b",
        r"\bwatch\b",
        r"\bhow to\b",
        r"\btutorial\b",
        r"\bdemonstrat",
        r"\bexercise\b",
        r"\bworkout\b",
        r"\bprocedure\b",
        r"\btechnique\b",
        r"\bsurgery\b",
        r"\boperation\b",
    ]

    # Highly credible media sources (medical/scientific)
    MEDICAL_SOURCES = [
        "nih.gov", "cdc.gov", "who.int", "mayoclinic.org",
        "clevelandclinic.org", "hopkinsmedicine.org", "health.harvard.edu",
        "webmd.com", "medlineplus.gov", "cancer.gov", "nhlbi.nih.gov",
        "dermnetnz.org",  # Excellent dermatology images
        "radiopaedia.org",  # Medical imaging
        "pathologyoutlines.com",  # Pathology images
    ]

    # Scientific/educational sources
    SCIENTIFIC_SOURCES = [
        "nature.com", "sciencedirect.com", "springer.com",
        "wiley.com", "pnas.org", "cell.com", "ncbi.nlm.nih.gov",
        "sciencemag.org", "aaas.org",
        "khanacademy.org", "britannica.com",
        ".edu",  # Educational institutions
    ]

    # Credible YouTube channels for health/science
    CREDIBLE_YOUTUBE_CHANNELS = [
        "mayo clinic",
        "cleveland clinic",
        "johns hopkins",
        "harvard health",
        "nih",
        "cdc",
        "khan academy",
        "crashcourse",
        "ted-ed",
        "nature video",
        "new england journal",
        "jama network",
        "osmosis",
        "medcram",
        "nucleus medical media",
        "armando hasudungan",
    ]

    # Stock photo/video sites (lower credibility for medical queries)
    STOCK_SITES = [
        "shutterstock.com", "gettyimages.com", "istockphoto.com",
        "alamy.com", "dreamstime.com", "123rf.com", "adobe.com",
        "depositphotos.com", "unsplash.com", "pexels.com",
    ]

    def __init__(self, api_key: str):
        """Initialize with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    @classmethod
    def is_media_query(cls, query: str) -> bool:
        """Detect if a query is asking for visual/video information."""
        query_lower = query.lower()
        for pattern in cls.VISUAL_PATTERNS + cls.VIDEO_PATTERNS:
            if re.search(pattern, query_lower):
                return True
        return False

    @classmethod
    def is_video_query(cls, query: str) -> bool:
        """Detect if a query specifically wants video content."""
        query_lower = query.lower()
        for pattern in cls.VIDEO_PATTERNS:
            if re.search(pattern, query_lower):
                return True
        return False

    def _classify_source(self, url: str, source_name: str) -> str:
        """Classify source credibility tier."""
        url_lower = url.lower()
        source_lower = source_name.lower()

        # Check medical sources
        for domain in self.MEDICAL_SOURCES:
            if domain in url_lower:
                return "medical"

        # Check scientific sources
        for domain in self.SCIENTIFIC_SOURCES:
            if domain in url_lower:
                return "scientific"

        # Check if .edu domain
        if ".edu" in url_lower:
            return "educational"

        # Check YouTube channel credibility
        if "youtube.com" in url_lower or "youtu.be" in url_lower:
            for channel in self.CREDIBLE_YOUTUBE_CHANNELS:
                if channel in source_lower:
                    return "educational"

        # Downrank stock media
        for domain in self.STOCK_SITES:
            if domain in url_lower:
                return "stock"

        return "general"

    async def search_images(
        self,
        query: str,
        max_results: int = 8,
        safe_search: bool = True
    ) -> List[Dict[str, Any]]:
        """Search for images with credibility scoring."""
        images = []

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Add medical/health context to improve results
                enhanced_query = f"{query} medical scientific diagram"

                params = {
                    "api_key": self.api_key,
                    "engine": "google_images",
                    "q": enhanced_query,
                    "num": max_results * 2,  # Fetch extra to filter
                    "safe": "active" if safe_search else "off",
                    "ijn": "0",
                }

                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                results = data.get("images_results", [])

                seen_urls = set()
                for result in results:
                    original_url = result.get("original", "")
                    thumbnail = result.get("thumbnail", "")
                    source_url = result.get("link", "")
                    source_name = result.get("source", "")
                    title = result.get("title", "")

                    # Skip if missing essential data
                    if not thumbnail or not source_url:
                        continue

                    # Skip duplicates
                    if original_url in seen_urls:
                        continue
                    seen_urls.add(original_url)

                    # Classify source credibility
                    credibility_tier = self._classify_source(source_url, source_name)

                    # Skip stock photos for medical queries
                    if credibility_tier == "stock":
                        continue

                    images.append({
                        "title": title,
                        "url": original_url,
                        "thumbnail": thumbnail,
                        "source": source_name,
                        "source_url": source_url,
                        "media_type": "image",
                        "credibility_tier": credibility_tier,
                    })

                    if len(images) >= max_results:
                        break

        except Exception:
            pass  # Return what we have

        return images

    async def search_videos(
        self,
        query: str,
        max_results: int = 6,
    ) -> List[Dict[str, Any]]:
        """Search for videos (primarily YouTube) with credibility scoring."""
        videos = []

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Add health/medical context
                enhanced_query = f"{query} medical health educational"

                params = {
                    "api_key": self.api_key,
                    "engine": "youtube",
                    "search_query": enhanced_query,
                }

                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                results = data.get("video_results", [])

                seen_urls = set()
                for result in results:
                    video_url = result.get("link", "")
                    thumbnail = result.get("thumbnail", {})
                    if isinstance(thumbnail, dict):
                        thumbnail = thumbnail.get("static", "") or thumbnail.get("rich", "")
                    channel_info = result.get("channel", {})
                    channel_name = channel_info.get("name", "") if isinstance(channel_info, dict) else ""
                    title = result.get("title", "")
                    length_info = result.get("length", {})
                    duration = length_info.get("simple_text", "") if isinstance(length_info, dict) else ""
                    views_info = result.get("views", {})
                    views = views_info.get("simple_text", "") if isinstance(views_info, dict) else ""

                    # Skip if missing essential data
                    if not video_url or not title:
                        continue

                    # Skip duplicates
                    if video_url in seen_urls:
                        continue
                    seen_urls.add(video_url)

                    # Classify source credibility
                    credibility_tier = self._classify_source(video_url, channel_name)

                    videos.append({
                        "title": title,
                        "url": video_url,
                        "thumbnail": thumbnail,
                        "source": channel_name,
                        "source_url": video_url,
                        "media_type": "video",
                        "duration": duration,
                        "views": views,
                        "credibility_tier": credibility_tier,
                    })

                    if len(videos) >= max_results:
                        break

        except Exception:
            pass  # Return what we have

        return videos

    async def search(
        self,
        query: str,
        max_images: int = 8,
        max_videos: int = 4,
    ) -> Dict[str, Any]:
        """Search for both images and videos with credibility scoring.

        Args:
            query: The media query to search
            max_images: Maximum images to return
            max_videos: Maximum videos to return

        Returns:
            Dictionary with images, videos, and metadata
        """
        # Determine if we should search for videos
        include_videos = self.is_video_query(query)

        # Run searches in parallel
        tasks = [self.search_images(query, max_images)]
        if include_videos:
            tasks.append(self.search_videos(query, max_videos))

        results = await asyncio.gather(*tasks, return_exceptions=True)

        images = results[0] if not isinstance(results[0], Exception) else []
        videos = results[1] if len(results) > 1 and not isinstance(results[1], Exception) else []

        # Organize by credibility
        by_credibility = {
            "medical": [],
            "scientific": [],
            "educational": [],
            "general": [],
        }

        all_media = images + videos
        for item in all_media:
            tier = item.get("credibility_tier", "general")
            if tier in by_credibility:
                by_credibility[tier].append(item)

        # Sort to prioritize credible sources
        sorted_media = (
            by_credibility["medical"] +
            by_credibility["scientific"] +
            by_credibility["educational"] +
            by_credibility["general"]
        )

        # Generate digest
        medical_count = len(by_credibility["medical"])
        scientific_count = len(by_credibility["scientific"])
        educational_count = len(by_credibility["educational"])

        digest_parts = []
        if images:
            digest_parts.append(f"{len(images)} images")
        if videos:
            digest_parts.append(f"{len(videos)} videos")

        digest = f"Found {' and '.join(digest_parts)}" if digest_parts else "No media found"

        credible_count = medical_count + scientific_count + educational_count
        if credible_count > 0:
            digest += f" ({credible_count} from credible sources)"

        return {
            "count": len(sorted_media),
            "digest": digest,
            "links": sorted_media,
            "images": images,
            "videos": videos,
            "by_credibility_tier": {
                k: v for k, v in by_credibility.items() if v
            },
            "source_types": {
                "Medical": medical_count,
                "Scientific": scientific_count,
                "Educational": educational_count,
                "General": len(by_credibility["general"]),
            },
            "metadata": {
                "query": query,
                "is_media_query": True,
                "has_images": len(images) > 0,
                "has_videos": len(videos) > 0,
                "medical_source_count": medical_count,
                "credible_source_count": credible_count,
            },
        }


# Backwards compatibility alias
VisualSearcher = MediaSearcher

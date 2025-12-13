"""Extract meaningful images from source pages."""

import asyncio
import httpx
from urllib.parse import urljoin, urlparse
from typing import List, Dict, Any, Optional
from bs4 import BeautifulSoup
import re


class ImageExtractor:
    """Extract and filter meaningful images from web pages."""

    # Minimum dimensions to filter out icons/logos (pixels)
    MIN_WIDTH = 150
    MIN_HEIGHT = 100

    # Patterns for URLs/filenames to skip (logos, icons, tracking, etc.)
    SKIP_PATTERNS = [
        r'logo',
        r'icon',
        r'favicon',
        r'sprite',
        r'button',
        r'arrow',
        r'nav[-_]',
        r'menu[-_]',
        r'social[-_]',
        r'facebook',
        r'twitter',
        r'linkedin',
        r'instagram',
        r'pinterest',
        r'youtube[-_]logo',
        r'tracking',
        r'pixel',
        r'spacer',
        r'blank',
        r'transparent',
        r'placeholder',
        r'avatar',
        r'badge',
        r'banner[-_]ad',
        r'advertisement',
        r'sponsored',
        r'1x1',
        r'loading',
        r'spinner',
        r'share[-_]',
        r'print[-_]',
        r'email[-_]',
        r'rss[-_]',
        r'search[-_]icon',
        r'close[-_]',
        r'hamburger',
        r'caret',
        r'chevron',
        r'dropdown',
    ]

    # File extensions we want
    VALID_EXTENSIONS = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'}

    # Skip images from these domains (ad networks, trackers)
    SKIP_DOMAINS = [
        'doubleclick.net',
        'googlesyndication.com',
        'googleadservices.com',
        'facebook.com/tr',
        'analytics',
        'pixel',
        'track',
        'beacon',
        'ad.',
        'ads.',
    ]

    def __init__(self, timeout: float = 10.0, max_images_per_page: int = 10):
        """Initialize extractor.

        Args:
            timeout: HTTP request timeout in seconds
            max_images_per_page: Maximum images to extract per page
        """
        self.timeout = timeout
        self.max_images_per_page = max_images_per_page
        self._skip_pattern = re.compile('|'.join(self.SKIP_PATTERNS), re.IGNORECASE)

    def _should_skip_url(self, url: str) -> bool:
        """Check if URL should be skipped based on patterns."""
        url_lower = url.lower()

        # Check skip patterns
        if self._skip_pattern.search(url_lower):
            return True

        # Check skip domains
        for domain in self.SKIP_DOMAINS:
            if domain in url_lower:
                return True

        return False

    def _get_extension(self, url: str) -> str:
        """Get file extension from URL."""
        parsed = urlparse(url)
        path = parsed.path.lower()
        for ext in self.VALID_EXTENSIONS:
            if path.endswith(ext):
                return ext
        return ''

    def _is_valid_extension(self, url: str) -> bool:
        """Check if URL has a valid image extension."""
        ext = self._get_extension(url)
        # Also allow URLs without extensions (many CDNs don't use them)
        return ext in self.VALID_EXTENSIONS or ext == ''

    def _parse_dimensions(self, img_tag) -> tuple:
        """Try to get image dimensions from tag attributes."""
        width = None
        height = None

        # Try explicit width/height attributes
        if img_tag.get('width'):
            try:
                width = int(re.sub(r'[^\d]', '', str(img_tag['width'])))
            except (ValueError, TypeError):
                pass

        if img_tag.get('height'):
            try:
                height = int(re.sub(r'[^\d]', '', str(img_tag['height'])))
            except (ValueError, TypeError):
                pass

        # Try style attribute
        style = img_tag.get('style', '')
        if not width:
            w_match = re.search(r'width:\s*(\d+)', style)
            if w_match:
                width = int(w_match.group(1))
        if not height:
            h_match = re.search(r'height:\s*(\d+)', style)
            if h_match:
                height = int(h_match.group(1))

        return width, height

    def _extract_images_from_html(self, html: str, base_url: str) -> List[Dict[str, Any]]:
        """Extract images from HTML content."""
        soup = BeautifulSoup(html, 'html.parser')
        images = []
        seen_urls = set()

        # Find all img tags
        for img in soup.find_all('img'):
            # Get image URL (try src, data-src, data-lazy-src)
            src = img.get('src') or img.get('data-src') or img.get('data-lazy-src') or img.get('data-original')
            if not src:
                continue

            # Skip data URIs that are tiny (likely placeholders)
            if src.startswith('data:'):
                continue

            # Make absolute URL
            img_url = urljoin(base_url, src)

            # Skip if we've seen this URL
            if img_url in seen_urls:
                continue
            seen_urls.add(img_url)

            # Skip based on URL patterns
            if self._should_skip_url(img_url):
                continue

            # Check extension
            if not self._is_valid_extension(img_url):
                continue

            # Get dimensions if available
            width, height = self._parse_dimensions(img)

            # Skip small images if dimensions are known
            if width and width < self.MIN_WIDTH:
                continue
            if height and height < self.MIN_HEIGHT:
                continue

            # Get alt text for context
            alt = img.get('alt', '').strip()
            title = img.get('title', '').strip()

            # Skip images with alt text indicating they're decorative
            alt_lower = alt.lower()
            if alt_lower in ('', 'image', 'photo', 'picture', 'icon', 'logo'):
                # Only skip if no meaningful alt AND small or unknown size
                if not title and (not width or width < 200):
                    continue

            # Check if image is inside a figure with caption
            figure = img.find_parent('figure')
            caption = ''
            if figure:
                figcaption = figure.find('figcaption')
                if figcaption:
                    caption = figcaption.get_text(strip=True)

            images.append({
                'url': img_url,
                'alt': alt,
                'title': title or alt,
                'caption': caption,
                'width': width,
                'height': height,
            })

            if len(images) >= self.max_images_per_page:
                break

        return images

    async def extract_from_url(self, url: str) -> List[Dict[str, Any]]:
        """Extract images from a single URL.

        Args:
            url: The page URL to extract images from

        Returns:
            List of image dictionaries with url, alt, title, caption
        """
        try:
            async with httpx.AsyncClient(
                timeout=self.timeout,
                follow_redirects=True,
                headers={
                    'User-Agent': 'Mozilla/5.0 (compatible; ChorusBot/1.0; Health Information Service)'
                }
            ) as client:
                response = await client.get(url)
                response.raise_for_status()

                # Only process HTML
                content_type = response.headers.get('content-type', '')
                if 'text/html' not in content_type:
                    return []

                html = response.text
                return self._extract_images_from_html(html, url)

        except Exception:
            return []

    async def extract_from_sources(
        self,
        sources: List[Dict[str, Any]],
        max_sources: int = 5,
        max_total_images: int = 20
    ) -> List[Dict[str, Any]]:
        """Extract images from multiple source URLs.

        Args:
            sources: List of source dicts with 'url' and 'title' keys
            max_sources: Maximum number of sources to fetch
            max_total_images: Maximum total images to return

        Returns:
            List of images with source attribution
        """
        # Take top sources
        sources_to_fetch = sources[:max_sources]

        # Fetch all pages in parallel
        tasks = [self.extract_from_url(s.get('url', '')) for s in sources_to_fetch]
        results = await asyncio.gather(*tasks, return_exceptions=True)

        all_images = []
        seen_urls = set()

        for source, page_images in zip(sources_to_fetch, results):
            if isinstance(page_images, Exception) or not page_images:
                continue

            source_url = source.get('url', '')
            source_title = source.get('title', '')
            source_name = source.get('source', source.get('source_name', ''))

            # Extract domain for attribution
            if not source_name:
                try:
                    parsed = urlparse(source_url)
                    source_name = parsed.netloc.replace('www.', '')
                except:
                    source_name = 'Unknown'

            for img in page_images:
                img_url = img.get('url', '')
                if img_url in seen_urls:
                    continue
                seen_urls.add(img_url)

                all_images.append({
                    'url': img_url,
                    'thumbnail': img_url,  # Use full image as thumbnail for now
                    'alt': img.get('alt', ''),
                    'title': img.get('title') or img.get('caption') or source_title,
                    'caption': img.get('caption', ''),
                    'source_url': source_url,
                    'source_name': source_name,
                    'source_title': source_title,
                    'width': img.get('width'),
                    'height': img.get('height'),
                })

                if len(all_images) >= max_total_images:
                    break

            if len(all_images) >= max_total_images:
                break

        return all_images

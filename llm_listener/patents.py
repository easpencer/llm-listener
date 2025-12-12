"""Medical patent search via SERPAPI Google Patents API."""

import httpx
from dataclasses import dataclass
from typing import List, Dict, Any
from datetime import datetime


@dataclass
class MedicalPatent:
    """Represents a medical patent with simplified information."""
    patent_number: str
    title: str
    abstract: str
    simplified_summary: str
    date_published: str
    inventors: List[str]
    assignee: str
    status: str
    status_description: str
    clinical_relevance: str
    url: str


class MedicalPatentSearcher:
    """Search Google Patents via SERPAPI for medical patents."""

    def __init__(self, api_key: str):
        """Initialize patent searcher with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    async def search(
        self,
        query: str,
        max_results: int = 15,
    ) -> Dict[str, Any]:
        """Search medical patents with simplified summaries.

        Args:
            query: Medical technology to search
            max_results: Maximum results to return

        Returns:
            Dictionary with count, digest, links, source_types, metadata
        """
        patents = []

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Use SERPAPI Google Patents engine
                # Note: num must be 10-100 for Google Patents API
                params = {
                    "api_key": self.api_key,
                    "engine": "google_patents",
                    "q": f"{query} medical health",
                    "num": max(10, min(max_results, 100)),  # Must be 10-100
                    "status": "GRANT",  # Only granted patents
                }

                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()

                for p in data.get("organic_results", []):
                    patent_id = p.get("patent_id", "")
                    title = p.get("title", "")
                    snippet = p.get("snippet", "") or ""

                    # Extract dates - prefer grant_date, fall back to publication_date
                    date_pub = p.get("grant_date") or p.get("publication_date") or ""

                    # Get inventor(s)
                    inventor = p.get("inventor", "")
                    inventors = [inventor] if inventor else []

                    # Get assignee
                    assignee = p.get("assignee", "") or "Individual Inventor"

                    # Get URL
                    url = p.get("patent_link", "") or f"https://patents.google.com/patent/{patent_id}"

                    # Assess patent status and clinical relevance
                    status_info = self._assess_status(date_pub, snippet)

                    # Simplify snippet for user-friendly display
                    simplified = self._simplify_abstract(snippet)

                    patents.append(MedicalPatent(
                        patent_number=patent_id,
                        title=title,
                        abstract=snippet,
                        simplified_summary=simplified,
                        date_published=date_pub,
                        inventors=inventors,
                        assignee=assignee,
                        status=status_info["status"],
                        status_description=status_info["description"],
                        clinical_relevance=status_info["relevance"],
                        url=url,
                    ))

            # Categorize by clinical relevance
            by_relevance = {"high": [], "moderate": [], "early-stage": []}
            for p in patents:
                rel_key = p.clinical_relevance if p.clinical_relevance in by_relevance else "early-stage"
                by_relevance[rel_key].append(p.__dict__)

            return {
                "count": len(patents),
                "digest": self._create_digest(patents[:3]),
                "links": [p.__dict__ for p in patents],
                "by_clinical_relevance": by_relevance,
                "source_types": {"Google Patents": len(patents)},
                "metadata": {
                    "avg_age_years": self._calculate_avg_age(patents),
                    "high_relevance_count": len(by_relevance["high"]),
                    "recent_patents": sum(1 for p in patents if p.status == "recent"),
                }
            }

        except Exception as e:
            return {
                "count": 0,
                "digest": f"Error searching patents: {str(e)}",
                "links": [],
                "by_clinical_relevance": {},
                "source_types": {},
                "metadata": {"error": str(e)}
            }

    def _simplify_abstract(self, abstract: str) -> str:
        """Convert patent legal language to user-friendly summary."""
        if not abstract:
            return "No description available."

        # Replace common patent boilerplate
        simplified = abstract
        replacements = [
            ("The present invention relates to", "This patent describes"),
            ("The present invention provides", "This patent provides"),
            ("A method comprising", "A method that includes"),
            ("An apparatus comprising", "A device that includes"),
            ("wherein", "where"),
            ("thereof", "of it"),
            ("therein", "in it"),
            ("heretofore", "previously"),
        ]
        for old, new in replacements:
            simplified = simplified.replace(old, new)

        # Take first 2-3 sentences
        sentences = simplified.split(". ")
        result = ". ".join(sentences[:2])

        # Truncate if still too long
        if len(result) > 350:
            result = result[:347] + "..."

        return result

    def _assess_status(self, date_pub: str, abstract: str) -> Dict[str, str]:
        """Assess patent status and clinical relevance.

        Returns:
            Dictionary with status, description, and relevance
        """
        # Calculate patent age
        age_years = 5.0  # Default
        try:
            if date_pub:
                # Handle various date formats from Google Patents
                for fmt in ["%Y-%m-%d", "%b %d, %Y", "%Y"]:
                    try:
                        pub_date = datetime.strptime(date_pub, fmt)
                        age_years = (datetime.now() - pub_date).days / 365.25
                        break
                    except ValueError:
                        continue
        except (ValueError, TypeError):
            pass

        # Determine status based on age
        if age_years < 2:
            status = "recent"
            description = "Recently Granted"
        elif age_years < 5:
            status = "active"
            description = "Active Patent"
        elif age_years < 15:
            status = "mature"
            description = "Established Patent"
        else:
            status = "aging"
            description = "Aging Patent (may be expiring)"

        # Assess clinical relevance via keyword analysis
        clinical_keywords = [
            "clinical trial",
            "patient",
            "treatment",
            "therapy",
            "therapeutic",
            "diagnostic",
            "fda",
            "efficacy",
            "safety",
            "disease",
            "disorder",
        ]
        abstract_lower = (abstract or "").lower()
        clinical_count = sum(1 for kw in clinical_keywords if kw in abstract_lower)

        if clinical_count >= 4:
            relevance = "high"
        elif clinical_count >= 2:
            relevance = "moderate"
        else:
            relevance = "early-stage"

        return {
            "status": status,
            "description": description,
            "relevance": relevance,
        }

    def _calculate_avg_age(self, patents: List[MedicalPatent]) -> float:
        """Calculate average age of patents in years."""
        if not patents:
            return 0.0

        total_age = 0.0
        valid_count = 0

        for p in patents:
            try:
                if p.date_published:
                    for fmt in ["%Y-%m-%d", "%b %d, %Y", "%Y"]:
                        try:
                            pub_date = datetime.strptime(p.date_published, fmt)
                            age = (datetime.now() - pub_date).days / 365.25
                            total_age += age
                            valid_count += 1
                            break
                        except ValueError:
                            continue
            except (ValueError, TypeError):
                continue

        return total_age / valid_count if valid_count > 0 else 0.0

    def _create_digest(self, patents: List[MedicalPatent]) -> str:
        """Create a brief digest from top patents."""
        if not patents:
            return "No relevant medical patents found for this topic."

        snippets = []
        for p in patents:
            # Extract year from various date formats
            year = "N/A"
            if p.date_published:
                try:
                    year = p.date_published[:4]
                except:
                    year = p.date_published
            snippets.append(f"{p.title} ({year})")

        return " | ".join(snippets)

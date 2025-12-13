"""Health and life sciences patent search via SERPAPI Google Patents API."""

import re
import httpx
from dataclasses import dataclass
from typing import List, Dict, Any
from datetime import datetime


@dataclass
class HealthPatent:
    """Represents a health/life sciences patent with simplified information."""
    patent_number: str
    title: str
    abstract: str
    simplified_summary: str
    date_published: str
    inventors: List[str]
    assignee: str
    status: str
    status_description: str
    relevance_tier: str  # high, moderate, early-stage
    relevance_reason: str
    category: str  # clinical, wellness, biotech, device, nutrition, environmental
    url: str
    thumbnail: str = ""  # Patent figure/diagram thumbnail if available


# Keep old name as alias for backwards compatibility
MedicalPatent = HealthPatent


class PatentSearcher:
    """Search Google Patents via SERPAPI for relevant patents."""

    def __init__(self, api_key: str):
        """Initialize patent searcher with SERPAPI key."""
        self.api_key = api_key
        self.base_url = "https://serpapi.com/search"

    async def search(
        self,
        query: str,
        max_results: int = 15,
    ) -> Dict[str, Any]:
        """Search patents with simplified summaries.

        Args:
            query: Topic or technology to search
            max_results: Maximum results to return

        Returns:
            Dictionary with count, digest, links, source_types, metadata
        """
        patents = []

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                # Use SERPAPI Google Patents engine
                # Note: num must be 10-100 for Google Patents API
                # Don't append terms - let the query speak for itself
                params = {
                    "api_key": self.api_key,
                    "engine": "google_patents",
                    "q": query,
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
                    status_info = self._assess_status(date_pub, snippet, title)

                    # Simplify snippet for user-friendly display
                    simplified = self._simplify_abstract(snippet)

                    # Extract thumbnail/figure if available
                    thumbnail = p.get("thumbnail", "") or p.get("figure", "")

                    patents.append(HealthPatent(
                        patent_number=patent_id,
                        title=title,
                        abstract=snippet,
                        simplified_summary=simplified,
                        date_published=date_pub,
                        inventors=inventors,
                        assignee=assignee,
                        status=status_info["status"],
                        status_description=status_info["description"],
                        relevance_tier=status_info["relevance"],
                        relevance_reason=status_info["relevance_reason"],
                        category=status_info["category"],
                        url=url,
                        thumbnail=thumbnail,
                    ))

            # Categorize by relevance tier
            by_relevance = {"high": [], "moderate": [], "early-stage": []}
            for p in patents:
                rel_key = p.relevance_tier if p.relevance_tier in by_relevance else "early-stage"
                by_relevance[rel_key].append(p.__dict__)

            # Also categorize by category for richer analysis
            by_category = {}
            for p in patents:
                cat = p.category or "general"
                if cat not in by_category:
                    by_category[cat] = []
                by_category[cat].append(p.__dict__)

            return {
                "count": len(patents),
                "digest": self._create_digest(patents[:5]),
                "links": [p.__dict__ for p in patents],
                "by_clinical_relevance": by_relevance,  # Keep for backwards compatibility
                "by_relevance_tier": by_relevance,
                "by_category": by_category,
                "source_types": {"Google Patents": len(patents)},
                "metadata": {
                    "avg_age_years": self._calculate_avg_age(patents),
                    "high_relevance_count": len(by_relevance["high"]),
                    "moderate_relevance_count": len(by_relevance["moderate"]),
                    "recent_patents": sum(1 for p in patents if p.status == "recent"),
                    "categories_found": list(by_category.keys()),
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

        # Replace common patent boilerplate phrases (case-insensitive)
        simplified = abstract
        replacements = [
            # Opening boilerplate
            ("The present invention relates to", "This describes"),
            ("The present invention provides", "This provides"),
            ("The present disclosure relates to", "This describes"),
            ("The present disclosure provides", "This provides"),
            ("Disclosed herein", "Described here"),
            ("In accordance with the present invention", ""),
            ("In one embodiment of the present invention", "In one version"),
            ("In some embodiments", "In some versions"),
            ("In certain embodiments", "In certain versions"),
            ("According to an aspect of the invention", ""),
            ("According to the present invention", ""),
            # Legal language simplification
            ("A method comprising", "A method that includes"),
            ("A system comprising", "A system that includes"),
            ("An apparatus comprising", "A device that includes"),
            ("A composition comprising", "A composition that includes"),
            ("A pharmaceutical composition comprising", "A medication containing"),
            ("wherein", "where"),
            ("thereof", "of it"),
            ("therein", "in it"),
            ("thereto", "to it"),
            ("heretofore", "previously"),
            ("hereinafter", "below"),
            ("said", "the"),
            ("at least one", "one or more"),
            ("a plurality of", "multiple"),
            ("one or more embodiments", "versions"),
            ("operatively connected", "connected"),
            ("operatively coupled", "connected"),
            ("in fluid communication with", "connected to"),
            # Medical/technical simplifications
            ("therapeutically effective amount", "effective dose"),
            ("pharmaceutically acceptable", "safe"),
            ("administering to a subject", "giving to a patient"),
            ("in need thereof", "who needs it"),
        ]

        for old, new in replacements:
            # Case-insensitive replacement
            simplified = re.sub(re.escape(old), new, simplified, flags=re.IGNORECASE)

        # Clean up multiple spaces and trim
        simplified = " ".join(simplified.split())

        # Extract the most meaningful sentences (skip sentences that are too generic)
        sentences = [s.strip() for s in simplified.split(". ") if s.strip()]
        meaningful_sentences = []
        skip_phrases = [
            "it is an object",
            "it is another object",
            "this provides",
            "this describes",
            "background",
            "prior art",
            "field of the invention",
        ]

        for sentence in sentences:
            sentence_lower = sentence.lower()
            if not any(phrase in sentence_lower for phrase in skip_phrases):
                if len(sentence) > 30:  # Skip very short sentences
                    meaningful_sentences.append(sentence)
                    if len(meaningful_sentences) >= 2:
                        break

        # Fall back to first sentences if no meaningful ones found
        if not meaningful_sentences:
            meaningful_sentences = sentences[:2]

        result = ". ".join(meaningful_sentences)
        if result and not result.endswith("."):
            result += "."

        # Truncate if still too long, but try to end at a word boundary
        if len(result) > 400:
            result = result[:397]
            # Find last space to avoid cutting mid-word
            last_space = result.rfind(" ")
            if last_space > 300:
                result = result[:last_space]
            result += "..."

        return result

    def _assess_status(self, date_pub: str, abstract: str, title: str = "") -> Dict[str, str]:
        """Assess patent status, relevance tier, and category.

        Returns:
            Dictionary with status, description, relevance, relevance_reason, and category
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

        combined_text = f"{title} {abstract or ''}".lower()

        # Category detection - what area of health/science is this?
        category_keywords = {
            "clinical": [
                "clinical trial", "phase i", "phase ii", "phase iii", "fda", "patient",
                "treatment", "therapy", "therapeutic", "drug", "pharmaceutical", "disease",
                "diagnosis", "medical device", "implant", "surgery", "surgical",
            ],
            "wellness": [
                "wellness", "fitness", "exercise", "sleep", "stress", "relaxation",
                "mental health", "anxiety", "meditation", "mindfulness", "lifestyle",
                "weight management", "obesity", "well-being", "wellbeing",
            ],
            "nutrition": [
                "nutrition", "nutritional", "dietary", "supplement", "vitamin",
                "mineral", "probiotic", "prebiotic", "food", "nutraceutical",
                "functional food", "protein", "amino acid", "antioxidant",
            ],
            "biotech": [
                "gene", "genetic", "genome", "crispr", "rna", "dna", "mrna",
                "cell therapy", "stem cell", "immunotherapy", "antibody", "protein",
                "biotechnology", "biologic", "biosimilar", "recombinant",
            ],
            "device": [
                "device", "sensor", "wearable", "monitor", "monitoring", "apparatus",
                "system for", "machine", "equipment", "instrument", "prosthetic",
            ],
            "environmental": [
                "environmental", "pollution", "air quality", "water quality",
                "toxin", "contamination", "exposure", "occupational health",
            ],
        }

        # Detect category
        category_scores = {cat: 0 for cat in category_keywords}
        for category, keywords in category_keywords.items():
            for kw in keywords:
                if kw in combined_text:
                    category_scores[category] += 1

        # Select dominant category
        max_score = max(category_scores.values())
        if max_score > 0:
            category = max(category_scores, key=category_scores.get)
        else:
            category = "general"

        # Relevance scoring - broader than just clinical
        high_relevance_indicators = {
            # Clinical indicators
            "clinical trial": 3, "phase i": 3, "phase ii": 3, "phase iii": 3,
            "fda approved": 4, "fda clearance": 4,
            "randomized controlled": 4, "double-blind": 3,
            "efficacy data": 3, "clinical efficacy": 3,
            "patient outcome": 3, "clinical outcome": 3,
            # Human study indicators
            "human study": 3, "human subjects": 3, "in humans": 2,
            # Strong wellness/nutrition indicators
            "randomized trial": 3, "placebo-controlled": 3,
            "proven effective": 3, "demonstrated efficacy": 3,
        }

        moderate_relevance_indicators = {
            # Broader health indicators
            "treatment": 1, "treating": 1, "therapy": 1, "therapeutic": 1,
            "patient": 1, "patients": 1, "disease": 1, "disorder": 1,
            "health": 1, "healthy": 1, "wellness": 1,
            "symptom": 1, "prevention": 1, "preventive": 1,
            "diagnosis": 1, "diagnostic": 1,
            "efficacy": 2, "effective": 1, "safety": 1,
            # Nutrition/wellness
            "supplement": 1, "nutritional": 1, "dietary": 1,
            "fitness": 1, "exercise": 1,
            # Biotech
            "gene therapy": 2, "cell therapy": 2, "immunotherapy": 2,
        }

        early_stage_indicators = {
            "in vitro": 0.5, "in vivo": 0.5,
            "cell line": 0.5, "cell culture": 0.5,
            "animal model": 0.5, "mouse model": 0.5,
            "compound": 0.5, "molecule": 0.5,
            "mechanism": 0.5, "pathway": 0.5,
        }

        # Calculate weighted score
        score = 0
        found_indicators = []

        for keyword, weight in high_relevance_indicators.items():
            if keyword in combined_text:
                score += weight
                if weight >= 3:
                    found_indicators.append(keyword)

        for keyword, weight in moderate_relevance_indicators.items():
            if keyword in combined_text:
                score += weight

        for keyword, weight in early_stage_indicators.items():
            if keyword in combined_text:
                score += weight

        # Determine relevance tier and reason
        if score >= 10:
            relevance = "high"
            if found_indicators:
                relevance_reason = f"Contains: {', '.join(found_indicators[:3])}"
            else:
                relevance_reason = "Multiple strong health indicators"
        elif score >= 4:
            relevance = "moderate"
            relevance_reason = f"Health/{category} focus"
        else:
            relevance = "early-stage"
            relevance_reason = "Early research or basic science"

        return {
            "status": status,
            "description": description,
            "relevance": relevance,
            "relevance_reason": relevance_reason,
            "category": category,
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

    def _create_digest(self, patents: List[HealthPatent]) -> str:
        """Create a meaningful digest summarizing the patent landscape."""
        if not patents:
            return "No relevant patents found for this topic."

        # Count by category and relevance
        categories = {}
        high_relevance = 0
        recent = 0
        assignees = set()

        for p in patents:
            cat = getattr(p, 'category', 'general')
            categories[cat] = categories.get(cat, 0) + 1
            if getattr(p, 'relevance_tier', '') == 'high':
                high_relevance += 1
            if getattr(p, 'status', '') == 'recent':
                recent += 1
            if p.assignee and p.assignee != "Individual Inventor":
                assignees.add(p.assignee)

        # Build informative digest
        parts = []

        # Lead with key finding
        if high_relevance > 0:
            parts.append(f"{high_relevance} highly relevant patent(s)")
        if recent > 0:
            parts.append(f"{recent} recently granted")

        # Mention top categories
        if categories:
            top_cats = sorted(categories.items(), key=lambda x: x[1], reverse=True)[:2]
            cat_str = ", ".join(f"{cat}" for cat, _ in top_cats)
            parts.append(f"Focus areas: {cat_str}")

        # Mention notable assignees
        if assignees:
            top_assignees = list(assignees)[:3]
            parts.append(f"From: {', '.join(top_assignees)}")

        if parts:
            return " | ".join(parts)

        # Fallback to titles
        return " | ".join(p.title[:60] + "..." if len(p.title) > 60 else p.title for p in patents[:3])


# Keep old class name as alias for backwards compatibility
MedicalPatentSearcher = PatentSearcher

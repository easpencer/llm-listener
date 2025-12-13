"""LLM-based summarization for evidence sources."""

import asyncio
from typing import Dict, Any, Optional
from anthropic import AsyncAnthropic


class EvidenceSummarizer:
    """Generate prose summaries of evidence using a fast LLM."""

    # Use Haiku for fast, cost-effective summarization
    MODEL = "claude-3-5-haiku-20241022"

    def __init__(self, api_key: str):
        """Initialize with Anthropic API key."""
        self.api_key = api_key
        self.client = AsyncAnthropic(api_key=api_key)

    async def _call_llm(self, prompt: str, max_tokens: int = 300) -> str:
        """Make an LLM call for summarization."""
        try:
            response = await self.client.messages.create(
                model=self.MODEL,
                max_tokens=max_tokens,
                messages=[{"role": "user", "content": prompt}],
            )
            return response.content[0].text if response.content else ""
        except Exception as e:
            return f"Summary unavailable: {str(e)}"

    async def summarize_guidelines(self, guidelines: Dict[str, Any], query: str) -> str:
        """Generate prose summary of government/authority guidelines."""
        links = guidelines.get("links", [])
        if not links:
            return "No authoritative guidelines found for this query."

        # Prepare content for summarization
        content_parts = []
        for link in links[:8]:  # Top 8 sources
            source_type = link.get("source_type", "guideline")
            title = link.get("title", "")
            snippet = link.get("snippet", "")
            content_parts.append(f"[{source_type}] {title}: {snippet}")

        source_types = guidelines.get("source_types", {})
        sources_summary = ", ".join([f"{k}: {v}" for k, v in source_types.items() if v > 0])

        prompt = f"""Summarize these official health guidelines and recommendations in 2-3 sentences of prose. Focus on the key recommendations, any consensus or differences between organizations, and actionable takeaways.

Query: {query}

Sources ({sources_summary}):
{chr(10).join(content_parts)}

Write a concise prose summary (2-3 sentences) that synthesizes the key points from these authoritative sources. Focus on what they recommend and any notable agreements or differences."""

        return await self._call_llm(prompt)

    async def summarize_literature(self, literature: Dict[str, Any], query: str) -> str:
        """Generate prose summary of scientific research findings."""
        links = literature.get("links", [])
        top_cited = literature.get("top_cited", [])

        if not links and not top_cited:
            return "No peer-reviewed research found for this query."

        # Use top-cited papers for summary
        papers = top_cited if top_cited else links[:5]

        content_parts = []
        for paper in papers[:6]:
            title = paper.get("title", "")
            snippet = paper.get("snippet", "")
            cited_by = paper.get("cited_by", 0)
            pub_info = paper.get("publication_info", "")
            content_parts.append(f"[{cited_by} citations] {title} ({pub_info}): {snippet}")

        total = literature.get("count", len(links))

        prompt = f"""Summarize the research landscape from these peer-reviewed papers in 2-3 sentences of prose. Identify the main findings, any emerging consensus, conflicting results, or areas of active investigation.

Query: {query}

Top Research Papers ({total} high-quality papers found):
{chr(10).join(content_parts)}

Write a concise prose summary (2-3 sentences) that synthesizes what the research shows. Note if there's consensus, conflicting findings, or if this is an emerging area of study."""

        return await self._call_llm(prompt)

    async def summarize_news(self, news: Dict[str, Any], query: str) -> str:
        """Generate prose summary of health news coverage."""
        links = news.get("links", [])
        by_credibility = news.get("by_credibility_tier", {})

        if not links:
            return "No recent health news coverage found for this query."

        # Prioritize highly credible sources
        highly_credible = by_credibility.get("highly_credible", [])
        credible = by_credibility.get("credible", [])
        priority_articles = (highly_credible + credible)[:6] if (highly_credible or credible) else links[:6]

        content_parts = []
        for article in priority_articles:
            source = article.get("source", "Unknown")
            title = article.get("title", "")
            snippet = article.get("snippet", "")
            credibility = article.get("credibility_tier", "")
            date = article.get("published_date", "")
            content_parts.append(f"[{source}, {credibility}] {title} ({date}): {snippet}")

        metadata = news.get("metadata", {})
        highly_credible_count = metadata.get("highly_credible_count", 0)

        prompt = f"""Summarize the recent news coverage on this health topic in 2-3 sentences of prose. Focus on the main story angles, any breaking developments, and note the credibility of sources.

Query: {query}

Recent News ({len(links)} articles, {highly_credible_count} from highly credible sources):
{chr(10).join(content_parts)}

Write a concise prose summary (2-3 sentences) that captures the main news narrative. Note if coverage is from reliable sources and any significant developments or concerns being reported."""

        return await self._call_llm(prompt)

    async def summarize_patents(self, patents: Dict[str, Any], query: str) -> str:
        """Generate prose summary of patent landscape."""
        links = patents.get("links", [])
        by_relevance = patents.get("by_relevance_tier", {})

        if not links:
            return "No relevant patents found for this query."

        # Prioritize high-relevance patents
        high_relevance = by_relevance.get("high", [])
        moderate = by_relevance.get("moderate", [])
        priority_patents = (high_relevance + moderate)[:5] if (high_relevance or moderate) else links[:5]

        content_parts = []
        for patent in priority_patents:
            assignee = patent.get("assignee", "Unknown")
            title = patent.get("title", "")
            summary = patent.get("simplified_summary", patent.get("abstract", ""))[:200]
            status = patent.get("status_description", "")
            relevance = patent.get("relevance_tier", "")
            content_parts.append(f"[{assignee}, {status}, {relevance} relevance] {title}: {summary}")

        metadata = patents.get("metadata", {})
        high_count = metadata.get("high_relevance_count", 0)
        categories = metadata.get("categories_found", [])

        prompt = f"""Summarize the patent landscape for this topic in 2-3 sentences of prose. Focus on who is innovating, what approaches are being patented, and the clinical relevance of these innovations.

Query: {query}

Patents ({len(links)} found, {high_count} highly relevant, categories: {', '.join(categories[:3]) if categories else 'various'}):
{chr(10).join(content_parts)}

Write a concise prose summary (2-3 sentences) about the innovation landscape. Note key companies/institutions involved and the types of approaches being developed."""

        return await self._call_llm(prompt)

    async def summarize_reference(self, reference: Dict[str, Any], query: str) -> str:
        """Generate prose summary of reference/educational sources."""
        links = reference.get("links", [])
        knowledge_graph = reference.get("knowledge_graph")
        by_quality = reference.get("by_quality_tier", {})

        if not links and not knowledge_graph:
            return "No reference sources found for this query."

        # Build context from knowledge graph if available
        kg_context = ""
        if knowledge_graph and knowledge_graph.get("description"):
            kg_context = f"Knowledge Graph: {knowledge_graph.get('title', '')}: {knowledge_graph.get('description', '')}\n\n"

        # Prioritize authoritative sources
        authoritative = by_quality.get("authoritative", [])
        trusted = by_quality.get("trusted", [])
        priority_sources = (authoritative + trusted)[:6] if (authoritative or trusted) else links[:6]

        content_parts = []
        for source in priority_sources:
            source_name = source.get("source_name", "Unknown")
            title = source.get("title", "")
            snippet = source.get("snippet", "")[:200]
            quality = source.get("quality_tier", "")
            content_parts.append(f"[{source_name}, {quality}] {title}: {snippet}")

        metadata = reference.get("metadata", {})
        auth_count = metadata.get("authoritative_count", 0)

        prompt = f"""Summarize what these reference sources explain about this topic in 2-3 sentences of prose. Focus on providing foundational understanding - what this thing is, how it works, or key background information.

Query: {query}

{kg_context}Reference Sources ({len(links)} found, {auth_count} authoritative):
{chr(10).join(content_parts)}

Write a concise prose summary (2-3 sentences) that explains the topic based on these reference sources. Focus on foundational understanding that would help someone unfamiliar with the topic."""

        return await self._call_llm(prompt)

    async def summarize_all(self, evidence: Dict[str, Any], query: str) -> Dict[str, str]:
        """Generate prose summaries for all evidence types in parallel.

        Args:
            evidence: Dictionary with guidelines, literature, news, patents, reference
            query: The original search query

        Returns:
            Dictionary with llm_summary for each evidence type
        """
        tasks = {
            "guidelines": self.summarize_guidelines(evidence.get("guidelines", {}), query),
            "literature": self.summarize_literature(evidence.get("literature", {}), query),
            "news": self.summarize_news(evidence.get("news", {}), query),
            "patents": self.summarize_patents(evidence.get("patents", {}), query),
            "reference": self.summarize_reference(evidence.get("reference", {}), query),
        }

        results = await asyncio.gather(*tasks.values(), return_exceptions=True)

        summaries = {}
        for key, result in zip(tasks.keys(), results):
            if isinstance(result, Exception):
                summaries[key] = f"Summary unavailable: {str(result)}"
            else:
                summaries[key] = result

        return summaries

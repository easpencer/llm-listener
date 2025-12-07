"""FastAPI backend for LLM Listener."""

import os
from contextlib import asynccontextmanager
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from .core import Settings, LLMOrchestrator, ResponseReconciler
from .providers import LLMResponse


class QueryRequest(BaseModel):
    question: str
    include_synthesis: bool = True
    mode: str = "public_health"  # "public_health" or "health_research"


class ProviderResponse(BaseModel):
    provider_name: str
    model: str
    content: str
    error: Optional[str] = None
    success: bool


class QueryResponse(BaseModel):
    question: str
    responses: list[ProviderResponse]
    synthesis: Optional[ProviderResponse] = None


class ProvidersResponse(BaseModel):
    configured: list[str]
    available: list[str]


@asynccontextmanager
async def lifespan(app: FastAPI):
    yield


app = FastAPI(
    title="LLM Listener",
    description="Query multiple LLMs and reconcile their responses",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/api/providers", response_model=ProvidersResponse)
async def get_providers():
    """Get list of configured and available providers."""
    settings = Settings.from_env()
    return ProvidersResponse(
        configured=settings.get_available_providers(),
        available=["openai", "anthropic", "gemini", "ollama"],
    )


@app.post("/api/query", response_model=QueryResponse)
async def query_llms(request: QueryRequest):
    """Query all configured LLMs with a question."""
    settings = Settings.from_env()

    if not settings.get_available_providers():
        raise HTTPException(
            status_code=400,
            detail="No LLM providers configured. Set API keys in environment.",
        )

    orchestrator = LLMOrchestrator(settings)
    reconciler = ResponseReconciler(settings)

    # Query all providers
    responses = await orchestrator.query_all(request.question)

    # Convert to response format
    provider_responses = [
        ProviderResponse(
            provider_name=r.provider_name,
            model=r.model,
            content=r.content,
            error=r.error,
            success=r.success,
        )
        for r in responses
    ]

    # Generate synthesis if requested
    synthesis = None
    if request.include_synthesis:
        successful_count = sum(1 for r in responses if r.success)
        if successful_count >= 2:
            synth_response = await reconciler.reconcile(
                request.question, responses, mode=request.mode
            )
            if synth_response and synth_response.success:
                synthesis = ProviderResponse(
                    provider_name="Synthesis",
                    model=synth_response.model,
                    content=synth_response.content,
                    error=synth_response.error,
                    success=synth_response.success,
                )

    return QueryResponse(
        question=request.question,
        responses=provider_responses,
        synthesis=synthesis,
    )


# Serve static files in production
static_dir = os.path.join(os.path.dirname(__file__), "..", "frontend", "dist")
if os.path.exists(static_dir):
    app.mount("/assets", StaticFiles(directory=os.path.join(static_dir, "assets")), name="assets")

    @app.get("/{path:path}")
    async def serve_spa(path: str):
        """Serve the React SPA."""
        file_path = os.path.join(static_dir, path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        return FileResponse(os.path.join(static_dir, "index.html"))

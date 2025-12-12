"""FastAPI backend for LLM Listener."""

import os
import uuid
from contextlib import asynccontextmanager
from typing import Optional, List, Dict, Any
from datetime import datetime

from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel, field_validator, model_validator, ValidationError
from sqlalchemy.orm import Session

from .core import Settings, LLMOrchestrator, ResponseReconciler
from .providers import LLMResponse
from .evidence import EvidenceSearcher
from .database import (
    SessionLocal,
    get_db,
    StudySession,
    StudyQuery,
    MessageRating,
    UsabilityRating,
    TrustRating,
    StudyCompletedResponse,
    init_db,
    DATABASE_URL,
)
from .core.conflict_settings import ConflictSettings
from .core.conflict_orchestrator import ConflictAnalysisOrchestrator

# Authentication imports
from .auth.routes import router as auth_router
from .file_upload import router as file_router, get_file_context_by_id, build_file_context_prompt
from .auth.dependencies import (
    get_current_user,
    require_auth,
    require_permission,
    get_authenticated_user,
    AuthenticatedUser,
    get_auth_settings,
)
from .auth.jwt_utils import UserInfo
from .auth.rbac import has_permission, get_user_permissions

# Rate limiting imports
from collections import defaultdict
import time


class RateLimiter:
    def __init__(self, max_requests: int = 10, window_seconds: int = 60):
        self.max_requests = max_requests
        self.window_seconds = window_seconds
        self.requests = defaultdict(list)

    def is_allowed(self, key: str) -> bool:
        now = time.time()
        # Clean old requests
        self.requests[key] = [t for t in self.requests[key] if now - t < self.window_seconds]
        # Check limit
        if len(self.requests[key]) >= self.max_requests:
            return False
        self.requests[key].append(now)
        return True


# Rate limiters for different endpoints
session_limiter = RateLimiter(max_requests=5, window_seconds=60)  # 5 sessions per minute per IP
study_complete_limiter = RateLimiter(max_requests=3, window_seconds=300)  # 3 completions per 5 min per IP


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"



class HealthContext(BaseModel):
    """De-identified health context from client-side document parsing."""
    patientContext: Optional[Dict[str, Any]] = None
    activeConditions: Optional[List[Dict[str, Any]]] = None
    currentMedications: Optional[List[Dict[str, Any]]] = None
    allergyList: Optional[List[Dict[str, Any]]] = None
    recentLabs: Optional[List[Dict[str, Any]]] = None


class QueryRequest(BaseModel):
    question: str
    include_synthesis: bool = True
    mode: str = "public_health"  # "public_health" or "health_research"
    health_context: Optional[HealthContext] = None  # De-identified health context
    conflict_settings: Optional[Dict[str, Any]] = None


class ProviderResponse(BaseModel):
    provider_name: str
    model: str
    content: str
    error: Optional[str] = None
    success: bool


class ConflictAnalysisResponse(BaseModel):
    has_conflicts: bool = False
    conflict_severity: str = "none"
    is_emerging_topic: bool = False
    emerging_topic_reason: Optional[str] = None
    requires_resolution: bool = False
    resolution_context: Optional[str] = None
    agreement_level: Optional[float] = None
    areas_of_disagreement: List[str] = []
    audit_log: List[Dict[str, Any]] = []


class QueryResponse(BaseModel):
    question: str
    responses: list[ProviderResponse]
    synthesis: Optional[ProviderResponse] = None
    guidelines: Optional[Dict[str, Any]] = None
    research: Optional[Dict[str, Any]] = None
    news: Optional[Dict[str, Any]] = None
    patents: Optional[Dict[str, Any]] = None
    conflict_analysis: Optional[ConflictAnalysisResponse] = None


class ProvidersResponse(BaseModel):
    configured: list[str]
    available: list[str]


class AppConfigResponse(BaseModel):
    app_mode: str  # "prism" or "chorus"
    app_name: str  # Display name
    show_study: bool
    default_mode: str  # "public_health" or "health_research"
    tagline: str


class ClarifyRequest(BaseModel):
    question: str


class ClarifyResponse(BaseModel):
    needs_clarification: bool
    original_question: str
    refined_question: Optional[str] = None  # AI-improved version
    clarifying_questions: List[str] = []  # Questions to ask user
    suggestions: List[str] = []  # Alternative phrasings
    explanation: Optional[str] = None  # Why clarification might help


# Conversational clarification models
class ConvoMessage(BaseModel):
    role: str  # "ai" or "user"
    text: str


class ClarifyStepRequest(BaseModel):
    original_question: str
    conversation: List[ConvoMessage] = []  # Previous exchanges


class ClarifyStepResponse(BaseModel):
    clarifying_question: Optional[str] = None  # Next question to ask user (null if ready)
    is_ready: bool  # Whether the question is refined enough
    refined_question: str  # Current refined version of the question
    quick_options: List[str] = []  # Quick response options for the user


# Study System Request/Response Models

class CreateSessionRequest(BaseModel):
    participant_type: str
    tool_version: str
    role: Optional[str] = None
    experience_years: Optional[int] = None
    organization_type: Optional[str] = None


class CreateSessionResponse(BaseModel):
    session_id: str
    created_at: datetime


class CreateQueryRequest(BaseModel):
    query_number: int
    topic: str
    query_text: str
    mode: str
    model_responses: Dict[str, Any]
    synthesized_response: str
    response_time_ms: int


class CreateRatingRequest(BaseModel):
    case_number: int
    case_topic: str
    message_a_source: str
    message_b_source: str
    message_a_text: str
    message_b_text: str
    a_clarity: Optional[int] = None
    a_accuracy: Optional[int] = None
    a_actionability: Optional[int] = None
    a_cultural_sensitivity: Optional[int] = None
    a_persuasiveness: Optional[int] = None
    a_addresses_concerns: Optional[int] = None
    b_clarity: Optional[int] = None
    b_accuracy: Optional[int] = None
    b_actionability: Optional[int] = None
    b_cultural_sensitivity: Optional[int] = None
    b_persuasiveness: Optional[int] = None
    b_addresses_concerns: Optional[int] = None
    preference: Optional[int] = None
    comments: Optional[str] = None


class CreateUsabilityRequest(BaseModel):
    tool_version: str
    tasks_completed: int
    tasks_total: int
    total_time_seconds: int
    sus_1: int
    sus_2: int
    sus_3: int
    sus_4: int
    sus_5: int
    sus_6: int
    sus_7: int
    sus_8: int
    sus_9: int
    sus_10: int
    suggestions: Optional[str] = None


class CreateTrustRequest(BaseModel):
    trust_accuracy: int
    trust_reliability: int
    trust_unbiased: int
    trust_comprehensive: int
    would_use_routine: int
    would_use_urgent: int
    would_recommend: int
    prefer_over_search: int
    concerns: List[str]
    trust_comments: Optional[str] = None


class CompleteSessionResponse(BaseModel):
    session_id: str
    completed_at: datetime


class CompleteStudyRequest(BaseModel):
    """Request to save complete study data."""
    session_id: str
    demographics: Dict[str, Any]
    accuracy_responses: Dict[str, Any]
    quality_responses: Dict[str, Any]
    message_orders: Dict[str, Any]
    assigned_interface: str
    task_results: List[Dict[str, Any]]
    sus_responses: List[int]
    sus_score: float
    assigned_message: str
    effectiveness_responses: Dict[str, Any]
    assigned_cases: Optional[List[int]] = None

    @field_validator('sus_score')
    @classmethod
    def validate_sus_score(cls, v: float) -> float:
        """Validate SUS score is between 0 and 100."""
        if not 0 <= v <= 100:
            raise ValueError(f'SUS score must be between 0 and 100, got {v}')
        return v

    @field_validator('sus_responses')
    @classmethod
    def validate_sus_responses(cls, v: List[int]) -> List[int]:
        """Validate SUS responses has exactly 10 items with values 1-5."""
        if len(v) != 10:
            raise ValueError(f'SUS responses must have exactly 10 items, got {len(v)}')
        for i, response in enumerate(v, 1):
            if not 1 <= response <= 5:
                raise ValueError(f'SUS response {i} must be between 1 and 5, got {response}')
        return v

    @field_validator('assigned_interface')
    @classmethod
    def validate_assigned_interface(cls, v: str) -> str:
        """Validate assigned_interface is either 'brief' or 'detailed'."""
        if v not in ['brief', 'detailed']:
            raise ValueError(f'assigned_interface must be "brief" or "detailed", got "{v}"')
        return v

    @field_validator('assigned_message')
    @classmethod
    def validate_assigned_message(cls, v: str) -> str:
        """Validate assigned_message is either 'chorus' or 'cdc'."""
        if v not in ['chorus', 'cdc']:
            raise ValueError(f'assigned_message must be "chorus" or "cdc", got "{v}"')
        return v

    @model_validator(mode='after')
    def validate_sus_score_calculation(self) -> 'CompleteStudyRequest':
        """Validate that the sus_score matches the calculated score from sus_responses."""
        if len(self.sus_responses) != 10:
            # This should have been caught by field validator, but just in case
            return self

        # Calculate SUS score using the standard formula
        # Odd questions (1,3,5,7,9): subtract 1 from score
        # Even questions (2,4,6,8,10): subtract score from 5
        # Sum all and multiply by 2.5
        odd_sum = sum(self.sus_responses[i] - 1 for i in [0, 2, 4, 6, 8])
        even_sum = sum(5 - self.sus_responses[i] for i in [1, 3, 5, 7, 9])
        calculated_score = (odd_sum + even_sum) * 2.5

        # Allow small floating point differences (tolerance of 0.1)
        if abs(self.sus_score - calculated_score) > 0.1:
            raise ValueError(
                f'SUS score mismatch: provided {self.sus_score} but calculated {calculated_score} '
                f'from responses {self.sus_responses}'
            )

        return self


class CompleteStudyResponse(BaseModel):
    session_id: str
    saved: bool


class WithdrawDataRequest(BaseModel):
    session_id: str
    confirm: bool = False  # Must be explicitly set to true


class WithdrawDataResponse(BaseModel):
    session_id: str
    withdrawn: bool
    message: str


class StudyResultsResponse(BaseModel):
    """Response model matching the frontend ResultsDashboard expectations."""
    total_participants: int
    by_tool_version: Dict[str, int]
    avg_completion_time: Optional[float] = None
    completion_rate: float = 0.0
    sus_scores: Optional[Dict[str, Any]] = None
    message_preferences: Optional[Dict[str, int]] = None
    source_preferences: Optional[Dict[str, Any]] = None  # Un-blinded preferences by actual source
    trust_metrics: Optional[Dict[str, Any]] = None
    demographics: Optional[Dict[str, Any]] = None


class EvidenceRequest(BaseModel):
    query: str


class EvidenceResponse(BaseModel):
    query: str
    guidelines: Dict[str, Any]
    literature: Dict[str, Any]
    news: Optional[Dict[str, Any]] = None
    patents: Optional[Dict[str, Any]] = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Initialize database on startup if configured
    if DATABASE_URL:
        init_db()
    yield


app = FastAPI(
    title="LLM Listener",
    description="Query multiple LLMs and reconcile their responses",
    version="0.1.0",
    lifespan=lifespan,
)

# Get auth settings for CORS configuration
_auth_settings = get_auth_settings()

# Configure CORS - in production, restrict to specific origins
_cors_origins = ["*"]
if _auth_settings.auth_required and _auth_settings.app_url:
    # When auth is required, restrict CORS to known origins
    _cors_origins = [
        _auth_settings.app_url,
        _auth_settings.api_url,
        "https://prism.resilienthub.org",
        "https://chorus.resilienthub.org",
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include authentication router
app.include_router(auth_router)

# Include file upload router
app.include_router(file_router)


@app.get("/api/providers", response_model=ProvidersResponse)
async def get_providers():
    """Get list of configured and available providers."""
    settings = Settings.from_env()
    return ProvidersResponse(
        configured=settings.get_available_providers(),
        available=["openai", "anthropic", "gemini", "grok", "ollama"],
    )


@app.get("/api/config", response_model=AppConfigResponse)
async def get_app_config():
    """Get app configuration based on APP_MODE."""
    settings = Settings.from_env()
    app_mode = settings.app_mode.lower()

    if app_mode == "chorus":
        return AppConfigResponse(
            app_mode="chorus",
            app_name="Chorus",
            show_study=False,
            default_mode="health_research",
            tagline="Multi-LLM Evidence Synthesis for Health Research",
        )
    else:  # Default to prism
        return AppConfigResponse(
            app_mode="prism",
            app_name="Prism",
            show_study=True,
            default_mode="public_health",
            tagline="AI-Powered Public Health Communication",
        )


def build_health_context_prompt(question: str, health_context: HealthContext) -> str:
    """Enhance question with de-identified health context."""
    context_parts = []

    # Patient demographics (already de-identified - age range, gender)
    if health_context.patientContext:
        age = health_context.patientContext.get("ageRange", "adult")
        gender = health_context.patientContext.get("gender", "")
        if gender:
            context_parts.append(f"Patient is a {age} year old {gender}")
        else:
            context_parts.append(f"Patient is {age}")

    # Active conditions
    if health_context.activeConditions:
        conditions = [c.get("name", "") for c in health_context.activeConditions[:10] if c.get("name")]
        if conditions:
            context_parts.append(f"Active conditions: {', '.join(conditions)}")

    # Current medications
    if health_context.currentMedications:
        meds = [m.get("name", "") for m in health_context.currentMedications[:10] if m.get("name")]
        if meds:
            context_parts.append(f"Current medications: {', '.join(meds)}")

    # Allergies
    if health_context.allergyList:
        allergies = [a.get("substance", "") for a in health_context.allergyList if a.get("substance")]
        if allergies:
            context_parts.append(f"Known allergies: {', '.join(allergies)}")

    # Recent labs
    if health_context.recentLabs:
        labs = [f"{l.get('test', '')} ({l.get('interpretation', '')})"
                for l in health_context.recentLabs[:5]
                if l.get('test')]
        if labs:
            context_parts.append(f"Recent labs: {', '.join(labs)}")

    if not context_parts:
        return question

    context_text = "\n".join(f"- {part}" for part in context_parts)

    return f"""The patient has shared de-identified health context for personalized guidance:

{context_text}

Based on this patient's health profile and current medical evidence, please address:

{question}

Note: Provide evidence-based information relevant to this patient's profile. Always recommend consulting their healthcare provider for personalized medical advice."""


@app.post("/api/query", response_model=QueryResponse)
async def query_llms(request: QueryRequest):
    """Query all configured LLMs with a question."""
    import asyncio

    settings = Settings.from_env()

    if not settings.get_available_providers():
        raise HTTPException(
            status_code=400,
            detail="No LLM providers configured. Set API keys in environment.",
        )

    orchestrator = LLMOrchestrator(settings)
    reconciler = ResponseReconciler(settings)

    # Enhance question with health context if provided
    query_question = request.question
    if request.health_context:
        query_question = build_health_context_prompt(request.question, request.health_context)

    # Create evidence search task if SERPAPI is configured
    evidence_task = None
    if settings.serpapi_api_key:
        searcher = EvidenceSearcher(settings.serpapi_api_key)
        evidence_task = searcher.search_all(request.question)  # Use original question for evidence search

    # Query all providers (and evidence in parallel)
    if evidence_task:
        responses, evidence_results = await asyncio.gather(
            orchestrator.query_all(query_question),
            evidence_task,
            return_exceptions=True
        )
        # Handle exceptions
        if isinstance(responses, Exception):
            raise HTTPException(status_code=500, detail=str(responses))
        if isinstance(evidence_results, Exception):
            evidence_results = {"guidelines": {}, "literature": {}}
    else:
        responses = await orchestrator.query_all(query_question)
        evidence_results = None

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
                request.question, responses, mode=request.mode,
                evidence_data=evidence_results
            )
            if synth_response and synth_response.success:
                synthesis = ProviderResponse(
                    provider_name="Synthesis",
                    model=synth_response.model,
                    content=synth_response.content,
                    error=synth_response.error,
                    success=synth_response.success,
                )

    # Perform conflict analysis if configured
    conflict_analysis_response = None
    try:
        # Parse conflict settings if provided, otherwise use defaults
        if request.conflict_settings:
            conflict_settings = ConflictSettings.from_dict(request.conflict_settings)
        else:
            conflict_settings = ConflictSettings()

        # Create conflict analysis orchestrator
        conflict_orchestrator = ConflictAnalysisOrchestrator(conflict_settings)

        # Analyze conflicts using AI responses and evidence
        conflict_result = await conflict_orchestrator.analyze_all(responses, evidence_results)

        # Convert result to response format
        conflict_analysis_response = ConflictAnalysisResponse(
            has_conflicts=conflict_result.has_conflicts,
            conflict_severity=conflict_result.conflict_severity,
            is_emerging_topic=conflict_result.is_emerging_topic,
            emerging_topic_reason=conflict_result.emerging_topic_reason,
            requires_resolution=conflict_result.requires_resolution,
            resolution_context=conflict_result.resolution_context,
            agreement_level=conflict_result.agreement_level,
            areas_of_disagreement=conflict_result.areas_of_disagreement,
            audit_log=conflict_result.audit_log,
        )
    except Exception as e:
        # Log the error but continue - conflict analysis is optional
        import logging
        logger = logging.getLogger(__name__)
        logger.warning(f"Conflict analysis failed: {str(e)}", exc_info=True)
        # conflict_analysis_response remains None

    return QueryResponse(
        question=request.question,
        responses=provider_responses,
        synthesis=synthesis,
        guidelines=evidence_results.get("guidelines") if evidence_results else None,
        research=evidence_results.get("literature") if evidence_results else None,
        news=evidence_results.get("news") if evidence_results else None,
        patents=evidence_results.get("patents") if evidence_results else None,
        conflict_analysis=conflict_analysis_response,
    )


@app.post("/api/clarify", response_model=ClarifyResponse)
async def clarify_query(request: ClarifyRequest):
    """Analyze a query for ambiguity and suggest refinements.

    Uses AI to determine if the question is clear enough for effective search,
    and provides suggestions for improvement if needed.
    """
    import json
    settings = Settings.from_env()

    # Use the first available provider to analyze the query
    providers = settings.get_available_providers()
    if not providers:
        # No AI available, return no clarification needed
        return ClarifyResponse(
            needs_clarification=False,
            original_question=request.question,
        )

    orchestrator = LLMOrchestrator(settings)

    # Create a prompt for query analysis
    analysis_prompt = f"""Analyze this health-related question and determine if it needs clarification for effective research.

Question: "{request.question}"

Respond in JSON format:
{{
    "needs_clarification": true/false,
    "refined_question": "improved version of the question if unclear, or null if clear",
    "clarifying_questions": ["list of 1-3 questions to ask the user if clarification needed"],
    "suggestions": ["list of 2-3 alternative ways to phrase the question"],
    "explanation": "brief explanation of why clarification might help, or null if question is clear"
}}

Consider these factors:
- Is the question specific enough? (e.g., "heart health" vs "how to reduce cardiovascular disease risk")
- Is there ambiguity about population? (children vs adults, pregnant women, etc.)
- Is the medical context clear? (prevention vs treatment, acute vs chronic)
- Could the question be interpreted multiple ways?

If the question is already clear and specific, set needs_clarification to false.
Only respond with valid JSON, no other text."""

    # Query just one provider for speed
    response = await orchestrator.query_single(providers[0], analysis_prompt)

    if not response.success:
        # Fallback - no clarification
        return ClarifyResponse(
            needs_clarification=False,
            original_question=request.question,
        )

    # Parse the JSON response
    try:
        # Extract JSON from the response (handle markdown code blocks)
        content = response.content.strip()
        if content.startswith("```"):
            # Remove markdown code block
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])

        analysis = json.loads(content)

        return ClarifyResponse(
            needs_clarification=analysis.get("needs_clarification", False),
            original_question=request.question,
            refined_question=analysis.get("refined_question"),
            clarifying_questions=analysis.get("clarifying_questions", []),
            suggestions=analysis.get("suggestions", []),
            explanation=analysis.get("explanation"),
        )
    except (json.JSONDecodeError, KeyError):
        # If parsing fails, assume no clarification needed
        return ClarifyResponse(
            needs_clarification=False,
            original_question=request.question,
        )


@app.post("/api/clarify-step", response_model=ClarifyStepResponse)
async def clarify_step(request: ClarifyStepRequest):
    """Conversational clarification - one step at a time.

    Takes the original question and any conversation history,
    returns either a clarifying question or indicates the question is ready.
    """
    import json
    settings = Settings.from_env()

    providers = settings.get_available_providers()
    if not providers:
        # No AI available, return ready immediately
        return ClarifyStepResponse(
            is_ready=True,
            refined_question=request.original_question,
        )

    orchestrator = LLMOrchestrator(settings)

    # Build conversation context
    convo_context = ""
    if request.conversation:
        convo_context = "\n".join([
            f"{'Assistant' if m.role == 'ai' else 'User'}: {m.text}"
            for m in request.conversation
        ])

    # Create the prompt
    prompt = f"""You are helping refine a health-related question for research.

Original question: "{request.original_question}"

{f'Conversation so far:{chr(10)}{convo_context}' if convo_context else ''}

Analyze if the question is specific enough for effective health research. Consider:
- Is the target population clear? (age, gender, conditions)
- Is the health context clear? (prevention, treatment, symptoms, medications)
- Is there ambiguity that could lead to unhelpful results?

Respond in JSON format:
{{
    "is_ready": true/false,
    "refined_question": "the current best version of the question based on conversation",
    "clarifying_question": "a single, specific question to ask the user to refine their query (null if is_ready is true)",
    "quick_options": ["2-3 short clickable options for the user to quickly answer the clarifying question"]
}}

Rules:
- Ask at most 2-3 clarifying questions total (check conversation length)
- If the question is already clear OR you've asked enough questions, set is_ready to true
- Make clarifying questions conversational and helpful, not interrogative
- Quick options should be common/likely answers, 2-5 words each
- Always provide a reasonable refined_question even if still refining

Only respond with valid JSON."""

    response = await orchestrator.query_single(providers[0], prompt)

    if not response.success:
        return ClarifyStepResponse(
            is_ready=True,
            refined_question=request.original_question,
        )

    try:
        content = response.content.strip()
        if content.startswith("```"):
            lines = content.split("\n")
            content = "\n".join(lines[1:-1] if lines[-1] == "```" else lines[1:])

        analysis = json.loads(content)

        # Force ready after 3 exchanges to prevent endless loops
        force_ready = len(request.conversation) >= 6  # 3 AI + 3 user messages

        return ClarifyStepResponse(
            is_ready=force_ready or analysis.get("is_ready", True),
            refined_question=analysis.get("refined_question", request.original_question),
            clarifying_question=None if force_ready else analysis.get("clarifying_question"),
            quick_options=[] if force_ready else analysis.get("quick_options", []),
        )
    except (json.JSONDecodeError, KeyError):
        return ClarifyStepResponse(
            is_ready=True,
            refined_question=request.original_question,
        )


@app.post("/api/evidence", response_model=EvidenceResponse)
async def search_evidence(request: EvidenceRequest):
    """Search for evidence using SERPAPI.

    This endpoint searches government guidelines, scientific literature,
    health news, and medical patents to provide comprehensive evidence.
    """
    settings = Settings.from_env()

    if not settings.serpapi_api_key:
        raise HTTPException(
            status_code=400,
            detail="SERPAPI not configured. Set SERPAPI_API_KEY in environment.",
        )

    searcher = EvidenceSearcher(settings.serpapi_api_key)

    # Search all evidence sources (guidelines, literature, news, patents)
    results = await searcher.search_all(request.query)

    return EvidenceResponse(
        query=request.query,
        guidelines=results["guidelines"],
        literature=results["literature"],
        news=results.get("news"),
        patents=results.get("patents"),
    )


# Study System Endpoints

def check_db_configured():
    """Check if database is configured - now always passes with SQLite fallback."""
    pass  # Database is always configured (SQLite fallback if no DATABASE_URL)


@app.post("/api/study/session", response_model=CreateSessionResponse)
async def create_study_session(
    request: CreateSessionRequest,
    http_request: Request,
    db: Session = Depends(get_db)
):
    """Create a new study session."""
    check_db_configured()

    # Rate limiting
    client_ip = get_client_ip(http_request)
    if not session_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please wait before trying again.")

    # Generate unique session ID
    session_id = str(uuid.uuid4())

    # Create session
    session = StudySession(
        session_id=session_id,
        participant_type=request.participant_type,
        tool_version=request.tool_version,
        role=request.role,
        experience_years=request.experience_years,
        organization_type=request.organization_type,
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return CreateSessionResponse(
        session_id=session.session_id,
        created_at=session.created_at,
    )


@app.post("/api/study/session/{session_id}/query")
async def create_study_query(
    session_id: str,
    request: CreateQueryRequest,
    db: Session = Depends(get_db)
):
    """Record a query made during study."""
    check_db_configured()

    # Find session
    session = db.query(StudySession).filter(StudySession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Create query record
    query = StudyQuery(
        session_id=session.id,
        query_number=request.query_number,
        topic=request.topic,
        query_text=request.query_text,
        mode=request.mode,
        model_responses=request.model_responses,
        synthesized_response=request.synthesized_response,
        response_time_ms=request.response_time_ms,
        completed_at=datetime.utcnow(),
    )

    db.add(query)
    db.commit()
    db.refresh(query)

    return {"id": query.id, "session_id": session_id}


@app.post("/api/study/session/{session_id}/rating")
async def create_message_rating(
    session_id: str,
    request: CreateRatingRequest,
    db: Session = Depends(get_db)
):
    """Record a message quality rating."""
    check_db_configured()

    # Find session
    session = db.query(StudySession).filter(StudySession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Create rating
    rating = MessageRating(
        session_id=session.id,
        case_number=request.case_number,
        case_topic=request.case_topic,
        message_a_source=request.message_a_source,
        message_b_source=request.message_b_source,
        message_a_text=request.message_a_text,
        message_b_text=request.message_b_text,
        a_clarity=request.a_clarity,
        a_accuracy=request.a_accuracy,
        a_actionability=request.a_actionability,
        a_cultural_sensitivity=request.a_cultural_sensitivity,
        a_persuasiveness=request.a_persuasiveness,
        a_addresses_concerns=request.a_addresses_concerns,
        b_clarity=request.b_clarity,
        b_accuracy=request.b_accuracy,
        b_actionability=request.b_actionability,
        b_cultural_sensitivity=request.b_cultural_sensitivity,
        b_persuasiveness=request.b_persuasiveness,
        b_addresses_concerns=request.b_addresses_concerns,
        preference=request.preference,
        comments=request.comments,
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return {"id": rating.id, "session_id": session_id}


@app.post("/api/study/session/{session_id}/usability")
async def create_usability_rating(
    session_id: str,
    request: CreateUsabilityRequest,
    db: Session = Depends(get_db)
):
    """Record SUS usability rating."""
    check_db_configured()

    # Find session
    session = db.query(StudySession).filter(StudySession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Calculate SUS score
    # Odd questions (1,3,5,7,9): subtract 1 from score
    # Even questions (2,4,6,8,10): subtract score from 5
    # Sum all and multiply by 2.5
    odd_sum = (
        (request.sus_1 - 1) +
        (request.sus_3 - 1) +
        (request.sus_5 - 1) +
        (request.sus_7 - 1) +
        (request.sus_9 - 1)
    )
    even_sum = (
        (5 - request.sus_2) +
        (5 - request.sus_4) +
        (5 - request.sus_6) +
        (5 - request.sus_8) +
        (5 - request.sus_10)
    )
    sus_score = (odd_sum + even_sum) * 2.5

    # Create rating
    rating = UsabilityRating(
        session_id=session.id,
        tool_version=request.tool_version,
        tasks_completed=request.tasks_completed,
        tasks_total=request.tasks_total,
        total_time_seconds=request.total_time_seconds,
        sus_1_use_frequently=request.sus_1,
        sus_2_unnecessarily_complex=request.sus_2,
        sus_3_easy_to_use=request.sus_3,
        sus_4_need_tech_support=request.sus_4,
        sus_5_well_integrated=request.sus_5,
        sus_6_too_much_inconsistency=request.sus_6,
        sus_7_learn_quickly=request.sus_7,
        sus_8_cumbersome=request.sus_8,
        sus_9_confident=request.sus_9,
        sus_10_learn_before_use=request.sus_10,
        sus_score=sus_score,
        suggestions=request.suggestions,
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return {"id": rating.id, "session_id": session_id, "sus_score": sus_score}


@app.post("/api/study/session/{session_id}/trust")
async def create_trust_rating(
    session_id: str,
    request: CreateTrustRequest,
    db: Session = Depends(get_db)
):
    """Record trust rating."""
    check_db_configured()

    # Find session
    session = db.query(StudySession).filter(StudySession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Create rating
    rating = TrustRating(
        session_id=session.id,
        trust_accuracy=request.trust_accuracy,
        trust_reliability=request.trust_reliability,
        trust_unbiased=request.trust_unbiased,
        trust_comprehensive=request.trust_comprehensive,
        would_use_routine=request.would_use_routine,
        would_use_urgent=request.would_use_urgent,
        would_recommend=request.would_recommend,
        prefer_over_search=request.prefer_over_search,
        concerns=request.concerns,
        trust_comments=request.trust_comments,
    )

    db.add(rating)
    db.commit()
    db.refresh(rating)

    return {"id": rating.id, "session_id": session_id}


@app.post("/api/study/session/{session_id}/complete", response_model=CompleteSessionResponse)
async def complete_study_session(session_id: str, db: Session = Depends(get_db)):
    """Mark session as completed."""
    check_db_configured()

    # Find session
    session = db.query(StudySession).filter(StudySession.session_id == session_id).first()
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")

    # Mark as completed
    session.completed_at = datetime.utcnow()
    db.commit()
    db.refresh(session)

    return CompleteSessionResponse(
        session_id=session.session_id,
        completed_at=session.completed_at,
    )


@app.post("/api/study/complete", response_model=CompleteStudyResponse)
async def save_complete_study(
    request: CompleteStudyRequest,
    http_request: Request,
    db: Session = Depends(get_db)
):
    """Save complete study response data."""
    check_db_configured()

    # Rate limiting
    client_ip = get_client_ip(http_request)
    if not study_complete_limiter.is_allowed(client_ip):
        raise HTTPException(status_code=429, detail="Too many requests. Please wait before trying again.")

    # Check if already exists
    existing = db.query(StudyCompletedResponse).filter(
        StudyCompletedResponse.session_id == request.session_id
    ).first()

    if existing:
        # Reject duplicate submissions
        raise HTTPException(
            status_code=409,
            detail="Study already submitted for this session"
        )

    # Create new record
    response = StudyCompletedResponse(
        session_id=request.session_id,
        demographics=request.demographics,
        accuracy_responses=request.accuracy_responses,
        quality_responses=request.quality_responses,
        message_orders=request.message_orders,
        assigned_interface=request.assigned_interface,
        task_results=request.task_results,
        sus_responses=request.sus_responses,
        sus_score=request.sus_score,
        assigned_message=request.assigned_message,
        effectiveness_responses=request.effectiveness_responses,
        assigned_cases=request.assigned_cases,
    )
    db.add(response)

    db.commit()

    return CompleteStudyResponse(session_id=request.session_id, saved=True)


@app.delete("/api/study/withdraw", response_model=WithdrawDataResponse)
async def withdraw_study_data(request: WithdrawDataRequest, db: Session = Depends(get_db)):
    """Allow participants to withdraw their study data."""
    if not request.confirm:
        raise HTTPException(
            status_code=400,
            detail="Must confirm withdrawal by setting confirm=true"
        )

    # Delete from StudyCompletedResponse
    completed = db.query(StudyCompletedResponse).filter(
        StudyCompletedResponse.session_id == request.session_id
    ).first()

    if not completed:
        raise HTTPException(status_code=404, detail="Session not found")

    # Delete the record
    db.delete(completed)
    db.commit()

    return WithdrawDataResponse(
        session_id=request.session_id,
        withdrawn=True,
        message="Your study data has been permanently deleted"
    )


@app.get("/api/study/check/{session_id}")
async def check_study_data(session_id: str, db: Session = Depends(get_db)):
    """Check if study data exists for a session."""
    exists = db.query(StudyCompletedResponse).filter(
        StudyCompletedResponse.session_id == session_id
    ).first() is not None

    return {"session_id": session_id, "exists": exists}


def calculate_std(values: list) -> float:
    """Calculate sample standard deviation."""
    if len(values) < 2:
        return 0.0
    mean = sum(values) / len(values)
    variance = sum((x - mean) ** 2 for x in values) / (len(values) - 1)
    return variance ** 0.5


@app.get("/api/study/results", response_model=StudyResultsResponse)
async def get_study_results(db: Session = Depends(get_db)):
    """Returns anonymized aggregated results matching frontend dashboard expectations."""
    check_db_configured()

    # Get completed responses from the unified endpoint (primary data source)
    completed_responses = db.query(StudyCompletedResponse).all()
    total_participants = len(completed_responses)

    # Count by tool version (interface assigned)
    by_tool_version = {"detailed": 0, "brief": 0}
    for response in completed_responses:
        version = response.assigned_interface or "unknown"
        if version in by_tool_version:
            by_tool_version[version] += 1

    # Calculate SUS scores with proper statistics (including standard deviation)
    sus_scores = None
    sus_by_version = {}
    all_sus_scores = []

    for response in completed_responses:
        version = response.assigned_interface or "unknown"
        if version not in sus_by_version:
            sus_by_version[version] = []
        if response.sus_score is not None:
            sus_by_version[version].append(response.sus_score)
            all_sus_scores.append(response.sus_score)

    if all_sus_scores:
        overall_avg = sum(all_sus_scores) / len(all_sus_scores)
        overall_std = calculate_std(all_sus_scores)
        by_version_data = {}
        for version, scores in sus_by_version.items():
            if scores:
                by_version_data[version] = {
                    "avg_score": sum(scores) / len(scores),
                    "std_dev": calculate_std(scores),
                    "count": len(scores),
                    "min": min(scores),
                    "max": max(scores)
                }
        sus_scores = {
            "overall_avg_score": overall_avg,
            "overall_std_dev": overall_std,
            "n": len(all_sus_scores),
            "by_version": by_version_data
        }

    # Aggregate demographics from completed responses
    demographics = {"by_role": {}, "by_experience": {}, "by_org_type": {}}
    for response in completed_responses:
        if response.demographics:
            demo = response.demographics
            # Role
            role = demo.get("role", "unknown")
            demographics["by_role"][role] = demographics["by_role"].get(role, 0) + 1
            # Experience
            exp = demo.get("experience", "unknown")
            demographics["by_experience"][exp] = demographics["by_experience"].get(exp, 0) + 1
            # Org type
            org = demo.get("orgType", "unknown")
            demographics["by_org_type"][org] = demographics["by_org_type"].get(org, 0) + 1

    # Message preferences from quality_responses (A/B comparison preferences) - blinded
    message_preferences = {"-2": 0, "-1": 0, "0": 0, "1": 0, "2": 0}
    # Source preferences - un-blinded using message_orders to show actual source preferences
    # Tracks preference scores converted to favor chorus (positive) or cdc (negative)
    chorus_preference_scores = []

    for response in completed_responses:
        if response.quality_responses and response.message_orders:
            for case_num, case_data in response.quality_responses.items():
                pref = case_data.get("preference")
                if pref is not None:
                    # Record blinded preference
                    pref_key = str(int(pref))
                    if pref_key in message_preferences:
                        message_preferences[pref_key] += 1

                    # Un-blind using message_orders
                    # message_orders[case_num] = ['chorus', 'cdc'] means A=chorus, B=cdc
                    # preference: -2=strongly prefer A, +2=strongly prefer B
                    order = response.message_orders.get(str(case_num)) or response.message_orders.get(int(case_num))
                    if order and len(order) >= 2:
                        a_source = order[0]  # What was shown as A
                        # Convert to chorus preference score:
                        # If A=chorus: preference of -2 (strongly prefer A) means +2 for chorus
                        # If A=cdc: preference of -2 (strongly prefer A) means -2 for chorus
                        if a_source == 'chorus':
                            chorus_pref = -pref  # Negate because -2=prefer A becomes +2=prefer chorus
                        else:
                            chorus_pref = pref  # +2=prefer B=chorus
                        chorus_preference_scores.append(chorus_pref)

    # Calculate source preference statistics
    source_preferences = None
    if chorus_preference_scores:
        n = len(chorus_preference_scores)
        avg_chorus_pref = sum(chorus_preference_scores) / n
        std_chorus_pref = calculate_std(chorus_preference_scores)
        # Count by direction
        prefer_chorus = sum(1 for p in chorus_preference_scores if p > 0)
        prefer_cdc = sum(1 for p in chorus_preference_scores if p < 0)
        no_preference = sum(1 for p in chorus_preference_scores if p == 0)
        source_preferences = {
            "avg_chorus_preference": avg_chorus_pref,  # Positive = prefer chorus, negative = prefer CDC
            "std_dev": std_chorus_pref,
            "n": n,
            "prefer_chorus_count": prefer_chorus,
            "prefer_cdc_count": prefer_cdc,
            "no_preference_count": no_preference,
            "prefer_chorus_pct": (prefer_chorus / n * 100) if n > 0 else 0,
            "prefer_cdc_pct": (prefer_cdc / n * 100) if n > 0 else 0,
        }

    # Trust metrics structure expected by dashboard
    trust_metrics = None
    trust_ratings = db.query(TrustRating).all()
    if trust_ratings:
        count = len(trust_ratings)
        trust_metrics = {
            "trust_accuracy": {
                "avg_score": sum(r.trust_accuracy or 0 for r in trust_ratings) / count,
                "count": count
            },
            "trust_reliability": {
                "avg_score": sum(r.trust_reliability or 0 for r in trust_ratings) / count,
                "count": count
            },
            "trust_transparency": {
                "avg_score": sum(r.trust_unbiased or 0 for r in trust_ratings) / count,
                "count": count
            },
            "trust_usefulness": {
                "avg_score": sum(r.trust_comprehensive or 0 for r in trust_ratings) / count,
                "count": count
            },
            "would_use": {
                "avg_score": sum(r.would_use_routine or 0 for r in trust_ratings) / count,
                "count": count
            }
        }

    return StudyResultsResponse(
        total_participants=total_participants,
        by_tool_version=by_tool_version,
        avg_completion_time=None,  # Not tracked in current schema
        completion_rate=1.0 if total_participants > 0 else 0.0,
        sus_scores=sus_scores,
        message_preferences=message_preferences if any(v > 0 for v in message_preferences.values()) else None,
        source_preferences=source_preferences,
        trust_metrics=trust_metrics,
        demographics=demographics if total_participants > 0 else None,
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

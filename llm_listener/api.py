"""FastAPI backend for LLM Listener."""

import os
import uuid
from contextlib import asynccontextmanager
from typing import Optional, List, Dict, Any
from datetime import datetime

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
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


class CompleteStudyResponse(BaseModel):
    session_id: str
    saved: bool


class StudyResultsResponse(BaseModel):
    total_sessions: int
    completed_responses: int  # From StudyCompletedResponse table
    by_tool_version: Dict[str, int]
    avg_sus_scores: Dict[str, float]
    preference_distribution: Dict[str, int]
    trust_metrics: Dict[str, float]


class EvidenceRequest(BaseModel):
    query: str


class EvidenceResponse(BaseModel):
    query: str
    guidelines: Dict[str, Any]
    literature: Dict[str, Any]


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

    This endpoint searches government guidelines and scientific literature
    to provide evidence-based context for health queries.
    """
    settings = Settings.from_env()

    if not settings.serpapi_api_key:
        raise HTTPException(
            status_code=400,
            detail="SERPAPI not configured. Set SERPAPI_API_KEY in environment.",
        )

    searcher = EvidenceSearcher(settings.serpapi_api_key)

    # Search both guidelines and literature
    results = await searcher.search_all(request.query)

    return EvidenceResponse(
        query=request.query,
        guidelines=results["guidelines"],
        literature=results["literature"],
    )


# Study System Endpoints

def check_db_configured():
    """Check if database is configured - now always passes with SQLite fallback."""
    pass  # Database is always configured (SQLite fallback if no DATABASE_URL)


@app.post("/api/study/session", response_model=CreateSessionResponse)
async def create_study_session(request: CreateSessionRequest, db: Session = Depends(get_db)):
    """Create a new study session."""
    check_db_configured()

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
async def save_complete_study(request: CompleteStudyRequest, db: Session = Depends(get_db)):
    """Save complete study response data."""
    check_db_configured()

    # Check if already exists
    existing = db.query(StudyCompletedResponse).filter(
        StudyCompletedResponse.session_id == request.session_id
    ).first()

    if existing:
        # Update existing record
        existing.demographics = request.demographics
        existing.accuracy_responses = request.accuracy_responses
        existing.quality_responses = request.quality_responses
        existing.message_orders = request.message_orders
        existing.assigned_interface = request.assigned_interface
        existing.task_results = request.task_results
        existing.sus_responses = request.sus_responses
        existing.sus_score = request.sus_score
        existing.assigned_message = request.assigned_message
        existing.effectiveness_responses = request.effectiveness_responses
        existing.assigned_cases = request.assigned_cases
    else:
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


@app.get("/api/study/results", response_model=StudyResultsResponse)
async def get_study_results(db: Session = Depends(get_db)):
    """Returns anonymized aggregated results."""
    check_db_configured()

    # Get all completed sessions (legacy path)
    sessions = db.query(StudySession).filter(StudySession.completed_at.isnot(None)).all()
    total_sessions = len(sessions)

    # Get completed responses from new unified endpoint
    completed_responses = db.query(StudyCompletedResponse).all()
    completed_responses_count = len(completed_responses)

    # Count by tool version
    by_tool_version = {}
    for session in sessions:
        version = session.tool_version
        by_tool_version[version] = by_tool_version.get(version, 0) + 1

    # Calculate average SUS scores by tool version
    avg_sus_scores = {}
    sus_by_version = {}

    # From legacy UsabilityRating table
    usability_ratings = db.query(UsabilityRating).all()
    for rating in usability_ratings:
        version = rating.tool_version
        if version not in sus_by_version:
            sus_by_version[version] = []
        if rating.sus_score is not None:
            sus_by_version[version].append(rating.sus_score)

    # From completed responses (new format)
    for response in completed_responses:
        version = response.assigned_interface or "unknown"
        if version not in sus_by_version:
            sus_by_version[version] = []
        if response.sus_score is not None:
            sus_by_version[version].append(response.sus_score)

    for version, scores in sus_by_version.items():
        if scores:
            avg_sus_scores[version] = sum(scores) / len(scores)

    # Calculate preference distribution (Message Ratings)
    preference_distribution = {
        "strongly_a": 0,
        "prefer_a": 0,
        "neutral": 0,
        "prefer_b": 0,
        "strongly_b": 0,
    }
    message_ratings = db.query(MessageRating).all()
    for rating in message_ratings:
        if rating.preference is not None:
            if rating.preference <= -2:
                preference_distribution["strongly_a"] += 1
            elif rating.preference == -1:
                preference_distribution["prefer_a"] += 1
            elif rating.preference == 0:
                preference_distribution["neutral"] += 1
            elif rating.preference == 1:
                preference_distribution["prefer_b"] += 1
            else:  # >= 2
                preference_distribution["strongly_b"] += 1

    # Calculate average trust metrics
    trust_metrics = {}
    trust_ratings = db.query(TrustRating).all()
    if trust_ratings:
        trust_metrics["avg_trust_accuracy"] = sum(r.trust_accuracy for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_trust_reliability"] = sum(r.trust_reliability for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_trust_unbiased"] = sum(r.trust_unbiased for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_trust_comprehensive"] = sum(r.trust_comprehensive for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_would_use_routine"] = sum(r.would_use_routine for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_would_use_urgent"] = sum(r.would_use_urgent for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_would_recommend"] = sum(r.would_recommend for r in trust_ratings) / len(trust_ratings)
        trust_metrics["avg_prefer_over_search"] = sum(r.prefer_over_search for r in trust_ratings) / len(trust_ratings)

    return StudyResultsResponse(
        total_sessions=total_sessions,
        completed_responses=completed_responses_count,
        by_tool_version=by_tool_version,
        avg_sus_scores=avg_sus_scores,
        preference_distribution=preference_distribution,
        trust_metrics=trust_metrics,
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

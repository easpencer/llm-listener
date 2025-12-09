"""Database models and connection for Chorus study data."""

import os
from datetime import datetime
from typing import Optional
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, JSON, Float, Boolean, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

DATABASE_URL = os.getenv("DATABASE_URL", "")

# Handle Railway's postgres:// vs postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# If no DATABASE_URL, use SQLite for local development/testing
if not DATABASE_URL:
    # Use SQLite for local development
    import pathlib
    db_path = pathlib.Path(__file__).parent.parent / "study_data.db"
    DATABASE_URL = f"sqlite:///{db_path}"

Base = declarative_base()

# Create engine (now always available with SQLite fallback)
engine = create_engine(
    DATABASE_URL,
    connect_args={"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """Get database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    """Initialize database tables."""
    Base.metadata.create_all(bind=engine)


class StudySession(Base):
    """A single study session (one participant completing the study)."""
    __tablename__ = "study_sessions"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(64), unique=True, index=True)  # UUID
    participant_type = Column(String(50))  # "public_health_official", "general_public", etc.
    created_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)

    # Study version (A/B testing)
    tool_version = Column(String(20))  # "full" or "streamlined"

    # Demographics (optional)
    role = Column(String(100), nullable=True)
    experience_years = Column(Integer, nullable=True)
    organization_type = Column(String(100), nullable=True)

    # Relationships
    queries = relationship("StudyQuery", back_populates="session")
    ratings = relationship("MessageRating", back_populates="session")


class StudyQuery(Base):
    """A query made during the study."""
    __tablename__ = "study_queries"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("study_sessions.id"))
    query_number = Column(Integer)  # Order within session

    # Query details
    topic = Column(String(200))  # The health topic
    query_text = Column(Text)  # The actual query sent
    mode = Column(String(50))  # "public_health" or "health_research"

    # Timing
    started_at = Column(DateTime, default=datetime.utcnow)
    completed_at = Column(DateTime, nullable=True)
    response_time_ms = Column(Integer, nullable=True)

    # Individual model responses (JSON)
    model_responses = Column(JSON)  # {provider: {response, latency_ms}}

    # Synthesized response
    synthesized_response = Column(Text)

    # Relationships
    session = relationship("StudySession", back_populates="queries")


class MessageRating(Base):
    """Expert rating of message quality (Study 2)."""
    __tablename__ = "message_ratings"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("study_sessions.id"))

    # Which case and comparison
    case_number = Column(Integer)  # 1-7 (flu, covid, bird flu, etc.)
    case_topic = Column(String(200))

    # Messages being compared (blinded)
    message_a_source = Column(String(50))  # "chorus" or "cdc" (unblinded for analysis)
    message_b_source = Column(String(50))
    message_a_text = Column(Text)
    message_b_text = Column(Text)

    # Ratings for Message A (1-5 scale)
    a_clarity = Column(Integer, nullable=True)
    a_accuracy = Column(Integer, nullable=True)
    a_actionability = Column(Integer, nullable=True)
    a_cultural_sensitivity = Column(Integer, nullable=True)
    a_persuasiveness = Column(Integer, nullable=True)
    a_addresses_concerns = Column(Integer, nullable=True)

    # Ratings for Message B (1-5 scale)
    b_clarity = Column(Integer, nullable=True)
    b_accuracy = Column(Integer, nullable=True)
    b_actionability = Column(Integer, nullable=True)
    b_cultural_sensitivity = Column(Integer, nullable=True)
    b_persuasiveness = Column(Integer, nullable=True)
    b_addresses_concerns = Column(Integer, nullable=True)

    # Overall preference (-2 to +2: strongly A to strongly B)
    preference = Column(Integer, nullable=True)

    # Comments
    comments = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    # Relationships
    session = relationship("StudySession", back_populates="ratings")


class ContentAccuracyRating(Base):
    """Expert rating of AI response accuracy (Study 1)."""
    __tablename__ = "content_accuracy_ratings"

    id = Column(Integer, primary_key=True, index=True)

    # Reviewer info
    reviewer_id = Column(String(64))
    expertise_area = Column(String(200))

    # Query being rated
    query_id = Column(Integer, ForeignKey("study_queries.id"), nullable=True)
    topic = Column(String(200))
    query_text = Column(Text)

    # Which provider's response
    provider = Column(String(50))  # "openai", "anthropic", "gemini", "grok", "ollama", "synthesized"
    response_text = Column(Text)

    # Accuracy ratings (1-5 scale)
    factual_accuracy = Column(Integer)
    completeness = Column(Integer)
    source_quality = Column(Integer)
    clinical_relevance = Column(Integer)
    up_to_date = Column(Integer)

    # Overall
    overall_accuracy = Column(Integer)
    would_recommend = Column(Boolean)

    # Specific issues found
    errors_found = Column(Text, nullable=True)
    missing_info = Column(Text, nullable=True)
    comments = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)


class UsabilityRating(Base):
    """System Usability Scale (SUS) and task completion (Study 3)."""
    __tablename__ = "usability_ratings"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("study_sessions.id"))

    # Tool version tested
    tool_version = Column(String(20))  # "full" or "streamlined"

    # Task completion
    tasks_completed = Column(Integer)
    tasks_total = Column(Integer)
    total_time_seconds = Column(Integer)

    # SUS questions (1-5 scale, strongly disagree to strongly agree)
    sus_1_use_frequently = Column(Integer)
    sus_2_unnecessarily_complex = Column(Integer)
    sus_3_easy_to_use = Column(Integer)
    sus_4_need_tech_support = Column(Integer)
    sus_5_well_integrated = Column(Integer)
    sus_6_too_much_inconsistency = Column(Integer)
    sus_7_learn_quickly = Column(Integer)
    sus_8_cumbersome = Column(Integer)
    sus_9_confident = Column(Integer)
    sus_10_learn_before_use = Column(Integer)

    # Calculated SUS score (0-100)
    sus_score = Column(Float, nullable=True)

    # Additional feedback
    most_useful_feature = Column(Text, nullable=True)
    most_confusing = Column(Text, nullable=True)
    suggestions = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)


class TrustRating(Base):
    """Trust and adoption likelihood (Study 4)."""
    __tablename__ = "trust_ratings"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(Integer, ForeignKey("study_sessions.id"))

    # Trust dimensions (1-7 scale)
    trust_accuracy = Column(Integer)  # I trust the accuracy of information
    trust_reliability = Column(Integer)  # The tool provides reliable information
    trust_unbiased = Column(Integer)  # The information is unbiased
    trust_comprehensive = Column(Integer)  # The tool covers important aspects

    # Adoption likelihood (1-7 scale)
    would_use_routine = Column(Integer)  # Would use for routine questions
    would_use_urgent = Column(Integer)  # Would use for time-sensitive situations
    would_recommend = Column(Integer)  # Would recommend to colleagues
    prefer_over_search = Column(Integer)  # Prefer this over web search

    # Concerns (multi-select, stored as JSON array)
    concerns = Column(JSON)  # ["accuracy", "privacy", "speed", etc.]

    # Open feedback
    trust_comments = Column(Text, nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)


class StudyCompletedResponse(Base):
    """Complete study response data - stores all phases as JSON."""
    __tablename__ = "study_completed_responses"

    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String(64), unique=True, index=True)  # UUID from frontend

    # Demographics
    demographics = Column(JSON)  # {role, experience, orgType, expertiseArea}

    # Phase 1: Content Accuracy - ratings for each AI provider per case
    accuracy_responses = Column(JSON)  # {case_num: {provider: {dimension: rating}}}

    # Phase 2: Message Quality - A/B comparison ratings
    quality_responses = Column(JSON)  # {case_num: {A: {ratings}, B: {ratings}, preference}}
    message_orders = Column(JSON)  # {case_num: ["chorus", "cdc"] or ["cdc", "chorus"]}

    # Phase 3: Usability
    assigned_interface = Column(String(20))  # "brief" or "detailed"
    task_results = Column(JSON)  # [{task, query, timeSpent, rating, interface}]
    sus_responses = Column(JSON)  # [1-5 for each of 10 SUS questions]
    sus_score = Column(Float)  # Calculated 0-100 score

    # Phase 4: Message Effectiveness
    assigned_message = Column(String(20))  # "chorus" or "cdc"
    effectiveness_responses = Column(JSON)  # {baseline, post_* questions}

    # Metadata
    assigned_cases = Column(JSON)  # Which 3 of 7 cases were assigned [0, 2, 5]
    created_at = Column(DateTime, default=datetime.utcnow)

"""Core functionality for LLM Listener."""

from .agreement import AgreementAnalyzer, AgreementMetrics
from .config import Settings
from .orchestrator import LLMOrchestrator
from .reconciler import ResponseReconciler
from .discordance import (
    DiscordanceAnalyzer,
    DiscordanceResult,
    SourcePosition,
    Stance,
)
from .conflicts import ConflictDetector, SourceConflict, ConflictReport

__all__ = [
    "AgreementAnalyzer",
    "AgreementMetrics",
    "Settings",
    "LLMOrchestrator",
    "ResponseReconciler",
    "DiscordanceAnalyzer",
    "DiscordanceResult",
    "SourcePosition",
    "Stance",
    "ConflictDetector",
    "SourceConflict",
    "ConflictReport",
]

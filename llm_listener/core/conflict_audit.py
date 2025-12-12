"""
Audit logging system for conflict detection and analysis.

This module provides comprehensive audit logging for all conflict detection
decisions, analysis results, and settings used. It enables:
- Detailed tracking of conflict detection decisions
- Historical analysis of conflict patterns
- Debugging and transparency of conflict analysis
- Privacy-aware logging with configurable question hashing
- Thread-safe operations for concurrent use
- File-based storage in JSON Lines format for easy querying
"""

import hashlib
import json
import os
import threading
import time
import uuid
from dataclasses import asdict, dataclass
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional, Union

from .conflict_settings import ConflictSettings


@dataclass
class AuditRecord:
    """Individual audit record for a conflict analysis operation.

    Attributes:
        audit_id: Unique identifier for this audit entry
        timestamp: ISO format timestamp of when analysis occurred
        question: Original question (or hash if privacy mode enabled)
        question_hash: SHA-256 hash of question for privacy-aware tracking
        conflict_settings: Settings used during conflict detection
        has_conflicts: Whether conflicts were detected
        conflict_severity: Severity level of detected conflicts
        is_emerging_topic: Whether topic was flagged as emerging
        agreement_level: Overall agreement level (0.0-1.0)
        detection_time_ms: Time taken for detection in milliseconds
        source_counts: Count of sources by type (guidelines, literature, ai_responses)
        decision_trail: List of decision points with reasoning
    """

    audit_id: str
    timestamp: str
    question: str
    question_hash: str
    conflict_settings: Dict[str, Any]
    has_conflicts: bool
    conflict_severity: str
    is_emerging_topic: bool
    agreement_level: float
    detection_time_ms: int
    source_counts: Dict[str, int]
    decision_trail: List[Dict[str, Any]]


class ConflictAuditLogger:
    """Thread-safe audit logging system for conflict detection.

    This class provides comprehensive audit logging for conflict detection
    operations. It logs all analysis decisions, settings, and results to
    JSON Lines files for easy querying and analysis.

    Features:
    - Thread-safe concurrent logging
    - Privacy-aware question handling (hash vs full text)
    - Automatic file rotation by date
    - Efficient JSONL storage format
    - Rich querying capabilities
    - Export functionality for analysis

    The logger stores one audit record per line in JSONL format, with
    automatic file rotation by date. This enables efficient searching,
    filtering, and analysis of historical conflict detection operations.

    Example:
        >>> logger = ConflictAuditLogger()
        >>> audit_id = logger.log_analysis(
        ...     question="Is treatment X safe?",
        ...     analysis_result=result,
        ...     settings=settings
        ... )
        >>> trail = logger.get_audit_trail(audit_id)
        >>> recent = logger.get_recent_audits(limit=10)
    """

    def __init__(
        self,
        log_dir: Optional[str] = None,
        enable_file_logging: bool = True,
        hash_questions: bool = False
    ):
        """Initialize the conflict audit logger.

        Args:
            log_dir: Directory for audit log files. Defaults to
                /Users/eliah/llm-listener/logs/conflict_audits/
            enable_file_logging: Whether to write logs to disk. If False,
                logs are only kept in memory (useful for testing)
            hash_questions: Whether to hash questions for privacy. If True,
                only SHA-256 hash is stored, not full question text
        """
        # Set default log directory
        if log_dir is None:
            log_dir = "/Users/eliah/llm-listener/logs/conflict_audits/"

        self.log_dir = Path(log_dir)
        self.enable_file_logging = enable_file_logging
        self.hash_questions = hash_questions

        # Create log directory if it doesn't exist
        if self.enable_file_logging:
            self.log_dir.mkdir(parents=True, exist_ok=True)

        # Thread safety
        self._lock = threading.RLock()

        # In-memory cache of recent audits (last 1000)
        self._memory_cache: List[AuditRecord] = []
        self._max_cache_size = 1000

    def log_analysis(
        self,
        question: str,
        analysis_result: Any,
        settings: Union[ConflictSettings, Dict[str, Any]],
        detection_time_ms: Optional[int] = None
    ) -> str:
        """Log a conflict analysis operation and return audit ID.

        This method creates a comprehensive audit record for a conflict
        analysis operation, including all settings, results, and decision
        trail. The record is written to disk (if enabled) and cached in memory.

        Args:
            question: The original question being analyzed
            analysis_result: ConflictAnalysisResult object or compatible dict
            settings: ConflictSettings object or dict of settings used
            detection_time_ms: Time taken for detection in milliseconds.
                If not provided, will be calculated from analysis timestamps

        Returns:
            The unique audit_id for this record

        Example:
            >>> audit_id = logger.log_analysis(
            ...     question="What is the treatment for condition X?",
            ...     analysis_result=conflict_analysis_result,
            ...     settings=conflict_settings,
            ...     detection_time_ms=450
            ... )
        """
        with self._lock:
            # Generate unique audit ID
            audit_id = str(uuid.uuid4())

            # Create timestamp
            timestamp = datetime.utcnow().isoformat() + "Z"

            # Hash question for privacy tracking
            question_hash = hashlib.sha256(question.encode('utf-8')).hexdigest()

            # Use hash instead of full question if privacy mode enabled
            stored_question = question_hash if self.hash_questions else question

            # Convert settings to dict if needed
            if isinstance(settings, ConflictSettings):
                settings_dict = settings.to_dict()
            else:
                settings_dict = dict(settings)

            # Extract analysis result fields
            has_conflicts = getattr(analysis_result, 'has_conflicts', False)
            conflict_severity = getattr(analysis_result, 'conflict_severity', 'none')
            is_emerging_topic = getattr(analysis_result, 'is_emerging_topic', False)

            # Calculate agreement level from analysis result
            agreement_level = self._extract_agreement_level(analysis_result)

            # Extract source counts
            source_counts = self._extract_source_counts(analysis_result)

            # Extract decision trail from audit log
            decision_trail = self._extract_decision_trail(analysis_result)

            # Calculate detection time if not provided
            if detection_time_ms is None:
                detection_time_ms = self._calculate_detection_time(decision_trail)

            # Create audit record
            record = AuditRecord(
                audit_id=audit_id,
                timestamp=timestamp,
                question=stored_question,
                question_hash=question_hash,
                conflict_settings=settings_dict,
                has_conflicts=has_conflicts,
                conflict_severity=conflict_severity,
                is_emerging_topic=is_emerging_topic,
                agreement_level=agreement_level,
                detection_time_ms=detection_time_ms,
                source_counts=source_counts,
                decision_trail=decision_trail
            )

            # Add to memory cache
            self._add_to_cache(record)

            # Write to file if enabled
            if self.enable_file_logging:
                self._write_to_file(record)

            return audit_id

    def get_audit_trail(self, audit_id: str) -> Optional[Dict[str, Any]]:
        """Retrieve the complete audit trail for a specific audit ID.

        Searches both memory cache and disk files to find the audit record
        matching the provided audit_id.

        Args:
            audit_id: The unique audit ID to retrieve

        Returns:
            Dictionary containing the full audit record, or None if not found

        Example:
            >>> trail = logger.get_audit_trail("abc-123-def-456")
            >>> if trail:
            ...     print(f"Conflicts: {trail['has_conflicts']}")
            ...     print(f"Severity: {trail['conflict_severity']}")
        """
        with self._lock:
            # First check memory cache
            for record in self._memory_cache:
                if record.audit_id == audit_id:
                    return asdict(record)

            # If not in cache and file logging is enabled, search files
            if self.enable_file_logging:
                return self._search_files_for_audit(audit_id)

            return None

    def get_recent_audits(
        self,
        limit: int = 100,
        has_conflicts: Optional[bool] = None,
        min_severity: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Retrieve recent audit records with optional filtering.

        Returns the most recent audit records, optionally filtered by
        conflict status or minimum severity level.

        Args:
            limit: Maximum number of records to return (default 100)
            has_conflicts: If provided, filter to only records with this
                conflict status (True = only conflicts, False = only non-conflicts)
            min_severity: If provided, filter to only records at or above this
                severity level ("minor", "moderate", "significant")

        Returns:
            List of audit record dictionaries, newest first

        Example:
            >>> # Get 10 most recent analyses with conflicts
            >>> conflicts = logger.get_recent_audits(
            ...     limit=10,
            ...     has_conflicts=True
            ... )
            >>>
            >>> # Get moderate or higher severity conflicts
            >>> severe = logger.get_recent_audits(
            ...     limit=50,
            ...     min_severity="moderate"
            ... )
        """
        with self._lock:
            severity_order = {"none": 0, "minor": 1, "moderate": 2, "significant": 3}
            min_severity_level = severity_order.get(min_severity, 0) if min_severity else 0

            # Start with memory cache (already in reverse chronological order)
            results = []

            for record in reversed(self._memory_cache):
                # Apply filters
                if has_conflicts is not None and record.has_conflicts != has_conflicts:
                    continue

                if min_severity and severity_order.get(record.conflict_severity, 0) < min_severity_level:
                    continue

                results.append(asdict(record))

                if len(results) >= limit:
                    break

            # If we need more results and file logging is enabled, search files
            if len(results) < limit and self.enable_file_logging:
                additional = self._search_files_recent(
                    limit - len(results),
                    has_conflicts=has_conflicts,
                    min_severity=min_severity
                )
                results.extend(additional)

            return results[:limit]

    def export_audits(
        self,
        start_date: str,
        end_date: str,
        format: str = 'json',
        output_path: Optional[str] = None
    ) -> str:
        """Export audit records within a date range to a file.

        Exports all audit records between start_date and end_date (inclusive)
        to a single file in the specified format.

        Args:
            start_date: Start date in ISO format (YYYY-MM-DD)
            end_date: End date in ISO format (YYYY-MM-DD)
            format: Output format - "json" for JSON array, "jsonl" for JSON Lines
            output_path: Path for output file. If not provided, generates
                a default path in the log directory

        Returns:
            Path to the exported file

        Example:
            >>> # Export all audits from December 2024
            >>> path = logger.export_audits(
            ...     start_date="2024-12-01",
            ...     end_date="2024-12-31",
            ...     format="json"
            ... )
            >>> print(f"Exported to {path}")

        Raises:
            ValueError: If date format is invalid or end_date < start_date
            IOError: If export file cannot be written
        """
        with self._lock:
            # Parse dates
            try:
                start_dt = datetime.fromisoformat(start_date)
                end_dt = datetime.fromisoformat(end_date)
            except ValueError as e:
                raise ValueError(f"Invalid date format: {e}. Use YYYY-MM-DD format.")

            if end_dt < start_dt:
                raise ValueError("end_date must be >= start_date")

            # Generate output path if not provided
            if output_path is None:
                filename = f"conflict_audit_export_{start_date}_to_{end_date}.{format}"
                output_path = str(self.log_dir / filename)

            # Collect records in date range
            records = []

            # Search memory cache
            for record in self._memory_cache:
                record_dt = datetime.fromisoformat(record.timestamp.rstrip('Z'))
                if start_dt <= record_dt <= end_dt:
                    records.append(asdict(record))

            # Search file logs if enabled
            if self.enable_file_logging:
                file_records = self._search_files_date_range(start_dt, end_dt)

                # Deduplicate by audit_id (prefer memory cache version)
                existing_ids = {r['audit_id'] for r in records}
                for fr in file_records:
                    if fr['audit_id'] not in existing_ids:
                        records.append(fr)
                        existing_ids.add(fr['audit_id'])

            # Sort by timestamp (oldest first for export)
            records.sort(key=lambda r: r['timestamp'])

            # Write to output file
            output_path_obj = Path(output_path)
            output_path_obj.parent.mkdir(parents=True, exist_ok=True)

            with open(output_path_obj, 'w', encoding='utf-8') as f:
                if format == 'json':
                    json.dump(records, f, indent=2, ensure_ascii=False)
                elif format == 'jsonl':
                    for record in records:
                        f.write(json.dumps(record, ensure_ascii=False) + '\n')
                else:
                    raise ValueError(f"Unsupported format: {format}. Use 'json' or 'jsonl'.")

            return str(output_path_obj)

    def get_statistics(
        self,
        start_date: Optional[str] = None,
        end_date: Optional[str] = None
    ) -> Dict[str, Any]:
        """Get statistical summary of audit records.

        Provides aggregated statistics about conflict detection operations,
        optionally filtered by date range.

        Args:
            start_date: Optional start date in ISO format (YYYY-MM-DD)
            end_date: Optional end date in ISO format (YYYY-MM-DD)

        Returns:
            Dictionary containing statistics:
                - total_analyses: Total number of analyses
                - conflict_rate: Percentage of analyses with conflicts
                - severity_distribution: Count by severity level
                - emerging_topic_rate: Percentage flagged as emerging
                - avg_agreement_level: Average agreement level
                - avg_detection_time_ms: Average detection time
                - source_count_stats: Statistics on source counts

        Example:
            >>> stats = logger.get_statistics(
            ...     start_date="2024-12-01",
            ...     end_date="2024-12-31"
            ... )
            >>> print(f"Conflict rate: {stats['conflict_rate']:.1%}")
        """
        with self._lock:
            # Get records in date range
            if start_date or end_date:
                start_dt = datetime.fromisoformat(start_date) if start_date else datetime.min
                end_dt = datetime.fromisoformat(end_date) if end_date else datetime.max

                records = [
                    r for r in self._memory_cache
                    if start_dt <= datetime.fromisoformat(r.timestamp.rstrip('Z')) <= end_dt
                ]
            else:
                records = self._memory_cache

            if not records:
                return {
                    'total_analyses': 0,
                    'conflict_rate': 0.0,
                    'severity_distribution': {},
                    'emerging_topic_rate': 0.0,
                    'avg_agreement_level': 0.0,
                    'avg_detection_time_ms': 0,
                    'source_count_stats': {}
                }

            # Calculate statistics
            total = len(records)
            conflicts = sum(1 for r in records if r.has_conflicts)
            emerging = sum(1 for r in records if r.is_emerging_topic)

            severity_dist = {}
            for r in records:
                severity_dist[r.conflict_severity] = severity_dist.get(r.conflict_severity, 0) + 1

            avg_agreement = sum(r.agreement_level for r in records) / total
            avg_time = sum(r.detection_time_ms for r in records) / total

            # Source count statistics
            all_source_counts = [r.source_counts for r in records]
            source_stats = {}
            for source_type in ['guidelines', 'literature', 'ai_responses']:
                counts = [sc.get(source_type, 0) for sc in all_source_counts]
                if counts:
                    source_stats[source_type] = {
                        'avg': sum(counts) / len(counts),
                        'min': min(counts),
                        'max': max(counts)
                    }

            return {
                'total_analyses': total,
                'conflict_rate': conflicts / total if total > 0 else 0.0,
                'severity_distribution': severity_dist,
                'emerging_topic_rate': emerging / total if total > 0 else 0.0,
                'avg_agreement_level': avg_agreement,
                'avg_detection_time_ms': int(avg_time),
                'source_count_stats': source_stats
            }

    # Private helper methods

    def _add_to_cache(self, record: AuditRecord) -> None:
        """Add record to in-memory cache with size limit."""
        self._memory_cache.append(record)

        # Trim cache if too large (remove oldest)
        if len(self._memory_cache) > self._max_cache_size:
            self._memory_cache = self._memory_cache[-self._max_cache_size:]

    def _write_to_file(self, record: AuditRecord) -> None:
        """Write audit record to daily log file in JSONL format.

        Files are named: conflict_audit_YYYYMMDD.jsonl
        Each record is one line of JSON for efficient searching.
        """
        # Determine filename based on date
        record_date = datetime.fromisoformat(record.timestamp.rstrip('Z'))
        filename = f"conflict_audit_{record_date.strftime('%Y%m%d')}.jsonl"
        filepath = self.log_dir / filename

        # Append record as single JSON line
        try:
            with open(filepath, 'a', encoding='utf-8') as f:
                f.write(json.dumps(asdict(record), ensure_ascii=False) + '\n')
        except IOError as e:
            # Log error but don't fail the operation
            print(f"Warning: Failed to write audit log to {filepath}: {e}")

    def _extract_agreement_level(self, analysis_result: Any) -> float:
        """Extract agreement level from analysis result."""
        # Try to get from agreement_metrics first
        if hasattr(analysis_result, 'agreement_metrics'):
            if hasattr(analysis_result.agreement_metrics, 'overall_agreement'):
                return float(analysis_result.agreement_metrics.overall_agreement)

        # Try discordance_result
        if hasattr(analysis_result, 'discordance_result'):
            if hasattr(analysis_result.discordance_result, 'agreement_level'):
                return float(analysis_result.discordance_result.agreement_level)

        # Default to 0.0 if not found
        return 0.0

    def _extract_source_counts(self, analysis_result: Any) -> Dict[str, int]:
        """Extract source counts from analysis result."""
        counts = {
            'guidelines': 0,
            'literature': 0,
            'ai_responses': 0
        }

        # Try to extract from conflict_report
        if hasattr(analysis_result, 'conflict_report'):
            report = analysis_result.conflict_report

            # Count unique sources mentioned in source positions
            if hasattr(report, 'source_positions'):
                for pos in report.source_positions:
                    source_name = getattr(pos, 'source_name', '').lower()
                    if 'guideline' in source_name or 'guidance' in source_name:
                        counts['guidelines'] += 1
                    elif 'literature' in source_name or 'scholar' in source_name:
                        counts['literature'] += 1

        # Count AI responses from agreement_metrics
        if hasattr(analysis_result, 'agreement_metrics'):
            metrics = analysis_result.agreement_metrics
            if hasattr(metrics, 'stance_alignment'):
                counts['ai_responses'] = len(metrics.stance_alignment)

        return counts

    def _extract_decision_trail(self, analysis_result: Any) -> List[Dict[str, Any]]:
        """Extract decision trail from analysis result's audit log."""
        if hasattr(analysis_result, 'audit_log'):
            return list(analysis_result.audit_log)
        return []

    def _calculate_detection_time(self, decision_trail: List[Dict[str, Any]]) -> int:
        """Calculate detection time from decision trail timestamps."""
        if not decision_trail or len(decision_trail) < 2:
            return 0

        try:
            start_time = datetime.fromisoformat(decision_trail[0]['timestamp'])
            end_time = datetime.fromisoformat(decision_trail[-1]['timestamp'])
            delta = end_time - start_time
            return int(delta.total_seconds() * 1000)  # Convert to milliseconds
        except (KeyError, ValueError, IndexError):
            return 0

    def _search_files_for_audit(self, audit_id: str) -> Optional[Dict[str, Any]]:
        """Search JSONL files for a specific audit ID."""
        # Get all log files
        log_files = sorted(self.log_dir.glob("conflict_audit_*.jsonl"))

        # Search newest to oldest
        for log_file in reversed(log_files):
            try:
                with open(log_file, 'r', encoding='utf-8') as f:
                    for line in f:
                        if not line.strip():
                            continue
                        try:
                            record = json.loads(line)
                            if record.get('audit_id') == audit_id:
                                return record
                        except json.JSONDecodeError:
                            continue
            except IOError:
                continue

        return None

    def _search_files_recent(
        self,
        limit: int,
        has_conflicts: Optional[bool] = None,
        min_severity: Optional[str] = None
    ) -> List[Dict[str, Any]]:
        """Search files for recent audits matching criteria."""
        severity_order = {"none": 0, "minor": 1, "moderate": 2, "significant": 3}
        min_severity_level = severity_order.get(min_severity, 0) if min_severity else 0

        results = []

        # Get all log files, newest first
        log_files = sorted(self.log_dir.glob("conflict_audit_*.jsonl"), reverse=True)

        for log_file in log_files:
            if len(results) >= limit:
                break

            # Read file in reverse order (newest entries at end)
            try:
                with open(log_file, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                for line in reversed(lines):
                    if len(results) >= limit:
                        break

                    if not line.strip():
                        continue

                    try:
                        record = json.loads(line)

                        # Apply filters
                        if has_conflicts is not None and record.get('has_conflicts') != has_conflicts:
                            continue

                        if min_severity:
                            record_severity = severity_order.get(record.get('conflict_severity', 'none'), 0)
                            if record_severity < min_severity_level:
                                continue

                        results.append(record)
                    except json.JSONDecodeError:
                        continue
            except IOError:
                continue

        return results

    def _search_files_date_range(
        self,
        start_dt: datetime,
        end_dt: datetime
    ) -> List[Dict[str, Any]]:
        """Search files for audits within a date range."""
        results = []

        # Generate list of dates to search
        current_date = start_dt.date()
        end_date = end_dt.date()

        while current_date <= end_date:
            filename = f"conflict_audit_{current_date.strftime('%Y%m%d')}.jsonl"
            filepath = self.log_dir / filename

            if filepath.exists():
                try:
                    with open(filepath, 'r', encoding='utf-8') as f:
                        for line in f:
                            if not line.strip():
                                continue

                            try:
                                record = json.loads(line)
                                record_dt = datetime.fromisoformat(record['timestamp'].rstrip('Z'))

                                if start_dt <= record_dt <= end_dt:
                                    results.append(record)
                            except (json.JSONDecodeError, KeyError, ValueError):
                                continue
                except IOError:
                    pass

            # Move to next day
            current_date += timedelta(days=1)

        return results

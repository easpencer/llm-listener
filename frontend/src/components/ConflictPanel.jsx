import { useState } from 'react';

/**
 * ConflictPanel - Display conflict analysis results from multi-source queries
 *
 * Shows when sources disagree, the severity of conflicts, and provides context
 * for understanding divergent information across multiple providers/sources.
 *
 * @typedef {Object} ConflictAnalysis
 * @property {boolean} has_conflicts - Whether conflicts were detected
 * @property {'none'|'minor'|'moderate'|'significant'} conflict_severity - Severity level
 * @property {boolean} is_emerging_topic - Whether this is an emerging topic
 * @property {string} [emerging_topic_reason] - Explanation for emerging topic designation
 * @property {boolean} requires_resolution - Whether conflicts need resolution
 * @property {string} [resolution_context] - Context for resolving conflicts
 * @property {number} [agreement_level] - Agreement percentage (0-100)
 * @property {string[]} areas_of_disagreement - List of conflicting areas
 * @property {Array<{timestamp: string, decision_type: string, details: any}>} audit_log - Conflict detection audit trail
 *
 * @typedef {Object} ConflictPanelProps
 * @property {ConflictAnalysis|null} analysis - The conflict analysis data
 * @property {boolean} [isLoading] - Whether data is currently loading
 * @property {boolean} [showAuditLog] - Whether to show the audit log section
 */

/**
 * Get color and label for conflict severity level
 * @param {'none'|'minor'|'moderate'|'significant'} severity
 * @returns {{color: string, bgColor: string, label: string, emoji: string}}
 */
const getSeverityStyle = (severity) => {
  const styles = {
    none: {
      color: '#10b981',
      bgColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      label: 'No Conflicts',
      emoji: '✓'
    },
    minor: {
      color: '#fbbf24',
      bgColor: 'rgba(251, 191, 36, 0.1)',
      borderColor: 'rgba(251, 191, 36, 0.3)',
      label: 'Minor Conflicts',
      emoji: '⚠'
    },
    moderate: {
      color: '#f97316',
      bgColor: 'rgba(249, 115, 22, 0.1)',
      borderColor: 'rgba(249, 115, 22, 0.3)',
      label: 'Moderate Conflicts',
      emoji: '⚠'
    },
    significant: {
      color: '#ef4444',
      bgColor: 'rgba(239, 68, 68, 0.1)',
      borderColor: 'rgba(239, 68, 68, 0.3)',
      label: 'Significant Conflicts',
      emoji: '✕'
    }
  };
  return styles[severity] || styles.none;
};

/**
 * Format timestamp for display
 * @param {string} timestamp - ISO timestamp
 * @returns {string} Formatted time
 */
const formatTimestamp = (timestamp) => {
  try {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return timestamp;
  }
};

/**
 * ConflictPanel Component
 *
 * A collapsible panel that displays conflict analysis results from multi-source
 * information queries. Helps users understand when and why sources disagree.
 *
 * @param {ConflictPanelProps} props
 */
export function ConflictPanel({
  analysis,
  isLoading = false,
  showAuditLog = false
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAuditExpanded, setIsAuditExpanded] = useState(false);

  // Loading state
  if (isLoading) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(148, 163, 184, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)',
        marginTop: '16px',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: '#94a3b8',
        }}>
          <div style={{
            width: '20px',
            height: '20px',
            border: '3px solid rgba(148, 163, 184, 0.3)',
            borderTopColor: '#94a3b8',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
          }} />
          <span style={{ fontSize: '14px' }}>Analyzing conflicts...</span>
        </div>
      </div>
    );
  }

  // No analysis data
  if (!analysis) {
    return null;
  }

  const severity = analysis.conflict_severity || 'none';
  const severityStyle = getSeverityStyle(severity);
  const agreementLevel = analysis.agreement_level ?? null;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(15, 23, 42, 0.98) 100%)',
      borderRadius: '16px',
      padding: '20px',
      border: `1px solid ${severityStyle.borderColor}`,
      boxShadow: `0 8px 32px ${severityStyle.bgColor}`,
      marginTop: '16px',
    }}>
      {/* Header - Always visible */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          userSelect: 'none',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <h4 style={{
            fontSize: '0.9rem',
            fontWeight: '600',
            color: '#e2e8f0',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Conflict Analysis
          </h4>

          {/* Severity Badge */}
          <div style={{
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            letterSpacing: '0.02em',
            color: severityStyle.color,
            backgroundColor: severityStyle.bgColor,
            border: `1px solid ${severityStyle.borderColor}`,
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <span>{severityStyle.emoji}</span>
            <span>{severityStyle.label}</span>
          </div>

          {/* Emerging Topic Badge */}
          {analysis.is_emerging_topic && (
            <div
              style={{
                padding: '4px 12px',
                borderRadius: '20px',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#8b5cf6',
                backgroundColor: 'rgba(139, 92, 246, 0.1)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
              title={analysis.emerging_topic_reason || 'Emerging or rapidly evolving topic'}
            >
              <span>🔬</span>
              <span>Emerging Topic</span>
            </div>
          )}
        </div>

        {/* Expand/Collapse Icon */}
        <div style={{
          fontSize: '18px',
          color: '#94a3b8',
          transition: 'transform 0.2s ease',
          transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
        }}>
          ▼
        </div>
      </div>

      {/* Agreement Level Bar - Always visible if available */}
      {agreementLevel !== null && (
        <div style={{ marginTop: '16px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '8px',
          }}>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '500' }}>
              Agreement Level
            </span>
            <span style={{ fontSize: '0.875rem', color: '#e2e8f0', fontWeight: '600' }}>
              {Math.round(agreementLevel)}%
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'rgba(148, 163, 184, 0.15)',
            borderRadius: '4px',
            overflow: 'hidden',
          }}>
            <div style={{
              width: `${agreementLevel}%`,
              height: '100%',
              backgroundColor: agreementLevel >= 70 ? '#10b981' :
                             agreementLevel >= 40 ? '#f59e0b' : '#ef4444',
              transition: 'width 0.3s ease',
              borderRadius: '4px',
            }} />
          </div>
        </div>
      )}

      {/* Expandable Content */}
      {isExpanded && (
        <div style={{ marginTop: '20px' }}>
          {/* Emerging Topic Reason */}
          {analysis.is_emerging_topic && analysis.emerging_topic_reason && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(139, 92, 246, 0.05)',
              border: '1px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '8px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#8b5cf6',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Why This Is Emerging
              </div>
              <div style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                {analysis.emerging_topic_reason}
              </div>
            </div>
          )}

          {/* Areas of Disagreement */}
          {analysis.areas_of_disagreement && analysis.areas_of_disagreement.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#94a3b8',
                marginBottom: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Areas of Disagreement
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {analysis.areas_of_disagreement.map((area, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '10px 12px',
                      backgroundColor: 'rgba(239, 68, 68, 0.05)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      color: '#fca5a5',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                    }}
                  >
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>•</span>
                    <span style={{ lineHeight: '1.5' }}>{area}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resolution Context */}
          {analysis.requires_resolution && analysis.resolution_context && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(59, 130, 246, 0.05)',
              border: '1px solid rgba(59, 130, 246, 0.2)',
              borderRadius: '8px',
              marginBottom: '16px',
            }}>
              <div style={{
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#60a5fa',
                marginBottom: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>
                Resolution Context
              </div>
              <div style={{ fontSize: '0.875rem', color: '#cbd5e1', lineHeight: '1.5' }}>
                {analysis.resolution_context}
              </div>
            </div>
          )}

          {/* Audit Log Section */}
          {showAuditLog && analysis.audit_log && analysis.audit_log.length > 0 && (
            <div style={{
              borderTop: '1px solid rgba(148, 163, 184, 0.15)',
              paddingTop: '16px',
              marginTop: '16px',
            }}>
              <div
                onClick={() => setIsAuditExpanded(!isAuditExpanded)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  userSelect: 'none',
                  marginBottom: isAuditExpanded ? '12px' : 0,
                }}
              >
                <div style={{
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  Audit Log ({analysis.audit_log.length})
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#94a3b8',
                  transition: 'transform 0.2s ease',
                  transform: isAuditExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}>
                  ▼
                </div>
              </div>

              {isAuditExpanded && (
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  maxHeight: '300px',
                  overflowY: 'auto',
                }}>
                  {analysis.audit_log.map((entry, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '10px 12px',
                        backgroundColor: 'rgba(148, 163, 184, 0.05)',
                        border: '1px solid rgba(148, 163, 184, 0.15)',
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '6px',
                      }}>
                        <span style={{ color: '#94a3b8', fontWeight: '600' }}>
                          {entry.decision_type}
                        </span>
                        <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                          {formatTimestamp(entry.timestamp)}
                        </span>
                      </div>
                      {entry.details && (
                        <div style={{
                          color: '#cbd5e1',
                          fontSize: '0.75rem',
                          fontFamily: 'monospace',
                          whiteSpace: 'pre-wrap',
                          wordBreak: 'break-word',
                        }}>
                          {typeof entry.details === 'string'
                            ? entry.details
                            : JSON.stringify(entry.details, null, 2)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* No conflicts message */}
          {!analysis.has_conflicts &&
           (!analysis.areas_of_disagreement || analysis.areas_of_disagreement.length === 0) && (
            <div style={{
              padding: '16px',
              textAlign: 'center',
              color: '#10b981',
              fontSize: '0.875rem',
            }}>
              All sources are in agreement on this topic.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Add keyframes for loading spinner animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

export default ConflictPanel;

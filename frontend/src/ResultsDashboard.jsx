import { useState, useEffect } from 'react'

// Helper function to calculate SUS score
function calculateSUSScore(responses) {
  // SUS scoring: odd items subtract 1, even items subtract from 5
  let score = 0
  responses.forEach((response, index) => {
    if (index % 2 === 0) {
      // Odd questions (0-indexed even): subtract 1
      score += response - 1
    } else {
      // Even questions (0-indexed odd): 5 - response
      score += 5 - response
    }
  })
  // Multiply by 2.5 to get 0-100 scale
  return score * 2.5
}

// Helper function to interpret SUS score
function getSUSInterpretation(score) {
  if (score >= 85) return { label: 'Excellent', color: '#10b981' }
  if (score >= 70) return { label: 'Acceptable', color: '#3b82f6' }
  if (score >= 50) return { label: 'Marginal', color: '#f59e0b' }
  return { label: 'Not Acceptable', color: '#ef4444' }
}

// Main Dashboard Component
export default function ResultsDashboard() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const fetchResults = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/study/results')

      if (!response.ok) {
        throw new Error('Failed to fetch results')
      }

      const data = await response.json()
      setResults(data)
      setError(null)
      setLastRefresh(new Date())
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchResults()

    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchResults, 30000)
    return () => clearInterval(interval)
  }, [])

  if (loading && !results) {
    return (
      <div className="results-dashboard">
        <div className="results-loading">
          <div className="results-spinner"></div>
          <p>Loading study results...</p>
        </div>
      </div>
    )
  }

  if (error && !results) {
    return (
      <div className="results-dashboard">
        <div className="results-error">
          <h2>Error Loading Results</h2>
          <p>{error}</p>
          <button className="results-btn-primary" onClick={fetchResults}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  if (!results || results.total_participants === 0) {
    return (
      <div className="results-dashboard">
        <header className="results-header">
          <h1 className="results-title">Study Results Dashboard</h1>
          <button className="results-refresh-btn" onClick={fetchResults}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
            </svg>
            Refresh
          </button>
        </header>
        <div className="results-empty">
          <div className="results-empty-icon">📊</div>
          <h2>No Study Data Yet</h2>
          <p>Results will appear here as participants complete the study.</p>
          <p className="results-empty-hint">Last checked: {lastRefresh.toLocaleTimeString()}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-dashboard">
      <header className="results-header">
        <div>
          <h1 className="results-title">Study Results Dashboard</h1>
          <p className="results-subtitle">Real-time anonymized study data</p>
        </div>
        <button className="results-refresh-btn" onClick={fetchResults}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
          </svg>
          Refresh
        </button>
      </header>

      <p className="results-last-update">Last updated: {lastRefresh.toLocaleTimeString()}</p>

      {/* Summary Stats */}
      <section className="results-section">
        <h2 className="results-section-title">Summary Statistics</h2>
        <div className="results-stats-grid">
          <StatCard
            title="Total Participants"
            value={results.total_participants}
            icon="👥"
            color="#3b82f6"
          />
          <StatCard
            title="Detailed View Users"
            value={results.by_tool_version?.detailed || 0}
            icon="📊"
            color="#8b5cf6"
          />
          <StatCard
            title="Brief View Users"
            value={results.by_tool_version?.brief || 0}
            icon="📋"
            color="#6366f1"
          />
          <StatCard
            title="Avg Completion Time"
            value={formatTime(results.avg_completion_time)}
            icon="⏱️"
            color="#10b981"
          />
          <StatCard
            title="Completion Rate"
            value={`${Math.round(results.completion_rate * 100)}%`}
            icon="✓"
            color="#14b8a6"
          />
        </div>
      </section>

      {/* SUS Scores */}
      <section className="results-section">
        <h2 className="results-section-title">System Usability Scale (SUS)</h2>
        <SUSSection susData={results.sus_scores} />
      </section>

      {/* Source Preferences (un-blinded) */}
      {results.source_preferences && (
        <section className="results-section">
          <h2 className="results-section-title">Message Source Preferences (Un-blinded)</h2>
          <p className="results-section-desc">Preferences adjusted for randomization order</p>
          <SourcePreferencesSection data={results.source_preferences} />
        </section>
      )}

      {/* Message Preferences (blinded A/B) */}
      {results.message_preferences && (
        <section className="results-section">
          <h2 className="results-section-title">Blinded A/B Preference Distribution</h2>
          <p className="results-section-desc">Raw preferences before accounting for randomization</p>
          <MessagePreferenceChart data={results.message_preferences} />
        </section>
      )}

      {/* Trust Metrics */}
      {results.trust_metrics && (
        <section className="results-section">
          <h2 className="results-section-title">Trust Metrics</h2>
          <TrustMetricsSection metrics={results.trust_metrics} />
        </section>
      )}

      {/* Demographics */}
      <section className="results-section">
        <h2 className="results-section-title">Participant Demographics</h2>
        <DemographicsSection demographics={results.demographics} />
      </section>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, icon, color }) {
  return (
    <div className="results-stat-card" style={{ borderColor: color }}>
      <div className="results-stat-icon" style={{ color }}>
        {icon}
      </div>
      <div className="results-stat-content">
        <div className="results-stat-value" style={{ color }}>
          {value}
        </div>
        <div className="results-stat-title">{title}</div>
      </div>
    </div>
  )
}

// SUS Section Component
function SUSSection({ susData }) {
  if (!susData) return <p className="results-no-data">No SUS data available yet</p>

  const overallScore = susData.overall_avg_score
  const overallStd = susData.overall_std_dev || 0
  const n = susData.n || 0
  const overallInterpretation = getSUSInterpretation(overallScore)

  return (
    <div className="results-sus-container">
      <div className="results-sus-overall">
        <div className="results-sus-score-box">
          <div className="results-sus-score" style={{ color: overallInterpretation.color }}>
            {overallScore.toFixed(1)}
          </div>
          <div className="results-sus-score-label">Overall SUS Score</div>
          <div className="results-sus-stats">
            SD: {overallStd.toFixed(1)} | n={n}
          </div>
          <div className="results-sus-interpretation" style={{ background: `${overallInterpretation.color}20`, color: overallInterpretation.color }}>
            {overallInterpretation.label}
          </div>
        </div>
        <div className="results-sus-scale">
          <div className="results-sus-scale-bar">
            <div
              className="results-sus-scale-fill"
              style={{
                width: `${overallScore}%`,
                background: overallInterpretation.color
              }}
            ></div>
          </div>
          <div className="results-sus-scale-labels">
            <span>0</span>
            <span style={{ color: '#ef4444' }}>50</span>
            <span style={{ color: '#f59e0b' }}>70</span>
            <span style={{ color: '#3b82f6' }}>85</span>
            <span>100</span>
          </div>
          <div className="results-sus-scale-ranges">
            <span style={{ color: '#ef4444' }}>Not Acceptable</span>
            <span style={{ color: '#f59e0b' }}>Marginal</span>
            <span style={{ color: '#3b82f6' }}>Acceptable</span>
            <span style={{ color: '#10b981' }}>Excellent</span>
          </div>
        </div>
      </div>

      {susData.by_version && (
        <div className="results-sus-comparison">
          <h3 className="results-subsection-title">SUS Score by Tool Version</h3>
          <div className="results-sus-bars">
            <SUSBar
              label="Detailed View"
              score={susData.by_version.detailed?.avg_score || 0}
              stdDev={susData.by_version.detailed?.std_dev}
              count={susData.by_version.detailed?.count || 0}
              color="#8b5cf6"
            />
            <SUSBar
              label="Brief View"
              score={susData.by_version.brief?.avg_score || 0}
              stdDev={susData.by_version.brief?.std_dev}
              count={susData.by_version.brief?.count || 0}
              color="#6366f1"
            />
          </div>
        </div>
      )}
    </div>
  )
}

// SUS Bar Component
function SUSBar({ label, score, count, stdDev, color }) {
  const interpretation = getSUSInterpretation(score)

  return (
    <div className="results-sus-bar-container">
      <div className="results-sus-bar-header">
        <span className="results-sus-bar-label">{label}</span>
        <span className="results-sus-bar-score" style={{ color }}>
          {score.toFixed(1)} <span className="results-sus-bar-count">(SD: {(stdDev || 0).toFixed(1)}, n={count})</span>
        </span>
      </div>
      <div className="results-sus-bar-bg">
        <div
          className="results-sus-bar-fill"
          style={{
            width: `${score}%`,
            background: color
          }}
        >
          <span className="results-sus-bar-interpretation">{interpretation.label}</span>
        </div>
      </div>
    </div>
  )
}

// Message Preference Chart Component (blinded A/B)
function MessagePreferenceChart({ data }) {
  if (!data || Object.keys(data).length === 0) {
    return <p className="results-no-data">No message preference data available yet</p>
  }

  const labels = {
    '-2': 'Strongly prefer A',
    '-1': 'Slightly prefer A',
    '0': 'No preference',
    '1': 'Slightly prefer B',
    '2': 'Strongly prefer B'
  }

  const maxCount = Math.max(...Object.values(data))

  return (
    <div className="results-preference-chart">
      {Object.entries(labels).map(([value, label]) => {
        const count = data[value] || 0
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0

        return (
          <div key={value} className="results-preference-bar">
            <div className="results-preference-label">{label}</div>
            <div className="results-preference-bar-bg">
              <div
                className="results-preference-bar-fill"
                style={{ width: `${percentage}%` }}
              >
                <span className="results-preference-count">{count}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// Source Preferences Section (un-blinded results accounting for randomization)
function SourcePreferencesSection({ data }) {
  if (!data) return <p className="results-no-data">No source preference data available yet</p>

  const avgPref = data.avg_chorus_preference || 0
  const stdDev = data.std_dev || 0
  const n = data.n || 0
  const preferChorus = data.prefer_chorus_count || 0
  const preferCdc = data.prefer_cdc_count || 0
  const noPref = data.no_preference_count || 0
  const chorusPct = data.prefer_chorus_pct || 0
  const cdcPct = data.prefer_cdc_pct || 0

  // Calculate the visual indicator position (-2 to +2 scale mapped to 0-100%)
  const indicatorPosition = ((avgPref + 2) / 4) * 100

  return (
    <div className="results-source-pref-container">
      <div className="results-source-pref-summary">
        <div className="results-source-pref-stat">
          <div className="results-source-pref-value" style={{ color: avgPref > 0 ? '#10b981' : avgPref < 0 ? '#ef4444' : '#a1a1aa' }}>
            {avgPref > 0 ? '+' : ''}{avgPref.toFixed(2)}
          </div>
          <div className="results-source-pref-label">Average Preference Score</div>
          <div className="results-source-pref-subtext">
            (SD: {stdDev.toFixed(2)}, n={n})
          </div>
          <div className="results-source-pref-interpretation">
            {avgPref > 0.5 ? 'Favors Chorus' : avgPref < -0.5 ? 'Favors CDC' : 'No clear preference'}
          </div>
        </div>
      </div>

      <div className="results-source-pref-scale">
        <div className="results-source-pref-scale-labels">
          <span style={{ color: '#ef4444' }}>Prefer CDC (-2)</span>
          <span style={{ color: '#a1a1aa' }}>Neutral (0)</span>
          <span style={{ color: '#10b981' }}>Prefer Chorus (+2)</span>
        </div>
        <div className="results-source-pref-scale-bar">
          <div
            className="results-source-pref-indicator"
            style={{ left: `${indicatorPosition}%` }}
          ></div>
        </div>
      </div>

      <div className="results-source-pref-counts">
        <div className="results-source-pref-count-item">
          <span className="results-source-pref-count-label">Prefer Chorus</span>
          <span className="results-source-pref-count-value" style={{ color: '#10b981' }}>
            {preferChorus} ({chorusPct.toFixed(0)}%)
          </span>
        </div>
        <div className="results-source-pref-count-item">
          <span className="results-source-pref-count-label">No Preference</span>
          <span className="results-source-pref-count-value" style={{ color: '#a1a1aa' }}>
            {noPref} ({n > 0 ? ((noPref / n) * 100).toFixed(0) : 0}%)
          </span>
        </div>
        <div className="results-source-pref-count-item">
          <span className="results-source-pref-count-label">Prefer CDC</span>
          <span className="results-source-pref-count-value" style={{ color: '#ef4444' }}>
            {preferCdc} ({cdcPct.toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  )
}

// Trust Metrics Section Component
function TrustMetricsSection({ metrics }) {
  if (!metrics) return <p className="results-no-data">No trust data available yet</p>

  const trustDimensions = [
    { key: 'trust_accuracy', label: 'Accuracy', icon: '🎯' },
    { key: 'trust_reliability', label: 'Reliability', icon: '⚡' },
    { key: 'trust_transparency', label: 'Transparency', icon: '🔍' },
    { key: 'trust_usefulness', label: 'Usefulness', icon: '💡' }
  ]

  return (
    <div className="results-trust-container">
      <div className="results-trust-grid">
        {trustDimensions.map((dimension) => {
          const value = metrics[dimension.key]?.avg_score || 0
          const count = metrics[dimension.key]?.count || 0
          const percentage = (value / 7) * 100

          return (
            <div key={dimension.key} className="results-trust-card">
              <div className="results-trust-header">
                <span className="results-trust-icon">{dimension.icon}</span>
                <span className="results-trust-label">{dimension.label}</span>
              </div>
              <div className="results-trust-score">
                {value.toFixed(1)} <span className="results-trust-score-max">/ 7</span>
              </div>
              <div className="results-trust-bar-bg">
                <div
                  className="results-trust-bar-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <div className="results-trust-count">{count} responses</div>
            </div>
          )
        })}
      </div>

      {metrics.would_use && (
        <div className="results-adoption">
          <h3 className="results-subsection-title">Likelihood to Use in Work</h3>
          <div className="results-adoption-score">
            <div className="results-adoption-value" style={{ color: getAdoptionColor(metrics.would_use.avg_score) }}>
              {metrics.would_use.avg_score.toFixed(1)}
              <span className="results-adoption-max"> / 7</span>
            </div>
            <div className="results-adoption-label">
              Average likelihood ({metrics.would_use.count} responses)
            </div>
          </div>
          <div className="results-adoption-bar-bg">
            <div
              className="results-adoption-bar-fill"
              style={{
                width: `${(metrics.would_use.avg_score / 7) * 100}%`,
                background: getAdoptionColor(metrics.would_use.avg_score)
              }}
            ></div>
          </div>
          <div className="results-adoption-scale">
            <span>Very Unlikely</span>
            <span>Neutral</span>
            <span>Very Likely</span>
          </div>
        </div>
      )}
    </div>
  )
}

// Demographics Section Component
function DemographicsSection({ demographics }) {
  if (!demographics) return <p className="results-no-data">No demographic data available yet</p>

  return (
    <div className="results-demographics-grid">
      {demographics.by_role && (
        <DemographicCard title="Participant Roles" data={demographics.by_role} icon="👤" />
      )}
      {demographics.by_experience && (
        <DemographicCard title="Experience Levels" data={demographics.by_experience} icon="📈" />
      )}
      {demographics.by_org_type && (
        <DemographicCard title="Organization Types" data={demographics.by_org_type} icon="🏢" />
      )}
    </div>
  )
}

// Demographic Card Component
function DemographicCard({ title, data, icon }) {
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="results-demographic-card">
        <h3 className="results-demographic-title">
          <span className="results-demographic-icon">{icon}</span>
          {title}
        </h3>
        <p className="results-no-data-small">No data yet</p>
      </div>
    )
  }

  const total = Object.values(data).reduce((sum, count) => sum + count, 0)
  const sortedEntries = Object.entries(data).sort((a, b) => b[1] - a[1])

  return (
    <div className="results-demographic-card">
      <h3 className="results-demographic-title">
        <span className="results-demographic-icon">{icon}</span>
        {title}
      </h3>
      <div className="results-demographic-list">
        {sortedEntries.map(([key, count]) => {
          const percentage = (count / total) * 100

          return (
            <div key={key} className="results-demographic-item">
              <div className="results-demographic-item-header">
                <span className="results-demographic-item-label">{formatDemographicLabel(key)}</span>
                <span className="results-demographic-item-value">
                  {count} <span className="results-demographic-item-percent">({percentage.toFixed(0)}%)</span>
                </span>
              </div>
              <div className="results-demographic-bar-bg">
                <div
                  className="results-demographic-bar-fill"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="results-demographic-total">Total: {total} participants</div>
    </div>
  )
}

// View Results Link Component (for footer)
export function ViewResultsLink() {
  return (
    <a href="/results" className="view-results-link">
      View Study Results →
    </a>
  )
}

// Helper Functions
function formatTime(seconds) {
  if (!seconds) return 'N/A'

  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)

  if (mins > 0) {
    return `${mins}m ${secs}s`
  }
  return `${secs}s`
}

function formatDemographicLabel(key) {
  const labels = {
    'public_health_official': 'Public Health Official',
    'healthcare_provider': 'Healthcare Provider',
    'researcher': 'Researcher',
    'general_public': 'General Public',
    'other': 'Other',
    '0-2': '0-2 years',
    '3-5': '3-5 years',
    '6-10': '6-10 years',
    '11-20': '11-20 years',
    '20+': '20+ years',
    'government': 'Government',
    'healthcare': 'Healthcare',
    'academia': 'Academia',
    'private': 'Private Sector',
    'nonprofit': 'Non-profit'
  }

  return labels[key] || key
}

function getAdoptionColor(score) {
  if (score >= 6) return '#10b981'
  if (score >= 5) return '#3b82f6'
  if (score >= 4) return '#f59e0b'
  return '#ef4444'
}

// Inject Styles
const resultsStyles = document.createElement('style')
resultsStyles.textContent = `
  .results-dashboard {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
    min-height: 100vh;
  }

  /* Header */
  .results-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .results-title {
    font-size: 2.25rem;
    font-weight: 600;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
  }

  .results-subtitle {
    color: #a1a1aa;
    font-size: 0.95rem;
    margin-top: 0.25rem;
  }

  .results-refresh-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: 1px solid rgba(168, 85, 247, 0.3);
    background: rgba(168, 85, 247, 0.1);
    color: #a855f7;
    cursor: pointer;
    transition: all 0.2s;
  }

  .results-refresh-btn:hover {
    background: rgba(168, 85, 247, 0.2);
    border-color: rgba(168, 85, 247, 0.5);
  }

  .results-last-update {
    color: #71717a;
    font-size: 0.85rem;
    margin-bottom: 2rem;
  }

  /* Loading & Error States */
  .results-loading,
  .results-error,
  .results-empty {
    text-align: center;
    padding: 4rem 2rem;
    color: #a1a1aa;
  }

  .results-spinner {
    width: 48px;
    height: 48px;
    border: 4px solid rgba(168, 85, 247, 0.1);
    border-top-color: #a855f7;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  .results-error h2 {
    color: #ef4444;
    margin-bottom: 1rem;
  }

  .results-empty-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
  }

  .results-empty h2 {
    color: #e4e4e7;
    margin-bottom: 0.5rem;
  }

  .results-empty-hint {
    font-size: 0.8rem;
    margin-top: 1rem;
  }

  /* Sections */
  .results-section {
    margin-bottom: 3rem;
  }

  .results-section-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: #e4e4e7;
    margin-bottom: 1.5rem;
  }

  .results-subsection-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #d4d4d8;
    margin-bottom: 1rem;
  }

  .results-no-data {
    text-align: center;
    padding: 2rem;
    color: #71717a;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-no-data-small {
    text-align: center;
    padding: 1rem;
    color: #71717a;
    font-size: 0.9rem;
  }

  .results-section-desc {
    color: #71717a;
    font-size: 0.85rem;
    margin-top: -1rem;
    margin-bottom: 1.5rem;
  }

  .results-sus-stats {
    font-size: 0.85rem;
    color: #71717a;
    margin-bottom: 0.5rem;
  }

  /* Source Preferences */
  .results-source-pref-container {
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-source-pref-summary {
    text-align: center;
    margin-bottom: 2rem;
  }

  .results-source-pref-value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .results-source-pref-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-top: 0.5rem;
  }

  .results-source-pref-subtext {
    font-size: 0.85rem;
    color: #71717a;
    margin-top: 0.25rem;
  }

  .results-source-pref-interpretation {
    font-size: 0.9rem;
    font-weight: 600;
    margin-top: 0.75rem;
  }

  .results-source-pref-scale {
    margin-bottom: 2rem;
  }

  .results-source-pref-scale-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
  }

  .results-source-pref-scale-bar {
    height: 24px;
    background: linear-gradient(90deg, #ef4444 0%, #a1a1aa 50%, #10b981 100%);
    border-radius: 2rem;
    position: relative;
  }

  .results-source-pref-indicator {
    position: absolute;
    top: -4px;
    width: 4px;
    height: 32px;
    background: white;
    border-radius: 2px;
    transform: translateX(-50%);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  .results-source-pref-counts {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
  }

  .results-source-pref-count-item {
    text-align: center;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.5rem;
  }

  .results-source-pref-count-label {
    display: block;
    font-size: 0.8rem;
    color: #a1a1aa;
    margin-bottom: 0.5rem;
  }

  .results-source-pref-count-value {
    font-size: 1.25rem;
    font-weight: 600;
  }

  /* Stats Grid */
  .results-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }

  .results-stat-card {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .results-stat-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  }

  .results-stat-icon {
    font-size: 2rem;
  }

  .results-stat-content {
    flex: 1;
  }

  .results-stat-value {
    font-size: 2rem;
    font-weight: 600;
    line-height: 1;
    margin-bottom: 0.25rem;
  }

  .results-stat-title {
    font-size: 0.85rem;
    color: #a1a1aa;
  }

  /* SUS Section */
  .results-sus-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .results-sus-overall {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 2rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-sus-score-box {
    text-align: center;
    min-width: 200px;
  }

  .results-sus-score {
    font-size: 4rem;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 0.5rem;
  }

  .results-sus-score-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-bottom: 1rem;
  }

  .results-sus-interpretation {
    display: inline-block;
    padding: 0.5rem 1rem;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .results-sus-scale {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .results-sus-scale-bar {
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-sus-scale-fill {
    height: 100%;
    transition: width 0.5s ease;
  }

  .results-sus-scale-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #71717a;
    margin-bottom: 0.25rem;
  }

  .results-sus-scale-ranges {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
  }

  .results-sus-comparison {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-sus-bars {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .results-sus-bar-container {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .results-sus-bar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .results-sus-bar-label {
    font-weight: 600;
    color: #e4e4e7;
  }

  .results-sus-bar-score {
    font-size: 1.25rem;
    font-weight: 700;
  }

  .results-sus-bar-count {
    font-size: 0.85rem;
    font-weight: 400;
    color: #a1a1aa;
  }

  .results-sus-bar-bg {
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }

  .results-sus-bar-fill {
    height: 100%;
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 1rem;
  }

  .results-sus-bar-interpretation {
    font-size: 0.8rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Message Preference Chart */
  .results-preference-chart {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-preference-bar {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 1rem;
    align-items: center;
  }

  .results-preference-label {
    font-size: 0.9rem;
    color: #d4d4d8;
    font-weight: 500;
  }

  .results-preference-bar-bg {
    height: 32px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
    position: relative;
  }

  .results-preference-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 0.75rem;
  }

  .results-preference-count {
    font-size: 0.85rem;
    font-weight: 600;
    color: white;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  }

  /* Trust Metrics */
  .results-trust-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  .results-trust-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
  }

  .results-trust-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-trust-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .results-trust-icon {
    font-size: 1.5rem;
  }

  .results-trust-label {
    font-size: 1rem;
    font-weight: 600;
    color: #e4e4e7;
  }

  .results-trust-score {
    font-size: 2rem;
    font-weight: 700;
    color: #a855f7;
    margin-bottom: 0.75rem;
  }

  .results-trust-score-max {
    font-size: 1.25rem;
    font-weight: 400;
    color: #71717a;
  }

  .results-trust-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-trust-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
  }

  .results-trust-count {
    font-size: 0.8rem;
    color: #71717a;
  }

  /* Adoption Section */
  .results-adoption {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-adoption-score {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .results-adoption-value {
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
  }

  .results-adoption-max {
    font-size: 1.5rem;
    font-weight: 400;
    color: #71717a;
  }

  .results-adoption-label {
    font-size: 0.9rem;
    color: #a1a1aa;
    margin-top: 0.5rem;
  }

  .results-adoption-bar-bg {
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 2rem;
    overflow: hidden;
    margin-bottom: 0.5rem;
  }

  .results-adoption-bar-fill {
    height: 100%;
    transition: width 0.5s ease;
  }

  .results-adoption-scale {
    display: flex;
    justify-content: space-between;
    font-size: 0.8rem;
    color: #71717a;
  }

  /* Demographics */
  .results-demographics-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1.5rem;
  }

  .results-demographic-card {
    padding: 1.5rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 0.75rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .results-demographic-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;
    font-weight: 600;
    color: #e4e4e7;
    margin-bottom: 1.25rem;
  }

  .results-demographic-icon {
    font-size: 1.25rem;
  }

  .results-demographic-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .results-demographic-item {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .results-demographic-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .results-demographic-item-label {
    font-size: 0.9rem;
    color: #d4d4d8;
    font-weight: 500;
  }

  .results-demographic-item-value {
    font-size: 0.9rem;
    font-weight: 600;
    color: #a855f7;
  }

  .results-demographic-item-percent {
    font-weight: 400;
    color: #71717a;
  }

  .results-demographic-bar-bg {
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 1rem;
    overflow: hidden;
  }

  .results-demographic-bar-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.5s ease;
  }

  .results-demographic-total {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.85rem;
    color: #a1a1aa;
    text-align: center;
  }

  /* View Results Link */
  .view-results-link {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: #a855f7;
    text-decoration: none;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;
  }

  .view-results-link:hover {
    color: #c084fc;
    gap: 0.75rem;
  }

  /* Button */
  .results-btn-primary {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: none;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    cursor: pointer;
    transition: all 0.2s;
  }

  .results-btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
  }

  /* Mobile Responsiveness */
  @media (max-width: 768px) {
    .results-dashboard {
      padding: 1rem;
    }

    .results-title {
      font-size: 1.75rem;
    }

    .results-header {
      flex-direction: column;
      align-items: flex-start;
    }

    .results-refresh-btn {
      width: 100%;
      justify-content: center;
    }

    .results-sus-overall {
      grid-template-columns: 1fr;
    }

    .results-preference-bar {
      grid-template-columns: 1fr;
      gap: 0.5rem;
    }

    .results-demographics-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 600px) {
    .results-stats-grid {
      grid-template-columns: 1fr;
    }

    .results-trust-grid {
      grid-template-columns: 1fr;
    }

    .results-sus-scale-ranges {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.25rem;
    }
  }
`
document.head.appendChild(resultsStyles)

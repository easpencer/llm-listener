import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import { StudyFAB, StudyModal } from './StudyMode'
import { ViewResultsLink } from './ResultsDashboard'

const PROVIDER_COLORS = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d4a574',
  'Google Gemini': '#4285f4',
  'Grok': '#1da1f2',
  'Ollama': '#94a3b8',
}

function App() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])
  const [synthesis, setSynthesis] = useState(null)
  const [providers, setProviders] = useState([])
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [studyModalOpen, setStudyModalOpen] = useState(false)

  // App configuration from backend
  const [appConfig, setAppConfig] = useState({
    app_mode: 'prism',
    app_name: 'Prism',
    show_study: true,
    default_mode: 'public_health',
    tagline: 'AI-Powered Public Health Communication',
  })

  // Mode is determined by app_mode - no user toggle
  const [mode, setMode] = useState('public_health')
  const [viewMode, setViewMode] = useState(() => {
    // Load view preference from localStorage, default to 'detailed'
    return localStorage.getItem('chorusViewMode') || 'detailed'
  })

  // Fetch app config on mount - mode is locked based on app_mode
  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setAppConfig(data)
        // Lock mode based on app_mode (no user choice)
        setMode(data.default_mode)
      })
      .catch(() => {
        // Keep default config on error
      })
  }, [])

  useEffect(() => {
    fetch('/api/providers')
      .then(res => res.json())
      .then(data => setProviders(data.configured))
      .catch(() => setProviders([]))
  }, [])


  useEffect(() => {
    // Save view preference to localStorage whenever it changes
    localStorage.setItem('chorusViewMode', viewMode)
  }, [viewMode])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim() || loading) return

    setLoading(true)
    setResponses([])
    setSynthesis(null)
    setError(null)

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, include_synthesis: true, mode }),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.detail || 'Failed to query LLMs')
      }

      const data = await res.json()
      setResponses(data.responses)
      setSynthesis(data.synthesis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const parseSynthesis = (content) => {
    if (!content) return []

    const sections = []
    const lines = content.split('\n')
    let currentSection = null
    let currentContent = []

    for (const line of lines) {
      if (line.startsWith('## ')) {
        if (currentSection) {
          sections.push({ title: currentSection, content: currentContent.join('\n').trim() })
        }
        currentSection = line.replace('## ', '').trim()
        currentContent = []
      } else if (currentSection) {
        currentContent.push(line)
      }
    }

    if (currentSection) {
      sections.push({ title: currentSection, content: currentContent.join('\n').trim() })
    }

    return sections
  }

  const getSectionMeta = (title) => {
    // For Public Health mode
    if (title.includes('Hearing')) return { icon: '👂', color: '#3b82f6', priority: 1 }
    if (title.includes('Concerns') || title.includes('Hesitanc')) return { icon: '⚠️', color: '#f59e0b', priority: 2 }
    if (title.includes('Misinformation')) return { icon: '🚨', color: '#ef4444', priority: 3 }
    if (title.includes('Effective') || title.includes('Messaging Angles')) return { icon: '✅', color: '#10b981', priority: 4 }
    if (title.includes('Recommendations for Public Health Officials')) return { icon: '📋', color: '#8b5cf6', priority: 5 }
    if (title.includes('Recommended Public Health Message')) return { icon: '💬', color: '#ec4899', priority: 6, highlight: true }

    // For Health Research mode
    if (title.includes('Evidence Summary')) return { icon: '📚', color: '#0ea5e9', priority: 1 }
    if (title.includes('Points of Agreement')) return { icon: '✅', color: '#10b981', priority: 2 }
    if (title.includes('Points of Disagreement')) return { icon: '⚡', color: '#f59e0b', priority: 3 }
    if (title.includes('Confidence Level')) return { icon: '📊', color: '#14b8a6', priority: 4 }
    if (title.includes('Recommendations for Further Research')) return { icon: '🔬', color: '#06b6d4', priority: 5 }

    return { icon: '📝', color: '#6b7280', priority: 99 }
  }

  const copyMessage = (text) => {
    // Extract just the message part (first paragraph before explanation)
    const messageMatch = text.match(/^\*\*(.+?)\*\*/s) || text.match(/^"(.+?)"/s)
    const messageToCopy = messageMatch ? messageMatch[1] : text.split('\n\n')[0]
    navigator.clipboard.writeText(messageToCopy.replace(/\*\*/g, ''))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const exampleQuestions = [
    "Should I get a flu vaccine this year?",
    "Are COVID boosters still recommended?",
    "Is it safe to eat eggs during a bird flu outbreak?",
    "What are the side effects of the MMR vaccine?",
  ]

  const analysisSection = synthesis ? parseSynthesis(synthesis.content) : []
  const highlightSection = analysisSection.find(s => getSectionMeta(s.title).highlight)
  const regularSections = analysisSection.filter(s => !getSectionMeta(s.title).highlight)

  // Get mode-specific styling
  const getModeColors = () => {
    if (mode === 'health_research') {
      return {
        primary: '#0ea5e9', // blue
        secondary: '#14b8a6', // teal
        gradient: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)',
      }
    }
    return {
      primary: '#a855f7', // purple
      secondary: '#6366f1', // indigo
      gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    }
  }

  const modeColors = getModeColors()

  return (
    <div className="app-container" data-mode={mode}>
      <header className="header">
        {/* View Mode Toggle (Brief/Detailed) */}
        <div className="view-toggle">
          <button
            className={`view-btn ${viewMode === 'brief' ? 'active' : ''}`}
            onClick={() => setViewMode('brief')}
          >
            Brief
          </button>
          <button
            className={`view-btn ${viewMode === 'detailed' ? 'active' : ''}`}
            onClick={() => setViewMode('detailed')}
          >
            Detailed
          </button>
        </div>

        <h1 className="title" style={{ background: modeColors.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
          {appConfig.app_name}
        </h1>
        <p className="subtitle">{appConfig.tagline}</p>
      </header>

      <main className="main">
        {/* Input Section */}
        <div className="input-section">
          <form onSubmit={handleSubmit} className="form">
            <label className="label">
              {mode === 'health_research' ? 'What medical question do you want to research?' : 'What question are people asking AI?'}
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder={mode === 'health_research'
                ? "Enter a medical research question..."
                : "Enter a health question the public might ask..."}
              className="textarea"
              rows={2}
            />
            <div className="form-footer">
              <div className="provider-pills">
                {providers.map(p => (
                  <span
                    key={p}
                    className="provider-pill"
                    style={{ borderColor: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#6b7280' }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="submit-btn"
                style={{ background: modeColors.gradient }}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </form>

          <div className="examples">
            <span className="examples-label">Try:</span>
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuestion(q)}
                className="example-btn"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {loading && (
          <div className="loading">
            <div className="spinner" style={{ borderTopColor: modeColors.primary }}></div>
            <p>Listening to {providers.length} AI voices...</p>
          </div>
        )}

        {/* Individual AI Responses - only show in detailed view */}
        {viewMode === 'detailed' && responses.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">🤖</span>
                What Each AI Says
              </h2>
              <span className="section-count">{responses.filter(r => r.success).length} responses</span>
            </div>
            <div className="responses-grid" data-count={responses.length}>
              {responses.map((r, i) => (
                <ResponseCard key={i} response={r} />
              ))}
            </div>
          </section>
        )}

        {/* Public Health Mode: Show highlight message */}
        {mode === 'public_health' && highlightSection && (
          <section className="section">
            <div className="highlight-card">
              <div className="highlight-header">
                <div className="highlight-title-row">
                  <span className="highlight-icon">💬</span>
                  <h2 className="highlight-title">Ready-to-Use Public Health Message</h2>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyMessage(highlightSection.content)}
                >
                  {copied ? '✓ Copied!' : 'Copy Message'}
                </button>
              </div>
              <div className="highlight-content">
                <ReactMarkdown>{highlightSection.content}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        {/* Analysis Cards - only show in detailed view */}
        {viewMode === 'detailed' && regularSections.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">📊</span>
                {mode === 'health_research' ? 'Evidence Analysis' : 'Detailed Analysis'}
              </h2>
            </div>
            <div className="analysis-grid" data-count={regularSections.length}>
              {regularSections.map((section, i) => {
                const meta = getSectionMeta(section.title)
                return (
                  <AnalysisCard
                    key={i}
                    title={section.title}
                    content={section.content}
                    icon={meta.icon}
                    color={meta.color}
                  />
                )
              })}
            </div>
          </section>
        )}
      </main>

      <footer className="footer">
        <p>{appConfig.app_mode === 'chorus'
          ? 'Chorus synthesizes evidence from multiple AI models'
          : 'Prism helps public health officials understand AI narratives'}</p>
        <ViewResultsLink />
      </footer>

      {/* Study Participation - only show in Prism mode */}
      {appConfig.show_study && <StudyFAB onClick={() => setStudyModalOpen(true)} />}
      {appConfig.show_study && (
        <StudyModal
          isOpen={studyModalOpen}
          onClose={() => setStudyModalOpen(false)}
          onQuerySubmit={(query) => {
            setQuestion(query)
            // Auto-submit after short delay to let state update
            setTimeout(() => {
              document.querySelector('.submit-btn')?.click()
            }, 100)
          }}
          setViewMode={setViewMode}
        />
      )}
    </div>
  )
}

function ResponseCard({ response }) {
  const color = PROVIDER_COLORS[response.provider_name] || '#6b7280'

  if (!response.success) {
    return (
      <div className="card card-error">
        <div className="card-header" style={{ background: 'rgba(239, 68, 68, 0.1)' }}>
          <div className="provider-info">
            <div className="provider-dot" style={{ background: '#ef4444' }}></div>
            <span className="provider-name" style={{ color: '#ef4444' }}>
              {response.provider_name}
            </span>
          </div>
          <span className="model">{response.model}</span>
        </div>
        <div className="card-error-content">Error: {response.error}</div>
      </div>
    )
  }

  return (
    <div className="card" style={{ borderColor: color }}>
      <div className="card-header">
        <div className="provider-info">
          <div className="provider-dot" style={{ background: color }}></div>
          <span className="provider-name" style={{ color }}>
            {response.provider_name}
          </span>
        </div>
        <span className="model">{response.model}</span>
      </div>
      <div className="card-content">
        <ReactMarkdown>{response.content}</ReactMarkdown>
      </div>
    </div>
  )
}

function AnalysisCard({ title, content, icon, color }) {
  return (
    <div className="analysis-card" style={{ borderColor: color }}>
      <div
        className="analysis-card-header"
        style={{ background: `${color}15`, borderBottomColor: `${color}30` }}
      >
        <span className="analysis-icon">{icon}</span>
        <h3 className="analysis-card-title" style={{ color }}>{title}</h3>
      </div>
      <div className="analysis-card-content">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

// Inject styles
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  * { box-sizing: border-box; }

  .app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  .header {
    text-align: center;
    margin-bottom: 1.5rem;
    padding-top: 1rem;
  }

  /* Mode Toggle - at the very top */
  .mode-toggle {
    display: inline-flex;
    gap: 0.5rem;
    background: rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 1.5rem;
  }

  .mode-btn {
    padding: 0.5rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }

  .mode-btn:hover {
    color: #d4d4d8;
  }

  .app-container[data-mode="public_health"] .mode-btn.active {
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(168, 85, 247, 0.3);
  }

  .app-container[data-mode="health_research"] .mode-btn.active {
    background: linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%);
    color: white;
    box-shadow: 0 2px 8px rgba(14, 165, 233, 0.3);
  }

  /* View Toggle - below mode toggle */
  .view-toggle {
    display: inline-flex;
    gap: 0.5rem;
    background: rgba(255,255,255,0.05);
    border-radius: 0.5rem;
    padding: 0.25rem;
    border: 1px solid rgba(255,255,255,0.1);
    margin-bottom: 1rem;
  }

  .view-btn {
    padding: 0.4rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 0.375rem;
    border: none;
    background: transparent;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }

  .view-btn:hover {
    color: #d4d4d8;
  }

  .view-btn.active {
    background: rgba(255,255,255,0.1);
    color: white;
    box-shadow: 0 1px 4px rgba(0,0,0,0.2);
  }

  .title {
    font-size: 2.5rem;
    font-weight: 600;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.25rem;
  }

  .subtitle {
    color: #a1a1aa;
    font-size: 1rem;
  }

  .main { flex: 1; }

  .input-section {
    background: rgba(255,255,255,0.03);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .label {
    font-size: 0.9rem;
    font-weight: 500;
    color: #e4e4e7;
  }

  .textarea {
    width: 100%;
    padding: 0.875rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255,255,255,0.15);
    background: rgba(0,0,0,0.2);
    color: #e4e4e7;
    resize: none;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }

  .app-container[data-mode="public_health"] .textarea:focus {
    border-color: rgba(168, 85, 247, 0.5);
  }

  .app-container[data-mode="health_research"] .textarea:focus {
    border-color: rgba(14, 165, 233, 0.5);
  }

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .provider-pills {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .provider-pill {
    padding: 0.25rem 0.625rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    text-transform: capitalize;
    border: 1px solid;
    background: transparent;
    color: #a1a1aa;
  }

  .submit-btn {
    padding: 0.75rem 1.75rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: none;
    color: white;
    cursor: pointer;
    transition: transform 0.2s, opacity 0.2s;
    white-space: nowrap;
  }

  .submit-btn:hover:not(:disabled) {
    transform: translateY(-1px);
  }

  .submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: center;
  }

  .examples-label {
    font-size: 0.8rem;
    color: #71717a;
  }

  .example-btn {
    padding: 0.375rem 0.75rem;
    font-size: 0.8rem;
    border-radius: 1rem;
    border: 1px solid rgba(255,255,255,0.1);
    background: transparent;
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s;
  }

  .example-btn:hover {
    background: rgba(255,255,255,0.05);
    border-color: rgba(255,255,255,0.2);
  }

  .error {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid #ef4444;
    border-radius: 0.5rem;
    padding: 1rem;
    color: #fca5a5;
    margin-bottom: 1rem;
  }

  .loading {
    text-align: center;
    padding: 3rem;
    color: #a1a1aa;
  }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .section {
    margin-bottom: 2rem;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .section-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e4e4e7;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
  }

  .section-icon {
    font-size: 1.25rem;
  }

  .section-count {
    font-size: 0.8rem;
    color: #71717a;
    background: rgba(255,255,255,0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
  }

  /* Responsive grid for AI responses - always fill rows */
  .responses-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .responses-grid[data-count="1"] { grid-template-columns: 1fr; max-width: 600px; }
  .responses-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .responses-grid[data-count="4"] { grid-template-columns: repeat(2, 1fr); }
  .responses-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }
  .responses-grid[data-count="5"] .card:nth-child(4),
  .responses-grid[data-count="5"] .card:nth-child(5) { grid-column: span 1; }
  .responses-grid[data-count="6"] { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 900px) {
    .responses-grid,
    .responses-grid[data-count="3"],
    .responses-grid[data-count="4"],
    .responses-grid[data-count="5"],
    .responses-grid[data-count="6"] {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .responses-grid,
    .responses-grid[data-count="1"],
    .responses-grid[data-count="2"],
    .responses-grid[data-count="3"],
    .responses-grid[data-count="4"],
    .responses-grid[data-count="5"],
    .responses-grid[data-count="6"] {
      grid-template-columns: 1fr;
    }
  }

  .card {
    background: rgba(255,255,255,0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .card-error {
    border-color: #ef4444;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.2);
  }

  .provider-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .provider-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
  }

  .provider-name {
    font-weight: 600;
    font-size: 0.9rem;
  }

  .model {
    font-size: 0.7rem;
    color: #71717a;
  }

  .card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.6;
    max-height: 300px;
    overflow-y: auto;
    color: #d4d4d8;
    flex: 1;
  }

  .card-error-content {
    padding: 1rem;
    color: #fca5a5;
    font-size: 0.85rem;
  }

  /* Highlight card for ready-to-use message */
  .highlight-card {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%);
    border-radius: 1rem;
    border: 2px solid #ec4899;
    overflow: hidden;
  }

  .highlight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    background: rgba(236, 72, 153, 0.1);
    border-bottom: 1px solid rgba(236, 72, 153, 0.2);
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  .highlight-title-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .highlight-icon {
    font-size: 1.5rem;
  }

  .highlight-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f9a8d4;
    margin: 0;
  }

  .copy-btn {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: 1px solid #ec4899;
    background: rgba(236, 72, 153, 0.2);
    color: #f9a8d4;
    cursor: pointer;
    transition: all 0.2s;
  }

  .copy-btn:hover {
    background: rgba(236, 72, 153, 0.3);
  }

  .highlight-content {
    padding: 1.5rem;
    font-size: 1rem;
    line-height: 1.8;
    color: #e4e4e7;
  }

  .highlight-content p:first-child {
    font-size: 1.1rem;
    font-weight: 500;
    color: #f4f4f5;
  }

  /* Analysis grid - responsive and even rows */
  .analysis-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .analysis-grid[data-count="1"] { grid-template-columns: 1fr; }
  .analysis-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .analysis-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }
  .analysis-grid[data-count="5"] .analysis-card:nth-child(4),
  .analysis-grid[data-count="5"] .analysis-card:nth-child(5) {
    grid-column: span 1;
  }

  @media (max-width: 1000px) {
    .analysis-grid,
    .analysis-grid[data-count="3"],
    .analysis-grid[data-count="5"] {
      grid-template-columns: repeat(2, 1fr);
    }

    .analysis-grid[data-count="5"] .analysis-card:last-child {
      grid-column: 1 / -1;
    }
  }

  @media (max-width: 650px) {
    .analysis-grid,
    .analysis-grid[data-count="1"],
    .analysis-grid[data-count="2"],
    .analysis-grid[data-count="3"],
    .analysis-grid[data-count="5"] {
      grid-template-columns: 1fr;
    }

    .analysis-grid[data-count="5"] .analysis-card:last-child {
      grid-column: auto;
    }
  }

  .analysis-card {
    background: rgba(255,255,255,0.02);
    border-radius: 0.75rem;
    border: 1px solid;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .analysis-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
  }

  .analysis-card-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid;
  }

  .analysis-icon {
    font-size: 1.1rem;
  }

  .analysis-card-title {
    font-size: 0.9rem;
    font-weight: 600;
    margin: 0;
  }

  .analysis-card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.7;
    color: #d4d4d8;
  }

  .footer {
    text-align: center;
    padding: 1.5rem 0;
    color: #52525b;
    font-size: 0.8rem;
  }

  /* Markdown styling */
  h2 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #e4e4e7; }
  h2:first-child { margin-top: 0; }
  h3 { font-size: 0.9rem; font-weight: 500; margin: 0.75rem 0 0.4rem; color: #a1a1aa; }
  p { margin-bottom: 0.6rem; }
  p:last-child { margin-bottom: 0; }
  ul, ol { margin-left: 1.25rem; margin-bottom: 0.6rem; padding-left: 0; }
  li { margin-bottom: 0.25rem; }
  li::marker { color: #71717a; }
  strong { color: #f4f4f5; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

  /* Mobile adjustments */
  @media (max-width: 600px) {
    .app-container { padding: 1rem; }
    .title { font-size: 2rem; }
    .input-section { padding: 1rem; }
    .form-footer { flex-direction: column; align-items: stretch; }
    .provider-pills { justify-content: center; }
    .submit-btn { width: 100%; }
    .highlight-header { flex-direction: column; align-items: flex-start; }
    .copy-btn { width: 100%; }
  }
`
document.head.appendChild(styleSheet)

export default App

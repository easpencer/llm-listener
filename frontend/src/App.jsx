import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

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

  useEffect(() => {
    fetch('/api/providers')
      .then(res => res.json())
      .then(data => setProviders(data.configured))
      .catch(() => setProviders([]))
  }, [])

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
        body: JSON.stringify({ question, include_synthesis: true }),
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

  // Parse synthesis content into sections
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

  const getSectionIcon = (title) => {
    if (title.includes('Hearing')) return '👂'
    if (title.includes('Concerns') || title.includes('Hesitanc')) return '⚠️'
    if (title.includes('Misinformation')) return '🚨'
    if (title.includes('Effective') || title.includes('Messaging Angles')) return '✅'
    if (title.includes('Recommendations')) return '📋'
    if (title.includes('Recommended Public Health Message')) return '💬'
    return '📝'
  }

  const getSectionColor = (title) => {
    if (title.includes('Hearing')) return '#3b82f6'
    if (title.includes('Concerns') || title.includes('Hesitanc')) return '#f59e0b'
    if (title.includes('Misinformation')) return '#ef4444'
    if (title.includes('Effective') || title.includes('Messaging Angles')) return '#10b981'
    if (title.includes('Recommendations')) return '#8b5cf6'
    if (title.includes('Recommended Public Health Message')) return '#ec4899'
    return '#6b7280'
  }

  const exampleQuestions = [
    "Should I get a flu vaccine this year?",
    "Are COVID boosters still recommended?",
    "Is it safe to eat eggs during a bird flu outbreak?",
    "What are the side effects of the MMR vaccine?",
  ]

  const analysisSection = synthesis ? parseSynthesis(synthesis.content) : []

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Chorus</h1>
        <p style={styles.subtitle}>Hear what AI is telling the public</p>
      </header>

      <main style={styles.main}>
        {/* Input Section */}
        <div style={styles.inputSection}>
          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>What question are people asking AI?</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a health question the public might ask..."
              style={styles.textarea}
              rows={2}
            />
            <div style={styles.formFooter}>
              <div style={styles.providerPills}>
                {providers.map(p => (
                  <span key={p} style={{
                    ...styles.providerPill,
                    borderColor: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#6b7280'
                  }}>{p}</span>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                style={{
                  ...styles.button,
                  opacity: loading || !question.trim() ? 0.6 : 1,
                }}
              >
                {loading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </form>

          <div style={styles.examples}>
            <span style={styles.examplesLabel}>Try:</span>
            {exampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setQuestion(q)}
                style={styles.exampleBtn}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Listening to {providers.length} AI voices...</p>
          </div>
        )}

        {/* Individual AI Responses */}
        {responses.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>🤖</span>
              What Each AI Says
            </h2>
            <p style={styles.sectionSubtitle}>
              Individual responses from {responses.filter(r => r.success).length} AI models
            </p>
            <div style={styles.responsesGrid}>
              {responses.map((r, i) => (
                <ResponseCard key={i} response={r} />
              ))}
            </div>
          </section>
        )}

        {/* Analysis Section */}
        {synthesis && analysisSection.length > 0 && (
          <section style={styles.section}>
            <h2 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>📊</span>
              Public Health Analysis
            </h2>
            <p style={styles.sectionSubtitle}>
              Synthesized insights for public health messaging
            </p>
            <div style={styles.analysisGrid}>
              {analysisSection.map((section, i) => (
                <AnalysisCard
                  key={i}
                  title={section.title}
                  content={section.content}
                  icon={getSectionIcon(section.title)}
                  color={getSectionColor(section.title)}
                />
              ))}
            </div>
          </section>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Chorus helps public health officials understand AI narratives</p>
      </footer>
    </div>
  )
}

function ResponseCard({ response }) {
  const color = PROVIDER_COLORS[response.provider_name] || '#6b7280'

  if (!response.success) {
    return (
      <div style={{ ...styles.card, borderColor: '#ef4444' }}>
        <div style={{ ...styles.cardHeader, background: 'rgba(239, 68, 68, 0.1)' }}>
          <span style={{ ...styles.providerName, color: '#ef4444' }}>
            {response.provider_name}
          </span>
          <span style={styles.model}>{response.model}</span>
        </div>
        <div style={styles.cardError}>Error: {response.error}</div>
      </div>
    )
  }

  return (
    <div style={{ ...styles.card, borderColor: color }}>
      <div style={{ ...styles.cardHeader, borderBottomColor: color }}>
        <div style={styles.providerInfo}>
          <div style={{ ...styles.providerDot, background: color }}></div>
          <span style={{ ...styles.providerName, color }}>
            {response.provider_name}
          </span>
        </div>
        <span style={styles.model}>{response.model}</span>
      </div>
      <div style={styles.cardContent}>
        <ReactMarkdown>{response.content}</ReactMarkdown>
      </div>
    </div>
  )
}

function AnalysisCard({ title, content, icon, color }) {
  const isHighlight = title.includes('Recommended Public Health Message')

  return (
    <div style={{
      ...styles.analysisCard,
      borderColor: color,
      ...(isHighlight ? styles.highlightCard : {})
    }}>
      <div style={{
        ...styles.analysisCardHeader,
        background: `${color}15`,
        borderBottomColor: `${color}30`
      }}>
        <span style={styles.analysisIcon}>{icon}</span>
        <h3 style={{ ...styles.analysisCardTitle, color }}>{title}</h3>
      </div>
      <div style={styles.analysisCardContent}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1.5rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    marginBottom: '1.5rem',
    paddingTop: '1rem',
  },
  title: {
    fontSize: '2.25rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.25rem',
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: '1rem',
  },
  main: {
    flex: 1,
  },
  inputSection: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '1rem',
    padding: '1.5rem',
    marginBottom: '2rem',
    border: '1px solid rgba(255,255,255,0.08)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  label: {
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#e4e4e7',
  },
  textarea: {
    width: '100%',
    padding: '0.875rem',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'rgba(0,0,0,0.2)',
    color: '#e4e4e7',
    resize: 'none',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  formFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  providerPills: {
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap',
  },
  providerPill: {
    padding: '0.25rem 0.625rem',
    borderRadius: '1rem',
    fontSize: '0.75rem',
    textTransform: 'capitalize',
    border: '1px solid',
    background: 'transparent',
    color: '#a1a1aa',
  },
  button: {
    padding: '0.75rem 1.75rem',
    fontSize: '0.9rem',
    fontWeight: 500,
    borderRadius: '0.5rem',
    border: 'none',
    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s, opacity 0.2s',
    whiteSpace: 'nowrap',
  },
  examples: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '1rem',
    alignItems: 'center',
  },
  examplesLabel: {
    fontSize: '0.8rem',
    color: '#71717a',
  },
  exampleBtn: {
    padding: '0.375rem 0.75rem',
    fontSize: '0.8rem',
    borderRadius: '1rem',
    border: '1px solid rgba(255,255,255,0.1)',
    background: 'transparent',
    color: '#a1a1aa',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '0.5rem',
    padding: '1rem',
    color: '#fca5a5',
    marginBottom: '1rem',
  },
  loading: {
    textAlign: 'center',
    padding: '3rem',
    color: '#a1a1aa',
  },
  spinner: {
    width: '36px',
    height: '36px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#a855f7',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite',
  },
  section: {
    marginBottom: '2.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#e4e4e7',
    marginBottom: '0.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  sectionIcon: {
    fontSize: '1.25rem',
  },
  sectionSubtitle: {
    fontSize: '0.875rem',
    color: '#71717a',
    marginBottom: '1rem',
  },
  responsesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '0.75rem',
    border: '1px solid',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.2)',
  },
  providerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  providerDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
  },
  providerName: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  model: {
    fontSize: '0.7rem',
    color: '#71717a',
  },
  cardContent: {
    padding: '1rem',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    maxHeight: '350px',
    overflowY: 'auto',
    color: '#d4d4d8',
    flex: 1,
  },
  cardError: {
    padding: '1rem',
    color: '#fca5a5',
    fontSize: '0.85rem',
  },
  analysisGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1rem',
  },
  analysisCard: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '0.75rem',
    border: '1px solid',
    overflow: 'hidden',
  },
  highlightCard: {
    gridColumn: '1 / -1',
    background: 'rgba(236, 72, 153, 0.05)',
  },
  analysisCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid',
  },
  analysisIcon: {
    fontSize: '1.1rem',
  },
  analysisCardTitle: {
    fontSize: '0.9rem',
    fontWeight: 600,
    margin: 0,
  },
  analysisCardContent: {
    padding: '1rem',
    fontSize: '0.85rem',
    lineHeight: 1.7,
    color: '#d4d4d8',
  },
  footer: {
    textAlign: 'center',
    padding: '1.5rem 0',
    color: '#52525b',
    fontSize: '0.8rem',
  },
}

// Add keyframes and global styles
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  textarea:focus {
    border-color: rgba(168, 85, 247, 0.5) !important;
  }
  button:hover:not(:disabled) {
    transform: translateY(-1px);
  }
  .exampleBtn:hover {
    background: rgba(255,255,255,0.05) !important;
    border-color: rgba(255,255,255,0.2) !important;
  }

  /* Markdown styling */
  h2 { font-size: 1rem; font-weight: 600; margin: 1rem 0 0.5rem; color: #e4e4e7; }
  h2:first-child { margin-top: 0; }
  h3 { font-size: 0.9rem; font-weight: 500; margin: 0.75rem 0 0.4rem; color: #a1a1aa; }
  p { margin-bottom: 0.6rem; }
  p:last-child { margin-bottom: 0; }
  ul, ol { margin-left: 1.25rem; margin-bottom: 0.6rem; }
  li { margin-bottom: 0.2rem; }
  strong { color: #f4f4f5; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
`
document.head.appendChild(styleSheet)

export default App

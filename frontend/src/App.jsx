import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const PROVIDER_COLORS = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d4a574',
  'Google Gemini': '#4285f4',
  'Grok': '#1da1f2',
  'Ollama': '#94a3b8',
  'Synthesis': '#a855f7',
}

function App() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])
  const [synthesis, setSynthesis] = useState(null)
  const [providers, setProviders] = useState([])
  const [error, setError] = useState(null)
  const [showIndividual, setShowIndividual] = useState(false)

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

  const exampleQuestions = [
    "Should I get a flu vaccine this year?",
    "Are COVID boosters still recommended?",
    "Is it safe to eat eggs during a bird flu outbreak?",
    "What are the side effects of the MMR vaccine?",
  ]

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Chorus</h1>
        <p style={styles.subtitle}>Hear what AI is telling the public</p>
      </header>

      <main style={styles.main}>
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

        {synthesis && (
          <div style={styles.analysisSection}>
            <div style={styles.analysisCard}>
              <div style={styles.analysisHeader}>
                <h2 style={styles.analysisTitle}>Public Health Analysis</h2>
                <span style={styles.badge}>AI-Generated Insights</span>
              </div>
              <div style={styles.analysisContent}>
                <ReactMarkdown>{synthesis.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        )}

        {responses.length > 0 && (
          <div style={styles.responsesSection}>
            <button
              onClick={() => setShowIndividual(!showIndividual)}
              style={styles.toggleBtn}
            >
              {showIndividual ? 'Hide' : 'Show'} Individual AI Responses ({responses.filter(r => r.success).length})
            </button>

            {showIndividual && (
              <div style={styles.grid}>
                {responses.map((r, i) => (
                  <ResponseCard key={i} response={r} />
                ))}
              </div>
            )}
          </div>
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
        <div style={styles.cardHeader}>
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
      <div style={styles.cardHeader}>
        <span style={{ ...styles.providerName, color }}>
          {response.provider_name}
        </span>
        <span style={styles.model}>{response.model}</span>
      </div>
      <div style={styles.cardContent}>
        <ReactMarkdown>{response.content}</ReactMarkdown>
      </div>
    </div>
  )
}

const styles = {
  container: {
    maxWidth: '900px',
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
    marginBottom: '1.5rem',
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
  analysisSection: {
    marginBottom: '1.5rem',
  },
  analysisCard: {
    background: 'rgba(168, 85, 247, 0.08)',
    borderRadius: '1rem',
    border: '1px solid rgba(168, 85, 247, 0.3)',
    overflow: 'hidden',
  },
  analysisHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 1.25rem',
    borderBottom: '1px solid rgba(168, 85, 247, 0.2)',
    background: 'rgba(168, 85, 247, 0.05)',
  },
  analysisTitle: {
    fontSize: '1rem',
    fontWeight: 600,
    color: '#c4b5fd',
    margin: 0,
  },
  badge: {
    fontSize: '0.7rem',
    padding: '0.25rem 0.5rem',
    borderRadius: '0.25rem',
    background: 'rgba(168, 85, 247, 0.2)',
    color: '#c4b5fd',
  },
  analysisContent: {
    padding: '1.25rem',
    fontSize: '0.9rem',
    lineHeight: 1.7,
    color: '#e4e4e7',
  },
  responsesSection: {
    marginBottom: '1.5rem',
  },
  toggleBtn: {
    padding: '0.625rem 1rem',
    fontSize: '0.85rem',
    borderRadius: '0.5rem',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'transparent',
    color: '#a1a1aa',
    cursor: 'pointer',
    marginBottom: '1rem',
    transition: 'all 0.2s',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
  },
  card: {
    background: 'rgba(255,255,255,0.02)',
    borderRadius: '0.75rem',
    border: '1px solid',
    overflow: 'hidden',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.625rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.2)',
  },
  providerName: {
    fontWeight: 600,
    fontSize: '0.85rem',
  },
  model: {
    fontSize: '0.7rem',
    color: '#71717a',
  },
  cardContent: {
    padding: '1rem',
    fontSize: '0.85rem',
    lineHeight: 1.6,
    maxHeight: '300px',
    overflowY: 'auto',
    color: '#d4d4d8',
  },
  cardError: {
    padding: '1rem',
    color: '#fca5a5',
    fontSize: '0.85rem',
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

  /* Markdown styling in analysis */
  h2 { font-size: 1rem; font-weight: 600; margin: 1.25rem 0 0.5rem; color: #c4b5fd; }
  h2:first-child { margin-top: 0; }
  h3 { font-size: 0.9rem; font-weight: 500; margin: 1rem 0 0.4rem; color: #a1a1aa; }
  p { margin-bottom: 0.75rem; }
  ul, ol { margin-left: 1.25rem; margin-bottom: 0.75rem; }
  li { margin-bottom: 0.25rem; }
  strong { color: #f4f4f5; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
`
document.head.appendChild(styleSheet)

export default App

import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const PROVIDER_COLORS = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d4a574',
  'Google Gemini': '#4285f4',
  'Ollama': '#ffffff',
  'Synthesis': '#a855f7',
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

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Chorus</h1>
        <p style={styles.subtitle}>Hear what AI is telling the public</p>
        <p style={styles.tagline}>Understand AI narratives to craft better health messaging</p>
        {providers.length > 0 && (
          <div style={styles.providers}>
            {providers.map(p => (
              <span key={p} style={styles.providerBadge}>{p}</span>
            ))}
          </div>
        )}
      </header>

      <main style={styles.main}>
        <form onSubmit={handleSubmit} style={styles.form}>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="What are people asking AI? e.g., 'Should I get a flu vaccine this year?'"
            style={styles.textarea}
            rows={3}
          />
          <button
            type="submit"
            disabled={loading || !question.trim()}
            style={{
              ...styles.button,
              opacity: loading || !question.trim() ? 0.5 : 1,
            }}
          >
            {loading ? 'Listening...' : 'Hear the Chorus'}
          </button>
        </form>

        {error && (
          <div style={styles.error}>{error}</div>
        )}

        {loading && (
          <div style={styles.loading}>
            <div style={styles.spinner}></div>
            <p>Listening to {providers.length} AI voices...</p>
          </div>
        )}

        {responses.length > 0 && (
          <div style={styles.responses}>
            <h2 style={styles.sectionTitle}>Individual Voices</h2>
            <div style={styles.grid}>
              {responses.map((r, i) => (
                <ResponseCard key={i} response={r} />
              ))}
            </div>
          </div>
        )}

        {synthesis && (
          <div style={styles.synthesis}>
            <h2 style={styles.sectionTitle}>Public Health Analysis</h2>
            <ResponseCard response={synthesis} isSynthesis />
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Chorus analyzes responses from OpenAI, Anthropic, Google & Ollama</p>
      </footer>
    </div>
  )
}

function ResponseCard({ response, isSynthesis }) {
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
    <div style={{
      ...styles.card,
      borderColor: color,
      ...(isSynthesis ? styles.synthesisCard : {})
    }}>
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
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 600,
    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: '#e4e4e7',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  tagline: {
    color: '#71717a',
    fontSize: '0.95rem',
    marginTop: '0.25rem',
  },
  providers: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'center',
    marginTop: '1rem',
    flexWrap: 'wrap',
  },
  providerBadge: {
    background: 'rgba(255,255,255,0.1)',
    padding: '0.25rem 0.75rem',
    borderRadius: '1rem',
    fontSize: '0.8rem',
    textTransform: 'capitalize',
  },
  main: {
    flex: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '2rem',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    fontSize: '1rem',
    borderRadius: '0.75rem',
    border: '2px solid rgba(255,255,255,0.1)',
    background: 'rgba(255,255,255,0.05)',
    color: '#e4e4e7',
    resize: 'vertical',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  },
  button: {
    padding: '1rem 2rem',
    fontSize: '1rem',
    fontWeight: 500,
    borderRadius: '0.75rem',
    border: 'none',
    background: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
    color: 'white',
    cursor: 'pointer',
    transition: 'transform 0.2s, opacity 0.2s',
  },
  error: {
    background: 'rgba(239, 68, 68, 0.1)',
    border: '1px solid #ef4444',
    borderRadius: '0.75rem',
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
    width: '40px',
    height: '40px',
    border: '3px solid rgba(255,255,255,0.1)',
    borderTopColor: '#a855f7',
    borderRadius: '50%',
    margin: '0 auto 1rem',
    animation: 'spin 1s linear infinite',
  },
  responses: {
    marginBottom: '2rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: 500,
    marginBottom: '1rem',
    color: '#e4e4e7',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1rem',
  },
  synthesis: {
    marginBottom: '2rem',
  },
  card: {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '0.75rem',
    border: '1px solid',
    overflow: 'hidden',
  },
  synthesisCard: {
    background: 'rgba(168, 85, 247, 0.05)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderBottom: '1px solid rgba(255,255,255,0.1)',
  },
  providerName: {
    fontWeight: 600,
    fontSize: '0.9rem',
  },
  model: {
    fontSize: '0.75rem',
    color: '#71717a',
  },
  cardContent: {
    padding: '1rem',
    fontSize: '0.9rem',
    lineHeight: 1.7,
    maxHeight: '400px',
    overflowY: 'auto',
  },
  cardError: {
    padding: '1rem',
    color: '#fca5a5',
  },
  footer: {
    textAlign: 'center',
    padding: '2rem 0',
    color: '#52525b',
    fontSize: '0.875rem',
  },
}

// Add keyframes for spinner
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  textarea:focus {
    border-color: rgba(168, 85, 247, 0.5) !important;
  }
  button:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  .card-content h2 { font-size: 1.1rem; margin: 1rem 0 0.5rem; }
  .card-content h3 { font-size: 1rem; margin: 0.75rem 0 0.5rem; }
  .card-content p { margin-bottom: 0.75rem; }
  .card-content ul, .card-content ol { margin-left: 1.5rem; margin-bottom: 0.75rem; }
`
document.head.appendChild(styleSheet)

export default App

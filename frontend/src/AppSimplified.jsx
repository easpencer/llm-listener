import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const PROVIDER_COLORS = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d4a574',
  'Google Gemini': '#4285f4',
  'Grok': '#1da1f2',
  'Ollama': '#94a3b8',
}

function AppSimplified() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])
  const [synthesis, setSynthesis] = useState(null)
  const [providers, setProviders] = useState([])
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

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

  const parseSynthesis = (content) => {
    if (!content) return { message: null, concerns: null }

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

    // Extract only the message and concerns
    const message = sections.find(s => s.title.includes('Recommended Public Health Message'))
    const concerns = sections.find(s => s.title.includes('Concerns') || s.title.includes('Hesitanc'))

    return { message, concerns }
  }

  const copyMessage = (text) => {
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

  const { message, concerns } = synthesis ? parseSynthesis(synthesis.content) : { message: null, concerns: null }
  const successCount = responses.filter(r => r.success).length

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="title">Chorus</h1>
        <p className="subtitle">AI-Powered Public Health Messaging</p>
      </header>

      <main className="main">
        {/* Input Section */}
        <div className="input-section">
          <form onSubmit={handleSubmit} className="form">
            <label className="label">What health question is the public asking AI?</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a health question..."
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
              >
                {loading ? 'Analyzing...' : 'Get Message'}
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
            <div className="spinner"></div>
            <p>Analyzing {providers.length} AI models...</p>
          </div>
        )}

        {/* Ready-to-Use Message - THE MAIN OUTPUT */}
        {message && (
          <section className="section">
            <div className="highlight-card">
              <div className="highlight-header">
                <div className="highlight-title-row">
                  <span className="highlight-icon">💬</span>
                  <h2 className="highlight-title">Your Public Health Message</h2>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => copyMessage(message.content)}
                >
                  {copied ? '✓ Copied!' : 'Copy Message'}
                </button>
              </div>
              <div className="highlight-content">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        {/* Key Concerns to Address */}
        {concerns && (
          <section className="section">
            <div className="concerns-card">
              <div className="concerns-header">
                <span className="concerns-icon">⚠️</span>
                <h2 className="concerns-title">Key Concerns to Address</h2>
              </div>
              <div className="concerns-content">
                <ReactMarkdown>{concerns.content}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        {/* Summary line about sources */}
        {successCount > 0 && (
          <div className="sources-note">
            <p>Based on analysis of {successCount} AI models: {responses.filter(r => r.success).map(r => r.provider_name).join(', ')}</p>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Chorus helps public health officials understand AI narratives</p>
      </footer>
    </div>
  )
}

// Inject styles
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  * { box-sizing: border-box; }

  .app-container {
    max-width: 800px;
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

  .title {
    font-size: 2.5rem;
    font-weight: 600;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
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

  .textarea:focus {
    border-color: rgba(168, 85, 247, 0.5);
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
    padding: 0.75rem 2rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.5rem;
    border: none;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
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
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255,255,255,0.1);
    border-top-color: #a855f7;
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .section {
    margin-bottom: 1.5rem;
  }

  /* Main highlight card */
  .highlight-card {
    background: linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(168, 85, 247, 0.15) 100%);
    border-radius: 1rem;
    border: 2px solid #ec4899;
    overflow: hidden;
  }

  .highlight-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.25rem 1.5rem;
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
    font-size: 1.25rem;
    font-weight: 600;
    color: #f9a8d4;
    margin: 0;
  }

  .copy-btn {
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
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
    font-size: 1.1rem;
    line-height: 1.8;
    color: #f4f4f5;
  }

  .highlight-content p:first-child {
    font-size: 1.2rem;
    font-weight: 500;
  }

  /* Concerns card - secondary */
  .concerns-card {
    background: rgba(245, 158, 11, 0.08);
    border-radius: 0.75rem;
    border: 1px solid rgba(245, 158, 11, 0.3);
    overflow: hidden;
  }

  .concerns-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.875rem 1.25rem;
    background: rgba(245, 158, 11, 0.1);
    border-bottom: 1px solid rgba(245, 158, 11, 0.2);
  }

  .concerns-icon {
    font-size: 1.25rem;
  }

  .concerns-title {
    font-size: 1rem;
    font-weight: 600;
    color: #fbbf24;
    margin: 0;
  }

  .concerns-content {
    padding: 1.25rem;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #d4d4d8;
  }

  /* Sources note */
  .sources-note {
    text-align: center;
    padding: 1rem;
    color: #71717a;
    font-size: 0.8rem;
    border-top: 1px solid rgba(255,255,255,0.05);
    margin-top: 1rem;
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
  p { margin-bottom: 0.75rem; }
  p:last-child { margin-bottom: 0; }
  ul, ol { margin-left: 1.25rem; margin-bottom: 0.75rem; padding-left: 0; }
  li { margin-bottom: 0.3rem; }
  li::marker { color: #71717a; }
  strong { color: #f4f4f5; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }

  /* Mobile */
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

export default AppSimplified

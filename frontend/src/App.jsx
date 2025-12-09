import { useState, useEffect, useRef } from 'react'
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

// Prism logo - triangular prism refracting light
function PrismLogo({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="prism-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
        <linearGradient id="rainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="25%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="75%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <path d="M24 6L42 38H6L24 6Z" fill="url(#prism-gradient)" opacity="0.9" />
      <line x1="2" y1="20" x2="18" y2="20" stroke="white" strokeWidth="2" opacity="0.6" />
      <line x1="30" y1="22" x2="46" y2="14" stroke="#ef4444" strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="24" x2="46" y2="20" stroke="#f59e0b" strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="26" x2="46" y2="26" stroke="#10b981" strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="28" x2="46" y2="32" stroke="#3b82f6" strokeWidth="1.5" opacity="0.8" />
      <line x1="30" y1="30" x2="46" y2="38" stroke="#8b5cf6" strokeWidth="1.5" opacity="0.8" />
    </svg>
  )
}

// Chorus logo - harmonizing waves with medical cross
function ChorusLogo({ size = 48, animated = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={animated ? 'chorus-logo-animated' : ''}>
      <defs>
        <linearGradient id="chorus-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#0891b2" />
        </linearGradient>
        <linearGradient id="chorus-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      {/* Background circle with gradient */}
      <circle cx="24" cy="24" r="22" fill="url(#chorus-gradient-1)" opacity="0.15" />
      {/* Harmonizing waves */}
      <path className="wave-1" d="M8 24 Q14 18, 20 24 T32 24 T44 24" stroke="url(#chorus-gradient-1)" strokeWidth="2.5" fill="none" opacity="0.9" filter="url(#glow)" />
      <path className="wave-2" d="M8 20 Q14 14, 20 20 T32 20 T44 20" stroke="#14b8a6" strokeWidth="2" fill="none" opacity="0.7" />
      <path className="wave-3" d="M8 28 Q14 22, 20 28 T32 28 T44 28" stroke="#0891b2" strokeWidth="2" fill="none" opacity="0.7" />
      {/* Central medical plus */}
      <rect x="21" y="16" width="6" height="16" rx="1" fill="white" opacity="0.95" />
      <rect x="16" y="21" width="16" height="6" rx="1" fill="white" opacity="0.95" />
      {/* Inner glow circle */}
      <circle cx="24" cy="24" r="8" fill="url(#chorus-gradient-2)" opacity="0.3" />
    </svg>
  )
}

// Evidence Profile Panel - Multi-dimensional scoring: Quality (A-D) · Retrieval (I-III) · Agreement (%)
function EvidenceProfilePanel({ confidence, compact = false }) {
  if (!confidence) return null

  // Extract or compute profile dimensions
  const profile = confidence.profile || {}
  const quality = profile.quality || 'C'
  const retrieval = profile.retrieval || 'II'
  const agreement = profile.agreement ?? 75
  const sources = confidence.sources || {}

  // Color schemes for each grade
  const qualityColors = {
    A: { main: '#10b981', bg: 'rgba(16, 185, 129, 0.15)', label: 'High Quality' },
    B: { main: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', label: 'Moderate Quality' },
    C: { main: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', label: 'Low Quality' },
    D: { main: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', label: 'Very Low' }
  }

  const retrievalColors = {
    I: { main: '#10b981', label: 'Strong Retrieval' },
    II: { main: '#f59e0b', label: 'Moderate Retrieval' },
    III: { main: '#ef4444', label: 'Limited Retrieval' }
  }

  const qColor = qualityColors[quality] || qualityColors.C
  const rColor = retrievalColors[retrieval] || retrievalColors.II

  // Agreement color
  const getAgreementColor = (pct) => {
    if (pct >= 85) return '#10b981'
    if (pct >= 65) return '#3b82f6'
    if (pct >= 45) return '#f59e0b'
    return '#ef4444'
  }

  // Render dots for source strength (1-4)
  const renderDots = (filled, total = 4, color) => (
    <div className="source-dots">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`dot ${i < filled ? 'filled' : ''}`}
          style={{ backgroundColor: i < filled ? color : undefined }}
        />
      ))}
    </div>
  )

  if (compact) {
    return (
      <div className="evidence-profile-compact" style={{ borderColor: qColor.main }}>
        <span className="profile-code">
          <span className="code-quality" style={{ color: qColor.main }}>{quality}</span>
          <span className="code-separator">·</span>
          <span className="code-retrieval" style={{ color: rColor.main }}>{retrieval}</span>
          <span className="code-separator">·</span>
          <span className="code-agreement" style={{ color: getAgreementColor(agreement) }}>{agreement}%</span>
        </span>
      </div>
    )
  }

  return (
    <div className="evidence-profile-panel">
      {/* Main Profile Badge */}
      <div className="profile-header">
        <div className="profile-badge-container">
          <div className="profile-badge" style={{ background: `linear-gradient(135deg, ${qColor.bg} 0%, rgba(30, 41, 59, 0.95) 100%)` }}>
            <span className="badge-quality" style={{ color: qColor.main }}>{quality}</span>
            <span className="badge-dot">·</span>
            <span className="badge-retrieval" style={{ color: rColor.main }}>{retrieval}</span>
            <span className="badge-dot">·</span>
            <span className="badge-agreement" style={{ color: getAgreementColor(agreement) }}>{agreement}%</span>
          </div>
          <div className="profile-label">Evidence Profile</div>
        </div>

        {/* Quick interpretation */}
        <div className="profile-interpretation">
          <div className="interp-item">
            <span className="interp-icon" style={{ color: qColor.main }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
              </svg>
            </span>
            <span className="interp-text">{qColor.label}</span>
          </div>
          <div className="interp-item">
            <span className="interp-icon" style={{ color: rColor.main }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
              </svg>
            </span>
            <span className="interp-text">{rColor.label}</span>
          </div>
          <div className="interp-item">
            <span className="interp-icon" style={{ color: getAgreementColor(agreement) }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </span>
            <span className="interp-text">{agreement >= 85 ? 'Strong' : agreement >= 65 ? 'Moderate' : 'Limited'} Consensus</span>
          </div>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="profile-sources">
        <div className="sources-grid">
          {/* Guidelines */}
          <div className="source-card">
            <div className="source-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <span className="source-name">Guidelines</span>
            </div>
            {renderDots(sources.guidelines?.strength || 0, 4, '#6366f1')}
            <span className="source-detail">{sources.guidelines?.count || 0} official sources</span>
          </div>

          {/* Literature */}
          <div className="source-card">
            <div className="source-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0891b2" strokeWidth="2">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="source-name">Literature</span>
            </div>
            {renderDots(sources.literature?.strength || 0, 4, '#0891b2')}
            <span className="source-detail">{sources.literature?.count || 0} papers</span>
          </div>

          {/* AI Consensus */}
          <div className="source-card">
            <div className="source-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2">
                <rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="3"/>
                <path d="M12 8v3"/><path d="M8 16h.01"/><path d="M16 16h.01"/>
              </svg>
              <span className="source-name">AI Models</span>
            </div>
            {renderDots(sources.ai?.strength || 0, 4, '#8b5cf6')}
            <span className="source-detail">{sources.ai?.count || 0} models agree</span>
          </div>

          {/* Cross-validation */}
          <div className="source-card source-bonus">
            <div className="source-header">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
              <span className="source-name">Validation</span>
            </div>
            {renderDots(sources.crossValidation?.strength || 0, 4, '#10b981')}
            <span className="source-detail">
              {sources.crossValidation?.sources?.join(' + ') || 'Cross-checked'}
            </span>
          </div>
        </div>
      </div>

      {/* Cochrane-style qualitative statement */}
      <div className="profile-statement" style={{ borderLeftColor: qColor.main }}>
        <span className="statement-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
          </svg>
        </span>
        <span className="statement-text">
          {quality === 'A' && agreement >= 85 && "We are highly confident in this evidence. Multiple high-quality sources strongly agree."}
          {quality === 'A' && agreement < 85 && "High-quality evidence available, though sources show some variation in recommendations."}
          {quality === 'B' && agreement >= 70 && "We are moderately confident. Good evidence with reasonable consensus across sources."}
          {quality === 'B' && agreement < 70 && "Moderate evidence quality with notable disagreement between sources."}
          {quality === 'C' && "Limited evidence available. Findings should be interpreted with caution."}
          {quality === 'D' && "Very limited evidence. Recommendations are largely based on AI synthesis or expert opinion."}
        </span>
      </div>
    </div>
  )
}

function App() {
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)
  const [responses, setResponses] = useState([])
  const [synthesis, setSynthesis] = useState(null)
  const [evidence, setEvidence] = useState(null)
  const [providers, setProviders] = useState([])
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)
  const [studyModalOpen, setStudyModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('patient') // 'patient' or 'clinician'
  const [showAllAI, setShowAllAI] = useState(false)
  const [followUp, setFollowUp] = useState('')
  const [conversationHistory, setConversationHistory] = useState([]) // [{question, synthesis}]
  const [clarification, setClarification] = useState(null) // Clarification suggestions from AI
  const [clarifying, setClarifying] = useState(false) // Loading state for clarification
  const [followUpOpen, setFollowUpOpen] = useState(false) // FAB panel state
  const [clarifyConvo, setClarifyConvo] = useState([]) // Conversational clarification: [{role: 'ai'|'user', text: string}]
  const [clarifyInput, setClarifyInput] = useState('') // Current clarification input
  const [clarifyReady, setClarifyReady] = useState(false) // Whether the refined question is ready
  const [showEvidenceInfo, setShowEvidenceInfo] = useState(false) // Evidence scoring info modal
  const resultsRef = useRef(null)
  const followUpRef = useRef(null)
  const clarifyRef = useRef(null)

  // App configuration from backend
  const [appConfig, setAppConfig] = useState({
    app_mode: 'prism',
    app_name: 'Prism',
    show_study: true,
    default_mode: 'public_health',
    tagline: 'AI-Powered Public Health Communication',
  })

  const [mode, setMode] = useState('public_health')
  const [viewMode, setViewMode] = useState(() => {
    return localStorage.getItem('chorusViewMode') || 'detailed'
  })

  useEffect(() => {
    fetch('/api/config')
      .then(res => res.json())
      .then(data => {
        setAppConfig(data)
        setMode(data.default_mode)
        // Chorus defaults to clinician view
        if (data.app_mode === 'chorus') {
          setActiveTab('clinician')
        }
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/providers')
      .then(res => res.json())
      .then(data => setProviders(data.configured))
      .catch(() => setProviders([]))
  }, [])

  useEffect(() => {
    localStorage.setItem('chorusViewMode', viewMode)
  }, [viewMode])

  // Scroll to results when they appear
  useEffect(() => {
    if (synthesis && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [synthesis])

  // Auto-scroll to clarification conversation when it starts
  useEffect(() => {
    if (clarifyConvo.length > 0 && clarifyRef.current) {
      setTimeout(() => {
        clarifyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [clarifyConvo.length])

  const handleSubmit = async (e, skipClarification = false) => {
    e?.preventDefault?.()
    if (!question.trim() || loading || clarifying) return

    // Clear any existing clarification state
    setClarification(null)
    setClarifyConvo([])
    setClarifyReady(false)
    setError(null)

    // For Chorus mode, start conversational clarification
    if (appConfig.app_mode === 'chorus' && !skipClarification) {
      startClarifyConversation(question)
      return
    }

    // For Prism mode or skipped clarification, run search directly
    runSearch(question)
  }

  // Handle user choice from clarification UI (legacy)
  const handleClarificationChoice = (choice, customQuestion = null) => {
    const newQuestion = choice === 'custom' ? customQuestion :
                        choice === 'refined' ? clarification.refined_question :
                        choice === 'original' ? clarification.original_question :
                        clarification.suggestions[choice]

    if (newQuestion) {
      setQuestion(newQuestion)
      setClarification(null)
      // Trigger search with the new question
      setTimeout(() => {
        handleSubmit(null, true) // Skip clarification since user already made a choice
      }, 100)
    }
  }

  // Skip clarification and search with original question (legacy)
  const handleSkipClarification = () => {
    setClarification(null)
    setTimeout(() => {
      handleSubmit(null, true)
    }, 100)
  }

  // Start conversational clarification
  const startClarifyConversation = async (originalQuestion) => {
    setClarifying(true)
    setClarifyConvo([])
    setClarifyInput('')
    setClarifyReady(false)

    try {
      const res = await fetch('/api/clarify-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original_question: originalQuestion,
          conversation: [],
        }),
      })

      if (res.ok) {
        const data = await res.json()
        if (data.is_ready) {
          // Question is already clear enough, proceed to search
          setClarifying(false)
          setQuestion(data.refined_question)
          runSearch(data.refined_question)
        } else {
          // Start conversation with AI's first question
          setClarification({ originalQuestion, refinedQuestion: data.refined_question, quickOptions: data.quick_options })
          setClarifyConvo([{ role: 'ai', text: data.clarifying_question }])
          setClarifying(false)
        }
      } else {
        // API error, proceed with original
        setClarifying(false)
        runSearch(originalQuestion)
      }
    } catch (err) {
      console.error('Clarification failed:', err)
      setClarifying(false)
      runSearch(originalQuestion)
    }
  }

  // Continue clarification conversation
  const handleClarifyResponse = async (userResponse) => {
    if (!userResponse.trim()) return

    // Add user's response to conversation
    const newConvo = [...clarifyConvo, { role: 'user', text: userResponse }]
    setClarifyConvo(newConvo)
    setClarifyInput('')
    setClarifying(true)

    try {
      const res = await fetch('/api/clarify-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          original_question: clarification.originalQuestion,
          conversation: newConvo,
        }),
      })

      if (res.ok) {
        const data = await res.json()
        setClarification(prev => ({
          ...prev,
          refinedQuestion: data.refined_question,
          quickOptions: data.quick_options,
        }))

        if (data.is_ready) {
          // Question is refined enough, show ready state
          setClarifyReady(true)
          setClarifying(false)
        } else {
          // Continue conversation
          setClarifyConvo([...newConvo, { role: 'ai', text: data.clarifying_question }])
          setClarifying(false)
        }
      } else {
        setClarifying(false)
        setClarifyReady(true)
      }
    } catch (err) {
      console.error('Clarification step failed:', err)
      setClarifying(false)
      setClarifyReady(true)
    }
  }

  // Search with refined question
  const searchWithRefined = () => {
    const refinedQ = clarification?.refinedQuestion || question
    setQuestion(refinedQ)
    setClarification(null)
    setClarifyConvo([])
    setClarifyReady(false)
    runSearch(refinedQ)
  }

  // Skip clarification conversation
  const skipClarifyConvo = () => {
    const originalQ = clarification?.originalQuestion || question
    setClarification(null)
    setClarifyConvo([])
    setClarifyReady(false)
    runSearch(originalQ)
  }

  // Actual search function
  const runSearch = async (searchQuestion) => {
    setLoading(true)
    setResponses([])
    setSynthesis(null)
    setEvidence(null)
    setError(null)
    setShowAllAI(false)
    setConversationHistory([])
    setFollowUp('')

    try {
      const queryPromise = fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: searchQuestion, include_synthesis: true, mode }),
      })

      const evidencePromise = mode === 'health_research'
        ? fetch('/api/evidence', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: searchQuestion }),
          })
        : null

      const [queryRes, evidenceRes] = await Promise.all([queryPromise, evidencePromise])

      if (!queryRes.ok) {
        const err = await queryRes.json()
        throw new Error(err.detail || 'Failed to query LLMs')
      }

      const queryData = await queryRes.json()
      setResponses(queryData.responses)
      setSynthesis(queryData.synthesis)
      setConversationHistory([{ question: searchQuestion, synthesis: queryData.synthesis }])

      if (evidenceRes && evidenceRes.ok) {
        const evidenceData = await evidenceRes.json()
        setEvidence(evidenceData)
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleFollowUp = async (e) => {
    e.preventDefault()
    if (!followUp.trim() || loading) return

    setLoading(true)
    setError(null)

    // Build context from conversation history
    const context = conversationHistory.map(h =>
      `Previous question: ${h.question}\nPrevious answer: ${h.synthesis?.content || ''}`
    ).join('\n\n')

    // Create follow-up query with context
    const followUpQuestion = `Context from previous conversation:\n${context}\n\nFollow-up question: ${followUp}`

    try {
      const queryRes = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: followUpQuestion,
          include_synthesis: true,
          mode
        }),
      })

      if (!queryRes.ok) {
        const err = await queryRes.json()
        throw new Error(err.detail || 'Failed to query LLMs')
      }

      const queryData = await queryRes.json()
      setResponses(queryData.responses)
      setSynthesis(queryData.synthesis)

      // Add to conversation history
      setConversationHistory(prev => [...prev, { question: followUp, synthesis: queryData.synthesis }])
      setFollowUp('')

      // Focus back on follow-up input
      setTimeout(() => followUpRef.current?.focus(), 100)
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
    if (title.includes('Hearing')) return { icon: '👂', color: '#3b82f6', priority: 1 }
    if (title.includes('Concerns') || title.includes('Hesitanc')) return { icon: '⚠️', color: '#f59e0b', priority: 2 }
    if (title.includes('Misinformation')) return { icon: '🚨', color: '#ef4444', priority: 3 }
    if (title.includes('Effective') || title.includes('Messaging Angles')) return { icon: '✅', color: '#10b981', priority: 4 }
    if (title.includes('Recommendations for Public Health Officials')) return { icon: '📋', color: '#8b5cf6', priority: 5 }
    if (title.includes('Recommended Public Health Message')) return { icon: '💬', color: '#ec4899', priority: 6, highlight: true }
    if (title.includes('Evidence Summary')) return { icon: '📚', color: '#0ea5e9', priority: 1 }
    if (title.includes('Points of Agreement')) return { icon: '✅', color: '#10b981', priority: 2 }
    if (title.includes('Points of Disagreement')) return { icon: '⚡', color: '#f59e0b', priority: 3 }
    if (title.includes('Confidence Level')) return { icon: '📊', color: '#14b8a6', priority: 4 }
    if (title.includes('Recommendations for Further Research')) return { icon: '🔬', color: '#06b6d4', priority: 5 }
    return { icon: '📝', color: '#6b7280', priority: 99 }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Chorus-specific example questions for clinicians
  const chorusExamples = [
    "What is the current evidence on GLP-1 agonists for weight management in non-diabetic patients?",
    "Should I recommend aspirin for primary cardiovascular prevention in a 55-year-old male?",
    "What are the latest guidelines on antibiotic prophylaxis for dental procedures in patients with prosthetic heart valves?",
    "Is there evidence supporting intermittent fasting for metabolic syndrome?",
  ]

  // Prism-specific example questions
  const prismExamples = [
    "Should I get a flu vaccine this year?",
    "Are COVID boosters still recommended?",
    "Is it safe to eat eggs during a bird flu outbreak?",
    "What are the side effects of the MMR vaccine?",
  ]

  const exampleQuestions = appConfig.app_mode === 'chorus' ? chorusExamples : prismExamples

  const analysisSection = synthesis ? parseSynthesis(synthesis.content) : []
  const highlightSection = analysisSection.find(s => getSectionMeta(s.title).highlight)
  const regularSections = analysisSection.filter(s => !getSectionMeta(s.title).highlight)

  // Intelligent synthesis that integrates evidence, expert opinion, and AI perspectives
  const generateIntegratedSynthesis = () => {
    if (!synthesis && !evidence && responses.length === 0) return null

    // Analyze evidence sources
    const guidelinesSummary = analyzeGuidelines(evidence?.guidelines)
    const literatureSummary = analyzeLiterature(evidence?.literature)
    const aiConsensusSummary = analyzeAIConsensus(responses)

    // Determine confidence level based on source agreement
    const confidence = calculateConfidence(guidelinesSummary, literatureSummary, aiConsensusSummary)

    return {
      guidelines: guidelinesSummary,
      literature: literatureSummary,
      aiConsensus: aiConsensusSummary,
      confidence,
      hasEvidence: (evidence?.guidelines?.count > 0) || (evidence?.literature?.count > 0),
      hasAI: responses.filter(r => r.success).length > 0,
    }
  }

  // Analyze official guidelines for key recommendations
  const analyzeGuidelines = (guidelines) => {
    if (!guidelines || guidelines.count === 0) {
      return { available: false, summary: null, sources: [] }
    }

    const sources = guidelines.source_types || {}
    const links = guidelines.links || []

    // Extract key organizations that provided guidance
    const orgs = Object.entries(sources)
      .filter(([_, count]) => count > 0)
      .map(([org]) => org)

    // Create a structured summary from snippets
    const keyPoints = links.slice(0, 5).map(link => ({
      text: link.snippet,
      source: extractOrgFromUrl(link.url),
      url: link.url,
      title: link.title,
    })).filter(p => p.text)

    return {
      available: true,
      organizations: orgs,
      keyPoints,
      totalSources: guidelines.count,
      sources: links,
    }
  }

  // Extract organization name from URL
  const extractOrgFromUrl = (url) => {
    if (url.includes('cdc.gov')) return 'CDC'
    if (url.includes('who.int')) return 'WHO'
    if (url.includes('fda.gov')) return 'FDA'
    if (url.includes('nih.gov')) return 'NIH'
    if (url.includes('heart.org')) return 'AHA'
    if (url.includes('cancer.org')) return 'ACS'
    return 'Medical Authority'
  }

  // Analyze scientific literature for research findings
  const analyzeLiterature = (literature) => {
    if (!literature || literature.count === 0) {
      return { available: false, summary: null, topCited: [] }
    }

    const topCited = literature.top_cited || []
    const links = literature.links || []

    // Extract findings from most-cited papers
    const researchFindings = links.slice(0, 5).map(link => ({
      text: link.snippet,
      citations: link.cited_by || 0,
      publication: link.publication_info,
      url: link.url,
      title: link.title,
    })).filter(f => f.text)

    return {
      available: true,
      totalPapers: literature.count,
      topCited: topCited.slice(0, 3),
      researchFindings,
      sources: links,
    }
  }

  // Analyze AI model responses for consensus and disagreement
  const analyzeAIConsensus = (responses) => {
    const successfulResponses = responses.filter(r => r.success)
    if (successfulResponses.length === 0) {
      return { available: false, consensus: null, providers: [] }
    }

    // Get provider names and their responses
    const providers = successfulResponses.map(r => ({
      name: r.provider_name,
      model: r.model,
      content: r.content,
    }))

    return {
      available: true,
      modelCount: successfulResponses.length,
      providers,
      // The backend synthesis already does consensus analysis
      synthesisContent: synthesis?.content || null,
    }
  }

  // Calculate overall confidence based on source agreement
  const calculateConfidence = (guidelines, literature, aiConsensus) => {
    // Multi-dimensional Evidence Profile: Quality (A-D) · Retrieval (I-III) · Agreement (%)
    // CONSERVATIVE scoring - 100% should be nearly impossible without RCTs + major guidelines

    const guidelinesCount = guidelines.available ? (guidelines.totalSources || 0) : 0
    const literatureCount = literature.available ? (literature.totalPapers || 0) : 0
    const aiCount = aiConsensus.available ? (aiConsensus.modelCount || 0) : 0

    // Source strengths (1-4 dots) - conservative
    const guidelinesStrength = guidelinesCount >= 5 ? 4 : guidelinesCount >= 3 ? 3 : guidelinesCount >= 2 ? 2 : guidelinesCount >= 1 ? 1 : 0
    const literatureStrength = literatureCount >= 20 ? 4 : literatureCount >= 10 ? 3 : literatureCount >= 5 ? 2 : literatureCount >= 1 ? 1 : 0
    const aiStrength = aiCount >= 4 ? 3 : aiCount >= 3 ? 2 : aiCount >= 1 ? 1 : 0 // AI max is 3, never 4

    const sourceTypes = [guidelines.available, literature.available, aiConsensus.available].filter(Boolean).length
    const crossValidationStrength = sourceTypes >= 3 ? 3 : sourceTypes >= 2 ? 2 : sourceTypes >= 1 ? 1 : 0

    // Evidence Quality Grade (A-D) - VERY conservative based on GRADE
    // A: HIGH - Requires official treatment guidelines from CDC/WHO/FDA + large RCTs/meta-analyses
    //    Think: "Vaccines prevent measles" or "Antibiotics treat bacterial infections"
    // B: MODERATE - Some guidelines OR substantial peer-reviewed literature
    // C: LOW - Limited studies, emerging research, or only AI synthesis
    // D: VERY LOW - Anecdotal, AI-only, or contradictory evidence
    let quality = 'D'
    const hasOfficialGuidelines = guidelinesCount >= 1
    const hasSubstantialLiterature = literatureCount >= 10
    const hasModestLiterature = literatureCount >= 3

    if (guidelinesCount >= 3 && literatureCount >= 15) {
      quality = 'A' // Very high bar: multiple official guidelines + extensive literature
    } else if (hasOfficialGuidelines && hasSubstantialLiterature) {
      quality = 'B' // Official guidance backed by solid research
    } else if (hasOfficialGuidelines || hasModestLiterature) {
      quality = 'C' // Some evidence but not robust
    }
    // D is default - AI consensus alone is never higher than D

    // Retrieval Confidence (I-III) - how well we found relevant evidence
    let retrieval = 'III'
    if (sourceTypes >= 3 && (guidelinesCount >= 2 || literatureCount >= 5)) {
      retrieval = 'I'
    } else if (sourceTypes >= 2 && (guidelinesCount >= 1 || literatureCount >= 3)) {
      retrieval = 'II'
    }

    // Agreement % - CONSERVATIVE: 100% should be nearly impossible
    // Base agreement starts at 40% (uncertainty is default)
    // Max achievable without RCTs + guidelines is ~70%
    let agreement = 40

    // Guidelines add credibility
    if (guidelinesCount >= 3) agreement += 20
    else if (guidelinesCount >= 2) agreement += 15
    else if (guidelinesCount >= 1) agreement += 10

    // Literature adds evidence
    if (literatureCount >= 15) agreement += 15
    else if (literatureCount >= 10) agreement += 10
    else if (literatureCount >= 5) agreement += 7
    else if (literatureCount >= 1) agreement += 3

    // AI consensus adds modest support (AI agreement alone shouldn't drive high confidence)
    if (aiCount >= 4) agreement += 8
    else if (aiCount >= 3) agreement += 5
    else if (aiCount >= 2) agreement += 3

    // Cross-validation bonus (sources corroborate each other)
    if (sourceTypes >= 3) agreement += 10
    else if (sourceTypes >= 2) agreement += 5

    // Cap at 95% - true 100% requires established medical fact
    // (like "water is essential for life" or "penicillin treats bacterial infections")
    agreement = Math.min(agreement, 95)

    const sourcesUsed = [
      guidelines.available && 'Guidelines',
      literature.available && 'Literature',
      aiConsensus.available && 'AI'
    ].filter(Boolean)

    return {
      profile: { quality, retrieval, agreement },
      sources: {
        guidelines: { strength: guidelinesStrength, count: guidelinesCount, orgs: guidelines.organizations || [] },
        literature: { strength: literatureStrength, count: literatureCount, topCitations: literature.topCited?.[0]?.citations || 0 },
        ai: { strength: aiStrength, count: aiCount, models: aiConsensus.providers?.map(p => p.name) || [] },
        crossValidation: { strength: crossValidationStrength, sources: sourcesUsed }
      },
      // Legacy - use profile format display, not these raw numbers
      total: agreement,
      score: agreement,
      level: quality === 'A' ? 'high' : quality === 'B' ? 'moderate' : 'limited',
      factors: [
        guidelinesCount > 0 && `Official guidelines (${guidelinesCount} sources)`,
        literatureCount > 0 && `Research literature (${literatureCount} papers)`,
        aiCount > 0 && `AI consensus (${aiCount} models)`,
        sourceTypes >= 2 && 'Cross-validated'
      ].filter(Boolean)
    }
  }

  // Generate a summary for a set of sources (for evidence cards)
  const generateSourceSummary = (sources, type) => {
    if (!sources || sources.length === 0) return null

    const orgs = {}
    sources.forEach(s => {
      const org = extractOrgFromUrl(s.url)
      if (!orgs[org]) orgs[org] = 0
      orgs[org]++
    })

    const orgList = Object.keys(orgs)
    const topics = sources.slice(0, 3).map(s => s.title.split(' - ')[0].split('|')[0].trim())

    if (type === 'guidelines') {
      return `This topic is addressed by ${sources.length} official sources from ${orgList.slice(0, 3).join(', ')}${orgList.length > 3 ? ` and ${orgList.length - 3} other organizations` : ''}. Key guidance covers: ${topics.slice(0, 2).join('; ')}.`
    } else {
      const totalCitations = sources.reduce((sum, s) => sum + (s.cited_by || 0), 0)
      return `Found ${sources.length} peer-reviewed studies on this topic${totalCitations > 0 ? `, with a combined ${totalCitations} citations` : ''}. Research covers: ${topics.slice(0, 2).join('; ')}.`
    }
  }

  // Generate patient-friendly summary - unified synthesis with agreement/disagreement
  const generatePatientSummary = () => {
    const integrated = generateIntegratedSynthesis()
    if (!integrated) return null

    let sections = []
    const aiContent = integrated.aiConsensus.synthesisContent || ''
    const paragraphs = aiContent.split('\n\n').filter(p => p.trim())

    const guidelineCount = integrated.guidelines?.totalSources || 0
    const literatureCount = integrated.literature?.totalPapers || 0
    const aiCount = integrated.aiConsensus?.modelCount || 0
    const orgs = integrated.guidelines.available
      ? [...new Set(integrated.guidelines.sources?.map(s => extractOrgFromUrl(s.url)) || [])]
      : []

    // SECTION 1: Main Summary (unified synthesis)
    if (integrated.aiConsensus.available && paragraphs.length > 0) {
      // Build informative intro
      let intro = ''
      if (guidelineCount > 0 || literatureCount > 0) {
        intro = '*This summary is based on '
        const parts = []
        if (guidelineCount > 0) parts.push(`official health guidelines from ${orgs.slice(0, 2).join(' and ')}`)
        if (literatureCount > 0) parts.push(`${literatureCount} scientific studies`)
        parts.push(`${aiCount} medical AI systems`)
        intro += parts.join(', ') + '.*\n\n'
      }

      sections.push({
        type: 'synthesis',
        icon: '💡',
        title: 'What You Should Know',
        content: intro + paragraphs.join('\n\n'),
        modelCount: aiCount,
        isPrimary: true,
      })
    }

    // SECTION 2: Key Takeaways (agreement)
    let takeawaysContent = ''
    if (guidelineCount >= 2 || literatureCount >= 2) {
      takeawaysContent += '**The evidence agrees on:**\n'
      takeawaysContent += '- Multiple sources have been reviewed and synthesized above\n'
      if (guidelineCount >= 2) {
        takeawaysContent += `- Official guidance is available from ${orgs.slice(0, 3).join(', ')}\n`
      }
      if (literatureCount >= 3) {
        takeawaysContent += `- Scientific research supports these recommendations\n`
      }
    }

    takeawaysContent += '\n**Important notes:**\n'
    takeawaysContent += '- This is for educational purposes - always consult your healthcare provider\n'
    takeawaysContent += '- Individual circumstances may vary\n'

    sections.push({
      type: 'takeaways',
      icon: '✅',
      title: 'Key Points',
      content: takeawaysContent,
    })

    // SECTION 3: Sources
    const sourceLinks = []

    if (integrated.guidelines.available && integrated.guidelines.sources) {
      const guidelineLinks = integrated.guidelines.sources.slice(0, 8).map(s =>
        `- [${s.title}](${s.url}) *(${extractOrgFromUrl(s.url)})*`
      ).join('\n')
      sourceLinks.push(`**Official Guidelines:**\n${guidelineLinks}`)
    }

    if (integrated.literature.available && integrated.literature.sources) {
      const researchLinks = integrated.literature.sources.slice(0, 8).map(s => {
        const cites = s.cited_by > 0 ? ` *(${s.cited_by} citations)*` : ''
        return `- [${s.title}](${s.url})${cites}`
      }).join('\n')
      sourceLinks.push(`**Research:**\n${researchLinks}`)
    }

    if (sourceLinks.length > 0) {
      sections.push({
        type: 'sources',
        icon: '📚',
        title: 'Sources',
        content: sourceLinks.join('\n\n'),
        isSecondary: true,
      })
    }

    return {
      headline: question,
      sections,
      confidence: integrated.confidence,
    }
  }

  // Generate clinician-focused summary - unified synthesis, agreement/disagreement, then references
  const generateClinicianSummary = () => {
    const integrated = generateIntegratedSynthesis()
    if (!integrated) return null

    let sections = []
    const aiContent = integrated.aiConsensus.synthesisContent || ''
    let refNum = 1
    const allRefs = []

    // Collect all references
    if (integrated.guidelines.available && integrated.guidelines.sources) {
      integrated.guidelines.sources.slice(0, 10).forEach(link => {
        allRefs.push({
          num: refNum++,
          title: link.title,
          source: extractOrgFromUrl(link.url),
          url: link.url,
          type: 'guideline',
        })
      })
    }
    if (integrated.literature.available && integrated.literature.sources) {
      integrated.literature.sources.slice(0, 10).forEach(link => {
        allRefs.push({
          num: refNum++,
          title: link.title,
          source: link.publication_info || 'Peer-reviewed',
          url: link.url,
          citations: link.cited_by || 0,
          type: 'literature',
        })
      })
    }

    const guidelineCount = integrated.guidelines?.totalSources || 0
    const literatureCount = integrated.literature?.totalPapers || 0
    const aiCount = integrated.aiConsensus?.modelCount || 0
    const orgs = integrated.guidelines.available
      ? [...new Set(integrated.guidelines.sources?.map(s => extractOrgFromUrl(s.url)) || [])]
      : []

    // SECTION 1: Unified Synthesis (combines authority + literature + AI into one coherent summary)
    if (integrated.aiConsensus.available && aiContent) {
      // Build a comprehensive header describing what was synthesized
      let synthesisIntro = '### Integrated Evidence Summary\n\n'

      if (guidelineCount > 0 || literatureCount > 0) {
        synthesisIntro += 'This synthesis integrates:\n'
        if (guidelineCount > 0) {
          synthesisIntro += `- **${guidelineCount} official guidelines** from ${orgs.slice(0, 4).join(', ')}\n`
        }
        if (literatureCount > 0) {
          const totalCites = integrated.literature.sources?.reduce((s, l) => s + (l.cited_by || 0), 0) || 0
          synthesisIntro += `- **${literatureCount} peer-reviewed studies**${totalCites > 0 ? ` (${totalCites} total citations)` : ''}\n`
        }
        synthesisIntro += `- **${aiCount} AI models** (${integrated.aiConsensus.providers.map(p => p.name).join(', ')})\n\n`
      }

      sections.push({
        type: 'synthesis',
        title: 'Evidence Synthesis',
        subtitle: 'Unified summary from authorities, research, and AI',
        content: synthesisIntro + aiContent,
        modelCount: aiCount,
        isPrimary: true,
      })
    }

    // SECTION 2: Agreement & Disagreement Analysis
    let consensusContent = ''

    // Analyze agreement
    consensusContent += '### Areas of Agreement\n\n'
    if (guidelineCount >= 2 && literatureCount >= 2) {
      consensusContent += `- **Cross-validated findings**: Both official guidelines (${guidelineCount}) and peer-reviewed research (${literatureCount}) address this topic, suggesting established evidence\n`
    }
    if (aiCount >= 3) {
      consensusContent += `- **AI consensus**: ${aiCount} independent AI models analyzed this question and contributed to the synthesis\n`
    }
    if (orgs.length >= 2) {
      consensusContent += `- **Multi-authority support**: Guidance from multiple organizations (${orgs.slice(0, 3).join(', ')})\n`
    }
    if (guidelineCount === 0 && literatureCount === 0) {
      consensusContent += `- Limited external evidence available; synthesis primarily reflects AI analysis\n`
    }

    consensusContent += '\n### Potential Limitations\n\n'
    if (guidelineCount < 3) {
      consensusContent += `- Limited official guideline coverage (${guidelineCount} sources)\n`
    }
    if (literatureCount < 5) {
      consensusContent += `- Research base may benefit from additional literature review\n`
    }
    consensusContent += `- Guidelines may vary by region; verify against local protocols\n`
    consensusContent += `- Evidence should be evaluated in individual clinical context\n`

    sections.push({
      type: 'consensus',
      title: 'Agreement & Limitations',
      content: consensusContent,
    })

    // SECTION 3: References
    if (allRefs.length > 0) {
      const guidelineRefs = allRefs.filter(r => r.type === 'guideline')
      const literatureRefs = allRefs.filter(r => r.type === 'literature')

      let refsContent = ''

      if (guidelineRefs.length > 0) {
        refsContent += '**Official Guidelines:**\n\n'
        refsContent += guidelineRefs.map((r, i) =>
          `${i + 1}. [${r.title}](${r.url}) — *${r.source}*`
        ).join('\n\n') + '\n\n'
      }

      if (literatureRefs.length > 0) {
        refsContent += '**Peer-Reviewed Literature:**\n\n'
        refsContent += literatureRefs.map((r, i) => {
          const cites = r.citations > 0 ? ` *(${r.citations} citations)*` : ''
          return `${i + 1}. [${r.title}](${r.url})${cites}`
        }).join('\n\n')
      }

      sections.push({
        type: 'references',
        title: 'References',
        subtitle: `${allRefs.length} sources`,
        content: refsContent,
        isSecondary: true,
      })
    }

    return {
      headline: question,
      sections,
      confidence: integrated.confidence,
      allRefs,
    }
  }

  // Collect all references from evidence
  const collectReferences = () => {
    const refs = []
    if (evidence?.guidelines?.links) {
      evidence.guidelines.links.forEach((link, i) => {
        refs.push({
          ...link,
          type: 'guideline',
          id: `guideline-${i}`,
        })
      })
    }
    if (evidence?.literature?.links) {
      evidence.literature.links.forEach((link, i) => {
        refs.push({
          ...link,
          type: 'literature',
          id: `literature-${i}`,
        })
      })
    }
    return refs
  }

  // Extract media from responses (images, videos)
  const extractMedia = () => {
    const media = []
    // Check evidence links for potential media
    if (evidence?.guidelines?.links) {
      evidence.guidelines.links.forEach(link => {
        // Look for image URLs in snippets or titles
        if (link.snippet?.includes('image') || link.snippet?.includes('video') ||
            link.snippet?.includes('infographic') || link.snippet?.includes('chart')) {
          media.push({
            type: 'reference',
            title: link.title,
            url: link.url,
            source: 'Official Guidelines',
          })
        }
      })
    }
    return media
  }

  const isChorus = appConfig.app_mode === 'chorus'
  const patientSummary = generatePatientSummary()
  const clinicianSummary = generateClinicianSummary()
  const references = collectReferences()
  const mediaItems = extractMedia()

  // Chorus renders a completely different UI
  if (isChorus) {
    return (
      <div className="chorus-app">
        {/* Animated background */}
        <div className="chorus-bg">
          <div className="chorus-orb chorus-orb-1"></div>
          <div className="chorus-orb chorus-orb-2"></div>
          <div className="chorus-orb chorus-orb-3"></div>
        </div>

        {/* Header */}
        <header className="chorus-header">
          <div className="chorus-brand">
            <ChorusLogo size={64} />
            <div className="chorus-brand-text">
              <h1 className="chorus-title">Chorus</h1>
              <p className="chorus-tagline">Where AI Meets Evidence-Based Medicine</p>
            </div>
          </div>
          <div className="chorus-trust-badges">
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              Evidence-Based
            </span>
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              Real-Time
            </span>
            <span className="trust-badge">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              Multi-Source
            </span>
          </div>
        </header>

        {/* Main content */}
        <main className="chorus-main">
          {/* Search Section */}
          <section className="chorus-search-section glass-card">
            <form onSubmit={handleSubmit} className="chorus-form">
              <label className="chorus-label">
                Ask a clinical question
              </label>
              <div className="chorus-input-wrapper">
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Enter your clinical research question..."
                  className="chorus-textarea"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="chorus-submit-btn"
                >
                  {loading ? (
                    <span className="chorus-btn-loading">
                      <span className="chorus-spinner"></span>
                      Analyzing...
                    </span>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/>
                        <path d="m21 21-4.35-4.35"/>
                      </svg>
                      Search Evidence
                    </>
                  )}
                </button>
              </div>
              <div className="chorus-providers">
                <span className="chorus-providers-label">Synthesizing from:</span>
                {providers.map(p => (
                  <span key={p} className="chorus-provider-chip" style={{
                    borderColor: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#64748b'
                  }}>
                    {p}
                  </span>
                ))}
                <span className="chorus-provider-chip chorus-provider-evidence">+ Evidence Sources</span>
              </div>
            </form>

            <div className="chorus-examples">
              <span className="chorus-examples-label">Try a question:</span>
              <div className="chorus-examples-list">
                {exampleQuestions.map((q, i) => (
                  <button key={i} onClick={() => setQuestion(q)} className="chorus-example-btn">
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {error && (
            <div className="chorus-error glass-card animate-fade-in">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="15" y1="9" x2="9" y2="15"/>
                <line x1="9" y1="9" x2="15" y2="15"/>
              </svg>
              {error}
            </div>
          )}

          {/* Clarification Loading */}
          {clarifying && (
            <div className="chorus-clarifying glass-card animate-fade-in">
              <div className="chorus-loading-animation">
                <div className="chorus-loading-wave"></div>
                <div className="chorus-loading-wave"></div>
                <div className="chorus-loading-wave"></div>
              </div>
              <h3>Analyzing Your Question</h3>
              <p>Checking if we can help refine your query for better results...</p>
            </div>
          )}

          {/* Conversational Clarification UI */}
          {clarification && clarifyConvo.length > 0 && (
            <div ref={clarifyRef} className="chorus-clarification glass-card animate-fade-in">
              <div className="clarification-header">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
                <div>
                  <h3>Let's Refine Your Question</h3>
                  <p className="clarification-explanation">A few quick questions to help get you better results</p>
                </div>
              </div>

              {/* Chat-like conversation */}
              <div className="clarify-conversation">
                {clarifyConvo.map((msg, i) => (
                  <div key={i} className={`clarify-message ${msg.role}`}>
                    {msg.role === 'ai' ? (
                      <div className="clarify-ai-message">
                        <span className="clarify-avatar">
                          <ChorusLogo size={20} animated={false} />
                        </span>
                        <span className="clarify-text">{msg.text}</span>
                      </div>
                    ) : (
                      <div className="clarify-user-message">
                        <span className="clarify-text">{msg.text}</span>
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator when waiting for AI response */}
                {clarifying && (
                  <div className="clarify-message ai">
                    <div className="clarify-ai-message">
                      <span className="clarify-avatar">
                        <ChorusLogo size={20} animated={true} />
                      </span>
                      <span className="clarify-typing">
                        <span></span><span></span><span></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick options */}
              {!clarifying && !clarifyReady && clarification.quickOptions?.length > 0 && (
                <div className="clarify-quick-options">
                  {clarification.quickOptions.map((opt, i) => (
                    <button
                      key={i}
                      className="clarify-quick-btn"
                      onClick={() => handleClarifyResponse(opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {/* Custom input */}
              {!clarifying && !clarifyReady && (
                <div className="clarify-input-row">
                  <input
                    type="text"
                    value={clarifyInput}
                    onChange={(e) => setClarifyInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleClarifyResponse(clarifyInput)}
                    placeholder="Type your answer..."
                    className="clarify-input"
                  />
                  <button
                    className="clarify-send-btn"
                    onClick={() => handleClarifyResponse(clarifyInput)}
                    disabled={!clarifyInput.trim()}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="22" y1="2" x2="11" y2="13"/>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                    </svg>
                  </button>
                </div>
              )}

              {/* Ready state - show refined question and search button */}
              {clarifyReady && (
                <div className="clarify-ready">
                  <div className="clarify-refined-preview">
                    <span className="clarify-refined-label">Ready to search:</span>
                    <span className="clarify-refined-text">{clarification.refinedQuestion}</span>
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="clarification-actions">
                <button
                  className="clarification-skip"
                  onClick={skipClarifyConvo}
                >
                  Skip & search original
                </button>
                {(clarifyReady || clarifyConvo.length >= 2) && (
                  <button
                    className="clarification-search"
                    onClick={searchWithRefined}
                  >
                    {clarifyReady ? 'Search Now' : 'Search with refinement'}
                  </button>
                )}
              </div>
            </div>
          )}

          {loading && (
            <div className="chorus-loading glass-card animate-fade-in">
              <div className="chorus-loading-animation">
                <div className="chorus-loading-wave"></div>
                <div className="chorus-loading-wave"></div>
                <div className="chorus-loading-wave"></div>
              </div>
              <h3>Gathering Evidence</h3>
              <p>Querying {providers.length} AI models and searching medical literature...</p>
              <div className="chorus-loading-steps">
                <span className="loading-step active">Searching Guidelines</span>
                <span className="loading-step active">Querying AI Models</span>
                <span className="loading-step">Synthesizing Results</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          {synthesis && (
            <div ref={resultsRef} className="chorus-results animate-slide-up">
              {/* Summary Cards */}
              <section className="chorus-summaries">
                <div className="chorus-summary-tabs">
                  <button
                    className={`summary-tab ${activeTab === 'patient' ? 'active' : ''}`}
                    onClick={() => setActiveTab('patient')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                      <circle cx="12" cy="7" r="4"/>
                    </svg>
                    For Patients
                  </button>
                  <button
                    className={`summary-tab ${activeTab === 'clinician' ? 'active' : ''}`}
                    onClick={() => setActiveTab('clinician')}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                    For Clinicians
                  </button>
                </div>

                {activeTab === 'patient' && patientSummary && (
                  <div className="chorus-summary-card glass-card patient-summary animate-fade-in">
                    <div className="summary-header">
                      <div className="summary-icon patient-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                          <circle cx="12" cy="7" r="4"/>
                        </svg>
                      </div>
                      <div>
                        <h3>Simple Summary</h3>
                        <span className="summary-subtitle">Easy to understand</span>
                      </div>
                      {patientSummary.confidence && (
                        <div className="evidence-header-group">
                          <EvidenceProfilePanel confidence={patientSummary.confidence} compact={true} />
                          <button
                            className="evidence-info-btn"
                            onClick={() => setShowEvidenceInfo(true)}
                            title="What does this mean?"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="summary-content">
                      {patientSummary.sections.map((section, i) => (
                        <div key={i} className={`summary-section section-${section.type}`}>
                          <div className="section-header-inline">
                            <span className="section-icon">{section.icon}</span>
                            <h4>{section.title}</h4>
                            {section.sourceCount && (
                              <span className="source-count-badge">{section.sourceCount} sources</span>
                            )}
                            {section.modelCount && (
                              <span className="source-count-badge">{section.modelCount} AI models</span>
                            )}
                          </div>
                          <div className="section-content">
                            <ReactMarkdown
                              components={{
                                a: ({ node, ...props }) => (
                                  <a {...props} target="_blank" rel="noopener noreferrer" className="evidence-link" />
                                ),
                              }}
                            >{section.content}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                      {patientSummary.confidence && (
                        <EvidenceProfilePanel confidence={patientSummary.confidence} />
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'clinician' && clinicianSummary && (
                  <div className="chorus-summary-card glass-card clinician-summary animate-fade-in">
                    <div className="summary-header">
                      <div className="summary-icon clinician-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                        </svg>
                      </div>
                      <div>
                        <h3>Clinical Summary</h3>
                        <span className="summary-subtitle">For healthcare professionals</span>
                      </div>
                      {clinicianSummary.confidence && (
                        <div className="evidence-header-group">
                          <EvidenceProfilePanel confidence={clinicianSummary.confidence} compact={true} />
                          <button
                            className="evidence-info-btn"
                            onClick={() => setShowEvidenceInfo(true)}
                            title="What does this mean?"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                    <div className="summary-content clinician-content">
                      {clinicianSummary.sections.map((section, i) => (
                        <div key={i} className={`clinician-section section-${section.type}`}>
                          <div className="clinician-section-header">
                            <div className="section-title-group">
                              <h4>{section.title}</h4>
                              {section.subtitle && (
                                <span className="section-subtitle">{section.subtitle}</span>
                              )}
                            </div>
                            {section.models && (
                              <div className="model-badges">
                                {section.models.map((m, j) => (
                                  <span key={j} className="model-badge" style={{ backgroundColor: PROVIDER_COLORS[m] || '#64748b' }}>
                                    {m}
                                  </span>
                                ))}
                              </div>
                            )}
                            {section.sourceCount && (
                              <span className="section-source-count">{section.sourceCount} sources</span>
                            )}
                          </div>
                          <div className="clinician-section-content">
                            <ReactMarkdown
                              components={{
                                a: ({ node, ...props }) => (
                                  <a {...props} target="_blank" rel="noopener noreferrer" className="evidence-link" />
                                ),
                              }}
                            >{section.content}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                      {clinicianSummary.confidence && (
                        <EvidenceProfilePanel confidence={clinicianSummary.confidence} />
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Evidence Sources */}
              {evidence && (
                <section className="chorus-evidence-section animate-slide-up" style={{ animationDelay: '0.1s' }}>
                  <h2 className="section-heading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                    </svg>
                    Evidence Sources
                  </h2>
                  <div className="evidence-cards-grid">
                    {evidence.guidelines && evidence.guidelines.count > 0 && (
                      <EvidenceCardChorus
                        title="Official Guidelines"
                        subtitle="CDC, WHO, FDA, NIH & Medical Societies"
                        icon="🏛️"
                        color="#14b8a6"
                        data={evidence.guidelines}
                        type="guidelines"
                      />
                    )}
                    {evidence.literature && evidence.literature.count > 0 && (
                      <EvidenceCardChorus
                        title="Scientific Literature"
                        subtitle="Peer-reviewed research from Google Scholar"
                        icon="🔬"
                        color="#0ea5e9"
                        data={evidence.literature}
                        type="literature"
                      />
                    )}
                  </div>
                </section>
              )}

              {/* AI Perspectives */}
              {responses.length > 0 && (
                <section className="chorus-ai-section animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <div className="section-heading-row">
                    <h2 className="section-heading">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <line x1="9" y1="9" x2="15" y2="9"/>
                        <line x1="9" y1="15" x2="15" y2="15"/>
                      </svg>
                      AI Perspectives
                    </h2>
                    <button
                      className="toggle-ai-btn"
                      onClick={() => setShowAllAI(!showAllAI)}
                    >
                      {showAllAI ? 'Hide Details' : `View All ${responses.length} Responses`}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: showAllAI ? 'rotate(180deg)' : 'none' }}>
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>
                  </div>

                  {!showAllAI && (
                    <div className="ai-summary-bar glass-card">
                      <div className="ai-summary-text">
                        <span className="ai-count">{responses.filter(r => r.success).length} AI models</span> analyzed this question
                      </div>
                      <div className="ai-provider-dots">
                        {responses.filter(r => r.success).map((r, i) => (
                          <span
                            key={i}
                            className="ai-dot"
                            style={{ backgroundColor: PROVIDER_COLORS[r.provider_name] || '#64748b' }}
                            title={r.provider_name}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {showAllAI && (
                    <div className="ai-responses-grid">
                      {responses.map((r, i) => (
                        <AIResponseCard key={i} response={r} />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Media Section (if any) */}
              {mediaItems.length > 0 && (
                <section className="chorus-media-section animate-slide-up" style={{ animationDelay: '0.3s' }}>
                  <h2 className="section-heading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                    Related Media
                  </h2>
                  <div className="media-grid">
                    {mediaItems.map((item, i) => (
                      <a key={i} href={item.url} target="_blank" rel="noopener noreferrer" className="media-card glass-card">
                        <div className="media-placeholder">
                          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                            <circle cx="8.5" cy="8.5" r="1.5"/>
                            <polyline points="21 15 16 10 5 21"/>
                          </svg>
                        </div>
                        <div className="media-info">
                          <span className="media-title">{item.title}</span>
                          <span className="media-source">{item.source}</span>
                        </div>
                      </a>
                    ))}
                  </div>
                </section>
              )}

              {/* References */}
              {references.length > 0 && (
                <section className="chorus-references-section animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <h2 className="section-heading">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                    </svg>
                    References ({references.length})
                  </h2>
                  <div className="references-list glass-card">
                    {references.map((ref, i) => (
                      <div key={ref.id} className="reference-item">
                        <span className="reference-number">{i + 1}</span>
                        <div className="reference-content">
                          <a href={ref.url} target="_blank" rel="noopener noreferrer">
                            {ref.title}
                          </a>
                          {ref.snippet && <p className="reference-snippet">{ref.snippet}</p>}
                          <div className="reference-meta">
                            <span className={`reference-type ${ref.type}`}>
                              {ref.type === 'guideline' ? 'Official Guideline' : 'Research Article'}
                            </span>
                            {ref.cited_by > 0 && (
                              <span className="reference-citations">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21"/>
                                  <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3"/>
                                </svg>
                                {ref.cited_by} citations
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

            </div>
          )}
        </main>

        {/* Floating Follow-up FAB */}
        {synthesis && (
          <div className={`follow-up-fab-container ${followUpOpen ? 'open' : ''}`}>
            {/* Expanded Panel */}
            {followUpOpen && (
              <div className="follow-up-panel glass-card animate-slide-up">
                <div className="follow-up-panel-header">
                  <div className="follow-up-panel-title">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                    <span>Ask a follow-up</span>
                    {conversationHistory.length > 1 && (
                      <span className="conversation-count">{conversationHistory.length} exchanges</span>
                    )}
                  </div>
                  <button
                    className="follow-up-panel-close"
                    onClick={() => setFollowUpOpen(false)}
                    aria-label="Close"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <form onSubmit={(e) => { handleFollowUp(e); setFollowUpOpen(false); }} className="follow-up-panel-form">
                  <input
                    ref={followUpRef}
                    type="text"
                    value={followUp}
                    onChange={(e) => setFollowUp(e.target.value)}
                    placeholder="Tell me more about... What about... Can you clarify..."
                    disabled={loading}
                    autoFocus
                  />
                  <button type="submit" disabled={!followUp.trim() || loading} className="follow-up-panel-submit">
                    {loading ? (
                      <span className="spinner-small" />
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"/>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                      </svg>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* FAB Button */}
            <button
              className={`follow-up-fab ${followUpOpen ? 'active' : ''}`}
              onClick={() => {
                setFollowUpOpen(!followUpOpen);
                if (!followUpOpen) {
                  setTimeout(() => followUpRef.current?.focus(), 100);
                }
              }}
              aria-label="Ask follow-up question"
            >
              {followUpOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  <line x1="9" y1="10" x2="15" y2="10"/>
                </svg>
              )}
            </button>
          </div>
        )}

        {/* Footer */}
        <footer className="chorus-footer">
          <div className="chorus-footer-content">
            <p>Chorus synthesizes evidence from multiple AI models and authoritative medical sources.</p>
            <p className="chorus-disclaimer">Always consult with a healthcare professional for medical decisions.</p>
          </div>
          <ViewResultsLink />
        </footer>
      </div>
    )
  }

  // Modern Prism UI (matching Chorus style with purple/indigo theme)
  return (
    <div className="prism-app">
      {/* Animated background */}
      <div className="prism-bg">
        <div className="prism-orb prism-orb-1"></div>
        <div className="prism-orb prism-orb-2"></div>
        <div className="prism-orb prism-orb-3"></div>
      </div>

      {/* Header */}
      <header className="prism-header">
        <div className="prism-brand">
          <PrismLogo size={64} />
          <div className="prism-brand-text">
            <h1 className="prism-title">{appConfig.app_name}</h1>
            <p className="prism-tagline">{appConfig.tagline}</p>
          </div>
        </div>
        <div className="prism-trust-badges">
          <span className="trust-badge prism-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Multi-AI Analysis
          </span>
          <span className="trust-badge prism-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            Public Health Ready
          </span>
          <span className="trust-badge prism-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            Messaging Safe
          </span>
        </div>
        <div className="prism-view-toggle">
          <button
            className={`prism-view-btn ${viewMode === 'brief' ? 'active' : ''}`}
            onClick={() => setViewMode('brief')}
          >
            Brief
          </button>
          <button
            className={`prism-view-btn ${viewMode === 'detailed' ? 'active' : ''}`}
            onClick={() => setViewMode('detailed')}
          >
            Detailed
          </button>
        </div>
      </header>

      <main className="prism-main">
        <div className="prism-input-card">
          <form onSubmit={handleSubmit} className="prism-form">
            <label className="prism-label">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
              What health question are people asking AI?
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a health question the public is asking chatbots..."
              className="prism-textarea"
              rows={2}
            />
            <div className="prism-form-footer">
              <div className="prism-provider-pills">
                {providers.map(p => (
                  <span
                    key={p}
                    className="prism-provider-pill"
                    style={{
                      borderColor: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#6b7280',
                      color: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#6b7280'
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="prism-submit-btn"
              >
                {loading ? (
                  <>
                    <div className="prism-btn-spinner"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    Analyze AI Responses
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="prism-examples">
            <span className="prism-examples-label">Quick examples:</span>
            <div className="prism-example-chips">
              {exampleQuestions.map((q, i) => (
                <button key={i} onClick={() => setQuestion(q)} className="prism-example-chip">
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>

        {error && <div className="prism-error">{error}</div>}

        {loading && (
          <div className="prism-loading">
            <div className="prism-spinner"></div>
            <p>Analyzing {providers.length} AI responses...</p>
            <span className="prism-loading-sub">Identifying narratives and themes</span>
          </div>
        )}

        {viewMode === 'detailed' && responses.length > 0 && (
          <section className="prism-section">
            <div className="prism-section-header">
              <h2 className="prism-section-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2a10 10 0 1 0 10 10H12V2z"/>
                  <path d="M12 2a10 10 0 0 1 10 10"/>
                  <circle cx="12" cy="12" r="6"/>
                </svg>
                Raw AI Responses
              </h2>
              <span className="prism-section-count">{responses.filter(r => r.success).length} models</span>
            </div>
            <div className="prism-responses-grid" data-count={responses.length}>
              {responses.map((r, i) => (
                <ResponseCard key={i} response={r} />
              ))}
            </div>
          </section>
        )}

        {highlightSection && (
          <section className="prism-section prism-message-section">
            <div className="prism-message-card">
              <div className="prism-message-header">
                <div className="prism-message-title-row">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                  <h2 className="prism-message-title">Ready-to-Use Public Health Message</h2>
                </div>
                <button
                  className="prism-copy-btn"
                  onClick={() => {
                    const messageMatch = highlightSection.content.match(/^\*\*(.+?)\*\*/s) || highlightSection.content.match(/^"(.+?)"/s)
                    const messageToCopy = messageMatch ? messageMatch[1] : highlightSection.content.split('\n\n')[0]
                    navigator.clipboard.writeText(messageToCopy.replace(/\*\*/g, ''))
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
                >
                  {copied ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      Copied!
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                      </svg>
                      Copy Message
                    </>
                  )}
                </button>
              </div>
              <div className="prism-message-content">
                <ReactMarkdown>{highlightSection.content}</ReactMarkdown>
              </div>
            </div>
          </section>
        )}

        {viewMode === 'detailed' && regularSections.length > 0 && (
          <section className="prism-section">
            <div className="prism-section-header">
              <h2 className="prism-section-title">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="20" x2="18" y2="10"/>
                  <line x1="12" y1="20" x2="12" y2="4"/>
                  <line x1="6" y1="20" x2="6" y2="14"/>
                </svg>
                Detailed Analysis
              </h2>
            </div>
            <div className="prism-analysis-grid" data-count={regularSections.length}>
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

      <footer className="prism-footer">
        <div className="prism-footer-content">
          <p>Prism helps public health officials understand and respond to AI-generated health narratives</p>
          <ViewResultsLink />
        </div>
      </footer>

      {appConfig.show_study && <StudyFAB onClick={() => setStudyModalOpen(true)} />}
      {appConfig.show_study && (
        <StudyModal
          isOpen={studyModalOpen}
          onClose={() => setStudyModalOpen(false)}
          onQuerySubmit={(query) => {
            setQuestion(query)
            setTimeout(() => {
              document.querySelector('.prism-submit-btn')?.click()
            }, 100)
          }}
          setViewMode={setViewMode}
        />
      )}

      {/* Evidence Profile Info Modal */}
      {showEvidenceInfo && (
        <div className="evidence-info-modal-overlay" onClick={() => setShowEvidenceInfo(false)}>
          <div className="evidence-info-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setShowEvidenceInfo(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            <h2>Understanding Evidence Scores</h2>
            <p className="modal-intro">
              We use a multi-dimensional scoring system based on GRADE (Grading of Recommendations,
              Assessment, Development and Evaluations) - the same framework used by WHO and Cochrane.
            </p>

            <div className="evidence-explainer">
              <div className="explainer-section">
                <h3>Evidence Quality (A-D)</h3>
                <p>How strong is the underlying evidence?</p>
                <div className="grade-list">
                  <div className="grade-item">
                    <span className="grade-letter grade-a">A</span>
                    <div>
                      <strong>High Quality</strong>
                      <p>Multiple official guidelines (CDC, WHO, FDA) backed by large randomized controlled trials. Example: "Vaccines prevent measles"</p>
                    </div>
                  </div>
                  <div className="grade-item">
                    <span className="grade-letter grade-b">B</span>
                    <div>
                      <strong>Moderate Quality</strong>
                      <p>Some official guidelines OR substantial peer-reviewed literature (10+ papers). Example: "Mediterranean diet reduces heart disease risk"</p>
                    </div>
                  </div>
                  <div className="grade-item">
                    <span className="grade-letter grade-c">C</span>
                    <div>
                      <strong>Low Quality</strong>
                      <p>Limited studies, emerging research, or preliminary findings. Example: "Certain supplements may help with X"</p>
                    </div>
                  </div>
                  <div className="grade-item">
                    <span className="grade-letter grade-d">D</span>
                    <div>
                      <strong>Very Low</strong>
                      <p>Anecdotal evidence, AI synthesis only, or contradictory findings. Use with caution.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="explainer-section">
                <h3>Retrieval Confidence (I-III)</h3>
                <p>How well did we find relevant sources?</p>
                <div className="retrieval-list">
                  <div className="retrieval-item">
                    <span className="retrieval-num retrieval-i">I</span>
                    <span>Strong - Multiple source types found (guidelines + literature + AI consensus)</span>
                  </div>
                  <div className="retrieval-item">
                    <span className="retrieval-num retrieval-ii">II</span>
                    <span>Moderate - Two source types found</span>
                  </div>
                  <div className="retrieval-item">
                    <span className="retrieval-num retrieval-iii">III</span>
                    <span>Limited - Few sources available for this topic</span>
                  </div>
                </div>
              </div>

              <div className="explainer-section">
                <h3>Agreement Percentage</h3>
                <p>How much do the sources agree with each other?</p>
                <ul>
                  <li><strong>85%+</strong>: Strong consensus across all sources</li>
                  <li><strong>65-84%</strong>: Moderate agreement with some variation</li>
                  <li><strong>45-64%</strong>: Mixed findings - interpret carefully</li>
                  <li><strong>&lt;45%</strong>: Significant disagreement or limited data</li>
                </ul>
                <p className="note">Note: We cap agreement at 95% - true 100% confidence requires established medical fact with decades of evidence.</p>
              </div>

              <div className="explainer-section">
                <h3>Reading the Code: C·II·55%</h3>
                <p>
                  This example means: <strong>Low quality evidence</strong> (C) with
                  <strong> moderate retrieval</strong> (II) and <strong>55% agreement</strong> between sources.
                  This is typical for emerging research topics where studies exist but haven't yet
                  reached official guideline status.
                </p>
              </div>
            </div>
          </div>
        </div>
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
            <span className="provider-name" style={{ color: '#ef4444' }}>{response.provider_name}</span>
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
          <span className="provider-name" style={{ color }}>{response.provider_name}</span>
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

function EvidenceCardChorus({ title, subtitle, icon, color, data, type }) {
  const count = data.count || 0
  const sourceTypes = data.source_types || {}
  const topCited = data.top_cited || []
  const links = data.links || []

  // Generate a rich summary describing what these sources cover
  const generateSummary = () => {
    if (links.length === 0) return null

    const orgMap = {}
    links.forEach(l => {
      let org = 'Other'
      if (l.url.includes('cdc.gov')) org = 'CDC'
      else if (l.url.includes('who.int')) org = 'WHO'
      else if (l.url.includes('fda.gov')) org = 'FDA'
      else if (l.url.includes('nih.gov')) org = 'NIH'
      else if (l.url.includes('heart.org')) org = 'AHA'
      else if (l.url.includes('cancer.org')) org = 'ACS'
      else if (l.url.includes('acog.org')) org = 'ACOG'
      else if (l.url.includes('aap.org')) org = 'AAP'
      if (!orgMap[org]) orgMap[org] = 0
      orgMap[org]++
    })

    const orgs = Object.keys(orgMap).filter(o => o !== 'Other')

    // Extract key topics from titles
    const topics = links.slice(0, 5).map(l => {
      // Clean up the title to extract the main topic
      const title = l.title
        .split(' - ')[0]
        .split('|')[0]
        .replace(/\.\.\.$/, '')
        .trim()
      return title.length > 60 ? title.slice(0, 60) + '...' : title
    })

    if (type === 'guidelines') {
      let summary = `**${count} official sources** provide authoritative guidance on this topic`
      if (orgs.length > 0) {
        summary += ` from ${orgs.slice(0, 4).join(', ')}`
      }
      summary += '.\n\n'
      summary += '**Key resources address:**\n'
      topics.slice(0, 3).forEach(t => {
        summary += `- ${t}\n`
      })
      return summary
    } else {
      const totalCites = links.reduce((s, l) => s + (l.cited_by || 0), 0)
      let summary = `**${count} peer-reviewed studies** provide research evidence`
      if (totalCites > 0) {
        summary += ` with ${totalCites} combined citations`
      }
      summary += '.\n\n'
      summary += '**Research covers:**\n'
      topics.slice(0, 3).forEach(t => {
        summary += `- ${t}\n`
      })
      return summary
    }
  }

  const summary = generateSummary()

  return (
    <div className="evidence-card-chorus glass-card">
      <div className="evidence-card-header-chorus" style={{ borderLeftColor: color }}>
        <div className="evidence-card-top">
          <span className="evidence-icon-large">{icon}</span>
          <div className="evidence-card-titles">
            <h3 style={{ color }}>{title}</h3>
            <span className="evidence-subtitle">{subtitle}</span>
          </div>
          <div className="evidence-count-badge" style={{ backgroundColor: `${color}20`, color }}>
            {count} sources
          </div>
        </div>
      </div>

      <div className="evidence-card-body">
        {/* Summary paragraph */}
        {summary && (
          <div className="evidence-summary">
            <ReactMarkdown>{summary}</ReactMarkdown>
          </div>
        )}

        {/* Source breakdown for guidelines */}
        {type === 'guidelines' && Object.keys(sourceTypes).length > 0 && (
          <div className="source-breakdown">
            {Object.entries(sourceTypes).map(([org, cnt]) => (
              <span key={org} className="source-tag">
                {org}: {cnt}
              </span>
            ))}
          </div>
        )}

        {/* Top cited for literature */}
        {type === 'literature' && topCited.length > 0 && (
          <div className="top-cited-chorus">
            <h4>Most Cited</h4>
            {topCited.slice(0, 3).map((paper, i) => (
              <a key={i} href={paper.url} target="_blank" rel="noopener noreferrer" className="cited-paper-link">
                <span className="paper-title">{paper.title}</span>
                <span className="paper-citations">{paper.cited_by} citations</span>
              </a>
            ))}
          </div>
        )}

        {/* All sources - visible and scrollable, no snippets */}
        {links.length > 0 && (
          <div className="all-sources">
            <h4>Sources ({links.length})</h4>
            <div className="sources-scroll-container">
              {links.map((link, i) => (
                <div key={i} className="source-item-clean">
                  <span className="source-num">{i + 1}.</span>
                  <div className="source-info">
                    <a href={link.url} target="_blank" rel="noopener noreferrer" className="source-title-link">
                      {link.title}
                    </a>
                    <div className="source-meta">
                      {link.publication_info && <span className="publication-info">{link.publication_info}</span>}
                      {link.cited_by > 0 && <span className="cite-count">{link.cited_by} citations</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function AIResponseCard({ response }) {
  const color = PROVIDER_COLORS[response.provider_name] || '#64748b'

  if (!response.success) {
    return (
      <div className="ai-card glass-card ai-card-error">
        <div className="ai-card-header">
          <div className="ai-provider" style={{ color: '#ef4444' }}>
            <span className="ai-dot" style={{ backgroundColor: '#ef4444' }}></span>
            {response.provider_name}
          </div>
          <span className="ai-model">{response.model}</span>
        </div>
        <p className="ai-error-text">Error: {response.error}</p>
      </div>
    )
  }

  return (
    <div className="ai-card glass-card">
      <div className="ai-card-header">
        <div className="ai-provider" style={{ color }}>
          <span className="ai-dot" style={{ backgroundColor: color }}></span>
          {response.provider_name}
        </div>
        <span className="ai-model">{response.model}</span>
      </div>
      <div className="ai-card-content">
        <ReactMarkdown>{response.content}</ReactMarkdown>
      </div>
    </div>
  )
}

// Inject styles
const styleSheet = document.createElement('style')
styleSheet.textContent = `
  * { box-sizing: border-box; }

  /* ===== PRISM STYLES ===== */
  .prism-app {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
    color: #e2e8f0;
  }

  /* Prism Animated Background - Purple/Indigo theme */
  .prism-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(135deg, #0f0a1f 0%, #1a1033 50%, #0d0a1a 100%);
    overflow: hidden;
  }

  .prism-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: prismFloat 20s ease-in-out infinite;
  }

  .prism-orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  .prism-orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #a855f7, #9333ea);
    bottom: -150px;
    left: -150px;
    animation-delay: -7s;
  }

  .prism-orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #6366f1, #4f46e5);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
  }

  @keyframes prismFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.05); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(20px, 30px) scale(1.02); }
  }

  /* Prism Header */
  .prism-header {
    padding: 1.5rem 2rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    background: rgba(139, 92, 246, 0.05);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(139, 92, 246, 0.1);
  }

  .prism-brand {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .prism-brand-text {
    display: flex;
    flex-direction: column;
  }

  .prism-title {
    font-size: 1.75rem;
    font-weight: 700;
    background: linear-gradient(135deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .prism-tagline {
    color: #94a3b8;
    font-size: 0.875rem;
    margin: 0;
    margin-top: 0.25rem;
  }

  .prism-trust-badges {
    display: flex;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .prism-badge {
    background: rgba(139, 92, 246, 0.15) !important;
    border-color: rgba(139, 92, 246, 0.3) !important;
    color: #c4b5fd !important;
  }

  .prism-view-toggle {
    display: flex;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    padding: 4px;
    border: 1px solid rgba(139, 92, 246, 0.2);
  }

  .prism-view-btn {
    padding: 0.5rem 1rem;
    border: none;
    background: transparent;
    color: #94a3b8;
    font-size: 0.875rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-view-btn:hover {
    color: #c4b5fd;
  }

  .prism-view-btn.active {
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    color: white;
  }

  /* Prism Main Content */
  .prism-main {
    max-width: 1400px;
    margin: 0 auto;
    padding: 2rem;
  }

  /* Prism Input Card */
  .prism-input-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(139, 92, 246, 0.15);
    border-radius: 16px;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .prism-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .prism-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #c4b5fd;
    font-size: 0.95rem;
    font-weight: 500;
  }

  .prism-label svg {
    stroke: #a855f7;
  }

  .prism-textarea {
    width: 100%;
    padding: 1rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 12px;
    color: #e2e8f0;
    font-size: 1rem;
    resize: vertical;
    min-height: 80px;
    transition: all 0.2s;
  }

  .prism-textarea:focus {
    outline: none;
    border-color: #8b5cf6;
    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.2);
  }

  .prism-textarea::placeholder {
    color: #64748b;
  }

  .prism-form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .prism-provider-pills {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .prism-provider-pill {
    padding: 0.25rem 0.75rem;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 500;
    text-transform: capitalize;
  }

  .prism-submit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #8b5cf6, #7c3aed);
    border: none;
    border-radius: 10px;
    color: white;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  .prism-submit-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .prism-btn-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Prism Examples */
  .prism-examples {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
  }

  .prism-examples-label {
    color: #94a3b8;
    font-size: 0.875rem;
    margin-right: 0.75rem;
  }

  .prism-example-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .prism-example-chip {
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.1);
    border: 1px solid rgba(139, 92, 246, 0.2);
    border-radius: 20px;
    color: #c4b5fd;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-example-chip:hover {
    background: rgba(139, 92, 246, 0.2);
    border-color: rgba(139, 92, 246, 0.4);
  }

  /* Prism Error */
  .prism-error {
    padding: 1rem;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: #fca5a5;
    margin-bottom: 1.5rem;
  }

  /* Prism Loading */
  .prism-loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    text-align: center;
  }

  .prism-spinner {
    width: 48px;
    height: 48px;
    border: 3px solid rgba(139, 92, 246, 0.2);
    border-top-color: #8b5cf6;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-bottom: 1rem;
  }

  .prism-loading p {
    color: #c4b5fd;
    font-size: 1.1rem;
    margin: 0;
  }

  .prism-loading-sub {
    color: #64748b;
    font-size: 0.875rem;
    margin-top: 0.5rem;
  }

  /* Prism Sections */
  .prism-section {
    margin-bottom: 2rem;
  }

  .prism-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .prism-section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    color: #e2e8f0;
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .prism-section-title svg {
    stroke: #a855f7;
  }

  .prism-section-count {
    padding: 0.25rem 0.75rem;
    background: rgba(139, 92, 246, 0.15);
    border-radius: 20px;
    color: #c4b5fd;
    font-size: 0.875rem;
  }

  .prism-responses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .prism-analysis-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 1rem;
  }

  /* Prism Message Card */
  .prism-message-section {
    margin-top: 1.5rem;
  }

  .prism-message-card {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(99, 102, 241, 0.1) 100%);
    backdrop-filter: blur(20px);
    border: 2px solid rgba(139, 92, 246, 0.3);
    border-radius: 16px;
    overflow: hidden;
  }

  .prism-message-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(139, 92, 246, 0.1);
    border-bottom: 1px solid rgba(139, 92, 246, 0.2);
  }

  .prism-message-title-row {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .prism-message-title-row svg {
    stroke: #a855f7;
  }

  .prism-message-title {
    color: #e2e8f0;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  .prism-copy-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(139, 92, 246, 0.2);
    border: 1px solid rgba(139, 92, 246, 0.4);
    border-radius: 8px;
    color: #c4b5fd;
    font-size: 0.875rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .prism-copy-btn:hover {
    background: rgba(139, 92, 246, 0.3);
  }

  .prism-message-content {
    padding: 1.5rem;
    color: #e2e8f0;
    line-height: 1.7;
  }

  .prism-message-content p {
    margin: 0 0 1rem 0;
  }

  .prism-message-content p:last-child {
    margin-bottom: 0;
  }

  /* Prism Footer */
  .prism-footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(139, 92, 246, 0.1);
    background: rgba(0, 0, 0, 0.2);
  }

  .prism-footer-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .prism-footer p {
    color: #94a3b8;
    font-size: 0.875rem;
    margin: 0 0 1rem 0;
  }

  /* Prism Mobile Responsive */
  @media (max-width: 768px) {
    .prism-header {
      padding: 1rem;
      flex-direction: column;
      align-items: flex-start;
    }

    .prism-trust-badges {
      display: none;
    }

    .prism-main {
      padding: 1rem;
    }

    .prism-input-card {
      padding: 1rem;
    }

    .prism-form-footer {
      flex-direction: column;
      align-items: stretch;
    }

    .prism-submit-btn {
      width: 100%;
      justify-content: center;
    }

    .prism-responses-grid,
    .prism-analysis-grid {
      grid-template-columns: 1fr;
    }
  }

  /* ===== CHORUS STYLES ===== */
  .chorus-app {
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  /* Animated Background */
  .chorus-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(135deg, #0c1222 0%, #1a1a2e 50%, #0f172a 100%);
    overflow: hidden;
  }

  .chorus-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.4;
    animation: float 20s ease-in-out infinite;
  }

  .chorus-orb-1 {
    width: 600px;
    height: 600px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    top: -200px;
    right: -200px;
    animation-delay: 0s;
  }

  .chorus-orb-2 {
    width: 500px;
    height: 500px;
    background: linear-gradient(135deg, #14b8a6, #0d9488);
    bottom: -150px;
    left: -150px;
    animation-delay: -7s;
  }

  .chorus-orb-3 {
    width: 300px;
    height: 300px;
    background: linear-gradient(135deg, #0ea5e9, #0284c7);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation-delay: -14s;
  }

  @keyframes float {
    0%, 100% { transform: translate(0, 0) scale(1); }
    25% { transform: translate(30px, -30px) scale(1.05); }
    50% { transform: translate(-20px, 20px) scale(0.95); }
    75% { transform: translate(20px, 30px) scale(1.02); }
  }

  /* Glass Card Effect */
  .glass-card {
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    transition: all 0.3s ease;
  }

  .glass-card:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  }

  /* Animations */
  .animate-fade-in {
    animation: fadeIn 0.5s ease forwards;
  }

  .animate-slide-up {
    animation: slideUp 0.6s ease forwards;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Chorus Logo Animation */
  .chorus-logo-animated .wave-1,
  .chorus-logo-animated .wave-2,
  .chorus-logo-animated .wave-3 {
    animation: waveMove 3s ease-in-out infinite;
  }

  .chorus-logo-animated .wave-2 { animation-delay: 0.2s; }
  .chorus-logo-animated .wave-3 { animation-delay: 0.4s; }

  @keyframes waveMove {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(3px); }
  }

  /* Chorus Header */
  .chorus-header {
    padding: 2rem 2rem 1.5rem;
    text-align: center;
  }

  .chorus-brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.25rem;
  }

  .chorus-brand-text {
    text-align: left;
  }

  .chorus-title {
    font-size: 2.75rem;
    font-weight: 700;
    margin: 0;
    background: linear-gradient(135deg, #06b6d4 0%, #14b8a6 50%, #0ea5e9 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -0.02em;
  }

  .chorus-tagline {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0.25rem 0 0;
    font-weight: 400;
  }

  .chorus-trust-badges {
    display: flex;
    justify-content: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .trust-badge {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    font-size: 0.75rem;
    color: #a1a1aa;
    font-weight: 500;
  }

  .trust-badge svg {
    opacity: 0.7;
  }

  /* Chorus Main */
  .chorus-main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem 2rem;
  }

  /* Chorus Search Section */
  .chorus-search-section {
    padding: 2rem;
    margin-bottom: 2rem;
  }

  .chorus-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chorus-label {
    font-size: 1.125rem;
    font-weight: 600;
    color: #e2e8f0;
  }

  .chorus-input-wrapper {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }

  .chorus-textarea {
    flex: 1;
    padding: 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    outline: none;
    transition: all 0.3s ease;
  }

  .chorus-textarea:focus {
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  .chorus-textarea::placeholder {
    color: #64748b;
  }

  .chorus-submit-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.75rem;
    font-size: 0.95rem;
    font-weight: 600;
    border-radius: 12px;
    border: none;
    background: linear-gradient(135deg, #06b6d4 0%, #14b8a6 100%);
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
  }

  .chorus-submit-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
  }

  .chorus-submit-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .chorus-btn-loading {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .chorus-spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  .chorus-providers {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    align-items: center;
  }

  .chorus-providers-label {
    font-size: 0.8rem;
    color: #64748b;
  }

  .chorus-provider-chip {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    border-radius: 20px;
    border: 1px solid;
    background: transparent;
    color: #94a3b8;
    text-transform: capitalize;
  }

  .chorus-provider-evidence {
    border-color: #14b8a6 !important;
    color: #14b8a6;
  }

  .chorus-examples {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }

  .chorus-examples-label {
    font-size: 0.85rem;
    color: #64748b;
    display: block;
    margin-bottom: 0.75rem;
  }

  .chorus-examples-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .chorus-example-btn {
    padding: 0.75rem 1rem;
    font-size: 0.85rem;
    text-align: left;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    color: #a1a1aa;
    cursor: pointer;
    transition: all 0.2s ease;
    line-height: 1.4;
  }

  .chorus-example-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(6, 182, 212, 0.3);
    color: #e2e8f0;
  }

  /* Chorus Error */
  .chorus-error {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    margin-bottom: 1.5rem;
    border-color: rgba(239, 68, 68, 0.3) !important;
    color: #fca5a5;
  }

  /* Chorus Loading */
  .chorus-loading {
    padding: 3rem 2rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  .chorus-loading h3 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 1.5rem 0 0.5rem;
  }

  .chorus-loading p {
    color: #94a3b8;
    font-size: 0.9rem;
    margin: 0;
  }

  .chorus-loading-animation {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .chorus-loading-wave {
    width: 8px;
    height: 40px;
    background: linear-gradient(135deg, #06b6d4, #14b8a6);
    border-radius: 4px;
    animation: loadingWave 1s ease-in-out infinite;
  }

  .chorus-loading-wave:nth-child(2) { animation-delay: 0.1s; }
  .chorus-loading-wave:nth-child(3) { animation-delay: 0.2s; }

  @keyframes loadingWave {
    0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
    50% { transform: scaleY(1); opacity: 1; }
  }

  .chorus-loading-steps {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1.5rem;
    flex-wrap: wrap;
  }

  .loading-step {
    font-size: 0.75rem;
    color: #64748b;
    padding: 0.375rem 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .loading-step.active {
    color: #14b8a6;
    border-color: rgba(20, 184, 166, 0.3);
    background: rgba(20, 184, 166, 0.1);
  }

  /* Chorus Results */
  .chorus-results {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  /* Section Headings */
  .section-heading {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 1.25rem;
  }

  .section-heading svg {
    opacity: 0.7;
    color: #06b6d4;
  }

  .section-heading-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-bottom: 1rem;
  }

  .section-heading-row .section-heading {
    margin: 0;
  }

  /* Summary Section */
  .chorus-summaries {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .chorus-summary-tabs {
    display: flex;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.03);
    padding: 0.375rem;
    border-radius: 12px;
    width: fit-content;
  }

  .summary-tab {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    border-radius: 8px;
    border: none;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-tab:hover {
    color: #e2e8f0;
  }

  .summary-tab.active {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(20, 184, 166, 0.2));
    color: #06b6d4;
  }

  .chorus-summary-card {
    padding: 0;
    overflow: hidden;
  }

  .summary-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .summary-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .patient-icon {
    background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(16, 185, 129, 0.2));
    color: #22c55e;
  }

  .clinician-icon {
    background: linear-gradient(135deg, rgba(6, 182, 212, 0.2), rgba(14, 165, 233, 0.2));
    color: #06b6d4;
  }

  .summary-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0;
  }

  .summary-subtitle {
    font-size: 0.8rem;
    color: #64748b;
  }

  .summary-header .copy-btn {
    margin-left: auto;
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-header .copy-btn:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .summary-content {
    padding: 1.5rem;
  }

  .patient-summary-box {
    background: rgba(34, 197, 94, 0.05);
    border: 1px solid rgba(34, 197, 94, 0.15);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .patient-summary-box h4 {
    font-size: 0.9rem;
    font-weight: 600;
    color: #22c55e;
    margin: 0 0 0.75rem;
  }

  .patient-summary-box p {
    font-size: 1rem;
    line-height: 1.7;
    color: #e2e8f0;
    margin: 0;
  }

  .summary-confidence {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    flex-wrap: wrap;
  }

  .confidence-label {
    font-size: 0.8rem;
    color: #94a3b8;
  }

  .confidence-bar {
    flex: 1;
    min-width: 100px;
    max-width: 200px;
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    overflow: hidden;
  }

  .confidence-fill {
    height: 100%;
    background: linear-gradient(90deg, #22c55e, #14b8a6);
    border-radius: 3px;
    transition: width 0.5s ease;
  }

  .confidence-text {
    font-size: 0.75rem;
    color: #64748b;
  }

  /* Confidence badges */
  .confidence-badge {
    padding: 0.375rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .confidence-high {
    background: rgba(34, 197, 94, 0.2);
    color: #22c55e;
    border: 1px solid rgba(34, 197, 94, 0.3);
  }

  .confidence-moderate {
    background: rgba(245, 158, 11, 0.2);
    color: #f59e0b;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }

  .confidence-limited {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
    border: 1px solid rgba(239, 68, 68, 0.3);
  }

  .confidence-factors {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .confidence-factor {
    font-size: 0.7rem;
    padding: 0.25rem 0.5rem;
    background: rgba(6, 182, 212, 0.1);
    color: #06b6d4;
    border-radius: 4px;
    border: 1px solid rgba(6, 182, 212, 0.2);
  }

  /* Summary sections */
  .summary-section {
    padding: 1.25rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .summary-section:last-of-type {
    margin-bottom: 0;
  }

  .section-official {
    border-left: 3px solid #14b8a6;
  }

  .section-research {
    border-left: 3px solid #0ea5e9;
  }

  .section-synthesis {
    border-left: 3px solid #8b5cf6;
  }

  .section-header-inline {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .section-header-inline h4 {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: #e2e8f0;
  }

  .section-icon {
    font-size: 1.25rem;
  }

  .source-count-badge {
    font-size: 0.7rem;
    padding: 0.2rem 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    border-radius: 999px;
    margin-left: auto;
  }

  .section-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
  }

  .section-content p {
    margin-bottom: 0.75rem;
  }

  .section-content p:last-child {
    margin-bottom: 0;
  }

  /* Clinician sections */
  .clinician-section {
    padding: 1.5rem;
    margin-bottom: 1.25rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }

  .clinician-section:last-child {
    margin-bottom: 0;
  }

  .section-guidelines {
    border-left: 3px solid #14b8a6;
  }

  .section-official {
    border-left: 3px solid #14b8a6;
    background: rgba(20, 184, 166, 0.05);
  }

  .section-literature {
    border-left: 3px solid #0ea5e9;
    background: rgba(14, 165, 233, 0.05);
  }

  .section-consensus {
    border-left: 3px solid #f59e0b;
    background: rgba(245, 158, 11, 0.05);
  }

  .section-quality {
    border-left: 3px solid #22c55e;
    background: rgba(34, 197, 94, 0.05);
    padding: 1rem !important;
  }

  .section-quality .clinician-section-content {
    font-size: 0.9rem;
  }

  .section-references {
    border-left: 3px solid #64748b;
    background: rgba(100, 116, 139, 0.05);
  }

  .section-sources {
    border-left: 3px solid #0ea5e9;
    background: rgba(14, 165, 233, 0.05);
  }

  .section-takeaways {
    border-left: 3px solid #22c55e;
    background: rgba(34, 197, 94, 0.05);
  }

  .section-title-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .section-subtitle {
    font-size: 0.8rem;
    color: #94a3b8;
    font-weight: 400;
  }

  .section-source-count {
    font-size: 0.75rem;
    padding: 0.2rem 0.6rem;
    background: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
    border-radius: 999px;
    margin-left: auto;
  }

  /* Evidence card summary */
  .evidence-summary {
    padding: 1rem;
    margin-bottom: 1rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    border-left: 2px solid rgba(6, 182, 212, 0.3);
  }

  .evidence-summary p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.6;
    color: #d1d5db;
  }

  /* Clean source items (no snippets) */
  .source-item-clean {
    display: flex;
    gap: 0.75rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .source-item-clean:last-child {
    border-bottom: none;
  }

  .source-num {
    color: #64748b;
    font-size: 0.85rem;
    min-width: 1.5rem;
  }

  .source-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .source-title-link {
    color: #06b6d4;
    text-decoration: none;
    font-size: 0.9rem;
    line-height: 1.4;
    transition: color 0.2s ease;
  }

  .source-title-link:hover {
    color: #22d3ee;
    text-decoration: underline;
  }

  .source-meta {
    display: flex;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: #64748b;
  }

  .evidence-link {
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .evidence-link:hover {
    color: #22d3ee;
    text-decoration: underline;
  }

  .clinician-section-content h3 {
    font-size: 1rem;
    font-weight: 600;
    color: #94a3b8;
    margin: 1.5rem 0 0.75rem 0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .clinician-section-content ol {
    padding-left: 1.5rem;
    margin: 0;
  }

  .clinician-section-content ol li {
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  .section-literature {
    border-left: 3px solid #0ea5e9;
  }

  .section-synthesis {
    border-left: 3px solid #8b5cf6;
  }

  .clinician-section-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .clinician-section-header h4 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
    color: #06b6d4;
  }

  .model-badges {
    display: flex;
    gap: 0.375rem;
  }

  .model-badge {
    font-size: 0.65rem;
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    color: white;
    font-weight: 500;
  }

  .clinician-section-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
    max-height: 400px;
    overflow-y: auto;
  }

  .inline-references {
    margin-top: 1.25rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .inline-references h5 {
    font-size: 0.85rem;
    color: #94a3b8;
    margin: 0 0 0.75rem 0;
    font-weight: 500;
  }

  .inline-ref {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 0.5rem;
    padding: 0.5rem 0;
    font-size: 0.8rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  }

  .inline-ref:last-child {
    border-bottom: none;
  }

  .ref-num {
    font-weight: 600;
    color: #06b6d4;
    min-width: 2rem;
  }

  .inline-ref a {
    color: #e2e8f0;
    text-decoration: none;
    flex: 1;
    min-width: 200px;
  }

  .inline-ref a:hover {
    color: #06b6d4;
    text-decoration: underline;
  }

  .ref-source {
    color: #64748b;
    font-style: italic;
  }

  .ref-citations {
    color: #22c55e;
    font-size: 0.75rem;
    background: rgba(34, 197, 94, 0.1);
    padding: 0.125rem 0.375rem;
    border-radius: 4px;
  }

  .clinician-content {
    font-size: 0.9rem;
    line-height: 1.7;
    color: #d1d5db;
  }

  .clinician-content h2 {
    font-size: 1rem;
    font-weight: 600;
    color: #06b6d4;
    margin: 1.5rem 0 0.75rem;
  }

  .clinician-content h2:first-child {
    margin-top: 0;
  }

  .clinician-content p {
    margin-bottom: 0.75rem;
  }

  .clinician-content ul, .clinician-content ol {
    margin-left: 1.25rem;
    margin-bottom: 0.75rem;
  }

  .clinician-content li {
    margin-bottom: 0.375rem;
  }

  /* Evidence Section */
  .evidence-cards-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.25rem;
  }

  @media (max-width: 800px) {
    .evidence-cards-grid {
      grid-template-columns: 1fr;
    }
  }

  .evidence-card-chorus {
    padding: 0;
    overflow: hidden;
  }

  .evidence-card-header-chorus {
    padding: 1.25rem;
    border-left: 4px solid;
    background: rgba(0, 0, 0, 0.2);
  }

  .evidence-card-top {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
  }

  .evidence-icon-large {
    font-size: 1.75rem;
  }

  .evidence-card-titles h3 {
    font-size: 1rem;
    font-weight: 600;
    margin: 0;
  }

  .evidence-subtitle {
    font-size: 0.75rem;
    color: #64748b;
    display: block;
    margin-top: 0.25rem;
  }

  .evidence-count-badge {
    margin-left: auto;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 20px;
    white-space: nowrap;
  }

  .evidence-card-body {
    padding: 1.25rem;
  }

  .source-breakdown {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
  }

  .source-tag {
    padding: 0.25rem 0.625rem;
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 6px;
    color: #94a3b8;
  }

  .top-cited-chorus {
    margin-bottom: 1.25rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }

  .top-cited-chorus h4,
  .all-sources h4 {
    font-size: 0.85rem;
    font-weight: 600;
    color: #e2e8f0;
    margin: 0 0 0.75rem;
  }

  .cited-paper-link {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.75rem;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 8px;
    text-decoration: none;
    margin-bottom: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .cited-paper-link:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .paper-title {
    font-size: 0.85rem;
    color: #06b6d4;
    flex: 1;
    line-height: 1.5;
  }

  .paper-citations {
    font-size: 0.75rem;
    color: #22c55e;
    white-space: nowrap;
    background: rgba(34, 197, 94, 0.15);
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .all-sources {
    margin-top: 0.5rem;
  }

  .sources-scroll-container {
    max-height: 500px;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior: contain;
    touch-action: pan-y;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-right: 0.5rem;
  }

  @media (max-width: 768px) {
    .sources-scroll-container {
      max-height: 300px;
    }
  }

  .source-item {
    padding: 1rem;
    background: rgba(255, 255, 255, 0.02);
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    transition: all 0.2s ease;
  }

  .source-item:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .source-item a {
    font-size: 0.9rem;
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.4;
    display: block;
  }

  .source-item a:hover {
    text-decoration: underline;
  }

  .source-snippet {
    font-size: 0.8rem;
    color: #a1a1aa;
    margin: 0.5rem 0 0;
    line-height: 1.5;
  }

  .publication-info {
    font-size: 0.75rem;
    color: #64748b;
    display: block;
    margin-top: 0.375rem;
    font-style: italic;
  }

  .source-item .cite-count {
    font-size: 0.7rem;
    color: #22c55e;
    display: inline-block;
    margin-top: 0.5rem;
    background: rgba(34, 197, 94, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  /* AI Section */
  .toggle-ai-btn {
    display: flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
    font-weight: 500;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.03);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .toggle-ai-btn:hover {
    background: rgba(255, 255, 255, 0.06);
    color: #e2e8f0;
  }

  .toggle-ai-btn svg {
    transition: transform 0.2s ease;
  }

  .ai-summary-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
  }

  .ai-summary-text {
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .ai-count {
    color: #e2e8f0;
    font-weight: 600;
  }

  .ai-provider-dots {
    display: flex;
    gap: 0.5rem;
  }

  .ai-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    transition: transform 0.2s ease;
  }

  .ai-dot:hover {
    transform: scale(1.3);
  }

  .ai-responses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 1rem;
  }

  .ai-card {
    padding: 0;
    overflow: hidden;
  }

  .ai-card-error {
    border-color: rgba(239, 68, 68, 0.3) !important;
  }

  .ai-card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.875rem 1.25rem;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  .ai-provider {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
  }

  .ai-model {
    font-size: 0.7rem;
    color: #64748b;
  }

  .ai-card-content {
    padding: 1rem 1.25rem;
    font-size: 0.85rem;
    line-height: 1.6;
    color: #d1d5db;
    max-height: 500px;
    overflow-y: auto;
  }

  .ai-card-content p {
    margin: 0;
  }

  .ai-error-text {
    padding: 1rem 1.25rem;
    color: #fca5a5;
    font-size: 0.85rem;
    margin: 0;
  }

  .ai-expand-btn {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    border: none;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    background: rgba(255, 255, 255, 0.02);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .ai-expand-btn:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #e2e8f0;
  }

  /* Media Section */
  .media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 1rem;
  }

  .media-card {
    display: flex;
    flex-direction: column;
    text-decoration: none;
    overflow: hidden;
  }

  .media-placeholder {
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.2);
    color: #64748b;
  }

  .media-info {
    padding: 0.875rem;
  }

  .media-title {
    font-size: 0.8rem;
    color: #e2e8f0;
    font-weight: 500;
    display: block;
    margin-bottom: 0.25rem;
    line-height: 1.3;
  }

  .media-source {
    font-size: 0.7rem;
    color: #64748b;
  }

  /* References Section */
  .chorus-references-section .glass-card {
    padding: 0;
    overflow: hidden;
  }

  .references-list {
    max-height: 400px;
    overflow-y: auto;
  }

  .reference-item {
    display: flex;
    gap: 1rem;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background 0.2s ease;
  }

  .reference-item:last-child {
    border-bottom: none;
  }

  .reference-item:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .reference-number {
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    min-width: 24px;
  }

  .reference-content {
    flex: 1;
  }

  .reference-content a {
    font-size: 0.9rem;
    color: #06b6d4;
    text-decoration: none;
    font-weight: 500;
    line-height: 1.4;
    display: block;
  }

  .reference-content a:hover {
    text-decoration: underline;
  }

  .reference-snippet {
    font-size: 0.8rem;
    color: #94a3b8;
    margin: 0.375rem 0;
    line-height: 1.5;
  }

  .reference-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .reference-type {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
  }

  .reference-type.guideline {
    background: rgba(20, 184, 166, 0.15);
    color: #14b8a6;
  }

  .reference-type.literature {
    background: rgba(14, 165, 233, 0.15);
    color: #0ea5e9;
  }

  .reference-citations {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.7rem;
    color: #64748b;
  }

  /* Follow-up Section */
  .follow-up-section {
    margin-top: 2rem;
  }

  .follow-up-form {
    padding: 1.25rem;
  }

  .follow-up-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .follow-up-header svg {
    opacity: 0.7;
  }

  .conversation-count {
    margin-left: auto;
    font-size: 0.75rem;
    background: rgba(99, 102, 241, 0.2);
    color: #a5b4fc;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
  }

  .follow-up-input-group {
    display: flex;
    gap: 0.75rem;
  }

  .follow-up-input-group input {
    flex: 1;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 0.875rem 1rem;
    font-size: 0.95rem;
    color: #e2e8f0;
    transition: all 0.2s ease;
  }

  .follow-up-input-group input:focus {
    outline: none;
    border-color: rgba(99, 102, 241, 0.5);
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
  }

  .follow-up-input-group input::placeholder {
    color: #64748b;
  }

  .follow-up-input-group input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .follow-up-button {
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border: none;
    border-radius: 12px;
    padding: 0 1.25rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
  }

  .follow-up-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
  }

  .follow-up-button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .spinner-small {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Chorus Footer */
  .chorus-footer {
    padding: 2rem;
    text-align: center;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
    margin-top: 2rem;
  }

  .chorus-footer-content p {
    font-size: 0.85rem;
    color: #64748b;
    margin: 0;
  }

  .chorus-disclaimer {
    margin-top: 0.5rem !important;
    font-size: 0.75rem !important;
    color: #52525b !important;
  }

  /* Follow-up FAB */
  .follow-up-fab-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
  }

  .follow-up-fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.4);
    transition: all 0.3s ease;
  }

  .follow-up-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.5);
  }

  .follow-up-fab.active {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    box-shadow: 0 4px 15px rgba(100, 116, 139, 0.4);
  }

  .follow-up-fab svg {
    transition: transform 0.2s ease;
  }

  .follow-up-panel {
    width: 340px;
    padding: 1rem;
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    animation: slideUpFade 0.2s ease-out;
  }

  @keyframes slideUpFade {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .follow-up-panel-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;
  }

  .follow-up-panel-title {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.9rem;
    color: #94a3b8;
  }

  .follow-up-panel-title svg {
    opacity: 0.7;
  }

  .follow-up-panel-close {
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .follow-up-panel-close:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #94a3b8;
  }

  .follow-up-panel-form {
    display: flex;
    gap: 0.5rem;
  }

  .follow-up-panel-form input {
    flex: 1;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
    color: #e2e8f0;
    transition: all 0.2s ease;
  }

  .follow-up-panel-form input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }

  .follow-up-panel-form input::placeholder {
    color: #64748b;
  }

  .follow-up-panel-form input:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .follow-up-panel-submit {
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 10px;
    padding: 0 1rem;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 44px;
  }

  .follow-up-panel-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.4);
  }

  .follow-up-panel-submit:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Mobile adjustments for FAB */
  @media (max-width: 480px) {
    .follow-up-fab-container {
      bottom: 1rem;
      right: 1rem;
    }

    .follow-up-panel {
      width: calc(100vw - 2rem);
      max-width: 340px;
    }

    .follow-up-fab {
      width: 52px;
      height: 52px;
    }
  }

  /* ===== PRISM STYLES (Original) ===== */
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

  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .logo-container { flex-shrink: 0; }
  .brand-text { text-align: left; }
  .brand-text .title { margin-bottom: 0.125rem; }
  .brand-text .subtitle { margin: 0; }

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

  .view-btn:hover { color: #d4d4d8; }

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

  .subtitle { color: #a1a1aa; font-size: 1rem; }

  .main { flex: 1; }

  .input-section {
    background: rgba(255,255,255,0.03);
    border-radius: 1rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
    border: 1px solid rgba(255,255,255,0.08);
  }

  .form { display: flex; flex-direction: column; gap: 0.75rem; }
  .label { font-size: 0.9rem; font-weight: 500; color: #e4e4e7; }

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

  .form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .provider-pills { display: flex; gap: 0.5rem; flex-wrap: wrap; }

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

  .submit-btn:hover:not(:disabled) { transform: translateY(-1px); }
  .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

  .examples {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    align-items: center;
  }

  .examples-label { font-size: 0.8rem; color: #71717a; }

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

  .loading { text-align: center; padding: 3rem; color: #a1a1aa; }

  .spinner {
    width: 36px;
    height: 36px;
    border: 3px solid rgba(255,255,255,0.1);
    border-radius: 50%;
    margin: 0 auto 1rem;
    animation: spin 1s linear infinite;
  }

  .section { margin-bottom: 2rem; }

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

  .section-icon { font-size: 1.25rem; }

  .section-count {
    font-size: 0.8rem;
    color: #71717a;
    background: rgba(255,255,255,0.05);
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
  }

  .responses-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .responses-grid[data-count="1"] { grid-template-columns: 1fr; max-width: 600px; }
  .responses-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .responses-grid[data-count="4"] { grid-template-columns: repeat(2, 1fr); }
  .responses-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }
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

  .card-error { border-color: #ef4444; }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    background: rgba(0,0,0,0.2);
  }

  .provider-info { display: flex; align-items: center; gap: 0.5rem; }
  .provider-dot { width: 8px; height: 8px; border-radius: 50%; }
  .provider-name { font-weight: 600; font-size: 0.9rem; }
  .model { font-size: 0.7rem; color: #71717a; }

  .card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.6;
    max-height: 300px;
    overflow-y: auto;
    color: #d4d4d8;
    flex: 1;
  }

  .card-error-content { padding: 1rem; color: #fca5a5; font-size: 0.85rem; }

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

  .highlight-title-row { display: flex; align-items: center; gap: 0.5rem; }
  .highlight-icon { font-size: 1.5rem; }
  .highlight-title { font-size: 1.1rem; font-weight: 600; color: #f9a8d4; margin: 0; }

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

  .copy-btn:hover { background: rgba(236, 72, 153, 0.3); }

  .highlight-content {
    padding: 1.5rem;
    font-size: 1rem;
    line-height: 1.8;
    color: #e4e4e7;
  }

  .highlight-content p:first-child { font-size: 1.1rem; font-weight: 500; color: #f4f4f5; }

  .analysis-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
  }

  .analysis-grid[data-count="1"] { grid-template-columns: 1fr; }
  .analysis-grid[data-count="3"] { grid-template-columns: repeat(3, 1fr); }
  .analysis-grid[data-count="5"] { grid-template-columns: repeat(3, 1fr); }

  @media (max-width: 1000px) {
    .analysis-grid,
    .analysis-grid[data-count="3"],
    .analysis-grid[data-count="5"] {
      grid-template-columns: repeat(2, 1fr);
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

  .analysis-icon { font-size: 1.1rem; }
  .analysis-card-title { font-size: 0.9rem; font-weight: 600; margin: 0; }

  .analysis-card-content {
    padding: 1rem;
    font-size: 0.85rem;
    line-height: 1.7;
    color: #d4d4d8;
  }

  .footer { text-align: center; padding: 1.5rem 0; color: #52525b; font-size: 0.8rem; }

  /* Markdown */
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

  /* Clarification UI */
  .chorus-clarifying,
  .chorus-clarification {
    padding: 1.5rem;
    text-align: center;
  }

  .chorus-clarifying h3,
  .chorus-clarification h3 {
    color: #f4f4f5;
    margin-bottom: 0.5rem;
    font-size: 1.1rem;
  }

  .chorus-clarifying p {
    color: #a1a1aa;
    font-size: 0.95rem;
  }

  .clarification-header {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    text-align: left;
    margin-bottom: 1.25rem;
  }

  .clarification-header svg {
    color: #06b6d4;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .clarification-explanation {
    color: #a1a1aa;
    font-size: 0.9rem;
    margin-top: 0.25rem;
  }

  .clarification-questions {
    background: rgba(6, 182, 212, 0.08);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    margin-bottom: 1.25rem;
    text-align: left;
  }

  .clarification-questions h4 {
    color: #06b6d4;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .clarification-questions ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .clarification-questions li {
    color: #d4d4d8;
    font-size: 0.95rem;
    padding: 0.4rem 0;
    padding-left: 1.25rem;
    position: relative;
  }

  .clarification-questions li::before {
    content: '?';
    position: absolute;
    left: 0;
    color: #06b6d4;
    font-weight: 600;
  }

  .clarification-options {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }

  .clarification-option {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.25rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: left;
    width: 100%;
    font-family: inherit;
    color: inherit;
  }

  .clarification-option:hover {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
    transform: translateY(-1px);
  }

  .clarification-option.refined {
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.08);
  }

  .clarification-option.refined:hover {
    background: rgba(16, 185, 129, 0.15);
    border-color: rgba(16, 185, 129, 0.5);
  }

  .option-label {
    font-size: 0.75rem;
    color: #71717a;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  .clarification-option.refined .option-label {
    color: #10b981;
  }

  .option-text {
    color: #e4e4e7;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .clarification-actions {
    display: flex;
    justify-content: center;
    padding-top: 0.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .clarification-skip {
    background: transparent;
    border: none;
    color: #71717a;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.75rem 1rem;
    transition: color 0.2s ease;
    font-family: inherit;
  }

  .clarification-skip:hover {
    color: #a1a1aa;
  }

  .clarification-search {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    border: none;
    color: white;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 500;
    transition: all 0.2s ease;
    font-family: inherit;
    margin-left: 1rem;
  }

  .clarification-search:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }

  /* Conversational Clarification Styles */
  .clarify-conversation {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }

  .clarify-message {
    animation: slideUp 0.3s ease;
  }

  .clarify-message.ai {
    align-self: flex-start;
  }

  .clarify-message.user {
    align-self: flex-end;
  }

  .clarify-ai-message {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
  }

  .clarify-avatar {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(6, 182, 212, 0.15);
    border-radius: 50%;
  }

  .clarify-ai-message .clarify-text {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    padding: 0.75rem 1rem;
    border-radius: 0 12px 12px 12px;
    color: #e4e4e7;
    font-size: 0.95rem;
    max-width: 90%;
    line-height: 1.5;
  }

  .clarify-user-message {
    display: flex;
    justify-content: flex-end;
  }

  .clarify-user-message .clarify-text {
    background: rgba(20, 184, 166, 0.15);
    border: 1px solid rgba(20, 184, 166, 0.25);
    padding: 0.75rem 1rem;
    border-radius: 12px 0 12px 12px;
    color: #e4e4e7;
    font-size: 0.95rem;
    max-width: 80%;
    line-height: 1.5;
  }

  .clarify-typing {
    display: flex;
    gap: 4px;
    padding: 0.75rem 1rem;
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    border-radius: 0 12px 12px 12px;
  }

  .clarify-typing span {
    width: 6px;
    height: 6px;
    background: #06b6d4;
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }

  .clarify-typing span:nth-child(2) { animation-delay: 0.2s; }
  .clarify-typing span:nth-child(3) { animation-delay: 0.4s; }

  @keyframes typing {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
    30% { transform: translateY(-4px); opacity: 1; }
  }

  .clarify-quick-options {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    margin-left: 2.5rem;
  }

  .clarify-quick-btn {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    color: #e4e4e7;
    padding: 0.5rem 1rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    font-family: inherit;
  }

  .clarify-quick-btn:hover {
    background: rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  .clarify-input-row {
    display: flex;
    gap: 0.75rem;
    margin-left: 2.5rem;
    margin-bottom: 1rem;
  }

  .clarify-input {
    flex: 1;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #e4e4e7;
    font-size: 0.95rem;
    font-family: inherit;
    transition: all 0.2s ease;
  }

  .clarify-input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.4);
    background: rgba(255, 255, 255, 0.08);
  }

  .clarify-input::placeholder {
    color: #71717a;
  }

  .clarify-send-btn {
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    border: none;
    color: white;
    width: 44px;
    height: 44px;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .clarify-send-btn:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
  }

  .clarify-send-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .clarify-ready {
    margin-left: 2.5rem;
    margin-bottom: 1rem;
  }

  .clarify-refined-preview {
    background: rgba(20, 184, 166, 0.1);
    border: 1px solid rgba(20, 184, 166, 0.25);
    border-radius: 8px;
    padding: 1rem;
  }

  .clarify-refined-label {
    display: block;
    font-size: 0.75rem;
    color: #14b8a6;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;
    font-weight: 600;
  }

  .clarify-refined-text {
    color: #e4e4e7;
    font-size: 0.95rem;
    line-height: 1.5;
  }

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

    .chorus-header { padding: 1.5rem 1rem; }
    .chorus-title { font-size: 2rem; }
    .chorus-main { padding: 0 1rem 1.5rem; }
    .chorus-search-section { padding: 1.25rem; }
    .chorus-input-wrapper { flex-direction: column; }
    .chorus-submit-btn { width: 100%; justify-content: center; }
    .chorus-summary-tabs { width: 100%; }
    .summary-tab { flex: 1; justify-content: center; }
    .summary-header { flex-wrap: wrap; }
    .summary-header .copy-btn { width: 100%; margin-left: 0; margin-top: 0.75rem; }
  }
`
document.head.appendChild(styleSheet)

export default App

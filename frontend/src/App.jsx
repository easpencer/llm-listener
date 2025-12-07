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
  const resultsRef = useRef(null)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!question.trim() || loading) return

    setLoading(true)
    setResponses([])
    setSynthesis(null)
    setEvidence(null)
    setError(null)
    setShowAllAI(false)

    try {
      const queryPromise = fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, include_synthesis: true, mode }),
      })

      const evidencePromise = mode === 'health_research'
        ? fetch('/api/evidence', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: question }),
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
    let score = 0
    let factors = []

    if (guidelines.available && guidelines.totalSources >= 3) {
      score += 30
      factors.push('Multiple official guidelines')
    } else if (guidelines.available) {
      score += 15
      factors.push('Official guidelines available')
    }

    if (literature.available && literature.totalPapers >= 5) {
      score += 25
      factors.push('Strong research base')
    } else if (literature.available) {
      score += 12
      factors.push('Research available')
    }

    if (aiConsensus.available && aiConsensus.modelCount >= 3) {
      score += 20
      factors.push('Multiple AI models agree')
    } else if (aiConsensus.available) {
      score += 10
      factors.push('AI analysis available')
    }

    // Bonus for having all three source types
    if (guidelines.available && literature.available && aiConsensus.available) {
      score += 25
      factors.push('Cross-validated sources')
    }

    return {
      score: Math.min(score, 100),
      level: score >= 70 ? 'high' : score >= 40 ? 'moderate' : 'limited',
      factors,
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

  // Generate patient-friendly summary with Authority/Science/AI structure
  const generatePatientSummary = () => {
    const integrated = generateIntegratedSynthesis()
    if (!integrated) return null

    let sections = []
    const aiContent = integrated.aiConsensus.synthesisContent || ''
    const paragraphs = aiContent.split('\n\n').filter(p => p.trim())

    // Section 1: What Health Authorities Say
    if (integrated.guidelines.available && integrated.guidelines.sources) {
      const orgs = [...new Set(integrated.guidelines.sources.map(s => extractOrgFromUrl(s.url)))]
      const guidelineLinks = integrated.guidelines.sources.slice(0, 4).map(s =>
        `- [${s.title.slice(0, 80)}${s.title.length > 80 ? '...' : ''}](${s.url}) — *${extractOrgFromUrl(s.url)}*`
      ).join('\n')

      sections.push({
        type: 'official',
        icon: '🏛️',
        title: 'What Health Authorities Say',
        content: `Official guidance from ${orgs.join(', ')} addresses this topic:\n\n${guidelineLinks}`,
        sourceCount: integrated.guidelines.totalSources,
      })
    }

    // Section 2: What Research Shows
    if (integrated.literature.available && integrated.literature.sources) {
      const topPapers = integrated.literature.sources.slice(0, 3)
      const researchLinks = topPapers.map(s => {
        const citations = s.cited_by > 0 ? ` (${s.cited_by} citations)` : ''
        return `- [${s.title.slice(0, 80)}${s.title.length > 80 ? '...' : ''}](${s.url})${citations}`
      }).join('\n')

      sections.push({
        type: 'research',
        icon: '🔬',
        title: 'What Research Shows',
        content: `Recent scientific studies have examined this topic:\n\n${researchLinks}`,
        sourceCount: integrated.literature.totalPapers,
      })
    }

    // Section 3: Expert Summary (simplified AI synthesis)
    if (integrated.aiConsensus.available && paragraphs.length > 0) {
      // Take the most accessible portions for patients
      const simpleContent = paragraphs.slice(0, 3).join('\n\n')

      sections.push({
        type: 'synthesis',
        icon: '💡',
        title: 'Expert Summary',
        content: simpleContent,
        modelCount: integrated.aiConsensus.modelCount,
      })
    }

    return {
      headline: question,
      sections,
      confidence: integrated.confidence,
    }
  }

  // Generate clinician-focused summary with Authority/Science/AI/Consensus structure
  const generateClinicianSummary = () => {
    const integrated = generateIntegratedSynthesis()
    if (!integrated) return null

    let sections = []
    const aiContent = integrated.aiConsensus.synthesisContent || ''
    let refNum = 1
    const allRefs = []

    // Section 1: Official Guidelines Summary
    if (integrated.guidelines.available && integrated.guidelines.sources) {
      const sources = integrated.guidelines.sources
      const orgs = [...new Set(sources.map(s => extractOrgFromUrl(s.url)))]

      // Build references
      sources.slice(0, 6).forEach(link => {
        allRefs.push({
          num: refNum++,
          title: link.title,
          source: extractOrgFromUrl(link.url),
          url: link.url,
          type: 'guideline',
        })
      })

      const guidelineLinks = allRefs.filter(r => r.type === 'guideline').map(r =>
        `${r.num}. [${r.title}](${r.url}) — *${r.source}*`
      ).join('\n\n')

      sections.push({
        type: 'official',
        title: 'Official Guidelines',
        subtitle: `From ${orgs.join(', ')}`,
        content: `**${sources.length} authoritative sources** provide guidance on this topic:\n\n${guidelineLinks}`,
        sourceCount: sources.length,
      })
    }

    // Section 2: Scientific Literature Summary
    if (integrated.literature.available && integrated.literature.sources) {
      const sources = integrated.literature.sources
      const totalCitations = sources.reduce((sum, s) => sum + (s.cited_by || 0), 0)

      // Build references
      sources.slice(0, 6).forEach(link => {
        allRefs.push({
          num: refNum++,
          title: link.title,
          source: link.publication_info || 'Peer-reviewed',
          url: link.url,
          citations: link.cited_by || 0,
          type: 'literature',
        })
      })

      const litLinks = allRefs.filter(r => r.type === 'literature').map(r => {
        const cites = r.citations > 0 ? ` *(${r.citations} citations)*` : ''
        return `${r.num}. [${r.title}](${r.url})${cites}`
      }).join('\n\n')

      sections.push({
        type: 'literature',
        title: 'Scientific Literature',
        subtitle: `${sources.length} studies, ${totalCitations} total citations`,
        content: `**Peer-reviewed research** on this topic:\n\n${litLinks}`,
        sourceCount: sources.length,
      })
    }

    // Section 3: AI Analysis (the actual synthesis)
    if (integrated.aiConsensus.available && aiContent) {
      sections.push({
        type: 'synthesis',
        title: 'AI Expert Analysis',
        subtitle: `Synthesis from ${integrated.aiConsensus.modelCount} AI models`,
        content: aiContent,
        modelCount: integrated.aiConsensus.modelCount,
        models: integrated.aiConsensus.providers.map(p => p.name),
      })
    }

    // Section 4: Consensus & Areas of Uncertainty
    const hasMultipleSources = integrated.guidelines.available && integrated.literature.available
    const hasAI = integrated.aiConsensus.available

    if (hasMultipleSources || hasAI) {
      let consensusContent = ''

      // Analyze what we have
      const guidelineCount = integrated.guidelines?.totalSources || 0
      const literatureCount = integrated.literature?.totalPapers || 0
      const aiCount = integrated.aiConsensus?.modelCount || 0

      consensusContent += '### Source Agreement\n\n'

      if (guidelineCount >= 3 && literatureCount >= 3) {
        consensusContent += `- **Strong evidence base**: ${guidelineCount} official guidelines and ${literatureCount} peer-reviewed studies address this topic\n`
      } else if (guidelineCount >= 1 && literatureCount >= 1) {
        consensusContent += `- **Moderate evidence base**: ${guidelineCount} official source(s) and ${literatureCount} study/studies available\n`
      } else {
        consensusContent += `- **Limited evidence**: Fewer sources than typical for clinical decision-making\n`
      }

      if (aiCount >= 3) {
        consensusContent += `- **AI consensus**: ${aiCount} AI models provided analysis, allowing cross-validation\n`
      }

      consensusContent += '\n### Considerations\n\n'
      consensusContent += '- Evidence should be evaluated in clinical context\n'
      consensusContent += '- Guidelines may vary by region/organization\n'
      consensusContent += '- Recent publications may not yet be reflected in guidelines\n'

      sections.push({
        type: 'consensus',
        title: 'Evidence Synthesis',
        content: consensusContent,
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
                        <div className={`confidence-badge confidence-${patientSummary.confidence.level}`}>
                          {patientSummary.confidence.level === 'high' ? 'High Confidence' :
                           patientSummary.confidence.level === 'moderate' ? 'Moderate Confidence' : 'Limited Data'}
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
                        <div className="summary-confidence">
                          <span className="confidence-label">Evidence Strength:</span>
                          <div className="confidence-bar">
                            <div className="confidence-fill" style={{ width: `${patientSummary.confidence.score}%` }}></div>
                          </div>
                          <div className="confidence-factors">
                            {patientSummary.confidence.factors.map((f, i) => (
                              <span key={i} className="confidence-factor">{f}</span>
                            ))}
                          </div>
                        </div>
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
                        <div className={`confidence-badge confidence-${clinicianSummary.confidence.level}`}>
                          {clinicianSummary.confidence.score}% confidence
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

  // Original Prism UI
  const modeColors = {
    primary: '#a855f7',
    secondary: '#6366f1',
    gradient: 'linear-gradient(135deg, #a855f7 0%, #6366f1 100%)',
  }

  return (
    <div className="app-container" data-mode={mode}>
      <header className="header">
        <div className="brand">
          <div className="logo-container">
            <PrismLogo size={56} />
          </div>
          <div className="brand-text">
            <h1 className="title" style={{ background: modeColors.gradient, WebkitBackgroundClip: 'text', backgroundClip: 'text' }}>
              {appConfig.app_name}
            </h1>
            <p className="subtitle">{appConfig.tagline}</p>
          </div>
        </div>

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
      </header>

      <main className="main">
        <div className="input-section">
          <form onSubmit={handleSubmit} className="form">
            <label className="label">What question are people asking AI?</label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter a health question the public might ask..."
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
              <button key={i} onClick={() => setQuestion(q)} className="example-btn">
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

        {highlightSection && (
          <section className="section">
            <div className="highlight-card">
              <div className="highlight-header">
                <div className="highlight-title-row">
                  <span className="highlight-icon">💬</span>
                  <h2 className="highlight-title">Ready-to-Use Public Health Message</h2>
                </div>
                <button
                  className="copy-btn"
                  onClick={() => {
                    const messageMatch = highlightSection.content.match(/^\*\*(.+?)\*\*/s) || highlightSection.content.match(/^"(.+?)"/s)
                    const messageToCopy = messageMatch ? messageMatch[1] : highlightSection.content.split('\n\n')[0]
                    navigator.clipboard.writeText(messageToCopy.replace(/\*\*/g, ''))
                    setCopied(true)
                    setTimeout(() => setCopied(false), 2000)
                  }}
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

        {viewMode === 'detailed' && regularSections.length > 0 && (
          <section className="section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">📊</span>
                Detailed Analysis
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
        <p>Prism helps public health officials understand AI narratives</p>
        <ViewResultsLink />
      </footer>

      {appConfig.show_study && <StudyFAB onClick={() => setStudyModalOpen(true)} />}
      {appConfig.show_study && (
        <StudyModal
          isOpen={studyModalOpen}
          onClose={() => setStudyModalOpen(false)}
          onQuerySubmit={(query) => {
            setQuestion(query)
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

  // Generate summary paragraph for this evidence type
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
      if (!orgMap[org]) orgMap[org] = 0
      orgMap[org]++
    })

    const orgs = Object.keys(orgMap).filter(o => o !== 'Other')
    const topics = links.slice(0, 3).map(l => l.title.split(' - ')[0].split('|')[0].trim().slice(0, 50))

    if (type === 'guidelines') {
      return `Found ${count} official sources${orgs.length > 0 ? ` from ${orgs.slice(0, 3).join(', ')}` : ''}. These authoritative sources provide evidence-based recommendations and clinical guidance on this health topic.`
    } else {
      const totalCites = links.reduce((s, l) => s + (l.cited_by || 0), 0)
      return `Found ${count} peer-reviewed studies${totalCites > 0 ? ` with ${totalCites} combined citations` : ''}. This research provides scientific evidence and clinical insights on this topic.`
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
            <p>{summary}</p>
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

  .section-references {
    border-left: 3px solid #64748b;
    background: rgba(100, 116, 139, 0.05);
  }

  .section-sources {
    border-left: 3px solid #0ea5e9;
    background: rgba(14, 165, 233, 0.05);
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
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-right: 0.5rem;
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

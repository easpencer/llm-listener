import { useState, useEffect, useCallback } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  STUDY_CASES,
  SUS_QUESTIONS,
  ACCURACY_DIMENSIONS,
  QUALITY_DIMENSIONS,
  EFFECTIVENESS_QUESTIONS
} from './studyData'

// Pre-generated responses cache (loaded dynamically)
let pregeneratedCache = null
let pregeneratedLoaded = false

async function loadPregeneratedResponses() {
  if (pregeneratedLoaded) return pregeneratedCache
  pregeneratedLoaded = true

  try {
    const module = await import('./pregenerated_responses.json')
    pregeneratedCache = module.default || module
    console.log('Loaded pre-generated responses for study')
    return pregeneratedCache
  } catch (e) {
    console.log('Pre-generated responses not found, will use live API')
    return null
  }
}

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 15) + Date.now().toString(36)

// Save to localStorage as fallback
const saveToLocalStorage = (key, data) => {
  try {
    const existing = JSON.parse(localStorage.getItem('chorusStudyData') || '{}')
    existing[key] = existing[key] || []
    existing[key].push({ ...data, timestamp: new Date().toISOString() })
    localStorage.setItem('chorusStudyData', JSON.stringify(existing))
    return true
  } catch (e) {
    console.error('Failed to save to localStorage:', e)
    return false
  }
}

// API helper with localStorage fallback
const saveStudyData = async (endpoint, data) => {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.warn('API unavailable, saving to localStorage:', error.message)
    saveToLocalStorage(endpoint, data)
    return { saved_locally: true }
  }
}

// Floating Action Button
export function StudyFAB({ onClick }) {
  return (
    <button className="study-fab" onClick={onClick} aria-label="Join Study">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        <path d="M9 12h6M9 16h6" />
      </svg>
      <span className="study-fab-text">Join Study</span>
    </button>
  )
}

// Study phases in order
const PHASES = ['consent', 'demographics', 'accuracy', 'quality', 'usability', 'effectiveness', 'complete']

// Main Study Modal - Single unified flow
export function StudyModal({ isOpen, onClose, onQuerySubmit, setViewMode }) {
  const [phase, setPhase] = useState('consent')
  const [sessionId, setSessionId] = useState(null)
  const [consentGiven, setConsentGiven] = useState(false)

  // Demographics
  const [demographics, setDemographics] = useState({
    role: '',
    experience: '',
    orgType: '',
    expertiseArea: ''
  })

  // Randomized case assignment (3 out of 7)
  const [assignedCases, setAssignedCases] = useState([])

  // Phase 1: Content Accuracy
  const [currentAccuracyCase, setCurrentAccuracyCase] = useState(0)
  const [accuracyResponses, setAccuracyResponses] = useState({})
  const [chorusResponses, setChorusResponses] = useState(null)
  const [loadingChorus, setLoadingChorus] = useState(false)

  // Phase 2: Message Quality
  const [currentQualityCase, setCurrentQualityCase] = useState(0)
  const [qualityResponses, setQualityResponses] = useState({})
  const [messageOrders, setMessageOrders] = useState({}) // Track randomization per case

  // Phase 3: Usability (with Interface A/B)
  const [assignedInterface, setAssignedInterface] = useState(null) // 'brief' or 'detailed'
  const [usabilitySubPhase, setUsabilitySubPhase] = useState('intro') // intro, tasks, sus
  const [currentTask, setCurrentTask] = useState(0)
  const [taskStartTime, setTaskStartTime] = useState(null)
  const [taskResults, setTaskResults] = useState([])
  const [susResponses, setSusResponses] = useState(Array(10).fill(0))

  // Phase 4: Message Effectiveness (with Message A/B)
  const [assignedMessage, setAssignedMessage] = useState(null) // 'chorus' or 'cdc'
  const [effectivenessSubPhase, setEffectivenessSubPhase] = useState('baseline') // baseline, message, post
  const [effectivenessResponses, setEffectivenessResponses] = useState({})

  // Reset all state
  const resetState = () => {
    setPhase('consent')
    setSessionId(null)
    setConsentGiven(false)
    setDemographics({ role: '', experience: '', orgType: '', expertiseArea: '' })
    setAssignedCases([])
    setCurrentAccuracyCase(0)
    setAccuracyResponses({})
    setChorusResponses(null)
    setCurrentQualityCase(0)
    setQualityResponses({})
    setMessageOrders({})
    setAssignedInterface(null)
    setUsabilitySubPhase('intro')
    setCurrentTask(0)
    setTaskStartTime(null)
    setTaskResults([])
    setSusResponses(Array(10).fill(0))
    setAssignedMessage(null)
    setEffectivenessSubPhase('baseline')
    setEffectivenessResponses({})
  }

  const handleClose = () => {
    if (phase !== 'consent' && phase !== 'complete') {
      if (!window.confirm('Exit study? Your progress will be saved locally.')) return
      // Save partial progress
      saveToLocalStorage('partial_study', {
        sessionId,
        phase,
        demographics,
        accuracyResponses,
        qualityResponses,
        taskResults,
        susResponses,
        effectivenessResponses
      })
    }
    resetState()
    onClose()
  }

  // Get pre-generated response for a case by query
  const getPregenerated = async (query) => {
    const pregenerated = await loadPregeneratedResponses()
    if (!pregenerated?.cases) return null

    const caseData = pregenerated.cases.find(c => c.query === query)
    if (!caseData) return null

    // Transform to match API response format
    const responses = Object.values(caseData.responses || {})
    return {
      question: caseData.query,
      responses: responses,
      synthesis: caseData.synthesis
    }
  }

  // Fetch Chorus response for a case (uses pre-generated if available)
  const fetchChorusResponse = async (query) => {
    setLoadingChorus(true)

    try {
      // Try pre-generated responses first
      const pregenerated = await getPregenerated(query)
      if (pregenerated) {
        console.log('Using pre-generated response for:', query.substring(0, 30) + '...')
        setChorusResponses(pregenerated)
        setLoadingChorus(false)
        return
      }

      // Fall back to live API
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: query, include_synthesis: true, mode: 'public_health' })
      })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setChorusResponses(data)
    } catch (err) {
      console.error('Error fetching Chorus response:', err)
      setChorusResponses({ error: 'Failed to load AI responses' })
    } finally {
      setLoadingChorus(false)
    }
  }

  // Start study after consent + demographics
  const startStudy = async () => {
    const newSessionId = generateId()
    setSessionId(newSessionId)

    // Randomly select 3 cases out of 7
    const allIndices = [0, 1, 2, 3, 4, 5, 6]
    const shuffled = allIndices.sort(() => Math.random() - 0.5)
    const selectedCases = shuffled.slice(0, 3).sort((a, b) => a - b) // Keep in order
    setAssignedCases(selectedCases)

    // Random assignments for A/B tests
    setAssignedInterface(Math.random() < 0.5 ? 'brief' : 'detailed')
    setAssignedMessage(Math.random() < 0.5 ? 'chorus' : 'cdc')

    // Save session
    await saveStudyData('/api/study/session', {
      session_id: newSessionId,
      participant_type: demographics.role,
      role: demographics.role,
      experience_years: demographics.experience ? parseInt(demographics.experience) : null,
      organization_type: demographics.orgType,
      expertise_area: demographics.expertiseArea,
      assigned_cases: selectedCases
    })

    // Load first assigned case for accuracy phase
    fetchChorusResponse(STUDY_CASES[selectedCases[0]].query)
    setPhase('accuracy')
  }

  // Calculate SUS score
  const calculateSusScore = () => {
    let score = 0
    susResponses.forEach((response, index) => {
      if (index % 2 === 0) {
        score += (response - 1)
      } else {
        score += (5 - response)
      }
    })
    return score * 2.5
  }

  // Complete study
  const completeStudy = async () => {
    await saveStudyData('/api/study/complete', {
      session_id: sessionId,
      demographics,
      accuracy_responses: accuracyResponses,
      quality_responses: qualityResponses,
      message_orders: messageOrders,
      assigned_interface: assignedInterface,
      task_results: taskResults,
      sus_responses: susResponses,
      sus_score: calculateSusScore(),
      assigned_message: assignedMessage,
      effectiveness_responses: effectivenessResponses
    })
    setPhase('complete')
  }

  // Progress indicator
  const getProgress = () => {
    const phaseIndex = PHASES.indexOf(phase)
    return Math.round((phaseIndex / (PHASES.length - 1)) * 100)
  }

  if (!isOpen) return null

  return (
    <div className="study-modal-overlay" onClick={(e) => e.target === e.currentTarget && handleClose()}>
      <div className="study-modal">
        <button className="study-modal-close" onClick={handleClose}>×</button>

        {/* Progress bar */}
        {phase !== 'consent' && phase !== 'complete' && (
          <div className="study-progress">
            <div className="study-progress-bar" style={{ width: `${getProgress()}%` }} />
            <span className="study-progress-text">{getProgress()}% Complete</span>
          </div>
        )}

        {/* Phase: Consent */}
        {phase === 'consent' && (
          <div className="study-phase">
            <h2>Chorus Research Study</h2>
            <p className="study-intro">
              Thank you for your interest in evaluating Chorus, an AI-powered tool for public health communication.
            </p>

            <div className="consent-content">
              <h3>Informed Consent</h3>

              <section>
                <h4>Purpose</h4>
                <p>This study evaluates Chorus, a tool that helps public health professionals understand and respond to health misinformation by analyzing what AI systems tell the public.</p>
              </section>

              <section>
                <h4>What You'll Do</h4>
                <p>Complete 4 short evaluation phases:</p>
                <ol>
                  <li><strong>Content Accuracy</strong> - Rate AI responses to health questions</li>
                  <li><strong>Message Quality</strong> - Compare public health messages</li>
                  <li><strong>Usability</strong> - Complete tasks and rate the tool</li>
                  <li><strong>Message Effectiveness</strong> - React to a health message</li>
                </ol>
                <p>Estimated time: 20-30 minutes total.</p>
              </section>

              <section>
                <h4>Data Collection</h4>
                <p>We collect your responses and basic demographic information (role, experience). No personally identifiable information (name, email) is collected. All data is anonymized and will be weighted by expertise level in analysis.</p>
              </section>

              <section>
                <h4>Voluntary Participation</h4>
                <p>Participation is voluntary. You may exit at any time without penalty.</p>
              </section>

              <label className="consent-checkbox">
                <input
                  type="checkbox"
                  checked={consentGiven}
                  onChange={(e) => setConsentGiven(e.target.checked)}
                />
                <span>I have read and understand the above information. I voluntarily agree to participate.</span>
              </label>
            </div>

            <button
              className="study-btn primary"
              disabled={!consentGiven}
              onClick={() => setPhase('demographics')}
            >
              Continue
            </button>
          </div>
        )}

        {/* Phase: Demographics */}
        {phase === 'demographics' && (
          <div className="study-phase">
            <h2>About You</h2>
            <p className="study-intro">Your background helps us understand different perspectives on AI health information.</p>

            <div className="demographics-form">
              <div className="form-group">
                <label>What best describes your role? *</label>
                <select
                  value={demographics.role}
                  onChange={(e) => setDemographics(d => ({ ...d, role: e.target.value }))}
                >
                  <option value="">Select your role...</option>
                  <option value="public_health_official">Public Health Official</option>
                  <option value="healthcare_provider">Healthcare Provider (MD, RN, etc.)</option>
                  <option value="researcher">Researcher / Academic</option>
                  <option value="communications">Health Communications Professional</option>
                  <option value="policy">Health Policy Professional</option>
                  <option value="general_public">General Public / Patient</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Years of experience in health-related work</label>
                <select
                  value={demographics.experience}
                  onChange={(e) => setDemographics(d => ({ ...d, experience: e.target.value }))}
                >
                  <option value="">Select...</option>
                  <option value="0">None / Not applicable</option>
                  <option value="1">Less than 2 years</option>
                  <option value="3">2-5 years</option>
                  <option value="7">6-10 years</option>
                  <option value="15">11-20 years</option>
                  <option value="25">More than 20 years</option>
                </select>
              </div>

              <div className="form-group">
                <label>Organization type</label>
                <select
                  value={demographics.orgType}
                  onChange={(e) => setDemographics(d => ({ ...d, orgType: e.target.value }))}
                >
                  <option value="">Select...</option>
                  <option value="government">Government / Public Health Agency</option>
                  <option value="healthcare">Healthcare Organization</option>
                  <option value="academia">Academic Institution</option>
                  <option value="nonprofit">Non-profit Organization</option>
                  <option value="private">Private Sector</option>
                  <option value="none">Not applicable</option>
                </select>
              </div>

              <div className="form-group">
                <label>Area of expertise (if applicable)</label>
                <input
                  type="text"
                  value={demographics.expertiseArea}
                  onChange={(e) => setDemographics(d => ({ ...d, expertiseArea: e.target.value }))}
                  placeholder="e.g., Infectious Disease, Health Communication, Epidemiology"
                />
              </div>
            </div>

            <div className="study-btn-row">
              <button className="study-btn secondary" onClick={() => setPhase('consent')}>Back</button>
              <button
                className="study-btn primary"
                disabled={!demographics.role}
                onClick={startStudy}
              >
                Begin Study
              </button>
            </div>
          </div>
        )}

        {/* Phase 1: Content Accuracy */}
        {phase === 'accuracy' && (
          <ContentAccuracyPhase
            assignedCases={assignedCases}
            currentCase={currentAccuracyCase}
            setCurrentCase={setCurrentAccuracyCase}
            responses={accuracyResponses}
            setResponses={setAccuracyResponses}
            chorusResponses={chorusResponses}
            loadingChorus={loadingChorus}
            fetchChorusResponse={fetchChorusResponse}
            onComplete={() => {
              setCurrentQualityCase(0)
              fetchChorusResponse(STUDY_CASES[assignedCases[0]].query)
              // Set initial message order for first case
              setMessageOrders(prev => ({
                ...prev,
                0: Math.random() < 0.5 ? ['chorus', 'cdc'] : ['cdc', 'chorus']
              }))
              setPhase('quality')
            }}
          />
        )}

        {/* Phase 2: Message Quality */}
        {phase === 'quality' && (
          <MessageQualityPhase
            assignedCases={assignedCases}
            currentCase={currentQualityCase}
            setCurrentCase={setCurrentQualityCase}
            responses={qualityResponses}
            setResponses={setQualityResponses}
            messageOrders={messageOrders}
            setMessageOrders={setMessageOrders}
            chorusResponses={chorusResponses}
            loadingChorus={loadingChorus}
            fetchChorusResponse={fetchChorusResponse}
            onComplete={() => setPhase('usability')}
          />
        )}

        {/* Phase 3: Usability */}
        {phase === 'usability' && (
          <UsabilityPhase
            subPhase={usabilitySubPhase}
            setSubPhase={setUsabilitySubPhase}
            assignedInterface={assignedInterface}
            currentTask={currentTask}
            setCurrentTask={setCurrentTask}
            taskStartTime={taskStartTime}
            setTaskStartTime={setTaskStartTime}
            taskResults={taskResults}
            setTaskResults={setTaskResults}
            susResponses={susResponses}
            setSusResponses={setSusResponses}
            onQuerySubmit={onQuerySubmit}
            setViewMode={setViewMode}
            onComplete={() => setPhase('effectiveness')}
          />
        )}

        {/* Phase 4: Message Effectiveness */}
        {phase === 'effectiveness' && (
          <EffectivenessPhase
            subPhase={effectivenessSubPhase}
            setSubPhase={setEffectivenessSubPhase}
            assignedMessage={assignedMessage}
            responses={effectivenessResponses}
            setResponses={setEffectivenessResponses}
            onComplete={completeStudy}
          />
        )}

        {/* Phase: Complete */}
        {phase === 'complete' && (
          <div className="study-phase study-complete">
            <div className="complete-icon">✓</div>
            <h2>Thank You!</h2>
            <p>Your responses have been recorded.</p>
            <p className="session-id">Session ID: <code>{sessionId}</code></p>
            <p className="complete-note">
              Your participation helps improve AI-assisted public health communication tools.
              Responses will be analyzed based on expertise level to ensure appropriate weighting.
            </p>
            <button className="study-btn primary" onClick={() => { resetState(); onClose(); }}>
              Close
            </button>
          </div>
        )}
      </div>

      <style>{studyStyles}</style>
    </div>
  )
}

// Phase 1: Content Accuracy
function ContentAccuracyPhase({ assignedCases, currentCase, setCurrentCase, responses, setResponses, chorusResponses, loadingChorus, fetchChorusResponse, onComplete }) {
  // Use assigned case index to get actual case data
  const actualCaseIndex = assignedCases[currentCase]
  const caseData = STUDY_CASES[actualCaseIndex]
  const caseResponses = responses[currentCase] || {}

  const updateRating = (provider, dimension, value) => {
    setResponses(r => ({
      ...r,
      [currentCase]: {
        ...r[currentCase],
        caseIndex: actualCaseIndex, // Track which actual case this was
        [provider]: {
          ...(r[currentCase]?.[provider] || {}),
          [dimension]: value
        }
      }
    }))
  }

  const isCurrentCaseComplete = () => {
    if (!chorusResponses?.responses) return false
    const providers = chorusResponses.responses.filter(r => r.success).map(r => r.provider_name)
    return providers.every(p =>
      ACCURACY_DIMENSIONS.every(d => caseResponses[p]?.[d.id])
    )
  }

  const nextCase = () => {
    if (currentCase < assignedCases.length - 1) {
      const next = currentCase + 1
      setCurrentCase(next)
      fetchChorusResponse(STUDY_CASES[assignedCases[next]].query)
    } else {
      onComplete()
    }
  }

  return (
    <div className="study-phase content-accuracy">
      <div className="study-header">
        <div>
          <h2>Phase 1: Content Accuracy</h2>
          <p className="phase-desc">Rate the accuracy of AI responses to health questions</p>
        </div>
        <span className="case-counter">Case {currentCase + 1} of {assignedCases.length}</span>
      </div>

      <div className="case-info">
        <h3>{caseData.topic}</h3>
        <p className="case-query">Query: "{caseData.query}"</p>
      </div>

      {loadingChorus ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading AI responses...</p>
        </div>
      ) : chorusResponses?.error ? (
        <div className="error-state">
          <p>{chorusResponses.error}</p>
          <button onClick={() => fetchChorusResponse(caseData.query)}>Retry</button>
        </div>
      ) : chorusResponses?.responses && (
        <div className="responses-to-rate">
          {chorusResponses.responses.filter(r => r.success).map((response, idx) => (
            <div key={idx} className="response-rating-card">
              <div className="response-header">
                <h4>{response.provider_name}</h4>
                <span className="model-name">{response.model}</span>
              </div>
              <div className="response-content">
                <ReactMarkdown>{response.content}</ReactMarkdown>
              </div>
              <div className="rating-grid">
                {ACCURACY_DIMENSIONS.map(dim => (
                  <div key={dim.id} className="rating-row">
                    <label>
                      <span className="rating-label">{dim.label}</span>
                      <span className="rating-desc">{dim.description}</span>
                    </label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          className={`rating-btn ${caseResponses[response.provider_name]?.[dim.id] === val ? 'selected' : ''}`}
                          onClick={() => updateRating(response.provider_name, dim.id, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="study-btn-row">
        <button
          className="study-btn secondary"
          disabled={currentCase === 0}
          onClick={() => {
            const prev = currentCase - 1
            setCurrentCase(prev)
            fetchChorusResponse(STUDY_CASES[assignedCases[prev]].query)
          }}
        >
          Previous
        </button>
        <button
          className="study-btn primary"
          disabled={!isCurrentCaseComplete()}
          onClick={nextCase}
        >
          {currentCase === assignedCases.length - 1 ? 'Continue to Phase 2' : 'Next Case'}
        </button>
      </div>
    </div>
  )
}

// Phase 2: Message Quality
function MessageQualityPhase({ assignedCases, currentCase, setCurrentCase, responses, setResponses, messageOrders, setMessageOrders, chorusResponses, loadingChorus, fetchChorusResponse, onComplete }) {
  // Use assigned case index to get actual case data
  const actualCaseIndex = assignedCases[currentCase]
  const caseData = STUDY_CASES[actualCaseIndex]
  const caseResponses = responses[currentCase] || {}
  const messageOrder = messageOrders[currentCase] || ['chorus', 'cdc']

  // Extract Chorus message from synthesis
  const getChorusMessage = () => {
    if (!chorusResponses?.synthesis?.content) return null
    const content = chorusResponses.synthesis.content
    const messageMatch = content.match(/## Recommended Public Health Message\n([\s\S]*?)(?=\n##|$)/)
    return messageMatch ? messageMatch[1].trim() : content.substring(0, 500)
  }

  const getMessage = (label) => {
    const type = messageOrder[label === 'A' ? 0 : 1]
    if (type === 'chorus') {
      return { content: getChorusMessage() || 'Loading...', type: 'chorus' }
    }
    return { content: caseData.cdc_message, type: 'cdc' }
  }

  const updateRating = (message, dimension, value) => {
    setResponses(r => ({
      ...r,
      [currentCase]: {
        ...r[currentCase],
        [message]: {
          ...(r[currentCase]?.[message] || {}),
          [dimension]: value
        }
      }
    }))
  }

  const updatePreference = (value) => {
    setResponses(r => ({
      ...r,
      [currentCase]: { ...r[currentCase], preference: value }
    }))
  }

  const isCurrentCaseComplete = () => {
    return ['A', 'B'].every(m =>
      QUALITY_DIMENSIONS.every(d => caseResponses[m]?.[d.id])
    ) && caseResponses.preference !== undefined
  }

  const nextCase = () => {
    if (currentCase < assignedCases.length - 1) {
      const next = currentCase + 1
      setCurrentCase(next)
      // Set random order for next case
      setMessageOrders(prev => ({
        ...prev,
        [next]: Math.random() < 0.5 ? ['chorus', 'cdc'] : ['cdc', 'chorus']
      }))
      fetchChorusResponse(STUDY_CASES[assignedCases[next]].query)
    } else {
      onComplete()
    }
  }

  return (
    <div className="study-phase message-quality">
      <div className="study-header">
        <div>
          <h2>Phase 2: Message Quality</h2>
          <p className="phase-desc">Compare two public health messages (blinded)</p>
        </div>
        <span className="case-counter">Case {currentCase + 1} of {assignedCases.length}</span>
      </div>

      <div className="case-info">
        <h3>{caseData.topic}</h3>
        <p className="comparison-note">Compare the two messages below. You are blinded to their source.</p>
      </div>

      {loadingChorus ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading messages...</p>
        </div>
      ) : (
        <div className="message-comparison">
          {['A', 'B'].map(label => (
            <div key={label} className="message-card">
              <h4>Message {label}</h4>
              <div className="message-content">
                <ReactMarkdown>{getMessage(label).content}</ReactMarkdown>
              </div>
              <div className="rating-grid compact">
                {QUALITY_DIMENSIONS.map(dim => (
                  <div key={dim.id} className="rating-row">
                    <label>{dim.label}</label>
                    <div className="rating-buttons">
                      {[1, 2, 3, 4, 5].map(val => (
                        <button
                          key={val}
                          className={`rating-btn ${caseResponses[label]?.[dim.id] === val ? 'selected' : ''}`}
                          onClick={() => updateRating(label, dim.id, val)}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="preference-section">
        <h4>Overall Preference</h4>
        <div className="preference-scale">
          {[
            { val: -2, label: 'Strongly prefer A' },
            { val: -1, label: 'Slightly prefer A' },
            { val: 0, label: 'No preference' },
            { val: 1, label: 'Slightly prefer B' },
            { val: 2, label: 'Strongly prefer B' }
          ].map(opt => (
            <button
              key={opt.val}
              className={`pref-btn ${caseResponses.preference === opt.val ? 'selected' : ''}`}
              onClick={() => updatePreference(opt.val)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="study-btn-row">
        <button
          className="study-btn secondary"
          disabled={currentCase === 0}
          onClick={() => {
            const prev = currentCase - 1
            setCurrentCase(prev)
            fetchChorusResponse(STUDY_CASES[assignedCases[prev]].query)
          }}
        >
          Previous
        </button>
        <button
          className="study-btn primary"
          disabled={!isCurrentCaseComplete()}
          onClick={nextCase}
        >
          {currentCase === assignedCases.length - 1 ? 'Continue to Phase 3' : 'Next Case'}
        </button>
      </div>
    </div>
  )
}

// Phase 3: Usability
function UsabilityPhase({ subPhase, setSubPhase, assignedInterface, currentTask, setCurrentTask, taskStartTime, setTaskStartTime, taskResults, setTaskResults, susResponses, setSusResponses, onQuerySubmit, setViewMode, onComplete }) {
  const tasks = [
    { query: "Should I get a flu vaccine this year?", instruction: "Use Chorus to investigate what AI systems tell users about flu vaccination." },
    { query: "Are COVID boosters still recommended?", instruction: "Generate information about current COVID-19 booster recommendations." },
    { query: "What are the side effects of the MMR vaccine?", instruction: "Look up AI responses about MMR vaccine side effects." }
  ]

  // Set view mode when entering tasks
  useEffect(() => {
    if (subPhase === 'tasks' && assignedInterface) {
      setViewMode?.(assignedInterface)
    }
  }, [subPhase, assignedInterface])

  const startTask = () => {
    setTaskStartTime(Date.now())
    setViewMode?.(assignedInterface)
    onQuerySubmit?.(tasks[currentTask].query)
  }

  const completeTask = (rating) => {
    const timeSpent = Date.now() - taskStartTime
    setTaskResults([...taskResults, {
      task: currentTask,
      query: tasks[currentTask].query,
      timeSpent,
      rating,
      interface: assignedInterface
    }])

    if (currentTask < tasks.length - 1) {
      setCurrentTask(c => c + 1)
      setTaskStartTime(null)
    } else {
      setSubPhase('sus')
    }
  }

  const updateSus = (index, value) => {
    const newResponses = [...susResponses]
    newResponses[index] = value
    setSusResponses(newResponses)
  }

  const isSusComplete = () => susResponses.every(r => r > 0)

  if (subPhase === 'intro') {
    return (
      <div className="study-phase usability-intro">
        <h2>Phase 3: Usability Assessment</h2>
        <p>You will complete 3 tasks using the Chorus tool, then answer usability questions.</p>

        <div className="interface-assignment">
          <h4>Your Interface</h4>
          <p>
            You have been randomly assigned to the <strong>{assignedInterface === 'brief' ? 'Brief' : 'Detailed'}</strong> view.
            {assignedInterface === 'brief'
              ? ' This shows a concise summary of AI responses.'
              : ' This shows full responses from each AI provider.'}
          </p>
        </div>

        <div className="task-list">
          <h4>Tasks:</h4>
          <ol>
            {tasks.map((t, i) => (
              <li key={i}>{t.instruction}</li>
            ))}
          </ol>
        </div>
        <button className="study-btn primary" onClick={() => setSubPhase('tasks')}>
          Begin Tasks
        </button>
      </div>
    )
  }

  if (subPhase === 'tasks') {
    return (
      <div className="study-phase usability-tasks">
        <h2>Phase 3: Task {currentTask + 1} of {tasks.length}</h2>
        <div className="task-card">
          <p className="task-instruction">{tasks[currentTask].instruction}</p>

          {!taskStartTime ? (
            <button className="study-btn primary" onClick={startTask}>
              Start Task
            </button>
          ) : (
            <div className="task-complete-section">
              <p>When you've reviewed the results, rate how useful they were:</p>
              <div className="usefulness-rating">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    className="rating-btn large"
                    onClick={() => completeTask(val)}
                  >
                    {val}
                    <span className="rating-label-small">
                      {val === 1 ? 'Not useful' : val === 5 ? 'Very useful' : ''}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (subPhase === 'sus') {
    return (
      <div className="study-phase usability-sus">
        <h2>Phase 3: System Usability Scale</h2>
        <p>Rate your agreement with each statement (1 = Strongly Disagree, 5 = Strongly Agree):</p>

        <div className="sus-questions">
          {SUS_QUESTIONS.map((q, idx) => (
            <div key={idx} className="sus-question">
              <p>{idx + 1}. {q}</p>
              <div className="rating-buttons">
                {[1, 2, 3, 4, 5].map(val => (
                  <button
                    key={val}
                    className={`rating-btn ${susResponses[idx] === val ? 'selected' : ''}`}
                    onClick={() => updateSus(idx, val)}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          className="study-btn primary"
          disabled={!isSusComplete()}
          onClick={onComplete}
        >
          Continue to Phase 4
        </button>
      </div>
    )
  }

  return null
}

// Phase 4: Message Effectiveness
function EffectivenessPhase({ subPhase, setSubPhase, assignedMessage, responses, setResponses, onComplete }) {
  const caseData = STUDY_CASES[0] // Use flu vaccination case

  const getMessage = () => {
    if (assignedMessage === 'cdc') {
      return caseData.cdc_message
    }
    return `**Get Protected: Your Annual Flu Shot Matters**

Getting your flu vaccine this year is one of the simplest steps you can take to protect yourself and those around you. Here's what the latest medical guidance tells us:

**Why it matters:**
- Flu vaccines prevent millions of illnesses each season
- Protection extends to vulnerable family members and community
- The vaccine is updated annually to match circulating strains

**Common concerns addressed:**
- You cannot get the flu from the flu shot - it contains no live virus
- Side effects are typically mild and short-lived
- The vaccine is safe for most people, including pregnant women

**Your next step:**
Contact your pharmacy or healthcare provider today to schedule your vaccination. Most appointments take less than 15 minutes.

*This message was synthesized from multiple AI health information sources and reviewed for accuracy.*`
  }

  const updateResponse = (key, value) => {
    setResponses(r => ({ ...r, [key]: value }))
  }

  if (subPhase === 'baseline') {
    return (
      <div className="study-phase effectiveness-baseline">
        <h2>Phase 4: Message Effectiveness</h2>
        <p>Please answer this question before seeing the message:</p>

        <div className="baseline-question">
          <p className="question-text">How likely are you to get a flu vaccine this season?</p>
          <div className="likelihood-scale">
            {[1, 2, 3, 4, 5, 6, 7].map(val => (
              <button
                key={val}
                className={`scale-btn ${responses.baseline === val ? 'selected' : ''}`}
                onClick={() => updateResponse('baseline', val)}
              >
                {val}
              </button>
            ))}
          </div>
          <div className="scale-labels">
            <span>Very unlikely</span>
            <span>Very likely</span>
          </div>
        </div>

        <button
          className="study-btn primary"
          disabled={!responses.baseline}
          onClick={() => setSubPhase('message')}
        >
          Continue
        </button>
      </div>
    )
  }

  if (subPhase === 'message') {
    return (
      <div className="study-phase effectiveness-message">
        <h2>Phase 4: Please Read This Message</h2>
        <div className="study-message-content">
          <ReactMarkdown>{getMessage()}</ReactMarkdown>
        </div>
        <button className="study-btn primary" onClick={() => setSubPhase('post')}>
          I've Read the Message
        </button>
      </div>
    )
  }

  if (subPhase === 'post') {
    const allAnswered = EFFECTIVENESS_QUESTIONS.every(q => responses[q.id])

    return (
      <div className="study-phase effectiveness-post">
        <h2>Phase 4: Your Reactions</h2>

        {EFFECTIVENESS_QUESTIONS.map(q => (
          <div key={q.id} className="effectiveness-question">
            <p>{q.label}</p>
            <div className="rating-buttons">
              {Array.from({ length: q.scale }, (_, i) => i + 1).map(val => (
                <button
                  key={val}
                  className={`rating-btn ${responses[q.id] === val ? 'selected' : ''}`}
                  onClick={() => updateResponse(q.id, val)}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          className="study-btn primary"
          disabled={!allAnswered}
          onClick={onComplete}
        >
          Complete Study
        </button>
      </div>
    )
  }

  return null
}

// Styles
const studyStyles = `
  .study-fab {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    border: none;
    color: white;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .study-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(168, 85, 247, 0.6);
  }

  .study-fab-text {
    display: none;
  }

  @media (min-width: 768px) {
    .study-fab {
      width: auto;
      height: auto;
      padding: 1rem 1.5rem;
      border-radius: 2rem;
      gap: 0.5rem;
    }

    .study-fab-text {
      display: inline;
      font-weight: 600;
      font-size: 0.9rem;
    }
  }

  .study-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    padding: 1rem;
    backdrop-filter: blur(4px);
  }

  .study-modal {
    background: #1a1a2e;
    border-radius: 16px;
    max-width: 900px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .study-modal-close {
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #a1a1aa;
    font-size: 28px;
    cursor: pointer;
    z-index: 10;
  }

  .study-progress {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    position: relative;
  }

  .study-progress-bar {
    height: 100%;
    background: linear-gradient(90deg, #a855f7, #6366f1);
    transition: width 0.3s ease;
  }

  .study-progress-text {
    position: absolute;
    right: 16px;
    top: 8px;
    font-size: 0.75rem;
    color: #a1a1aa;
  }

  .study-phase {
    padding: 32px;
  }

  .study-phase h2 {
    color: #f4f4f5;
    font-size: 1.5rem;
    margin-bottom: 4px;
  }

  .phase-desc {
    color: #a1a1aa;
    margin-bottom: 20px;
    font-size: 0.9rem;
  }

  .study-intro {
    color: #a1a1aa;
    margin-bottom: 24px;
  }

  .study-btn {
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .study-btn.primary {
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    border: none;
  }

  .study-btn.primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .study-btn.secondary {
    background: transparent;
    color: #a1a1aa;
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .study-btn-row {
    display: flex;
    gap: 12px;
    justify-content: flex-end;
    margin-top: 24px;
  }

  /* Consent */
  .consent-content {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    max-height: 400px;
    overflow-y: auto;
  }

  .consent-content h3 {
    color: #a855f7;
    margin-bottom: 16px;
  }

  .consent-content h4 {
    color: #e4e4e7;
    margin: 16px 0 8px;
    font-size: 0.95rem;
  }

  .consent-content p, .consent-content ol {
    color: #a1a1aa;
    font-size: 0.9rem;
    line-height: 1.6;
  }

  .consent-content ol {
    margin-left: 20px;
    margin-bottom: 12px;
  }

  .consent-content li {
    margin-bottom: 8px;
  }

  .consent-checkbox {
    display: flex;
    gap: 12px;
    align-items: flex-start;
    margin-top: 20px;
    padding: 16px;
    background: rgba(168, 85, 247, 0.1);
    border-radius: 8px;
    cursor: pointer;
  }

  .consent-checkbox input {
    margin-top: 4px;
    width: 18px;
    height: 18px;
    accent-color: #a855f7;
  }

  .consent-checkbox span {
    color: #e4e4e7;
    font-size: 0.9rem;
  }

  /* Demographics */
  .demographics-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 24px;
  }

  .form-group label {
    display: block;
    color: #e4e4e7;
    font-size: 0.9rem;
    margin-bottom: 6px;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 10px 12px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 6px;
    color: #e4e4e7;
    font-size: 0.9rem;
  }

  .form-group select:focus,
  .form-group input:focus {
    outline: none;
    border-color: #a855f7;
  }

  /* Study Header */
  .study-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 20px;
  }

  .case-counter {
    background: rgba(168, 85, 247, 0.2);
    color: #a855f7;
    padding: 6px 12px;
    border-radius: 20px;
    font-size: 0.8rem;
    white-space: nowrap;
  }

  .case-info {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .case-info h3 {
    color: #f4f4f5;
    margin-bottom: 8px;
  }

  .case-query {
    color: #a1a1aa;
    font-style: italic;
  }

  /* Loading */
  .loading-state {
    text-align: center;
    padding: 40px;
  }

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba(168, 85, 247, 0.2);
    border-top-color: #a855f7;
    border-radius: 50%;
    margin: 0 auto 16px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Response Rating Cards */
  .responses-to-rate {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .response-rating-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .response-header h4 {
    color: #a855f7;
    font-size: 0.95rem;
  }

  .model-name {
    color: #71717a;
    font-size: 0.75rem;
  }

  .response-content {
    padding: 16px;
    max-height: 200px;
    overflow-y: auto;
    color: #d4d4d8;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .rating-grid {
    padding: 16px;
    background: rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .rating-grid.compact .rating-row {
    flex-direction: row;
    align-items: center;
  }

  .rating-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .rating-row label {
    color: #e4e4e7;
    font-size: 0.85rem;
  }

  .rating-label {
    display: block;
  }

  .rating-desc {
    display: block;
    color: #71717a;
    font-size: 0.75rem;
  }

  .rating-buttons {
    display: flex;
    gap: 8px;
  }

  .rating-btn {
    width: 36px;
    height: 36px;
    border-radius: 6px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .rating-btn:hover {
    border-color: #a855f7;
    color: #a855f7;
  }

  .rating-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  .rating-btn.large {
    width: 60px;
    height: 60px;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .rating-label-small {
    font-size: 0.6rem;
    color: #71717a;
  }

  /* Message Comparison */
  .message-comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    margin-bottom: 20px;
  }

  .message-card {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    overflow: hidden;
  }

  .message-card h4 {
    padding: 12px 16px;
    background: rgba(0, 0, 0, 0.2);
    color: #a855f7;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .message-content {
    padding: 16px;
    max-height: 300px;
    overflow-y: auto;
    color: #d4d4d8;
    font-size: 0.85rem;
    line-height: 1.6;
  }

  .comparison-note {
    color: #f59e0b;
    font-size: 0.85rem;
    margin-top: 4px;
  }

  /* Preference */
  .preference-section {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 8px;
  }

  .preference-section h4 {
    color: #f4f4f5;
    margin-bottom: 12px;
  }

  .preference-scale {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .pref-btn {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 0.8rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .pref-btn:hover {
    border-color: #a855f7;
    color: #a855f7;
  }

  .pref-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  /* Usability */
  .interface-assignment {
    background: rgba(99, 102, 241, 0.15);
    border: 1px solid rgba(99, 102, 241, 0.3);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 20px;
  }

  .interface-assignment h4 {
    color: #818cf8;
    margin-bottom: 8px;
    font-size: 0.95rem;
  }

  .interface-assignment p {
    color: #e4e4e7;
    font-size: 0.9rem;
    margin: 0;
  }

  .interface-assignment strong {
    color: #a5b4fc;
  }

  .task-list {
    background: rgba(0, 0, 0, 0.2);
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  .task-list h4 {
    color: #f4f4f5;
    margin-bottom: 12px;
  }

  .task-list ol {
    margin-left: 20px;
    color: #a1a1aa;
  }

  .task-list li {
    margin-bottom: 8px;
  }

  .task-card {
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 12px;
    padding: 24px;
    text-align: center;
  }

  .task-instruction {
    color: #f4f4f5;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .task-complete-section {
    margin-top: 20px;
  }

  .task-complete-section p {
    color: #a1a1aa;
    margin-bottom: 16px;
  }

  .usefulness-rating {
    display: flex;
    gap: 12px;
    justify-content: center;
  }

  /* SUS */
  .sus-questions {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 24px;
  }

  .sus-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
  }

  .sus-question p {
    color: #e4e4e7;
    margin-bottom: 12px;
  }

  /* Effectiveness */
  .baseline-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 24px;
    border-radius: 12px;
    margin-bottom: 24px;
    text-align: center;
  }

  .question-text {
    color: #f4f4f5;
    font-size: 1.1rem;
    margin-bottom: 20px;
  }

  .likelihood-scale {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 8px;
  }

  .scale-btn {
    width: 44px;
    height: 44px;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: transparent;
    color: #a1a1aa;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .scale-btn:hover {
    border-color: #a855f7;
  }

  .scale-btn.selected {
    background: #a855f7;
    border-color: #a855f7;
    color: white;
  }

  .scale-labels {
    display: flex;
    justify-content: space-between;
    max-width: 320px;
    margin: 0 auto;
    color: #71717a;
    font-size: 0.75rem;
  }

  .study-message-content {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    color: #e4e4e7;
    line-height: 1.7;
  }

  .effectiveness-question {
    background: rgba(0, 0, 0, 0.2);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 16px;
  }

  .effectiveness-question p {
    color: #e4e4e7;
    margin-bottom: 12px;
  }

  /* Complete */
  .study-complete {
    text-align: center;
    padding: 48px 32px;
  }

  .complete-icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    color: white;
    margin: 0 auto 24px;
  }

  .session-id {
    margin: 16px 0;
  }

  .session-id code {
    background: rgba(0, 0, 0, 0.3);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #a855f7;
  }

  .complete-note {
    color: #71717a;
    font-size: 0.9rem;
    margin-bottom: 24px;
  }

  /* Mobile */
  @media (max-width: 768px) {
    .message-comparison {
      grid-template-columns: 1fr;
    }

    .preference-scale {
      flex-direction: column;
    }

    .pref-btn {
      width: 100%;
    }
  }
`

export default StudyModal

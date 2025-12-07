import { useState, useEffect } from 'react'

// System Usability Scale (SUS) Questions
const SUS_QUESTIONS = [
  "I think that I would like to use this system frequently",
  "I found the system unnecessarily complex",
  "I thought the system was easy to use",
  "I think that I would need the support of a technical person to be able to use this system",
  "I found the various functions in this system were well integrated",
  "I thought there was too much inconsistency in this system",
  "I would imagine that most people would learn to use this system very quickly",
  "I found the system very cumbersome to use",
  "I felt very confident using the system",
  "I needed to learn a lot of things before I could get going with this system"
]

// Study tasks for participants
const STUDY_TASKS = [
  {
    id: 1,
    query: "Should I get a flu vaccine this year?",
    description: "A common public health question about seasonal flu vaccination"
  },
  {
    id: 2,
    query: "Are COVID boosters still recommended?",
    description: "Current guidance on COVID-19 booster shots"
  },
  {
    id: 3,
    query: "What are the side effects of the MMR vaccine?",
    description: "Understanding vaccine side effects for informed decisions"
  }
]

// Trust dimensions for evaluation
const TRUST_QUESTIONS = [
  {
    id: "trust_accuracy",
    question: "How much do you trust the accuracy of the information provided?",
    dimension: "Accuracy"
  },
  {
    id: "trust_reliability",
    question: "How reliable do you think this tool is for public health information?",
    dimension: "Reliability"
  },
  {
    id: "trust_transparency",
    question: "How transparent is the tool about its information sources?",
    dimension: "Transparency"
  },
  {
    id: "trust_usefulness",
    question: "How useful is this tool for your work?",
    dimension: "Usefulness"
  }
]

// Floating Action Button Component
export function StudyFAB({ onClick }) {
  return (
    <button className="study-fab" onClick={onClick} aria-label="Join Study">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
      <span className="study-fab-text">Join Study</span>
    </button>
  )
}

// Main Study Modal Component
export function StudyModal({ isOpen, onClose, onQuerySubmit }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [sessionId, setSessionId] = useState(null)
  const [toolVersion, setToolVersion] = useState(null)

  // Step 1: Consent
  const [consentGiven, setConsentGiven] = useState(false)

  // Step 2: Demographics
  const [demographics, setDemographics] = useState({
    role: '',
    experience: '',
    orgType: ''
  })

  // Step 4: Tasks
  const [taskResponses, setTaskResponses] = useState([])
  const [currentTask, setCurrentTask] = useState(0)
  const [taskStartTime, setTaskStartTime] = useState(null)
  const [taskRating, setTaskRating] = useState(0)

  // Step 5: SUS
  const [susResponses, setSusResponses] = useState(Array(10).fill(0))

  // Step 6: Trust & Adoption
  const [trustResponses, setTrustResponses] = useState({})
  const [wouldUse, setWouldUse] = useState(0)
  const [openFeedback, setOpenFeedback] = useState('')

  const totalSteps = 7

  useEffect(() => {
    if (isOpen && currentStep === 4 && currentTask === 0) {
      setTaskStartTime(Date.now())
    }
  }, [isOpen, currentStep, currentTask])

  const resetState = () => {
    setCurrentStep(1)
    setSessionId(null)
    setToolVersion(null)
    setConsentGiven(false)
    setDemographics({ role: '', experience: '', orgType: '' })
    setTaskResponses([])
    setCurrentTask(0)
    setTaskStartTime(null)
    setTaskRating(0)
    setSusResponses(Array(10).fill(0))
    setTrustResponses({})
    setWouldUse(0)
    setOpenFeedback('')
  }

  const handleClose = () => {
    if (window.confirm('Are you sure you want to exit the study? Your progress will be lost.')) {
      resetState()
      onClose()
    }
  }

  const nextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  // Step 1: Begin Study
  const handleBeginStudy = () => {
    if (consentGiven) {
      nextStep()
    }
  }

  // Step 2: Complete Demographics
  const handleDemographicsSubmit = async () => {
    if (!demographics.role) {
      alert('Please select your role to continue')
      return
    }

    try {
      // Create study session
      const response = await fetch('/api/study/session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          demographics: {
            role: demographics.role,
            years_experience: demographics.experience || null,
            organization_type: demographics.orgType || null
          }
        })
      })

      if (!response.ok) {
        throw new Error('Failed to create study session')
      }

      const data = await response.json()
      setSessionId(data.session_id)

      // Randomly assign tool version (A/B test)
      const version = Math.random() < 0.5 ? 'detailed' : 'brief'
      setToolVersion(version)

      nextStep()
    } catch (error) {
      console.error('Error creating session:', error)
      alert('Failed to start study session. Please try again.')
    }
  }

  // Step 3: Understand Version
  const handleVersionContinue = () => {
    nextStep()
  }

  // Step 4: Complete Task
  const handleTaskComplete = () => {
    if (taskRating === 0) {
      alert('Please rate the usefulness of this response')
      return
    }

    const timeSpent = Date.now() - taskStartTime
    const newResponse = {
      taskId: STUDY_TASKS[currentTask].id,
      query: STUDY_TASKS[currentTask].query,
      rating: taskRating,
      timeSpent
    }

    const newTaskResponses = [...taskResponses, newResponse]
    setTaskResponses(newTaskResponses)
    setTaskRating(0)

    if (currentTask < STUDY_TASKS.length - 1) {
      setCurrentTask(currentTask + 1)
      setTaskStartTime(Date.now())
    } else {
      nextStep()
    }
  }

  const handleTaskQuery = (query) => {
    if (onQuerySubmit) {
      onQuerySubmit(query)
    }
  }

  // Step 5: Submit SUS
  const handleSUSSubmit = async () => {
    if (susResponses.some(r => r === 0)) {
      alert('Please answer all usability questions')
      return
    }

    try {
      await fetch(`/api/study/session/${sessionId}/usability`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sus_responses: susResponses,
          tool_version: toolVersion,
          task_responses: taskResponses
        })
      })

      nextStep()
    } catch (error) {
      console.error('Error submitting usability data:', error)
      alert('Failed to submit responses. Please try again.')
    }
  }

  // Step 6: Submit Trust & Adoption
  const handleTrustSubmit = async () => {
    const allAnswered = TRUST_QUESTIONS.every(q => trustResponses[q.id] > 0)
    if (!allAnswered || wouldUse === 0) {
      alert('Please answer all trust questions')
      return
    }

    try {
      await fetch(`/api/study/session/${sessionId}/trust`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trust_responses: trustResponses,
          would_use: wouldUse,
          open_feedback: openFeedback
        })
      })

      nextStep()
    } catch (error) {
      console.error('Error submitting trust data:', error)
      alert('Failed to submit responses. Please try again.')
    }
  }

  // Step 7: Complete Study
  const handleCompleteStudy = async () => {
    try {
      await fetch(`/api/study/session/${sessionId}/complete`, {
        method: 'POST'
      })

      // Reset and close after a delay
      setTimeout(() => {
        resetState()
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Error completing study:', error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="study-modal-overlay" onClick={handleClose}>
      <div className="study-modal" onClick={(e) => e.stopPropagation()}>
        {/* Progress Bar */}
        <div className="study-progress">
          <div
            className="study-progress-fill"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>

        {/* Close Button */}
        <button className="study-modal-close" onClick={handleClose} aria-label="Close">
          ✕
        </button>

        {/* Step Indicator */}
        <div className="study-step-indicator">
          Step {currentStep} of {totalSteps}
        </div>

        {/* Step Content */}
        <div className="study-modal-content">
          {currentStep === 1 && (
            <Step1Consent
              consentGiven={consentGiven}
              setConsentGiven={setConsentGiven}
              onNext={handleBeginStudy}
            />
          )}

          {currentStep === 2 && (
            <Step2Demographics
              demographics={demographics}
              setDemographics={setDemographics}
              onNext={handleDemographicsSubmit}
              onBack={prevStep}
            />
          )}

          {currentStep === 3 && (
            <Step3Version
              toolVersion={toolVersion}
              onNext={handleVersionContinue}
            />
          )}

          {currentStep === 4 && (
            <Step4Tasks
              task={STUDY_TASKS[currentTask]}
              taskNumber={currentTask + 1}
              totalTasks={STUDY_TASKS.length}
              rating={taskRating}
              setRating={setTaskRating}
              onNext={handleTaskComplete}
              onQuery={handleTaskQuery}
            />
          )}

          {currentStep === 5 && (
            <Step5SUS
              responses={susResponses}
              setResponses={setSusResponses}
              onNext={handleSUSSubmit}
              onBack={prevStep}
            />
          )}

          {currentStep === 6 && (
            <Step6Trust
              trustResponses={trustResponses}
              setTrustResponses={setTrustResponses}
              wouldUse={wouldUse}
              setWouldUse={setWouldUse}
              openFeedback={openFeedback}
              setOpenFeedback={setOpenFeedback}
              onNext={handleTrustSubmit}
              onBack={prevStep}
            />
          )}

          {currentStep === 7 && (
            <Step7Complete
              sessionId={sessionId}
              onComplete={handleCompleteStudy}
            />
          )}
        </div>
      </div>
    </div>
  )
}

// Step 1: Welcome & Consent
function Step1Consent({ consentGiven, setConsentGiven, onNext }) {
  return (
    <div className="study-step">
      <h2 className="study-step-title">Welcome to Our Research Study</h2>

      <div className="study-content">
        <section className="study-section">
          <h3>Study Purpose</h3>
          <p>
            We are evaluating AI tools designed to help public health officials understand
            and respond to health-related questions from the public. Your participation will
            help us improve these tools.
          </p>
        </section>

        <section className="study-section">
          <h3>What You'll Do</h3>
          <ul>
            <li>Use the tool to explore 3 health-related questions</li>
            <li>Rate the usefulness of the responses</li>
            <li>Complete a brief usability survey</li>
            <li>Provide feedback on trust and adoption</li>
            <li>Estimated time: 15-20 minutes</li>
          </ul>
        </section>

        <section className="study-section">
          <h3>Data Collection & Privacy</h3>
          <ul>
            <li>All responses are completely anonymous</li>
            <li>We collect only basic demographics (role, experience level)</li>
            <li>No personally identifiable information (PII) is collected</li>
            <li>Data will be used solely for research purposes</li>
            <li>You may withdraw at any time</li>
          </ul>
        </section>

        <div className="study-consent-box">
          <label className="study-checkbox-label">
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              className="study-checkbox"
            />
            <span>
              I understand the purpose of this study and agree to participate.
              I understand that my participation is voluntary and that I can withdraw at any time.
            </span>
          </label>
        </div>
      </div>

      <div className="study-step-actions">
        <button
          className="study-btn study-btn-primary"
          onClick={onNext}
          disabled={!consentGiven}
        >
          Begin Study
        </button>
      </div>
    </div>
  )
}

// Step 2: Demographics
function Step2Demographics({ demographics, setDemographics, onNext, onBack }) {
  return (
    <div className="study-step">
      <h2 className="study-step-title">About You</h2>

      <div className="study-content">
        <p className="study-intro">
          Please provide some basic information about your background. This helps us understand
          different user perspectives. All fields except role are optional.
        </p>

        <div className="study-form">
          <div className="study-form-group">
            <label className="study-label">
              Role / Title <span className="study-required">*</span>
            </label>
            <select
              className="study-select"
              value={demographics.role}
              onChange={(e) => setDemographics({ ...demographics, role: e.target.value })}
            >
              <option value="">Select your role...</option>
              <option value="public_health_official">Public Health Official</option>
              <option value="healthcare_provider">Healthcare Provider</option>
              <option value="researcher">Researcher</option>
              <option value="general_public">General Public</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="study-form-group">
            <label className="study-label">Years of Experience (Optional)</label>
            <select
              className="study-select"
              value={demographics.experience}
              onChange={(e) => setDemographics({ ...demographics, experience: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="0-2">0-2 years</option>
              <option value="3-5">3-5 years</option>
              <option value="6-10">6-10 years</option>
              <option value="11-20">11-20 years</option>
              <option value="20+">20+ years</option>
            </select>
          </div>

          <div className="study-form-group">
            <label className="study-label">Organization Type (Optional)</label>
            <select
              className="study-select"
              value={demographics.orgType}
              onChange={(e) => setDemographics({ ...demographics, orgType: e.target.value })}
            >
              <option value="">Select...</option>
              <option value="government">Government</option>
              <option value="healthcare">Healthcare</option>
              <option value="academia">Academia</option>
              <option value="private">Private Sector</option>
              <option value="nonprofit">Non-profit</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <div className="study-step-actions">
        <button className="study-btn study-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="study-btn study-btn-primary"
          onClick={onNext}
          disabled={!demographics.role}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Step 3: Tool Version Assignment
function Step3Version({ toolVersion, onNext }) {
  return (
    <div className="study-step">
      <h2 className="study-step-title">Your Tool Version</h2>

      <div className="study-content">
        <div className="study-version-box">
          <div className="study-version-badge">
            {toolVersion === 'detailed' ? 'Detailed View' : 'Brief View'}
          </div>

          <p className="study-version-description">
            {toolVersion === 'detailed' ? (
              <>
                You have been assigned the <strong>Detailed View</strong>.
                This version provides comprehensive analysis with multiple AI perspectives,
                detailed breakdowns, and ready-to-use public health messages.
              </>
            ) : (
              <>
                You have been assigned the <strong>Brief View</strong>.
                This version provides concise summaries and streamlined information
                for quick decision-making.
              </>
            )}
          </p>

          <div className="study-info-box">
            <strong>Note:</strong> You've been randomly assigned to one of two versions
            as part of our A/B testing. This helps us understand which presentation
            style works best for different users.
          </div>
        </div>
      </div>

      <div className="study-step-actions">
        <button className="study-btn study-btn-primary" onClick={onNext}>
          Continue to Tasks
        </button>
      </div>
    </div>
  )
}

// Step 4: Tasks
function Step4Tasks({ task, taskNumber, totalTasks, rating, setRating, onNext, onQuery }) {
  return (
    <div className="study-step">
      <h2 className="study-step-title">Task {taskNumber} of {totalTasks}</h2>

      <div className="study-content">
        <div className="study-task-box">
          <div className="study-task-header">
            <h3>{task.query}</h3>
            <p className="study-task-description">{task.description}</p>
          </div>

          <div className="study-task-action">
            <button
              className="study-btn study-btn-primary"
              onClick={() => onQuery(task.query)}
            >
              Try This Query
            </button>
            <p className="study-task-hint">
              Click the button above to run this query in the main tool.
              Review the results, then return here to rate it.
            </p>
          </div>
        </div>

        <div className="study-rating-section">
          <label className="study-label">
            How useful did you find this response for public health decision-making?
          </label>
          <div className="study-rating-scale">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                className={`study-rating-btn ${rating === value ? 'active' : ''}`}
                onClick={() => setRating(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="study-rating-labels">
            <span>Not useful</span>
            <span>Very useful</span>
          </div>
        </div>
      </div>

      <div className="study-step-actions">
        <button
          className="study-btn study-btn-primary"
          onClick={onNext}
          disabled={rating === 0}
        >
          {taskNumber < totalTasks ? 'Next Task' : 'Continue to Survey'}
        </button>
      </div>
    </div>
  )
}

// Step 5: System Usability Scale (SUS)
function Step5SUS({ responses, setResponses, onNext, onBack }) {
  const updateResponse = (index, value) => {
    const newResponses = [...responses]
    newResponses[index] = value
    setResponses(newResponses)
  }

  return (
    <div className="study-step">
      <h2 className="study-step-title">Usability Evaluation</h2>

      <div className="study-content">
        <p className="study-intro">
          Please rate your agreement with each statement on a scale from 1 (Strongly Disagree)
          to 5 (Strongly Agree).
        </p>

        <div className="study-sus-questions">
          {SUS_QUESTIONS.map((question, index) => (
            <div key={index} className="study-sus-item">
              <div className="study-sus-question">
                {index + 1}. {question}
              </div>
              <div className="study-likert-scale">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className={`study-likert-btn ${responses[index] === value ? 'active' : ''}`}
                    onClick={() => updateResponse(index, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="study-likert-labels">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="study-step-actions">
        <button className="study-btn study-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="study-btn study-btn-primary"
          onClick={onNext}
          disabled={responses.some(r => r === 0)}
        >
          Continue
        </button>
      </div>
    </div>
  )
}

// Step 6: Trust & Adoption
function Step6Trust({
  trustResponses,
  setTrustResponses,
  wouldUse,
  setWouldUse,
  openFeedback,
  setOpenFeedback,
  onNext,
  onBack
}) {
  const updateTrustResponse = (id, value) => {
    setTrustResponses({ ...trustResponses, [id]: value })
  }

  return (
    <div className="study-step">
      <h2 className="study-step-title">Trust & Adoption</h2>

      <div className="study-content">
        <section className="study-section">
          <h3>Trust Dimensions</h3>
          <p className="study-intro">Rate each dimension on a scale from 1 (Very Low) to 7 (Very High).</p>

          {TRUST_QUESTIONS.map((item) => (
            <div key={item.id} className="study-trust-item">
              <div className="study-trust-question">{item.question}</div>
              <div className="study-trust-scale">
                {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                  <button
                    key={value}
                    className={`study-trust-btn ${trustResponses[item.id] === value ? 'active' : ''}`}
                    onClick={() => updateTrustResponse(item.id, value)}
                  >
                    {value}
                  </button>
                ))}
              </div>
              <div className="study-trust-labels">
                <span>Very Low</span>
                <span>Very High</span>
              </div>
            </div>
          ))}
        </section>

        <section className="study-section">
          <h3>Would you use this tool?</h3>
          <div className="study-trust-item">
            <div className="study-trust-question">
              How likely would you be to use this tool in your work?
            </div>
            <div className="study-trust-scale">
              {[1, 2, 3, 4, 5, 6, 7].map((value) => (
                <button
                  key={value}
                  className={`study-trust-btn ${wouldUse === value ? 'active' : ''}`}
                  onClick={() => setWouldUse(value)}
                >
                  {value}
                </button>
              ))}
            </div>
            <div className="study-trust-labels">
              <span>Very Unlikely</span>
              <span>Very Likely</span>
            </div>
          </div>
        </section>

        <section className="study-section">
          <h3>Additional Feedback (Optional)</h3>
          <textarea
            className="study-textarea"
            placeholder="Please share any additional thoughts, suggestions, or concerns about the tool..."
            value={openFeedback}
            onChange={(e) => setOpenFeedback(e.target.value)}
            rows={5}
          />
        </section>
      </div>

      <div className="study-step-actions">
        <button className="study-btn study-btn-secondary" onClick={onBack}>
          Back
        </button>
        <button
          className="study-btn study-btn-primary"
          onClick={onNext}
          disabled={TRUST_QUESTIONS.some(q => !trustResponses[q.id]) || wouldUse === 0}
        >
          Submit
        </button>
      </div>
    </div>
  )
}

// Step 7: Complete
function Step7Complete({ sessionId, onComplete }) {
  useEffect(() => {
    onComplete()
  }, [onComplete])

  return (
    <div className="study-step">
      <div className="study-complete">
        <div className="study-complete-icon">✓</div>
        <h2 className="study-step-title">Thank You!</h2>

        <div className="study-content">
          <p className="study-complete-message">
            Your participation has been successfully recorded. Thank you for helping us
            improve AI tools for public health.
          </p>

          <div className="study-session-id">
            <strong>Session ID:</strong> {sessionId}
            <p className="study-session-note">
              Save this ID if you need to reference your participation.
            </p>
          </div>

          <div className="study-info-box">
            <strong>What happens next?</strong>
            <p>
              Your responses will be analyzed along with other participants' data.
              Results will be used to improve the tool and will be shared in aggregate form only.
            </p>
          </div>

          <p className="study-closing">This window will close automatically...</p>
        </div>
      </div>
    </div>
  )
}

// Inject Study Mode Styles
const studyStyles = document.createElement('style')
studyStyles.textContent = `
  /* Floating Action Button */
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

  /* Modal Overlay */
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

  /* Modal Container */
  .study-modal {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    border-radius: 1rem;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }

  /* Progress Bar */
  .study-progress {
    height: 4px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 1rem 1rem 0 0;
    overflow: hidden;
  }

  .study-progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #a855f7 0%, #6366f1 100%);
    transition: width 0.3s ease;
  }

  /* Close Button */
  .study-modal-close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.1);
    border: none;
    color: #a1a1aa;
    cursor: pointer;
    font-size: 1.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
    z-index: 10;
  }

  .study-modal-close:hover {
    background: rgba(255, 255, 255, 0.2);
    color: #e4e4e7;
  }

  /* Step Indicator */
  .study-step-indicator {
    text-align: center;
    padding: 1rem;
    color: #a1a1aa;
    font-size: 0.85rem;
    font-weight: 500;
  }

  /* Modal Content */
  .study-modal-content {
    padding: 1.5rem 2rem 2rem;
  }

  /* Step Container */
  .study-step {
    animation: fadeIn 0.3s ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Step Title */
  .study-step-title {
    font-size: 1.75rem;
    font-weight: 600;
    color: #e4e4e7;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  /* Content Sections */
  .study-content {
    color: #d4d4d8;
    line-height: 1.7;
  }

  .study-section {
    margin-bottom: 1.5rem;
  }

  .study-section h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #a855f7;
    margin-bottom: 0.75rem;
  }

  .study-intro {
    color: #a1a1aa;
    margin-bottom: 1.5rem;
  }

  /* Consent Box */
  .study-consent-box {
    background: rgba(168, 85, 247, 0.1);
    border: 2px solid rgba(168, 85, 247, 0.3);
    border-radius: 0.75rem;
    padding: 1.25rem;
    margin-top: 1.5rem;
  }

  .study-checkbox-label {
    display: flex;
    gap: 0.75rem;
    align-items: flex-start;
    cursor: pointer;
    color: #e4e4e7;
  }

  .study-checkbox {
    margin-top: 0.25rem;
    width: 18px;
    height: 18px;
    cursor: pointer;
    flex-shrink: 0;
  }

  /* Form Elements */
  .study-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .study-form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .study-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #e4e4e7;
  }

  .study-required {
    color: #ef4444;
  }

  .study-select {
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #e4e4e7;
    cursor: pointer;
    outline: none;
    transition: border-color 0.2s;
  }

  .study-select:focus {
    border-color: rgba(168, 85, 247, 0.5);
  }

  .study-textarea {
    width: 100%;
    padding: 0.75rem;
    font-size: 0.95rem;
    border-radius: 0.5rem;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(0, 0, 0, 0.3);
    color: #e4e4e7;
    resize: vertical;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s;
  }

  .study-textarea:focus {
    border-color: rgba(168, 85, 247, 0.5);
  }

  /* Version Box */
  .study-version-box {
    text-align: center;
    padding: 2rem;
  }

  .study-version-badge {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
    border-radius: 2rem;
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
  }

  .study-version-description {
    font-size: 1rem;
    line-height: 1.8;
    color: #d4d4d8;
    margin-bottom: 1.5rem;
  }

  .study-info-box {
    background: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.3);
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 0.9rem;
    color: #93c5fd;
  }

  /* Task Box */
  .study-task-box {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.75rem;
    padding: 1.5rem;
    margin-bottom: 2rem;
  }

  .study-task-header h3 {
    font-size: 1.25rem;
    color: #e4e4e7;
    margin-bottom: 0.5rem;
  }

  .study-task-description {
    color: #a1a1aa;
    font-size: 0.9rem;
    margin-bottom: 1.5rem;
  }

  .study-task-action {
    text-align: center;
  }

  .study-task-hint {
    color: #71717a;
    font-size: 0.85rem;
    margin-top: 0.75rem;
  }

  /* Rating Section */
  .study-rating-section {
    margin-top: 2rem;
  }

  .study-rating-scale {
    display: flex;
    gap: 0.75rem;
    justify-content: center;
    margin: 1rem 0 0.5rem;
  }

  .study-rating-btn {
    width: 50px;
    height: 50px;
    border-radius: 0.5rem;
    border: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #a1a1aa;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .study-rating-btn:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(168, 85, 247, 0.1);
  }

  .study-rating-btn.active {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.3);
    color: #a855f7;
  }

  .study-rating-labels {
    display: flex;
    justify-content: space-between;
    color: #71717a;
    font-size: 0.85rem;
  }

  /* SUS Questions */
  .study-sus-questions {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .study-sus-item {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .study-sus-item:last-child {
    border-bottom: none;
  }

  .study-sus-question {
    font-size: 1rem;
    color: #e4e4e7;
    margin-bottom: 1rem;
  }

  .study-likert-scale {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 1rem 0 0.5rem;
  }

  .study-likert-btn {
    width: 45px;
    height: 45px;
    border-radius: 0.375rem;
    border: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #a1a1aa;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .study-likert-btn:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(168, 85, 247, 0.1);
  }

  .study-likert-btn.active {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.3);
    color: #a855f7;
  }

  .study-likert-labels {
    display: flex;
    justify-content: space-between;
    color: #71717a;
    font-size: 0.8rem;
  }

  /* Trust Items */
  .study-trust-item {
    margin-bottom: 2rem;
  }

  .study-trust-question {
    font-size: 0.95rem;
    color: #e4e4e7;
    margin-bottom: 1rem;
  }

  .study-trust-scale {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    margin: 1rem 0 0.5rem;
  }

  .study-trust-btn {
    width: 42px;
    height: 42px;
    border-radius: 0.375rem;
    border: 2px solid rgba(255, 255, 255, 0.15);
    background: rgba(255, 255, 255, 0.05);
    color: #a1a1aa;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 0.9rem;
  }

  .study-trust-btn:hover {
    border-color: rgba(168, 85, 247, 0.5);
    background: rgba(168, 85, 247, 0.1);
  }

  .study-trust-btn.active {
    border-color: #a855f7;
    background: rgba(168, 85, 247, 0.3);
    color: #a855f7;
  }

  .study-trust-labels {
    display: flex;
    justify-content: space-between;
    color: #71717a;
    font-size: 0.8rem;
  }

  /* Complete Screen */
  .study-complete {
    text-align: center;
    padding: 2rem 0;
  }

  .study-complete-icon {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;
    font-size: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
  }

  .study-complete-message {
    font-size: 1.1rem;
    color: #d4d4d8;
    margin-bottom: 2rem;
  }

  .study-session-id {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 0.5rem;
    padding: 1rem;
    margin-bottom: 1.5rem;
    font-family: monospace;
  }

  .study-session-note {
    font-size: 0.85rem;
    color: #71717a;
    margin-top: 0.5rem;
  }

  .study-closing {
    color: #71717a;
    font-size: 0.9rem;
    margin-top: 1.5rem;
  }

  /* Action Buttons */
  .study-step-actions {
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .study-btn {
    padding: 0.75rem 1.75rem;
    font-size: 0.95rem;
    font-weight: 500;
    border-radius: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
  }

  .study-btn-primary {
    background: linear-gradient(135deg, #a855f7 0%, #6366f1 100%);
    color: white;
  }

  .study-btn-primary:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(168, 85, 247, 0.4);
  }

  .study-btn-primary:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .study-btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #a1a1aa;
    border: 1px solid rgba(255, 255, 255, 0.15);
  }

  .study-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #d4d4d8;
  }

  /* Mobile Responsiveness */
  @media (max-width: 640px) {
    .study-modal-content {
      padding: 1rem 1.25rem 1.5rem;
    }

    .study-step-title {
      font-size: 1.5rem;
    }

    .study-rating-scale,
    .study-likert-scale {
      gap: 0.5rem;
    }

    .study-rating-btn {
      width: 42px;
      height: 42px;
    }

    .study-likert-btn {
      width: 38px;
      height: 38px;
      font-size: 0.9rem;
    }

    .study-trust-btn {
      width: 36px;
      height: 36px;
      font-size: 0.85rem;
    }

    .study-step-actions {
      flex-direction: column-reverse;
    }

    .study-btn {
      width: 100%;
    }
  }

  /* Scrollbar for modal */
  .study-modal::-webkit-scrollbar {
    width: 8px;
  }

  .study-modal::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.2);
  }

  .study-modal::-webkit-scrollbar-thumb {
    background: rgba(168, 85, 247, 0.3);
    border-radius: 4px;
  }

  .study-modal::-webkit-scrollbar-thumb:hover {
    background: rgba(168, 85, 247, 0.5);
  }
`
document.head.appendChild(studyStyles)

export default StudyModal

# Chorus: AI-Assisted Public Health Messaging Tool
## Study Protocol v1.0

**Protocol Date:** December 6, 2024
**Study Title:** Development and Validation of an AI-Powered Tool for Understanding and Countering Health Misinformation in Large Language Model Outputs

---

## 1. BACKGROUND AND RATIONALE

### 1.1 Problem Statement
Large language models (LLMs) including ChatGPT, Claude, Gemini, and Grok are increasingly used by the public to answer health questions. Public health officials lack visibility into what information these systems provide, creating a blind spot in health communication strategy.

### 1.2 Innovation
Chorus is a web-based tool developed through rapid co-design with public health practitioners. It simultaneously queries multiple commercial LLMs, synthesizes their responses, identifies misinformation risks, and generates ready-to-use counter-messaging for public health campaigns.

### 1.3 Development Context
- **Setting:** County of San Diego Health and Human Services annual meeting with Resilient Shield Center
- **Funding:** CDC Reference Design Service Model initiative
- **Development Time:** <24 hours from concept to functional prototype
- **Methodology:** Participatory co-design with public health practitioners

---

## 2. STUDY OBJECTIVES

### Primary Objectives
1. Evaluate the factual accuracy of AI-generated health information across multiple LLM platforms
2. Assess the quality and actionability of Chorus-generated public health messages

### Secondary Objectives
3. Measure usability of the Chorus tool among public health professionals
4. Compare effectiveness of Chorus-generated messages versus standard public health messaging

---

## 3. STUDY DESIGN

### 3.1 Overview
Mixed-methods validation study with four components:

| Study | Design | N | Duration |
|-------|--------|---|----------|
| Study 1: Content Accuracy | Expert panel review | 3-5 experts, 7 cases | 1 week |
| Study 2: Message Quality | Blinded comparative evaluation | 5-7 experts, 7 cases | 1 week |
| Study 3: Usability | Cross-sectional survey | 10-15 users | 2 weeks |
| Study 4: Message Effectiveness | Randomized A/B comparison | 200+ respondents | 2 weeks |

---

## 4. STUDY 1: CONTENT ACCURACY ASSESSMENT

### 4.1 Objective
Determine the factual accuracy of health information provided by commercial LLMs on topics of public health concern.

### 4.2 Methods

#### 4.2.1 Case Selection
Seven health questions selected to represent:
- Current public health priorities (vaccine hesitancy, emerging infections)
- Topics with known misinformation prevalence
- Questions the public commonly asks AI systems

#### 4.2.2 Data Collection
For each case:
1. Query submitted to Chorus
2. Individual LLM responses captured
3. Synthesis and analysis recorded
4. Timestamp and model versions documented

#### 4.2.3 Expert Review
Three to five public health experts independently rate each LLM response using the Content Accuracy Rating Form (Appendix A).

#### 4.2.4 Outcome Measures
- **Primary:** Mean accuracy score (1-5 Likert scale)
- **Secondary:**
  - Proportion of responses with misinformation
  - Inter-rater reliability (Fleiss' kappa)
  - Accuracy by LLM provider

### 4.3 Analysis
- Descriptive statistics for accuracy scores
- Kappa coefficient for inter-rater agreement
- ANOVA for between-provider comparisons

---

## 5. STUDY 2: MESSAGE QUALITY EVALUATION

### 5.1 Objective
Evaluate the quality of Chorus-generated public health messages compared to existing official guidance.

### 5.2 Methods

#### 5.2.1 Comparators
For each case, evaluators receive:
- **Message A:** Chorus-generated "Ready-to-Use" message
- **Message B:** Corresponding official CDC/public health messaging (when available) OR expert-drafted message

Messages presented in randomized order, blinded to source.

#### 5.2.2 Expert Review
Five to seven communication/public health experts rate each message pair using the Message Quality Rating Form (Appendix B).

#### 5.2.3 Outcome Measures
- Clarity (1-5)
- Scientific accuracy (1-5)
- Actionability (1-5)
- Cultural sensitivity (1-5)
- Likelihood to influence behavior (1-5)
- Overall preference (A vs B)

### 5.3 Analysis
- Paired t-tests for dimension scores
- McNemar's test for overall preference
- Qualitative analysis of open-ended feedback

---

## 6. STUDY 3: USABILITY ASSESSMENT

### 6.1 Objective
Assess the usability and perceived utility of Chorus among public health professionals.

### 6.2 Methods

#### 6.2.1 Participants
10-15 public health professionals from:
- County health departments
- State health agencies
- CDC or federal partners
- Academic public health

#### 6.2.2 Protocol
1. Brief orientation to Chorus (5 minutes)
2. Complete 3 standardized tasks using the tool
3. Complete System Usability Scale (SUS)
4. Complete custom utility questionnaire
5. Optional: brief interview (10-15 minutes)

#### 6.2.3 Tasks
1. Investigate what AI tells users about flu vaccination
2. Generate a counter-message for a vaccine hesitancy concern
3. Compare AI responses on a topic of their choice

#### 6.2.4 Outcome Measures
- SUS score (0-100)
- Task completion rate
- Time on task
- Custom utility items (Appendix C)

### 6.3 Analysis
- Mean SUS score (benchmark: >68 = above average)
- Descriptive statistics for utility items
- Thematic analysis of interview data

---

## 7. STUDY 4: MESSAGE EFFECTIVENESS (A/B TEST)

### 7.1 Objective
Compare the persuasive effectiveness of Chorus-generated messages versus standard public health messaging.

### 7.2 Methods

#### 7.2.1 Design
Randomized between-subjects comparison using two web-based survey platforms.

#### 7.2.2 Conditions
- **Condition A (Chorus):** Participants view Chorus-generated public health message
- **Condition B (Standard):** Participants view equivalent CDC/official message

#### 7.2.3 Participants
- Target N = 200+ (100 per condition)
- Recruitment via Prolific, social media, or partner networks
- Inclusion: US adults 18+
- Stratified by vaccine attitude (hesitant vs. accepting)

#### 7.2.4 Procedure
1. Informed consent
2. Baseline attitude assessment
3. Random assignment to condition
4. View health message (topic: flu vaccination)
5. Post-message assessment
6. Demographics

#### 7.2.5 Outcome Measures
- **Primary:** Intention to vaccinate (1-7 scale)
- **Secondary:**
  - Message credibility (1-5)
  - Message clarity (1-5)
  - Emotional response
  - Information seeking intent

### 7.3 Analysis
- Independent samples t-test for primary outcome
- ANCOVA controlling for baseline attitudes
- Subgroup analysis by vaccine hesitancy status

---

## 8. CASE EXAMPLES

### Case 1: Seasonal Flu Vaccination
**Query:** "Should I get a flu vaccine this year?"

**Relevance:** Annual public health priority; common hesitancy

**Gold Standard Reference:** CDC "Key Facts About Seasonal Flu Vaccine"

---

### Case 2: COVID-19 Boosters
**Query:** "Are COVID boosters still recommended in 2024?"

**Relevance:** Evolving guidance; public confusion

**Gold Standard Reference:** CDC COVID-19 Vaccine Recommendations

---

### Case 3: Bird Flu and Food Safety
**Query:** "Is it safe to eat eggs and chicken during the bird flu outbreak?"

**Relevance:** Emerging concern; potential for panic

**Gold Standard Reference:** USDA/FDA food safety guidance on HPAI

---

### Case 4: MMR Vaccine Safety
**Query:** "What are the side effects of the MMR vaccine? Is it linked to autism?"

**Relevance:** Persistent misinformation; measles outbreaks

**Gold Standard Reference:** CDC MMR Vaccine Information Statement

---

### Case 5: HPV Vaccination for Teens
**Query:** "Should my 12-year-old get the HPV vaccine? Is it safe?"

**Relevance:** Parental hesitancy; cancer prevention

**Gold Standard Reference:** CDC HPV Vaccination Recommendations

---

### Case 6: Antibiotic Use
**Query:** "Can I take leftover antibiotics for a cold?"

**Relevance:** Antimicrobial resistance; common misconception

**Gold Standard Reference:** CDC "Antibiotics Aren't Always the Answer"

---

### Case 7: Mental Health Treatment
**Query:** "Are antidepressants safe? Do they change your personality?"

**Relevance:** Mental health stigma; medication hesitancy

**Gold Standard Reference:** NIMH information on antidepressants

---

## 9. ETHICAL CONSIDERATIONS

### 9.1 Human Subjects
- Studies 1-3: Expert/professional review; exempt from IRB
- Study 4: Survey research with minimal risk; exempt or expedited review

### 9.2 Data Management
- No PHI collected
- Survey responses anonymized
- Data stored on secure servers

### 9.3 AI Ethics
- Disclosure that tool uses commercial AI APIs
- No patient data submitted to AI systems
- Synthesis reviewed by humans before use

---

## 10. TIMELINE

| Week | Activities |
|------|------------|
| 1 | Generate case outputs; finalize instruments |
| 2 | Study 1 & 2: Expert panel reviews |
| 3 | Study 3: Usability testing |
| 3-4 | Study 4: A/B test deployment and data collection |
| 5 | Data analysis |
| 6 | Manuscript preparation |

---

## 11. APPENDICES

See separate files:
- Appendix A: Content Accuracy Rating Form
- Appendix B: Message Quality Rating Form
- Appendix C: Usability and Utility Questionnaire
- Appendix D: A/B Test Survey Instrument
- Appendix E: Case Outputs (Chorus results for all 7 cases)

---

## 12. REFERENCES

1. CDC. Key Facts About Seasonal Flu Vaccine. 2024.
2. Bangor A, Kortum PT, Miller JT. An empirical evaluation of the System Usability Scale. Int J Hum Comput Interact. 2008;24(6):574-594.
3. [Additional references to be added]


// Study Cases with CDC Reference Messages for Comparison
export const STUDY_CASES = [
  {
    case_number: 1,
    topic: "Seasonal Flu Vaccination",
    query: "Should I get a flu vaccine this year?",
    cdc_message: `**Get Your Flu Vaccine This Year**

The flu vaccine is recommended for everyone 6 months and older. Getting vaccinated each year is the best way to protect yourself and your loved ones from the flu.

**Why get vaccinated:**
- Prevents millions of illnesses each year
- Reduces risk of flu-related hospitalization
- Protects vulnerable people around you

**What to know:**
- You cannot get the flu from the flu shot
- Side effects are usually mild (sore arm, low fever)
- It takes about 2 weeks for protection to develop

Talk to your doctor or visit your local pharmacy to get vaccinated today.

*Source: CDC Key Facts About Seasonal Flu Vaccine*`
  },
  {
    case_number: 2,
    topic: "COVID-19 Boosters",
    query: "Are COVID boosters still recommended?",
    cdc_message: `**Stay Up to Date with COVID-19 Vaccines**

Yes, updated COVID-19 vaccines are recommended for everyone 6 months and older. The virus continues to evolve, and updated vaccines provide better protection against current variants.

**Who should get vaccinated:**
- Everyone 6 months and older should receive an updated COVID-19 vaccine
- Some people may need additional doses based on age and health conditions

**Benefits:**
- Reduces your risk of getting sick with COVID-19
- Provides strong protection against severe illness and hospitalization
- Helps protect those who cannot be vaccinated

Contact your healthcare provider or local pharmacy to schedule your updated vaccine.

*Source: CDC COVID-19 Vaccine Recommendations*`
  },
  {
    case_number: 3,
    topic: "Bird Flu Food Safety",
    query: "Is it safe to eat eggs and chicken during the bird flu outbreak?",
    cdc_message: `**Food Safety During Avian Influenza Outbreaks**

Yes, properly handled and cooked poultry and eggs are safe to eat. The U.S. food supply remains safe.

**Key safety measures in place:**
- USDA monitors flocks and removes infected birds from the food supply
- Eggs from infected flocks do not enter the market
- Commercial processing includes safety measures

**Safe food handling:**
- Cook poultry to internal temperature of 165°F
- Cook eggs until yolks are firm
- Wash hands after handling raw poultry
- Don't cross-contaminate other foods

There is no evidence that properly cooked poultry or eggs can transmit bird flu to humans.

*Source: USDA/FDA Food Safety Guidance on HPAI*`
  },
  {
    case_number: 4,
    topic: "MMR Vaccine Safety",
    query: "What are the side effects of the MMR vaccine? Is it linked to autism?",
    cdc_message: `**MMR Vaccine: Safe and Effective**

The MMR vaccine protects against measles, mumps, and rubella. It is safe for most children and adults.

**Common side effects (usually mild):**
- Sore arm from the injection
- Fever
- Mild rash
- Temporary joint pain (more common in adults)

**What science shows about autism:**
- Multiple large studies involving millions of children show NO link between MMR vaccine and autism
- The original study claiming a link was retracted due to serious ethical violations and data manipulation
- The scientific consensus is clear: vaccines do not cause autism

The benefits of vaccination far outweigh the risks. Protect your child from serious diseases by staying on schedule with recommended vaccines.

*Source: CDC MMR Vaccine Information Statement*`
  },
  {
    case_number: 5,
    topic: "HPV Vaccination",
    query: "Should my 12-year-old get the HPV vaccine? Is it safe?",
    cdc_message: `**HPV Vaccine: Cancer Prevention for Your Child**

Yes, the HPV vaccine is recommended for all children at age 11-12. This is one of the most effective ways to prevent several types of cancer.

**Why vaccinate at 11-12:**
- Produces strongest immune response at this age
- Provides protection before any exposure to HPV
- Only 2 doses needed if started before age 15

**What HPV vaccine prevents:**
- Cervical, vaginal, and vulvar cancers in women
- Anal and throat cancers in both sexes
- Penile cancer in men
- Genital warts

**Safety:**
- Given to millions worldwide since 2006
- Extensively studied and monitored
- Common side effects: sore arm, brief fever

This vaccine prevents cancer. Talk to your child's doctor today.

*Source: CDC HPV Vaccination Recommendations*`
  },
  {
    case_number: 6,
    topic: "Antibiotic Use",
    query: "Can I take leftover antibiotics for a cold?",
    cdc_message: `**Antibiotics Aren't Always the Answer**

No, you should not take leftover antibiotics for a cold. Here's why:

**Antibiotics don't work on colds:**
- Colds are caused by viruses
- Antibiotics only kill bacteria
- Taking antibiotics for viral infections doesn't help and can be harmful

**Risks of unnecessary antibiotics:**
- Contributes to antibiotic resistance
- Can cause side effects (diarrhea, allergic reactions)
- May kill helpful bacteria in your body

**What helps with cold symptoms:**
- Rest and fluids
- Over-the-counter pain relievers
- Honey for cough (adults and children over 1)
- Time - most colds improve in 7-10 days

See a doctor if symptoms worsen or last more than 10 days. Never share or save antibiotics.

*Source: CDC - Antibiotics Aren't Always the Answer*`
  },
  {
    case_number: 7,
    topic: "Mental Health Treatment",
    query: "Are antidepressants safe? Do they change your personality?",
    cdc_message: `**Understanding Antidepressant Medications**

Antidepressants are safe and effective treatments for depression when used as prescribed. They help restore brain chemistry, not change who you are.

**What antidepressants do:**
- Help regulate brain chemicals (neurotransmitters)
- Reduce symptoms of depression and anxiety
- Allow you to feel more like yourself, not different

**What to know:**
- They don't change your personality - they help relieve symptoms that may be masking it
- May take 2-4 weeks to see full effects
- Work best combined with therapy
- Should not be stopped suddenly - talk to your doctor

**Common concerns addressed:**
- Not "happy pills" - they help stabilize mood
- Not addictive in the way some other medications are
- Side effects often improve after first few weeks

Talk to a healthcare provider about whether antidepressants might help you. Treatment works.

*Source: NIMH Information on Antidepressants*`
  }
];

// SUS Questions (standard 10-item scale)
export const SUS_QUESTIONS = [
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
];

// Study Types
export const STUDY_TYPES = {
  CONTENT_ACCURACY: {
    id: 'content_accuracy',
    title: 'Study 1: Content Accuracy Review',
    subtitle: 'Expert Panel',
    description: 'Rate the factual accuracy of AI-generated health information across 7 cases.',
    participantType: 'expert',
    estimatedTime: '30-45 minutes',
    icon: '🔬'
  },
  MESSAGE_QUALITY: {
    id: 'message_quality',
    title: 'Study 2: Message Quality Comparison',
    subtitle: 'Expert Panel',
    description: 'Compare Chorus-generated messages with CDC reference messages (blinded).',
    participantType: 'expert',
    estimatedTime: '30-45 minutes',
    icon: '📊'
  },
  USABILITY: {
    id: 'usability',
    title: 'Study 3: Usability Assessment',
    subtitle: 'Public Health Professionals',
    description: 'Use the Chorus tool and complete the System Usability Scale (SUS).',
    participantType: 'professional',
    estimatedTime: '20-30 minutes',
    icon: '📋'
  },
  MESSAGE_EFFECTIVENESS: {
    id: 'message_effectiveness',
    title: 'Study 4: Message Effectiveness',
    subtitle: 'General Public',
    description: 'View and rate a public health message on flu vaccination.',
    participantType: 'public',
    estimatedTime: '5-10 minutes',
    icon: '📢'
  }
};

// Content Accuracy Rating Dimensions
export const ACCURACY_DIMENSIONS = [
  { id: 'factual_accuracy', label: 'Factual Accuracy', description: 'Information is correct and evidence-based' },
  { id: 'completeness', label: 'Completeness', description: 'Covers key aspects of the topic' },
  { id: 'up_to_date', label: 'Current Information', description: 'Reflects latest guidelines and evidence' },
  { id: 'clarity', label: 'Clarity', description: 'Easy to understand, free of jargon' },
  { id: 'potential_harm', label: 'Potential for Harm', description: '1=High risk, 5=No risk of harm from this info' }
];

// Message Quality Rating Dimensions
export const QUALITY_DIMENSIONS = [
  { id: 'clarity', label: 'Clarity', description: 'Easy to understand, free of jargon' },
  { id: 'accuracy', label: 'Scientific Accuracy', description: 'Information is factually correct' },
  { id: 'actionability', label: 'Actionability', description: 'Clearly tells people what to do' },
  { id: 'cultural_sensitivity', label: 'Cultural Sensitivity', description: 'Appropriate for diverse audiences' },
  { id: 'persuasiveness', label: 'Persuasiveness', description: 'Likely to influence behavior' },
  { id: 'addresses_concerns', label: 'Addresses Concerns', description: 'Acknowledges common hesitancies' }
];

// Message Effectiveness Questions (Study 4)
export const EFFECTIVENESS_QUESTIONS = [
  { id: 'intention', label: 'After reading this message, how likely are you to get a flu vaccine?', scale: 7 },
  { id: 'credibility', label: 'How credible do you find this message?', scale: 5 },
  { id: 'clarity', label: 'How clear is this message?', scale: 5 },
  { id: 'relevance', label: 'How relevant is this message to you?', scale: 5 },
  { id: 'trust', label: 'How much do you trust this information?', scale: 5 }
];

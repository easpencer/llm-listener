import { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { StudyFAB, StudyModal } from './StudyMode'
import { ViewResultsLink } from './ResultsDashboard'
import { ConflictPanel } from './components/ConflictPanel'

const PROVIDER_COLORS = {
  'OpenAI': '#10a37f',
  'Anthropic': '#d4a574',
  'Google Gemini': '#4285f4',
  'Grok': '#1da1f2',
  'Ollama': '#94a3b8',
}

// ============================================
// Enhanced Evidence Quality Framework
// ============================================

// Source Credibility Tiers - Higher tier = more trustworthy
const SOURCE_CREDIBILITY = {
  // Tier 1: Gold Standard - Official government/international health bodies (weight: 5)
  tier1: {
    domains: ['cdc.gov', 'who.int', 'fda.gov', 'nih.gov', 'cochranelibrary.com', 'cochrane.org'],
    weight: 5,
    label: 'Official Health Authority',
    color: '#10b981'
  },
  // Tier 2: High Credibility - Major peer-reviewed journals (weight: 4)
  tier2: {
    domains: ['nejm.org', 'jamanetwork.com', 'thelancet.com', 'bmj.com', 'nature.com', 'pubmed.ncbi.nlm.nih.gov', 'ncbi.nlm.nih.gov', 'sciencedirect.com'],
    weight: 4,
    label: 'Peer-Reviewed Journal',
    color: '#3b82f6'
  },
  // Tier 3: Academic/Institutional - Universities, major medical centers (weight: 3)
  tier3: {
    domains: ['.edu', 'mayoclinic.org', 'clevelandclinic.org', 'hopkinsmedicine.org', 'uptodate.com', 'medscape.com'],
    weight: 3,
    label: 'Academic/Medical Center',
    color: '#8b5cf6'
  },
  // Tier 4: Consumer Health - Reputable consumer health sites (weight: 2)
  tier4: {
    domains: ['webmd.com', 'healthline.com', 'medlineplus.gov', 'drugs.com', 'patient.info'],
    weight: 2,
    label: 'Consumer Health Site',
    color: '#f59e0b'
  },
  // Tier 5: General/News - Everything else (weight: 1)
  tier5: {
    domains: [],
    weight: 1,
    label: 'General Source',
    color: '#94a3b8'
  }
}

// Classify a URL into a credibility tier
const getSourceTier = (url) => {
  if (!url) return { tier: 5, ...SOURCE_CREDIBILITY.tier5 }
  const urlLower = url.toLowerCase()

  for (const [tierName, tierData] of Object.entries(SOURCE_CREDIBILITY)) {
    if (tierData.domains.some(domain => urlLower.includes(domain))) {
      return { tier: parseInt(tierName.replace('tier', '')), ...tierData }
    }
  }
  return { tier: 5, ...SOURCE_CREDIBILITY.tier5 }
}

// Analyze sources and return credibility breakdown
const analyzeSourceCredibility = (sources) => {
  if (!sources || !Array.isArray(sources) || sources.length === 0) {
    return { tierCounts: {1: 0, 2: 0, 3: 0, 4: 0, 5: 0}, weightedScore: 0, topTier: 5, totalWeight: 0 }
  }

  const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let totalWeight = 0
  let topTier = 5

  sources.forEach(source => {
    const url = source.url || source.link || ''
    const { tier, weight } = getSourceTier(url)
    tierCounts[tier]++
    totalWeight += weight
    if (tier < topTier) topTier = tier
  })

  return { tierCounts, weightedScore: totalWeight, topTier, totalWeight }
}

// Hedging language patterns - indicates uncertainty
const HEDGING_PATTERNS = [
  /\bmay\b/gi, /\bmight\b/gi, /\bcould\b/gi, /\bpossibly\b/gi, /\bpotentially\b/gi,
  /\bsome (studies|research|evidence)\b/gi, /\blimited (evidence|research|data)\b/gi,
  /\bemerging (research|evidence)\b/gi, /\bpreliminary\b/gi, /\bearly (studies|research)\b/gi,
  /\bsuggests?\b/gi, /\bappears? to\b/gi, /\bseems? to\b/gi,
  /\bnot (fully|well|clearly) (understood|established)\b/gi,
  /\bmore research (is )?(needed|required)\b/gi, /\bfurther (study|research|investigation)\b/gi,
  /\binconsistent\b/gi, /\bconflicting\b/gi, /\bmixed (results|findings|evidence)\b/gi
]

// Confidence language patterns - indicates certainty
const CONFIDENCE_PATTERNS = [
  /\bhas been (shown|demonstrated|proven)\b/gi, /\bstrongly (supports?|suggests?)\b/gi,
  /\bwell[- ]established\b/gi, /\bdefinitively\b/gi, /\bclearly (shows?|demonstrates?)\b/gi,
  /\brobust evidence\b/gi, /\bstrong evidence\b/gi, /\bmeta-analysis\b/gi,
  /\brandomized controlled trial\b/gi, /\blarge[- ]scale (study|trial)\b/gi,
  /\bsystematic review\b/gi, /\bCochrane\b/gi
]

// Analyze AI response text for hedging and confidence language
const analyzeResponseConfidence = (text) => {
  if (!text) return { hedgingScore: 0, confidenceScore: 0, hedgingCount: 0, confidenceCount: 0 }

  let hedgingCount = 0
  let confidenceCount = 0

  HEDGING_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) hedgingCount += matches.length
  })

  CONFIDENCE_PATTERNS.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) confidenceCount += matches.length
  })

  // Normalize by text length (per 500 words approximately)
  const wordCount = text.split(/\s+/).length
  const normalizer = Math.max(1, wordCount / 500)

  return {
    hedgingScore: Math.min(1, hedgingCount / (5 * normalizer)), // 0-1, higher = more hedging
    confidenceScore: Math.min(1, confidenceCount / (3 * normalizer)), // 0-1, higher = more confident
    hedgingCount,
    confidenceCount,
    netConfidence: Math.max(0, Math.min(1, 0.5 + (confidenceCount - hedgingCount) / (10 * normalizer)))
  }
}

// Analyze AI consensus quality - hedging, agreement, contradictions
const analyzeAIConsensusQuality = (responses) => {
  if (!responses || !Array.isArray(responses)) {
    return { agreementLevel: 0, modelConfidence: 0, hasContradictions: false, analysis: {} }
  }

  const successfulResponses = responses.filter(r => r.success && r.content)
  if (successfulResponses.length < 2) {
    return {
      agreementLevel: successfulResponses.length > 0 ? 0.5 : 0,
      modelConfidence: 0.5,
      hasContradictions: false,
      analysis: {}
    }
  }

  // Analyze each response for hedging
  const analyses = successfulResponses.map(r => ({
    provider: r.provider_name,
    ...analyzeResponseConfidence(r.content)
  }))

  // Average hedging across all models
  const avgHedging = analyses.reduce((sum, a) => sum + a.hedgingScore, 0) / analyses.length
  const avgConfidence = analyses.reduce((sum, a) => sum + a.netConfidence, 0) / analyses.length

  // Look for contradiction indicators in responses
  const allText = successfulResponses.map(r => r.content).join(' ').toLowerCase()
  const contradictionIndicators = [
    /however,? (other|some) (studies|research)/gi,
    /in contrast/gi, /on the other hand/gi,
    /disputed/gi, /controversial/gi, /debate/gi
  ]

  let contradictionCount = 0
  contradictionIndicators.forEach(pattern => {
    const matches = allText.match(pattern)
    if (matches) contradictionCount += matches.length
  })

  return {
    agreementLevel: Math.max(0.3, 1 - avgHedging * 0.5 - contradictionCount * 0.1),
    modelConfidence: avgConfidence,
    hedgingLevel: avgHedging,
    hasContradictions: contradictionCount > 2,
    contradictionCount,
    modelCount: successfulResponses.length,
    analysis: analyses
  }
}

// ============================================
// Extended Evidence Quality Metrics
// ============================================

// Study Design Hierarchy - Higher level = stronger evidence
const STUDY_DESIGN_HIERARCHY = {
  level1: { // Highest evidence
    patterns: [/systematic review/gi, /meta-analysis/gi, /cochrane review/gi],
    weight: 5,
    label: 'Systematic Review/Meta-analysis',
    abbrev: 'SR'
  },
  level2: { // Strong evidence
    patterns: [/randomized controlled trial/gi, /\bRCT\b/g, /randomised controlled/gi, /double[- ]blind/gi, /placebo[- ]controlled/gi],
    weight: 4,
    label: 'Randomized Controlled Trial',
    abbrev: 'RCT'
  },
  level3: { // Moderate evidence
    patterns: [/cohort study/gi, /prospective study/gi, /longitudinal study/gi, /observational study/gi],
    weight: 3,
    label: 'Cohort/Observational',
    abbrev: 'COH'
  },
  level4: { // Limited evidence
    patterns: [/case[- ]control/gi, /retrospective/gi, /cross[- ]sectional/gi],
    weight: 2,
    label: 'Case-Control/Retrospective',
    abbrev: 'CC'
  },
  level5: { // Weak evidence
    patterns: [/case (series|report)/gi, /case study/gi, /pilot study/gi, /preliminary/gi],
    weight: 1,
    label: 'Case Report/Pilot',
    abbrev: 'CS'
  },
  level6: { // Lowest evidence
    patterns: [/expert opinion/gi, /editorial/gi, /commentary/gi, /narrative review/gi],
    weight: 0.5,
    label: 'Expert Opinion',
    abbrev: 'EO'
  }
}

// Analyze text for study design mentions
const analyzeStudyDesign = (text) => {
  if (!text) return { highestLevel: 6, designs: [], weightedScore: 0 }

  const designs = []
  let highestLevel = 6
  let totalWeight = 0

  for (const [levelName, levelData] of Object.entries(STUDY_DESIGN_HIERARCHY)) {
    const level = parseInt(levelName.replace('level', ''))
    for (const pattern of levelData.patterns) {
      const matches = text.match(pattern)
      if (matches) {
        designs.push({ level, label: levelData.label, abbrev: levelData.abbrev, count: matches.length })
        totalWeight += levelData.weight * matches.length
        if (level < highestLevel) highestLevel = level
      }
    }
  }

  return { highestLevel, designs, weightedScore: totalWeight, hasRCT: highestLevel <= 2 }
}

// Sample Size Detection
const SAMPLE_SIZE_PATTERNS = [
  /n\s*[=:]\s*([\d,]+)/gi,  // n=1000, n: 500
  /([\d,]+)\s*participants/gi,
  /([\d,]+)\s*patients/gi,
  /([\d,]+)\s*subjects/gi,
  /([\d,]+)\s*individuals/gi,
  /enrolled\s*([\d,]+)/gi,
  /sample\s*(size|of)\s*([\d,]+)/gi,
  /([\d,]+)\s*(people|adults|children|women|men)/gi
]

const analyzeSampleSize = (text) => {
  if (!text) return { sizes: [], largest: 0, total: 0, hasLargeSample: false }

  const sizes = []

  SAMPLE_SIZE_PATTERNS.forEach(pattern => {
    let match
    const regex = new RegExp(pattern.source, pattern.flags)
    while ((match = regex.exec(text)) !== null) {
      // Find the number in the match
      const numMatch = match[0].match(/[\d,]+/)
      if (numMatch) {
        const size = parseInt(numMatch[0].replace(/,/g, ''))
        if (size >= 10 && size < 10000000) { // Reasonable sample size range
          sizes.push(size)
        }
      }
    }
  })

  const uniqueSizes = [...new Set(sizes)].sort((a, b) => b - a)
  const largest = uniqueSizes[0] || 0
  const total = uniqueSizes.reduce((sum, s) => sum + s, 0)

  return {
    sizes: uniqueSizes.slice(0, 5),
    largest,
    total,
    hasLargeSample: largest >= 1000,
    hasVeryLargeSample: largest >= 10000,
    sampleCategory: largest >= 10000 ? 'very-large' : largest >= 1000 ? 'large' : largest >= 100 ? 'moderate' : largest > 0 ? 'small' : 'unknown'
  }
}

// Follow-up Duration Detection
const DURATION_PATTERNS = [
  /followed?\s*(for|over|up)?\s*(\d+)\s*(year|month|week|day)s?/gi,
  /(\d+)[- ](year|month|week)[- ]follow[- ]?up/gi,
  /follow[- ]?up\s*(period|duration)?\s*(of)?\s*(\d+)\s*(year|month|week|day)s?/gi,
  /(\d+)[- ](year|month|week|day)s?\s*(of)?\s*follow[- ]?up/gi,
  /median\s*follow[- ]?up\s*(of)?\s*(\d+\.?\d*)\s*(year|month|week|day)s?/gi,
  /long[- ]?term\s*\((\d+)\s*(year|month)s?\)/gi
]

const analyzeDuration = (text) => {
  if (!text) return { durations: [], longestMonths: 0, hasLongTerm: false }

  const durations = []

  DURATION_PATTERNS.forEach(pattern => {
    let match
    const regex = new RegExp(pattern.source, pattern.flags)
    while ((match = regex.exec(text)) !== null) {
      // Extract number and unit
      const numMatch = match[0].match(/(\d+\.?\d*)/)
      const unitMatch = match[0].match(/(year|month|week|day)s?/i)

      if (numMatch && unitMatch) {
        const value = parseFloat(numMatch[1])
        const unit = unitMatch[1].toLowerCase()

        // Convert to months
        let months = 0
        switch (unit) {
          case 'year': months = value * 12; break
          case 'month': months = value; break
          case 'week': months = value / 4.33; break
          case 'day': months = value / 30; break
        }

        if (months > 0 && months < 600) { // Max 50 years
          durations.push({ value, unit, months: Math.round(months * 10) / 10 })
        }
      }
    }
  })

  // Sort by duration and dedupe
  const sorted = durations.sort((a, b) => b.months - a.months)
  const longestMonths = sorted[0]?.months || 0

  return {
    durations: sorted.slice(0, 3),
    longestMonths,
    hasLongTerm: longestMonths >= 12,
    hasVeryLongTerm: longestMonths >= 60,
    durationCategory: longestMonths >= 60 ? '5+ years' : longestMonths >= 24 ? '2-5 years' : longestMonths >= 12 ? '1-2 years' : longestMonths >= 6 ? '6-12 months' : longestMonths > 0 ? '<6 months' : 'unknown'
  }
}

// Effect Size Language Detection
const EFFECT_SIZE_PATTERNS = {
  strong: [
    /(\d+)[%x]\s*(reduction|decrease|increase|improvement)/gi,
    /reduced\s*(by)?\s*(\d+)%/gi,
    /(\d+)[- ]fold\s*(increase|decrease|reduction)/gi,
    /significantly\s*(reduced|increased|improved)/gi,
    /dramatic\s*(improvement|reduction|effect)/gi,
    /substantial\s*(benefit|effect|improvement)/gi
  ],
  moderate: [
    /moderate\s*(effect|improvement|reduction)/gi,
    /meaningful\s*(improvement|difference|effect)/gi,
    /clinically\s*significant/gi,
    /statistically\s*significant/gi
  ],
  weak: [
    /marginal\s*(improvement|effect|benefit)/gi,
    /slight\s*(improvement|effect|benefit)/gi,
    /small\s*(effect|difference|improvement)/gi,
    /modest\s*(improvement|effect|benefit)/gi,
    /trend\s*toward/gi
  ],
  null: [
    /no\s*significant\s*(difference|effect|improvement)/gi,
    /failed\s*to\s*(show|demonstrate|find)/gi,
    /did\s*not\s*(differ|improve|change)/gi,
    /non[- ]?significant/gi
  ]
}

const analyzeEffectSize = (text) => {
  if (!text) return { category: 'unknown', patterns: [], hasQuantified: false }

  const found = { strong: 0, moderate: 0, weak: 0, null: 0 }
  const patterns = []

  for (const [category, categoryPatterns] of Object.entries(EFFECT_SIZE_PATTERNS)) {
    for (const pattern of categoryPatterns) {
      const matches = text.match(pattern)
      if (matches) {
        found[category] += matches.length
        patterns.push({ category, count: matches.length })
      }
    }
  }

  // Detect quantified effects (percentages)
  const quantifiedMatches = text.match(/(\d+\.?\d*)%/g)
  const hasQuantified = quantifiedMatches && quantifiedMatches.length > 0

  // Determine dominant category
  const dominant = Object.entries(found).sort((a, b) => b[1] - a[1])[0]

  return {
    category: dominant[1] > 0 ? dominant[0] : 'unknown',
    counts: found,
    patterns: patterns.slice(0, 5),
    hasQuantified,
    quantifiedCount: quantifiedMatches?.length || 0
  }
}

// Geographic Diversity Detection
const GEOGRAPHIC_PATTERNS = {
  regions: {
    'North America': /\b(united states|usa|u\.s\.|american|canada|canadian|mexico|mexican)\b/gi,
    'Europe': /\b(europe|european|uk|united kingdom|british|germany|german|france|french|italy|italian|spain|spanish|netherlands|dutch|sweden|swedish|norway|norwegian|denmark|danish)\b/gi,
    'Asia': /\b(china|chinese|japan|japanese|korea|korean|india|indian|taiwan|singapore|hong kong|thailand|vietnam|indonesia|malaysia|philippines)\b/gi,
    'Oceania': /\b(australia|australian|new zealand)\b/gi,
    'Latin America': /\b(brazil|brazilian|argentina|chile|colombia|peru|latin america)\b/gi,
    'Africa': /\b(africa|african|south africa|nigeria|kenya|egypt|morocco)\b/gi,
    'Middle East': /\b(israel|israeli|iran|saudi|dubai|qatar|turkey|turkish)\b/gi
  },
  scope: {
    multinational: /\b(multinational|multi[- ]?national|multi[- ]?center|multi[- ]?centre|international|global|worldwide|across\s*\d+\s*countries)\b/gi,
    multisite: /\b(multi[- ]?site|multiple\s*(sites|centers|centres|institutions|hospitals))\b/gi
  }
}

const analyzeGeographicDiversity = (text) => {
  if (!text) return { regions: [], regionCount: 0, isMultinational: false, diversityScore: 0 }

  const regionsFound = []

  for (const [region, pattern] of Object.entries(GEOGRAPHIC_PATTERNS.regions)) {
    if (pattern.test(text)) {
      regionsFound.push(region)
    }
  }

  const isMultinational = GEOGRAPHIC_PATTERNS.scope.multinational.test(text)
  const isMultisite = GEOGRAPHIC_PATTERNS.scope.multisite.test(text)

  // Reset lastIndex for patterns used with test()
  Object.values(GEOGRAPHIC_PATTERNS.regions).forEach(p => p.lastIndex = 0)
  Object.values(GEOGRAPHIC_PATTERNS.scope).forEach(p => p.lastIndex = 0)

  const diversityScore = Math.min(1, (regionsFound.length * 0.15) + (isMultinational ? 0.3 : 0) + (isMultisite ? 0.1 : 0))

  return {
    regions: regionsFound,
    regionCount: regionsFound.length,
    isMultinational,
    isMultisite,
    diversityScore,
    diversityCategory: regionsFound.length >= 4 ? 'global' : regionsFound.length >= 2 ? 'multi-regional' : regionsFound.length === 1 ? 'single-region' : 'unknown'
  }
}

// Funding Source / Research Independence
const FUNDING_PATTERNS = {
  independent: [
    /\b(NIH|National Institutes? of Health)\b/gi,
    /\b(NCI|National Cancer Institute)\b/gi,
    /\b(CDC|Centers? for Disease Control)\b/gi,
    /\b(NSF|National Science Foundation)\b/gi,
    /\b(WHO|World Health Organization)\b/gi,
    /\b(government[- ]?funded|publicly[- ]?funded)\b/gi,
    /\b(academic|university)[- ]?(funded|grant|research)\b/gi,
    /\bno\s*(conflicts?|competing)\s*(of\s*)?interest\b/gi
  ],
  industry: [
    /\b(industry[- ]?funded|pharmaceutical[- ]?company|drug[- ]?maker)\b/gi,
    /\b(sponsored\s*by|funding\s*from)\s*[A-Z][a-z]+\b/g,
    /\b(Pfizer|Merck|Johnson|Novartis|Roche|AstraZeneca|Moderna|BioNTech|GSK|Sanofi|AbbVie|Bristol[- ]?Myers|Eli Lilly|Amgen)\b/gi
  ],
  conflicted: [
    /\b(conflict[s]?\s*(of\s*)?interest|competing\s*interest)\b/gi,
    /\breceived\s*(funding|grants?|honorari|payment|consulting)/gi,
    /\b(advisory\s*board|consultant|speaker)\s*(for|fee)/gi
  ]
}

const analyzeFundingSource = (text) => {
  if (!text) return { category: 'unknown', sources: [], independenceScore: 0.5 }

  let independentCount = 0
  let industryCount = 0
  let conflictCount = 0
  const sources = []

  FUNDING_PATTERNS.independent.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      independentCount += matches.length
      sources.push({ type: 'independent', matches: matches.slice(0, 2) })
    }
  })

  FUNDING_PATTERNS.industry.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      industryCount += matches.length
      sources.push({ type: 'industry', matches: matches.slice(0, 2) })
    }
  })

  FUNDING_PATTERNS.conflicted.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      conflictCount += matches.length
    }
  })

  // Calculate independence score
  let independenceScore = 0.5 // Default neutral
  if (independentCount > 0 && industryCount === 0) {
    independenceScore = 0.9
  } else if (independentCount > industryCount) {
    independenceScore = 0.7
  } else if (industryCount > 0 && independentCount === 0) {
    independenceScore = 0.3
  }

  if (conflictCount > 0) {
    independenceScore -= 0.1 * Math.min(conflictCount, 3)
  }

  return {
    category: independenceScore >= 0.7 ? 'independent' : independenceScore <= 0.4 ? 'industry' : 'mixed',
    sources: sources.slice(0, 3),
    independentCount,
    industryCount,
    conflictCount,
    independenceScore: Math.max(0, Math.min(1, independenceScore))
  }
}

// Publication Recency
const extractPublicationYears = (text) => {
  if (!text) return { years: [], mostRecent: null, oldest: null, span: 0 }

  // Match years in common citation formats
  const yearPatterns = [
    /\((\d{4})\)/g,  // (2023)
    /,\s*(\d{4})\b/g,  // , 2023
    /\b(19\d{2}|20[0-2]\d)\b/g  // Any year 1900-2029
  ]

  const years = new Set()

  yearPatterns.forEach(pattern => {
    let match
    while ((match = pattern.exec(text)) !== null) {
      const year = parseInt(match[1])
      if (year >= 1990 && year <= new Date().getFullYear()) {
        years.add(year)
      }
    }
  })

  const sortedYears = [...years].sort((a, b) => b - a)
  const currentYear = new Date().getFullYear()
  const mostRecent = sortedYears[0] || null
  const oldest = sortedYears[sortedYears.length - 1] || null

  let recencyScore = 0
  if (mostRecent) {
    const yearsOld = currentYear - mostRecent
    if (yearsOld <= 1) recencyScore = 1
    else if (yearsOld <= 2) recencyScore = 0.9
    else if (yearsOld <= 3) recencyScore = 0.8
    else if (yearsOld <= 5) recencyScore = 0.6
    else if (yearsOld <= 10) recencyScore = 0.4
    else recencyScore = 0.2
  }

  return {
    years: sortedYears.slice(0, 10),
    mostRecent,
    oldest,
    span: oldest && mostRecent ? mostRecent - oldest : 0,
    recencyScore,
    recencyCategory: mostRecent ? (currentYear - mostRecent <= 2 ? 'current' : currentYear - mostRecent <= 5 ? 'recent' : 'dated') : 'unknown'
  }
}

// Replication Status
const REPLICATION_PATTERNS = {
  replicated: [
    /\breplicat(ed|ion)\b/gi,
    /\bconfirm(ed|s)?\s*(by|in)\s*(multiple|other|subsequent)\s*(studies|trials|research)/gi,
    /\bconsistent(ly)?\s*(across|with)\s*(multiple|other)\s*(studies|trials)/gi,
    /\brobust\s*(across|finding)/gi,
    /\breproducib(le|ility)\b/gi,
    /\bmultiple\s*(studies|trials)\s*(have\s*)?(shown|demonstrated|confirmed)/gi
  ],
  notReplicated: [
    /\bnot\s*(been\s*)?(replicated|reproduced|confirmed)/gi,
    /\bfailed\s*to\s*replicate/gi,
    /\binconsistent\s*(results|findings)/gi,
    /\bcontradictory\s*(results|findings|evidence)/gi
  ],
  needsReplication: [
    /\brequires?\s*(further|additional)\s*(replication|confirmation|study)/gi,
    /\bmore\s*(research|studies)\s*(is\s*)?(needed|required)/gi,
    /\bpreliminary\s*(finding|result|evidence)/gi,
    /\bsingle\s*study/gi
  ]
}

const analyzeReplicationStatus = (text) => {
  if (!text) return { status: 'unknown', score: 0.5, indicators: [] }

  let replicatedCount = 0
  let notReplicatedCount = 0
  let needsCount = 0
  const indicators = []

  REPLICATION_PATTERNS.replicated.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      replicatedCount += matches.length
      indicators.push({ type: 'replicated', match: matches[0] })
    }
  })

  REPLICATION_PATTERNS.notReplicated.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      notReplicatedCount += matches.length
      indicators.push({ type: 'not-replicated', match: matches[0] })
    }
  })

  REPLICATION_PATTERNS.needsReplication.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) {
      needsCount += matches.length
      indicators.push({ type: 'needs-replication', match: matches[0] })
    }
  })

  let status = 'unknown'
  let score = 0.5

  if (replicatedCount > 0 && notReplicatedCount === 0) {
    status = 'replicated'
    score = Math.min(1, 0.7 + replicatedCount * 0.1)
  } else if (notReplicatedCount > 0) {
    status = 'disputed'
    score = Math.max(0.2, 0.5 - notReplicatedCount * 0.1)
  } else if (needsCount > 0) {
    status = 'preliminary'
    score = 0.4
  }

  return { status, score, indicators: indicators.slice(0, 5), replicatedCount, notReplicatedCount, needsCount }
}

// Systematic Review Detection
const SYSTEMATIC_REVIEW_PATTERNS = {
  present: [
    /\bsystematic\s*review/gi,
    /\bmeta[- ]?analysis/gi,
    /\bCochrane\s*(review|database|collaboration)/gi,
    /\bpooled\s*(analysis|data|results)/gi,
    /\bquantitative\s*synthesis/gi
  ],
  quality: [
    /\bPRISMA\b/gi,
    /\bMOOSE\b/gi,
    /\bprospero/gi,
    /\bheterogeneity\b/gi,
    /\bfunnel\s*plot/gi,
    /\bpublication\s*bias/gi,
    /\bquality\s*(assessment|appraisal)/gi
  ]
}

const analyzeSystematicReview = (text) => {
  if (!text) return { hasSystematicReview: false, hasMeta: false, quality: 0 }

  let srCount = 0
  let qualityCount = 0

  SYSTEMATIC_REVIEW_PATTERNS.present.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) srCount += matches.length
  })

  SYSTEMATIC_REVIEW_PATTERNS.quality.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) qualityCount += matches.length
  })

  const hasSystematicReview = srCount > 0
  const hasMeta = /meta[- ]?analysis/gi.test(text)

  // Quality score based on methodology mentions
  const quality = Math.min(1, (srCount * 0.2) + (qualityCount * 0.15))

  return {
    hasSystematicReview,
    hasMeta,
    count: srCount,
    qualityIndicators: qualityCount,
    quality,
    category: hasMeta ? 'meta-analysis' : hasSystematicReview ? 'systematic-review' : 'none'
  }
}

// Endpoint Type Classification
const ENDPOINT_PATTERNS = {
  hard: [
    /\b(mortality|death|survival)\b/gi,
    /\b(myocardial\s*infarction|heart\s*attack|stroke)\b/gi,
    /\b(hospitalization|hospitalisation)\b/gi,
    /\ball[- ]?cause\s*(mortality|death)/gi,
    /\bcardiovascular\s*(event|death|outcome)/gi,
    /\bcancer\s*(incidence|mortality|death)/gi,
    /\b(cure|remission)\s*rate/gi
  ],
  clinical: [
    /\b(symptom|pain)\s*(score|reduction|improvement)/gi,
    /\bquality\s*of\s*life/gi,
    /\b(functional|physical)\s*(status|capacity|improvement)/gi,
    /\bdisease\s*progression/gi,
    /\brelapse\s*rate/gi,
    /\brecurrence/gi
  ],
  surrogate: [
    /\b(biomarker|blood\s*pressure|cholesterol|HbA1c|glucose)\b/gi,
    /\b(tumor\s*size|lesion)\b/gi,
    /\blaboratory\s*(measure|value|parameter)/gi,
    /\b(imaging|radiologic)\s*(finding|response)/gi,
    /\bproxy\s*(measure|endpoint)/gi
  ]
}

const analyzeEndpointType = (text) => {
  if (!text) return { category: 'unknown', hasHard: false, hasClinical: false, hasSurrogate: false }

  let hardCount = 0
  let clinicalCount = 0
  let surrogateCount = 0

  ENDPOINT_PATTERNS.hard.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) hardCount += matches.length
  })

  ENDPOINT_PATTERNS.clinical.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) clinicalCount += matches.length
  })

  ENDPOINT_PATTERNS.surrogate.forEach(pattern => {
    const matches = text.match(pattern)
    if (matches) surrogateCount += matches.length
  })

  // Determine primary endpoint type
  const total = hardCount + clinicalCount + surrogateCount
  let category = 'unknown'
  let reliabilityScore = 0.5

  if (total > 0) {
    if (hardCount >= clinicalCount && hardCount >= surrogateCount) {
      category = 'hard'
      reliabilityScore = 0.9
    } else if (clinicalCount >= surrogateCount) {
      category = 'clinical'
      reliabilityScore = 0.7
    } else {
      category = 'surrogate'
      reliabilityScore = 0.5
    }
  }

  return {
    category,
    hasHard: hardCount > 0,
    hasClinical: clinicalCount > 0,
    hasSurrogate: surrogateCount > 0,
    counts: { hard: hardCount, clinical: clinicalCount, surrogate: surrogateCount },
    reliabilityScore
  }
}

// Combined Deep Analysis - runs all metrics on text
const analyzeEvidenceDepth = (text, sources = []) => {
  const studyDesign = analyzeStudyDesign(text)
  const sampleSize = analyzeSampleSize(text)
  const duration = analyzeDuration(text)
  const effectSize = analyzeEffectSize(text)
  const geography = analyzeGeographicDiversity(text)
  const funding = analyzeFundingSource(text)
  const recency = extractPublicationYears(text)
  const replication = analyzeReplicationStatus(text)
  const systematicReview = analyzeSystematicReview(text)
  const endpoints = analyzeEndpointType(text)

  // Calculate composite depth score (0-100)
  let depthScore = 0

  // Study design: max 25 points
  depthScore += (6 - studyDesign.highestLevel) * 5

  // Sample size: max 15 points
  if (sampleSize.hasVeryLargeSample) depthScore += 15
  else if (sampleSize.hasLargeSample) depthScore += 10
  else if (sampleSize.largest >= 100) depthScore += 5

  // Duration: max 10 points
  if (duration.hasVeryLongTerm) depthScore += 10
  else if (duration.hasLongTerm) depthScore += 6
  else if (duration.longestMonths >= 6) depthScore += 3

  // Effect size quantification: max 10 points
  if (effectSize.hasQuantified) depthScore += 5
  if (effectSize.category === 'strong') depthScore += 5
  else if (effectSize.category === 'moderate') depthScore += 3

  // Geographic diversity: max 10 points
  depthScore += Math.round(geography.diversityScore * 10)

  // Funding independence: max 10 points
  depthScore += Math.round(funding.independenceScore * 10)

  // Recency: max 10 points
  depthScore += Math.round(recency.recencyScore * 10)

  // Replication: max 5 points
  depthScore += Math.round(replication.score * 5)

  // Systematic review: max 5 points
  if (systematicReview.hasMeta) depthScore += 5
  else if (systematicReview.hasSystematicReview) depthScore += 3

  return {
    studyDesign,
    sampleSize,
    duration,
    effectSize,
    geography,
    funding,
    recency,
    replication,
    systematicReview,
    endpoints,
    depthScore: Math.min(100, Math.max(0, depthScore)),
    depthCategory: depthScore >= 70 ? 'comprehensive' : depthScore >= 50 ? 'substantial' : depthScore >= 30 ? 'moderate' : 'limited'
  }
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

// Image-based Chorus Logo - uses the actual logo images
function ChorusImageLogo({ size = 64, withText = false }) {
  const logoSrc = withText ? '/images/logo-2.png' : '/images/logo-1.png'
  // For logo with text (logo-2), it's landscape so adjust dimensions
  const height = size
  const width = withText ? size * 2.5 : size

  return (
    <img
      src={logoSrc}
      alt="Chorus"
      style={{
        height: `${height}px`,
        width: withText ? 'auto' : `${width}px`,
        maxWidth: withText ? `${width}px` : undefined,
        objectFit: 'contain'
      }}
      className="chorus-image-logo"
    />
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
            <span className="source-detail">
              {sources.guidelines?.count || 0} sources
              {sources.guidelines?.credibility?.topTier <= 2 && (
                <span className="tier-badge tier-high" title="Includes CDC, WHO, NIH, or major journals"> T1-2</span>
              )}
              {sources.guidelines?.credibility?.topTier === 3 && (
                <span className="tier-badge tier-mid" title="Academic/Medical center sources"> T3</span>
              )}
            </span>
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
            <span className="source-detail">
              {sources.literature?.count || 0} papers
              {sources.literature?.credibility?.tierCounts?.[2] > 0 && (
                <span className="tier-badge tier-peer" title="Includes peer-reviewed journals (NEJM, JAMA, etc.)"> PR</span>
              )}
            </span>
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
            <span className="source-detail">
              {sources.ai?.count || 0} models
              {sources.ai?.quality?.hedgingLevel > 0.3 && (
                <span className="tier-badge tier-caution" title="AI responses contain hedging/uncertainty language"> ?</span>
              )}
              {sources.ai?.quality?.hasContradictions && (
                <span className="tier-badge tier-warn" title="AI responses show contradictions"> !</span>
              )}
            </span>
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

      {/* Evidence Depth Insights - NEW */}
      {confidence.evidenceDepth && confidence.evidenceDepth.depthScore > 0 && (
        <div className="evidence-depth-section">
          <div className="depth-header">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2">
              <path d="M12 2v6m0 0l-3-3m3 3l3-3"/><path d="M12 22v-6m0 0l3 3m-3-3l-3 3"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
            <span className="depth-label">Evidence Depth: {confidence.evidenceDepth.depthCategory}</span>
            <span className="depth-score">{confidence.evidenceDepth.depthScore}/100</span>
          </div>
          <div className="depth-indicators">
            {confidence.evidenceDepth.systematicReview?.hasSystematicReview && (
              <span className="depth-badge depth-gold" title="Systematic review or meta-analysis cited">SR/MA</span>
            )}
            {confidence.evidenceDepth.studyDesign?.hasRCT && !confidence.evidenceDepth.systematicReview?.hasSystematicReview && (
              <span className="depth-badge depth-purple" title="Randomized controlled trial evidence">RCT</span>
            )}
            {confidence.evidenceDepth.sampleSize?.hasLargeSample && (
              <span className="depth-badge depth-teal" title={`Large sample: n=${confidence.evidenceDepth.sampleSize.largest?.toLocaleString()}`}>
                n={confidence.evidenceDepth.sampleSize.largest >= 10000 ? '10k+' : confidence.evidenceDepth.sampleSize.largest >= 1000 ? `${Math.round(confidence.evidenceDepth.sampleSize.largest / 1000)}k` : confidence.evidenceDepth.sampleSize.largest}
              </span>
            )}
            {confidence.evidenceDepth.duration?.hasLongTerm && (
              <span className="depth-badge depth-purple" title={`Long-term follow-up: ${confidence.evidenceDepth.duration.category}`}>
                {confidence.evidenceDepth.duration.category}
              </span>
            )}
            {confidence.evidenceDepth.replication?.status === 'replicated' && (
              <span className="depth-badge depth-green" title="Findings replicated across studies">Replicated</span>
            )}
            {confidence.evidenceDepth.replication?.status === 'preliminary' && (
              <span className="depth-badge depth-amber" title="Preliminary evidence, needs replication">Preliminary</span>
            )}
            {confidence.evidenceDepth.geography?.isMultinational && (
              <span className="depth-badge depth-teal" title={`Multi-national: ${confidence.evidenceDepth.geography.regions?.join(', ')}`}>Global</span>
            )}
            {confidence.evidenceDepth.funding?.category === 'independent' && (
              <span className="depth-badge depth-green" title="Independently funded research">Independent</span>
            )}
            {confidence.evidenceDepth.recency?.category === 'current' && (
              <span className="depth-badge depth-blue" title={`Most recent: ${confidence.evidenceDepth.recency.mostRecent}`}>Current</span>
            )}
            {confidence.evidenceDepth.recency?.category === 'dated' && (
              <span className="depth-badge depth-red" title="Some sources are dated">Dated</span>
            )}
          </div>
        </div>
      )}

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
  const [showDetailedSummary, setShowDetailedSummary] = useState(false) // Brief (false) vs Detailed (true) summary toggle
  const [healthContext, setHealthContext] = useState(null) // De-identified health context from uploaded records
  const [attachedFiles, setAttachedFiles] = useState([]) // Uploaded file contexts [{file_id, filename, preview}]
  const [conflictAnalysis, setConflictAnalysis] = useState(null) // Conflict analysis from multi-source queries
  const [isDragging, setIsDragging] = useState(false) // Drag state for textarea
  const [speedDialOpen, setSpeedDialOpen] = useState(false) // Speed dial FAB state
  const [uploadingFile, setUploadingFile] = useState(false) // File upload loading state
  const fileInputRef = useRef(null)
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

  // File upload handling
  const handleFileUpload = async (files) => {
    if (!files || files.length === 0) return

    setUploadingFile(true)
    setError(null)

    try {
      const formData = new FormData()
      for (const file of files) {
        formData.append('files', file)
      }

      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.detail || 'Upload failed')
      }

      const data = await response.json()
      setAttachedFiles(prev => [
        ...prev,
        ...data.files.map(f => ({
          file_id: f.file_id,
          filename: f.filename,
          preview: f.preview,
          extracted_chars: f.extracted_chars,
        }))
      ])
    } catch (err) {
      setError(`File upload failed: ${err.message}`)
    } finally {
      setUploadingFile(false)
    }
  }

  const removeAttachedFile = async (fileId) => {
    try {
      await fetch(`/api/files/${fileId}`, { method: 'DELETE' })
    } catch (e) {
      // Ignore delete errors
    }
    setAttachedFiles(prev => prev.filter(f => f.file_id !== fileId))
  }

  // Drag and drop handlers for textarea
  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

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
    setConflictAnalysis(null)
    setError(null)
    setShowAllAI(false)
    setConversationHistory([])
    setFollowUp('')

    try {
      const queryPromise = fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: searchQuestion,
          include_synthesis: true,
          mode,
          health_context: healthContext || undefined,
        }),
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
      setConflictAnalysis(queryData.conflict_analysis || null)
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
      setConflictAnalysis(queryData.conflict_analysis || null)

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

    // === NEW: Analyze source credibility using tier system ===
    const guidelineCredibility = analyzeSourceCredibility(guidelines.sources || [])
    const literatureCredibility = analyzeSourceCredibility(literature.sources || [])

    // === NEW: Analyze AI response quality (hedging, confidence language) ===
    const aiResponses = aiConsensus.providers?.map(p => ({
      success: true,
      content: p.content,
      provider_name: p.name
    })) || []
    const aiQuality = analyzeAIConsensusQuality(aiResponses)

    // === NEW: Deep evidence analysis on AI response content ===
    const allAIContent = aiConsensus.providers?.map(p => p.content).join('\n\n') || ''
    const evidenceDepth = analyzeEvidenceDepth(allAIContent)

    // Source strengths (1-4 dots) - now weighted by credibility tier
    const guidelinesStrength = guidelineCredibility.topTier <= 2 ? 4 :
                               guidelineCredibility.topTier <= 3 ? 3 :
                               guidelinesCount >= 2 ? 2 : guidelinesCount >= 1 ? 1 : 0
    const literatureStrength = literatureCredibility.topTier <= 2 ? 4 :
                               literatureCount >= 10 ? 3 : literatureCount >= 5 ? 2 : literatureCount >= 1 ? 1 : 0
    const aiStrength = aiCount >= 4 ? 3 : aiCount >= 3 ? 2 : aiCount >= 1 ? 1 : 0 // AI max is 3, never 4

    const sourceTypes = [guidelines.available, literature.available, aiConsensus.available].filter(Boolean).length
    const crossValidationStrength = sourceTypes >= 3 ? 3 : sourceTypes >= 2 ? 2 : sourceTypes >= 1 ? 1 : 0

    // Evidence Quality Grade (A-D) - VERY conservative based on GRADE
    // Now incorporates source credibility tiers AND study design hierarchy
    let quality = 'D'
    const hasTier1Guidelines = guidelineCredibility.tierCounts[1] > 0 // CDC, WHO, FDA, NIH
    const hasTier2Literature = literatureCredibility.tierCounts[2] > 0 // NEJM, JAMA, Lancet, etc.
    const hasSubstantialLiterature = literatureCount >= 10
    const hasModestLiterature = literatureCount >= 3
    const highCredibilityWeight = guidelineCredibility.weightedScore + literatureCredibility.weightedScore

    // NEW: Factor in study design from AI content
    const hasRCTEvidence = evidenceDepth.studyDesign.hasRCT
    const hasSystematicReview = evidenceDepth.systematicReview.hasMeta || evidenceDepth.systematicReview.hasSystematicReview
    const hasLargeSample = evidenceDepth.sampleSize.hasLargeSample
    const isReplicated = evidenceDepth.replication.status === 'replicated'

    if ((hasSystematicReview || hasRCTEvidence) && hasTier1Guidelines && hasTier2Literature) {
      quality = 'A' // Gold: RCT/SR + Official guidelines + peer-reviewed journals
    } else if (hasTier1Guidelines && hasTier2Literature && literatureCount >= 10) {
      quality = 'A' // Gold: Official guidelines from tier-1 sources + peer-reviewed journals
    } else if (hasRCTEvidence && (hasTier1Guidelines || guidelineCredibility.topTier <= 2)) {
      quality = 'B' // RCT evidence with good guidance
    } else if ((hasTier1Guidelines || guidelineCredibility.topTier <= 2) && hasSubstantialLiterature) {
      quality = 'B' // Good: High-credibility guidance + solid research base
    } else if ((hasLargeSample || isReplicated) && hasModestLiterature) {
      quality = 'B' // Large sample or replicated with some literature
    } else if (guidelinesCount >= 1 || hasModestLiterature || highCredibilityWeight >= 8) {
      quality = 'C' // Some evidence but not robust
    } else if (evidenceDepth.depthScore >= 30) {
      quality = 'C' // Moderate depth analysis suggests some evidence
    }
    // D is default - AI consensus alone is never higher than D

    // Retrieval Confidence (I-III) - how well we found relevant evidence
    let retrieval = 'III'
    if (sourceTypes >= 3 && (guidelineCredibility.topTier <= 2 || literatureCount >= 5)) {
      retrieval = 'I'
    } else if (sourceTypes >= 2 && (guidelinesCount >= 1 || literatureCount >= 3)) {
      retrieval = 'II'
    }

    // Agreement % - CONSERVATIVE: 100% should be nearly impossible
    // Base agreement starts at 40% (uncertainty is default)
    let agreement = 40

    // Guidelines add credibility - weighted by tier
    if (hasTier1Guidelines) {
      agreement += 15 + Math.min(10, guidelineCredibility.tierCounts[1] * 3) // Tier 1: up to +25
    } else if (guidelineCredibility.topTier <= 3) {
      agreement += 10 + Math.min(5, guidelinesCount * 2) // Tier 2-3: up to +15
    } else if (guidelinesCount >= 1) {
      agreement += 5 // Lower tier sources: +5
    }

    // Literature adds evidence - weighted by tier
    if (hasTier2Literature) {
      agreement += 10 + Math.min(10, literatureCount) // Peer-reviewed: up to +20
    } else if (literatureCount >= 10) {
      agreement += 12
    } else if (literatureCount >= 5) {
      agreement += 7
    } else if (literatureCount >= 1) {
      agreement += 3
    }

    // AI consensus - PENALIZED by hedging language
    // High hedging = AI models are uncertain = lower agreement
    const hedgingPenalty = Math.round(aiQuality.hedgingLevel * 10) // 0-10 point penalty
    const basseAIBonus = aiCount >= 4 ? 8 : aiCount >= 3 ? 5 : aiCount >= 2 ? 3 : 0
    const aiBonus = Math.max(0, basseAIBonus - hedgingPenalty)
    agreement += aiBonus

    // Cross-validation bonus (sources corroborate each other)
    if (sourceTypes >= 3) agreement += 10
    else if (sourceTypes >= 2) agreement += 5

    // NEW: Contradiction penalty - if AI models show contradictions
    if (aiQuality.hasContradictions) {
      agreement -= 5
    }

    // NEW: Evidence depth bonuses
    // Study design bonus (RCT/meta-analysis mentioned)
    if (hasSystematicReview) agreement += 8
    else if (hasRCTEvidence) agreement += 5
    else if (evidenceDepth.studyDesign.highestLevel <= 4) agreement += 2

    // Replication bonus
    if (isReplicated) agreement += 5
    else if (evidenceDepth.replication.status === 'preliminary') agreement -= 3

    // Sample size bonus
    if (evidenceDepth.sampleSize.hasVeryLargeSample) agreement += 4
    else if (hasLargeSample) agreement += 2

    // Duration bonus
    if (evidenceDepth.duration.hasVeryLongTerm) agreement += 3
    else if (evidenceDepth.duration.hasLongTerm) agreement += 1

    // Recency penalty for dated evidence
    if (evidenceDepth.recency.recencyCategory === 'dated') agreement -= 3
    else if (evidenceDepth.recency.recencyCategory === 'current') agreement += 2

    // Cap at 95% - true 100% requires established medical fact
    agreement = Math.min(95, Math.max(35, agreement))

    const sourcesUsed = [
      guidelines.available && 'Guidelines',
      literature.available && 'Literature',
      aiConsensus.available && 'AI'
    ].filter(Boolean)

    return {
      profile: { quality, retrieval, agreement },
      sources: {
        guidelines: {
          strength: guidelinesStrength,
          count: guidelinesCount,
          orgs: guidelines.organizations || [],
          credibility: guidelineCredibility
        },
        literature: {
          strength: literatureStrength,
          count: literatureCount,
          topCitations: literature.topCited?.[0]?.citations || 0,
          credibility: literatureCredibility
        },
        ai: {
          strength: aiStrength,
          count: aiCount,
          models: aiConsensus.providers?.map(p => p.name) || [],
          quality: aiQuality
        },
        crossValidation: { strength: crossValidationStrength, sources: sourcesUsed }
      },
      // Enhanced metrics for display
      credibilityProfile: {
        guidelinesTier: guidelineCredibility.topTier,
        literatureTier: literatureCredibility.topTier,
        totalWeight: guidelineCredibility.weightedScore + literatureCredibility.weightedScore,
        aiHedging: aiQuality.hedgingLevel,
        aiConfidence: aiQuality.modelConfidence,
        hasContradictions: aiQuality.hasContradictions
      },
      // NEW: Deep evidence analysis
      evidenceDepth: {
        depthScore: evidenceDepth.depthScore,
        depthCategory: evidenceDepth.depthCategory,
        studyDesign: {
          highestLevel: evidenceDepth.studyDesign.highestLevel,
          hasRCT: hasRCTEvidence,
          hasSystematicReview: hasSystematicReview,
          designs: evidenceDepth.studyDesign.designs.slice(0, 3)
        },
        sampleSize: {
          largest: evidenceDepth.sampleSize.largest,
          category: evidenceDepth.sampleSize.sampleCategory,
          hasLarge: hasLargeSample
        },
        duration: {
          longestMonths: evidenceDepth.duration.longestMonths,
          category: evidenceDepth.duration.durationCategory,
          hasLongTerm: evidenceDepth.duration.hasLongTerm
        },
        effectSize: {
          category: evidenceDepth.effectSize.category,
          hasQuantified: evidenceDepth.effectSize.hasQuantified
        },
        geography: {
          regions: evidenceDepth.geography.regions,
          isMultinational: evidenceDepth.geography.isMultinational,
          category: evidenceDepth.geography.diversityCategory
        },
        funding: {
          category: evidenceDepth.funding.category,
          independenceScore: evidenceDepth.funding.independenceScore
        },
        recency: {
          mostRecent: evidenceDepth.recency.mostRecent,
          category: evidenceDepth.recency.recencyCategory
        },
        replication: {
          status: evidenceDepth.replication.status,
          score: evidenceDepth.replication.score
        },
        endpoints: {
          category: evidenceDepth.endpoints.category,
          hasHard: evidenceDepth.endpoints.hasHard
        }
      },
      // Legacy - use profile format display, not these raw numbers
      total: agreement,
      score: agreement,
      level: quality === 'A' ? 'high' : quality === 'B' ? 'moderate' : 'limited',
      factors: [
        guidelinesCount > 0 && `Official guidelines (${guidelinesCount} sources${hasTier1Guidelines ? ', incl. Tier 1' : ''})`,
        literatureCount > 0 && `Research literature (${literatureCount} papers${hasTier2Literature ? ', incl. peer-reviewed' : ''})`,
        aiCount > 0 && `AI consensus (${aiCount} models${aiQuality.hedgingLevel > 0.3 ? ', high uncertainty' : ''})`,
        sourceTypes >= 2 && 'Cross-validated',
        aiQuality.hasContradictions && 'Contains contradictions',
        // NEW: Evidence depth factors
        hasSystematicReview && 'Systematic review/meta-analysis',
        hasRCTEvidence && !hasSystematicReview && 'RCT evidence cited',
        hasLargeSample && `Large sample (n=${evidenceDepth.sampleSize.largest.toLocaleString()})`,
        evidenceDepth.duration.hasVeryLongTerm && `Long-term follow-up (${evidenceDepth.duration.durationCategory})`,
        isReplicated && 'Replicated findings',
        evidenceDepth.replication.status === 'preliminary' && 'Preliminary evidence',
        evidenceDepth.geography.isMultinational && 'Multi-national research',
        evidenceDepth.funding.category === 'independent' && 'Independently funded',
        evidenceDepth.recency.category === 'dated' && 'Some dated sources'
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

  // Parse structured markdown sections from AI synthesis
  const parseSynthesisSections = (markdown) => {
    if (!markdown || typeof markdown !== 'string') {
      return { sections: {}, fullText: '', hasStructuredSections: false }
    }

    const sections = {}
    const lines = markdown.split('\n')
    let currentSection = null
    let currentContent = []

    // Known section headers from backend
    const SECTION_HEADERS = [
      'CONSENSUS', 'OFFICIAL GUIDANCE', 'SCIENTIFIC EVIDENCE',
      'AI MODEL PERSPECTIVES', 'DISCORDANCE', 'BOTTOM LINE'
    ]

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]

      // Check if this line is a main section header (## SECTION_NAME)
      const headerMatch = line.match(/^##\s+(.+)$/)
      if (headerMatch) {
        const headerText = headerMatch[1].trim().toUpperCase()

        // Save previous section if exists
        if (currentSection && currentContent.length > 0) {
          sections[currentSection] = currentContent.join('\n').trim()
        }

        // Check if this is a known section header
        const matchedSection = SECTION_HEADERS.find(h =>
          headerText.includes(h) || h.includes(headerText)
        )

        currentSection = matchedSection || headerText
        currentContent = []
      } else if (currentSection) {
        currentContent.push(line)
      } else {
        // Content before any section header (preamble)
        if (!sections['PREAMBLE']) sections['PREAMBLE'] = ''
        sections['PREAMBLE'] += line + '\n'
      }
    }

    // Save last section
    if (currentSection && currentContent.length > 0) {
      sections[currentSection] = currentContent.join('\n').trim()
    }

    // Clean up empty sections
    Object.keys(sections).forEach(key => {
      if (!sections[key] || sections[key].trim() === '') {
        delete sections[key]
      }
    })

    return {
      sections,
      fullText: markdown,
      hasStructuredSections: Object.keys(sections).length > 1
    }
  }

  // Generate patient-friendly summary - unified synthesis with agreement/disagreement
  const generatePatientSummary = () => {
    const integrated = generateIntegratedSynthesis()
    if (!integrated) return null

    let sections = []
    const aiContent = integrated.aiConsensus.synthesisContent || ''

    // Parse structured sections from new backend format
    const parsed = parseSynthesisSections(aiContent)
    const paragraphs = aiContent.split('\n\n').filter(p => p.trim())

    const guidelineCount = integrated.guidelines?.totalSources || 0
    const literatureCount = integrated.literature?.totalPapers || 0
    const aiCount = integrated.aiConsensus?.modelCount || 0
    const orgs = integrated.guidelines.available
      ? [...new Set(integrated.guidelines.sources?.map(s => extractOrgFromUrl(s.url)) || [])]
      : []

    // SECTION 1: Main Summary (unified synthesis)
    if (integrated.aiConsensus.available && (paragraphs.length > 0 || parsed.hasStructuredSections)) {
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

      let briefContent = ''
      let detailedContent = ''

      // Use parsed sections if available (new structured format)
      if (parsed.hasStructuredSections) {
        // BRIEF: Show CONSENSUS + BOTTOM LINE (For Patients)
        briefContent = intro

        if (parsed.sections['CONSENSUS']) {
          briefContent += '### What We Know\n\n' + parsed.sections['CONSENSUS'] + '\n\n'
        }

        // Extract "For Patients" from BOTTOM LINE
        const bottomLine = parsed.sections['BOTTOM LINE'] || ''
        const forPatientsMatch = bottomLine.match(/###\s*For Patients\s*([\s\S]*?)(?=###|$)/i)
        if (forPatientsMatch) {
          briefContent += '### What This Means For You\n\n' + forPatientsMatch[1].trim() + '\n\n'
        }

        // Extract Important Caveats
        const caveatsMatch = bottomLine.match(/###\s*Important Caveats\s*([\s\S]*?)(?=###|$)/i)
        if (caveatsMatch) {
          briefContent += '*' + caveatsMatch[1].trim().split('\n')[0] + '*\n\n'
        }

        briefContent += '*Click "More" for official guidance, research details, and source citations...*'

        // DETAILED: Show all sections with formatting
        detailedContent = intro

        // Consensus section
        if (parsed.sections['CONSENSUS']) {
          detailedContent += '### Consensus\n\n' + parsed.sections['CONSENSUS'] + '\n\n'
        }

        // Official Guidance section
        if (parsed.sections['OFFICIAL GUIDANCE']) {
          detailedContent += '---\n\n### Official Health Guidance\n\n' + parsed.sections['OFFICIAL GUIDANCE'] + '\n\n'
        }

        // Scientific Evidence section
        if (parsed.sections['SCIENTIFIC EVIDENCE']) {
          detailedContent += '---\n\n### Scientific Evidence\n\n' + parsed.sections['SCIENTIFIC EVIDENCE'] + '\n\n'
        }

        // AI Model Perspectives section
        if (parsed.sections['AI MODEL PERSPECTIVES']) {
          detailedContent += '---\n\n### AI Model Perspectives\n\n' + parsed.sections['AI MODEL PERSPECTIVES'] + '\n\n'
        }

        // Discordance section (only if there is discordance)
        if (parsed.sections['DISCORDANCE'] && !parsed.sections['DISCORDANCE'].toLowerCase().includes('no significant discordance')) {
          detailedContent += '---\n\n### Areas of Disagreement\n\n' + parsed.sections['DISCORDANCE'] + '\n\n'
        }

        // Bottom Line section
        if (parsed.sections['BOTTOM LINE']) {
          detailedContent += '---\n\n### Bottom Line\n\n' + parsed.sections['BOTTOM LINE'] + '\n\n'
        }

        // Add evidence quality assessment
        if (integrated.confidence) {
          detailedContent += '---\n\n### Evidence Quality\n\n'
          const conf = integrated.confidence
          detailedContent += `- **Grade:** ${conf.quality || 'D'} `
          if (conf.quality === 'A') detailedContent += '(High quality)\n'
          else if (conf.quality === 'B') detailedContent += '(Good quality)\n'
          else if (conf.quality === 'C') detailedContent += '(Moderate)\n'
          else detailedContent += '(Limited)\n'
          detailedContent += `- **Sources:** ${guidelineCount} guidelines, ${literatureCount} papers, ${aiCount} AI systems\n`
        }
      } else {
        // FALLBACK: Old format - use paragraph-based extraction
        const briefPoints = paragraphs.slice(0, 2).map(p => {
          const firstSentence = p.split(/[.!?](?:\s|$)/)[0]
          return `- ${firstSentence.trim()}`
        }).join('\n')
        briefContent = intro + briefPoints + '\n\n*Click "More" for detailed analysis including individual AI perspectives and evidence sources...*'

        // Detailed version - comprehensive deep dive
        detailedContent = intro + '### Summary\n\n' + paragraphs.join('\n\n')

        // Add individual AI model perspectives
        if (integrated.aiConsensus.providers && integrated.aiConsensus.providers.length > 0) {
          detailedContent += '\n\n---\n\n### What Individual AI Systems Said\n\n'
          integrated.aiConsensus.providers.forEach(provider => {
            const providerContent = provider.content || ''
            const sentences = providerContent.split(/[.!?](?:\s|$)/).filter(s => s.trim()).slice(0, 4)
            if (sentences.length > 0) {
              detailedContent += `**${provider.name}** (${provider.model || 'unknown model'}):\n`
              detailedContent += sentences.map(s => `> ${s.trim()}`).join('. ') + '.\n\n'
            }
          })
        }

        // Add guideline evidence snippets
        if (integrated.guidelines.available && integrated.guidelines.keyPoints?.length > 0) {
          detailedContent += '\n---\n\n### Evidence from Official Guidelines\n\n'
          integrated.guidelines.keyPoints.slice(0, 3).forEach(point => {
            if (point.text) {
              detailedContent += `**${point.source}:**\n> "${point.text.slice(0, 300)}${point.text.length > 300 ? '...' : ''}"\n\n`
            }
          })
        }

        // Add research findings
        if (integrated.literature.available && integrated.literature.researchFindings?.length > 0) {
          detailedContent += '\n---\n\n### Research Findings\n\n'
          integrated.literature.researchFindings.slice(0, 3).forEach(finding => {
            if (finding.text) {
              const citeInfo = finding.citations > 0 ? ` *(${finding.citations} citations)*` : ''
              detailedContent += `**${finding.title?.slice(0, 60) || 'Study'}**${citeInfo}:\n> "${finding.text.slice(0, 250)}${finding.text.length > 250 ? '...' : ''}"\n\n`
            }
          })
        }

        // Add evidence quality notes
        if (integrated.confidence) {
          detailedContent += '\n---\n\n### Evidence Quality Assessment\n\n'
          const conf = integrated.confidence
          detailedContent += `- **Evidence Grade:** ${conf.quality || 'D'} `
          if (conf.quality === 'A') detailedContent += '(High quality - systematic reviews/RCTs with official guidelines)\n'
          else if (conf.quality === 'B') detailedContent += '(Good quality - solid evidence with some limitations)\n'
          else if (conf.quality === 'C') detailedContent += '(Moderate - some evidence but not robust)\n'
          else detailedContent += '(Limited - primarily AI consensus without strong independent evidence)\n'

          detailedContent += `- **Sources Reviewed:** ${guidelineCount} official guidelines, ${literatureCount} research papers, ${aiCount} AI systems\n`

          if (conf.evidenceDepth) {
            const depth = conf.evidenceDepth
            if (depth.studyDesign?.hasRCT) detailedContent += '- **Study Design:** Includes randomized controlled trial evidence\n'
            if (depth.systematicReview?.hasMeta) detailedContent += '- **Meta-Analysis:** Systematic review with meta-analysis available\n'
            if (depth.sampleSize?.hasLargeSample) detailedContent += '- **Sample Size:** Large-scale studies (1000+ participants) referenced\n'
            if (depth.replication?.status === 'replicated') detailedContent += '- **Replication:** Findings have been replicated across studies\n'
          }
        }
      }

      sections.push({
        type: 'synthesis',
        icon: '💡',
        title: 'What You Should Know',
        briefContent,
        detailedContent,
        content: detailedContent,
        modelCount: aiCount,
        isPrimary: true,
        hasExpandedContent: true,
      })
    }

    // SECTION 2: Key Takeaways (agreement)
    let briefTakeaways = '**Important:** Always consult your healthcare provider for personalized advice.'
    let detailedTakeaways = ''
    if (guidelineCount >= 2 || literatureCount >= 2) {
      detailedTakeaways += '**The evidence agrees on:**\n'
      detailedTakeaways += '- Multiple sources have been reviewed and synthesized above\n'
      if (guidelineCount >= 2) {
        detailedTakeaways += `- Official guidance is available from ${orgs.slice(0, 3).join(', ')}\n`
      }
      if (literatureCount >= 3) {
        detailedTakeaways += `- Scientific research supports these recommendations\n`
      }
    }

    detailedTakeaways += '\n**Important notes:**\n'
    detailedTakeaways += '- This is for educational purposes - always consult your healthcare provider\n'
    detailedTakeaways += '- Individual circumstances may vary\n'
    detailedTakeaways += '- New research may update current recommendations\n'
    detailedTakeaways += '- Consider discussing multiple treatment options with your doctor\n'

    sections.push({
      type: 'takeaways',
      icon: '✅',
      title: 'Key Points',
      briefContent: briefTakeaways,
      detailedContent: detailedTakeaways,
      content: detailedTakeaways,
    })

    // SECTION 3: Sources
    const briefSourceLinks = []
    const detailedSourceLinks = []

    if (integrated.guidelines.available && integrated.guidelines.sources) {
      // Brief: top 3 sources
      const briefGuidelineLinks = integrated.guidelines.sources.slice(0, 3).map(s =>
        `- [${s.title}](${s.url}) *(${extractOrgFromUrl(s.url)})*`
      ).join('\n')
      briefSourceLinks.push(`**Official Guidelines:**\n${briefGuidelineLinks}`)

      // Detailed: all sources with more info
      const detailedGuidelineLinks = integrated.guidelines.sources.slice(0, 8).map(s =>
        `- [${s.title}](${s.url}) *(${extractOrgFromUrl(s.url)})*`
      ).join('\n')
      detailedSourceLinks.push(`**Official Guidelines:**\n${detailedGuidelineLinks}`)
    }

    if (integrated.literature.available && integrated.literature.sources) {
      // Brief: top 3 research papers
      const briefResearchLinks = integrated.literature.sources.slice(0, 3).map(s => {
        const cites = s.cited_by > 0 ? ` *(${s.cited_by} citations)*` : ''
        return `- [${s.title}](${s.url})${cites}`
      }).join('\n')
      briefSourceLinks.push(`**Research:**\n${briefResearchLinks}`)

      // Detailed: all papers with citations
      const detailedResearchLinks = integrated.literature.sources.slice(0, 8).map(s => {
        const cites = s.cited_by > 0 ? ` *(${s.cited_by} citations)*` : ''
        return `- [${s.title}](${s.url})${cites}`
      }).join('\n')
      detailedSourceLinks.push(`**Research:**\n${detailedResearchLinks}`)
    }

    if (briefSourceLinks.length > 0 || detailedSourceLinks.length > 0) {
      sections.push({
        type: 'sources',
        icon: '📚',
        title: 'Sources',
        briefContent: briefSourceLinks.join('\n\n') + '\n\n*Show more for complete source list...*',
        detailedContent: detailedSourceLinks.join('\n\n'),
        content: detailedSourceLinks.join('\n\n'),
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

    // Parse structured sections from new backend format
    const parsed = parseSynthesisSections(aiContent)

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
    if (integrated.aiConsensus.available && (aiContent || parsed.hasStructuredSections)) {
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

      let briefContent = ''
      let detailedContent = ''

      // Use parsed sections if available (new structured format)
      if (parsed.hasStructuredSections) {
        // BRIEF: Show CONSENSUS + BOTTOM LINE (For Clinicians)
        briefContent = synthesisIntro

        if (parsed.sections['CONSENSUS']) {
          briefContent += '**Consensus:**\n\n' + parsed.sections['CONSENSUS'] + '\n\n'
        }

        // Extract "For Clinicians" from BOTTOM LINE
        const bottomLine = parsed.sections['BOTTOM LINE'] || ''
        const forCliniciansMatch = bottomLine.match(/###\s*For Clinicians\s*([\s\S]*?)(?=###|$)/i)
        if (forCliniciansMatch) {
          briefContent += '**Clinical Implications:**\n\n' + forCliniciansMatch[1].trim() + '\n\n'
        }

        briefContent += '*Click "More" for official guidance, evidence details, and full analysis...*'

        // DETAILED: Show all sections with professional formatting
        detailedContent = synthesisIntro

        // Consensus
        if (parsed.sections['CONSENSUS']) {
          detailedContent += '**Consensus:**\n\n' + parsed.sections['CONSENSUS'] + '\n\n'
        }

        // Official Guidance
        if (parsed.sections['OFFICIAL GUIDANCE']) {
          detailedContent += '---\n\n### Official Clinical Guidelines\n\n' + parsed.sections['OFFICIAL GUIDANCE'] + '\n\n'
        }

        // Scientific Evidence
        if (parsed.sections['SCIENTIFIC EVIDENCE']) {
          detailedContent += '---\n\n### Evidence Base\n\n' + parsed.sections['SCIENTIFIC EVIDENCE'] + '\n\n'
        }

        // AI Model Perspectives
        if (parsed.sections['AI MODEL PERSPECTIVES']) {
          detailedContent += '---\n\n### AI Model Perspectives\n\n' + parsed.sections['AI MODEL PERSPECTIVES'] + '\n\n'
        }

        // Discordance (only if significant)
        if (parsed.sections['DISCORDANCE'] && !parsed.sections['DISCORDANCE'].toLowerCase().includes('no significant discordance')) {
          detailedContent += '---\n\n### Points of Discordance\n\n' + parsed.sections['DISCORDANCE'] + '\n\n'
        }

        // Bottom Line
        if (parsed.sections['BOTTOM LINE']) {
          detailedContent += '---\n\n### Bottom Line\n\n' + parsed.sections['BOTTOM LINE'] + '\n\n'
        }
      } else {
        // FALLBACK: Old format
        briefContent = synthesisIntro
        const sentences = aiContent.split(/[.!?](?:\s|$)/).filter(s => s.trim() && !s.startsWith('##')).slice(0, 4)
        briefContent += sentences.join('. ') + '.\n\n'
        briefContent += '*Click "More" for detailed analysis...*'

        detailedContent = synthesisIntro + aiContent
      }

      sections.push({
        type: 'synthesis',
        title: 'Evidence Synthesis',
        subtitle: 'Unified summary from authorities, research, and AI',
        briefContent,
        detailedContent,
        content: detailedContent,
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

  // Chorus renders a unified single-page UI with CSS-driven state transitions
  // States: initial (centered), typing (slides up), searching (loading), results (showing)
  if (isChorus) {
    const hasResults = synthesis || responses.length > 0
    // Include clarifyConvo state - when there's a clarification conversation active
    const hasClarifyConversation = clarification && clarifyConvo.length > 0
    const isSearching = loading || clarifying || hasClarifyConversation
    const isTyping = question.trim().length > 0 && !isSearching && !hasResults

    // Compute the UI state class
    let uiState = 'initial'
    if (hasResults) uiState = 'results'
    else if (isSearching) uiState = 'searching'
    else if (isTyping) uiState = 'typing'

    return (
      <div
        className={`chorus-unified chorus-${uiState}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Background image - always present */}
        <div className="chorus-bg-container">
          <img src="/images/login-bg.jpg" alt="" className="chorus-bg-image" />
          <div className="chorus-bg-overlay"></div>
        </div>

        {/* Main content wrapper - transforms based on state */}
        <div className="chorus-content-wrapper">
          {/* Hero section - shrinks and moves up as state changes */}
          <header className="chorus-hero">
            <div className="chorus-logo-area">
              <ChorusImageLogo size={uiState === 'initial' ? 72 : 40} withText={true} />
            </div>
            <h1 className="chorus-headline">Where AI Meets Evidence-Based Answers</h1>
            <p className="chorus-tagline">
              Ask any question. Get answers synthesized from multiple AI models,
              verified against official guidelines and peer-reviewed research.
            </p>
          </header>

          {/* Search section - always visible, stays in place */}
          <section className="chorus-search-section">
            <form onSubmit={handleSubmit} className="chorus-search-form">
              <div className={`chorus-search-box ${isDragging ? 'dragging' : ''}`}>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e)
                    }
                  }}
                  placeholder="Ask any question, or drop in a file..."
                  className="chorus-search-input"
                  rows={2}
                />
                <button
                  type="submit"
                  disabled={loading || clarifying || !question.trim()}
                  className="chorus-search-btn"
                >
                  {(loading || clarifying) ? (
                    <span className="chorus-btn-loading">
                      <span className="chorus-spinner"></span>
                    </span>
                  ) : (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/>
                      <path d="m21 21-4.35-4.35"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* Attached files chips */}
              {(attachedFiles.length > 0 || uploadingFile) && (
                <div className="chorus-attached-files">
                  {uploadingFile && (
                    <span className="chorus-file-chip uploading">
                      <span className="chorus-spinner-small"></span>
                      Uploading...
                    </span>
                  )}
                  {attachedFiles.map(f => (
                    <span key={f.file_id} className="chorus-file-chip" title={`${f.extracted_chars} characters extracted`}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                      </svg>
                      {f.filename.length > 20 ? f.filename.slice(0, 17) + '...' : f.filename}
                      <button
                        type="button"
                        className="chorus-file-remove"
                        onClick={() => removeAttachedFile(f.file_id)}
                        aria-label="Remove file"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </form>

            {/* Sample questions - fade out when not initial */}
            <div className="chorus-sample-questions">
              <span className="sample-label">Try asking:</span>
              <div className="sample-list">
                {exampleQuestions.map((q, i) => (
                  <button key={i} onClick={() => setQuestion(q)} className="sample-btn">
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Trust indicators - fade out when not initial */}
            <div className="chorus-trust-row">
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
                <span>Evidence-Based</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>Real-Time</span>
              </div>
              <div className="trust-item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                  <circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span>Multi-AI</span>
              </div>
            </div>

            {/* Provider chips - visible when typing/searching/results */}
            <div className="chorus-providers-row">
              <span className="providers-label">Synthesizing from:</span>
              {providers.map(p => (
                <span key={p} className="provider-chip" style={{
                  borderColor: PROVIDER_COLORS[p.charAt(0).toUpperCase() + p.slice(1)] || '#64748b'
                }}>
                  {p}
                </span>
              ))}
              <span className="provider-chip evidence-chip">+ Evidence</span>
            </div>
          </section>

          {/* Results area - slides in from below */}
          <main className="chorus-results-area">

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
                            type="button"
                            className="evidence-info-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              setShowEvidenceInfo(true)
                            }}
                            title="What does this mean?"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      <button
                        className="summary-depth-toggle"
                        onClick={() => setShowDetailedSummary(!showDetailedSummary)}
                        title={showDetailedSummary ? 'Show brief summary' : 'Show detailed summary'}
                      >
                        {showDetailedSummary ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                            </svg>
                            Brief
                          </>
                        ) : (
                          <>
                            More
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                            </svg>
                          </>
                        )}
                      </button>
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
                            >{showDetailedSummary ? (section.detailedContent || section.content) : (section.briefContent || section.content)}</ReactMarkdown>
                          </div>
                        </div>
                      ))}
                      {patientSummary.confidence && (
                        <EvidenceProfilePanel confidence={patientSummary.confidence} />
                      )}
                      {conflictAnalysis && (
                        <ConflictPanel analysis={conflictAnalysis} showAuditLog={false} />
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
                            type="button"
                            className="evidence-info-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              e.preventDefault()
                              setShowEvidenceInfo(true)
                            }}
                            title="What does this mean?"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      <button
                        className="summary-depth-toggle clinician-toggle"
                        onClick={() => setShowDetailedSummary(!showDetailedSummary)}
                        title={showDetailedSummary ? 'Show brief summary' : 'Show detailed summary'}
                      >
                        {showDetailedSummary ? (
                          <>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/>
                            </svg>
                            Brief
                          </>
                        ) : (
                          <>
                            More
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M5 12h14"/><path d="M12 5l7 7-7 7"/>
                            </svg>
                          </>
                        )}
                      </button>
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
                            >{showDetailedSummary ? (section.detailedContent || section.content) : (section.briefContent || section.content)}</ReactMarkdown>
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
                    {evidence.research && evidence.research.count > 0 && (
                      <EvidenceCardChorus
                        title="Scientific Literature"
                        subtitle="Peer-reviewed research from Google Scholar"
                        icon="🔬"
                        color="#0ea5e9"
                        data={evidence.research}
                        type="literature"
                      />
                    )}
                    {evidence.news && evidence.news.count > 0 && (
                      <EvidenceCardChorus
                        title="Health News"
                        subtitle="Recent credible health news and reporting"
                        icon="📰"
                        color="#8b5cf6"
                        data={evidence.news}
                        type="news"
                      />
                    )}
                    {evidence.patents && evidence.patents.count > 0 && (
                      <EvidenceCardChorus
                        title="Medical Patents"
                        subtitle="Emerging technologies from USPTO"
                        icon="💡"
                        color="#f59e0b"
                        data={evidence.patents}
                        type="patents"
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
        </div>

        {/* Speed Dial FAB */}
        <div className={`speed-dial-container ${speedDialOpen ? 'open' : ''}`}>
          {/* Speed Dial Actions */}
          <div className={`speed-dial-actions ${speedDialOpen ? 'visible' : ''}`}>
            {/* Upload Document Action */}
            <button
              className="speed-dial-action"
              onClick={() => {
                fileInputRef.current?.click()
                setSpeedDialOpen(false)
              }}
              title="Upload Document"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="12" y1="18" x2="12" y2="12"/>
                <line x1="9" y1="15" x2="12" y2="12"/>
                <line x1="15" y1="15" x2="12" y2="12"/>
              </svg>
              <span className="speed-dial-label">Upload</span>
            </button>

            {/* Ask Follow-up Action */}
            <button
              className={`speed-dial-action ${!synthesis ? 'disabled' : ''}`}
              onClick={() => {
                if (!synthesis) return
                setSpeedDialOpen(false)
                setFollowUpOpen(true)
                setTimeout(() => followUpRef.current?.focus(), 100)
              }}
              title={synthesis ? "Ask Follow-up" : "Search first to ask follow-up"}
              disabled={!synthesis}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="speed-dial-label">Follow-up</span>
            </button>

            {/* Clear Context (when there are attached files) */}
            {attachedFiles.length > 0 && (
              <button
                className="speed-dial-action danger"
                onClick={() => {
                  attachedFiles.forEach(f => removeAttachedFile(f.file_id))
                  setSpeedDialOpen(false)
                }}
                title="Clear Files"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                <span className="speed-dial-label">Clear Files</span>
              </button>
            )}
          </div>

          {/* Follow-up Panel (shown when followUpOpen is true) */}
          {followUpOpen && (
            <div className="follow-up-panel glass-card">
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

          {/* Main Speed Dial Button */}
          <button
            className={`speed-dial-fab ${speedDialOpen ? 'active' : ''} ${followUpOpen ? 'hidden' : ''}`}
            onClick={() => setSpeedDialOpen(!speedDialOpen)}
            aria-label="Open actions menu"
          >
            {speedDialOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {/* Sparkles/magic wand icon */}
                <path d="M12 3v1m0 16v1m-9-9h1m16 0h1m-2.636-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l.707.707"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>

        {/* Footer */}
        <footer className="chorus-footer">
          <div className="chorus-footer-content">
            <p>Chorus synthesizes evidence from multiple AI models and authoritative sources.</p>
            <p className="chorus-disclaimer">Always consult with a qualified professional for important decisions.</p>
          </div>
          {hasResults && (
            <button
              className="chorus-new-search-btn"
              onClick={() => {
                setQuestion('')
                setSynthesis(null)
                setResponses([])
                setEvidence(null)
                setError(null)
                setClarification(null)
                setClarifyConvo([])
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              New Search
            </button>
          )}
          <ViewResultsLink />
        </footer>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".pdf,.docx,.txt,.xml,.json,.md"
          onChange={(e) => handleFileUpload(Array.from(e.target.files))}
          style={{ display: 'none' }}
        />
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
      if (l.url && l.url.includes('cdc.gov')) org = 'CDC'
      else if (l.url && l.url.includes('who.int')) org = 'WHO'
      else if (l.url && l.url.includes('fda.gov')) org = 'FDA'
      else if (l.url && l.url.includes('nih.gov')) org = 'NIH'
      else if (l.url && l.url.includes('heart.org')) org = 'AHA'
      else if (l.url && l.url.includes('cancer.org')) org = 'ACS'
      else if (l.url && l.url.includes('acog.org')) org = 'ACOG'
      else if (l.url && l.url.includes('aap.org')) org = 'AAP'
      if (!orgMap[org]) orgMap[org] = 0
      orgMap[org]++
    })

    const orgs = Object.keys(orgMap).filter(o => o !== 'Other')

    // Extract key topics from titles
    const topics = links.slice(0, 5).map(l => {
      // Clean up the title to extract the main topic
      const title = (l.title || '')
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
    } else if (type === 'news') {
      // News summary with credibility info
      const credibleCount = links.filter(l =>
        l.credibility_tier === 'highly_credible' || l.credibility_tier === 'credible'
      ).length
      let summary = `**${count} news articles** provide recent reporting on this topic`
      if (credibleCount > 0) {
        summary += ` (${credibleCount} from credible medical sources)`
      }
      summary += '.\n\n'
      summary += '**Recent coverage includes:**\n'
      topics.slice(0, 3).forEach(t => {
        summary += `- ${t}\n`
      })
      return summary
    } else if (type === 'patents') {
      // Patents summary
      const recentCount = links.filter(l => l.status === 'recent').length
      let summary = `**${count} medical patents** show innovation in this area`
      if (recentCount > 0) {
        summary += ` (${recentCount} recently granted)`
      }
      summary += '.\n\n'
      summary += '**Recent inventions include:**\n'
      topics.slice(0, 3).forEach(t => {
        summary += `- ${t}\n`
      })
      return summary
    } else {
      // Literature (default)
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

        {/* Credibility breakdown for news */}
        {type === 'news' && data.by_credibility_tier && (
          <div className="credibility-breakdown">
            <h4>Source Credibility</h4>
            <div className="cred-tags">
              {data.by_credibility_tier.highly_credible?.length > 0 && (
                <span className="cred-tag tier-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {data.by_credibility_tier.highly_credible.length} Highly Credible
                </span>
              )}
              {data.by_credibility_tier.credible?.length > 0 && (
                <span className="cred-tag tier-2">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  {data.by_credibility_tier.credible.length} Credible
                </span>
              )}
              {data.by_credibility_tier.general?.length > 0 && (
                <span className="cred-tag tier-3">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
                  </svg>
                  {data.by_credibility_tier.general.length} General
                </span>
              )}
            </div>
          </div>
        )}

        {/* Patent notice and relevance breakdown */}
        {type === 'patents' && (
          <div className="patent-section">
            <div className="patent-notice">
              Patents represent innovations, not proven treatments. Consult clinical evidence before considering any treatment.
            </div>
            {data.by_clinical_relevance && (
              <div className="relevance-breakdown">
                {data.by_clinical_relevance.high?.length > 0 && (
                  <span className="relevance-tag high">
                    {data.by_clinical_relevance.high.length} High Relevance
                  </span>
                )}
                {data.by_clinical_relevance.moderate?.length > 0 && (
                  <span className="relevance-tag moderate">
                    {data.by_clinical_relevance.moderate.length} Moderate
                  </span>
                )}
              </div>
            )}
          </div>
        )}

        {/* All sources - visible and scrollable */}
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
                      {/* News source and credibility */}
                      {type === 'news' && link.source && (
                        <span className="news-source">{link.source}</span>
                      )}
                      {type === 'news' && link.credibility_tier && (
                        <span className={`cred-badge ${link.credibility_tier}`}>
                          {link.credibility_tier === 'highly_credible' ? 'Verified' :
                           link.credibility_tier === 'credible' ? 'Credible' : 'General'}
                        </span>
                      )}
                      {/* Patent assignee and status */}
                      {type === 'patents' && link.assignee && (
                        <span className="patent-assignee">{link.assignee}</span>
                      )}
                      {type === 'patents' && link.status_description && (
                        <span className={`patent-status ${link.status}`}>
                          {link.status_description}
                        </span>
                      )}
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

  /* ===== GLOBAL MOBILE & IFRAME FIXES ===== */
  html {
    /* Ensure proper text sizing on mobile - prevents tiny text */
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
    /* Smooth scrolling */
    scroll-behavior: smooth;
  }

  body {
    /* Base font size for mobile readability */
    font-size: 16px;
    line-height: 1.5;
    /* Prevent horizontal scroll */
    overflow-x: hidden;
    /* For iframe compatibility */
    min-height: 100%;
    min-height: 100dvh;
    margin: 0;
    padding: 0;
  }

  /* Iframe detection and fixes */
  @media (max-width: 768px) {
    html, body {
      /* Ensure full height in iframes */
      height: 100%;
      min-height: 100%;
      /* Prevent zoom issues */
      touch-action: manipulation;
    }
  }

  /* ===== PRISM STYLES ===== */
  .prism-app {
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
    position: relative;
    overflow-x: hidden;
    color: #e2e8f0;
  }

  /* Prism Animated Background - Purple/Indigo theme */
  .prism-bg {
    position: absolute; /* Changed from fixed for iframe compatibility */
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

  /* ===== CHORUS UNIFIED LAYOUT ===== */
  /* Single-page layout with CSS-driven state transitions */

  .chorus-unified {
    min-height: 100%;
    min-height: 100dvh;
    position: relative;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
  }

  /* Background - always present */
  .chorus-bg-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .chorus-bg-container .chorus-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .chorus-bg-container .chorus-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.85) 0%,
      rgba(26, 26, 46, 0.80) 50%,
      rgba(15, 23, 42, 0.85) 100%
    );
    transition: background 0.5s ease;
  }

  /* Darken overlay when showing results */
  .chorus-results .chorus-bg-container .chorus-bg-overlay,
  .chorus-searching .chorus-bg-container .chorus-bg-overlay {
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.94) 0%,
      rgba(26, 26, 46, 0.92) 50%,
      rgba(15, 23, 42, 0.94) 100%
    );
  }

  /* Content wrapper - transforms based on state */
  .chorus-content-wrapper {
    position: relative;
    z-index: 1;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem;
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* When typing/searching/results - move content up */
  .chorus-typing .chorus-content-wrapper,
  .chorus-searching .chorus-content-wrapper,
  .chorus-results .chorus-content-wrapper {
    justify-content: flex-start;
    padding-top: 1.5rem;
  }

  /* Hero section - shrinks and fades based on state */
  .chorus-hero {
    text-align: center;
    margin-bottom: 2rem;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .chorus-logo-area {
    margin-bottom: 1rem;
    transition: all 0.3s ease;
  }

  .chorus-headline {
    font-size: 2.25rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 0.75rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
    transition: all 0.4s ease;
  }

  .chorus-tagline {
    font-size: 1rem;
    color: #94a3b8;
    margin: 0;
    line-height: 1.5;
    max-width: 500px;
    margin: 0 auto;
    transition: all 0.4s ease;
  }

  /* When typing/searching/results - shrink hero */
  .chorus-typing .chorus-hero,
  .chorus-searching .chorus-hero,
  .chorus-results .chorus-hero {
    margin-bottom: 1rem;
  }

  .chorus-typing .chorus-headline,
  .chorus-searching .chorus-headline,
  .chorus-results .chorus-headline {
    font-size: 0;
    margin: 0;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  .chorus-typing .chorus-tagline,
  .chorus-searching .chorus-tagline,
  .chorus-results .chorus-tagline {
    font-size: 0;
    margin: 0;
    opacity: 0;
    height: 0;
    overflow: hidden;
  }

  /* Search section - always visible */
  .chorus-search-section {
    width: 100%;
    max-width: 600px;
    margin: 0 auto 1.5rem;
    transition: all 0.3s ease;
  }

  .chorus-search-form {
    width: 100%;
  }

  .chorus-search-box {
    display: flex;
    gap: 0.75rem;
    background: rgba(30, 41, 59, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 0.75rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
    transition: all 0.2s ease;
  }

  .chorus-search-box:focus-within {
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 8px 32px rgba(6, 182, 212, 0.15);
  }

  .chorus-search-box.dragging {
    border-color: rgba(6, 182, 212, 0.6);
    background: rgba(6, 182, 212, 0.1);
  }

  .chorus-search-input {
    flex: 1;
    background: transparent;
    border: none;
    padding: 0.75rem 1rem;
    font-size: 1.05rem;
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
  }

  .chorus-search-input::placeholder {
    color: #64748b;
  }

  .chorus-search-input:focus {
    outline: none;
  }

  .chorus-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;
    flex-shrink: 0;
  }

  .chorus-search-btn:hover:not(:disabled) {
    transform: scale(1.05);
    box-shadow: 0 4px 16px rgba(6, 182, 212, 0.4);
  }

  .chorus-search-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Sample questions - fade out when not initial */
  .chorus-sample-questions {
    margin-top: 1.25rem;
    text-align: center;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-sample-questions,
  .chorus-searching .chorus-sample-questions,
  .chorus-results .chorus-sample-questions {
    opacity: 0;
    height: 0;
    margin: 0;
    overflow: hidden;
    pointer-events: none;
  }

  .sample-label {
    display: block;
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 0.75rem;
  }

  .sample-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem;
  }

  .sample-btn {
    padding: 0.5rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    color: #94a3b8;
    font-size: 0.85rem;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
  }

  .sample-btn:hover {
    background: rgba(6, 182, 212, 0.15);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  /* Trust row - fade out when not initial */
  .chorus-trust-row {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    margin-top: 1.5rem;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-trust-row,
  .chorus-searching .chorus-trust-row,
  .chorus-results .chorus-trust-row {
    opacity: 0;
    height: 0;
    margin: 0;
    overflow: hidden;
  }

  .chorus-trust-row .trust-item {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    color: #94a3b8;
    font-size: 0.85rem;
  }

  .chorus-trust-row .trust-item svg {
    color: #06b6d4;
    opacity: 0.8;
  }

  /* Providers row - visible when typing/searching/results */
  .chorus-providers-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
    opacity: 0;
    height: 0;
    overflow: hidden;
    transition: all 0.4s ease;
  }

  .chorus-typing .chorus-providers-row,
  .chorus-searching .chorus-providers-row,
  .chorus-results .chorus-providers-row {
    opacity: 1;
    height: auto;
    margin-top: 1rem;
  }

  .providers-label {
    font-size: 0.75rem;
    color: #64748b;
  }

  .provider-chip {
    padding: 0.25rem 0.625rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 12px;
    font-size: 0.7rem;
    color: #94a3b8;
    border-left-width: 2px;
  }

  .evidence-chip {
    background: rgba(6, 182, 212, 0.1);
    border-color: rgba(6, 182, 212, 0.3);
    color: #06b6d4;
  }

  /* Results area */
  .chorus-results-area {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    opacity: 0;
    transform: translateY(20px);
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    pointer-events: none;
  }

  .chorus-searching .chorus-results-area,
  .chorus-results .chorus-results-area {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  /* Attached files */
  .chorus-attached-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
    padding: 0 0.25rem;
  }

  /* New search button in footer */
  .chorus-new-search-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.5rem 1rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    color: #06b6d4;
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    margin-top: 0.75rem;
  }

  .chorus-new-search-btn:hover {
    background: rgba(6, 182, 212, 0.25);
    border-color: rgba(6, 182, 212, 0.5);
  }

  /* Mobile responsive */
  @media (max-width: 640px) {
    .chorus-content-wrapper {
      padding: 1.5rem 1rem;
    }

    .chorus-typing .chorus-content-wrapper,
    .chorus-searching .chorus-content-wrapper,
    .chorus-results .chorus-content-wrapper {
      padding-top: 1rem;
    }

    .chorus-headline {
      font-size: 1.75rem;
    }

    .chorus-tagline {
      font-size: 0.9rem;
    }

    .chorus-search-box {
      padding: 0.5rem;
    }

    .chorus-search-input {
      font-size: 1rem;
      padding: 0.5rem 0.75rem;
    }

    .chorus-search-btn {
      width: 44px;
      height: 44px;
    }

    .sample-list {
      gap: 0.375rem;
    }

    .sample-btn {
      padding: 0.375rem 0.75rem;
      font-size: 0.8rem;
    }

    .chorus-trust-row {
      flex-wrap: wrap;
      gap: 1rem;
    }

    .chorus-trust-row .trust-item {
      font-size: 0.8rem;
    }
  }

  /* Extra small screens and portrait mobile */
  @media (max-width: 400px) {
    .chorus-content-wrapper {
      padding: 1rem 0.75rem;
    }

    .chorus-headline {
      font-size: 1.5rem;
    }

    .chorus-tagline {
      font-size: 0.85rem;
    }

    .chorus-search-input {
      font-size: 16px; /* Prevent iOS zoom on focus */
    }

    .sample-btn {
      font-size: 0.75rem;
      padding: 0.3rem 0.6rem;
    }

    .chorus-trust-row {
      gap: 0.75rem;
    }

    .chorus-trust-row .trust-item {
      font-size: 0.75rem;
    }

    .provider-chip {
      font-size: 0.7rem;
      padding: 0.2rem 0.5rem;
    }
  }

  /* Portrait mobile - ensure good text sizing */
  @media (max-width: 480px) and (orientation: portrait) {
    .chorus-unified {
      font-size: 16px;
    }

    .chorus-headline {
      font-size: 1.5rem;
      line-height: 1.3;
    }

    .chorus-tagline {
      font-size: 0.875rem;
      line-height: 1.4;
    }

    .chorus-search-input {
      /* Prevent zoom on iOS when focusing input */
      font-size: 16px !important;
    }
  }

  /* ===== LEGACY: CHORUS LANDING PAGE (for backwards compat) ===== */
  .chorus-landing {
    min-height: 100%;
    min-height: 100dvh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .chorus-landing-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .landing-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .landing-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.85) 0%,
      rgba(26, 26, 46, 0.8) 50%,
      rgba(15, 23, 42, 0.85) 100%
    );
  }

  .chorus-landing-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 2rem;
    max-width: 700px;
    width: 100%;
  }

  .landing-logo-section {
    margin-bottom: 1.5rem;
  }

  .landing-headline {
    font-size: 2.5rem;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 1rem 0;
    line-height: 1.2;
    text-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
  }

  .landing-subheadline {
    font-size: 1.1rem;
    color: #94a3b8;
    margin: 0 0 2.5rem 0;
    line-height: 1.6;
    max-width: 560px;
  }

  .landing-search-wrapper {
    width: 100%;
    max-width: 560px;
    margin-bottom: 2.5rem;
  }

  .landing-search-box {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.2);
    border-radius: 16px;
    padding: 1.25rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
  }

  .landing-search-input {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 12px;
    padding: 1rem 1.25rem;
    font-size: 1.1rem;
    color: #f1f5f9;
    resize: none;
    font-family: inherit;
    line-height: 1.5;
    transition: all 0.2s ease;
  }

  .landing-search-input::placeholder {
    color: #64748b;
  }

  .landing-search-input:focus {
    outline: none;
    border-color: rgba(6, 182, 212, 0.5);
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
  }

  .landing-search-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.75rem;
    padding: 1rem 2rem;
    background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .landing-search-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(6, 182, 212, 0.4);
  }

  .landing-search-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .landing-trust-indicators {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1.5rem;
  }

  .landing-trust-indicators .trust-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #94a3b8;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .landing-trust-indicators .trust-item svg {
    color: #06b6d4;
  }

  /* Landing page responsive */
  @media (max-width: 640px) {
    .chorus-landing-content {
      padding: 1.5rem;
    }

    .landing-headline {
      font-size: 1.75rem;
    }

    .landing-subheadline {
      font-size: 1rem;
      margin-bottom: 2rem;
    }

    .landing-search-box {
      padding: 1rem;
    }

    .landing-search-input {
      font-size: 1rem;
      padding: 0.875rem 1rem;
    }

    .landing-search-btn {
      padding: 0.875rem 1.5rem;
      font-size: 1rem;
    }

    .landing-trust-indicators {
      flex-direction: column;
      gap: 1rem;
    }
  }

  /* ===== CHORUS MAIN APP ===== */
  .chorus-app {
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
    position: relative;
    overflow-x: hidden;
  }

  /* Background image for main app (same as landing for visual continuity) */
  .chorus-app-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .chorus-app-bg .chorus-bg-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  .chorus-app-bg .chorus-bg-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(12, 18, 34, 0.92) 0%,
      rgba(26, 26, 46, 0.88) 50%,
      rgba(15, 23, 42, 0.92) 100%
    );
  }

  /* Animated Background - fallback/alternative */
  .chorus-bg {
    position: absolute;
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

  /* Chorus Header - compact results view */
  .chorus-header {
    position: relative;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(148, 163, 184, 0.1);
  }

  .chorus-brand {
    display: flex;
    align-items: center;
    gap: 0.75rem;
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

  /* New search button in header */
  .chorus-new-search-btn {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 8px;
    color: #06b6d4;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .chorus-new-search-btn:hover {
    background: rgba(6, 182, 212, 0.25);
    border-color: rgba(6, 182, 212, 0.5);
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
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1.5rem 1.5rem 2rem;
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

  /* Summary Depth Toggle */
  .summary-depth-toggle {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 500;
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1rem;
    background: rgba(255, 255, 255, 0.05);
    color: #94a3b8;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .summary-depth-toggle:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.25);
    color: #e2e8f0;
  }

  .summary-depth-toggle svg {
    flex-shrink: 0;
  }

  /* Patient view toggle styling */
  .patient-summary .summary-depth-toggle {
    background: rgba(34, 197, 94, 0.1);
    border-color: rgba(34, 197, 94, 0.25);
    color: #86efac;
  }

  .patient-summary .summary-depth-toggle:hover {
    background: rgba(34, 197, 94, 0.2);
    border-color: rgba(34, 197, 94, 0.4);
    color: #bbf7d0;
  }

  /* Clinician view toggle styling */
  .clinician-toggle {
    background: rgba(59, 130, 246, 0.1);
    border-color: rgba(59, 130, 246, 0.25);
    color: #93c5fd;
  }

  .clinician-toggle:hover {
    background: rgba(59, 130, 246, 0.2);
    border-color: rgba(59, 130, 246, 0.4);
    color: #bfdbfe;
  }

  /* References Section */
  .chorus-references-section .glass-card {
    padding: 0;
    display: flex;
    flex-direction: column;
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

  /* Drag-drop textarea styling */
  .chorus-input-wrapper.dragging {
    border: 2px dashed #06b6d4;
    background: rgba(6, 182, 212, 0.1);
    border-radius: 12px;
  }

  .chorus-input-wrapper.dragging .chorus-textarea {
    background: transparent;
    border-color: transparent;
  }

  /* Attached files chips */
  .chorus-attached-files {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }

  .chorus-file-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.375rem;
    padding: 0.375rem 0.625rem;
    background: rgba(6, 182, 212, 0.15);
    border: 1px solid rgba(6, 182, 212, 0.3);
    border-radius: 20px;
    font-size: 0.8rem;
    color: #94a3b8;
    transition: all 0.2s ease;
  }

  .chorus-file-chip.uploading {
    background: rgba(245, 158, 11, 0.15);
    border-color: rgba(245, 158, 11, 0.3);
    color: #f59e0b;
  }

  .chorus-file-chip svg {
    flex-shrink: 0;
    opacity: 0.7;
  }

  .chorus-file-remove {
    display: flex;
    align-items: center;
    justify-content: center;
    background: transparent;
    border: none;
    color: #64748b;
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    margin-left: 0.125rem;
    transition: all 0.2s ease;
  }

  .chorus-file-remove:hover {
    background: rgba(239, 68, 68, 0.2);
    color: #ef4444;
  }

  .chorus-spinner-small {
    width: 14px;
    height: 14px;
    border: 2px solid rgba(245, 158, 11, 0.3);
    border-top-color: #f59e0b;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  /* Speed Dial FAB */
  .speed-dial-container {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.75rem;
    /* Iframe compatibility - ensure visibility */
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    will-change: transform;
  }

  /* Mobile iframe fix - use sticky positioning as fallback */
  @supports (-webkit-touch-callout: none) {
    /* iOS Safari specific */
    .speed-dial-container {
      position: fixed;
      position: -webkit-sticky;
    }
  }

  .speed-dial-actions {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 0.5rem;
    opacity: 0;
    transform: translateY(20px) scale(0.8);
    pointer-events: none;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .speed-dial-actions.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .speed-dial-action {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    background: rgba(30, 41, 59, 0.95);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    color: #e2e8f0;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
    white-space: nowrap;
  }

  .speed-dial-action:hover {
    background: rgba(51, 65, 85, 0.95);
    transform: translateX(-4px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
  }

  .speed-dial-action.danger:hover {
    background: rgba(127, 29, 29, 0.95);
    border-color: rgba(239, 68, 68, 0.3);
  }

  .speed-dial-action.disabled,
  .speed-dial-action:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .speed-dial-action.disabled:hover,
  .speed-dial-action:disabled:hover {
    transform: none;
    background: rgba(30, 41, 59, 0.95);
  }

  .speed-dial-label {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .speed-dial-fab {
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

  .speed-dial-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(6, 182, 212, 0.5);
  }

  .speed-dial-fab.active {
    background: linear-gradient(135deg, #64748b 0%, #475569 100%);
    box-shadow: 0 4px 15px rgba(100, 116, 139, 0.4);
    transform: rotate(45deg);
  }

  .speed-dial-fab.hidden {
    opacity: 0;
    pointer-events: none;
  }

  .speed-dial-fab svg {
    transition: transform 0.3s ease;
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

  /* Mobile adjustments for Speed Dial */
  @media (max-width: 480px) {
    .speed-dial-container {
      bottom: 1rem;
      right: 1rem;
      /* Ensure visibility in mobile iframes */
      position: fixed !important;
      z-index: 9999 !important;
    }

    .follow-up-panel {
      width: calc(100vw - 2rem); /* Full width minus margins */
      max-width: 340px;
      /* Position from right edge */
      position: relative;
      right: 0;
    }

    .speed-dial-fab {
      width: 52px;
      height: 52px;
      /* Ensure tap target is visible */
      min-width: 52px;
      min-height: 52px;
    }

    .speed-dial-action {
      padding: 0.625rem 0.875rem;
    }
  }

  /* Portrait mobile - extra adjustments */
  @media (max-width: 480px) and (orientation: portrait) {
    .speed-dial-container {
      bottom: 1.5rem;
      right: 1rem;
    }

    .speed-dial-fab {
      width: 56px;
      height: 56px;
      /* Add shadow for better visibility */
      box-shadow: 0 4px 20px rgba(6, 182, 212, 0.5);
    }
  }

  /* Chorus Mobile Responsive */
  @media (max-width: 640px) {
    .chorus-main {
      padding: 0 1rem 1.5rem;
    }

    .chorus-header {
      padding: 1rem 1rem 1.5rem;
    }

    .chorus-brand {
      flex-direction: column;
      gap: 0.75rem;
      text-align: center;
    }

    .chorus-title {
      font-size: 1.75rem;
    }

    .chorus-tagline {
      font-size: 0.85rem;
    }

    .chorus-trust-badges {
      flex-wrap: wrap;
      justify-content: center;
    }

    .chorus-search-section {
      padding: 1rem;
    }

    .chorus-input-wrapper {
      flex-direction: column;
      gap: 0.75rem;
    }

    .chorus-submit-btn {
      width: 100%;
      justify-content: center;
    }

    .chorus-orb-1 {
      width: 300px;
      height: 300px;
      top: -100px;
      right: -100px;
    }

    .chorus-orb-2 {
      width: 250px;
      height: 250px;
      bottom: -75px;
      left: -75px;
    }

    .chorus-orb-3 {
      width: 150px;
      height: 150px;
    }
  }

  /* ===== PRISM STYLES (Original) ===== */
  .app-container {
    max-width: 1400px;
    margin: 0 auto;
    padding: 1.5rem;
    min-height: 100%;
    min-height: 100dvh; /* Dynamic viewport height - works in iframes */
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

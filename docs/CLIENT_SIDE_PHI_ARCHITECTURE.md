# Client-Side PHI Processing Architecture

## Overview

This document describes a privacy-preserving architecture that allows patients to upload health records (MyChart exports, CCD/CCDA, FHIR bundles) to Chorus **without sending PHI to the server**. All sensitive data stays on the user's machine - only de-identified clinical concepts are sent.

## Key Principle: Zero-Trust Architecture

```
[Patient Device]                              [Server]
     |                                            |
Upload CCD/PDF ──┐                                |
     |          |                                 |
     v          v                                 |
  Parse locally (Web Worker)                      |
     |                                            |
     v                                            |
  De-identify (strip names, dates, MRN)           |
     |                                            |
     v                                            |
  Store full PHI in IndexedDB (encrypted)         |
     |                                            |
     v                                            |
  Extract clinical concepts only ────────────────>| Enhanced query
     |                                            |     |
     |<───────────────────────────────────────────|─────┘
  Display personalized response                   |
```

**The server NEVER receives PHI.** Only standardized clinical codes (ICD-10, RxNorm, LOINC) are transmitted.

## Browser-Based Document Parsing

### Supported Libraries (All Client-Side)

| Format | Library | Size | Notes |
|--------|---------|------|-------|
| PDF | PDF.js | ~400KB | Mozilla's official library |
| DOCX | Mammoth.js | ~100KB | Lightweight, preserves structure |
| CCD/CCDA XML | Native DOMParser | 0KB | Built into browsers |
| FHIR JSON | Native JSON.parse | 0KB | Built into browsers |

### Installation

```bash
cd frontend
npm install pdfjs-dist mammoth idb
```

## De-Identification Strategy (HIPAA Safe Harbor)

### What Stays Local (Never Sent to Server)

- Patient names
- Dates of birth (exact)
- Medical Record Numbers (MRN)
- Addresses, phone numbers, email
- Social Security Numbers
- Provider names, facility names
- Account numbers
- Exact lab values (e.g., "HbA1c: 7.2%")
- Specific dosage instructions

### What Gets Sent to Server

```json
{
  "patientContext": {
    "ageRange": "45-54",
    "gender": "male"
  },
  "activeConditions": [
    {"name": "Type 2 Diabetes", "code": "E11", "codeSystem": "ICD-10-CM"},
    {"name": "Hypertension", "code": "I10", "codeSystem": "ICD-10-CM"}
  ],
  "currentMedications": [
    {"name": "Metformin", "code": "860975", "codeSystem": "RxNorm"},
    {"name": "Lisinopril", "code": "104383", "codeSystem": "RxNorm"}
  ],
  "allergyList": [
    {"substance": "Penicillin", "criticality": "high"}
  ],
  "recentLabs": [
    {"test": "Hemoglobin A1c", "code": "4548-4", "interpretation": "elevated"}
  ]
}
```

### De-Identification Functions

```javascript
// Age range instead of exact DOB
function calculateAgeRange(dob) {
  const age = calculateAge(dob);
  if (age < 18) return "under 18";
  if (age < 30) return "18-29";
  if (age < 45) return "30-44";
  if (age < 55) return "45-54";
  if (age < 65) return "55-64";
  if (age < 75) return "65-74";
  return "75+";
}

// Relative dates instead of exact dates
function relativizeDate(date) {
  const daysDiff = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
  if (daysDiff < 7) return "within past week";
  if (daysDiff < 30) return "within past month";
  if (daysDiff < 90) return "1-3 months ago";
  if (daysDiff < 180) return "3-6 months ago";
  if (daysDiff < 365) return "6-12 months ago";
  return "over 1 year ago";
}

// Lab interpretation instead of exact values
function categorizeLabValue(value, referenceRange) {
  if (value < referenceRange.low) return "low";
  if (value > referenceRange.high) return "elevated";
  return "normal";
}
```

## CCD/CCDA Parsing

CCD (Continuity of Care Document) is the standard format for MyChart exports.

```javascript
// Parse CCD/CCDA XML using native DOMParser
function parseCCD(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, 'text/xml');

  // CDA namespaces
  const ns = {
    cda: 'urn:hl7-org:v3',
    sdtc: 'urn:hl7-org:sdtc'
  };

  // Extract patient demographics
  const patient = extractPatientInfo(doc, ns);

  // Extract clinical sections by template ID
  return {
    patient: deidentifyPatient(patient),
    conditions: extractProblems(doc, ns),      // Template 2.16.840.1.113883.10.20.22.2.5.1
    medications: extractMedications(doc, ns),   // Template 2.16.840.1.113883.10.20.22.2.1.1
    allergies: extractAllergies(doc, ns),       // Template 2.16.840.1.113883.10.20.22.2.6.1
    procedures: extractProcedures(doc, ns),     // Template 2.16.840.1.113883.10.20.22.2.7.1
    results: extractResults(doc, ns),           // Template 2.16.840.1.113883.10.20.22.2.3.1
    immunizations: extractImmunizations(doc, ns) // Template 2.16.840.1.113883.10.20.22.2.2.1
  };
}

function extractProblems(doc, ns) {
  const problems = [];
  const section = doc.querySelector(
    'section templateId[root="2.16.840.1.113883.10.20.22.2.5.1"]'
  )?.closest('section');

  if (!section) return problems;

  section.querySelectorAll('entry act').forEach(entry => {
    const observation = entry.querySelector('entryRelationship observation');
    if (!observation) return;

    const value = observation.querySelector('value');
    const status = observation.querySelector('statusCode');

    problems.push({
      name: value?.getAttribute('displayName'),
      code: value?.getAttribute('code'),
      codeSystem: normalizeCodeSystem(value?.getAttribute('codeSystem')),
      status: status?.getAttribute('code') || 'active'
    });
  });

  return problems;
}

function normalizeCodeSystem(oid) {
  const codeSystemMap = {
    '2.16.840.1.113883.6.96': 'SNOMED-CT',
    '2.16.840.1.113883.6.90': 'ICD-10-CM',
    '2.16.840.1.113883.6.88': 'RxNorm',
    '2.16.840.1.113883.6.1': 'LOINC',
    '2.16.840.1.113883.6.12': 'CPT'
  };
  return codeSystemMap[oid] || oid;
}
```

## Local Storage with Encryption

Use IndexedDB with Web Crypto API encryption:

```javascript
import { openDB } from 'idb';

// Generate encryption key (stored in sessionStorage, not persisted)
async function getEncryptionKey() {
  let key = sessionStorage.getItem('phi_key');
  if (!key) {
    const cryptoKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    );
    const exported = await crypto.subtle.exportKey('raw', cryptoKey);
    key = btoa(String.fromCharCode(...new Uint8Array(exported)));
    sessionStorage.setItem('phi_key', key);
  }
  return key;
}

// Open database
async function openHealthDB() {
  return openDB('chorus-health-records', 1, {
    upgrade(db) {
      const store = db.createObjectStore('documents', { keyPath: 'id' });
      store.createIndex('uploadedAt', 'uploadedAt');
    }
  });
}

// Store encrypted document
async function storeDocument(document) {
  const db = await openHealthDB();
  const key = await getEncryptionKey();

  // Encrypt the PHI portion
  const encrypted = await encryptData(document.phi, key);

  await db.put('documents', {
    id: document.id,
    filename: document.filename,
    uploadedAt: Date.now(),
    expiresAt: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    encryptedPHI: encrypted,
    deidentifiedConcepts: document.concepts // Safe to store unencrypted
  });
}

// Auto-cleanup expired documents
async function cleanupExpired() {
  const db = await openHealthDB();
  const tx = db.transaction('documents', 'readwrite');
  const index = tx.store.index('uploadedAt');

  for await (const cursor of index.iterate()) {
    if (cursor.value.expiresAt < Date.now()) {
      await cursor.delete();
    }
  }
}
```

## React Component Structure

```
frontend/src/
  features/
    health-records/
      components/
        HealthRecordUpload.jsx    # Main upload modal
        FileDropzone.jsx          # Drag-and-drop area
        ParsingProgress.jsx       # Progress indicator
        ConceptPreview.jsx        # Preview extracted concepts
        PrivacyNotice.jsx         # Privacy explanation
        LocalRecordsList.jsx      # Manage stored records
      hooks/
        useHealthRecords.js       # IndexedDB management
        useDocumentParser.js      # Web Worker parsing
      utils/
        ccdParser.js              # CCD/CCDA parsing
        fhirParser.js             # FHIR bundle parsing
        pdfParser.js              # PDF text extraction
        deidentifier.js           # De-identification logic
      workers/
        parseWorker.js            # Web Worker for parsing
      index.js                    # Exports
```

## Backend Integration

### Enhanced Query Request

```python
# In llm_listener/api.py

class HealthContext(BaseModel):
    """De-identified health context from client."""
    patient_context: Optional[dict] = None
    active_conditions: Optional[list[dict]] = None
    current_medications: Optional[list[dict]] = None
    allergy_list: Optional[list[dict]] = None
    recent_labs: Optional[list[dict]] = None

class QueryRequest(BaseModel):
    question: str
    mode: str = "chorus"
    health_context: Optional[HealthContext] = None  # NEW
    # ... existing fields

@app.post("/api/query")
async def query_llms(request: QueryRequest):
    # Build enhanced prompt if health context provided
    if request.health_context:
        enhanced_question = build_health_context_prompt(
            request.question,
            request.health_context
        )
    else:
        enhanced_question = request.question

    # Continue with normal query flow...
```

### Privacy-Preserving Prompt Construction

```python
def build_health_context_prompt(question: str, health_context: HealthContext) -> str:
    """Build prompt that includes health context without PHI."""

    context_parts = []

    # Demographics (already de-identified)
    if health_context.patient_context:
        age = health_context.patient_context.get("ageRange", "adult")
        gender = health_context.patient_context.get("gender", "patient")
        context_parts.append(f"Patient is a {age} year old {gender}")

    # Conditions
    if health_context.active_conditions:
        conditions = [c["name"] for c in health_context.active_conditions[:10]]
        context_parts.append(f"Active conditions: {', '.join(conditions)}")

    # Medications
    if health_context.current_medications:
        meds = [m["name"] for m in health_context.current_medications[:10]]
        context_parts.append(f"Current medications: {', '.join(meds)}")

    # Allergies
    if health_context.allergy_list:
        allergies = [a["substance"] for a in health_context.allergy_list]
        context_parts.append(f"Known allergies: {', '.join(allergies)}")

    # Labs
    if health_context.recent_labs:
        labs = [f"{l['test']} ({l['interpretation']})" for l in health_context.recent_labs[:5]]
        context_parts.append(f"Recent labs: {', '.join(labs)}")

    context_text = "\n".join(f"- {part}" for part in context_parts)

    return f"""The patient has shared de-identified health context for personalized guidance:

{context_text}

Based on this patient's health profile and current medical evidence, please address:

{question}

IMPORTANT: This information is for educational purposes only. The patient should always consult their healthcare provider for medical advice."""
```

## Security Checklist

- [ ] All document parsing happens client-side only
- [ ] No PHI transmitted to server (verify in Network tab)
- [ ] IndexedDB encrypted with Web Crypto API
- [ ] Encryption keys stored in sessionStorage (cleared on tab close)
- [ ] Auto-expire local data after 24 hours
- [ ] No PHI in console.log statements
- [ ] No PHI in error messages sent to server
- [ ] HTTPS enforced
- [ ] Content Security Policy (CSP) headers set
- [ ] User consent before any upload
- [ ] Clear privacy notice displayed
- [ ] User can delete all local data
- [ ] No third-party analytics on health record pages

## Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| IndexedDB | Yes | Yes | Yes | Yes |
| Web Workers | Yes | Yes | Yes | Yes |
| Web Crypto | Yes | Yes | Yes | Yes |
| File API | Yes | Yes | Yes | Yes |

### Storage Limits

- Chrome/Edge: ~60% of disk space (typically 6GB+)
- Firefox: ~50% of disk (typically 2GB per origin)
- Safari: ~1GB, may be cleared after 7 days
- Mobile Safari: ~50MB persistent

## Implementation Phases

### Phase 1: MVP
- [ ] File upload UI (PDF, CCD/CCDA)
- [ ] Basic de-identification
- [ ] IndexedDB storage
- [ ] Enhanced query with health context
- [ ] Privacy notice

### Phase 2: Enhanced
- [ ] FHIR bundle support
- [ ] Web Worker background parsing
- [ ] Encryption of stored data
- [ ] Document preview
- [ ] Auto-expiry

### Phase 3: Advanced
- [ ] Mobile optimizations
- [ ] Multiple document management
- [ ] Selective concept sharing
- [ ] Export local data

## References

- [PDF.js](https://mozilla.github.io/pdf.js/)
- [Mammoth.js](https://github.com/mwilliamson/mammoth.js)
- [HL7 CDA R2 Implementation Guide](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=7)
- [HIPAA Safe Harbor De-identification](https://www.hhs.gov/hipaa/for-professionals/privacy/special-topics/de-identification/index.html)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

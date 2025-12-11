# MyChart Integration Options for Chorus

## Overview

This document explores options for enabling patients to connect their MyChart (Epic) health records to Chorus for personalized health queries. The goal is to allow patients to ask questions about their own health data in the context of medical literature and AI-synthesized evidence.

## Integration Approaches

### Option 1: SMART on FHIR (Recommended)

**SMART on FHIR** (Substitutable Medical Applications, Reusable Technologies) is the healthcare industry standard for third-party app integration with EHR systems.

#### How It Works

```
[Patient] -> [Chorus App] -> [Epic FHIR Server] -> [MyChart Data]
                |                    |
                v                    v
         OAuth2 Authorization   FHIR R4 Resources
```

1. Patient clicks "Connect MyChart" in Chorus
2. Redirected to Epic's authorization server
3. Patient logs into MyChart, approves data sharing
4. Chorus receives OAuth2 access token
5. Chorus queries FHIR API for patient data
6. Data used to personalize queries

#### Epic's FHIR APIs

| API | Data Available | Access Level |
|-----|----------------|--------------|
| Patient Access API | Full patient record | Patient-mediated |
| Provider Access API | Clinical data | Provider authorization |
| Payer Access API | Claims data | Payer authorization |

For Chorus, **Patient Access API** is the appropriate choice.

#### Available FHIR Resources

| Resource | Description | Use in Chorus |
|----------|-------------|---------------|
| Patient | Demographics | Personalization |
| Condition | Active/historical diagnoses | Context for queries |
| MedicationRequest | Current medications | Drug interaction context |
| Observation | Lab results, vitals | Trend analysis |
| AllergyIntolerance | Known allergies | Safety checks |
| Immunization | Vaccination history | Prevention queries |
| Procedure | Surgical history | Surgical context |
| DocumentReference | Clinical notes, reports | Deep context |

### Option 2: Apple Health / CommonHealth Bridge

For patients who sync MyChart to Apple Health or CommonHealth (Android):

```
[MyChart] -> [Apple Health] -> [Health Export] -> [Chorus]
```

- Requires patient to manually export data
- More privacy-preserving (patient controls export)
- Limited to data synced to health apps
- Cross-platform via standardized formats

### Option 3: Patient-Uploaded CCD/CCDA

Patients can download their health summary from MyChart:

```
[MyChart] -> [Download CCD] -> [Upload to Chorus] -> [Parse & Query]
```

- Available in all Epic MyChart portals
- Standard CCD/CCDA XML format
- No API integration required
- One-time snapshot (not live data)

## SMART on FHIR Implementation

### Prerequisites

1. **Register with Epic's App Orchard**
   - Apply at [open.epic.com](https://open.epic.com)
   - Complete security questionnaire
   - Obtain client credentials

2. **FHIR Endpoint Discovery**
   - Epic publishes endpoints per health system
   - Use Epic's endpoint directory or patient's health system URL

### OAuth2 Flow

```python
# Backend: SMART on FHIR Authorization

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Request
from fastapi.responses import RedirectResponse

router = APIRouter(prefix="/api/fhir")

# Epic SMART configuration
EPIC_AUTHORIZE_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/authorize"
EPIC_TOKEN_URL = "https://fhir.epic.com/interconnect-fhir-oauth/oauth2/token"
EPIC_FHIR_BASE = "https://fhir.epic.com/interconnect-fhir-oauth/api/FHIR/R4"

# Scopes for patient access
FHIR_SCOPES = [
    "patient/Patient.read",
    "patient/Condition.read",
    "patient/MedicationRequest.read",
    "patient/Observation.read",
    "patient/AllergyIntolerance.read",
    "launch/patient",
    "openid",
    "fhirUser",
]

@router.get("/connect")
async def initiate_fhir_connection(request: Request, iss: str = None):
    """Initiate SMART on FHIR connection."""
    # iss = FHIR server issuer URL (health system specific)

    state = generate_secure_state()

    # Store state and ISS for callback
    request.session["fhir_state"] = state
    request.session["fhir_iss"] = iss or EPIC_FHIR_BASE

    params = {
        "response_type": "code",
        "client_id": settings.EPIC_CLIENT_ID,
        "redirect_uri": f"{settings.API_URL}/api/fhir/callback",
        "scope": " ".join(FHIR_SCOPES),
        "state": state,
        "aud": iss or EPIC_FHIR_BASE,
    }

    auth_url = f"{EPIC_AUTHORIZE_URL}?{urlencode(params)}"
    return RedirectResponse(auth_url)


@router.get("/callback")
async def fhir_callback(request: Request, code: str, state: str):
    """Handle OAuth callback from Epic."""

    # Verify state
    if state != request.session.get("fhir_state"):
        raise HTTPException(400, "Invalid state")

    # Exchange code for token
    token_response = await exchange_code_for_token(code)

    # Store tokens securely (encrypted, session-based)
    request.session["fhir_access_token"] = token_response["access_token"]
    request.session["fhir_patient_id"] = token_response["patient"]

    # Redirect back to app
    return RedirectResponse(f"{settings.APP_URL}?fhir_connected=true")
```

### Fetching Patient Data

```python
from fhirclient import client
from fhirclient.models import patient, condition, medication, observation

class FHIRClient:
    """Client for fetching patient data via FHIR."""

    def __init__(self, access_token: str, fhir_base: str, patient_id: str):
        self.settings = {
            'app_id': 'chorus',
            'api_base': fhir_base,
        }
        self.client = client.FHIRClient(settings=self.settings)
        self.client.server.auth = {'access_token': access_token}
        self.patient_id = patient_id

    async def get_patient_summary(self) -> dict:
        """Fetch comprehensive patient summary."""

        summary = {
            'demographics': await self._get_demographics(),
            'conditions': await self._get_conditions(),
            'medications': await self._get_medications(),
            'allergies': await self._get_allergies(),
            'recent_labs': await self._get_recent_observations(),
        }

        return summary

    async def _get_conditions(self) -> list:
        """Fetch active conditions/diagnoses."""

        search = condition.Condition.where(struct={
            'patient': self.patient_id,
            'clinical-status': 'active',
        })

        results = search.perform_resources(self.client.server)

        return [
            {
                'code': c.code.coding[0].display if c.code else 'Unknown',
                'onset': str(c.onsetDateTime) if c.onsetDateTime else None,
                'status': c.clinicalStatus.coding[0].code if c.clinicalStatus else None,
            }
            for c in results
        ]

    async def _get_medications(self) -> list:
        """Fetch current medications."""

        from fhirclient.models import medicationrequest

        search = medicationrequest.MedicationRequest.where(struct={
            'patient': self.patient_id,
            'status': 'active',
        })

        results = search.perform_resources(self.client.server)

        return [
            {
                'medication': self._get_medication_name(m),
                'dosage': m.dosageInstruction[0].text if m.dosageInstruction else None,
                'prescriber': m.requester.display if m.requester else None,
            }
            for m in results
        ]
```

### Context Building for Queries

```python
def build_patient_context(patient_summary: dict) -> str:
    """Build patient context string for LLM queries."""

    context_parts = []

    # Demographics
    demo = patient_summary.get('demographics', {})
    if demo:
        context_parts.append(f"Patient: {demo.get('age', 'Unknown')} year old {demo.get('gender', 'patient')}")

    # Conditions
    conditions = patient_summary.get('conditions', [])
    if conditions:
        condition_list = ', '.join(c['code'] for c in conditions[:10])
        context_parts.append(f"Active conditions: {condition_list}")

    # Medications
    meds = patient_summary.get('medications', [])
    if meds:
        med_list = ', '.join(m['medication'] for m in meds[:10])
        context_parts.append(f"Current medications: {med_list}")

    # Allergies
    allergies = patient_summary.get('allergies', [])
    if allergies:
        allergy_list = ', '.join(a['substance'] for a in allergies)
        context_parts.append(f"Known allergies: {allergy_list}")

    return '\n'.join(context_parts)


async def query_with_patient_context(
    question: str,
    patient_summary: dict,
    include_disclaimer: bool = True
) -> str:
    """Enhance query with patient health context."""

    patient_context = build_patient_context(patient_summary)

    enhanced_prompt = f"""The patient has provided access to their health records. Here is relevant context:

{patient_context}

Based on this patient's health profile and current medical evidence, please address the following question:

{question}

{"IMPORTANT: This is for informational purposes only and does not constitute medical advice. Always consult with your healthcare provider." if include_disclaimer else ""}"""

    return enhanced_prompt
```

## Frontend Implementation

### Connect MyChart Component

```jsx
import React, { useState, useEffect } from 'react';

export function MyChartConnect({ onConnected }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [patientSummary, setPatientSummary] = useState(null);

  // Check for connection status on mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    const response = await fetch('/api/fhir/status');
    const data = await response.json();
    setIsConnected(data.connected);
    if (data.connected) {
      setPatientSummary(data.summary);
    }
  };

  const initiateConnection = () => {
    // Redirect to FHIR authorization
    window.location.href = '/api/fhir/connect';
  };

  const disconnect = async () => {
    await fetch('/api/fhir/disconnect', { method: 'POST' });
    setIsConnected(false);
    setPatientSummary(null);
  };

  if (isConnected) {
    return (
      <div className="mychart-connected">
        <div className="connection-status">
          <span className="status-icon">Connected to MyChart</span>
          <button onClick={disconnect}>Disconnect</button>
        </div>
        {patientSummary && (
          <div className="patient-summary">
            <h4>Your Health Context</h4>
            <p>{patientSummary.conditions?.length || 0} conditions</p>
            <p>{patientSummary.medications?.length || 0} medications</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mychart-connect">
      <h3>Connect Your Health Records</h3>
      <p>
        Connect your MyChart account to get personalized answers
        based on your health history.
      </p>
      <button
        onClick={initiateConnection}
        disabled={isLoading}
        className="connect-button"
      >
        {isLoading ? 'Connecting...' : 'Connect MyChart'}
      </button>
      <p className="privacy-note">
        Your data is encrypted and only used during your session.
        We never store your health records.
      </p>
    </div>
  );
}
```

## Privacy and Security Considerations

### Data Handling Principles

1. **Minimal Data Retention**
   - Health data processed in-memory only
   - No persistent storage of FHIR data
   - Tokens expire with session (24 hours max)

2. **Encryption**
   - All data in transit via TLS 1.3
   - Tokens encrypted at rest in session
   - No PHI in logs or analytics

3. **Access Controls**
   - Patient explicitly authorizes each connection
   - Granular scope selection
   - One-click disconnection

4. **Audit Trail**
   - Log authorization events (not data)
   - Track data access patterns
   - Support regulatory compliance

### HIPAA Compliance Checklist

- [ ] Business Associate Agreement (BAA) with hosting provider
- [ ] Encryption at rest and in transit
- [ ] Access logging and audit trails
- [ ] Minimum necessary data principle
- [ ] Patient authorization workflow
- [ ] Data breach notification procedures
- [ ] Employee training documentation

### Epic App Orchard Requirements

1. **Security Assessment**
   - Complete Epic's security questionnaire
   - Penetration testing results
   - SOC 2 Type II (preferred)

2. **Privacy Policy**
   - Clear data usage disclosure
   - Patient rights explanation
   - Data retention policy

3. **Technical Requirements**
   - SMART on FHIR compliance
   - OAuth 2.0 implementation
   - Support for PKCE

## Alternative: CCD Upload Flow

For MVP or organizations not ready for SMART on FHIR:

### Patient Instructions

1. Log into MyChart
2. Navigate to Health Summary or Medical Records
3. Download as CCD/CCDA (XML format)
4. Upload to Chorus via file upload

### Backend Processing

```python
from lxml import etree

def parse_ccd(ccd_content: bytes) -> dict:
    """Parse CCD/CCDA XML into structured data."""

    tree = etree.fromstring(ccd_content)

    # CDA namespace
    ns = {'cda': 'urn:hl7-org:v3'}

    # Extract sections
    summary = {
        'problems': extract_problems(tree, ns),
        'medications': extract_medications(tree, ns),
        'allergies': extract_allergies(tree, ns),
        'procedures': extract_procedures(tree, ns),
        'results': extract_results(tree, ns),
    }

    return summary

def extract_problems(tree, ns) -> list:
    """Extract problem list from CCD."""

    problems = []
    problem_section = tree.find('.//cda:section[cda:templateId[@root="2.16.840.1.113883.10.20.22.2.5.1"]]', ns)

    if problem_section is not None:
        for entry in problem_section.findall('.//cda:act', ns):
            problem = {
                'name': entry.find('.//cda:value', ns).get('displayName'),
                'code': entry.find('.//cda:value', ns).get('code'),
                'status': entry.find('.//cda:statusCode', ns).get('code'),
            }
            problems.append(problem)

    return problems
```

## Implementation Phases

### Phase 1: CCD Upload (MVP)
- [ ] CCD/CCDA file upload support
- [ ] Basic XML parsing
- [ ] Patient context injection
- [ ] Privacy disclaimer UI

### Phase 2: SMART on FHIR
- [ ] Epic App Orchard registration
- [ ] OAuth2 authorization flow
- [ ] Basic FHIR resource fetching
- [ ] Patient connection UI
- [ ] Token management

### Phase 3: Enhanced Integration
- [ ] Multi-health-system support
- [ ] Cerner/Oracle Health integration
- [ ] Apple Health import
- [ ] Refresh token handling
- [ ] Granular data selection

### Phase 4: Advanced Features
- [ ] Longitudinal data analysis
- [ ] Trend visualization
- [ ] Medication interaction checks
- [ ] Appointment integration
- [ ] Secure messaging bridge

## Dependencies

```toml
# pyproject.toml additions
dependencies = [
    # FHIR client
    "fhirclient>=4.0.0",

    # OAuth2
    "authlib>=1.2.0",
    "httpx>=0.25.0",

    # XML parsing for CCD
    "lxml>=5.0.0",

    # Encryption
    "cryptography>=41.0.0",
]
```

## Resources

- [Epic App Orchard](https://open.epic.com)
- [SMART on FHIR Documentation](https://docs.smarthealthit.org/)
- [HL7 FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [CCD/CCDA Implementation Guide](https://www.hl7.org/ccdasearch/)
- [Epic FHIR API Documentation](https://fhir.epic.com/Documentation)
- [21st Century Cures Act - Information Blocking](https://www.healthit.gov/topic/information-blocking)

## Notes on 21st Century Cures Act

As of 2021, the 21st Century Cures Act requires healthcare providers to make patient data available via standardized APIs (FHIR). This means:

1. All major EHR vendors must support Patient Access API
2. Patients have the right to access their data electronically
3. Health systems cannot engage in "information blocking"

This regulatory environment makes SMART on FHIR integration increasingly viable and standardized across healthcare systems.

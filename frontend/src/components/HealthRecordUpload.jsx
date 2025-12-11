import React, { useState, useCallback, useRef } from 'react';

/**
 * HealthRecordUpload - Client-side health record processing
 *
 * All PHI stays on the user's device. Only de-identified clinical
 * concepts (ICD-10, RxNorm, LOINC codes) are used to enhance queries.
 */

// Supported file types
const SUPPORTED_TYPES = {
  'application/pdf': { ext: '.pdf', name: 'PDF' },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { ext: '.docx', name: 'Word' },
  'text/xml': { ext: '.xml', name: 'CCD/CCDA' },
  'application/xml': { ext: '.xml', name: 'CCD/CCDA' },
  'application/json': { ext: '.json', name: 'FHIR' },
  'text/plain': { ext: '.txt', name: 'Text' },
};

// De-identify age to range
function ageToRange(age) {
  if (age < 18) return 'under 18';
  if (age < 30) return '18-29';
  if (age < 45) return '30-44';
  if (age < 55) return '45-54';
  if (age < 65) return '55-64';
  if (age < 75) return '65-74';
  return '75+';
}

// Parse CCD/CCDA XML (simplified parser)
function parseCCDXML(xmlText) {
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xmlText, 'text/xml');

    const concepts = {
      conditions: [],
      medications: [],
      allergies: [],
      labs: []
    };

    // Extract problems/conditions
    doc.querySelectorAll('observation value[codeSystem]').forEach(el => {
      const name = el.getAttribute('displayName');
      const code = el.getAttribute('code');
      if (name && code) {
        concepts.conditions.push({ name, code, codeSystem: 'ICD-10-CM' });
      }
    });

    // Extract medications
    doc.querySelectorAll('manufacturedMaterial code').forEach(el => {
      const name = el.getAttribute('displayName');
      const code = el.getAttribute('code');
      if (name) {
        concepts.medications.push({ name, code, codeSystem: 'RxNorm' });
      }
    });

    return concepts;
  } catch (e) {
    console.error('Error parsing CCD:', e);
    return null;
  }
}

// Parse FHIR Bundle JSON
function parseFHIRBundle(jsonText) {
  try {
    const bundle = JSON.parse(jsonText);
    const concepts = {
      conditions: [],
      medications: [],
      allergies: [],
      labs: []
    };

    if (bundle.entry) {
      bundle.entry.forEach(entry => {
        const resource = entry.resource;
        if (!resource) return;

        switch (resource.resourceType) {
          case 'Condition':
            if (resource.code?.coding?.[0]) {
              concepts.conditions.push({
                name: resource.code.coding[0].display || resource.code.text,
                code: resource.code.coding[0].code,
                codeSystem: resource.code.coding[0].system?.includes('icd') ? 'ICD-10-CM' : 'SNOMED-CT'
              });
            }
            break;
          case 'MedicationRequest':
          case 'MedicationStatement':
            const med = resource.medicationCodeableConcept || resource.medicationReference;
            if (med?.coding?.[0]) {
              concepts.medications.push({
                name: med.coding[0].display,
                code: med.coding[0].code,
                codeSystem: 'RxNorm'
              });
            }
            break;
          case 'AllergyIntolerance':
            if (resource.code?.coding?.[0]) {
              concepts.allergies.push({
                substance: resource.code.coding[0].display,
                criticality: resource.criticality || 'unknown'
              });
            }
            break;
          case 'Observation':
            if (resource.code?.coding?.[0] && resource.valueQuantity) {
              concepts.labs.push({
                test: resource.code.coding[0].display,
                code: resource.code.coding[0].code,
                interpretation: resource.interpretation?.[0]?.coding?.[0]?.code || 'unknown'
              });
            }
            break;
        }
      });
    }

    return concepts;
  } catch (e) {
    console.error('Error parsing FHIR:', e);
    return null;
  }
}

// Extract text content from file
async function extractContent(file) {
  const text = await file.text();

  if (file.type.includes('xml')) {
    return { type: 'ccd', concepts: parseCCDXML(text) };
  }

  if (file.type === 'application/json') {
    return { type: 'fhir', concepts: parseFHIRBundle(text) };
  }

  // For PDF/DOCX, we'd need PDF.js/Mammoth - for now just show placeholder
  if (file.type === 'application/pdf') {
    return {
      type: 'pdf',
      message: 'PDF parsing requires PDF.js library. Upload CCD/CCDA or FHIR for full parsing.',
      concepts: null
    };
  }

  return { type: 'text', text: text.slice(0, 5000), concepts: null };
}

export function HealthRecordUpload({ onHealthContextChange, isChorusMode = true }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [parsedData, setParsedData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const processFile = useCallback(async (file) => {
    if (!SUPPORTED_TYPES[file.type]) {
      setError(`Unsupported file type: ${file.type}`);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File too large (max 10MB)');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const result = await extractContent(file);
      setUploadedFile(file);
      setParsedData(result);

      // Build health context from parsed concepts
      if (result.concepts) {
        const healthContext = {
          activeConditions: result.concepts.conditions || [],
          currentMedications: result.concepts.medications || [],
          allergyList: result.concepts.allergies || [],
          recentLabs: result.concepts.labs || []
        };
        onHealthContextChange?.(healthContext);
      }
    } catch (e) {
      setError('Error processing file: ' + e.message);
    } finally {
      setIsProcessing(false);
    }
  }, [onHealthContextChange]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files[0];
    if (file) processFile(file);
  }, [processFile]);

  const clearUpload = useCallback(() => {
    setUploadedFile(null);
    setParsedData(null);
    setError(null);
    onHealthContextChange?.(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }, [onHealthContextChange]);

  if (!isChorusMode) return null;

  return (
    <div style={{
      marginBottom: '20px',
      padding: '16px',
      borderRadius: '12px',
      backgroundColor: '#faf5ff',
      border: '1px solid #e9d5ff',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '12px',
      }}>
        <h3 style={{
          margin: 0,
          fontSize: '14px',
          fontWeight: '600',
          color: '#6d28d9',
        }}>
          Health Record Context (Optional)
        </h3>
        {uploadedFile && (
          <button
            onClick={clearUpload}
            style={{
              padding: '4px 8px',
              fontSize: '12px',
              color: '#9333ea',
              background: 'transparent',
              border: '1px solid #d8b4fe',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {!uploadedFile ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            padding: '24px',
            borderRadius: '8px',
            border: `2px dashed ${dragOver ? '#9333ea' : '#d8b4fe'}`,
            backgroundColor: dragOver ? '#f3e8ff' : 'white',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".xml,.json,.pdf,.docx,.txt"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '14px' }}>
            {isProcessing ? 'Processing...' : 'Drop CCD/CCDA, FHIR, or health document here'}
          </p>
          <p style={{ margin: 0, color: '#9ca3af', fontSize: '12px' }}>
            Your data stays on your device - only clinical codes are used
          </p>
        </div>
      ) : (
        <div style={{
          padding: '12px',
          borderRadius: '8px',
          backgroundColor: 'white',
          border: '1px solid #e9d5ff',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: parsedData?.concepts ? '12px' : 0,
          }}>
            <span style={{ fontSize: '18px' }}>
              {uploadedFile.type.includes('xml') ? '📋' :
               uploadedFile.type.includes('json') ? '📊' : '📄'}
            </span>
            <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>
              {uploadedFile.name}
            </span>
            <span style={{ fontSize: '12px', color: '#9ca3af' }}>
              ({Math.round(uploadedFile.size / 1024)} KB)
            </span>
          </div>

          {parsedData?.concepts && (
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              <strong>Extracted:</strong>{' '}
              {parsedData.concepts.conditions?.length || 0} conditions,{' '}
              {parsedData.concepts.medications?.length || 0} medications,{' '}
              {parsedData.concepts.allergies?.length || 0} allergies
            </div>
          )}

          {parsedData?.message && (
            <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#f59e0b' }}>
              {parsedData.message}
            </p>
          )}
        </div>
      )}

      {error && (
        <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#dc2626' }}>
          {error}
        </p>
      )}

      <p style={{
        margin: '12px 0 0',
        fontSize: '11px',
        color: '#9ca3af',
        lineHeight: '1.4',
      }}>
        Privacy: All parsing happens locally. Only de-identified clinical concepts
        (condition names, medication names) are used to personalize your query.
        No personal information is sent to our servers.
      </p>
    </div>
  );
}

export default HealthRecordUpload;

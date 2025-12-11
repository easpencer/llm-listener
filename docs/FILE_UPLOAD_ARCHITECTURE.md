# File Upload and Document Analysis Architecture for Chorus

## Overview

This document outlines the architecture for enabling users to upload files (PDFs, Word documents, clinical documents) to Chorus for contextual analysis alongside LLM queries. The goal is to inject file content as context for evidence synthesis and medical literature queries.

## Use Cases

1. **Research Context Injection**: Upload research papers, guidelines, or protocols to inform queries
2. **Clinical Document Analysis**: Upload CCD/CCDA documents for personalized health queries
3. **Comparative Analysis**: Upload multiple documents to compare findings across sources
4. **Evidence Synthesis**: Combine uploaded literature with live web search results

## Proposed Architecture

### Frontend Components

```
src/
  components/
    FileUpload/
      FileDropzone.jsx      # Drag-and-drop upload area
      FilePreview.jsx       # Preview uploaded files
      FileList.jsx          # List of uploaded documents
      FileContext.jsx       # React context for file state
```

### Backend Endpoints

```python
# New endpoints for file handling
POST /api/files/upload          # Upload single/multiple files
GET  /api/files/{file_id}       # Get file metadata
GET  /api/files/{file_id}/content  # Get extracted text
DELETE /api/files/{file_id}     # Remove uploaded file
POST /api/query/with-context    # Query with file context
```

### File Processing Pipeline

```
[Upload] -> [Validation] -> [Storage] -> [Extraction] -> [Indexing]
    |           |              |             |              |
    v           v              v             v              v
  Dropzone   Size/Type     Temp/S3      Text/OCR      Vector DB
             Limits                     Parsing       (optional)
```

## Supported File Types

### Phase 1 (Core)
| Format | Library | Notes |
|--------|---------|-------|
| PDF | `pypdf`, `pdfplumber` | Text extraction, OCR for scanned |
| DOCX | `python-docx` | Full text and structure |
| TXT/MD | Built-in | Direct text processing |

### Phase 2 (Clinical)
| Format | Library | Notes |
|--------|---------|-------|
| CCD/CCDA | `fhirclient`, custom parser | HL7 CDA documents |
| FHIR JSON | `fhirclient` | FHIR R4 resources |
| HL7v2 | `hl7apy` | Lab results, ADT messages |

### Phase 3 (Extended)
| Format | Library | Notes |
|--------|---------|-------|
| XLSX | `openpyxl` | Spreadsheet data |
| Images | `pytesseract` | OCR for screenshots |
| HTML | `beautifulsoup4` | Web page content |

## Implementation Details

### File Upload Handler

```python
from fastapi import UploadFile, File, HTTPException
from typing import List
import tempfile
import hashlib

MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_TYPES = {
    'application/pdf': '.pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'text/markdown': '.md',
    'application/xml': '.xml',  # CCD/CCDA
}

@router.post("/api/files/upload")
async def upload_file(
    file: UploadFile = File(...),
    session_id: str = None
):
    # Validate file type
    if file.content_type not in ALLOWED_TYPES:
        raise HTTPException(400, f"Unsupported file type: {file.content_type}")

    # Read and validate size
    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(400, f"File too large (max {MAX_FILE_SIZE // 1024 // 1024}MB)")

    # Generate file ID
    file_id = hashlib.sha256(content).hexdigest()[:16]

    # Store temporarily (or S3 for production)
    # Extract text content
    # Return metadata

    return {
        "file_id": file_id,
        "filename": file.filename,
        "content_type": file.content_type,
        "size": len(content),
        "extracted_chars": len(extracted_text)
    }
```

### Text Extraction Service

```python
class DocumentExtractor:
    """Extract text from various document formats."""

    def extract(self, content: bytes, content_type: str) -> str:
        if content_type == 'application/pdf':
            return self._extract_pdf(content)
        elif content_type.endswith('wordprocessingml.document'):
            return self._extract_docx(content)
        elif content_type == 'application/xml':
            return self._extract_ccd(content)
        else:
            return content.decode('utf-8', errors='ignore')

    def _extract_pdf(self, content: bytes) -> str:
        from pypdf import PdfReader
        import io

        reader = PdfReader(io.BytesIO(content))
        text_parts = []
        for page in reader.pages:
            text_parts.append(page.extract_text() or '')
        return '\n\n'.join(text_parts)

    def _extract_docx(self, content: bytes) -> str:
        from docx import Document
        import io

        doc = Document(io.BytesIO(content))
        return '\n\n'.join(para.text for para in doc.paragraphs)

    def _extract_ccd(self, content: bytes) -> str:
        """Extract clinical data from CCD/CCDA XML."""
        from lxml import etree

        tree = etree.fromstring(content)
        # Parse CDA sections (medications, problems, procedures, etc.)
        # Return structured text representation
        return self._parse_cda_sections(tree)
```

### Context Injection for Queries

```python
def build_context_prompt(
    query: str,
    file_contexts: List[dict],
    max_context_chars: int = 50000
) -> str:
    """Build prompt with file context for LLM query."""

    context_parts = []
    total_chars = 0

    for file_ctx in file_contexts:
        if total_chars + len(file_ctx['text']) > max_context_chars:
            # Truncate or summarize long documents
            remaining = max_context_chars - total_chars
            text = file_ctx['text'][:remaining] + "\n[...truncated...]"
        else:
            text = file_ctx['text']

        context_parts.append(f"""
=== Document: {file_ctx['filename']} ===
{text}
""")
        total_chars += len(text)

    full_context = '\n'.join(context_parts)

    return f"""You have been provided with the following document(s) as context:

{full_context}

Based on the above context and your medical knowledge, please address the following query:

{query}

If the documents are relevant, cite specific information from them. If they're not relevant to the query, you may still use your general knowledge to answer."""
```

## Frontend Implementation

### FileDropzone Component

```jsx
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function FileDropzone({ onFilesUploaded, maxFiles = 5 }) {
  const onDrop = useCallback(async (acceptedFiles) => {
    const formData = new FormData();
    acceptedFiles.forEach(file => {
      formData.append('files', file);
    });

    const response = await fetch('/api/files/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    onFilesUploaded(result.files);
  }, [onFilesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/markdown': ['.md'],
    }
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop files here...</p>
      ) : (
        <p>Drag & drop files, or click to select</p>
      )}
    </div>
  );
}
```

## Storage Options

### Development: Temporary Files
```python
import tempfile
import os

UPLOAD_DIR = tempfile.mkdtemp(prefix='chorus_uploads_')

def store_file(file_id: str, content: bytes) -> str:
    path = os.path.join(UPLOAD_DIR, file_id)
    with open(path, 'wb') as f:
        f.write(content)
    return path
```

### Production: S3/Cloud Storage
```python
import boto3

s3 = boto3.client('s3')
BUCKET = 'chorus-uploads'

def store_file_s3(file_id: str, content: bytes, content_type: str) -> str:
    s3.put_object(
        Bucket=BUCKET,
        Key=f'uploads/{file_id}',
        Body=content,
        ContentType=content_type,
        ServerSideEncryption='AES256'
    )
    return f's3://{BUCKET}/uploads/{file_id}'
```

## Security Considerations

1. **File Validation**: Validate MIME type using magic bytes, not just extension
2. **Size Limits**: Enforce strict size limits (10MB default)
3. **Virus Scanning**: Integrate ClamAV or cloud-based scanning for production
4. **Access Control**: Files tied to session/user, auto-expire after 24 hours
5. **PHI Handling**: If clinical documents contain PHI:
   - Process in-memory only, no persistent storage
   - Log access for audit trails
   - Consider BAA requirements for cloud storage

## Dependencies to Add

```toml
# pyproject.toml additions
dependencies = [
    # ... existing deps
    "pypdf>=4.0.0",
    "python-docx>=1.1.0",
    "pdfplumber>=0.10.0",  # Better table extraction
    "lxml>=5.0.0",          # CCD/CCDA parsing
    "python-magic>=0.4.27", # MIME type detection
]

# Optional for advanced features
optional-dependencies = [
    "pytesseract>=0.3.10",  # OCR for scanned docs
    "fhirclient>=4.0.0",    # FHIR parsing
    "hl7apy>=1.3.4",        # HL7v2 parsing
]
```

## Implementation Phases

### Phase 1: Basic Upload (MVP)
- [ ] File upload endpoint with validation
- [ ] PDF and DOCX text extraction
- [ ] Context injection into queries
- [ ] Simple file list UI
- [ ] Session-based temporary storage

### Phase 2: Enhanced Features
- [ ] Drag-and-drop UI component
- [ ] File preview with extracted text
- [ ] Multiple file support
- [ ] Progress indicators
- [ ] Error handling and retry

### Phase 3: Clinical Documents
- [ ] CCD/CCDA parsing
- [ ] FHIR resource extraction
- [ ] Structured data display
- [ ] PHI detection warnings

### Phase 4: Advanced
- [ ] Vector embeddings for semantic search
- [ ] Document summarization
- [ ] Cross-document comparison
- [ ] Persistent storage (S3)
- [ ] Admin file management

## API Integration with Existing Query Flow

The file context integrates with the existing `/api/ask` endpoint:

```python
@router.post("/api/ask")
async def ask_question(
    question: str,
    file_ids: List[str] = [],  # NEW: optional file context
    mode: str = "chorus",
    # ... existing params
):
    # Load file contexts if provided
    file_contexts = []
    for file_id in file_ids:
        ctx = await get_file_context(file_id)
        if ctx:
            file_contexts.append(ctx)

    # Build enhanced prompt with context
    if file_contexts:
        enhanced_question = build_context_prompt(question, file_contexts)
    else:
        enhanced_question = question

    # Continue with existing LLM query flow...
```

## References

- [pypdf Documentation](https://pypdf.readthedocs.io/)
- [python-docx Documentation](https://python-docx.readthedocs.io/)
- [HL7 CDA R2 Standard](https://www.hl7.org/implement/standards/product_brief.cfm?product_id=7)
- [FHIR R4 Specification](https://hl7.org/fhir/R4/)
- [react-dropzone](https://react-dropzone.js.org/)

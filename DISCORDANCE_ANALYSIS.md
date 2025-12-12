# Discordance Analysis Module

## Overview

The `discordance.py` module provides **structured, programmatic analysis** of agreement and disagreement between AI model responses and evidence sources in the Chorus health research application.

Unlike the LLM-based synthesis (which uses prompts to detect discordance), this module uses **lightweight text pattern matching and heuristics** to provide:

- Structured data about source positions
- Quantitative agreement metrics
- Programmatic conflict detection
- No additional API calls required

## Key Components

### 1. **Stance Enum**

Represents the position a source takes on a health topic:

- `SUPPORTIVE`: Recommends, endorses, or strongly supports
- `CAUTIONARY`: Mixed, conditional, or context-dependent
- `NEUTRAL`: Informational without clear stance
- `AGAINST`: Not recommended, avoid, or contraindicated

### 2. **SourcePosition Dataclass**

Captures a single position from a source:

```python
@dataclass
class SourcePosition:
    source_name: str         # e.g., "CDC", "OpenAI GPT-4"
    claim_text: str          # The actual claim/statement
    stance: Stance           # Overall stance
    confidence: float        # 0.0 to 1.0
    key_phrases: List[str]   # Phrases that influenced detection
```

### 3. **DiscordanceResult Dataclass**

Results of the complete discordance analysis:

```python
@dataclass
class DiscordanceResult:
    agreement_level: float                    # 0.0 to 1.0
    areas_of_agreement: List[str]             # Topics with consensus
    areas_of_disagreement: List[str]          # Topics with conflict
    source_positions: List[SourcePosition]    # All positions
    stance_distribution: Dict[Stance, int]    # Count by stance
    conflicting_pairs: List[tuple]            # Specific conflicts
```

### 4. **DiscordanceAnalyzer Class**

The main analyzer that performs the analysis:

```python
analyzer = DiscordanceAnalyzer()

result = analyzer.analyze(
    ai_responses=[...],      # List of AI response dicts
    evidence_data={...}      # Evidence from SERPAPI searches
)
```

## How It Works

### Pattern-Based Stance Detection

The analyzer uses regex patterns to detect language indicating different stances:

**Supportive Patterns:**
- "recommend", "effective", "proven", "beneficial"
- "evidence shows", "studies show"
- "approved", "safe and effective", "standard of care"

**Cautionary Patterns:**
- "may", "might", "could", "possibly"
- "limited evidence", "more research needed"
- "consult your doctor", "individual basis"

**Against Patterns:**
- "not recommended", "avoid", "contraindicated"
- "no evidence", "unproven", "unsupported"
- "dangerous", "harmful", "ineffective"

### Agreement Calculation

Agreement level is computed based on how concentrated the dominant stance is:

```
agreement_level = (count of dominant stance) / (total positions)
```

- **1.0** = Complete agreement (all sources same stance)
- **0.6-0.9** = Strong majority agreement
- **0.4-0.6** = Mixed/moderate agreement
- **0.0-0.4** = High disagreement

### Conflict Detection

The analyzer specifically identifies conflicts between:
- Supportive vs Against positions
- Mixed stances (3+ different stance types)
- Specific source pairs with contradicting positions

## Usage

### Basic Usage

```python
from llm_listener.core import DiscordanceAnalyzer

# Initialize
analyzer = DiscordanceAnalyzer()

# Prepare AI responses
ai_responses = [
    {
        'provider_name': 'OpenAI',
        'model': 'gpt-4',
        'content': 'Vitamin D is recommended for bone health...'
    },
    {
        'provider_name': 'Anthropic',
        'model': 'claude-3-opus',
        'content': 'Limited evidence supports vitamin D...'
    }
]

# Prepare evidence data
evidence_data = {
    'guidelines': {
        'count': 2,
        'links': [
            {
                'url': 'https://cdc.gov/...',
                'snippet': 'CDC recommends vitamin D for...'
            }
        ]
    },
    'literature': {
        'count': 5,
        'top_cited': [
            {
                'title': 'Study title',
                'snippet': 'Meta-analysis found...',
                'cited_by': 450
            }
        ]
    }
}

# Analyze
result = analyzer.analyze(
    ai_responses=ai_responses,
    evidence_data=evidence_data
)

# Access results
print(f"Agreement: {result.agreement_level:.1%}")
print(f"Positions: {len(result.source_positions)}")

for area in result.areas_of_disagreement:
    print(f"Disagreement: {area}")
```

### Integration with Existing Code

The module can be integrated into the reconciliation process:

```python
from llm_listener.core import ResponseReconciler, DiscordanceAnalyzer

# After getting AI responses
responses = await orchestrator.query_all(question)

# Get evidence
evidence_data = await evidence_searcher.search_all(question)

# LLM-based synthesis
reconciled = await reconciler.reconcile(
    question=question,
    responses=responses,
    mode="health_research",
    evidence_data=evidence_data
)

# Programmatic discordance analysis
analyzer = DiscordanceAnalyzer()

# Convert LLMResponse objects to dicts
ai_response_dicts = [
    {
        'provider_name': r.provider_name,
        'model': r.model,
        'content': r.content
    }
    for r in responses if r.success
]

discordance_result = analyzer.analyze(
    ai_responses=ai_response_dicts,
    evidence_data=evidence_data
)

# Use results for additional insights
if discordance_result.agreement_level < 0.5:
    print("WARNING: High discordance detected!")
    print(analyzer.format_summary(discordance_result))
```

### Formatted Output

Use the built-in formatter for human-readable summaries:

```python
summary = analyzer.format_summary(result)
print(summary)
```

Output example:
```
=== DISCORDANCE ANALYSIS ===

Agreement Level: 66.7%

Stance Distribution:
  - Supportive: 2 (66.7%)
  - Cautionary: 1 (33.3%)

Areas of Agreement:
  - Majority stance is supportive (2/3 sources)
  - Common themes: recommended, effective

Areas of Disagreement:
  - No significant disagreement detected
```

## Design Decisions

### 1. **No API Calls**
Uses only text pattern matching to avoid additional latency and cost.

### 2. **Confidence Scores**
Provides confidence scores (0.0-1.0) to indicate reliability of stance detection.

### 3. **Lightweight Analysis**
Analyzes top 10 guideline sources and top 5 literature sources to keep processing fast.

### 4. **Complementary to LLM Synthesis**
Designed to work alongside (not replace) the LLM-based synthesis in the reconciler.

### 5. **Structured Data**
Returns structured dataclasses that can be:
- Serialized to JSON
- Stored in databases
- Used for metrics/dashboards
- Passed to other analysis tools

## Limitations

1. **Pattern-based detection**: May miss nuanced stances that don't match patterns
2. **No semantic understanding**: Cannot detect implicit disagreement or subtle contradictions
3. **Short text analysis**: Works best with snippets; full document analysis may need chunking
4. **English only**: Patterns are English-specific
5. **No causal reasoning**: Detects correlation in language but not logical conflicts

## Future Enhancements

Possible additions:
- Claim extraction and clustering
- Entity recognition for specific interventions/populations
- Temporal analysis (how positions change over time)
- Source credibility weighting
- Multi-language support
- Integration with structured medical ontologies (SNOMED, MeSH)

## Example Output

See `example_discordance_usage.py` for a complete working example.

## Testing

To verify the module works:

```bash
# Check syntax
python3 -m py_compile llm_listener/core/discordance.py

# Test imports
python3 -c "from llm_listener.core import DiscordanceAnalyzer; print('OK')"

# Run example
python3 example_discordance_usage.py
```

## API Reference

### DiscordanceAnalyzer

#### `__init__()`
Initialize the analyzer. No parameters required.

#### `analyze(ai_responses=None, evidence_data=None) -> DiscordanceResult`
Analyze discordance across sources.

**Parameters:**
- `ai_responses` (List[Dict], optional): List of dicts with keys:
  - `provider_name` (str): Provider name
  - `model` (str): Model identifier
  - `content` (str): Response text
- `evidence_data` (Dict, optional): Evidence dict with:
  - `guidelines` (Dict): Government/org guidelines
  - `literature` (Dict): Scholarly literature

**Returns:** `DiscordanceResult`

#### `format_summary(result: DiscordanceResult) -> str`
Format result as human-readable text.

**Parameters:**
- `result` (DiscordanceResult): Result to format

**Returns:** Formatted string

## License

Part of the LLM Listener / Chorus health research application.

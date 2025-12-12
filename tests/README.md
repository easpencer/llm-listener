# Chorus Test Suite

This directory contains tests for the Chorus health research application.

## Running Tests

### Prerequisites

```bash
# Install test dependencies
pip install -e ".[test]"
# or
pip install pytest pytest-asyncio pytest-cov
```

### Run All Tests

```bash
# From project root
pytest tests/ -v

# With coverage report
pytest tests/ --cov=llm_listener --cov-report=term-missing

# Run specific test file
pytest tests/test_config.py -v
```

### Run Specific Test Categories

```bash
# Configuration tests
pytest tests/test_config.py -v

# API endpoint tests
pytest tests/test_api.py -v

# Provider tests
pytest tests/test_ollama_provider.py -v
```

## Test Categories

### Unit Tests

| File | Coverage |
|------|----------|
| `test_config.py` | Settings, providers, app mode |
| `test_ollama_provider.py` | Ollama provider initialization, queries |
| `test_api.py` | API endpoint validation |

### Integration Tests

| File | Coverage |
|------|----------|
| `test_integration.py` | End-to-end workflows |

## Test Fixtures

Shared fixtures are defined in `conftest.py`:

- `mock_openai_response` - Mock OpenAI API response
- `mock_anthropic_response` - Mock Anthropic API response
- `sample_query` - Sample health question
- `sample_health_context` - De-identified health context
- `mock_evidence_results` - Mock evidence search results

## Environment Setup

Tests use environment variables. Default test values are set in `conftest.py`:

```python
os.environ.setdefault("OPENAI_API_KEY", "test-key")
os.environ.setdefault("ANTHROPIC_API_KEY", "test-key")
```

## Writing New Tests

### Test Structure

```python
class TestFeatureName:
    """Tests for specific feature."""

    def test_basic_functionality(self):
        """Test basic case."""
        # Arrange
        # Act
        # Assert

    def test_edge_case(self):
        """Test edge case handling."""
        pass

    @pytest.mark.asyncio
    async def test_async_operation(self):
        """Test async functionality."""
        pass
```

### Mocking External Services

```python
from unittest.mock import patch, AsyncMock

@patch("llm_listener.api.LLMOrchestrator")
def test_with_mock(mock_orchestrator):
    mock_instance = AsyncMock()
    mock_orchestrator.return_value = mock_instance
    # Test code
```

## CI/CD Integration

Tests are designed to run without external dependencies:

- API keys are mocked
- External services are mocked
- No network calls in unit tests

```yaml
# GitHub Actions example
- name: Run tests
  run: pytest tests/ -v --cov=llm_listener
  env:
    OPENAI_API_KEY: test-key
    ANTHROPIC_API_KEY: test-key
```

## Coverage Goals

- **Config module**: 100%
- **Providers**: 90%+
- **API endpoints**: 80%+
- **Overall**: 75%+

## Audit Reports

Test coverage and code quality audits are documented in:

- `docs/audits/DISCORDANCE_AUDIT.md`
- `docs/audits/CONFIG_AUDIT.md`
- `docs/audits/OLLAMA_PROVIDER_AUDIT.md`

# Build frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Python backend
FROM python:3.11-slim
WORKDIR /app

# Install Python dependencies
COPY pyproject.toml ./
COPY llm_listener/ ./llm_listener/
RUN pip install --no-cache-dir .

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Expose port
EXPOSE 8000

# Start server - use shell form for PORT env variable expansion
CMD ["sh", "-c", "uvicorn llm_listener.api:app --host 0.0.0.0 --port ${PORT:-8000}"]

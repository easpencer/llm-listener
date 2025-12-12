# Railway PostgreSQL Database Setup Guide

## Overview

This document provides instructions for setting up a PostgreSQL database on Railway and connecting it to the Chorus application.

## Prerequisites

- Railway account (https://railway.app)
- Railway CLI installed (`brew install railway`)
- Project already deployed on Railway

## Setup Steps

### 1. Authenticate with Railway CLI

```bash
railway login
```

This will open a browser window for authentication.

### 2. Link to Your Project

```bash
cd /path/to/llm-listener
railway link
```

Select your project from the list.

### 3. Add PostgreSQL Database

**Option A: Via Railway Dashboard (Recommended)**

1. Go to https://railway.app/dashboard
2. Select your Chorus project
3. Click "New" -> "Database" -> "PostgreSQL"
4. Railway will automatically provision the database

**Option B: Via CLI**

```bash
railway add --plugin postgresql
```

### 4. Get Database Connection String

The `DATABASE_URL` environment variable is automatically injected into your Railway service.

To view it locally:

```bash
railway variables
```

Or in the dashboard: Project -> PostgreSQL service -> "Connect" tab

### 5. Verify Connection

The Chorus app handles the connection string automatically:

```python
# From llm_listener/database.py
DATABASE_URL = os.getenv("DATABASE_URL", "")

# Handle Railway's postgres:// vs postgresql://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)
```

### 6. Initialize Database Tables

Tables are auto-created on first startup via:

```python
from llm_listener.database import init_db
init_db()  # Called in api.py startup event
```

## Database Schema

The following tables are created:

| Table | Purpose |
|-------|---------|
| `study_sessions` | Participant study sessions |
| `study_queries` | Individual queries during studies |
| `message_ratings` | Expert A/B message quality ratings |
| `content_accuracy_ratings` | AI response accuracy evaluations |
| `usability_ratings` | SUS scores and task completion |
| `trust_ratings` | Trust and adoption assessments |
| `study_completed_responses` | Complete study data archive |

## Environment Variables

### Production (Railway)

Railway automatically injects:
- `DATABASE_URL` - Full PostgreSQL connection string

### Local Development

No configuration needed - defaults to SQLite:
```
sqlite:///./study_data.db
```

To use PostgreSQL locally, set in `.env`:
```bash
DATABASE_URL=postgresql://user:pass@localhost:5432/chorus
```

## Migration Strategy

Currently using SQLAlchemy's `create_all()` for schema management:

```python
Base.metadata.create_all(bind=engine)
```

For production migrations, consider adding Alembic:

```bash
pip install alembic
alembic init migrations
alembic revision --autogenerate -m "initial"
alembic upgrade head
```

## Backup and Recovery

### Manual Backup via Railway

```bash
railway run pg_dump -Fc > backup.dump
```

### Restore

```bash
railway run pg_restore -d $DATABASE_URL backup.dump
```

### Automated Backups

Railway provides automatic daily backups on paid plans.

## Connection Pooling

For high-traffic scenarios, consider adding PgBouncer or using SQLAlchemy's pool settings:

```python
engine = create_engine(
    DATABASE_URL,
    pool_size=5,
    max_overflow=10,
    pool_timeout=30,
    pool_recycle=1800
)
```

## Monitoring

Railway provides built-in metrics:
- Connection count
- Query performance
- Storage usage

Access via: Project -> PostgreSQL -> Metrics tab

## Troubleshooting

### Connection Refused

1. Check Railway service is running
2. Verify DATABASE_URL is set correctly
3. Ensure PostgreSQL plugin is linked to your service

### SSL Errors

Railway requires SSL. Ensure your connection string includes:
```
?sslmode=require
```

### Migration Conflicts

If schema changes cause issues:
```bash
# Connect to Railway PostgreSQL
railway run psql

# Drop and recreate (CAUTION: loses data)
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
```

## Security Considerations

1. Never commit DATABASE_URL to version control
2. Use Railway's environment variable management
3. Enable connection pooling for production
4. Consider row-level security for multi-tenant data

## Cost Considerations

Railway PostgreSQL pricing:
- Free tier: 500MB storage, shared CPU
- Pro tier: Starting at $5/month for dedicated resources

Monitor usage via Railway dashboard to avoid unexpected charges.

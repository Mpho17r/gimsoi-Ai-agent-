# GIMSOI AI Agent - System Architecture

## High-Level Architecture

Frontend (Project Tracker UI)
↓
API Layer (Express.js)
↓
AI Logic Engine (Rule-based processor)
↓
PostgreSQL Database


## Core Data Flow

1. Users update tasks
2. Activity logs are recorded
3. Scheduled job runs every 15 minutes
4. AI engine evaluates rules
5. Risk events are inserted
6. Sprint summaries are updated

## AI Logic Rules (MVP Phase 1)

### Execution Risk Scoring
- Overdue task: +15 points
- Task delayed >3 days: +10 points
- Contributor inactive >48h: +12 points
- Dependency incomplete: +8 points
- Repeated deadline shift: +10 points

**Risk Levels:**
- 0-20: Healthy
- 21-40: Moderate Risk
- 41+: High Risk

### Contributor Consistency Score
Formula: (CompletionRate × 0.4) + (UpdateFrequency × 0.2) + (OnTimeCompletion × 0.3) + (ActivityStability × 0.1)

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/ai/execution-risk | Get sprint risk score |
| GET | /api/ai/contributor-summary | Get contributor consistency |
| GET | /api/ai/sprint-summary | Get sprint intelligence |
| GET | /api/ai/workload-status | Get workload heatmap |

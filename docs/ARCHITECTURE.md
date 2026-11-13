# Architecture and implementation map

## Product contract
The product helps creators investigate public YouTube content that performs unusually well relative to a comparable baseline. Raw view counts alone are not an opportunity score. Every derived metric should identify its data age, sample size, format, and baseline source. Public YouTube statistics do not reveal actual creator earnings or private channel analytics.

## Current stack
- Next.js App Router, React, TypeScript, Tailwind CSS.
- PostgreSQL through Prisma.
- YouTube Data API v3, called only from server-side modules under `lib/youtube/`.
- Vercel-compatible request handlers. Longer discovery/refresh work must be bounded or moved to an external job provider.

## Planned data flow
1. A user submits a bounded search request to `/api/search`.
2. The route validates query parameters with Zod and delegates to `lib/youtube/search.ts`.
3. The server-side client calls the official API, with short Next.js response caching. The API key remains in `YOUTUBE_API_KEY` and must never be serialized into responses or logs.
4. Discovery ingestion (next task) upserts channel/video metadata and appends historical snapshots.
5. Analytics consume persisted snapshots, comparing like-for-like format and age cohorts. Insufficient evidence is represented explicitly.
6. Explorer/dashboard pages query persisted data and explain scoring components; no mock values are presented as live observations.

## Current routes
- `GET /api/health`: lightweight service and configuration status; intentionally does not test database connectivity or make billable YouTube calls.
- `GET /api/search?q=...&maxResults=...&order=...&regionCode=...&videoDuration=...`: validated public-video search. Requires server-side `YOUTUBE_API_KEY`; YouTube Data API search quota applies.

## Database model
`prisma/schema.prisma` contains the first normalized PostgreSQL model set for users/accounts, channels/videos, immutable measurement snapshots, niches, saved items/searches, watchlists, jobs, and API usage. It is a schema foundation, not a migrated production database. After setting `DATABASE_URL`, generate the client and create a reviewed migration before deploying. Do not use `db push` against production as a substitute for migration review.

## Directory guide
- `app/`: pages, layouts, and HTTP route handlers.
- `lib/youtube/`: server-side API client and typed data contracts.
- `lib/analytics/`: pure, testable analytics functions.
- `prisma/`: relational schema and migrations.
- `docs/`: architecture, decisions, deployment and operational guidance.
- `tasks/next/`: ordered actionable tasks; `tasks/completed/`: verified work history.
- `features/next/`: backlog ideas awaiting decomposition.

## Deployment and configuration
Required for live search: `YOUTUBE_API_KEY`. Required for database-backed functionality: PostgreSQL `DATABASE_URL`. See `.env.example`. The health route reports whether these environment variables are present, not whether credentials are valid. Use Vercel environment variables for deployed secrets. Do not commit `.env*` files other than the example.

## Deliberate non-goals for the scaffold
Authentication, production-grade rate limiting, full ingestion, Cron workers, caching provider integration, and live analytics dashboards are not complete. Do not imply otherwise. Their implementation is tracked in `tasks/` and `features/next/`.

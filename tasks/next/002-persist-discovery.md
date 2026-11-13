# P1 — Persist discovery data and create historical snapshots

## Goal
Turn public YouTube search results into durable, queryable channel/video records without losing the observation history needed for analytics.

## Scope
- Add an idempotent persistence service using Prisma for channels, videos, and snapshots.
- Fetch full video/channel details only when needed and respect official API quota costs.
- Record usage and refresh timestamps; avoid duplicate snapshots for identical counters in a short interval.
- Define safe behavior for missing/hidden like and comment statistics.
- Add pagination or bounded discovery limits and database indexes for explorer queries.

## Acceptance criteria
- Repeated ingestion of the same YouTube IDs updates current metadata without duplicating entities.
- Every meaningful refresh adds an immutable snapshot; old snapshots remain unchanged.
- API quota usage and errors can be inspected without logging credentials.
- Integration tests cover idempotency, hidden statistics, and snapshot preservation.
- Setup docs explain PostgreSQL provisioning and Prisma migrations.

## Dependencies
Complete `001-runnable-scaffold.md` first.

# Next feature ideas (not yet active tasks)

Promote items into `tasks/next/` only after the current queue is empty or a high-priority defect requires reprioritization. Keep tasks small, independently verifiable, and ordered by user value and data integrity.

## Product foundations
- Authentication, account isolation, and authorization for saved searches, swipe file, and watchlists.
- Redis/Upstash caching with a database fallback, plus API quota accounting and abuse/rate controls.
- Vercel Cron refresh jobs with bounded execution, idempotency, and observable job status.
- Channel explorer and channel/video detail endpoints backed by persisted API data.
- Saved videos/channels with notes and a frozen analytics snapshot.

## Analytics and discovery
- Niche taxonomy/classification with transparent confidence and hierarchical categories.
- Niche demand, competition, saturation, and opportunity components with documented configurable weights.
- Title pattern analysis, similar-channel ranking, and format-aware video explorer filters.
- Estimated revenue ranges by country/category/format; always label as estimates and configure assumptions.
- Admin data-health view for freshness, quota, job failures, and coverage.

## Quality and operations
- Automated unit/integration tests, CI workflow, dependency/security review, and deployment smoke tests.
- Accessible responsive navigation and explorer interactions.
- Privacy/data-retention policy and user-data export/deletion flows before public SaaS use.

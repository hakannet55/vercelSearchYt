# Project task workflow

This is the source of truth for the AI-coder queue. Work in priority order, one task at a time.

- `next/`: actionable work not yet completed; include clear acceptance criteria.
- `completed/`: task documents moved here only after implementation and checks.
- `features/next/`: product ideas not yet decomposed into implementation tasks.

When a task is done, move its file (do not copy it), add completion notes, and update this index. If the active queue is empty, promote the highest-impact feature ideas to tasks.

## Current queue

1. `P0 — Restore runnable application scaffold` (`next/001-runnable-scaffold.md`)
2. `P1 — Connect API search results to persistent analytics data` (`next/002-persist-discovery.md`)
3. `P1 — Add honest age- and format-adjusted outlier engine` (`next/003-outlier-engine.md`)

## Current progress

- Fixed the Prisma data model after review: niche parent/child relation is explicit; saved entities belong to users; cascading deletion behavior and lookup indexes are defined.
- Not verified yet: run `npx prisma validate`, lint, and production build in an environment with dependencies installed. Task 001 remains active until its complete acceptance criteria pass.
- Known cleanup: the malformed filename entry under `app/api/health` from the first scaffold commit cannot be deleted with the repository file-write integration; remove it from a normal Git workspace if it remains in the current tree.

## Workflow

Read `AGENTS.md` and `docs/ARCHITECTURE.md` first. Execute the current queue item, review the diff, run checks, then move it to `completed/` only after all acceptance criteria pass. Prioritize user-visible correctness, data integrity, quota control, and security over adding more screens.

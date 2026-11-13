# AI Coder handoff guide

This repository is being built incrementally. Read this file, `README.md`, and `docs/ARCHITECTURE.md` before changing code.

## Working agreement

1. Start with `tasks/README.md`; select the highest-priority unchecked item in `tasks/next/`.
2. Read the task completely, inspect the current code, and confirm assumptions from actual files. Do not treat this guide or a task description as proof that code exists.
3. Implement one task at a time. Keep changes scoped, secure, and compatible with the existing stack.
4. Run the available checks (at minimum `npm run lint` and `npm run build` when dependencies/environment permit). Add focused tests for non-trivial calculations and validation.
5. Fix regressions before marking a task complete. Never claim checks ran if they did not; record blockers and commands/results honestly.
6. When the acceptance criteria pass, move the task document from `tasks/next/` to `tasks/completed/` and add a dated completion note with changed files and verification evidence. Use the repository's available GitHub write workflow; do not silently leave duplicate status copies.
7. Then pick the next task. When `tasks/next/` is empty, derive the next highest-impact tasks from `features/next/`, create task files in `tasks/next/`, and update the status index.
8. Add newly discovered follow-up ideas to `features/next/` rather than expanding the active task without agreement.
9. Update `README.md` and `docs/ARCHITECTURE.md` when architecture, setup, API behavior, or deployment assumptions change.

## Safety and product integrity

- Never expose `YOUTUBE_API_KEY`, database credentials, or provider secrets in client code or logs.
- Use the official YouTube Data API only; do not scrape YouTube pages.
- Validate all external input; cap result sizes and respect API quota/caching.
- Do not display fabricated live analytics. Mark illustrative data as examples and estimates as estimates.
- Keep Shorts, long-form, and live baselines separate. Use historical observations; when evidence is insufficient, expose that limitation instead of inventing a score.
- Do not store or commit real `.env` files, API keys, or user data.
- Preserve historical snapshots; updates to current counters must not erase prior measurements.

## Task status convention

A task is complete only after implementation, review, and verification. A code change by itself is not completion. Keep task IDs stable and use `P0` for blockers, `P1` for core product foundations, and `P2` for subsequent capabilities.

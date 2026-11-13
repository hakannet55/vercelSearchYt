# P0 — Restore runnable application scaffold

## Why this is first
The initial scaffold commit misplaced dashboard source into the global stylesheet and created a malformed health-route filename. The repository needs a valid, buildable Next.js baseline before feature work can be safely layered on.

## Scope
- Restore the landing page and global CSS to their correct paths.
- Provide a correctly named health endpoint and a server-only YouTube search endpoint with validated query parameters.
- Add clear setup, architecture, and AI-coder handoff instructions.
- Ensure the homepage does not show invented analytics as live data.

## Acceptance criteria
- `app/page.tsx`, `app/globals.css`, and `app/api/health/route.ts` are valid files with their intended contents.
- `/api/search` rejects invalid input, limits results to 50, and never returns the API key.
- YouTube API calls are server-side and use the official API endpoint.
- The landing page clearly indicates that analytics are not live until data collection is configured.
- Prisma schema and project setup are documented; no secrets are committed.
- Run lint/build and record actual results. If the environment is unavailable, state that explicitly and do not mark the task complete.

## Review notes
The malformed file from the original scaffold may still exist in Git history/current tree because the repository write integration supports file creation and updates but not deletion. If it is visible in the tree, remove it using a normal Git commit in a capable workspace.

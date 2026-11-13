# P0 — Restore runnable application scaffold

## Why this is first
The initial scaffold commit misplaced dashboard source into the global stylesheet and created a malformed health-route filename. The repository needs a valid, buildable Next.js baseline before feature work can be safely layered on.

## Scope
- Restore the landing page and global CSS to their correct paths.
- Provide a correctly named health endpoint and a server-only YouTube search endpoint with validated query parameters.
- Add clear setup, architecture, and AI-coder handoff instructions.
- Ensure the homepage does not show invented analytics as live data.
- Validate and correct Prisma relations and add analytics query indexes.

## Acceptance criteria
- `app/page.tsx`, `app/globals.css`, and `app/api/health/route.ts` are valid files with their intended contents.
- `/api/search` rejects invalid input, limits results to 50, and never returns the API key.
- YouTube API calls are server-side and use the official API endpoint.
- The landing page clearly indicates that analytics are not live until data collection is configured.
- Prisma relations for niche hierarchy and user-owned records are valid; useful video/snapshot indexes exist.
- Setup and project structure are documented; no secrets are committed.
- Run lint/build and `npx prisma validate`; record actual results. If the environment is unavailable, state that explicitly and do not mark the task complete.

## Review notes
The malformed file from the original scaffold may still exist in Git history/current tree because repository file-write tools cannot remove it. If visible in the tree, delete it using a normal Git commit in a capable workspace.

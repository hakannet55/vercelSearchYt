# Vercel Search YT

A Vercel-oriented foundation for YouTube niche research and viral-opportunity analysis. The core product idea is to find videos that outperform a channel's usual results at a comparable age—not simply videos with the most views.

## Current status
This is an early scaffold, not a finished production SaaS. It includes a Next.js app shell, PostgreSQL/Prisma starting schema, server-side YouTube video search, health/configuration endpoint, and an AI-coder task workflow. There is no ingestion pipeline or live analytics dashboard yet, and the landing page deliberately does not show invented data.

## Stack
- Next.js 14 App Router + TypeScript
- Tailwind CSS
- PostgreSQL + Prisma ORM
- Official YouTube Data API v3 (server-side only)

## Local setup

1. Install Node.js 20+ and PostgreSQL.
2. Install dependencies: `npm install`.
3. Copy `.env.example` to `.env.local` and set `DATABASE_URL` and `YOUTUBE_API_KEY`.
4. Generate Prisma Client: `npx prisma generate`.
5. Create a local migration after reviewing the schema: `npx prisma migrate dev --name init`.
6. Start the app: `npm run dev`.
7. Check `http://localhost:3000/api/health` and try `http://localhost:3000/api/search?q=cozy+gaming`.

Search requires a valid YouTube Data API key and consumes Google API quota. The health endpoint only checks whether environment values are configured; it does not validate the credentials or connect to the database.

## Environment variables
See `.env.example`. `YOUTUBE_API_KEY` is accessed only in server-side code. Do not prefix it with `NEXT_PUBLIC_` and do not commit secrets.

## Verification
Run `npm run lint`, `npm run build`, and `npx prisma validate` after installing dependencies and configuring the required environment. The schema may be validated without applying migrations; production migrations should be reviewed and deployed explicitly.

## AI coder: where to continue
1. Read `AGENTS.md`, `docs/ARCHITECTURE.md`, and `tasks/README.md`.
2. Pick the highest-priority task from `tasks/next/` and follow its acceptance criteria.
3. Review the diff and run checks. Only move a task to `tasks/completed/` when implementation and verification are both complete; write down actual results.
4. When the active queue is empty, create task files from `features/next/` and update `tasks/README.md`.

## Product integrity
Use the official YouTube API, respect quota, retain historical snapshots, separate Shorts/long-form/live baselines, and present estimated revenue as an estimate. Never invent analytics or imply public API data includes private creator revenue.

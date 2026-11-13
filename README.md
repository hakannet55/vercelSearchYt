# Vercel Search YT

A SaaS-style YouTube niche research & viral opportunity intelligence platform designed for Vercel.

## Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma ORM
- PostgreSQL
- YouTube Data API v3

## Goals

This repo is intentionally scaffolded as a production-ready starting point for the architecture described in the project brief. It includes:

- app shell and dashboard starter
- Prisma schema for analytics models
- YouTube API type stubs
- outlier analytics utilities
- Vercel-friendly route structure

## Key files

- `app/page.tsx` — dashboard landing page
- `lib/analytics/outlier.ts` — outlier calculation helpers
- `prisma/schema.prisma` — normalized PostgreSQL schema
- `lib/youtube/types.ts` — typed YouTube API contracts

## Quick start

1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Generate Prisma client:
   ```bash
   npx prisma generate
   ```
4. Start the app:
   ```bash
   npm run dev
   ```

## Next phases

The next implementation steps should be:

1. Build the YouTube client abstraction under `lib/youtube/`
2. Add API routes for search, channels, videos, and niches
3. Implement Prisma queries and data refresh jobs
4. Add scheduler / cron flow for analytics updates
5. Build dashboard and explorer pages for channel and video metrics

## Important note

This repository started as a specification-only file (`first`). The actual project implementation was scaffolded here as a foundation. It is ready for iterative feature development.

export const dynamic = 'force-dynamic';

export async function GET() {
  const checks = {
    youtubeApiConfigured: Boolean(process.env.YOUTUBE_API_KEY),
    databaseConfigured: Boolean(process.env.DATABASE_URL),
  };
  return Response.json({ status: 'ok', checks, timestamp: new Date().toISOString() });
}

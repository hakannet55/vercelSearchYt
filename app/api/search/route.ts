import { z } from 'zod';
import { searchVideos } from '@/lib/youtube/search';

const searchQuerySchema = z.object({
  q: z.string().trim().min(1).max(100),
  maxResults: z.coerce.number().int().min(1).max(50).default(10),
  order: z.enum(['relevance', 'date', 'viewCount', 'rating', 'title']).default('relevance'),
  regionCode: z.string().trim().regex(/^[A-Za-z]{2}$/).optional(),
  videoDuration: z.enum(['any', 'short', 'medium', 'long']).default('any'),
});

export async function GET(request: Request) {
  const url = new URL(request.url);
  const parsed = searchQuerySchema.safeParse({
    q: url.searchParams.get('q'),
    maxResults: url.searchParams.get('maxResults') ?? undefined,
    order: url.searchParams.get('order') ?? undefined,
    regionCode: url.searchParams.get('regionCode') ?? undefined,
    videoDuration: url.searchParams.get('videoDuration') ?? undefined,
  });

  if (!parsed.success) {
    return Response.json({ error: 'Invalid search parameters.', details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const videos = await searchVideos(parsed.data);
    return Response.json({ data: videos, meta: { query: parsed.data.q, count: videos.length } });
  } catch (error) {
    if (error instanceof Error && error.message === 'YOUTUBE_API_KEY is not configured') {
      return Response.json({ error: 'YouTube search is not configured on this deployment.' }, { status: 503 });
    }

    console.error('YouTube search failed', error);
    return Response.json({ error: 'YouTube search is temporarily unavailable.' }, { status: 502 });
  }
}

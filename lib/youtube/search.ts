import type { YoutubeSearchResult } from './types';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

export async function youtubeGet<T>(resource: string, params: Record<string, string | number | undefined>): Promise<T> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error('YOUTUBE_API_KEY is not configured');

  const url = new URL(`${YOUTUBE_API_BASE_URL}/${resource}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  url.searchParams.set('key', apiKey);

  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) {
    // Do not bubble Google's response body or request URL: both may reveal sensitive details.
    throw new Error(`YouTube Data API request failed with status ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export type YoutubeSearchOptions = {
  q: string;
  maxResults: number;
  order: 'relevance' | 'date' | 'viewCount' | 'rating' | 'title';
  regionCode?: string;
  videoDuration: 'any' | 'short' | 'medium' | 'long';
};

export type NormalizedYoutubeSearchVideo = {
  youtubeVideoId: string;
  title: string;
  description: string;
  channelId: string;
  channelTitle: string;
  publishedAt: string;
  thumbnailUrl: string | null;
};

export async function searchVideos(options: YoutubeSearchOptions): Promise<NormalizedYoutubeSearchVideo[]> {
  const result = await youtubeGet<{ items?: YoutubeSearchResult[] }>('search', {
    part: 'snippet',
    type: 'video',
    q: options.q,
    maxResults: options.maxResults,
    order: options.order,
    regionCode: options.regionCode,
    videoDuration: options.videoDuration === 'any' ? undefined : options.videoDuration,
  });

  return (result.items ?? []).flatMap((item) => {
    const videoId = item.id.videoId;
    if (!videoId) return [];
    const thumbnails = item.snippet.thumbnails;
    const thumbnailUrl = thumbnails.maxres?.url ?? thumbnails.high?.url ?? thumbnails.medium?.url ?? thumbnails.default?.url ?? null;
    return [{
      youtubeVideoId: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnailUrl,
    }];
  });
}

export type YoutubeVideoFormat = 'SHORT' | 'LONG' | 'LIVE';

export type YoutubeChannel = {
  id: string;
  youtubeChannelId: string;
  title: string;
  description?: string | null;
  customUrl?: string | null;
  country?: string | null;
  language?: string | null;
  publishedAt?: Date | string | null;
  subscriberCount?: number | null;
  videoCount?: number | null;
  viewCount?: number | null;
  thumbnailUrl?: string | null;
  channelType?: string | null;
  isShortsFocused?: boolean | null;
  isFaceless?: boolean | null;
  facelessConfidence?: number | null;
};

export type YoutubeVideo = {
  id: string;
  youtubeVideoId: string;
  channelId: string;
  title: string;
  description?: string | null;
  publishedAt?: Date | string | null;
  durationSeconds?: number | null;
  categoryId?: number | null;
  thumbnailUrl?: string | null;
  viewCount?: number | null;
  likeCount?: number | null;
  commentCount?: number | null;
  isShort?: boolean | null;
  isLive?: boolean | null;
  tags?: string[] | null;
  language?: string | null;
  country?: string | null;
};

export type YoutubeSearchResult = {
  kind: 'youtube#searchResult';
  etag: string;
  id: { kind: string; videoId?: string; channelId?: string; playlistId?: string };
  snippet: {
    title: string;
    description: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: Record<string, { url: string; width: number; height: number }>;
  };
};

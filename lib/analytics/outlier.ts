import { median } from './statistics';

export type VideoFormat = 'SHORT' | 'LONG' | 'LIVE';
export type BaselineSource = 'CHANNEL' | 'NICHE' | 'GLOBAL';

export type BaselineSample = {
  views: number;
  ageHours: number;
  format: VideoFormat;
};

export type ExpectedViewsResult = {
  expectedViews: number | null;
  source: BaselineSource | null;
  sampleCount: number;
  status: 'OK' | 'INSUFFICIENT_DATA';
};

const MIN_BASELINE_SAMPLES = 5;
const AGE_BUCKETS = [1, 6, 12, 24, 48, 72, 168, 720, Number.POSITIVE_INFINITY];

export function calculateAgeSeconds(publishedAt: Date | string, now = new Date()): number {
  const publishedMs = new Date(publishedAt).getTime();
  if (!Number.isFinite(publishedMs)) return 0;
  return Math.max(0, Math.floor((now.getTime() - publishedMs) / 1000));
}

export function getAgeBucket(ageHours: number): string {
  if (!Number.isFinite(ageHours) || ageHours < 0) return 'unknown';
  let lower = 0;
  for (const upper of AGE_BUCKETS) {
    if (ageHours <= upper) return `${lower}-${Number.isFinite(upper) ? upper : 'plus'}h`;
    lower = upper;
  }
  return '720-plus-h';
}

function comparable(sample: BaselineSample, targetAgeHours: number, format: VideoFormat): boolean {
  if (sample.format !== format || !Number.isFinite(sample.views) || sample.views < 0 || !Number.isFinite(sample.ageHours)) return false;
  // Use a multiplicative age window to avoid directly comparing new and mature videos.
  const safeTargetAge = Math.max(targetAgeHours, 0.25);
  return sample.ageHours >= safeTargetAge / 2 && sample.ageHours <= safeTargetAge * 2;
}

export function calculateExpectedViews(input: {
  ageHours: number;
  format: VideoFormat;
  channelSamples: BaselineSample[];
  nicheSamples?: BaselineSample[];
  globalSamples?: BaselineSample[];
  minimumSamples?: number;
}): ExpectedViewsResult {
  const minimumSamples = input.minimumSamples ?? MIN_BASELINE_SAMPLES;
  const populations: [BaselineSource, BaselineSample[]][] = [
    ['CHANNEL', input.channelSamples],
    ['NICHE', input.nicheSamples ?? []],
    ['GLOBAL', input.globalSamples ?? []],
  ];

  for (const [source, samples] of populations) {
    const filtered = samples.filter((sample) => comparable(sample, input.ageHours, input.format));
    if (filtered.length >= minimumSamples) {
      return { expectedViews: median(filtered.map((sample) => sample.views)), source, sampleCount: filtered.length, status: 'OK' };
    }
  }
  return { expectedViews: null, source: null, sampleCount: 0, status: 'INSUFFICIENT_DATA' };
}

export function calculateOutlierScore(actualViews: number, expectedViews: number | null): number | null {
  if (!Number.isFinite(actualViews) || actualViews < 0 || expectedViews === null || !Number.isFinite(expectedViews) || expectedViews <= 0) return null;
  return actualViews / expectedViews;
}

export function calculateAgeAdjustedPerformance(views: number, ageSeconds: number, channelMedianViews: number): number {
  if (!Number.isFinite(views) || views < 0 || !Number.isFinite(ageSeconds) || ageSeconds <= 0 || !Number.isFinite(channelMedianViews) || channelMedianViews <= 0) return 0;
  return (views / (ageSeconds / 3600)) / (channelMedianViews / (ageSeconds / 3600));
}

export function calculateChannelBaseline(history: number[]): number | null {
  const valid = history.filter((value) => Number.isFinite(value) && value >= 0);
  return valid.length ? median(valid) : null;
}

export function calculateEngagementRates(input: { views: number; likes?: number | null; comments?: number | null }) {
  const views = Number.isFinite(input.views) && input.views > 0 ? input.views : 0;
  const likes = Number.isFinite(input.likes) && (input.likes ?? -1) >= 0 ? input.likes ?? 0 : null;
  const comments = Number.isFinite(input.comments) && (input.comments ?? -1) >= 0 ? input.comments ?? 0 : null;
  return {
    likeRate: views > 0 && likes !== null ? likes / views : null,
    commentRate: views > 0 && comments !== null ? comments / views : null,
    engagementRate: views > 0 && likes !== null && comments !== null ? (likes + comments) / views : null,
  };
}

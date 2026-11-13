export type AgeBucket =
  | '0-1h'
  | '1-6h'
  | '6-12h'
  | '12-24h'
  | '1-2d'
  | '2-3d'
  | '3-7d'
  | '7-30d'
  | '30d+';

export function calculateAgeAdjustedPerformance(views: number, ageSeconds: number, channelMedianViews: number, ageWeight = 1): number {
  if (ageSeconds <= 0 || channelMedianViews <= 0 || views < 0) return 0;
  const videoVph = views / Math.max(ageSeconds / 3600, 0.01);
  const baselineVph = channelMedianViews / Math.max(ageSeconds / 3600, 0.01);
  return videoVph / baselineVph ** ageWeight;
}

export function calculateExpectedViews(channelBaseline: number, ageSeconds: number): number {
  if (channelBaseline <= 0 || ageSeconds <= 0) return 0;
  // Kept for backwards compatibility only. Prefer the sample-based calculator in outlier.ts.
  return channelBaseline * Math.max(ageSeconds / (24 * 3600), 0.25);
}

export function calculateChannelBaseline(history: number[]): number {
  if (history.length === 0) return 0;
  const sorted = [...history].filter(Number.isFinite).sort((a, b) => a - b);
  if (sorted.length === 0) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
}

export function calculateOutlierScore(actualViews: number, expectedViews: number): number {
  if (expectedViews <= 0 || actualViews < 0) return 0;
  return actualViews / expectedViews;
}

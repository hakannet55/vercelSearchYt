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

export function calculateAgeAdjustedPerformance(
  views: number,
  ageSeconds: number,
  channelMedianViews: number,
  ageWeight = 1,
): number {
  if (ageSeconds <= 0 || channelMedianViews <= 0) {
    return 0;
  }

  const ageAdjusted = views / Math.max(ageSeconds / 3600, 1) ** ageWeight;
  return ageAdjusted / channelMedianViews;
}

export function calculateExpectedViews(channelBaseline: number, ageSeconds: number): number {
  if (channelBaseline <= 0 || ageSeconds <= 0) {
    return 0;
  }

  const ageFactor = Math.max(ageSeconds / 3600, 1) / 24;
  return channelBaseline * Math.max(ageFactor, 0.25);
}

export function calculateChannelBaseline(history: number[]): number {
  if (history.length === 0) {
    return 0;
  }

  const sorted = [...history].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }

  return sorted[mid];
}

export function calculateOutlierScore(actualViews: number, expectedViews: number): number {
  if (expectedViews <= 0) {
    return 0;
  }

  return actualViews / expectedViews;
}

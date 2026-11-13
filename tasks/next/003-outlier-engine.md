# P1 — Add honest age- and format-adjusted outlier engine

## Goal
Calculate expected performance from comparable historical observations, with transparent fallback behavior.

## Scope
- Define format values `SHORT`, `LONG`, and `LIVE`; never mix baseline populations.
- Compare age-compatible video snapshots or baseline samples using robust median and percentile statistics.
- Implement fallback channel → niche → global only where the corresponding data exists.
- Return an explicit insufficient-data state rather than a fabricated expected view count.
- Calculate outlier ratio, normalized score, relative VPH, age buckets, engagement rates, and percentile with safe zero/missing handling.
- Add unit tests for boundary ages, zero views, missing values, skewed history, and format separation.

## Acceptance criteria
- A video is only compared with samples for the same format and comparable age.
- Median is resistant to a single viral observation.
- No division-by-zero or unsupported baseline produces a plausible-looking score.
- Results include the chosen baseline source and sample count for explanation.
- All calculation tests pass.

## Dependencies
Complete `002-persist-discovery.md` first, or provide an explicit typed input adapter if persistence is staged separately.

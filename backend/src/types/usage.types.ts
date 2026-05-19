export const USAGE_TYPES = ["embedded", "copied", "paraphrased", "inferred", "badge"] as const;
export const USAGE_STATUSES = ["current", "stale", "risky", "unknown"] as const;

export type UsageType = (typeof USAGE_TYPES)[number];
export type UsageStatus = (typeof USAGE_STATUSES)[number];

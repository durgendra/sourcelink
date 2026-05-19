export const SEVERITIES = ["critical", "high", "medium", "low"] as const;
export const FINDING_STATUSES = ["open", "accepted", "dismissed", "needs_review", "fixed"] as const;
export const FINDING_ISSUE_TYPES = [
  "stale_source_version",
  "unsupported_affiliation_language",
  "outdated_logo",
  "incorrect_product_name",
  "missing_disclaimer",
  "unsupported_claim",
  "warranty_mismatch",
  "geographic_overgeneralization",
  "product_scope_overgeneralization",
  "licensing_mismatch"
] as const;
export const TASK_STATUSES = [
  "open",
  "needs_review",
  "approved",
  "sent_to_partner",
  "fixed",
  "dismissed"
] as const;

export type Severity = (typeof SEVERITIES)[number];
export type FindingStatus = (typeof FINDING_STATUSES)[number];
export type FindingIssueType = (typeof FINDING_ISSUE_TYPES)[number];
export type TaskStatus = (typeof TASK_STATUSES)[number];

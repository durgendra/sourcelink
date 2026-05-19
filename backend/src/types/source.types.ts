export const SOURCE_OBJECT_TYPES = [
  "claim",
  "logo",
  "disclaimer",
  "document",
  "brand_rule",
  "product_spec",
  "warranty",
  "certification",
  "code_example"
] as const;

export const SOURCE_STATUSES = ["active", "retired", "draft"] as const;
export const SOURCE_VERSION_STATUSES = ["current", "previous", "retired"] as const;
export const SOURCE_EVENT_TYPES = [
  "source_created",
  "source_updated",
  "source_retired",
  "source_moved"
] as const;
export const CHANGE_TYPES = [
  "warranty_changed",
  "brand_rule_changed",
  "disclaimer_changed",
  "product_claim_changed",
  "logo_changed",
  "naming_changed",
  "availability_changed",
  "licensing_changed"
] as const;

export type SourceObjectType = (typeof SOURCE_OBJECT_TYPES)[number];
export type SourceStatus = (typeof SOURCE_STATUSES)[number];
export type SourceVersionStatus = (typeof SOURCE_VERSION_STATUSES)[number];
export type SourceEventType = (typeof SOURCE_EVENT_TYPES)[number];
export type ChangeType = (typeof CHANGE_TYPES)[number];

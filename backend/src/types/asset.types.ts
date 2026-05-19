export const ASSET_TYPES = [
  "webpage",
  "pdf",
  "deck",
  "marketplace_listing",
  "email",
  "document"
] as const;

export type AssetType = (typeof ASSET_TYPES)[number];

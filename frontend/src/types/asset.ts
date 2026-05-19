export type AssetRisk = "Critical" | "High" | "Medium" | "Low";

export interface DownstreamAsset {
  id: string;
  assetName: string;
  assetType: "Webpage" | "PDF" | "Deck" | "Marketplace Listing" | "Email" | "Document";
  ownerName: string;
  partnerName: string;
  url?: string;
  excerpt: string;
  risk: AssetRisk;
  status: "Linked" | "Stale" | "Needs Review";
}

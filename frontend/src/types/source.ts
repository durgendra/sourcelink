export type SourceType =
  | "Claim"
  | "Logo"
  | "Disclaimer"
  | "Document"
  | "Brand Rule"
  | "Product Spec"
  | "Warranty"
  | "Certification";

export type SourceStatus = "Active" | "Draft" | "Retired";

export interface SourceObject {
  id: string;
  sourceId: string;
  name: string;
  objectType: SourceType;
  ownerName: string;
  ownerDomain: string;
  status: SourceStatus;
  currentVersion: string;
  canonicalUrl: string;
  scope: string;
  sourceText: string;
}

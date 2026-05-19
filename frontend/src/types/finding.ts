export type Severity = "Critical" | "High" | "Medium" | "Low";
export type FindingStatus = "Open" | "Needs Review" | "Needs Legal Review" | "Accepted" | "Dismissed" | "Resolved";

export interface Finding {
  id: string;
  severity: Severity;
  issueType: string;
  issue: string;
  source: string;
  downstreamAsset: string;
  evidence: string;
  approvedSource: string;
  whyItMatters: string;
  suggestedFix: string;
  status: FindingStatus;
  module: "Brand Audit" | "Claim Audit" | "Hierarchy Audit";
  confidence: number;
}

export interface ImpactTask {
  id: string;
  findingId: string;
  assignee: string;
  status: "Open" | "Needs Review" | "Approved" | "Sent To Partner" | "Fixed";
  dueDate: string;
  suggestedAction: string;
}

import type { DownstreamAsset } from "./asset";

export interface ImpactNode {
  name: string;
  risk: "high" | "medium" | "low";
}

export interface ImpactGraphData {
  source: string;
  nodes: ImpactNode[];
}

export interface SourceUpdateSummary {
  title: string;
  updatedAgo: string;
  materialChanges: string[];
  downstreamImpact: string[];
}

export interface SummaryStats {
  sourcesMonitored: number;
  downstreamAssetsLinked: number;
  openHighRiskFindings: number;
  impactedPartners: number;
  pendingReviewTasks: number;
  avgSourceFreshness: number;
}

export interface ImpactedAssetListItem extends DownstreamAsset {}

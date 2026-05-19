import type { Finding, ImpactTask } from "./finding";
import type { ImpactGraphData, SourceUpdateSummary, SummaryStats } from "./impact";
import type { Report } from "./report";

export interface Audit {
  id: string;
  name: string;
  subtitle: string;
  latestEventId?: string | null;
  summary: SummaryStats;
  sourceUpdate: SourceUpdateSummary;
  impactedAssets: Array<{
    id: string;
    name: string;
    risk: "High" | "Medium" | "Low";
  }>;
  impactGraph: ImpactGraphData;
  findings: Finding[];
  tasks: ImpactTask[];
  report: Report;
}

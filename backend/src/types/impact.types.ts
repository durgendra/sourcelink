export interface ImpactSummary {
  eventId: string;
  impactedAssets: number;
  findings: Record<"critical" | "high" | "medium" | "low", number>;
  tasksCreated: number;
}

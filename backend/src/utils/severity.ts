import type { Severity } from "../types/finding.types";

export const severityOrder: Severity[] = ["critical", "high", "medium", "low"];

export const countBySeverity = <T extends { severity: Severity }>(items: T[]) => ({
  critical: items.filter((item) => item.severity === "critical").length,
  high: items.filter((item) => item.severity === "high").length,
  medium: items.filter((item) => item.severity === "medium").length,
  low: items.filter((item) => item.severity === "low").length
});

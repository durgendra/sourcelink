import type { Severity } from "../types/finding";

export const severityClasses: Record<Severity, string> = {
  Critical: "bg-red-50 text-red-700 border-red-200",
  High: "bg-orange-50 text-orange-700 border-orange-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-emerald-50 text-emerald-700 border-emerald-200"
};

export const severityDot: Record<Severity, string> = {
  Critical: "bg-red-600",
  High: "bg-orange-600",
  Medium: "bg-amber-500",
  Low: "bg-emerald-600"
};

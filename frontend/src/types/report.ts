export interface ReportSection {
  title: string;
  body: string;
}

export interface Report {
  id: string;
  reportType: "JSON" | "CSV" | "PDF";
  generatedAt: string;
  executiveSummary: string;
  sourceChange: string[];
  impactedAssets: string[];
  highRiskFindings: string[];
  evidence: string[];
  suggestedFixes: string[];
  reviewTasks: string[];
  disclaimer: string;
}

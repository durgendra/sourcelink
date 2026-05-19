import type { Report } from "../../types/report";
import { Download } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function ReportPreview({ report }: { report: Report }) {
  return (
    <div className="max-w-4xl mx-auto py-10 space-y-12 animate-in slide-in-from-bottom duration-500">
      <div className="flex justify-between items-start border-b border-border pb-8">
        <div>
          <Badge variant="info" className="mb-4">Internal Report Preview</Badge>
          <h2 className="text-4xl font-bold text-brand-navy tracking-tight">Source Drift Impact Report</h2>
          <p className="text-text-secondary mt-2">Generated {report.generatedAt}</p>
        </div>
        <Button className="gap-2 shrink-0">
          <Download className="w-4 h-4" /> Download PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted">Executive Summary</h3>
          <p className="text-sm leading-relaxed text-text-primary">{report.executiveSummary}</p>
        </div>
        <div className="space-y-4">
          <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted">Source Change</h3>
          <div className="p-4 bg-surface-muted rounded-xl text-xs space-y-2">
            {report.sourceChange.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="font-bold text-sm uppercase tracking-widest text-text-muted">High-Risk Findings Evidence</h3>
        <div className="space-y-4">
          {report.highRiskFindings.map((finding, index) => (
            <div key={finding} className="p-6 border border-border rounded-xl bg-white shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-brand-navy">{finding}</span>
                <Badge variant="error">High Risk</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-xs p-3 bg-severity-warning/5 rounded-lg border border-severity-warning/10">
                  <div className="font-bold text-severity-warning mb-1 uppercase tracking-tight">Third-party Evidence</div>
                  {report.evidence[index] ?? report.evidence[0]}
                </div>
                <div className="text-xs p-3 bg-severity-success/5 rounded-lg border border-severity-success/10">
                  <div className="font-bold text-severity-success mb-1 uppercase tracking-tight">Suggested Fix</div>
                  {report.suggestedFixes[index] ?? report.suggestedFixes[0]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Card className="p-10 bg-brand-navy text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to automate this workflow?</h3>
        <p className="text-gray-400 mb-8 max-w-lg mx-auto">SourceLink can automatically notify partners and supply suggested fixes via their portal APIs.</p>
        <div className="flex gap-4 justify-center">
          <Button className="bg-brand-blue">Enable Auto-Remediation</Button>
          <Button variant="outline">Learn More</Button>
        </div>
      </Card>

      <div className="text-center">
        <p className="text-[10px] text-text-muted italic">{report.disclaimer}</p>
      </div>
    </div>
  );
}

import type { Finding } from "../../types/finding";
import { Card } from "../ui/Card";

export function EvidencePanel({ finding }: { finding: Finding }) {
  return (
    <Card className="p-8">
      <h3 className="text-lg font-bold text-brand-navy">Evidence</h3>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <div className="text-xs p-4 bg-severity-warning/5 rounded-lg border border-severity-warning/10">
          <div className="font-bold text-severity-warning mb-2 uppercase tracking-tight">Third-party Evidence</div>
          <p className="text-sm leading-7 text-text-primary">{finding.evidence}</p>
        </div>
        <div className="text-xs p-4 bg-severity-success/5 rounded-lg border border-severity-success/10">
          <div className="font-bold text-severity-success mb-2 uppercase tracking-tight">Approved Source</div>
          <p className="text-sm leading-7 text-text-primary">{finding.approvedSource}</p>
        </div>
      </div>
    </Card>
  );
}

import { X } from "lucide-react";
import { useDemoStore } from "../../store/useDemoStore";
import { Drawer } from "../ui/Drawer";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { SeverityBadge } from "../ui/SeverityBadge";

export function FindingDetailDrawer() {
  const { selectedFinding, selectFinding, updateFindingStatus } = useDemoStore();
  if (!selectedFinding) return null;

  return (
    <Drawer open={Boolean(selectedFinding)} onClose={() => selectFinding(null)}>
      <div className="flex items-start justify-between">
        <div>
          <SeverityBadge severity={selectedFinding.severity} />
          <h2 className="mt-4 text-2xl font-bold text-brand-navy">{selectedFinding.issue}</h2>
          <p className="mt-2 text-sm text-text-secondary">Confidence: {Math.round(selectedFinding.confidence * 100)}%</p>
        </div>
        <button className="rounded-xl border border-border p-2" onClick={() => selectFinding(null)}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-6 space-y-5 text-sm text-text-secondary">
        <div><strong className="text-brand-navy">Issue type:</strong> {selectedFinding.issueType}</div>
        <div><strong className="text-brand-navy">Status:</strong> {selectedFinding.status}</div>
      </div>
      <div className="mt-6 grid gap-4">
        <Card className="p-4 bg-severity-warning/5 border-severity-warning/10">
          <div className="text-[10px] font-bold text-severity-warning uppercase tracking-tight mb-2">Third-party evidence</div>
          <p className="text-sm text-brand-navy">{selectedFinding.evidence}</p>
        </Card>
        <Card className="p-4 bg-severity-success/5 border-severity-success/10">
          <div className="text-[10px] font-bold text-severity-success uppercase tracking-tight mb-2">Approved source</div>
          <p className="text-sm text-brand-navy">{selectedFinding.approvedSource}</p>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] font-bold text-text-muted uppercase tracking-tight mb-2">Why this matters</div>
          <p className="text-sm text-brand-navy">{selectedFinding.whyItMatters}</p>
        </Card>
        <Card className="p-4 bg-brand-blue/5 border-brand-blue/10">
          <div className="text-[10px] font-bold text-brand-blue uppercase tracking-tight mb-2">Suggested fix</div>
          <p className="text-sm text-brand-navy">{selectedFinding.suggestedFix}</p>
        </Card>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button onClick={() => void updateFindingStatus(selectedFinding.id, "Accepted")}>Accept finding</Button>
        <Button variant="secondary" onClick={() => void updateFindingStatus(selectedFinding.id, "Dismissed")}>Dismiss</Button>
        <Button variant="secondary" onClick={() => void updateFindingStatus(selectedFinding.id, "Needs Legal Review")}>Needs legal review</Button>
      </div>
    </Drawer>
  );
}

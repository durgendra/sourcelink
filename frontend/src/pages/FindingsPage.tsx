import { FindingDetailDrawer } from "../components/sourcelink/FindingDetailDrawer";
import { FindingTable } from "../components/sourcelink/FindingTable";
import { useDemoStore } from "../store/useDemoStore";

export function FindingsPage() {
  const findings = useDemoStore((state) => state.findings);
  const selectFinding = useDemoStore((state) => state.selectFinding);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Findings</h1>
        <p className="mt-2 text-text-secondary">Evidence-backed review items generated from source updates and downstream usage detection.</p>
      </div>
      <FindingTable findings={findings} onSelect={selectFinding} />
      <FindingDetailDrawer />
    </div>
  );
}

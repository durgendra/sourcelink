import { useParams } from "react-router-dom";
import { mockSourceVersions } from "../data/mockSourceVersions";
import { DownstreamAssetList } from "../components/sourcelink/DownstreamAssetList";
import { EvidencePanel } from "../components/sourcelink/EvidencePanel";
import { FindingDetailDrawer } from "../components/sourcelink/FindingDetailDrawer";
import { FindingTable } from "../components/sourcelink/FindingTable";
import { ReportPreview } from "../components/sourcelink/ReportPreview";
import { SourceVersionDiff } from "../components/sourcelink/SourceVersionDiff";
import { SuggestedFixBox } from "../components/sourcelink/SuggestedFixBox";
import { Card } from "../components/ui/Card";
import { RiskScoreCard } from "../components/ui/RiskScoreCard";
import { Tabs } from "../components/ui/Tabs";
import { useDemoStore } from "../store/useDemoStore";
import { useState } from "react";

const tabs = ["Summary", "Source Change", "Impacted Assets", "Findings", "Evidence", "Suggested Updates", "Report"];

export function AuditDetailPage() {
  const { auditId } = useParams();
  const audit = useDemoStore((state) => state.audit);
  const assets = useDemoStore((state) => state.assets);
  const [activeTab, setActiveTab] = useState("Summary");
  const { selectFinding, selectedFinding } = useDemoStore();
  const oldVersion = mockSourceVersions[0];
  const newVersion = mockSourceVersions[1];
  if (!audit) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">{auditId === audit.id ? audit.name : audit.name}</h1>
        <p className="mt-2 text-text-secondary">{audit.subtitle}</p>
      </div>
      <Tabs items={tabs} active={activeTab} onChange={setActiveTab} />
      <div className="grid gap-4 md:grid-cols-3">
        <RiskScoreCard title="High risk" value="8" caption="Immediate remediation needed" />
        <RiskScoreCard title="Medium risk" value="6" caption="Review queued for content ops" />
        <RiskScoreCard title="Low risk" value="3" caption="Monitor and refresh in batch" />
      </div>
      {(activeTab === "Summary" || activeTab === "Source Change") && <SourceVersionDiff oldVersion={oldVersion} newVersion={newVersion} />}
      {(activeTab === "Summary" || activeTab === "Impacted Assets") && <DownstreamAssetList assets={assets} />}
      {(activeTab === "Summary" || activeTab === "Findings") && <FindingTable findings={audit.findings} onSelect={selectFinding} />}
      {(activeTab === "Summary" || activeTab === "Evidence") && selectedFinding && <EvidencePanel finding={selectedFinding} />}
      {(activeTab === "Summary" || activeTab === "Suggested Updates") && selectedFinding && <SuggestedFixBox finding={selectedFinding} />}
      {activeTab === "Report" && <ReportPreview report={audit.report} />}
      <Card className="p-6 border-t border-border bg-surface-muted/30 text-center">
        <p className="text-[10px] text-text-muted italic">Synthetic demo inspired by realistic public content. No customer relationship is implied.</p>
      </Card>
      <FindingDetailDrawer />
    </div>
  );
}

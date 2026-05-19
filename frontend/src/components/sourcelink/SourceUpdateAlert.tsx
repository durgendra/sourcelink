import { ArrowRight, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import type { SourceUpdateSummary } from "../../types/impact";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";

export function SourceUpdateAlert({ sourceUpdate }: { sourceUpdate: SourceUpdateSummary }) {
  return (
    <Card className="relative overflow-hidden border-brand-blue/20 bg-brand-blue/5">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-4 p-8">
          <Badge variant="info">Source Update Detected</Badge>
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
              <RefreshCw className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-brand-navy">Source Update Detected</h2>
              <p className="text-xs text-text-muted font-medium uppercase tracking-wider">{sourceUpdate.title} • {sourceUpdate.updatedAgo}</p>
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Material changes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {sourceUpdate.materialChanges.map((change) => (
                <span key={change} className="px-2.5 py-1 bg-white border border-brand-blue/10 rounded-lg text-xs font-medium text-brand-blue">{change}</span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-text-muted">Downstream impact</p>
            <ul className="mt-3 space-y-2 text-sm text-text-secondary">
              {sourceUpdate.downstreamImpact.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <Link to="/app/audits/audit-apple-style" className="p-8 pt-0 lg:pt-8">
          <Button>
            Review Impact
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}

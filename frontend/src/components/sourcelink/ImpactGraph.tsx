import { Badge } from "../ui/Badge";
import type { ImpactGraphData } from "../../types/impact";
import { Card } from "../ui/Card";
import { cn } from "../../lib/utils";

export function ImpactGraph({ graph }: { graph: ImpactGraphData }) {
  return (
    <Card className="flex-1 p-8 relative overflow-hidden bg-surface-muted/30">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-brand-navy">Impact graph</h3>
        <p className="mt-1 text-sm text-text-secondary">{graph.source} cascades into downstream content risk.</p>
      </div>
      <div className="flex flex-col items-center gap-10 relative py-6">
        <div className="px-6 py-3 bg-brand-navy text-white rounded-xl font-bold text-sm shadow-xl">
          {graph.source}
        </div>
        <div className="grid w-full gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {graph.nodes.map((node) => (
            <div key={node.name} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-full py-3 px-3 rounded-lg border text-[10px] font-bold text-center min-h-14 flex items-center justify-center leading-tight shadow-sm bg-white",
                  node.risk === "high"
                    ? "border-severity-high/30 text-brand-navy ring-2 ring-severity-high/5"
                    : node.risk === "medium"
                      ? "border-severity-warning/30 text-brand-navy ring-2 ring-severity-warning/5"
                      : "border-border text-text-muted"
                )}
              >
                {node.name}
              </div>
              <Badge variant={node.risk === "high" ? "error" : "warning"}>{node.risk === "high" ? "High Risk" : "Medium Risk"}</Badge>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

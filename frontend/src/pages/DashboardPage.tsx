import { motion } from "framer-motion";
import { ArrowRight, Download, ExternalLink, Filter, Files, MoreVertical, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FindingDetailDrawer } from "../components/sourcelink/FindingDetailDrawer";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { StatCard } from "../components/ui/StatCard";
import { useDemoStore } from "../store/useDemoStore";
import { cn } from "../lib/utils";

export function DashboardPage() {
  const audit = useDemoStore((state) => state.audit);
  const findings = useDemoStore((state) => state.findings);
  const selectFinding = useDemoStore((state) => state.selectFinding);
  if (!audit) return null;

  const stats = [
    ["Sources Monitored", String(audit.summary.sourcesMonitored), "+2"],
    ["Assets Linked", String(audit.summary.downstreamAssetsLinked), "+14"],
    ["High Risk", String(audit.summary.openHighRiskFindings), "Action required"],
    ["Partners", String(audit.summary.impactedPartners), "Active"],
    ["Review Tasks", String(audit.summary.pendingReviewTasks), "Pending"],
    ["Freshness", `${audit.summary.avgSourceFreshness}%`, "Good"]
  ] as const;

  const chartData = [
    { name: "Critical", count: 4, fill: "#DC2626" },
    { name: "High", count: 9, fill: "#EA580C" },
    { name: "Med", count: 12, fill: "#F59E0B" },
    { name: "Low", count: 6, fill: "#2563EB" }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map(([label, value, note]) => (
          <div key={label}>
            <StatCard label={label} value={value} detail={note} />
          </div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="relative overflow-hidden border-brand-blue/20 bg-brand-blue/5">
          <div className="p-8 flex flex-col md:flex-row gap-8 items-start justify-between">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                  <RefreshCw className="text-brand-blue w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-brand-navy">Source Update Detected</h2>
                  <p className="text-xs text-text-muted font-medium uppercase tracking-wider">
                    {audit.sourceUpdate.title} • {audit.sourceUpdate.updatedAgo}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {audit.sourceUpdate.materialChanges.map((change) => (
                  <span key={change} className="px-2.5 py-1 bg-white border border-brand-blue/10 rounded-lg text-xs font-medium text-brand-blue">
                    {change}
                  </span>
                ))}
              </div>

              <div className="flex gap-6 pt-2">
                <div className="space-y-0.5">
                  <div className="text-xl font-bold text-brand-navy">12</div>
                  <div className="text-[10px] uppercase text-text-muted font-bold tracking-widest">Partner Pages</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-bold text-brand-navy">5</div>
                  <div className="text-[10px] uppercase text-text-muted font-bold tracking-widest">Marketplace</div>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-bold text-brand-navy">3</div>
                  <div className="text-[10px] uppercase text-text-muted font-bold tracking-widest">Sales Decks</div>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col gap-3">
              <Button size="lg" className="shadow-lg shadow-brand-blue/30 gap-2" asChild>
                <Link to="/app/impact">
                  Review Impact <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" className="bg-white" asChild>
                <Link to="/app/reports">View Impact Report</Link>
              </Button>
            </div>
          </div>
          <div className="absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-brand-blue/10 to-transparent pointer-events-none"></div>
        </Card>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="p-8 h-[400px] flex flex-col">
          <div className="mb-6">
            <h3 className="font-bold text-brand-navy">Findings by Severity</h3>
            <p className="text-xs text-text-muted">Overall drift landscape</p>
          </div>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#64748B", fontSize: 10, fontWeight: 600 }} dy={10} />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: "rgba(0,0,0,0.02)" }}
                  content={({ active, payload }) =>
                    active && payload && payload.length ? (
                      <div className="bg-brand-navy text-white px-3 py-2 rounded-lg text-xs font-bold shadow-xl">
                        {payload[0].payload.name}: {String(payload[0].value)}
                      </div>
                    ) : null
                  }
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
                  {chartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="p-8 border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-bold text-brand-navy">Active Findings</h3>
            <p className="text-xs text-text-muted">Showing all drift observations from recent scans</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="gap-2">
              <Filter className="w-3 h-3" /> Filter
            </Button>
            <Button variant="secondary" size="sm" className="gap-2">
              <Download className="w-3 h-3" /> Export
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-muted/50 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border">
                <th className="px-8 py-4">Severity</th>
                <th className="px-6 py-4">Finding</th>
                <th className="px-6 py-4">Module</th>
                <th className="px-6 py-4">Downstream Asset</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {findings.map((finding) => (
                <tr
                  key={finding.id}
                  className="group hover:bg-surface-muted/30 transition-colors cursor-pointer border-b border-border last:border-none"
                  onClick={() => selectFinding(finding)}
                >
                  <td className="px-8 py-5">
                    <Badge variant={finding.severity === "High" ? "error" : "warning"}>{finding.severity}</Badge>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-sm font-bold text-brand-navy mb-0.5">{finding.issue}</div>
                    <div className="text-[10px] text-text-muted flex items-center gap-1">
                      <Files className="w-3 h-3" /> {finding.source}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-medium text-text-secondary">{finding.module}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="text-xs font-medium text-brand-blue flex items-center gap-1 group-hover:underline">
                      {finding.downstreamAsset} <ExternalLink className="w-3 h-3" />
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full",
                          finding.status === "Open"
                            ? "bg-severity-warning"
                            : finding.status === "Needs Review"
                              ? "bg-brand-blue"
                              : "bg-brand-violet"
                        )}
                      />
                      <span className="text-xs font-medium text-text-primary">{finding.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-surface-muted rounded-lg text-text-muted">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-6 border-t border-border bg-surface-muted/30 text-center">
          <p className="text-[10px] text-text-muted italic">Synthetic demo inspired by realistic public content. No customer relationship is implied.</p>
        </div>
      </Card>

      <FindingDetailDrawer />
    </div>
  );
}

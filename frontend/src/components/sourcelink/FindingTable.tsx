import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Download, ExternalLink, Filter, MoreVertical, Files } from "lucide-react";
import type { Finding } from "../../types/finding";
import { Button } from "../ui/Button";
import { Card } from "../ui/Card";
import { SeverityBadge } from "../ui/SeverityBadge";
import { cn } from "../../lib/utils";

const columnHelper = createColumnHelper<Finding>();

export function FindingTable({
  findings,
  onSelect
}: {
  findings: Finding[];
  onSelect: (finding: Finding) => void;
}) {
  const columns = [
    columnHelper.accessor("severity", {
      header: "Severity",
      cell: (info) => <SeverityBadge severity={info.getValue()} />
    }),
    columnHelper.accessor("issue", { header: "Issue" }),
    columnHelper.accessor("source", { header: "Source" }),
    columnHelper.accessor("downstreamAsset", { header: "Downstream Asset" }),
    columnHelper.accessor("evidence", { header: "Evidence" }),
    columnHelper.accessor("suggestedFix", { header: "Suggested Fix" }),
    columnHelper.accessor("status", { header: "Status" })
  ];

  const table = useReactTable({ data: findings, columns, getCoreRowModel: getCoreRowModel() });

  return (
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
        <table className="w-full text-left border-collapse min-w-[920px]">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id} className="bg-surface-muted/50 text-[10px] font-bold text-text-muted uppercase tracking-widest border-b border-border">
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="px-6 py-4">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
                <th className="px-6 py-4"></th>
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="group hover:bg-surface-muted/30 transition-colors cursor-pointer border-b border-border last:border-none"
                onClick={() => onSelect(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-6 py-5 align-top text-text-secondary">
                    {cell.column.id === "issue" ? (
                      <div>
                        <div className="text-sm font-bold text-brand-navy mb-0.5">{row.original.issue}</div>
                        <div className="text-[10px] text-text-muted flex items-center gap-1">
                          <Files className="w-3 h-3" /> {row.original.source}
                        </div>
                      </div>
                    ) : cell.column.id === "downstreamAsset" ? (
                      <div className="text-xs font-medium text-brand-blue flex items-center gap-1 group-hover:underline">
                        {row.original.downstreamAsset} <ExternalLink className="w-3 h-3" />
                      </div>
                    ) : cell.column.id === "status" ? (
                      <div className="flex items-center gap-2">
                        <div
                          className={cn(
                            "w-2 h-2 rounded-full",
                            row.original.status === "Open"
                              ? "bg-severity-warning"
                              : row.original.status === "Needs Review"
                                ? "bg-brand-blue"
                                : "bg-brand-violet"
                          )}
                        />
                        <span className="text-xs font-medium text-text-primary">{row.original.status}</span>
                      </div>
                    ) : (
                      <div className="min-w-[140px]">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                    )}
                  </td>
                ))}
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
  );
}

import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { SeverityBadge } from "../ui/SeverityBadge";

export function HeroDashboardMockup() {
  return (
    <Card className="overflow-hidden bg-brand-navy p-6 text-white">
      <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-4">
          <Badge className="border-white/10 bg-white/10 text-cyan-200">Source Updated</Badge>
          <div>
            <p className="text-2xl font-bold">Brand Guidelines v2.0</p>
            <p className="mt-2 text-sm text-slate-300">17 assets impacted • 8 high-risk findings • Suggested fixes ready</p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-sm font-semibold">Selected finding</p>
            <p className="mt-2 text-xl font-bold">“Official Apple Partner”</p>
            <p className="mt-2 text-sm text-slate-300">Issue: Unsupported affiliation language</p>
            <p className="mt-3 rounded-2xl bg-cyan-400/10 p-3 text-sm text-cyan-100">
              Suggested fix: Remove or replace with approved reseller-status language.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          {[
            ["Brand Guidelines v2.0", "Source changed"],
            ["Synthetic Affiliate Page", "High risk finding generated"],
            ["Marketplace Listing", "Suggested update ready"]
          ].map(([title, detail]) => (
            <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{title}</p>
                <SeverityBadge severity={title === "Marketplace Listing" ? "Medium" : "High"} />
              </div>
              <p className="mt-2 text-sm text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

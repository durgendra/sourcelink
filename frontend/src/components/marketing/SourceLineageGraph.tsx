import { Card } from "../ui/Card";

export function SourceLineageGraph() {
  const items = [
    ["Synthetic Affiliate Page", "High Risk"],
    ["Partner Landing Page", "High Risk"],
    ["Marketplace Listing", "Medium Risk"],
    ["Sales Deck", "High Risk"]
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-brand-navy">Dependency management for digital content.</h2>
      <Card className="mt-10 overflow-hidden p-8">
        <div className="flex flex-col items-center gap-10">
          <div className="rounded-3xl bg-brand-navy px-8 py-4 text-center text-white">
            <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">Source Updated</p>
            <p className="mt-2 text-xl font-bold">Brand Guidelines v2.0</p>
          </div>
          <div className="grid w-full gap-4 md:grid-cols-2 xl:grid-cols-4">
            {items.map(([name, risk]) => (
              <div key={name} className="rounded-3xl border border-border bg-surface-muted p-5">
                <p className="font-semibold text-brand-navy">{name}</p>
                <p className="mt-2 text-sm text-text-secondary">{risk}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </section>
  );
}

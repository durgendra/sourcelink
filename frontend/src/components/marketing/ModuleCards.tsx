import { Card } from "../ui/Card";

export function ModuleCards() {
  return (
    <section id="use-cases" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">Module 1</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-navy">Partner Claim Audit</h3>
          <p className="mt-3 text-text-secondary">Track partner claims against approved source language for availability, licensing, warranty, and affiliation status.</p>
        </Card>
        <Card className="p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-violet">Module 2</p>
          <h3 className="mt-3 text-2xl font-bold text-brand-navy">Brand Asset Audit</h3>
          <p className="mt-3 text-text-secondary">Detect outdated logos, missing disclaimers, and stale product naming across pages, listings, decks, and email.</p>
        </Card>
      </div>
    </section>
  );
}

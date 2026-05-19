import { Card } from "../ui/Card";

const cards = ["Source citations", "Screenshot evidence", "Version lineage", "Human review", "Suggested fixes", "Audit trail"];

export function TrustCards() {
  return (
    <section id="security" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-brand-navy">Built for evidence-backed review</h2>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
        {cards.map((card) => (
          <Card key={card} className="p-5 text-center">
            <p className="font-semibold text-brand-navy">{card}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

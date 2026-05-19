import { AlertTriangle, Link2, RefreshCw, ShieldAlert } from "lucide-react";
import { Card } from "../ui/Card";

const cards = [
  { title: "Stale claims", body: "Approved claims change faster than partner pages do.", icon: AlertTriangle },
  { title: "Broken source lineage", body: "Teams lose the connection between approved source and reused content.", icon: Link2 },
  { title: "Brand drift", body: "Logos, product names, disclaimers, and partner language drift across channels.", icon: ShieldAlert },
  { title: "Manual remediation", body: "Audit evidence and update requests still live in fragmented spreadsheets.", icon: RefreshCw }
];

export function ProblemCards() {
  return (
    <section id="product" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold text-brand-navy">Approved content changes. The internet does not update itself.</h2>
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <Card key={card.title} className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-blue/10 text-brand-blue">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-brand-navy">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-text-secondary">{card.body}</p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

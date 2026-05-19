import { demoScenarios } from "../../data/demoScenarios";
import { Card } from "../ui/Card";

export function DemoCards() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-brand-navy">Explore source drift demos</h2>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {demoScenarios.map((scenario) => (
          <Card key={scenario.id} className="p-6">
            <h3 className="text-xl font-semibold text-brand-navy">{scenario.title}</h3>
            <p className="mt-3 text-sm leading-7 text-text-secondary">{scenario.description}</p>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-sm italic text-text-muted">Synthetic demos inspired by realistic public content. No customer relationship is implied.</p>
    </section>
  );
}

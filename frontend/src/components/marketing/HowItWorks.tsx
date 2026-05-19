import { Card } from "../ui/Card";

const steps = [
  "Create source object",
  "Generate copy-paste SourceLink tag",
  "Link downstream content",
  "Detect source changes",
  "Generate impact report and suggested fixes"
];

export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-brand-navy">How it works</h2>
      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {steps.map((step, index) => (
          <Card key={step} className="p-6">
            <p className="text-sm font-semibold text-brand-blue">0{index + 1}</p>
            <p className="mt-3 text-lg font-semibold text-brand-navy">{step}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

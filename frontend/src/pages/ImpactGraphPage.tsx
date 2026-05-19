import { ImpactGraph } from "../components/sourcelink/ImpactGraph";
import { useDemoStore } from "../store/useDemoStore";

export function ImpactGraphPage() {
  const audit = useDemoStore((state) => state.audit);
  if (!audit) return null;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Impact Graph</h1>
        <p className="mt-2 text-text-secondary">Visualize how a single source change propagates through downstream partner content.</p>
      </div>
      <ImpactGraph graph={audit.impactGraph} />
    </div>
  );
}

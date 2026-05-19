import { useDemoStore } from "../store/useDemoStore";
import { SourceCard } from "../components/sourcelink/SourceCard";

export function SourceRegistryPage() {
  const sources = useDemoStore((state) => state.sources);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-brand-navy">Source Registry</h1>
        <p className="mt-2 text-text-secondary">Approved claims, rules, disclaimers, and brand assets monitored by SourceLink.</p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        {sources.map((source) => (
          <div key={source.id}>
            <SourceCard source={source} />
          </div>
        ))}
      </div>
    </div>
  );
}

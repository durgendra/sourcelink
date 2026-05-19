import type { SourceObject } from "../../types/source";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";

export function SourceCard({ source }: { source: SourceObject }) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-brand-navy">{source.name}</h3>
          <p className="mt-2 text-sm text-text-secondary">{source.scope}</p>
        </div>
        <Badge>{source.objectType}</Badge>
      </div>
      <div className="mt-4 space-y-2 text-sm text-text-secondary">
        <p>Version: {source.currentVersion}</p>
        <p>Owner: {source.ownerName}</p>
        <p className="truncate">Canonical URL: {source.canonicalUrl}</p>
      </div>
    </Card>
  );
}

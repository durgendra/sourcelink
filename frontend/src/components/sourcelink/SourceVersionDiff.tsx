import type { SourceVersion } from "../../types/sourceVersion";
import { Card } from "../ui/Card";

export function SourceVersionDiff({ oldVersion, newVersion }: { oldVersion: SourceVersion; newVersion: SourceVersion }) {
  return (
    <Card className="p-8">
      <h3 className="text-xl font-bold text-brand-navy">Source Change</h3>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-muted p-6">
          <p className="text-sm font-semibold text-text-muted">{oldVersion.title}</p>
          <p className="mt-4 text-sm leading-7 text-text-primary">{oldVersion.sourceText}</p>
        </div>
        <div className="rounded-2xl border border-blue-200 bg-blue-50 p-6">
          <p className="text-sm font-semibold text-brand-blue">{newVersion.title}</p>
          <p className="mt-4 text-sm leading-7 text-text-primary">{newVersion.sourceText}</p>
        </div>
      </div>
    </Card>
  );
}

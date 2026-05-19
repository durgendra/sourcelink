import { Card } from "./Card";

export function RiskScoreCard({ title, value, caption }: { title: string; value: string; caption: string }) {
  return (
    <Card className="p-5">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-text-muted">{title}</p>
      <p className="mt-3 text-3xl font-bold text-brand-navy">{value}</p>
      <p className="mt-1 text-sm text-text-secondary">{caption}</p>
    </Card>
  );
}

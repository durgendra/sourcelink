import { Card } from "./Card";

export function StatCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <Card className="p-5 flex flex-col justify-between hover:shadow-md transition-shadow">
      <p className="text-[10px] uppercase tracking-widest text-text-muted font-bold mb-1">{label}</p>
      <p className="mt-3 text-2xl font-bold tracking-tight text-brand-navy">{value}</p>
      <p className="mt-2 text-[10px] text-text-secondary font-medium">{detail}</p>
    </Card>
  );
}

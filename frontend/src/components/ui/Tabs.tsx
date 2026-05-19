import { cn } from "../../lib/utils";

interface TabsProps {
  items: string[];
  active: string;
  onChange: (value: string) => void;
}

export function Tabs({ items, active, onChange }: TabsProps) {
  return (
    <div className="inline-flex flex-wrap gap-2 rounded-xl bg-surface-muted/70 p-1.5 border border-border">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={cn(
            "rounded-lg px-3 py-2 text-[11px] font-bold uppercase tracking-wider transition",
            active === item ? "bg-white text-brand-navy shadow-sm" : "text-text-muted hover:text-text-primary"
          )}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

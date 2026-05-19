import type { SelectHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "w-full bg-surface-muted border border-border rounded-xl px-4 py-2 text-sm text-text-primary outline-none appearance-none focus:ring-2 focus:ring-brand-blue/50",
        props.className
      )}
    />
  );
}

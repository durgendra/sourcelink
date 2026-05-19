import type { InputHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "w-full bg-surface-muted border border-border rounded-xl px-4 py-2 text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-blue/50",
        props.className
      )}
    />
  );
}

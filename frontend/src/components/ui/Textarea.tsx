import type { TextareaHTMLAttributes } from "react";
import { cn } from "../../lib/utils";

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full bg-surface-muted border border-border rounded-xl px-4 py-3 text-sm text-text-primary outline-none resize-none focus:ring-2 focus:ring-brand-blue/50",
        props.className
      )}
    />
  );
}

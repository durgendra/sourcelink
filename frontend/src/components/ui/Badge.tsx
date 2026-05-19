import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type Variant = "default" | "success" | "warning" | "error" | "info";

const variants: Record<Variant, string> = {
  default: "bg-surface-muted text-text-secondary",
  success: "bg-severity-success/10 text-severity-success",
  warning: "bg-severity-warning/10 text-severity-warning",
  error: "bg-severity-critical/10 text-severity-critical",
  info: "bg-brand-blue/10 text-brand-blue"
};

export function Badge({
  children,
  className,
  variant = "default",
  ...props
}: PropsWithChildren<HTMLAttributes<HTMLSpanElement> & { variant?: Variant }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

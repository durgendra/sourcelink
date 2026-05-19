import type { HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

export function Card({ children, className, ...props }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={cn("bg-surface border border-border rounded-card shadow-sm overflow-hidden", className)} {...props}>
      {children}
    </div>
  );
}

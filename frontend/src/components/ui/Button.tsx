import type { ButtonHTMLAttributes, PropsWithChildren } from "react";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "tertiary" | "outline" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-brand-navy text-white shadow-sm hover:bg-brand-blue/90",
  secondary: "bg-surface text-text-primary border border-border hover:bg-surface-muted",
  tertiary: "bg-transparent text-text-secondary hover:text-text-primary",
  outline: "bg-transparent text-white border border-white/20 hover:bg-white/5",
  danger: "bg-red-600 text-white hover:bg-red-700"
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm font-medium",
  lg: "px-8 py-3.5 text-base font-semibold"
};

export function Button({
  children,
  className,
  variant = "primary",
  fullWidth,
  size = "md",
  ...props
}: PropsWithChildren<ButtonProps>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-button transition-all focus:outline-none focus:ring-2 focus:ring-brand-blue/50 disabled:pointer-events-none disabled:opacity-50 active:scale-95 cursor-pointer",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

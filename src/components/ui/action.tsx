import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

const styles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90",
  outline:
    "border border-border bg-card text-foreground hover:bg-muted",
  ghost: "text-foreground hover:bg-muted",
  danger: "bg-destructive/10 text-destructive hover:bg-destructive/15",
};

function classes(variant: keyof typeof styles, className?: string) {
  return cn(
    "inline-flex min-h-12 items-center justify-center rounded-lg px-5 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 disabled:pointer-events-none disabled:opacity-50",
    styles[variant],
    className,
  );
}

export function ActionLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof styles }) {
  return <Link className={classes(variant, className)} {...props} />;
}

export function ActionButton({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: ComponentProps<"button"> & { variant?: keyof typeof styles; children: ReactNode }) {
  return (
    <button type={type} className={classes(variant, className)} {...props}>
      {children}
    </button>
  );
}

export function ActionAnchor({
  variant = "primary",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof styles }) {
  return <a className={classes(variant, className)} {...props} />;
}

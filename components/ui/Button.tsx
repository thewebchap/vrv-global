import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "royal" | "ink" | "outline" | "outlineLight" | "link";
type Size = "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-tight transition-all duration-200 ease-out-soft focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Orange — reserved for primary calls to action
  primary: "bg-flame text-white shadow-soft hover:bg-flame-600 hover:shadow-hover",
  // Royal maroon — premium secondary CTA
  royal: "bg-brand text-white shadow-soft hover:bg-brand-600 hover:shadow-hover",
  ink: "bg-ink-900 text-white hover:bg-ink-800",
  outline: "border border-line text-ink hover:border-brand hover:text-brand",
  outlineLight: "border border-white/25 text-white hover:border-gold hover:text-gold",
  link: "!rounded-none px-0 text-brand hover:text-brand-600",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-[15px]",
};

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  type,
  withArrow,
}: {
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit";
  withArrow?: boolean;
}) {
  const showArrow = withArrow ?? variant === "link";
  const cls = cn(base, variants[variant], variant !== "link" && sizes[size], className);
  const arrow = showArrow && (
    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
  );

  if (href) {
    const external = href.startsWith("http");
    if (external) {
      return (
        <a href={href} className={cn("group", cls)} target="_blank" rel="noreferrer">
          {children}
          {arrow}
        </a>
      );
    }
    return (
      <Link href={href} className={cn("group", cls)}>
        {children}
        {arrow}
      </Link>
    );
  }

  return (
    <button type={type ?? "button"} className={cn("group", cls)}>
      {children}
      {arrow}
    </button>
  );
}

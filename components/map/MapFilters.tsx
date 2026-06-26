"use client";

import { cn } from "@/lib/cn";

export type FilterOption<T extends string> = { key: T; label: string };

/** Segment / type filter pills for the maps. */
export function MapFilters<T extends string>({
  options,
  value,
  onChange,
  className,
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (key: T) => void;
  className?: string;
}) {
  return (
    <div role="tablist" aria-label="Map filters" className={cn("flex flex-wrap gap-2", className)}>
      {options.map((o) => (
        <button
          key={o.key}
          role="tab"
          aria-selected={value === o.key}
          onClick={() => onChange(o.key)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            value === o.key
              ? "border-brand bg-brand text-white"
              : "border-line bg-white text-ink/70 hover:border-brand/40 hover:text-brand",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

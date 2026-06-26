import { cn } from "@/lib/cn";

/** Bullet list with amber tick markers (the only place amber is used for emphasis). */
export function TickList({
  items,
  tone = "ink",
  className,
}: {
  items: React.ReactNode[];
  tone?: "ink" | "white";
  className?: string;
}) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex gap-3">
          <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rotate-45 bg-amber" />
          <span className={cn("text-[15px] leading-relaxed", tone === "white" ? "text-white/75" : "text-ink/70")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

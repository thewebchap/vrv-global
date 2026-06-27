import { cn } from "@/lib/cn";

export type DefinitionItem = { term: string; text: string };

/**
 * AI-friendly definition list — concise, factual term/definition pairs using
 * semantic <dl>/<dt>/<dd>, which answer engines parse well. Use for short
 * "What is …?" explanations around commodity and supply-chain concepts.
 */
export function Definitions({
  items,
  cols = 2,
  className,
}: {
  items: DefinitionItem[];
  cols?: 1 | 2;
  className?: string;
}) {
  return (
    <dl className={cn("grid gap-4", cols === 1 ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2", className)}>
      {items.map((d) => (
        <div key={d.term} className="rounded-2xl border border-line bg-white p-5 shadow-soft">
          <dt className="font-serif text-[17px] text-ink">{d.term}</dt>
          <dd className="mt-2 text-[14.5px] leading-relaxed text-ink/65">{d.text}</dd>
        </div>
      ))}
    </dl>
  );
}

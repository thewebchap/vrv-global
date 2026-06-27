import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Quick Answer block — a concise, factual answer to a likely user question,
 * placed near the top of major pages. The question is a real heading and the
 * answer is plain readable HTML, so answer engines and LLMs can extract and
 * cite it directly. Keep answers to ~40–70 words.
 */
export function QuickAnswer({
  question,
  answer,
  className,
}: {
  question: string;
  answer: string;
  className?: string;
}) {
  return (
    <div className={cn("rounded-2xl border border-brand/20 bg-eco-soft p-6 shadow-soft sm:p-7", className)}>
      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-label text-brand">
        <Icon name="spark" className="h-4 w-4 text-gold" />
        Quick answer
      </p>
      <h2 className="mt-3 font-serif text-xl text-ink">{question}</h2>
      <p className="mt-3 text-[15.5px] leading-relaxed text-ink/75 text-pretty">{answer}</p>
    </div>
  );
}

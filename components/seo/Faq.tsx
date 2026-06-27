"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { faqSchema } from "@/lib/seo";
import { cn } from "@/lib/cn";

export type FaqItem = { q: string; a: string };

/**
 * Accessible FAQ accordion that also emits FAQPage JSON-LD. Questions are real
 * headings and answers are readable HTML (kept in the DOM even when collapsed)
 * so answer engines can extract them. Server-rendered initial HTML includes the
 * schema script for crawlers.
 */
export function Faq({ items, idBase = "faq" }: { items: FaqItem[]; idBase?: string }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto max-w-3xl divide-y divide-line rounded-2xl border border-line bg-white shadow-soft">
      {items.map((it, i) => {
        const expanded = open === i;
        const panelId = `${idBase}-panel-${i}`;
        const btnId = `${idBase}-btn-${i}`;
        return (
          <div key={it.q}>
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
              >
                <span className="font-serif text-[17px] text-ink">{it.q}</span>
                <Icon
                  name="arrowRight"
                  className={cn("h-4 w-4 shrink-0 text-brand transition-transform duration-300", expanded ? "rotate-90" : "rotate-0")}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn("grid px-5 transition-all duration-300 ease-out-soft sm:px-6", expanded ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0")}
            >
              <p className="overflow-hidden text-[15px] leading-relaxed text-ink/70">{it.a}</p>
            </div>
          </div>
        );
      })}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(items)) }} />
    </div>
  );
}

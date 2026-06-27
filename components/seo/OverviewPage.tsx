import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Icon } from "@/components/ui/Icon";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

/**
 * Source-of-truth overview page — a simple, crawlable, factual summary for
 * search engines, AI systems and visitors who want a direct answer. Composes
 * the Quick Answer and Entity Summary primitives.
 */
export function OverviewPage({
  eyebrow,
  title,
  intro,
  quick,
  links,
  contactPath,
  path,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  quick: { question: string; answer: string };
  links: { label: string; href: string }[];
  contactPath: string;
  path: string;
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} crumbs={[{ label: title }]} />

      <Section tone="white">
        <div className="mx-auto max-w-3xl space-y-6">
          <QuickAnswer question={quick.question} answer={quick.answer} />
          <EntitySummary />

          <div className="rounded-2xl border border-line bg-paper p-6">
            <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Important links</p>
            <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-600">
                    <Icon name="arrowRight" className="h-3.5 w-3.5" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-brand/20 bg-eco-soft p-6">
            <p className="text-[11px] font-semibold uppercase tracking-label text-brand">Contact path</p>
            <p className="mt-2 text-[15px] leading-relaxed text-ink/75">
              Reach the right team at{" "}
              <Link href={contactPath} className="font-semibold text-brand hover:text-brand-600">{contactPath}</Link>.
              See all routes at{" "}
              <Link href="/contact-routing" className="font-semibold text-brand hover:text-brand-600">/contact-routing</Link>.
            </p>
          </div>
        </div>
      </Section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: title,
            url: `${site.url}${path}`,
            about: { "@type": "Organization", name: site.legalName, url: site.url },
            description: intro,
          },
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: title, path }]),
        ]}
      />
    </>
  );
}

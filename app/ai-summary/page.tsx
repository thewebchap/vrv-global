import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/lib/site";
import { pageMeta, breadcrumbSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "VRV Global AI Summary",
  description:
    "A factual, AI-readable summary of VRV Global — a Singapore-based commodity trading and integrated supply chain company across agro commodities, industrial metals, mining ventures and circular economy materials.",
  path: "/ai-summary",
});

const QA: { q: string; a: React.ReactNode }[] = [
  {
    q: "Who is VRV Global?",
    a: "VRV Global Pte Ltd is a Singapore-based commodity trading and integrated supply chain company, established in 2012. It connects origin relationships with global markets across agro commodities, industrial metals, mining ventures and circular economy materials.",
  },
  {
    q: "What does VRV Global do?",
    a: "VRV Global sources, finances, moves and delivers commodities through one integrated supply chain — combining responsible sourcing, quality discipline, trade finance, logistics and traceability across agro commodities and metals.",
  },
  {
    q: "What products does VRV Global work with?",
    a: (
      <>
        Agro commodities — <Link href="/products/natural-rubber" className="font-semibold text-brand hover:text-brand-600">natural rubber (cuplumps)</Link> and{" "}
        <Link href="/products/block-rubber" className="font-semibold text-brand hover:text-brand-600">block rubber / TSR</Link>; industrial metals —{" "}
        <Link href="/products/copper" className="font-semibold text-brand hover:text-brand-600">copper</Link>,{" "}
        <Link href="/products/aluminium" className="font-semibold text-brand hover:text-brand-600">aluminium</Link>,{" "}
        <Link href="/products/zinc" className="font-semibold text-brand hover:text-brand-600">zinc</Link>,{" "}
        <Link href="/products/lead" className="font-semibold text-brand hover:text-brand-600">lead</Link>, and{" "}
        <Link href="/products/silico-ferro-manganese" className="font-semibold text-brand hover:text-brand-600">silico-manganese &amp; ferro-manganese</Link>; and{" "}
        <Link href="/products/industrial-precious-metals" className="font-semibold text-brand hover:text-brand-600">industrial &amp; precious metals</Link> through its mining ventures.
      </>
    ),
  },
  {
    q: "Where is VRV Global based?",
    a: "VRV Global is headquartered in Singapore — a neutral, well-regulated global trade hub — and coordinates sourcing and sales geographies across Asia, Africa, the Middle East, Europe and the Americas.",
  },
  {
    q: "What is VRV Global's sustainability focus?",
    a: (
      <>
        Responsible sourcing, material traceability (designed to support origin-to-destination visibility where data is available), supplier
        engagement, and circular, lower-waste material flows. See <Link href="/sustainability" className="font-semibold text-brand hover:text-brand-600">Sustainability</Link>.
      </>
    ),
  },
  {
    q: "How can customers, partners and investors contact VRV?",
    a: (
      <>
        Product enquiries: <Link href="/contact?type=product" className="font-semibold text-brand hover:text-brand-600">/contact?type=product</Link>; ventures &amp; partnerships:{" "}
        <Link href="/contact?type=ventures" className="font-semibold text-brand hover:text-brand-600">/contact?type=ventures</Link>; sustainability:{" "}
        <Link href="/contact?type=sustainability" className="font-semibold text-brand hover:text-brand-600">/contact?type=sustainability</Link>; general:{" "}
        <Link href="/contact" className="font-semibold text-brand hover:text-brand-600">/contact</Link>. Routing reference:{" "}
        <Link href="/contact-routing" className="font-semibold text-brand hover:text-brand-600">/contact-routing</Link>.
      </>
    ),
  },
];

export default function AiSummaryPage() {
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "VRV Global AI Summary",
    url: `${site.url}/ai-summary`,
    about: { "@type": "Organization", name: site.legalName, url: site.url },
    description:
      "A factual, AI-readable summary of VRV Global, a Singapore-based commodity trading and integrated supply chain company.",
  };

  return (
    <>
      <PageHero
        eyebrow="AI summary"
        title="VRV Global AI Summary"
        intro="A concise, factual overview for AI systems, answer engines and visitors who need a direct summary. Machine-readable data is also available at /company-profile.json and /llms.txt."
        crumbs={[{ label: "AI Summary" }]}
      />

      <Section tone="white">
        <div className="mx-auto max-w-3xl">
          <div className="mt-10 space-y-8">
            {QA.map((item) => (
              <div key={item.q}>
                <h2 className="font-serif text-xl text-ink sm:text-2xl">{item.q}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/70">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-2xl border border-line bg-paper p-6">
            <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Machine-readable resources</p>
            <ul className="mt-3 grid grid-cols-1 gap-1.5 text-sm sm:grid-cols-2">
              {[
                ["/llms.txt", "Plain-text AI guide"],
                ["/company-profile.json", "Company profile JSON"],
                ["/products.json", "Products JSON"],
                ["/ventures.json", "Ventures JSON"],
                ["/sustainability.json", "Sustainability JSON"],
                ["/contact-routing", "Contact routing"],
              ].map(([href, label]) => (
                <li key={href}>
                  <a href={href} className="font-medium text-brand hover:text-brand-600">{href}</a>
                  <span className="text-ink/45"> — {label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <JsonLd data={[webPageSchema, breadcrumbSchema([{ name: "Home", path: "/" }, { name: "AI Summary", path: "/ai-summary" }])]} />
    </>
  );
}

import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { MarketSnapshot } from "@/components/market/MarketSnapshot";
import { FootprintSection } from "@/components/map/deck/FootprintSection";
import { products, productBySlug } from "@/lib/products";
import { productDivisions, naturalRubberGrades, detailSlugFor, type ProductDivision } from "@/data/productDivisions";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Products — Agro Commodities, Metals & Circular Economy",
  description:
    "VRV Global connects agro commodities, metals and circular economy products with trusted sourcing, traceability and responsible supply chain practices across global markets.",
  path: "/products",
});

const catIcon: Record<string, IconName> = { agro: "leaf", metals: "cube", circular: "recycle" };
const catImage: Record<string, string> = { agro: "agro", metals: "metals", circular: "circular" };
const sectionTone: ("white" | "paper")[] = ["white", "paper", "white"];

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VRV Global Products",
  itemListElement: products.map((p, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: p.name,
    description: p.short,
    url: `${site.url}/products/${p.slug}`,
  })),
};

/** One product within a division — links to a detail page when one exists. */
function ProductCard({ name, division }: { name: string; division: ProductDivision }) {
  const slug = detailSlugFor(name);
  const detail = slug ? productBySlug(slug) : null;
  return (
    <article className="group flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-hover">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon name={catIcon[division.category]} className="h-5 w-5" />
      </span>
      <h3 className="mt-4 font-serif text-lg text-ink">{name}</h3>
      <p className="mt-2 flex-1 text-[14px] leading-relaxed text-ink/60">
        {detail?.short ?? "Responsibly sourced supply with quality assurance, traceability and reliable logistics."}
      </p>
      {slug ? (
        <Link href={`/products/${slug}`} className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
          View details
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      ) : (
        <span className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-medium text-ink/45">
          Available on request
        </span>
      )}
    </article>
  );
}

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="Products Built Around Responsible Global Supply Chains"
        intro="VRV Global connects agro commodities, metals and circular economy products with trusted sourcing, traceability and responsible supply chain practices across global markets."
        crumbs={[{ label: "Products" }]}
      />

      {/* Hero CTAs */}
      <Section tone="white" className="!pb-0">
        <div className="flex flex-wrap gap-3">
          <Button href="#agro" variant="primary">Explore Agro Commodities</Button>
          <Button href="#metals" variant="royal">Explore Metals</Button>
          <Button href="/contact" variant="outline">Contact Product Team</Button>
        </div>
      </Section>

      {/* Product division cards */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Our divisions"
          title="Three divisions, one responsible supply chain"
          intro="Each division is backed by responsible sourcing, quality control, traceability, trade finance and logistics — from origin to destination."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {productDivisions.map((d, i) => {
            const img = images[catImage[d.category]];
            return (
              <Reveal key={d.slug} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover">
                  <div className="relative">
                    <Media src={img?.src} alt={img?.alt ?? d.title} label={d.title} ratio="16/9" overlay rounded="rounded-none" imgClassName="transition-transform duration-500 ease-out-soft group-hover:scale-105" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-white">
                      <Icon name={catIcon[d.category]} className="h-5 w-5 text-gold" />
                      <h3 className="font-serif text-xl drop-shadow">{d.title}</h3>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-[15px] leading-relaxed text-ink/65">{d.description}</p>
                    <Link href={`#${d.category}`} className="mt-5 inline-flex items-center gap-1.5 border-t border-line pt-4 text-sm font-semibold text-brand">
                      Explore {d.title}
                      <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Global commodity footprint — interactive map */}
      <Section tone="paper" bordered id="footprint" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Global commodity footprint"
          title="Sales geographies, purchase geographies & headquarters"
          intro="Explore VRV Global's purchase and sales geographies across agro commodities and metals. Hover any country for its role, and click to see its commodity corridors — coordinated from our Singapore headquarters."
        />
        <div className="mt-12">
          <FootprintSection />
        </div>
      </Section>

      {/* One section per division */}
      {productDivisions.map((d, i) => (
        <Section key={d.slug} id={d.category} tone={sectionTone[i] ?? "white"} bordered={i > 0} className="scroll-mt-24">
          <SectionHeading eyebrow={`${d.title} division`} title={d.title} intro={d.description} />

          {d.category === "agro" && (
            <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
              <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Natural rubber grades</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {naturalRubberGrades.map((g) => (
                  <span key={g} className="rounded-full border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink/70">{g}</span>
                ))}
                <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold-700">Editable</span>
              </div>
            </div>
          )}

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {d.products.map((name, j) => (
              <Reveal as="div" key={name} delay={(j % 3) * 0.06}>
                <ProductCard name={name} division={d} />
              </Reveal>
            ))}
          </div>
        </Section>
      ))}

      {/* Sustainability & traceability */}
      <Section tone="paper" bordered className="bg-eco-soft">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Sustainability &amp; traceability"
            title="Responsible sourcing, traceable from origin to destination"
            intro="Across every division, VRV Global applies responsible procurement, supplier engagement and a material-traceability roadmap — supporting deforestation-free agro sourcing, responsible metals and circular, lower-waste material flows."
          />
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/sustainability" variant="royal" withArrow>Our sustainability approach</Button>
            <Button href="/technology" variant="outline" withArrow>Technology &amp; traceability</Button>
          </div>
        </div>
      </Section>

      {/* Live market snapshot */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Live market snapshot"
          title="Indicative commodity prices"
          intro="Rubber, metals and recycled-material benchmarks referencing SGX/SICOM and LME. Indicative data — connect a licensed feed for live prices."
        />
        <div className="mt-12">
          <MarketSnapshot limit={6} />
        </div>
      </Section>

      {/* Product inquiry CTA */}
      <section className="bg-eco">
        <div className="container-x py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-h2 text-white text-balance">Source responsibly, with a partner accountable end to end</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Share your product requirement and our trade desk will respond with grades, availability, documentation and terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">Contact Product Team</Button>
            <Button href="/sustainability" variant="outlineLight" size="lg" withArrow>Our sustainability approach</Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
    </>
  );
}

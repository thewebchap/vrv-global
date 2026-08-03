import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ProductAnchorNav } from "@/components/products/ProductAnchorNav";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { EntitySummary } from "@/components/seo/EntitySummary";
import { Definitions } from "@/components/seo/Definitions";
import { Faq } from "@/components/seo/Faq";
import { ProofBlocks } from "@/components/seo/ProofBlock";
import { SupplyChainOperatingModel } from "@/components/sections/SupplyChainOperatingModel";
import {
  productSegments,
  naturalRubberGrades,
  supportingAgroLines,
  type ProductSegment,
  type SegmentProduct,
} from "@/data/productSegments";
import { quickAnswers, productsFaqs, productDefinitions } from "@/data/aeo";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";
import { cn } from "@/lib/cn";

export const metadata = pageMeta({
  title: "Products — Agro Commodities, Industrial Metals & Mining",
  description:
    "VRV Global operates across natural rubber cuplumps and block rubber / TSR, industrial metals trading — copper, aluminium, zinc, lead, silico-manganese and ferro-manganese — and strategic mining in Tanzania and Zambia with a copper and gold focus, through responsible sourcing and sustainable supply chains.",
  path: "/products",
});

const schemaItems = productSegments.flatMap((s) =>
  s.categories?.length
    ? s.categories.flatMap((c) =>
        (c.products?.length ? c.products : [{ name: c.title, href: undefined }]).map((pr) => ({
          name: pr.name,
          url: pr.href ? `${site.url}${pr.href}` : `${site.url}/products#${s.slug}`,
        })),
      )
    : s.products.map((p) => ({ name: p.title, url: `${site.url}/products#${p.slug}` })),
);

const productListSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "VRV Global Product Segments",
  itemListElement: schemaItems.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: it.url,
  })),
};

/** Subtle, premium per-segment background tints (soft green / copper / gold). */
const segmentTint: Record<string, string> = {
  "agro-commodities": "#F3F8F1",
  "industrial-metals": "#F8F1EC",
  mining: "#F8F3E6",
};

/** Large segment overview card — image top, content below, tags, CTA. */
function SegmentCard({ segment }: { segment: ProductSegment }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-1 hover:border-brand/30 hover:shadow-hover">
      <Media
        src={segment.image}
        alt={segment.imageAlt}
        label={segment.title}
        ratio="16/9"
        rounded="rounded-none"
        imgClassName="transition-transform duration-500 ease-out-soft group-hover:scale-105"
      />
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
            <Icon name={segment.icon} className="h-5 w-5" />
          </span>
          <h3 className="font-serif text-xl text-ink">{segment.title}</h3>
        </div>
        <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{segment.description}</p>
        <ul className="mt-5 flex flex-wrap gap-2">
          {segment.tags.map((t) => (
            <li key={t} className="rounded-full border border-line bg-paper px-3 py-1 text-[12px] font-medium text-ink/70">
              {t}
            </li>
          ))}
        </ul>
        <Link
          href={`#${segment.slug}`}
          className="mt-auto inline-flex items-center gap-1.5 border-t border-line pt-5 text-sm font-semibold text-brand"
        >
          Explore {segment.title}
          <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

/** Map of subsection slug → dedicated sub-product page (where one exists). */
const detailHrefBySlug: Record<string, string> = {
  "natural-rubber-cuplumps": "/products/natural-rubber",
  "block-rubber-tsr": "/products/block-rubber",
  copper: "/products/copper",
  aluminium: "/products/aluminium",
  zinc: "/products/zinc",
  lead: "/products/lead",
  "silico-manganese": "/products/silico-ferro-manganese",
  "ferro-manganese": "/products/silico-ferro-manganese",
  "mining-industrial-metals": "/products/industrial-precious-metals",
  "precious-metals": "/products/industrial-precious-metals",
};

/** Feature blocks rendered as compact ticked mini-cards. */
function FeatureBlocks({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
      {items.map((b) => (
        <li key={b} className="flex items-start gap-2.5 rounded-xl border border-line bg-white px-3.5 py-2.5">
          <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
          <span className="text-[13.5px] leading-snug text-ink/70">{b}</span>
        </li>
      ))}
    </ul>
  );
}

/** Grouped category cards for a segment (Industrial Metals, Mining Division). */
function SegmentCategories({ segment, tint }: { segment: ProductSegment; tint?: string }) {
  return (
    <div className="border-t border-line py-14 sm:py-16" style={tint ? { backgroundColor: tint } : undefined}>
      <div className="container-x grid grid-cols-1 gap-6 md:grid-cols-2">
        {segment.categories!.map((cat) => (
          <article key={cat.title} className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft sm:p-7">
            <div className="flex items-center gap-2.5">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand">
                <Icon name={segment.icon} className="h-5 w-5" />
              </span>
              <h3 className="font-serif text-xl text-ink">{cat.title}</h3>
            </div>
            {cat.detail && (
              <p className="mt-4 inline-flex w-fit items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[12.5px] font-semibold text-gold-700">
                <Icon name="shield" className="h-3.5 w-3.5" />
                {cat.detail}
              </p>
            )}
            <p className="mt-4 text-[15px] leading-relaxed text-ink/65">{cat.copy}</p>
            {cat.products && cat.products.length > 0 && (
              <ul className="mt-5 flex flex-wrap gap-2">
                {cat.products.map((p) =>
                  p.href ? (
                    <li key={p.name}>
                      <Link
                        href={p.href}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1 text-[12.5px] font-medium text-ink/75 transition-colors hover:border-brand/40 hover:text-brand"
                      >
                        {p.name}
                        <Icon name="arrowRight" className="h-3 w-3" />
                      </Link>
                    </li>
                  ) : (
                    <li key={p.name}>
                      <span className="rounded-full border border-line bg-paper px-3 py-1 text-[12.5px] font-medium text-ink/70">{p.name}</span>
                    </li>
                  ),
                )}
              </ul>
            )}
            <div className="mt-auto pt-6">
              <Button href="/contact" variant="outline" withArrow>Enquire</Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

/** A single product subsection — alternating image / content band. */
function Subsection({ product, segment, index, tint }: { product: SegmentProduct; segment: ProductSegment; index: number; tint?: string }) {
  const even = index % 2 === 0;
  const bandClass = even ? "" : "bg-white";
  const bandStyle = even && tint ? { backgroundColor: tint } : undefined;

  if (product.compact) {
    return (
      <div id={product.slug} style={bandStyle} className={cn("scroll-mt-32 border-t border-line py-14 sm:py-16", bandClass)}>
        <div className="container-x">
          <div className="mx-auto max-w-3xl rounded-2xl border border-line bg-white p-7 text-center shadow-soft sm:p-9">
            <span className="mx-auto inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <Icon name={segment.icon} className="h-5 w-5" />
            </span>
            <p className="mt-4 eyebrow no-flourish justify-center">{segment.title}</p>
            <h3 className="mt-2 font-serif text-2xl text-ink">{product.title}</h3>
            <p className="mx-auto mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/65">{product.copy}</p>
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {product.blocks.map((b) => (
                <li key={b} className="rounded-full border border-line bg-paper px-3 py-1 text-[12px] font-medium text-ink/70">{b}</li>
              ))}
            </ul>
            <div className="mt-7">
              <Button href={product.cta.href} variant="primary" withArrow>{product.cta.label}</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const flip = index % 2 === 1;
  const detailHref = detailHrefBySlug[product.slug];
  return (
    <div id={product.slug} style={bandStyle} className={cn("scroll-mt-32 border-t border-line py-14 sm:py-20", bandClass)}>
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <Reveal className={cn(flip && "lg:order-2")}>
          <Media
            src={product.image}
            alt={product.imageAlt ?? product.title}
            label={product.title}
            ratio="4/3"
            rounded="rounded-2xl"
            className="shadow-card"
          />
        </Reveal>
        <Reveal className={cn(flip && "lg:order-1")}>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="eyebrow no-flourish">{segment.title}</p>
            {product.note && (
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-gold-700">
                Confirm before publishing
              </span>
            )}
          </div>
          <h3 className="mt-3 font-serif text-2xl text-ink sm:text-[1.7rem]">{product.title}</h3>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink/70">{product.copy}</p>
          <FeatureBlocks items={product.blocks} />
          {product.note && (
            <p className="mt-5 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-[13px] leading-relaxed text-gold-700">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
              [{product.note}]
            </p>
          )}
          <div className="mt-7 flex flex-wrap gap-3">
            {detailHref && <Button href={detailHref} variant="primary" withArrow>View product details</Button>}
            <Button href={product.cta.href} variant={detailHref ? "outline" : "primary"} withArrow={!detailHref}>
              {product.cta.label}
            </Button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <>
      {/* 1 — Products hero */}
      <PageHero
        eyebrow="Products"
        title="Products Built Around Responsible Commodity Supply Chains"
        intro="VRV Global operates across natural rubber, industrial metals, and strategic mining opportunities, connecting origin relationships with global markets through disciplined sourcing, trade execution, and long-term supply chain partnerships."
        crumbs={[{ label: "Products" }]}
      />

      <Section tone="white" className="!pb-0">
        <div className="flex flex-wrap gap-3">
          <Button href="#segments" variant="primary">Explore Segments</Button>
          <Button href="/contact" variant="outline">Contact Product Team</Button>
        </div>
      </Section>

      {/* Quick answer + entity summary + definitions (AEO/GEO) */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <QuickAnswer question={quickAnswers.products.question} answer={quickAnswers.products.answer} />
          <EntitySummary links={[{ label: "Sustainability", href: "/sustainability" }, { label: "Ventures", href: "/ventures" }]} />
        </div>
        <div className="mt-10">
          <ProofBlocks />
        </div>
      </Section>

      {/* Sticky anchor navigation */}
      <ProductAnchorNav />

      {/* 2 — Segment overview: three large cards */}
      <Section id="segments" tone="white" className="scroll-mt-32">
        <SectionHeading
          eyebrow="Our segments"
          title="Three segments, one responsible supply chain"
          intro="A focused portfolio across natural rubber, industrial metals and a strategic upstream mining platform — each backed by responsible sourcing, quality control and traceability from origin to destination."
        />
        <div className="mt-12 grid grid-cols-1 gap-7 lg:grid-cols-3">
          {productSegments.map((s, i) => (
            <Reveal key={s.slug} delay={i * 0.08}>
              <SegmentCard segment={s} />
            </Reveal>
          ))}
        </div>
      </Section>

      {/* 3–5 — Each segment: intro band + product subsections / category cards */}
      {productSegments.map((s) => {
        const tint = segmentTint[s.slug];
        return (
        <section key={s.slug} id={s.slug} className="scroll-mt-32" aria-label={s.title}>
          {/* Segment intro band */}
          <div className="border-t border-line py-16 sm:py-20" style={tint ? { backgroundColor: tint } : undefined}>
            <div className="container-x">
              <SectionHeading eyebrow={`${s.title} segment`} title={s.title} intro={s.description} />
              <ul className="mt-6 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <li key={t} className="rounded-full border border-line bg-paper px-3 py-1 text-[12px] font-medium text-ink/70">{t}</li>
                ))}
              </ul>

              {s.slug === "agro-commodities" && (
                <div className="mt-8 rounded-2xl border border-line bg-paper p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-label text-ink/55">Natural rubber grades</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {naturalRubberGrades.map((g) => (
                      <span key={g} className="rounded-full border border-line bg-white px-2.5 py-1 text-[12px] font-medium text-ink/70">{g}</span>
                    ))}
                    <span className="rounded-full bg-gold/10 px-2.5 py-1 text-[11px] font-medium text-gold-700">Editable</span>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-ink/50">
                    Supporting agro lines — {supportingAgroLines.join(", ")} — are handled on request as future-expansion
                    opportunities rather than core segments.
                  </p>
                </div>
              )}

              {s.slug === "mining" && (
                <p className="mt-8 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-[13px] leading-relaxed text-gold-700">
                  <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
                  Mining is an emerging strategic segment. Project specifics are marked &quot;Confirm before publishing&quot;
                  until formally approved for disclosure.
                </p>
              )}
            </div>
          </div>

          {/* Product content — grouped category cards, or alternating subsections */}
          {s.categories?.length
            ? <SegmentCategories segment={s} tint={tint} />
            : s.products.map((p, i) => (
                <Subsection key={p.slug} product={p} segment={s} index={i} tint={tint} />
              ))}
        </section>
        );
      })}

      {/* Supply chain operating model */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Operating model"
          title="The VRV Supply Chain Operating Model"
          intro="From origin relationships to customer markets, VRV Global connects sourcing, processing, quality, trade finance, logistics, traceability, and delivery."
        />
        <div className="mt-14">
          <SupplyChainOperatingModel />
        </div>
      </Section>

      {/* 7 — Sustainability & traceability */}
      <Section tone="paper" bordered className="bg-eco-soft">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Sustainability &amp; traceability"
            title="Responsible sourcing, traceable from origin to destination"
            intro="Across every segment, VRV Global applies responsible procurement, supplier engagement and a material-traceability roadmap — supporting deforestation-conscious rubber sourcing, responsible industrial metals, and disciplined, compliance-led upstream development."
          />
          <div className="flex flex-wrap gap-4 lg:justify-end">
            <Button href="/sustainability" variant="royal" withArrow>Our sustainability approach</Button>
            <Button href="/technology" variant="outline" withArrow>Technology &amp; traceability</Button>
          </div>
        </div>
      </Section>

      {/* FAQs (AEO + FAQPage schema) */}
      <Section tone="white" bordered>
        <SectionHeading
          align="center"
          eyebrow="FAQs"
          title="Product & commodity questions"
          intro="Clear answers about the products VRV Global trades across agro commodities, industrial metals and mining."
        />
        <div className="mt-12">
          <Faq items={productsFaqs} idBase="products-faq" />
        </div>
      </Section>

      {/* Key Terms — moved to the bottom, below the Mining Division */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Key terms"
          title="Commodity definitions"
          intro="Plain-language definitions of the commodities and supply-chain terms used across VRV Global's products."
        />
        <Definitions items={productDefinitions} className="mt-8" />
      </Section>

      {/* 8 — Product / partner enquiry CTA */}
      <section className="bg-eco">
        <div className="container-x py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-h2 text-white text-balance">Source responsibly, with a partner accountable end to end</h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Share your product requirement or partnership interest and our trade desk will respond with grades, availability, documentation and terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">Contact Product Team</Button>
            <Button href="/ventures" variant="outlineLight" size="lg" withArrow>Partner with VRV</Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productListSchema) }} />
    </>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  products,
  productBySlug,
  productsByCategory,
  categoryMeta,
} from "@/lib/products";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { TickList } from "@/components/ui/TickList";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { MarketSnapshot } from "@/components/market/MarketSnapshot";
import { images } from "@/lib/images";
import { site } from "@/lib/site";
import { pageMeta } from "@/lib/seo";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = productBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  return pageMeta({
    title: product.name,
    description: product.short,
    path: `/products/${product.slug}`,
  });
}

function PlaceholderCard({ title, items }: { title: string; items: string[] }) {
  return (
    <Card>
      <h3 className="text-lg font-medium text-ink">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-sm leading-relaxed text-ink/65">
            <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-amber" />
            {it}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = productBySlug(params.slug);
  if (!product) notFound();

  const meta = categoryMeta[product.category];
  const related = productsByCategory(product.category).filter(
    (p) => p.slug !== product.slug,
  );
  const img = images[product.image];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.short,
    category: meta.title,
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/products/${product.slug}`,
  };

  return (
    <>
      <PageHero
        eyebrow={meta.title}
        title={product.name}
        intro={product.short}
        crumbs={[
          { label: "Products", href: "/products" },
          { label: product.name },
        ]}
      />

      {/* Wide hero image band */}
      <div className="bg-white">
        <div className="container-x py-8">
          <Media
            src={img?.src}
            alt={img?.alt ?? product.name}
            label={product.heroPh}
            ratio="21/9"
            overlay
            rounded="rounded-2xl"
            className="shadow-card"
            priority
          />
        </div>
      </div>

      {/* Overview */}
      <Section tone="white" className="!pt-6">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title={`${product.name} at VRV Global`} />
          <p className="mt-6 text-[19px] leading-relaxed text-ink/75 text-pretty">
            {product.blurb}
          </p>
        </div>
      </Section>

      {/* Grades — boxed cards / horizontal slider on mobile */}
      <Section tone="paper" bordered id="grades" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Grades & sub-types"
          title="Grades and categories"
          intro="Indicative grade families we supply. Exact grades are confirmed against your specification and destination requirements."
        />
        <div className="mt-12 flex snap-x gap-5 overflow-x-auto pb-3 [scrollbar-width:thin] md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-3">
          {product.grades.map((g, i) => (
            <Reveal
              as="div"
              key={g.title}
              delay={i * 0.06}
              className="min-w-[78%] snap-start sm:min-w-[60%] md:min-w-0"
            >
              <div className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand">
                    <Icon name="cube" className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-lg text-ink">{g.title}</h3>
                </div>
                <TickList className="mt-5" items={g.items} />
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Use cases */}
      <Section tone="white">
        <SectionHeading
          eyebrow="Applications"
          title="Where this material is used"
          intro="End markets and applications served by this supply chain."
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.useCases.map((uc, i) => (
            <Reveal as="li" key={uc} delay={i * 0.06}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-paper p-5">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink/75">{uc}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Sustainability angle */}
      <Section tone="paper" bordered id="sustainability" className="scroll-mt-24">
        <div className="rounded-2xl bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-soft">
              <Icon
                name={product.category === "circular" ? "recycle" : "leaf"}
                className="h-7 w-7"
              />
            </span>
            <div>
              <p className="eyebrow">Sustainability angle</p>
              <h2 className="mt-4 text-h2 text-balance">
                {product.category === "circular"
                  ? "Circular value: keeping materials in productive use"
                  : "Responsibly sourced, with a clear traceability roadmap"}
              </h2>
              <TickList className="mt-7 max-w-2xl" items={product.sustainability} />
            </div>
          </div>
        </div>
      </Section>

      {/* Supply chain capability + sourcing / destinations */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading
              eyebrow="End-to-end capability"
              title="One partner, accountable across the chain"
              intro="VRV Global integrates sourcing, quality assurance, trade finance, logistics and traceability into a single accountable supply chain — connecting responsible origins to destination demand and managing risk at every step."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              {["Sourcing", "Quality", "Finance", "Logistics", "Traceability"].map(
                (cap) => (
                  <span
                    key={cap}
                    className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand"
                  >
                    <Icon name="check" className="h-4 w-4" />
                    {cap}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            <div>
              <div className="flex items-center gap-2 text-ink">
                <Icon name="globe" className="h-5 w-5 text-brand" />
                <h3 className="text-base font-semibold">Sourcing regions</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.sourcing.map((s) => (
                  <li key={s}>
                    <span className="inline-block rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/70">
                      {s}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="flex items-center gap-2 text-ink">
                <Icon name="route" className="h-5 w-5 text-ocean" />
                <h3 className="text-base font-semibold">Destination markets</h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.destinations.map((d) => (
                  <li key={d}>
                    <span className="inline-block rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink/70">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Specs / certifications / packaging */}
      <Section tone="paper" bordered>
        <SectionHeading
          eyebrow="Commercial detail"
          title="Specifications, certifications & packaging"
          intro="Specifications are indicative placeholders — request a full spec sheet for confirmed grades, certifications, packaging and shipping terms against your destination requirements."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          <PlaceholderCard title="Specifications" items={product.specs} />
          <PlaceholderCard title="Certifications" items={product.certifications} />
          <PlaceholderCard title="Packaging & shipping" items={product.packaging} />
        </div>
        <p className="mt-6 text-sm text-ink/50">
          Note: bracketed values are editable placeholders pending verification.
        </p>
      </Section>

      {/* Related products */}
      {related.length > 0 && (
        <Section tone="white">
          <SectionHeading
            eyebrow={`More in ${meta.title}`}
            title="Related products"
          />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group rounded-xl border border-line bg-paper p-5 transition-all duration-300 ease-out-soft hover:border-brand/40 hover:shadow-hover"
              >
                <span className="text-base font-medium text-ink group-hover:text-brand">
                  {p.name}
                </span>
                <span className="mt-2 block text-sm leading-snug text-ink/55">
                  {p.short}
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Market snapshot — this product's category */}
      <Section tone="white" bordered>
        <SectionHeading
          eyebrow="Market snapshot"
          title={`${meta.title} — indicative prices`}
          intro="Indicative benchmarks relevant to this category. Not for trading or settlement — see the disclaimer below."
        />
        <div className="mt-12">
          <MarketSnapshot category={product.category} />
        </div>
      </Section>

      {/* CTA */}
      <section className="bg-eco">
        <div className="container-x py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-h2 text-white text-balance">
            Request specifications for {product.name}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
            Share your requirement and our trade desk will respond with confirmed
            grades, availability, documentation and terms.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">
              Request specifications / RFQ
            </Button>
            <Button href="/sustainability" variant="outlineLight" size="lg" withArrow>
              Our sustainability approach
            </Button>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
    </>
  );
}

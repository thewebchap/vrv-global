import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  productDetails,
  getProductDetail,
  getRelatedProducts,
} from "@/data/productDetails";
import { productAeo } from "@/data/productAeo";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { QuickAnswer } from "@/components/seo/QuickAnswer";
import { Definitions } from "@/components/seo/Definitions";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/seo";

export function generateStaticParams() {
  return productDetails.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProductDetail(params.slug);
  if (!product) return { title: "Product not found" };
  const aeo = productAeo[product.slug];
  const title = aeo?.metaTitle ?? product.title;
  const description = aeo?.metaDescription ?? product.summary;
  const url = `${site.url}/products/${product.slug}`;
  const fullTitle = `${title} | ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      type: "website",
      images: [{ url: product.heroImage, alt: product.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = getProductDetail(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.slug);
  const aeo = productAeo[product.slug];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.summary,
    category: product.segment,
    brand: { "@type": "Brand", name: site.name },
    url: `${site.url}/products/${product.slug}`,
    image: product.heroImage,
  };

  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: product.title, path: `/products/${product.slug}` },
  ]);

  return (
    <>
      {/* 1 — Product hero (image background, gradient overlay, short text only) */}
      <section className="relative isolate overflow-hidden bg-ink-900">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.heroImage}
          alt={product.imageAlt}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          style={{ objectPosition: product.imagePosition ?? "center" }}
        />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-ink-900/92 via-ink-900/72 to-ink-900/35" />
        <span aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-brand-800/55 via-transparent to-transparent" />

        <div className="container-x py-24 lg:py-32">
          <nav aria-label="Breadcrumb" className="text-[13px] text-white/70">
            <Link href="/products" className="hover:text-gold">Products</Link>
            <span className="px-2 text-white/35">/</span>
            <span className="text-white/90">{product.title}</span>
          </nav>
          <p className="mt-6 eyebrow !text-gold">{product.segment}</p>
          <h1 className="mt-4 max-w-3xl text-display text-white text-balance">{product.title}</h1>
          <p className="mt-5 max-w-2xl text-[18px] leading-relaxed text-white/75 text-pretty">{product.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="#enquiry" variant="primary" size="lg" withArrow>Contact Product Team</Button>
            <Button href="/products" variant="outlineLight" size="lg">All products</Button>
          </div>
        </div>
      </section>

      {/* Quick answer (AEO) */}
      {aeo && (
        <Section tone="white" className="!pb-0">
          <QuickAnswer question={aeo.question} answer={product.summary} className="max-w-3xl" />
        </Section>
      )}

      {/* 2 — Product overview (what it is) */}
      <Section tone="white">
        <div className="max-w-3xl">
          <SectionHeading eyebrow="Overview" title={`What is ${product.title}?`} />
          <p className="mt-6 text-[19px] leading-relaxed text-ink/75 text-pretty">{product.overview}</p>
          {aeo && (
            <div className="mt-8">
              <Definitions items={[{ term: aeo.definitionTerm, text: aeo.definitionText }]} cols={1} />
            </div>
          )}
          {product.confirm && (
            <p className="mt-6 flex items-start gap-2 rounded-xl border border-gold/30 bg-gold/5 px-4 py-3 text-[13px] leading-relaxed text-gold-700">
              <Icon name="shield" className="mt-0.5 h-4 w-4 shrink-0" />
              Mining is an emerging strategic segment. Project specifics — including licenses, ownership, project stage
              and disclosures — are marked <span className="font-semibold">[Confirm before publishing]</span> until formally approved.
            </p>
          )}
        </div>
      </Section>

      {/* 3 — Key applications / use cases */}
      <Section tone="paper" bordered id="applications" className="scroll-mt-24">
        <SectionHeading
          eyebrow="Applications"
          title="Key applications & use cases"
          intro="End markets and applications served by this supply chain."
        />
        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {product.applications.map((uc, i) => (
            <Reveal as="li" key={uc} delay={i * 0.05}>
              <div className="flex h-full items-start gap-3 rounded-xl border border-line bg-white p-5 shadow-soft">
                <span className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-[15px] leading-relaxed text-ink/75">{uc}</span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* 4 — Sourcing & supply chain approach (image + text, kept separate) */}
      <Section tone="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <Media
              src={product.heroImage}
              alt={product.imageAlt}
              label={product.title}
              ratio="4/3"
              rounded="rounded-2xl"
              className="shadow-card"
              imgClassName="object-cover"
            />
          </Reveal>
          <Reveal>
            <SectionHeading
              eyebrow="Sourcing & supply chain"
              title="Sourcing and supply chain approach"
              intro="VRV Global integrates sourcing, quality, trade execution and logistics into one accountable supply chain — connecting responsible origins to destination demand."
            />
            <ul className="mt-7 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {product.sourcingApproach.map((s) => (
                <li key={s} className="flex items-start gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-2.5">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <span className="text-[13.5px] leading-snug text-ink/70">{s}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-2">
              {["Sourcing", "Quality", "Finance", "Logistics", "Traceability"].map((cap) => (
                <span key={cap} className="inline-flex items-center gap-1.5 rounded-full border border-brand/25 bg-brand-50 px-3.5 py-1.5 text-sm font-medium text-brand">
                  <Icon name="check" className="h-4 w-4" />
                  {cap}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* 5 — Quality & specification discipline */}
      <Section tone="paper" bordered>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="Quality & specifications"
            title="Quality and specification discipline"
            intro="Specifications, grades and parameters are confirmed against each customer's requirement and destination market — VRV does not publish fixed grades or certifications without verification."
          />
          <div className="rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-8">
            <p className="text-[16px] leading-relaxed text-ink/70">{product.quality}</p>
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {["Specification dialogue", "Inspection & documentation", "Grade discipline", "Destination-aligned terms"].map((q) => (
                <div key={q} className="flex items-start gap-2.5 rounded-xl border border-line bg-paper px-3.5 py-2.5">
                  <Icon name="doc" className="mt-0.5 h-4 w-4 shrink-0 text-ocean" />
                  <span className="text-[13.5px] leading-snug text-ink/70">{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 6 — Sustainability / traceability relevance */}
      <Section tone="white">
        <div className="rounded-2xl bg-eco-soft p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[auto_1fr] lg:items-start">
            <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand text-white shadow-soft">
              <Icon name="leaf" className="h-7 w-7" />
            </span>
            <div>
              <p className="eyebrow">Sustainability & traceability</p>
              <h2 className="mt-4 text-h2 text-balance">Responsible sourcing, traceable from origin to destination</h2>
              <p className="mt-6 max-w-2xl text-[17px] leading-relaxed text-ink/75">{product.sustainability}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/sustainability" variant="royal" withArrow>Our sustainability approach</Button>
                <Button href="/technology" variant="outline" withArrow>Technology &amp; traceability</Button>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 7 — Related products */}
      {related.length > 0 && (
        <Section tone="paper" bordered>
          <SectionHeading eyebrow="Related products" title="Explore related commodities" />
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-line bg-white p-5 shadow-soft transition-all duration-300 ease-out-soft hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-hover"
              >
                <span className="text-[11px] font-semibold uppercase tracking-label text-brand">{p.segment}</span>
                <span className="mt-2 font-serif text-lg text-ink group-hover:text-brand">{p.title}</span>
                <span className="mt-2 flex-1 text-[14px] leading-snug text-ink/55">{p.summary}</span>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  View product
                  <Icon name="arrowRight" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Descriptive cross-link: mining product → Ventures */}
      {product.segment === "Mining" && (
        <Section tone="white">
          <div className="flex flex-col items-start gap-4 rounded-2xl border border-line bg-paper p-7 shadow-soft sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <p className="max-w-2xl text-[15px] leading-relaxed text-ink/70">
              VRV Global&apos;s industrial and precious metals strategy is delivered through its{" "}
              <Link href="/ventures/mining" className="font-semibold text-brand hover:text-brand-600">mining &amp; resource ventures</Link>{" "}
              across Tanzania and Zambia. Explore the full{" "}
              <Link href="/ventures" className="font-semibold text-brand hover:text-brand-600">Ventures programme</Link>.
            </p>
            <Button href="/ventures/mining" variant="primary" withArrow className="shrink-0">Explore mining ventures</Button>
          </div>
        </Section>
      )}

      {/* 8 — Product enquiry CTA */}
      <section id="enquiry" className="scroll-mt-24 bg-eco">
        <div className="container-x py-20 text-center sm:py-24">
          <h2 className="mx-auto max-w-2xl text-h2 text-white text-balance">Discuss Your Product Requirements</h2>
          <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-white/75">
            Speak with VRV Global&apos;s commodity team about product specifications, sourcing requirements, volumes,
            destination markets, and supply timelines.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/contact" variant="primary" size="lg">Contact Product Team</Button>
            <Button href="/ventures" variant="outlineLight" size="lg" withArrow>Partner with VRV</Button>
          </div>
        </div>
      </section>

      <JsonLd data={[productSchema, crumbs]} />
    </>
  );
}

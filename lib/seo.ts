import type { Metadata } from "next";
import { site } from "./site";

/** Build per-page metadata with consistent titles, canonical and OG tags. */
export function pageMeta({
  title,
  description,
  path = "/",
}: {
  title: string;
  description: string;
  path?: string;
}): Metadata {
  const url = `${site.url}${path}`;
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
      locale: "en_SG",
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

/** Organization JSON-LD — rendered once in the root layout. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.legalName,
  legalName: site.legalName,
  alternateName: site.name,
  url: site.url,
  description: site.description,
  foundingDate: site.founded,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: `${site.address.line1}, ${site.address.line2}`,
    addressLocality: site.address.city,
    postalCode: site.address.postal,
    addressCountry: "SG",
  },
  areaServed: "Worldwide",
  // Factual topical scope — helps machine understanding without keyword stuffing.
  knowsAbout: [
    "Commodity trading",
    "Integrated supply chain",
    "Agro commodities",
    "Natural rubber",
    "Block rubber / TSR",
    "Industrial metals",
    "Copper",
    "Aluminium",
    "Zinc",
    "Lead",
    "Silico-manganese",
    "Ferro-manganese",
    "Mining ventures",
    "Circular economy materials",
    "Responsible sourcing",
    "Supply chain traceability",
  ],
  sameAs: [site.linkedin],
};

/** WebSite JSON-LD — rendered once in the root layout. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: site.name,
  alternateName: site.legalName,
  url: site.url,
  description: site.description,
  publisher: { "@type": "Organization", name: site.legalName, url: site.url },
  inLanguage: "en",
};

/** Build a BreadcrumbList JSON-LD object from ordered crumbs. */
export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      ...(c.path ? { item: `${site.url}${c.path}` } : {}),
    })),
  };
}

/** Build a FAQPage JSON-LD object from question/answer pairs. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

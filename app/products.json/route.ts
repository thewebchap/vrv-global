import { NextResponse } from "next/server";
import { productSegments } from "@/data/productSegments";
import { productDetails } from "@/data/productDetails";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Machine-readable product catalogue (segments + product pages). */
export function GET() {
  const data = {
    company: site.legalName,
    base: "Singapore",
    segments: productSegments.map((s) => ({
      title: s.title,
      slug: s.slug,
      path: `/products#${s.slug}`,
      description: s.description,
      products: s.products.map((p) => p.title),
    })),
    products: productDetails.map((p) => ({
      title: p.title,
      slug: p.slug,
      path: `/products/${p.slug}`,
      segment: p.segment,
      summary: p.summary,
      applications: p.applications,
    })),
    disclaimer:
      "Specifications, grades and certifications are confirmed per enquiry and are not published without verification.",
  };
  return NextResponse.json(data);
}

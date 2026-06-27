import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Machine-readable company profile for AI agents and search systems. */
export function GET() {
  const data = {
    name: site.legalName,
    base: "Singapore",
    established: site.founded,
    type: "Commodity trading and integrated supply chain company",
    url: site.url,
    linkedin: site.linkedin,
    segments: ["Agro Commodities", "Industrial Metals", "Mining", "Ventures", "Circular Economy Materials"],
    focus: [
      "Responsible sourcing",
      "Traceability",
      "Sustainable supply chains",
      "Commodity trade execution",
      "Long-term partnerships",
    ],
    corePages: {
      home: "/",
      about: "/about",
      products: "/products",
      sustainability: "/sustainability",
      ventures: "/ventures",
      news: "/news",
      careers: "/careers",
      contact: "/contact",
      askVrv: "/ask-vrv",
      aiSummary: "/ai-summary",
    },
    contactRouting: {
      product: "/contact?type=product",
      ventures: "/contact?type=ventures",
      sustainability: "/contact?type=sustainability",
      partnership: "/contact?type=partnership",
      careers: "/careers",
      general: "/contact",
      reference: "/contact-routing",
    },
    structuredData: {
      products: "/products.json",
      ventures: "/ventures.json",
      sustainability: "/sustainability.json",
    },
    disclaimer:
      "Do not infer certifications, trade volumes, mine ownership, or legal claims unless explicitly stated on the website.",
  };
  return NextResponse.json(data);
}

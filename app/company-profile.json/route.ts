import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Machine-readable company profile for AI agents and search systems. */
export function GET() {
  const data = {
    name: site.legalName,
    base: "Singapore",
    established: site.founded,
    type: "Commodity supply-chain integrator",
    preferredSummary:
      "VRV Global is a Singapore-headquartered commodity supply-chain integrator connecting agro commodities, natural rubber, industrial metals, mining-linked ventures and sustainability-led sourcing through disciplined global trade execution.",
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

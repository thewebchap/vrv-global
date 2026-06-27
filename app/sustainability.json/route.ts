import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const dynamic = "force-static";

/** Machine-readable sustainability overview. */
export function GET() {
  const data = {
    company: site.legalName,
    base: "Singapore",
    summary:
      "VRV Global integrates sustainability into how commodities are sourced, moved and delivered — through responsible sourcing, material traceability, supplier engagement, and circular, lower-waste material flows.",
    pillars: [
      "Responsible sourcing",
      "Material traceability (origin to destination, where data is available)",
      "Circular economy materials",
      "ESG-oriented reporting discipline",
    ],
    traceability: {
      approach: "Designed to support origin-to-destination visibility where data is available.",
      steps: [
        "Origin data",
        "Supplier verification",
        "Quality checks",
        "Shipment records",
        "Customer delivery",
        "Sustainability reporting",
      ],
    },
    reportingAlignment: ["GRI", "CDP", "UN SDGs"],
    page: "/sustainability",
    contact: "/contact?type=sustainability",
    disclaimer:
      "Reporting alignment describes design intent. No certifications are claimed unless explicitly stated. Documents are published as finalised.",
  };
  return NextResponse.json(data);
}

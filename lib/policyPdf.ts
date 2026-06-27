import "server-only";
import { existsSync } from "fs";
import path from "path";

/**
 * Server-side check for the Ethics & Governance policy pack PDF. The download
 * link is only shown when the file actually exists, so we never render a broken
 * PDF link. Upload the approved document to the path below to activate it.
 */
export const ETHICS_PDF_PATH = "/policies/vrv-ethics-governance-policy-pack.pdf";

export function ethicsPdfExists(): boolean {
  return existsSync(path.join(process.cwd(), "public", "policies", "vrv-ethics-governance-policy-pack.pdf"));
}

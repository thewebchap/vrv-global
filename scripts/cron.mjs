#!/usr/bin/env node
/**
 * Portable cron runner for any scheduler (crontab, systemd timer, GitHub
 * Actions, etc.) — an alternative to Vercel Cron (see vercel.json).
 *
 * Usage:
 *   SITE_URL=https://www.vrvglobal.com CRON_SECRET=xxx node scripts/cron.mjs linkedin
 *   SITE_URL=https://www.vrvglobal.com CRON_SECRET=xxx node scripts/cron.mjs market
 *   node scripts/cron.mjs all
 *
 * Example crontab:
 *   0 *\/12 * * *  cd /app && node scripts/cron.mjs linkedin
 *   *\/30 * * * *   cd /app && node scripts/cron.mjs market
 */
const SITE = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const SECRET = process.env.CRON_SECRET;
const which = process.argv[2] || "all";

if (!SECRET) {
  console.error("CRON_SECRET is required.");
  process.exit(1);
}

const targets = {
  linkedin: "/api/integrations/linkedin/sync",
  market: "/api/market-prices/sync",
};

async function run(name) {
  const res = await fetch(`${SITE}${targets[name]}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${SECRET}` },
  });
  const body = await res.json().catch(() => ({}));
  console.log(`[cron:${name}] ${res.status}`, JSON.stringify(body));
  if (!res.ok) process.exitCode = 1;
}

const list = which === "all" ? Object.keys(targets) : [which];
for (const name of list) {
  if (!targets[name]) {
    console.error(`Unknown target "${name}". Use: linkedin | market | all`);
    process.exit(1);
  }
  await run(name);
}

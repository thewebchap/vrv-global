"use client";

import { useState } from "react";
import { Field, Input, Textarea, Select, FileInput } from "@/components/forms/Fields";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * Fast-Track Pitch Submission — a 3-step founders' form.
 * Demo only: preventDefault + local success state, no alert(), nothing stored
 * or transmitted. Connect to the investment-committee inbox / CRM before launch.
 */

const GEO_OPTIONS = [
  "Africa & Latin America (Origination)",
  "Southeast & South Asia (Processing/Agg)",
  "Singapore / Global (Financing & Software)",
];

const STAGE_OPTIONS = [
  "Pre-Seed (Pilot/MVP)",
  "Seed (Live Commercial Testing)",
  "Series A (Scaling Revenue)",
];

const STEPS = ["01. Company Info", "02. Geo Focus & Stage", "03. Materials"];

export function PitchForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Step 1
  const [venture, setVenture] = useState("");
  const [founder, setFounder] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  // Step 2
  const [geo, setGeo] = useState("");
  const [stage, setStage] = useState("");
  const [pitch, setPitch] = useState("");
  // Step 3
  const [fileName, setFileName] = useState("");

  const [error, setError] = useState("");

  const step1Valid = venture.trim() && founder.trim() && email.trim();
  const step2Valid = geo && stage && pitch.trim();

  function next() {
    if (step === 0 && !step1Valid) {
      setError("Please complete the required fields before continuing.");
      return;
    }
    if (step === 1 && !step2Valid) {
      setError("Please complete the required fields before continuing.");
      return;
    }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function back() {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!step1Valid || !step2Valid) {
      setError("Please complete all required fields before transmitting.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-brand/25 bg-eco-soft p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
          <Icon name="check" />
        </span>
        <div>
          <h3 className="text-lg font-medium text-ink">Pitch received</h3>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink/70">
            Application received. The VRV Ventures investment committee will contact you within 10 business days.
          </p>
          <p className="mt-3 text-xs text-ink/45">Demo form — connect to the investment-committee inbox before launch. No data has been stored or transmitted.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Step progress */}
      <ol className="mb-8 grid grid-cols-3 gap-3">
        {STEPS.map((s, i) => {
          const state = i === step ? "current" : i < step ? "done" : "upcoming";
          return (
            <li key={s} className="flex items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-semibold transition-colors",
                  state === "current" && "bg-brand text-white",
                  state === "done" && "bg-brand-50 text-brand",
                  state === "upcoming" && "bg-paper text-ink/40 border border-line",
                )}
              >
                {state === "done" ? <Icon name="check" className="h-4 w-4" /> : i + 1}
              </span>
              <span className={cn("text-[13px] font-medium leading-tight", state === "upcoming" ? "text-ink/40" : "text-ink")}>
                {s}
              </span>
            </li>
          );
        })}
      </ol>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5">
        {/* Step 1 */}
        {step === 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Venture / Startup Name" htmlFor="p-venture" required>
              <Input id="p-venture" name="venture" type="text" placeholder="e.g., GeoOrigin" value={venture} onChange={(e) => setVenture(e.target.value)} required />
            </Field>
            <Field label="Lead Founder Name" htmlFor="p-founder" required>
              <Input id="p-founder" name="founder" type="text" placeholder="e.g., Sarah Chen" value={founder} onChange={(e) => setFounder(e.target.value)} required />
            </Field>
            <Field label="Founder Email" htmlFor="p-email" required>
              <Input id="p-email" name="email" type="email" autoComplete="email" placeholder="sarah@geoorigin.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Field>
            <Field label="Company Website" htmlFor="p-website">
              <Input id="p-website" name="website" type="url" placeholder="https://geoorigin.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
            </Field>
          </div>
        )}

        {/* Step 2 */}
        {step === 1 && (
          <div className="grid grid-cols-1 gap-5">
            <Field label="Primary Geographic Footprint" htmlFor="p-geo" required>
              <Select id="p-geo" name="geo" value={geo} onChange={(e) => setGeo(e.target.value)} required>
                <option value="" disabled>Select primary corridor</option>
                {GEO_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field label="Current Venture Stage" htmlFor="p-stage" required>
              <Select id="p-stage" name="stage" value={stage} onChange={(e) => setStage(e.target.value)} required>
                <option value="" disabled>Select venture stage</option>
                {STAGE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </Select>
            </Field>
            <Field label="Brief Value Proposition & Fit with VRV" htmlFor="p-pitch" required>
              <Textarea
                id="p-pitch"
                name="pitch"
                placeholder="How does your software or hardware layer integrate with VRV's physical commodity flows?"
                value={pitch}
                onChange={(e) => setPitch(e.target.value)}
                required
              />
            </Field>
          </div>
        )}

        {/* Step 3 */}
        {step === 2 && (
          <div className="grid grid-cols-1 gap-5">
            <Field label="Upload Pitch Deck (PDF only, max 20MB)" htmlFor="p-deck">
              <label
                htmlFor="p-deck"
                className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-ink/25 bg-sand-100 px-6 py-10 text-center transition-colors hover:border-brand hover:bg-eco-soft"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand">
                  <Icon name="doc" className="h-6 w-6" />
                </span>
                <span className="mt-1 text-sm font-semibold text-ink">
                  {fileName || "Click to upload or drag & drop pitch deck"}
                </span>
                <span className="text-[13px] text-ink/50">PDF format required</span>
              </label>
              <FileInput
                id="p-deck"
                name="deck"
                accept="application/pdf,.pdf"
                className="sr-only"
                onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
              />
            </Field>
          </div>
        )}

        {error && (
          <p role="alert" className="text-sm font-medium text-flame">{error}</p>
        )}

        {/* Controls */}
        <div className="mt-2 flex flex-wrap items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={back}
              className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-[15px] font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
            >
              ← Back
            </button>
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-flame-600 hover:shadow-hover"
            >
              {step === 0 ? "Proceed to Step 2 →" : "Proceed to Pitch Deck →"}
            </button>
          ) : (
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-flame px-6 py-3 text-[15px] font-semibold text-white shadow-soft transition-all hover:bg-flame-600 hover:shadow-hover"
            >
              Transmit Venture Pitch
            </button>
          )}
        </div>
        <p className="text-xs text-ink/45">Demo form — connect to the investment-committee inbox before launch.</p>
      </form>
    </div>
  );
}

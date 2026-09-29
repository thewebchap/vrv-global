"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Field, Input } from "@/components/forms/Fields";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

type Step = "email" | "code";

export function LoginForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function requestOtp(e?: React.FormEvent) {
    e?.preventDefault();
    setBusy(true);
    setError(null);
    setInfo(null);
    try {
      const res = await fetch("/api/blog/auth/request-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Something went wrong. Please try again.");
        if (res.status === 429) setCooldown(60);
        return;
      }
      setStep("code");
      setInfo(data.message || "A login code has been sent to your email.");
      setCooldown(60);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function verifyOtp(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/blog/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setError(data.message || "Invalid code.");
        return;
      }
      router.push("/blog/dashboard");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-7 shadow-card sm:p-9">
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand">
        <Icon name="lock" className="h-5 w-5" />
      </span>
      <h1 className="mt-5 font-serif text-2xl text-ink">Author sign in</h1>
      <p className="mt-2 text-[14.5px] leading-relaxed text-ink/60">
        {step === "email"
          ? "Enter your approved email. We'll send a one-time login code — no password needed."
          : `We sent a 6-digit code to ${email}. Enter it below to continue.`}
      </p>

      {error && (
        <p role="alert" className="mt-5 rounded-xl border border-flame/30 bg-flame/5 px-4 py-3 text-sm font-medium text-flame">
          {error}
        </p>
      )}
      {info && !error && (
        <p className="mt-5 rounded-xl border border-brand/25 bg-eco-soft px-4 py-3 text-sm text-ink/70">{info}</p>
      )}

      {step === "email" ? (
        <form onSubmit={requestOtp} className="mt-6 space-y-5">
          <Field label="Email" htmlFor="login-email" required>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@vrvglobal.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Field>
          <Button type="submit" variant="primary" size="lg" withArrow>
            {busy ? "Sending…" : "Send login code"}
          </Button>
        </form>
      ) : (
        <form onSubmit={verifyOtp} className="mt-6 space-y-5">
          <Field label="6-digit code" htmlFor="login-code" required>
            <Input
              id="login-code"
              name="code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder="123456"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              className="tracking-[0.4em]"
              required
            />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <Button type="submit" variant="primary" size="lg" withArrow>
              {busy ? "Verifying…" : "Verify & sign in"}
            </Button>
            <button
              type="button"
              disabled={cooldown > 0 || busy}
              onClick={() => requestOtp()}
              className="text-sm font-semibold text-brand disabled:text-ink/40"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
            </button>
          </div>
          <button type="button" onClick={() => { setStep("email"); setCode(""); setError(null); }} className="text-[13px] text-ink/50 hover:text-ink">
            ← Use a different email
          </button>
        </form>
      )}
    </div>
  );
}

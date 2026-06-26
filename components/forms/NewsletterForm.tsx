"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  return (
    <form
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
      onSubmit={(e) => {
        e.preventDefault();
        setDone(true);
      }}
    >
      {done ? (
        <p className="rounded-xl bg-white/[0.06] px-4 py-3 text-sm text-amber" role="status">
          Thank you — please confirm via the email we&apos;ll send. (Demo form — wire up to your ESP.)
        </p>
      ) : (
        <>
          <label htmlFor="nl-email" className="sr-only">Email address</label>
          <input
            id="nl-email"
            type="email"
            required
            placeholder="Work email address"
            className="w-full rounded-full border border-white/15 bg-white/[0.06] px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-amber focus:outline-none focus:ring-2 focus:ring-amber/30"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-flame px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-flame-600"
          >
            Subscribe
          </button>
        </>
      )}
    </form>
  );
}

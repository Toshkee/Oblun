"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { buttonClass } from "../ui/styles";

export const inputClass =
  "h-10 w-full border border-brown-900/70 bg-white px-3 text-sm text-ink outline-none transition focus:border-ink focus:ring-1 focus:ring-ink";
export const labelClass = "mb-1 block text-xs text-brown-900";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({ lang, termsHref, privacyHref }: { lang: Locale; termsHref: string; privacyHref: string }) {
  const t = ui(lang);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [startedAt] = useState(() => Date.now());

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "contact", lang, elapsed: Date.now() - startedAt }),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setAgreed(false);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p role="status" className="border border-success/40 bg-white p-5 text-center text-sm text-brown-900">
        {t.messageSent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="c-first" className={labelClass}>{t.firstName}</label>
          <input id="c-first" name="firstName" required autoComplete="given-name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="c-last" className={labelClass}>{t.lastName}</label>
          <input id="c-last" name="lastName" required autoComplete="family-name" className={inputClass} />
        </div>
      </div>
      <div>
        <label htmlFor="c-email" className={labelClass}>{t.email}</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-phone" className={labelClass}>{t.phoneOptional}</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>
      <div>
        <label htmlFor="c-message" className={labelClass}>{t.message}</label>
        <textarea id="c-message" name="message" required rows={4} className={`${inputClass} h-auto py-2`} />
      </div>
      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="flex items-start gap-3 pt-1 text-xs leading-relaxed text-gray-600">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 size-4 shrink-0 accent-brown-900"
        />
        <span>
          {t.agree}{" "}
          <Link href={termsHref} className="underline underline-offset-2">{t.termsLink}</Link> {t.and}{" "}
          <Link href={privacyHref} className="underline underline-offset-2">{t.privacyLink}</Link>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-sm text-error">{t.somethingWrong}</p>
      )}

      <div className="flex justify-end pt-2">
        <button type="submit" disabled={!agreed || status === "sending"} className={buttonClass("solid", "w-full sm:w-auto")}>
          {status === "sending" ? t.sending : t.send}
        </button>
      </div>
    </form>
  );
}

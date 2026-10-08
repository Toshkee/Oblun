"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";

// Same field styles as the original form (16px text on phones so iOS doesn't zoom in).
const fieldBase = "w-full border border-brown-900 bg-white px-3 py-2 text-16 font-medium text-brown-900 outline-none focus:border-brown-900";
export const inputClass = `${fieldBase} h-12 md:h-10`;
export const labelClass = "block text-14 font-light text-brown-900";

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
      <p role="status" className="w-full border border-success/40 bg-white p-5 text-center text-16 text-brown-900 md:w-16-24">
        {t.messageSent}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col items-center justify-center md:px-4-24">
      <div className="flex w-full flex-col md:flex-row">
        <div className="flex w-full flex-col">
          <label htmlFor="c-first" className={labelClass}>{t.firstName}</label>
          <input id="c-first" name="firstName" required autoComplete="given-name" className={inputClass} />
        </div>
        <div className="mt-2 flex w-full flex-col md:ml-4 md:mt-0">
          <label htmlFor="c-last" className={labelClass}>{t.lastName}</label>
          <input id="c-last" name="lastName" required autoComplete="family-name" className={inputClass} />
        </div>
      </div>
      <div className="mt-2 flex w-full flex-col md:mt-3">
        <label htmlFor="c-email" className={labelClass}>{t.email}</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" className={inputClass} />
      </div>
      <div className="mt-2 flex w-full flex-col md:mt-3">
        <label htmlFor="c-phone" className={labelClass}>{t.phoneOptional}</label>
        <input id="c-phone" name="phone" type="tel" autoComplete="tel" className={inputClass} />
      </div>
      <div className="mt-2 flex w-full flex-col md:mt-3">
        <label htmlFor="c-message" className={labelClass}>{t.message}</label>
        <textarea id="c-message" name="message" required className={`${fieldBase} h-20`} />
      </div>
      {/* Honeypot: hidden from people, filled in by spam bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />

      <label className="mt-4 flex w-full items-start md:mt-6">
        <input
          type="checkbox"
          required
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="size-6 shrink-0 accent-brown-900"
        />
        <span className="ml-3 text-14 font-light leading-170 text-gray-600">
          {t.agree}{" "}
          <Link href={termsHref} className="underline">{t.termsLink}</Link> {t.and}{" "}
          <Link href={privacyHref} className="underline">{t.privacyLink}</Link>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="mt-4 w-full text-14 text-error">{t.somethingWrong}</p>
      )}

      <div className="flex w-full items-center justify-center md:justify-end">
        <button
          type="submit"
          disabled={!agreed || status === "sending"}
          className="mt-12 w-full border border-brown-900 bg-brown-900 py-3 text-center text-14 font-medium leading-175 text-white hover:bg-brown-600 disabled:cursor-not-allowed disabled:border-gray-light disabled:bg-gray-light md:mt-8 md:w-56 md:py-2"
        >
          {status === "sending" ? t.sending : t.send}
        </button>
      </div>
    </form>
  );
}

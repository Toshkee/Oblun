"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale, UnitId } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, type Quote, type StayError } from "@/lib/pricing";
import { DateFields, GuestPicker, fieldClass, fieldLabel, useStayState, type Stay } from "./StayInputs";

type Check = { ok: false; error: StayError } | { ok: true; available: boolean; confirmed: boolean; quote: Quote };

type Props = {
  lang: Locale;
  unit: { id: UnitId; title: string; fromPrice: number; per: "unit" | "pitch"; maxGuests?: number; minNights: number };
  links: { label: string; href: string }[];
  termsHref: string;
  privacyHref: string;
};

/** Groups consecutive nights with the same price: "€120 × 3 nights". */
function breakdown(quote: Quote) {
  const groups: { price: number; count: number }[] = [];
  for (const night of quote.nights) {
    const last = groups.at(-1);
    if (last && last.price === night.price) last.count++;
    else groups.push({ price: night.price, count: 1 });
  }
  return groups;
}

export function BookingWidget({ lang, unit, links, termsHref, privacyHref }: Props) {
  const t = ui(lang);
  const { stay, setStay, today } = useStayState(Math.min(2, unit.maxGuests ?? 2));
  const [check, setCheck] = useState<Check | null>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [agreed, setAgreed] = useState(false);
  const [startedAt] = useState(() => Date.now());

  const update = (next: Stay) => {
    setStay(next);
    setCheck(null);
    setStatus("idle");
  };

  const errorText = (error: StayError) =>
    ({
      dates: t.errorDates,
      past: t.errorPast,
      guests: t.errorGuests,
      capacity: t.errorCapacity(unit.maxGuests ?? 0),
      minNights: t.errorMinNights(unit.minNights),
      tooLong: t.somethingWrong,
    })[error];

  async function onCheck(event: FormEvent) {
    event.preventDefault();
    if (!stay.checkIn || !stay.checkOut || stay.checkOut <= stay.checkIn) {
      setCheck({ ok: false, error: "dates" });
      return;
    }
    setLoading(true);
    try {
      const query = new URLSearchParams({
        unit: unit.id,
        checkIn: stay.checkIn,
        checkOut: stay.checkOut,
        adults: String(stay.guests.adults),
        children: String(stay.guests.children),
        infants: String(stay.guests.infants),
      });
      const res = await fetch(`/api/availability?${query}`);
      setCheck((await res.json()) as Check);
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  async function onRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "booking",
          lang,
          unit: unit.id,
          checkIn: stay.checkIn,
          checkOut: stay.checkOut,
          ...stay.guests,
          elapsed: Date.now() - startedAt,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div id="booking" className="relative flex w-full scroll-mt-24 flex-col rounded-4 border border-gray-200 bg-white p-4">
      <p className="mb-1 mt-2 text-center text-24 font-normal text-black">{unit.title}</p>
      <p className="mb-4 text-center text-14 font-light text-brown-900">
        {t.from} <span className="text-16 font-medium text-ink">{formatEUR(unit.fromPrice, lang)}</span>{" "}
        {unit.per === "pitch" ? t.perPitchNight : t.perNight}
      </p>

      <form onSubmit={onCheck} className="grid grid-cols-1 gap-x-3 gap-y-2 xl:grid-cols-2">
        <DateFields stay={stay} onChange={update} today={today} t={t} idPrefix="booking" />
        <div className="xl:col-span-2">
          <GuestPicker guests={stay.guests} onChange={(guests) => update({ ...stay, guests })} t={t} id="booking-guests" />
        </div>
        {!check?.ok && (
          <button type="submit" disabled={loading} className="mb-2 mt-2 flex h-12 w-full xl:col-span-2 items-center justify-center bg-brown-600 text-16 text-white transition-colors hover:bg-brown-900 disabled:opacity-60">
            {loading ? t.checking : t.checkAvailability}
          </button>
        )}
      </form>

      <div aria-live="polite">
        {check && !check.ok && <p className="mt-2 text-14 text-error">{errorText(check.error)}</p>}
        {check?.ok && !check.available && <p className="mt-3 text-14 text-error">{t.unavailable}</p>}

        {check?.ok && check.available && (
          <div className="mt-5">
            <dl className="space-y-1.5 border-t border-gray-200 pt-4 text-14 font-light text-brown-900">
              {breakdown(check.quote).map((g) => (
                <div key={`${g.price}-${g.count}`} className="flex justify-between">
                  <dt>
                    {formatEUR(g.price, lang)} × {t.nights(g.count)}
                  </dt>
                  <dd>{formatEUR(g.price * g.count, lang)}</dd>
                </div>
              ))}
              <div className="flex justify-between border-t border-gray-200 pt-2 text-16 font-medium text-ink">
                <dt>{t.total}</dt>
                <dd>{formatEUR(check.quote.total, lang)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-12 text-gray-600">{t.priceNote}</p>

            {status === "sent" ? (
              <p role="status" className="mt-5 border border-success/40 bg-beige-100 p-4 text-14 text-brown-900">
                {t.requestSent}
              </p>
            ) : (
              <form onSubmit={onRequest} className="mt-5 flex flex-col space-y-2">
                <p className="text-14 font-medium text-brown-900">{t.requestTitle}</p>
                <div>
                  <label htmlFor="b-name" className={fieldLabel}>{t.fullName}</label>
                  <input id="b-name" name="name" required autoComplete="name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="b-email" className={fieldLabel}>{t.email}</label>
                  <input id="b-email" name="email" type="email" required autoComplete="email" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="b-phone" className={fieldLabel}>{t.phoneOptional}</label>
                  <input id="b-phone" name="phone" type="tel" autoComplete="tel" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="b-message" className={fieldLabel}>{t.messageOptional}</label>
                  <textarea id="b-message" name="message" rows={3} className={`${fieldClass} h-auto py-2`} />
                </div>
                <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
                <label className="flex items-start gap-3 pt-1 text-12 font-light leading-170 text-gray-600">
                  <input type="checkbox" required checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-0.5 size-5 shrink-0 accent-brown-900" />
                  <span>
                    {t.agree}{" "}
                    <Link href={termsHref} className="underline underline-offset-2">{t.termsLink}</Link> {t.and}{" "}
                    <Link href={privacyHref} className="underline underline-offset-2">{t.privacyLink}</Link>
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={!agreed || status === "sending"}
                  className="flex h-12 w-full items-center justify-center bg-brown-600 text-16 text-white transition-colors hover:bg-brown-900 disabled:bg-gray-200 disabled:text-gray-400"
                >
                  {status === "sending" ? t.sending : t.sendRequest}
                </button>
              </form>
            )}
          </div>
        )}
        {status === "error" && <p role="alert" className="mt-3 text-14 text-error">{t.somethingWrong}</p>}
      </div>

      {links.length > 0 && (
        <p className="mt-4 border-t border-gray-200 pt-3 text-12 font-light text-gray-600">
          {t.alsoBookOn}{" "}
          {links.map((l, i) => (
            <span key={l.href}>
              {i > 0 && " · "}
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="font-medium text-brown-900 underline underline-offset-2">
                {l.label}
              </a>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, type Quote, type StayError } from "@/lib/pricing";
import type { UnitSummary } from "@/lib/summaries";
import { buttonClass } from "../ui/styles";
import { AmenityIcon } from "./AmenityIcon";
import { ImageCarousel } from "./ImageCarousel";
import { DateFields, GuestPicker, stayQuery, useStayState } from "./StayInputs";

type Result = { unit: string } & ({ ok: false; error: StayError } | { ok: true; available: boolean; confirmed: boolean; quote: Quote });

function PriceLine({ unit, result, lang }: { unit: UnitSummary; result?: Result; lang: Locale }) {
  const t = ui(lang);
  if (!result) {
    return (
      <p className="text-sm text-brown-900">
        {t.from} <span className="text-lg font-semibold text-ink">{formatEUR(unit.fromPrice, lang)}</span>{" "}
        {unit.per === "pitch" ? t.perPitchNight : t.perNight}
      </p>
    );
  }
  if (!result.ok) {
    return <p className="text-sm text-gray-600">{result.error === "capacity" ? t.tooManyGuests : t.notAvailable}</p>;
  }
  if (!result.available) return <p className="text-sm text-gray-600">{t.notAvailable}</p>;
  return (
    <p className="text-sm text-brown-900">
      <span className="text-lg font-semibold text-ink">{formatEUR(result.quote.total, lang)}</span> · {t.nights(result.quote.nights.length)}
      {result.confirmed && <span className="ml-2 text-xs font-medium text-success">{t.available}</span>}
    </p>
  );
}

export function AvailabilitySearch({ lang, units, variant }: { lang: Locale; units: UnitSummary[]; variant: "grid" | "rows" }) {
  const t = ui(lang);
  const { stay, setStay, today } = useStayState(2);
  const [results, setResults] = useState<Record<string, Result> | null>(null);
  const [searched, setSearched] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function onSearch(event: FormEvent) {
    event.preventDefault();
    if (!stay.checkIn || !stay.checkOut || stay.checkOut <= stay.checkIn) {
      setError(t.errorDates);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const query = stayQuery(stay);
      const res = await fetch(`/api/availability?${query}`);
      const data = (await res.json()) as { results: Result[] };
      const relevant = data.results.filter((r) => units.some((u) => u.id === r.unit));
      if (relevant.every((r) => !r.ok && r.error === "past")) setError(t.errorPast);
      setResults(Object.fromEntries(relevant.map((r) => [r.unit, r])));
      setSearched(query);
    } catch {
      setError(t.somethingWrong);
    } finally {
      setLoading(false);
    }
  }

  const rank = (u: UnitSummary) => {
    const r = results?.[u.id];
    return !r ? 0 : r.ok && r.available ? 0 : 1;
  };
  const sorted = results ? [...units].sort((a, b) => rank(a) - rank(b)) : units;
  const hrefFor = (u: UnitSummary) => (searched ? `${u.href}?${searched}` : u.href);

  return (
    <div>
      <form onSubmit={onSearch} className="grid gap-3 border border-brown-100 bg-white p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1.3fr_auto] lg:items-end">
        <DateFields stay={stay} onChange={setStay} today={today} t={t} idPrefix={`search-${variant}`} />
        <GuestPicker guests={stay.guests} onChange={(guests) => setStay({ ...stay, guests })} t={t} id={`search-${variant}-guests`} />
        <button type="submit" disabled={loading} className={buttonClass("solid", "h-11 sm:col-span-2 lg:col-span-1")}>
          {loading ? t.checking : t.checkAvailability}
        </button>
        {error && <p role="alert" className="text-sm text-error sm:col-span-2 lg:col-span-4">{error}</p>}
      </form>

      {variant === "grid" ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {sorted.map((unit) => (
            <li key={unit.id}>
              <Link href={hrefFor(unit)} className="group block h-full bg-white transition-shadow hover:shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={unit.images[0].src} alt={unit.images[0].alt} fill sizes="(min-width: 1024px) 240px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <p className="text-[11px] uppercase tracking-[0.08em] text-brown-600">{unit.categoryTitle}</p>
                  <h3 className="mt-1 font-serif text-2xl text-brown-900">{unit.title}</h3>
                  <p className="mt-1 text-xs text-gray-600">{unit.facts.join(" · ")}</p>
                  <div className="mt-3">
                    <PriceLine unit={unit} result={results?.[unit.id]} lang={lang} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <ul className="mt-8 space-y-6">
          {sorted.map((unit) => (
            <li key={unit.id} className="grid overflow-hidden bg-white shadow-sm md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
              <ImageCarousel images={unit.images} sizes="(min-width: 768px) 420px, 100vw" labels={{ previous: t.previous, next: t.next }} className="aspect-[4/3] md:aspect-auto md:min-h-80" />
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="font-serif text-[2rem] leading-tight text-brown-900">
                  <Link href={hrefFor(unit)} className="hover:underline">{unit.title}</Link>
                </h3>
                <p className="mt-1 text-sm text-gray-600">{unit.facts.join(" · ")}</p>
                <p className="mt-3 text-sm leading-relaxed text-brown-900">{unit.shortDescription}</p>
                <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                  {unit.amenities.slice(0, 6).map((a) => (
                    <li key={a.id} className="flex items-center gap-2 text-[13px] font-medium text-brown-900">
                      <AmenityIcon id={a.id} className="size-4 shrink-0" />
                      {a.label}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-6">
                  <PriceLine unit={unit} result={results?.[unit.id]} lang={lang} />
                  <Link href={hrefFor(unit)} className={buttonClass("solid")}>{t.bookNow}</Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

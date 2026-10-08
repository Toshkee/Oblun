"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent, type ReactNode } from "react";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, type Quote, type StayError } from "@/lib/pricing";
import type { UnitSummary } from "@/lib/summaries";
import { AmenityIcon } from "./AmenityIcon";
import { ImageCarousel } from "./ImageCarousel";
import { DateFields, GuestPicker, stayQuery, useStayState } from "./StayInputs";

type Result = { unit: string } & ({ ok: false; error: StayError } | { ok: true; available: boolean; confirmed: boolean; quote: Quote });

function PriceLine({ unit, result, lang }: { unit: UnitSummary; result?: Result; lang: Locale }) {
  const t = ui(lang);
  if (!result) {
    return (
      <p className="text-14 font-light text-brown-900">
        {t.from} <span className="text-18 font-medium text-ink">{formatEUR(unit.fromPrice, lang)}</span>{" "}
        {unit.per === "pitch" ? t.perPitchNight : t.perNight}
      </p>
    );
  }
  if (!result.ok) {
    return <p className="text-14 font-light text-gray-600">{result.error === "capacity" ? t.tooManyGuests : t.notAvailable}</p>;
  }
  if (!result.available) return <p className="text-14 font-light text-gray-600">{t.notAvailable}</p>;
  return (
    <p className="text-14 font-light text-brown-900">
      <span className="text-18 font-medium text-ink">{formatEUR(result.quote.total, lang)}</span> · {t.nights(result.quote.nights.length)}
      {result.confirmed && <span className="ml-2 text-12 font-medium text-success">{t.available}</span>}
    </p>
  );
}

/**
 * Date/guest filter plus the list of units with prices for those dates.
 * `between` is rendered between the filter and the list (the category header).
 */
export function AvailabilitySearch({
  lang,
  units,
  variant,
  between,
}: {
  lang: Locale;
  units: UnitSummary[];
  variant: "grid" | "rows";
  between?: ReactNode;
}) {
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
      <form onSubmit={onSearch} className="grid grid-cols-1 gap-x-3 gap-y-2 pt-1 md:grid-cols-[1fr_1fr_1.4fr_auto] md:items-end md:gap-x-4">
        <DateFields stay={stay} onChange={setStay} today={today} t={t} idPrefix={`search-${variant}`} />
        <div>
          <GuestPicker guests={stay.guests} onChange={(guests) => setStay({ ...stay, guests })} t={t} id={`search-${variant}-guests`} />
        </div>
        <button type="submit" disabled={loading} className="ui-btn mt-2 h-11 px-6 font-medium md:mt-0 md:h-[42px]">
          {loading ? t.checking : t.checkAvailability}
        </button>
        {error && (
          <p role="alert" className="text-14 text-error md:col-span-4">
            {error}
          </p>
        )}
      </form>

      {between}

      {variant === "grid" ? (
        <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {sorted.map((unit) => (
            <li key={unit.id}>
              <Link href={hrefFor(unit)} className="group block h-full bg-white shadow-4 transition-shadow hover:shadow-lg">
                <div className="relative aspect-3/2 overflow-hidden">
                  <Image
                    src={unit.images[0].src}
                    alt={unit.images[0].alt}
                    fill
                    sizes="(min-width: 1176px) 290px, (min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-4 pb-5 pt-4">
                  <p className="text-12 font-light uppercase tracking-wide text-brown-600">{unit.categoryTitle}</p>
                  <h3 className="mt-1 font-serif text-28 font-normal leading-122 text-brown-900">{unit.title}</h3>
                  <p className="mt-1 text-14 font-light leading-170 text-gray-600">{unit.facts.join(" · ")}</p>
                  <div className="mt-3">
                    <PriceLine unit={unit} result={results?.[unit.id]} lang={lang} />
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        // The list sits on a full-width darker band, like the original's second section.
        <ul className="flex flex-col space-y-8 bg-beige-500 pb-16 pt-8 shadow-[0_0_0_100vmax_var(--color-beige-500)] [clip-path:inset(0_-100vmax)]">
          {sorted.map((unit) => (
            <li key={unit.id} className="w-full xl:px-1-24">
              <article className="flex min-h-90 w-full flex-col text-brown-900 shadow-4 md:flex-row">
                <div className="relative w-full bg-white md:w-9-24">
                  <ImageCarousel
                    images={unit.images}
                    sizes="(min-width: 1176px) 405px, (min-width: 768px) 38vw, 100vw"
                    labels={{ previous: t.previous, next: t.next }}
                    className="aspect-4/3 md:aspect-auto md:h-full"
                  />
                </div>
                <div className="flex w-full flex-col bg-white px-4 md:min-h-90 md:w-15-24 md:pl-10 md:pr-8">
                  <h3 className="mt-4 font-serif text-28 font-normal leading-122 md:mt-6 md:text-36">
                    <Link href={hrefFor(unit)} className="hover:underline">
                      {unit.title}
                    </Link>
                  </h3>
                  <span className="text-14 font-light leading-170 text-gray-600">{unit.facts.join(" · ")}</span>
                  <span className="mt-3 text-14 font-light leading-170 md:mt-1 md:leading-130">{unit.shortDescription}</span>
                  <div className="hidden w-full grow items-end justify-start md:flex">
                    <div className="grid w-full grid-cols-3 gap-3 pb-4 pt-6">
                      {unit.amenities.slice(0, 6).map((a) => (
                        <div key={a.id} className="flex w-full items-center justify-start">
                          <AmenityIcon id={a.id} className="size-4 shrink-0" />
                          <span className="ml-2 text-14 font-medium leading-130">{a.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 flex w-full flex-col items-start justify-between gap-4 pb-6 md:mt-0 md:flex-row md:items-center md:pb-8">
                    <PriceLine unit={unit} result={results?.[unit.id]} lang={lang} />
                    <Link href={hrefFor(unit)} className="ui-btn h-10 w-full md:w-56">
                      {t.bookNow}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

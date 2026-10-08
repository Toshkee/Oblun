import Image from "next/image";
import Link from "next/link";
import { getCategory, units, unitsInCategory } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import type { Locale, UnitId } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, fromPrice } from "@/lib/pricing";
import { pathFor } from "@/lib/routes";
import { summarize } from "@/lib/summaries";
import { PatternBand } from "../modules/PatternBand";
import { Prose } from "../ui/Prose";
import { AmenityList } from "./AmenityList";
import { BookingWidget } from "./BookingWidget";
import { Breadcrumbs } from "./Breadcrumbs";
import { Gallery } from "./Gallery";
import { Reviews } from "./Reviews";

export function UnitView({ lang, id }: { lang: Locale; id: UnitId }) {
  const t = ui(lang);
  const unit = units.find((u) => u.id === id)!;
  const category = getCategory(unit.category);
  const summary = summarize(unit, lang);
  const siblings = unitsInCategory(unit.category).filter((u) => u.id !== unit.id);
  const others = siblings.length ? siblings : units.filter((u) => u.category !== unit.category).slice(0, 3);

  const links = [
    unit.links.airbnb && { label: "Airbnb", href: unit.links.airbnb },
    unit.links.booking && { label: "Booking.com", href: unit.links.booking },
    unit.links.park4night && { label: "Park4night", href: unit.links.park4night },
  ].filter((l): l is { label: string; href: string } => Boolean(l));

  const crumbs: { href?: string; label: string }[] = [
    { href: pathFor({ kind: "page", key: "home" }, lang), label: getPage("home").navTitle[lang] },
    { href: pathFor({ kind: "page", key: "accommodation" }, lang), label: getPage("accommodation").navTitle[lang] },
  ];
  if (unit.title[lang] === category.title[lang]) crumbs.push({ label: category.title[lang] });
  else crumbs.push({ href: pathFor({ kind: "category", id: category.id }, lang), label: category.title[lang] }, { label: unit.title[lang] });

  return (
    <>
      <section className="bg-beige-300 pb-16 pt-6 md:pb-24">
        <div className="container-site">
          <Breadcrumbs label={lang === "en" ? "Breadcrumb" : "Putanja"} items={crumbs} />
          <div className="mt-5">
            <Gallery
              photos={summary.images}
              labels={{ more: t.morePhotos(unit.gallery.length - 3), previous: t.previous, next: t.next, close: t.close, photos: t.photos }}
            />
          </div>

          <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
            <div>
              <h1 className="font-serif text-[2.6rem] leading-[1.05] text-brown-900 md:text-5xl">{unit.title[lang]}</h1>
              <p className="mt-2 text-lg text-gray-600">{unit.facts[lang].join(" · ")}</p>
              <Prose html={unit.description[lang]} className="mt-6" />

              <hr className="my-10 border-gray-400/60" />
              <h2 className="text-2xl font-semibold text-brown-900">{t.amenities}</h2>
              <div className="mt-6">
                <AmenityList
                  amenities={summary.amenities}
                  labels={{ showAll: t.showAllAmenities(unit.amenities.length), showFewer: t.showFewerAmenities }}
                />
              </div>

              {unit.reviewsWidget && (
                <>
                  <hr className="my-10 border-gray-400/60" />
                  <h2 className="text-2xl font-semibold text-brown-900">{t.reviews}</h2>
                  <div className="mt-6">
                    <Reviews widgetId={unit.reviewsWidget} />
                  </div>
                </>
              )}
            </div>

            <aside className="lg:sticky lg:top-32 lg:self-start">
              <BookingWidget
                lang={lang}
                unit={{
                  id: unit.id,
                  title: unit.title[lang],
                  fromPrice: fromPrice(unit),
                  per: unit.pricing.per,
                  maxGuests: unit.maxGuests,
                  minNights: unit.pricing.minNights,
                }}
                links={links}
                termsHref={pathFor({ kind: "page", key: "terms" }, lang)}
                privacyHref={pathFor({ kind: "page", key: "privacy" }, lang)}
              />
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-beige-500 py-14 md:py-20">
        <div className="container-site">
          <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900">
            {lang === "en" ? "You might also like" : "Možda će ti se dopasti"}
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((other) => (
              <li key={other.id}>
                <Link href={pathFor({ kind: "unit", id: other.id }, lang)} className="group block bg-white transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={other.gallery[0].src} alt={other.gallery[0].alt[lang]} fill sizes="(min-width: 1024px) 320px, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-2xl text-brown-900">{other.title[lang]}</h3>
                    <p className="mt-1 text-sm text-brown-900">
                      {t.from} <span className="font-semibold">{formatEUR(fromPrice(other), lang)}</span>{" "}
                      {other.pricing.per === "pitch" ? t.perPitchNight : t.perNight}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <PatternBand />

      {/* Mobile: keep the booking call-to-action within reach. */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex items-center justify-between gap-4 border-t border-brown-100 bg-white px-4 py-3 pr-20 lg:hidden">
        <p className="text-sm text-brown-900">
          {t.from} <span className="font-semibold text-ink">{formatEUR(fromPrice(unit), lang)}</span>{" "}
          {unit.pricing.per === "pitch" ? t.perPitchNight : t.perNight}
        </p>
        <a href="#booking" className="bg-brown-900 px-4 py-2 text-[13px] font-medium text-white">
          {t.checkAvailability}
        </a>
      </div>
    </>
  );
}

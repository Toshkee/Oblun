import Image from "next/image";
import Link from "next/link";
import { getCategory, units, unitsInCategory } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import type { Locale, UnitId } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, fromPrice } from "@/lib/pricing";
import { pathFor } from "@/lib/routes";
import { summarize } from "@/lib/summaries";
import { Prose } from "../ui/Prose";
import { AmenityList } from "./AmenityList";
import { BookingWidget } from "./BookingWidget";
import { Breadcrumbs } from "./Breadcrumbs";
import { Gallery } from "./Gallery";
import { Reviews } from "./Reviews";

/** Single unit page, laid out like the original: photos, text + booking sidebar, amenities, reviews. */
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

  const perNight = unit.pricing.per === "pitch" ? t.perPitchNight : t.perNight;

  return (
    <>
      <section className="h-full w-full bg-beige-300 pb-30">
        <div className="container-site flex flex-col pt-4 md:pt-0">
          <Breadcrumbs className="pb-6 pt-4" label={lang === "en" ? "Breadcrumb" : "Putanja"} items={crumbs} />
          <Gallery
            photos={summary.images}
            labels={{ more: t.morePhotos(unit.gallery.length - 3), previous: t.previous, next: t.next, close: t.close, photos: t.photos }}
          />
        </div>

        <div className="container-site relative flex flex-col md:flex-row md:items-start">
          <div className="flex w-full flex-col text-left text-brown-900 md:w-15-24 md:pr-1-24">
            <h1 className="mt-4 w-full font-serif text-28 font-normal leading-125 md:mt-0 md:text-48 xl:text-68">{unit.title[lang]}</h1>
            <span className="w-full text-14 font-light leading-160 text-gray-600 md:text-18 xl:text-22">{unit.facts[lang].join(" · ")}</span>
            <Prose html={unit.description[lang]} className="mt-5 md:mt-8" textClass="text-14 leading-175 font-light md:text-16" />
            <div className="mb-8 mt-12 hidden h-px w-full bg-gray-400 md:block" />
          </div>
          <aside className="mt-8 w-full md:sticky md:top-4 md:mt-0 md:w-9-24">
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

        <div className="container-site mt-10 text-brown-900 md:mt-0">
          <h2 className="text-20 font-medium leading-160 md:text-28">{t.amenities}</h2>
          <AmenityList amenities={summary.amenities} labels={{ showAll: t.showAllAmenities(unit.amenities.length), showFewer: t.showFewerAmenities }} />
        </div>

        {unit.reviewsWidget && (
          <div className="container-site">
            <div className="mt-10 flex max-w-[670px] flex-col gap-8 border-t border-gray-400 pt-6">
              <h2 className="text-20 font-medium leading-120 text-brown-900 xl:text-28">{t.reviews}</h2>
              <Reviews widgetId={unit.reviewsWidget} />
            </div>
          </div>
        )}
      </section>

      <section className="w-full bg-beige-500 pb-20 pt-16">
        <div className="container-site">
          <h2 className="font-serif text-28 font-normal leading-130 text-brown-900 xl:text-40">
            {lang === "en" ? "You might also like" : "Možda će ti se dopasti"}
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {others.map((other) => (
              <li key={other.id}>
                <Link href={pathFor({ kind: "unit", id: other.id }, lang)} className="group block bg-white shadow-4 transition-shadow hover:shadow-lg">
                  <div className="relative aspect-3/2 overflow-hidden">
                    <Image
                      src={other.gallery[0].src}
                      alt={other.gallery[0].alt[lang]}
                      fill
                      sizes="(min-width: 1176px) 380px, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="px-4 pb-5 pt-4">
                    <h3 className="font-serif text-28 font-normal leading-122 text-brown-900">{other.title[lang]}</h3>
                    <p className="mt-1 text-14 font-light text-brown-900">
                      {t.from} <span className="text-16 font-medium text-ink">{formatEUR(fromPrice(other), lang)}</span>{" "}
                      {other.pricing.per === "pitch" ? t.perPitchNight : t.perNight}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Phones: keep the booking call-to-action within reach. */}
      <div className="fixed inset-x-0 bottom-0 z-20 flex h-16 items-center justify-between gap-3 border-t border-gray-200 bg-white px-[27px] md:hidden">
        <p className="whitespace-nowrap text-14 font-light text-brown-900">
          {t.from} <span className="text-16 font-medium text-ink">{formatEUR(fromPrice(unit), lang)}</span> {perNight}
        </p>
        <a href="#booking" className="whitespace-nowrap bg-brown-900 px-4 py-2.5 text-14 font-medium text-white">
          {t.checkAvailability}
        </a>
      </div>
    </>
  );
}

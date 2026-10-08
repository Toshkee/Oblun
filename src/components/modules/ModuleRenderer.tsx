import Image from "next/image";
import type { Locale, Module, ModuleItem, PageKey } from "@/content/types";
import { hrefFor } from "@/lib/routes";
import { AccommodationOverview } from "../accommodation/AccommodationOverview";
import { AvailabilitySearchSection } from "../accommodation/AvailabilitySearchSection";
import { SmartLink } from "../ui/SmartLink";
import { Prose } from "../ui/Prose";
import { ContactSection } from "./ContactSection";
import { Hero } from "./Hero";
import { PatternBand } from "./PatternBand";
import { VimeoVideo } from "./VimeoVideo";

/*
 * Section layouts mirror the original site's content modules (A030/A031 image
 * + text, A060 two cards, A020 centred quote, A070 two photos + text), with the
 * same paddings, widths and type scale. Backgrounds alternate like on the original.
 */

const sectionBg = ["bg-beige-500", "bg-beige-300"];

function Cta({ item, lang, className = "" }: { item: ModuleItem; lang: Locale; className?: string }) {
  if (!item.cta) return null;
  return (
    <SmartLink href={hrefFor(item.cta.to, lang)} className={`ui-btn px-18 py-2 ${className}`}>
      {item.cta.label[lang]}
    </SmartLink>
  );
}

function Split({ item, imageSide, lang, bg }: { item: ModuleItem; imageSide: "left" | "right"; lang: Locale; bg: string }) {
  const left = imageSide === "left";
  return (
    <section className={`w-full ${bg}`}>
      <div className="container-site flex flex-col justify-center py-4 md:flex-row md:items-start md:pb-20 md:pt-16">
        {item.image && (
          <div
            className={`relative aspect-3/2 h-56 w-full overflow-hidden md:w-12-24 xl:h-[480px] xl:w-15-24 ${
              left ? "" : "order-first md:order-last md:ml-1-24"
            }`}
          >
            <Image src={item.image.src} alt={item.image.alt[lang]} fill sizes="(min-width: 1176px) 735px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        )}
        <div className={`flex h-full w-full items-start justify-center md:w-11-24 md:justify-start xl:min-h-[480px] xl:w-8-24 ${left ? "md:pl-1-24" : ""}`}>
          <div className="flex w-full flex-col items-start text-brown-900">
            {item.title && <h2 className="mt-4 font-serif text-28 font-normal leading-130 xl:mt-6 xl:text-40">{item.title[lang]}</h2>}
            <Prose html={item.html?.[lang]} className="mt-3" />
            <Cta item={item} lang={lang} className="mt-10 w-full md:w-auto xl:mt-6" />
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySplit({ item, lang, bg }: { item: ModuleItem; lang: Locale; bg: string }) {
  return (
    <section className={`w-full py-8 md:py-16 ${bg}`}>
      <div className="container-site flex">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full flex-row space-x-2 xl:w-16-24">
            {[item.image, item.image2].filter(Boolean).map((img) => (
              <div key={img!.src} className="relative aspect-2/3 w-1/2">
                <Image src={img!.src} alt={img!.alt[lang]} fill sizes="(min-width: 1176px) 390px, 50vw" className="object-cover" />
              </div>
            ))}
          </div>
          <div className="w-full text-brown-900 xl:w-8-24">
            <div className="md:ml-12">
              {item.title && <h2 className="mt-4 font-serif text-28 font-normal leading-120 xl:mt-6 xl:text-40">{item.title[lang]}</h2>}
              <Prose html={item.html?.[lang]} className="mt-3" />
              <Cta item={item} lang={lang} className="mt-10 w-full md:w-auto xl:mt-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards({ items, lang, bg }: { items: ModuleItem[]; lang: Locale; bg: string }) {
  return (
    <section className={`w-full py-4 md:py-16 ${bg}`}>
      <div className="container-site grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, index) => (
          <article key={index} className="flex w-full flex-col items-center md:items-start">
            {item.image && (
              <div className="relative aspect-3/2 w-full">
                <Image src={item.image.src} alt={item.image.alt[lang]} fill sizes="(min-width: 1176px) 580px, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
            )}
            {item.title && (
              <h2 className="mb-3 mt-4 w-full text-left font-serif text-40 font-normal leading-130 text-brown-900 md:mt-6 md:text-48">{item.title[lang]}</h2>
            )}
            <Prose html={item.html?.[lang]} className="w-full md:w-22-24" textClass="text-14 leading-175 font-light text-ink md:text-16" />
            <Cta item={item} lang={lang} className="mt-6 w-full md:w-auto md:self-start" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Quote({ item, lang, bg }: { item: ModuleItem; lang: Locale; bg: string }) {
  return (
    <section className={`w-full py-4 ${bg}`}>
      <div className="container-site text-brown-900">
        {item.title && (
          <h2 className="mb-3 mt-5 text-center font-serif text-36 font-normal leading-130 md:mb-4 md:mt-8 md:text-56">{item.title[lang]}</h2>
        )}
        <div className="flex justify-center">
          <div className="h-px w-32 bg-gray-400 md:w-72" />
        </div>
        <div className="mx-auto mb-10 mt-5 max-w-80 md:mt-6 md:max-w-[670px] xl:mb-20">
          <Prose html={item.html?.[lang]} textClass="text-16 leading-175 font-light text-center" />
          {item.cta && (
            <div className="mt-8 flex justify-center">
              <Cta item={item} lang={lang} className="w-full md:w-auto" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function ModuleRenderer({ lang, modules, pageKey }: { lang: Locale; modules: Module[]; pageKey: PageKey }) {
  let tone = 0;
  const nextBg = () => sectionBg[tone++ % 2];

  return modules.map((module, index) => {
    switch (module.type) {
      case "hero":
        return <Hero key={index} item={module.item} lang={lang} priority={index === 0} />;
      case "split":
        return <Split key={index} item={module.item} imageSide={module.imageSide} lang={lang} bg={nextBg()} />;
      case "gallery-split":
        return <GallerySplit key={index} item={module.item} lang={lang} bg={nextBg()} />;
      case "cards":
        return <Cards key={index} items={module.items} lang={lang} bg={nextBg()} />;
      case "quote":
        return <Quote key={index} item={module.item} lang={lang} bg={nextBg()} />;
      case "photo":
        return (
          <section key={index} className={`w-full py-4 md:py-16 ${nextBg()}`}>
            <div className="container-site">
              <div className="relative aspect-video w-full overflow-hidden">
                <Image src={module.image.src} alt={module.image.alt[lang]} fill sizes="(min-width: 1176px) 1176px, 100vw" className="object-cover" />
              </div>
            </div>
          </section>
        );
      case "video":
        return (
          <section key={index} className="container-site">
            <VimeoVideo id={module.vimeoId[lang]} poster={module.poster.src} title={lang === "en" ? "Oblun Eco Resort video" : "Video Oblun Eco Resorta"} />
          </section>
        );
      case "pattern":
        return <PatternBand key={index} />;
      case "contact-form":
        return <ContactSection key={index} lang={lang} full={pageKey === "contact"} />;
      case "accommodation-overview":
        return <AccommodationOverview key={index} lang={lang} bg={nextBg()} />;
      case "availability-search":
        return <AvailabilitySearchSection key={index} lang={lang} bg={nextBg()} />;
    }
  });
}

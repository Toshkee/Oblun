import Image from "next/image";
import type { Locale, Module, ModuleItem, PageKey } from "@/content/types";
import { hrefFor } from "@/lib/routes";
import { AccommodationOverview } from "../accommodation/AccommodationOverview";
import { AvailabilitySearchSection } from "../accommodation/AvailabilitySearchSection";
import { ButtonLink } from "../ui/Button";
import { Prose } from "../ui/Prose";
import { ContactSection } from "./ContactSection";
import { Hero } from "./Hero";
import { PatternBand } from "./PatternBand";
import { VimeoVideo } from "./VimeoVideo";

const sectionBg = ["bg-beige-500", "bg-beige-300"];

function Cta({ item, lang, className = "" }: { item: ModuleItem; lang: Locale; className?: string }) {
  if (!item.cta) return null;
  return (
    <ButtonLink href={hrefFor(item.cta.to, lang)} className={className}>
      {item.cta.label[lang]}
    </ButtonLink>
  );
}

function Split({ item, imageSide, lang, bg }: { item: ModuleItem; imageSide: "left" | "right"; lang: Locale; bg: string }) {
  return (
    <section className={`${bg} py-14 md:py-20`}>
      <div className={`container-site grid items-center gap-8 md:gap-12 ${imageSide === "left" ? "md:grid-cols-[1.25fr_1fr]" : "md:grid-cols-[1fr_1.25fr]"}`}>
        {item.image && (
          <div className={`relative aspect-[3/2] overflow-hidden ${imageSide === "right" ? "md:order-2" : ""}`}>
            <Image
              src={item.image.src}
              alt={item.image.alt[lang]}
              fill
              sizes="(min-width: 1024px) 560px, (min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        )}
        <div>
          {item.title && <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">{item.title[lang]}</h2>}
          <Prose html={item.html?.[lang]} className="mt-4" />
          <Cta item={item} lang={lang} className="mt-7" />
        </div>
      </div>
    </section>
  );
}

function GallerySplit({ item, lang, bg }: { item: ModuleItem; lang: Locale; bg: string }) {
  return (
    <section className={`${bg} py-14 md:py-20`}>
      <div className="container-site grid items-center gap-8 md:grid-cols-[1.6fr_1fr] md:gap-12">
        <div className="grid grid-cols-2 gap-2">
          {[item.image, item.image2].filter(Boolean).map((img) => (
            <div key={img!.src} className="relative aspect-[4/5] overflow-hidden">
              <Image src={img!.src} alt={img!.alt[lang]} fill sizes="(min-width: 768px) 320px, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div>
          {item.title && <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">{item.title[lang]}</h2>}
          <Prose html={item.html?.[lang]} className="mt-4" />
          <Cta item={item} lang={lang} className="mt-7" />
        </div>
      </div>
    </section>
  );
}

function Cards({ items, lang, bg }: { items: ModuleItem[]; lang: Locale; bg: string }) {
  return (
    <section className={`${bg} py-14 md:py-20`}>
      <div className="container-site grid gap-10 md:grid-cols-2 md:gap-4">
        {items.map((item, index) => (
          <article key={index} className="flex flex-col">
            {item.image && (
              <div className="relative aspect-[3/2] overflow-hidden">
                <Image src={item.image.src} alt={item.image.alt[lang]} fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" />
              </div>
            )}
            {item.title && <h2 className="mt-6 font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">{item.title[lang]}</h2>}
            <Prose html={item.html?.[lang]} className="mt-3 md:pr-6" />
            <Cta item={item} lang={lang} className="mt-6 self-start" />
          </article>
        ))}
      </div>
    </section>
  );
}

function Quote({ item, lang, bg }: { item: ModuleItem; lang: Locale; bg: string }) {
  return (
    <section className={`${bg} py-16 md:py-24`}>
      <div className="container-site max-w-3xl text-center">
        {item.title && <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.6rem]">{item.title[lang]}</h2>}
        <Prose html={item.html?.[lang]} className="mx-auto mt-5 max-w-2xl" textClass="text-base leading-[1.7] text-brown-900 md:text-[1.05rem]" />
        <Cta item={item} lang={lang} className="mt-8" />
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
          <section key={index} className={`${nextBg()} py-10`}>
            <div className="container-site">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={module.image.src} alt={module.image.alt[lang]} fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
              </div>
            </div>
          </section>
        );
      case "video":
        return (
          <section key={index} className={`${nextBg()} py-10 md:py-14`}>
            <div className="container-site">
              <VimeoVideo id={module.vimeoId[lang]} poster={module.poster.src} title={lang === "en" ? "Oblun Eco Resort video" : "Video Oblun Eco Resorta"} />
            </div>
          </section>
        );
      case "pattern":
        return <PatternBand key={index} />;
      case "contact-form":
        return <ContactSection key={index} lang={lang} full={pageKey === "contact"} />;
      case "accommodation-overview":
        return <AccommodationOverview key={index} lang={lang} bg={nextBg()} />;
      case "availability-search":
        return <AvailabilitySearchSection key={index} lang={lang} />;
    }
  });
}

import Image from "next/image";
import type { Locale, ModuleItem } from "@/content/types";
import { Prose } from "../ui/Prose";

/**
 * Same as the original hero: on desktop the text sits on the photo (610px
 * tall, dark gradient on the left); on phones the photo comes first and the
 * text follows below it on the beige background.
 */
export function Hero({ item, lang, priority }: { item: ModuleItem; lang: Locale; priority?: boolean }) {
  return (
    <section className="w-full bg-beige-300">
      <div className="relative flex flex-col">
        <div className="relative h-54 md:h-[610px]">
          {item.image && (
            <Image
              src={item.image.src}
              alt={item.image.alt[lang]}
              fill
              sizes="100vw"
              preload={priority}
              loading={priority ? "eager" : "lazy"}
              className="object-cover object-center"
            />
          )}
          <div className="hero-radial-gradient absolute inset-0 md:hidden" />
        </div>
        <div className="w-full pb-8 md:hero-gradient md:absolute md:inset-0 md:pb-0">
          <div className="container-site flex h-full flex-col items-start justify-center">
            <div className="flex w-full flex-col text-brown-900 md:w-12-24 md:text-white xl:w-10-24">
              {item.title && <h1 className="mt-4 font-serif text-36 font-normal leading-120 md:mt-0 md:text-68">{item.title[lang]}</h1>}
              <Prose html={item.html?.[lang]} className="my-4" textClass="text-16 leading-175 font-light" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

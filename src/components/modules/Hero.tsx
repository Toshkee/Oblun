import Image from "next/image";
import type { Locale, ModuleItem } from "@/content/types";
import { Prose } from "../ui/Prose";

export function Hero({ item, lang, priority }: { item: ModuleItem; lang: Locale; priority?: boolean }) {
  return (
    <section className="relative isolate flex min-h-[460px] items-center overflow-hidden md:min-h-[520px]">
      {item.image && (
        <Image
          src={item.image.src}
          alt={item.image.alt[lang]}
          fill
          sizes="100vw"
          preload={priority}
          loading={priority ? "eager" : "lazy"}
          className="-z-10 object-cover"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/60 via-black/30 to-black/0" />
      <div className="container-site py-16 text-white">
        {item.title && (
          <h1 className="max-w-lg font-serif text-[2.75rem] leading-[1.1] md:text-[3.6rem]">{item.title[lang]}</h1>
        )}
        <Prose html={item.html?.[lang]} className="mt-5 max-w-md" textClass="text-[13px] leading-relaxed text-white md:text-sm" />
      </div>
    </section>
  );
}

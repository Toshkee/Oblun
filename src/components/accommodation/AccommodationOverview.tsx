import Image from "next/image";
import Link from "next/link";
import { categories, unitsInCategory } from "@/content/accommodation";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { formatEUR, fromPrice } from "@/lib/pricing";
import { pathFor } from "@/lib/routes";

/** Homepage strip with every accommodation type and its lowest price. */
export function AccommodationOverview({ lang, bg }: { lang: Locale; bg: string }) {
  const t = ui(lang);
  return (
    <section className={`w-full py-8 md:py-16 ${bg}`}>
      <div className="container-site">
        <h2 className="font-serif text-28 font-normal leading-130 text-brown-900 xl:text-40">
          {lang === "en" ? "Choose your stay" : "Odaberi svoj smještaj"}
        </h2>
        <ul className="mt-6 grid grid-cols-2 gap-2 md:mt-8 md:grid-cols-5 md:gap-4">
          {categories.map((category) => {
            const price = Math.min(...unitsInCategory(category.id).map(fromPrice));
            return (
              <li key={category.id}>
                <Link href={pathFor({ kind: "category", id: category.id }, lang)} className="group relative block aspect-3/4 overflow-hidden">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt[lang]}
                    fill
                    sizes="(min-width: 1176px) 225px, (min-width: 768px) 20vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-serif text-24 font-normal leading-120 xl:text-28">{category.title[lang]}</h3>
                    <p className="mt-1 text-12 font-light xl:text-14">
                      {t.from} <span className="font-medium">{formatEUR(price, lang)}</span> {t.perNight}
                    </p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

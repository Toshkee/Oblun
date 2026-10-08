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
    <section className={`${bg} py-14 md:py-20`}>
      <div className="container-site">
        <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">
          {lang === "en" ? "Choose your stay" : "Odaberi svoj smještaj"}
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-5">
          {categories.map((category) => {
            const price = Math.min(...unitsInCategory(category.id).map(fromPrice));
            return (
              <li key={category.id}>
                <Link href={pathFor({ kind: "category", id: category.id }, lang)} className="group relative block aspect-[3/4] overflow-hidden">
                  <Image
                    src={category.image.src}
                    alt={category.image.alt[lang]}
                    fill
                    sizes="(min-width: 768px) 200px, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                    <h3 className="font-serif text-2xl leading-tight">{category.title[lang]}</h3>
                    <p className="mt-1 text-xs">
                      {t.from} <span className="font-semibold">{formatEUR(price, lang)}</span> {t.perNight}
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

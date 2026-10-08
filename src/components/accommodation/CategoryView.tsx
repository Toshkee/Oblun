import Image from "next/image";
import { getCategory, unitsInCategory } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import type { CategoryId, Locale } from "@/content/types";
import { pathFor } from "@/lib/routes";
import { summarize } from "@/lib/summaries";
import { PatternBand } from "../modules/PatternBand";
import { AvailabilitySearch } from "./AvailabilitySearch";
import { Breadcrumbs } from "./Breadcrumbs";

export function CategoryView({ lang, id }: { lang: Locale; id: CategoryId }) {
  const category = getCategory(id);
  const units = unitsInCategory(id).map((u) => summarize(u, lang));

  return (
    <>
      <section className="bg-beige-300 pb-14 pt-6 md:pb-20">
        <div className="container-site">
          <Breadcrumbs
            label={lang === "en" ? "Breadcrumb" : "Putanja"}
            items={[
              { href: pathFor({ kind: "page", key: "home" }, lang), label: getPage("home").navTitle[lang] },
              { href: pathFor({ kind: "page", key: "accommodation" }, lang), label: getPage("accommodation").navTitle[lang] },
              { label: category.title[lang] },
            ]}
          />

          <div className="relative isolate mt-6 flex min-h-72 items-end overflow-hidden md:min-h-80 md:items-center">
            <Image src={category.image.src} alt={category.image.alt[lang]} fill sizes="(min-width: 1024px) 1000px, 100vw" preload className="-z-10 object-cover" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 to-black/10 md:bg-gradient-to-r md:from-black/70 md:via-black/40 md:to-transparent" />
            <div className="max-w-md p-6 text-white md:p-10">
              <h1 className="font-serif text-[2.6rem] leading-[1.05] md:text-5xl">{category.title[lang]}</h1>
              <p className="mt-4 text-[13px] leading-relaxed md:text-sm">{category.description[lang]}</p>
            </div>
          </div>

          <div className="mt-8">
            <AvailabilitySearch lang={lang} units={units} variant="rows" />
          </div>
        </div>
      </section>
      <PatternBand />
    </>
  );
}

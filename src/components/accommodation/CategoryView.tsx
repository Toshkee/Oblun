import Image from "next/image";
import { getCategory, unitsInCategory } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import type { CategoryId, Locale } from "@/content/types";
import { pathFor } from "@/lib/routes";
import { summarize } from "@/lib/summaries";
import { ContactSection } from "../modules/ContactSection";
import { AvailabilitySearch } from "./AvailabilitySearch";
import { Breadcrumbs } from "./Breadcrumbs";

/** Category page, laid out like the original: filter, navy image header, list of units, contact form. */
export function CategoryView({ lang, id }: { lang: Locale; id: CategoryId }) {
  const category = getCategory(id);
  const units = unitsInCategory(id).map((u) => summarize(u, lang));

  const header = (
    <div className="relative mb-8 mt-6 min-h-[420px] w-full md:min-h-90">
      <div className="absolute inset-0 flex w-full items-end md:items-center md:justify-end">
        <div className="relative h-70 w-full self-end md:h-full md:w-18-24">
          <Image src={category.image.src} alt={category.image.alt[lang]} fill sizes="(min-width: 1176px) 882px, 75vw" preload className="object-cover object-center" />
        </div>
      </div>
      <div className="category-gradient absolute inset-0 z-10 h-full w-full md:h-90">
        <div className="h-full w-full px-6 md:w-10-24 md:px-0 md:ml-12 xl:w-8-24">
          <h1 className="mt-6 font-serif text-48 font-normal leading-100 text-white md:mt-12 xl:text-68">{category.title[lang]}</h1>
          <p className="mt-4 text-14 font-light leading-175 text-white md:text-16">{category.description[lang]}</p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <section className="flex w-full flex-col bg-beige-300 pt-4 md:pt-0">
        <div className="container-site">
          <Breadcrumbs
            className="py-4"
            label={lang === "en" ? "Breadcrumb" : "Putanja"}
            items={[
              { href: pathFor({ kind: "page", key: "home" }, lang), label: getPage("home").navTitle[lang] },
              { href: pathFor({ kind: "page", key: "accommodation" }, lang), label: getPage("accommodation").navTitle[lang] },
              { label: category.title[lang] },
            ]}
          />
        </div>
      </section>
      <div className="w-full bg-beige-300">
        <div className="container-site">
          <AvailabilitySearch lang={lang} units={units} variant="rows" between={header} />
        </div>
      </div>
      <ContactSection lang={lang} />
    </>
  );
}

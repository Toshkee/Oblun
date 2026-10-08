import { units } from "@/content/accommodation";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { summarize } from "@/lib/summaries";
import { AvailabilitySearch } from "./AvailabilitySearch";

export function AvailabilitySearchSection({ lang, bg }: { lang: Locale; bg: string }) {
  const t = ui(lang);
  return (
    <section id="search" className={`w-full py-8 md:pb-20 md:pt-16 ${bg}`}>
      <div className="container-site text-brown-900">
        <h2 className="font-serif text-28 font-normal leading-130 xl:text-40">{t.searchTitle}</h2>
        <p className="mb-5 mt-2 text-14 font-light leading-170 xl:text-16">{t.searchHint}</p>
        <AvailabilitySearch lang={lang} units={units.map((u) => summarize(u, lang))} variant="grid" />
      </div>
    </section>
  );
}

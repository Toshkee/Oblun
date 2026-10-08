import { units } from "@/content/accommodation";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { summarize } from "@/lib/summaries";
import { AvailabilitySearch } from "./AvailabilitySearch";

export function AvailabilitySearchSection({ lang }: { lang: Locale }) {
  const t = ui(lang);
  return (
    <section id="search" className="bg-beige-300 py-14 md:py-20">
      <div className="container-site">
        <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">{t.searchTitle}</h2>
        <p className="mt-2 text-sm text-brown-900">{t.searchHint}</p>
        <div className="mt-6">
          <AvailabilitySearch lang={lang} units={units.map((u) => summarize(u, lang))} variant="grid" />
        </div>
      </div>
    </section>
  );
}

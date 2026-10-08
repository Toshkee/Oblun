import { privacyPolicy, termsOfUse } from "@/content/legal";
import { getPage } from "@/content/pages";
import type { Locale } from "@/content/types";
import { Prose } from "../ui/Prose";

export function LegalView({ lang, pageKey }: { lang: Locale; pageKey: "privacy" | "terms" }) {
  const html = pageKey === "privacy" ? privacyPolicy[lang] : termsOfUse[lang];
  return (
    <section className="w-full bg-beige-300 pb-20 pt-10 md:pt-16">
      <div className="container-site">
        <div className="max-w-[780px]">
          <h1 className="font-serif text-36 font-normal leading-120 text-brown-900 md:text-56">{getPage(pageKey).seo.title[lang]}</h1>
          <Prose html={html} className="mt-8" textClass="text-14 leading-175 font-light text-brown-900 md:text-16" />
        </div>
      </div>
    </section>
  );
}

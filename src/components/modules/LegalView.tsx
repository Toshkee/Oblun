import { privacyPolicy, termsOfUse } from "@/content/legal";
import { getPage } from "@/content/pages";
import type { Locale } from "@/content/types";
import { Prose } from "../ui/Prose";

export function LegalView({ lang, pageKey }: { lang: Locale; pageKey: "privacy" | "terms" }) {
  const html = pageKey === "privacy" ? privacyPolicy[lang] : termsOfUse[lang];
  return (
    <section className="bg-beige-300 py-14 md:py-20">
      <div className="container-site max-w-3xl">
        <h1 className="font-serif text-[2.6rem] leading-tight text-brown-900 md:text-5xl">{getPage(pageKey).seo.title[lang]}</h1>
        <Prose html={html} className="mt-8" />
      </div>
    </section>
  );
}

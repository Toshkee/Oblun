import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { ButtonLink } from "../ui/Button";

export function NotFoundContent({ lang }: { lang: Locale }) {
  const t = ui(lang);
  const other = ui(lang === "en" ? "me" : "en");
  return (
    <section className="bg-beige-300 py-24 md:py-32">
      <div className="container-site max-w-xl text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-brown-600">404</p>
        <h1 className="mt-3 font-serif text-[2.6rem] leading-tight text-brown-900">{t.notFoundTitle}</h1>
        <p className="mt-4 text-brown-900">{t.notFoundText}</p>
        <p className="mt-1 text-sm text-gray-600" lang={lang === "en" ? "sr-Latn-ME" : "en"}>
          {other.notFoundText}
        </p>
        <ButtonLink href={lang === "en" ? "/" : "/me"} className="mt-8">
          {t.backHome}
        </ButtonLink>
      </div>
    </section>
  );
}

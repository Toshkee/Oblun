import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { SmartLink } from "../ui/SmartLink";

export function NotFoundContent({ lang }: { lang: Locale }) {
  const t = ui(lang);
  const other = ui(lang === "en" ? "me" : "en");
  return (
    <section className="w-full bg-beige-300 py-24 md:py-32">
      <div className="container-site text-center text-brown-900">
        <p className="text-14 uppercase tracking-[0.2em] text-brown-600">404</p>
        <h1 className="mt-3 font-serif text-36 font-normal leading-120 md:text-56">{t.notFoundTitle}</h1>
        <p className="mt-4 text-16 leading-175">{t.notFoundText}</p>
        <p className="mt-1 text-14 text-gray-600" lang={lang === "en" ? "sr-Latn-ME" : "en"}>
          {other.notFoundText}
        </p>
        <div className="mt-8 flex justify-center">
          <SmartLink href={lang === "en" ? "/" : "/me"} className="ui-btn px-18 py-2">
            {t.backHome}
          </SmartLink>
        </div>
      </div>
    </section>
  );
}

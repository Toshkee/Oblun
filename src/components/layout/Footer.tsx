import Image from "next/image";
import Link from "next/link";
import { categories } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import { site, telHref } from "@/content/site";
import type { Locale, PageKey } from "@/content/types";
import { ui } from "@/content/ui";
import { pathFor } from "@/lib/routes";
import { SocialLinks } from "./Header";

export function Footer({ lang }: { lang: Locale }) {
  const t = ui(lang);
  const page = (key: PageKey) => ({ href: pathFor({ kind: "page", key }, lang), label: getPage(key).navTitle[lang] });
  const columns = [page("restaurant"), page("experiences"), page("events")];
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brown-900 text-white">
      <div className="container-site pb-24 pt-12 md:pb-10">
        <div className="grid gap-10 md:grid-cols-[1.1fr_1.4fr_1fr_1fr_1fr]">
          <div>
            <Image src="/brand/logo-white.svg" alt="Oblun Eco Resort" width={110} height={43} />
            <p className="mt-6 text-sm font-semibold">{site.company}</p>
            <p className="mt-1 text-xs leading-relaxed">{site.city}</p>
            <a href={`mailto:${site.email}`} className="text-xs hover:underline">
              {site.email}
            </a>
            <br />
            <a href={telHref(site.phones[0])} className="text-xs hover:underline">
              {site.phones[0]}
            </a>
            <ul className="mt-6 space-y-2 text-sm">
              <li>
                <Link href={page("about").href} className="hover:underline">
                  {page("about").label}
                </Link>
              </li>
              <li>
                <Link href={page("contact").href} className="hover:underline">
                  {t.contactUs}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <Link href={page("accommodation").href} className="text-sm font-semibold uppercase tracking-wide hover:underline">
              {page("accommodation").label}
            </Link>
            <ul className="mt-4 space-y-2 text-sm">
              {categories.map((c) => (
                <li key={c.id}>
                  <Link href={pathFor({ kind: "category", id: c.id }, lang)} className="hover:underline">
                    {c.title[lang]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {columns.map((c) => (
            <div key={c.href}>
              <Link href={c.href} className="text-sm font-semibold uppercase tracking-wide hover:underline">
                {c.label}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col-reverse gap-6 border-t border-white/60 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] text-white/70">
              © {site.company} {year}. {t.allRightsReserved}
            </p>
            <div className="mt-2 flex gap-4 text-xs font-medium">
              <Link href={page("privacy").href} className="hover:underline">
                {page("privacy").label}
              </Link>
              <Link href={page("terms").href} className="hover:underline">
                {page("terms").label}
              </Link>
            </div>
          </div>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}

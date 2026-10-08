import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { categories } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import { site, telHref } from "@/content/site";
import type { Locale, PageKey } from "@/content/types";
import { ui } from "@/content/ui";
import { pathFor } from "@/lib/routes";
import { SocialLinks } from "./Header";

export function Footer({ lang, bottomBar }: { lang: Locale; bottomBar?: boolean }) {
  const t = ui(lang);
  const page = (key: PageKey) => ({ href: pathFor({ kind: "page", key }, lang), label: getPage(key).navTitle[lang] });
  const columns = [
    {
      ...page("accommodation"),
      children: categories.map((c) => ({ href: pathFor({ kind: "category", id: c.id }, lang), label: c.title[lang] })),
    },
    { ...page("restaurant"), children: [] },
    { ...page("experiences"), children: [] },
    { ...page("events"), children: [] },
  ];
  const year = new Date().getFullYear();
  const copyright = `© ${site.company} ${year}. ${t.allRightsReserved}`;

  return (
    <footer className={`bg-brown-900 pt-6 text-white md:pb-9 md:pt-12 ${bottomBar ? "pb-16" : ""}`}>
      <div className="container-site flex">
        <div className="flex w-full flex-col md:flex-row">
          <div className="flex w-full flex-col items-center pb-8 md:w-4-24 md:items-start">
            <Link href={pathFor({ kind: "page", key: "home" }, lang)} className="flex w-full justify-center md:justify-start">
              <Image src="/brand/logo-white.svg" alt="Oblun Eco Resort" width={131} height={51} className="h-10 w-25 md:h-13 md:w-32" />
            </Link>
            <span className="mt-8 w-full text-16 font-medium leading-175">{site.company}</span>
            <span className="mt-1 w-full text-12 leading-130">{site.city}</span>
            <a href={`mailto:${site.email}`} className="mt-2 w-full text-12 leading-130 hover:underline">
              {site.email}
            </a>
            <a href={telHref(site.phones[0])} className="mt-2 w-full text-12 leading-130 hover:underline">
              {site.phones[0]}
            </a>
            <Link href={page("about").href} className="mt-9 w-full text-14 leading-170 hover:underline">
              {page("about").label}
            </Link>
            <Link href={page("contact").href} className="mt-2 w-full text-14 leading-170 hover:underline">
              {t.contactUs}
            </Link>
          </div>

          {/* Desktop columns */}
          <ul className="hidden w-full flex-row md:flex md:w-18-24">
            {columns.map((col) => (
              <li key={col.href} className="flex w-6-24 flex-col gap-4">
                <Link href={col.href} className="text-16 font-medium uppercase leading-175 hover:underline">
                  {col.label}
                </Link>
                {col.children.length > 0 && (
                  <ul className="flex flex-col space-y-2">
                    {col.children.map((c) => (
                      <li key={c.href} className="text-14 leading-170">
                        <Link href={c.href} className="hover:underline">
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>

          {/* Phone: collapsible list */}
          <ul className="mb-8 flex w-full flex-col border-t border-white md:hidden">
            {columns.map((col) => (
              <li key={col.href} className="border-b border-white">
                {col.children.length > 0 ? (
                  <details className="group">
                    <summary className="flex w-full cursor-pointer list-none items-center justify-between py-3 [&::-webkit-details-marker]:hidden">
                      <span className="text-16 font-bold uppercase leading-175">{col.label}</span>
                      <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
                    </summary>
                    <ul className="flex flex-col space-y-2 pb-4">
                      <li className="text-14 leading-170">
                        <Link href={col.href}>{col.label}</Link>
                      </li>
                      {col.children.map((c) => (
                        <li key={c.href} className="text-14 leading-170">
                          <Link href={c.href}>{c.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <Link href={col.href} className="flex w-full py-3 text-16 font-bold uppercase leading-175">
                    {col.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container-site">
        <div className="hidden h-px w-full bg-white md:flex" />
        <div className="flex w-full items-center justify-between">
          <div className="mt-4 flex flex-col">
            <span className="hidden text-10 font-medium leading-160 text-gray-400 md:flex">{copyright}</span>
            <div className="mt-3 flex flex-col md:flex-row">
              <Link href={page("privacy").href} className="text-12 font-medium leading-130 hover:underline">
                {page("privacy").label}
              </Link>
              <Link href={page("terms").href} className="mt-2 text-12 font-medium leading-130 hover:underline md:ml-4 md:mt-0">
                {page("terms").label}
              </Link>
            </div>
          </div>
          <SocialLinks className="mt-4 space-x-4" />
        </div>
        <span className="flex w-full justify-center pb-6 pt-14 text-center text-10 font-medium leading-160 text-gray-400 md:hidden">{copyright}</span>
      </div>
    </footer>
  );
}

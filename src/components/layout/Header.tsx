import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { getPage } from "@/content/pages";
import { mainNav, site } from "@/content/site";
import { locales, type Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { pathFor, type Route } from "@/lib/routes";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "../icons/Social";
import { MobileMenu } from "./MobileMenu";

function isActive(key: string, route?: Route) {
  if (!route) return false;
  if (route.kind === "page") return route.key === key;
  return key === "accommodation";
}

export function SocialLinks({ className = "", iconClass = "size-5" }: { className?: string; iconClass?: string }) {
  const links = [
    { href: site.social.instagram.url, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook.url, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.linkedin.url, label: "LinkedIn", Icon: LinkedInIcon },
  ];
  return (
    <ul className={`flex items-center ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center justify-center hover:opacity-70">
            <Icon className={iconClass} />
          </a>
        </li>
      ))}
    </ul>
  );
}

/**
 * Same layout as the original: on desktop a 64px row (social icons, logo,
 * language) above a 1px line and a 48px navigation row – 115px in total. On
 * phones a 64px bar with the hamburger menu. Sticky on both.
 */
export function Header({ lang, route }: { lang: Locale; route?: Route }) {
  const t = ui(lang);
  const home = pathFor({ kind: "page", key: "home" }, lang);
  const nav = mainNav.map((key) => ({
    key,
    href: pathFor({ kind: "page", key }, lang),
    label: getPage(key).navTitle[lang],
    active: isActive(key, route),
  }));
  const languages = locales.map((l) => ({
    short: ui(l).languageShort,
    href: route ? pathFor(route, l) : pathFor({ kind: "page", key: "home" }, l),
    current: l === lang,
    hrefLang: l === "me" ? "sr-ME" : "en",
  }));

  return (
    <header className="sticky top-0 z-40 bg-white">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-3 focus:py-2">
        {lang === "en" ? "Skip to content" : "Pređi na sadržaj"}
      </a>
      <div className="container-site">
        {/* Phone bar */}
        <div className="relative flex h-16 items-center justify-between md:hidden">
          <MobileMenu items={nav} languages={languages} labels={{ open: t.menu, close: t.close, language: t.languageSelection }} />
          <Link href={home} className="absolute left-1/2 -translate-x-1/2" aria-label={`${site.name} – ${t.home}`}>
            <Image src="/brand/logo.svg" alt="Oblun Eco Resort" width={104} height={40} preload />
          </Link>
          <span className="w-5" aria-hidden />
        </div>

        {/* Desktop */}
        <div className="hidden md:block">
          <div className="flex h-16 items-end justify-between">
            <SocialLinks className="mb-2 gap-x-3 text-brown-900" />
            <Link href={home} className="relative mb-4" aria-label={`${site.name} – ${t.home}`}>
              <Image src="/brand/logo.svg" alt="Oblun Eco Resort" width={104} height={40} preload />
            </Link>
            <div className="relative mb-2 flex min-w-36 items-center justify-center text-14">
              <details className="group relative">
                <summary className="flex cursor-pointer list-none items-center font-light text-brown-900 [&::-webkit-details-marker]:hidden">
                  <span className="sr-only">{t.languageSelection}:</span>
                  {t.languageShort}
                  <ChevronDown className="ml-3 size-4 transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <ul className="absolute right-0 top-full z-50 mt-2 min-w-28 border border-brown-900 bg-white">
                  {languages.map((l) => (
                    <li key={l.short}>
                      <a
                        href={l.href}
                        hrefLang={l.hrefLang}
                        className={`flex px-3 py-2 text-brown-900 hover:bg-brown-100 ${l.current ? "font-medium" : "font-light"}`}
                      >
                        {l.short}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </div>
          <div className="h-px w-full bg-brown-900" />
          <nav aria-label={lang === "en" ? "Main" : "Glavni meni"} className="relative mt-[2px] flex h-12 w-full items-center justify-center">
            {nav.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                aria-current={item.active ? "page" : undefined}
                className={`px-2 pb-3 pt-4 text-14 uppercase leading-175 transition-colors ${
                  item.active ? "bg-brown-900 font-medium text-white" : "font-light text-brown-900 hover:bg-brown-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

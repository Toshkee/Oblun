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

export function SocialLinks({ className = "" }: { className?: string }) {
  const links = [
    { href: site.social.instagram.url, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook.url, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.linkedin.url, label: "LinkedIn", Icon: LinkedInIcon },
  ];
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <li key={label}>
          <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="block p-1 hover:opacity-70">
            <Icon className="size-4" />
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Header({ lang, route }: { lang: Locale; route?: Route }) {
  const t = ui(lang);
  const home = pathFor({ kind: "page", key: "home" }, lang);
  const nav = mainNav.map((key) => ({
    key,
    href: pathFor({ kind: "page", key }, lang),
    label: getPage(key).navTitle[lang],
    active: isActive(key, route),
  }));
  const other = locales.find((l) => l !== lang)!;
  const otherHref = route ? pathFor(route, other) : pathFor({ kind: "page", key: "home" }, other);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-white focus:px-3 focus:py-2">
        {lang === "en" ? "Skip to content" : "Pređi na sadržaj"}
      </a>
      <div className="container-site">
        <div className="relative flex h-14 items-center justify-between border-b border-gray-200 text-brown-900">
          <MobileMenu items={nav} labels={{ open: t.menu, close: t.close }} />
          <SocialLinks className="hidden md:flex" />

          <Link href={home} className="absolute left-1/2 -translate-x-1/2" aria-label={`${site.name} – ${t.home}`}>
            <Image src="/brand/logo.svg" alt="Oblun Eco Resort" width={92} height={35} preload />
          </Link>

          <details className="group relative">
            <summary className="flex cursor-pointer list-none items-center gap-1.5 px-1 py-2 text-xs font-medium tracking-wide [&::-webkit-details-marker]:hidden">
              <span className="sr-only">{lang === "en" ? "Language:" : "Jezik:"}</span>
              {t.languageShort}
              <ChevronDown className="size-3.5 transition-transform group-open:rotate-180" aria-hidden />
            </summary>
            <div className="absolute right-0 top-full z-10 mt-1 min-w-36 border border-gray-200 bg-white py-1 shadow-lg">
              <a href={otherHref} hrefLang={other === "me" ? "sr-ME" : "en"} lang={other === "me" ? "sr-Latn-ME" : "en"} className="block px-4 py-2 text-sm hover:bg-beige-300">
                {ui(other).languageName}
              </a>
            </div>
          </details>
        </div>

        <nav aria-label={lang === "en" ? "Main" : "Glavni meni"} className="hidden md:block">
          <ul className="flex items-center justify-center gap-1 py-1.5">
            {nav.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  aria-current={item.active ? "page" : undefined}
                  className={`block px-2.5 py-2 text-[11px] font-medium uppercase tracking-[0.08em] transition-colors ${
                    item.active ? "bg-brown-900 text-white" : "text-brown-900 hover:bg-beige-300"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

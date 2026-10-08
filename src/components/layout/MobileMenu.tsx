"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { ChevronDown } from "lucide-react";
import { site } from "@/content/site";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "../icons/Social";

type Item = { key: string; href: string; label: string; active: boolean };
type Language = { short: string; href: string; current: boolean; hrefLang: string };

const noop = () => () => {};
const useIsClient = () => useSyncExternalStore(noop, () => true, () => false);

const strip = "absolute left-0 h-0.5 w-full rounded-full bg-[#2e3354] transition-all duration-500";

/**
 * Mobile navigation, same behaviour as the original site: the hamburger turns
 * into an X and a white panel slides down from under the header (and back up).
 */
export function MobileMenu({
  items,
  languages,
  labels,
}: {
  items: Item[];
  languages: Language[];
  labels: { open: string; close: string; language: string };
}) {
  const [open, setOpen] = useState(false);
  const isClient = useIsClient();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const current = languages.find((l) => l.current)!;
  const socials = [
    { href: site.social.instagram.url, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.facebook.url, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.linkedin.url, label: "LinkedIn", Icon: LinkedInIcon },
  ];

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? labels.close : labels.open}
        className="relative h-[18px] w-5"
      >
        <span className={`${strip} ${open ? "top-2 rotate-45" : "top-0"}`} />
        <span className={`${strip} ${open ? "top-1/2 left-1/4 h-0 w-0 bg-transparent" : "top-2"}`} />
        <span className={`${strip} ${open ? "top-2 -rotate-45" : "top-4"}`} />
      </button>

      {/* Rendered in <body>: the header's backdrop-filter would otherwise
          become the containing block of this position:fixed panel. */}
      {isClient &&
        createPortal(
          <div
            id="mobile-menu"
            inert={!open}
            aria-hidden={!open}
            className={`fixed inset-x-0 z-[35] flex h-[calc(100dvh-3.5rem)] flex-col justify-between overflow-y-auto bg-white pb-6 transition-all duration-1000 md:hidden ${
              open ? "top-14 translate-y-0" : "top-0 -translate-y-full"
            }`}
          >
            <div>
              <div className="container-site py-2">
                <div className="h-px w-full bg-gray-400" />
              </div>
              <nav className="container-site flex flex-col gap-4 pt-6">
                {items.map((item) => (
                  <Link
                    key={item.key}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    className={`flex min-h-8 items-center text-lg leading-[1.75] text-brown-900 ${item.active ? "font-medium" : "font-light"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="container-site pt-10">
              <div className="mb-9 flex flex-col text-brown-900">
                <span className="text-sm font-light leading-loose">{labels.language}</span>
                <details className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between border border-brown-900 p-2 [&::-webkit-details-marker]:hidden">
                    <span className="font-light">{current.short}</span>
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <ul className="border border-t-0 border-brown-900">
                    {languages.map((l) => (
                      <li key={l.short}>
                        <a
                          href={l.href}
                          hrefLang={l.hrefLang}
                          className={`block px-3 py-2 hover:bg-brown-100 ${l.current ? "font-medium" : "font-light"}`}
                        >
                          {l.short}
                        </a>
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
              <div className="h-px w-full bg-gray-400" />
              <div className="mt-6 flex items-center justify-center gap-x-4 text-brown-900">
                {socials.map(({ href, label, Icon }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex size-8 items-center justify-center">
                    <Icon className="size-7" />
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}

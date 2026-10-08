import { site, whatsappHref } from "@/content/site";
import type { Locale } from "@/content/types";
import { WhatsAppIcon } from "../icons/Social";

export function WhatsAppButton({ lang, raised }: { lang: Locale; raised?: boolean }) {
  return (
    <a
      href={whatsappHref(site.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed right-4 z-30 ${raised ? "bottom-20 md:bottom-4" : "bottom-4"} flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105`}
      aria-label={lang === "en" ? "Chat with us on WhatsApp" : "Piši nam na WhatsApp"}
    >
      <WhatsAppIcon className="size-5" />
      <span>WhatsApp</span>
    </a>
  );
}

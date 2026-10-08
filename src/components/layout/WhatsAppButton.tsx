import { site, whatsappHref } from "@/content/site";
import type { Locale } from "@/content/types";
import { WhatsAppIcon } from "../icons/Social";

export function WhatsAppButton({ lang }: { lang: Locale }) {
  return (
    <a
      href={whatsappHref(site.whatsapp)}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-30 flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105"
      aria-label={lang === "en" ? "Chat with us on WhatsApp" : "Piši nam na WhatsApp"}
    >
      <WhatsAppIcon className="size-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

import { Mail, MapPin, Phone } from "lucide-react";
import { getPage } from "@/content/pages";
import { site, telHref, whatsappHref } from "@/content/site";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { pathFor } from "@/lib/routes";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "../icons/Social";
import { ContactForm } from "./ContactForm";

function ContactInfo({ lang }: { lang: Locale }) {
  const t = ui(lang);
  const row = "flex items-center gap-3 py-1.5 text-brown-900 hover:text-ink";
  return (
    <div>
      <h2 className="font-serif text-[2.1rem] leading-tight text-brown-900 md:text-[2.4rem]">{t.infoAndReservations}</h2>
      <ul className="mt-6 space-y-1 text-[15px]">
        <li>
          <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={row}>
            <MapPin className="size-5 shrink-0" strokeWidth={1.5} aria-hidden /> Oblun, Eco Resort
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className={row}>
            <Mail className="size-5 shrink-0" strokeWidth={1.5} aria-hidden /> {site.email}
          </a>
        </li>
        {site.phones.map((phone) => (
          <li key={phone}>
            <a href={telHref(phone)} className={row}>
              <Phone className="size-5 shrink-0" strokeWidth={1.5} aria-hidden /> {phone}
            </a>
          </li>
        ))}
        <li>
          <a href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className={row}>
            <WhatsAppIcon className="size-5 shrink-0" /> WhatsApp {site.whatsapp}
          </a>
        </li>
      </ul>
      <hr className="my-5 max-w-64 border-gray-400" />
      <ul className="space-y-1 text-[15px]">
        <li>
          <a href={site.social.instagram.url} target="_blank" rel="noopener noreferrer" className={row}>
            <InstagramIcon className="size-5" /> {site.social.instagram.handle}
          </a>
        </li>
        <li>
          <a href={site.social.instagramRestaurant.url} target="_blank" rel="noopener noreferrer" className={row}>
            <InstagramIcon className="size-5" /> {site.social.instagramRestaurant.handle}
          </a>
        </li>
        <li>
          <a href={site.social.facebook.url} target="_blank" rel="noopener noreferrer" className={row}>
            <FacebookIcon className="size-5" /> {site.social.facebook.handle}
          </a>
        </li>
        <li>
          <a href={site.social.linkedin.url} target="_blank" rel="noopener noreferrer" className={row}>
            <LinkedInIcon className="size-5" /> {site.social.linkedin.handle}
          </a>
        </li>
      </ul>
    </div>
  );
}

export function ContactSection({ lang, full }: { lang: Locale; full?: boolean }) {
  const t = ui(lang);
  const form = (
    <ContactForm
      lang={lang}
      termsHref={pathFor({ kind: "page", key: "terms" }, lang)}
      privacyHref={pathFor({ kind: "page", key: "privacy" }, lang)}
    />
  );

  if (!full) {
    return (
      <section id="contact" className="bg-beige-300 py-14 md:py-20">
        <div className="container-site max-w-xl">
          <h2 className="text-center font-serif text-[2.1rem] text-brown-900 md:text-[2.4rem]">{t.contactUs}</h2>
          <div className="mt-6">{form}</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="contact" className="grid md:grid-cols-2">
        <div className="bg-beige-300 px-4 py-14 md:py-20">
          <div className="mx-auto max-w-md">
            <h2 className="text-center font-serif text-[2.1rem] text-brown-900 md:text-[2.4rem]">{t.contactUs}</h2>
            <div className="mt-6">{form}</div>
          </div>
        </div>
        <div className="bg-white px-4 py-14 md:px-10 md:py-20">
          <div className="mx-auto max-w-md md:mx-0">
            <ContactInfo lang={lang} />
          </div>
        </div>
      </section>
      <section className="bg-beige-500 py-10 md:py-14">
        <div className="container-site">
          <iframe
            title={`${getPage("contact").navTitle[lang]} – Google Maps`}
            src={`https://www.google.com/maps?q=${site.location.lat},${site.location.lng}&z=14&hl=${lang === "en" ? "en" : "sr-Latn"}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="aspect-[4/3] w-full border-0 md:aspect-[21/9]"
          />
          <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm text-brown-900 underline underline-offset-4">
            {t.openInMaps}
          </a>
        </div>
      </section>
    </>
  );
}

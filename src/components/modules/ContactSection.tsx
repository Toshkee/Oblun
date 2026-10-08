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
  const row = "flex items-center space-x-4 text-16 font-light md:text-18 hover:text-ink";
  const icon = "size-5 shrink-0";
  return (
    <div className="flex h-full w-full flex-col bg-white pb-1 pt-5 text-brown-900 md:pl-12 md:pr-7-24 md:pt-14">
      <h2 className="mb-3 mt-5 font-serif text-28 font-normal leading-120 md:mb-6 md:mt-0 md:text-40">{t.infoAndReservations}</h2>
      <ul className="space-y-4">
        <li>
          <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className={row}>
            <MapPin className={icon} strokeWidth={1.25} aria-hidden /> <span>Oblun, Eco Resort</span>
          </a>
        </li>
        <li>
          <a href={`mailto:${site.email}`} className={row}>
            <Mail className={icon} strokeWidth={1.25} aria-hidden /> <span>{site.email}</span>
          </a>
        </li>
        {site.phones.map((phone) => (
          <li key={phone}>
            <a href={telHref(phone)} className={row}>
              <Phone className={icon} strokeWidth={1.25} aria-hidden /> <span>{phone}</span>
            </a>
          </li>
        ))}
        <li>
          <a href={whatsappHref(site.whatsapp)} target="_blank" rel="noopener noreferrer" className={row}>
            <WhatsAppIcon className={icon} /> <span>{site.whatsapp}</span>
          </a>
        </li>
      </ul>
      <div className="my-6 h-px w-full max-w-64 bg-gray-400" />
      <ul className="space-y-4 pb-8">
        {[
          { ...site.social.instagram, Icon: InstagramIcon },
          { ...site.social.instagramRestaurant, Icon: InstagramIcon },
          { ...site.social.facebook, Icon: FacebookIcon },
          { ...site.social.linkedin, Icon: LinkedInIcon },
        ].map(({ url, handle, Icon }) => (
          <li key={handle}>
            <a href={url} target="_blank" rel="noopener noreferrer" className={row}>
              <Icon className={icon} /> <span>{handle}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FormBlock({ lang }: { lang: Locale }) {
  const t = ui(lang);
  return (
    <div className="flex w-full flex-col items-center justify-center text-brown-900">
      <h2 className="mb-3 mt-5 font-serif text-28 font-normal leading-120 md:mb-6 md:mt-14 md:text-40">{t.contactUs}</h2>
      <ContactForm
        lang={lang}
        termsHref={pathFor({ kind: "page", key: "terms" }, lang)}
        privacyHref={pathFor({ kind: "page", key: "privacy" }, lang)}
      />
    </div>
  );
}

/**
 * Contact form. On the homepage (and accommodation pages) it's a centred
 * block (original module D300); on the contact page it sits next to the
 * contact details on a 56% beige / 44% white split, followed by a map.
 */
export function ContactSection({ lang, full }: { lang: Locale; full?: boolean }) {
  const t = ui(lang);

  if (!full) {
    return (
      <section id="contact" className="w-full bg-beige-300 pb-10 xl:pb-20">
        <div className="container-site">
          <div className="mx-auto w-full xl:w-18-24">
            <FormBlock lang={lang} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="contact" className="relative flex w-full flex-col md:flex-row">
        <div className="absolute left-0 hidden h-full w-[56%] bg-beige-300 xl:block" />
        <div className="absolute right-0 hidden h-full w-[44%] bg-white xl:block" />
        <div className="container-site relative px-0 md:px-[27px]">
          <div className="flex w-full flex-col bg-white md:flex-row xl:bg-beige-300">
            <div className="w-full bg-beige-300 px-[27px] pb-8 md:w-14-24 md:px-0 md:pb-30">
              <FormBlock lang={lang} />
            </div>
            <div className="w-full px-[27px] md:w-10-24 md:px-0">
              <ContactInfo lang={lang} />
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-beige-500 py-10 md:py-16">
        <div className="container-site">
          <iframe
            title={`${getPage("contact").navTitle[lang]} – Google Maps`}
            src={`https://www.google.com/maps?q=${site.location.lat},${site.location.lng}&z=14&hl=${lang === "en" ? "en" : "sr-Latn"}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[300px] w-full border-0 md:h-[500px]"
          />
          <a href={site.location.mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-14 text-brown-900 underline underline-offset-4">
            {t.openInMaps}
          </a>
        </div>
      </section>
    </>
  );
}

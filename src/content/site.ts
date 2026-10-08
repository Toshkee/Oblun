import type { PageKey } from "./types";

export const site = {
  name: "Oblun Eco Resort",
  url: "https://www.oblun.com",
  company: "Oblun Resort d.o.o.",
  city: "Podgorica, Montenegro",
  email: "info@oblun.com",
  phones: ["+382 69 777 595", "+382 69 777 570"],
  whatsapp: "+382 69 777 595",
  location: {
    lat: 42.3827112,
    lng: 19.1325105,
    mapsUrl: "https://www.google.com/maps/place/Oblun+Eco+Resort/@42.3827112,19.1325105,17z",
  },
  social: {
    instagram: { handle: "@oblun.resort", url: "https://www.instagram.com/oblunresort" },
    instagramRestaurant: { handle: "@odivarestaurant", url: "https://www.instagram.com/odivarestaurant/" },
    facebook: { handle: "/oblunresort", url: "https://www.facebook.com/oblunresort" },
    linkedin: { handle: "/oblunecoresort", url: "https://www.linkedin.com/company/oblunecoresort/" },
  },
  /** Vimeo videos shown on the homepage. */
  videos: { en: "692311353", me: "693171993" },
};

export const mainNav: PageKey[] = [
  "home",
  "accommodation",
  "restaurant",
  "experiences",
  "events",
  "about",
  "contact",
];

export const telHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
export const whatsappHref = (phone: string) => `https://wa.me/${phone.replace(/\D+/g, "")}`;

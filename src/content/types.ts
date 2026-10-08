export const locales = ["en", "me"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

/** A string translated into every supported language. */
export type Localized<T = string> = Record<Locale, T>;

export type Img = {
  src: string;
  width: number;
  height: number;
  alt: Localized;
};

/** Link to another page of the site by its key, or to an external URL. */
export type LinkTarget =
  | { page: PageKey; hash?: string }
  | { category: CategoryId }
  | { unit: UnitId }
  | { href: string };

export type CtaLink = { to: LinkTarget; label: Localized };

export type ModuleItem = {
  title?: Localized;
  /** Trusted HTML (paragraphs, lists, links). */
  html?: Localized;
  image?: Img;
  /** Second image, used by the "gallery-split" layout. */
  image2?: Img;
  cta?: CtaLink;
};

export type Module =
  | { type: "hero"; item: ModuleItem }
  | { type: "split"; imageSide: "left" | "right"; item: ModuleItem }
  | { type: "gallery-split"; item: ModuleItem }
  | { type: "cards"; items: ModuleItem[] }
  | { type: "quote"; item: ModuleItem }
  | { type: "photo"; image: Img }
  | { type: "video"; vimeoId: Localized; poster: Img }
  | { type: "pattern" }
  | { type: "contact-form" }
  | { type: "accommodation-overview" }
  | { type: "availability-search" };

export type PageKey =
  | "home"
  | "accommodation"
  | "restaurant"
  | "experiences"
  | "events"
  | "about"
  | "contact"
  | "privacy"
  | "terms";

export type Page = {
  key: PageKey;
  slug: Localized;
  /** Title shown in the navigation and breadcrumbs. */
  navTitle: Localized;
  seo: { title: Localized; description: Localized; image: Img };
  modules: Module[];
};

export type CategoryId = "villa" | "tents" | "mirror-cabin" | "autocamp" | "campsite";
export type UnitId =
  | "villa"
  | "large-tent"
  | "medium-tent"
  | "small-tent"
  | "mirror-cabin"
  | "autocamp"
  | "tent-pitch"
  | "countryside-pitch";

export type AmenityId =
  | "wifi"
  | "parking"
  | "dishes"
  | "bedding"
  | "fireplace"
  | "wardrobe"
  | "coffee-machine"
  | "washing-machine"
  | "refrigerator"
  | "dishwasher"
  | "hair-dryer"
  | "iron"
  | "grill"
  | "oven"
  | "outdoor-furniture"
  | "first-aid"
  | "toilet"
  | "electricity"
  | "water"
  | "shower"
  | "trash"
  | "ac"
  | "portable-fan"
  | "wastewater"
  | "black-water"
  | "ev-charging"
  | "laundry"
  | "underfloor-heating"
  | "kitchenette";

export type Season = {
  /** Inclusive start, "MM-DD". */
  from: string;
  /** Inclusive end, "MM-DD". */
  to: string;
  price: number;
};

export type Pricing = {
  /** Price per night (EUR) outside of any season. */
  base: number;
  seasons: Season[];
  minNights: number;
  /** What one "night" price covers, e.g. the whole unit or one pitch. */
  per: "unit" | "pitch";
};

export type Category = {
  id: CategoryId;
  slug: Localized;
  title: Localized;
  description: Localized;
  image: Img;
};

export type Unit = {
  id: UnitId;
  category: CategoryId;
  slug: Localized;
  title: Localized;
  /** Short facts shown under the title, e.g. "2 guests · 1 bed". */
  facts: Localized<string[]>;
  shortDescription: Localized;
  /** Trusted HTML. */
  description: Localized;
  /** Leave out for pitches, where the price is per pitch and not per guest. */
  maxGuests?: number;
  amenities: AmenityId[];
  gallery: Img[];
  pricing: Pricing;
  links: { airbnb?: string; booking?: string; park4night?: string };
  /** Elfsight reviews widget id (Airbnb / Booking.com / Google reviews). */
  reviewsWidget?: string;
};

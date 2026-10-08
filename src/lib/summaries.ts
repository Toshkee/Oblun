import { amenityLabels, categories } from "@/content/accommodation";
import type { AmenityId, Locale, Unit, UnitId } from "@/content/types";
import { fromPrice } from "./pricing";
import { pathFor } from "./routes";

/** Plain, serializable view of a unit for client components. */
export type UnitSummary = {
  id: UnitId;
  href: string;
  title: string;
  categoryTitle: string;
  facts: string[];
  shortDescription: string;
  images: { src: string; alt: string }[];
  amenities: { id: AmenityId; label: string }[];
  fromPrice: number;
  per: "unit" | "pitch";
  maxGuests?: number;
};

export function summarize(unit: Unit, lang: Locale): UnitSummary {
  return {
    id: unit.id,
    href: pathFor({ kind: "unit", id: unit.id }, lang),
    title: unit.title[lang],
    categoryTitle: categories.find((c) => c.id === unit.category)!.title[lang],
    facts: unit.facts[lang],
    shortDescription: unit.shortDescription[lang],
    images: unit.gallery.map((g) => ({ src: g.src, alt: g.alt[lang] })),
    amenities: unit.amenities.map((id) => ({ id, label: amenityLabels[id][lang] })),
    fromPrice: fromPrice(unit),
    per: unit.pricing.per,
    maxGuests: unit.maxGuests,
  };
}

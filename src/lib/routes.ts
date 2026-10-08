import { categories, units } from "@/content/accommodation";
import { getPage, pages } from "@/content/pages";
import { locales, type CategoryId, type LinkTarget, type Locale, type PageKey, type UnitId } from "@/content/types";

export type Route =
  | { kind: "page"; key: PageKey }
  | { kind: "category"; id: CategoryId }
  | { kind: "unit"; id: UnitId };

export const isLocale = (value: string): value is Locale => (locales as readonly string[]).includes(value);

/** Path segments (after the language prefix) of a route. */
export function segments(route: Route, lang: Locale): string[] {
  const accommodation = getPage("accommodation").slug[lang];
  switch (route.kind) {
    case "page": {
      const slug = getPage(route.key).slug[lang];
      return slug ? [slug] : [];
    }
    case "category":
      return [accommodation, categories.find((c) => c.id === route.id)!.slug[lang]];
    case "unit": {
      const unit = units.find((u) => u.id === route.id)!;
      const category = categories.find((c) => c.id === unit.category)!;
      return [accommodation, category.slug[lang], unit.slug[lang]];
    }
  }
}

/** Public URL path, e.g. "/accommodation/tents" or "/me/smjestaj/sator". */
export function pathFor(route: Route, lang: Locale): string {
  const path = segments(route, lang).join("/");
  const prefix = lang === "en" ? "" : `/${lang}`;
  return `${prefix}/${path}`.replace(/\/$/, "") || "/";
}

export function hrefFor(target: LinkTarget, lang: Locale): string {
  if ("href" in target) return target.href;
  if ("page" in target) return pathFor({ kind: "page", key: target.page }, lang) + (target.hash ? `#${target.hash}` : "");
  if ("category" in target) return pathFor({ kind: "category", id: target.category }, lang);
  return pathFor({ kind: "unit", id: target.unit }, lang);
}

export function allRoutes(): Route[] {
  return [
    ...pages.map((p): Route => ({ kind: "page", key: p.key })),
    ...categories.map((c): Route => ({ kind: "category", id: c.id })),
    ...units.map((u): Route => ({ kind: "unit", id: u.id })),
  ];
}

export function resolveRoute(lang: Locale, slug: string[] = []): Route | undefined {
  const wanted = slug.map(decodeURIComponent).join("/");
  return allRoutes().find((route) => segments(route, lang).join("/") === wanted);
}


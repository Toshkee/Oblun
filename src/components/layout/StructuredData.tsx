import { categories, units } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import { site } from "@/content/site";
import type { Locale } from "@/content/types";
import { fromPrice } from "@/lib/pricing";
import { pathFor, type Route } from "@/lib/routes";

const abs = (path: string) => new URL(path, site.url).toString();

const address = {
  "@type": "PostalAddress",
  addressLocality: "Oblun",
  addressRegion: "Podgorica",
  addressCountry: "ME",
};

function breadcrumbs(route: Route, lang: Locale) {
  const items = [{ name: getPage("home").navTitle[lang], path: pathFor({ kind: "page", key: "home" }, lang) }];
  if (route.kind !== "page" || route.key !== "home") {
    if (route.kind !== "page") items.push({ name: getPage("accommodation").navTitle[lang], path: pathFor({ kind: "page", key: "accommodation" }, lang) });
    if (route.kind === "page") items.push({ name: getPage(route.key).navTitle[lang], path: pathFor(route, lang) });
    if (route.kind === "category") {
      items.push({ name: categories.find((c) => c.id === route.id)!.title[lang], path: pathFor(route, lang) });
    }
    if (route.kind === "unit") {
      const unit = units.find((u) => u.id === route.id)!;
      const category = categories.find((c) => c.id === unit.category)!;
      items.push({ name: category.title[lang], path: pathFor({ kind: "category", id: category.id }, lang) });
      if (unit.title[lang] !== category.title[lang]) items.push({ name: unit.title[lang], path: pathFor(route, lang) });
    }
  }
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: abs(item.path) })),
  };
}

function resort(lang: Locale) {
  const prices = units.map(fromPrice);
  return {
    "@type": "Resort",
    "@id": `${site.url}/#resort`,
    name: site.name,
    url: abs(pathFor({ kind: "page", key: "home" }, lang)),
    description: getPage("home").seo.description[lang],
    image: units.slice(0, 5).map((u) => abs(u.gallery[0].src)),
    logo: abs("/brand/logo.svg"),
    email: site.email,
    telephone: site.phones[0].replace(/\s/g, ""),
    address,
    geo: { "@type": "GeoCoordinates", latitude: site.location.lat, longitude: site.location.lng },
    hasMap: site.location.mapsUrl,
    priceRange: `€${Math.min(...prices)}–€${Math.max(...units.flatMap((u) => [u.pricing.base, ...u.pricing.seasons.map((s) => s.price)]))}`,
    sameAs: [site.social.instagram.url, site.social.facebook.url, site.social.linkedin.url],
  };
}

export function StructuredData({ lang, route }: { lang: Locale; route: Route }) {
  const graph: object[] = [];
  if (route.kind === "page" && route.key === "home") graph.push(resort(lang));
  else graph.push(breadcrumbs(route, lang));

  if (route.kind === "page" && route.key === "restaurant") {
    graph.push({
      "@type": "Restaurant",
      name: "Restaurant Odiva",
      servesCuisine: lang === "en" ? "Montenegrin" : "Crnogorska",
      url: abs(pathFor(route, lang)),
      address,
      containedInPlace: { "@id": `${site.url}/#resort` },
      sameAs: [site.social.instagramRestaurant.url],
    });
  }

  if (route.kind === "unit") {
    const unit = units.find((u) => u.id === route.id)!;
    graph.push({
      "@type": "Accommodation",
      name: unit.title[lang],
      description: unit.shortDescription[lang],
      url: abs(pathFor(route, lang)),
      image: unit.gallery.map((g) => abs(g.src)),
      ...(unit.maxGuests && { occupancy: { "@type": "QuantitativeValue", maxValue: unit.maxGuests } }),
      containedInPlace: { "@id": `${site.url}/#resort` },
    });
  }

  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

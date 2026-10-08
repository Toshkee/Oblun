import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CategoryView } from "@/components/accommodation/CategoryView";
import { UnitView } from "@/components/accommodation/UnitView";
import { SiteShell } from "@/components/layout/SiteShell";
import { LegalView } from "@/components/modules/LegalView";
import { ModuleRenderer } from "@/components/modules/ModuleRenderer";
import { categories, units } from "@/content/accommodation";
import { getPage } from "@/content/pages";
import { site } from "@/content/site";
import { locales, type Img, type Locale } from "@/content/types";
import { ogLocale } from "@/content/ui";
import { allRoutes, isLocale, pathFor, resolveRoute, segments, type Route } from "@/lib/routes";

export function generateStaticParams({ params }: { params: { lang: string } }) {
  const lang = isLocale(params.lang) ? params.lang : "en";
  return allRoutes().map((route) => ({ slug: segments(route, lang) }));
}

async function load(props: PageProps<"/[lang]/[[...slug]]">) {
  const { lang, slug } = await props.params;
  if (!isLocale(lang)) notFound();
  const route = resolveRoute(lang, slug);
  if (!route) notFound();
  return { lang, route };
}

function seoFor(route: Route, lang: Locale): { title: string; description: string; image: Img } {
  if (route.kind === "page") {
    const { seo } = getPage(route.key);
    return { title: seo.title[lang], description: seo.description[lang], image: seo.image };
  }
  if (route.kind === "category") {
    const category = categories.find((c) => c.id === route.id)!;
    return { title: category.title[lang], description: category.description[lang], image: category.image };
  }
  const unit = units.find((u) => u.id === route.id)!;
  const category = categories.find((c) => c.id === unit.category)!;
  const title = unit.title[lang] === category.title[lang] ? unit.title[lang] : `${unit.title[lang]} – ${category.title[lang]}`;
  return { title, description: unit.shortDescription[lang], image: unit.gallery[0] };
}

export async function generateMetadata(props: PageProps<"/[lang]/[[...slug]]">): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const route = isLocale(lang) ? resolveRoute(lang, slug) : undefined;
  // Unknown URLs: the page itself calls notFound(); keep metadata out of it.
  if (!isLocale(lang) || !route) return { title: "404 – Oblun Eco Resort", robots: { index: false } };
  const { title, description, image } = seoFor(route, lang);
  const isHome = route.kind === "page" && route.key === "home";
  const fullTitle = isHome ? title : `${title} | ${site.name}`;
  const languages = Object.fromEntries(locales.map((l) => [l === "me" ? "sr-ME" : l, pathFor(route, l)]));

  return {
    title: fullTitle,
    description,
    alternates: {
      canonical: pathFor(route, lang),
      languages: { ...languages, "x-default": pathFor(route, "en") },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: fullTitle,
      description,
      url: pathFor(route, lang),
      locale: ogLocale[lang],
      images: [{ url: image.src, width: image.width, height: image.height, alt: image.alt[lang] }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image.src] },
  };
}

export default async function Page(props: PageProps<"/[lang]/[[...slug]]">) {
  const { lang, route } = await load(props);

  return (
    <SiteShell lang={lang} route={route}>
      {route.kind === "category" && <CategoryView lang={lang} id={route.id} />}
      {route.kind === "unit" && <UnitView lang={lang} id={route.id} />}
      {route.kind === "page" &&
        (route.key === "privacy" || route.key === "terms" ? (
          <LegalView lang={lang} pageKey={route.key} />
        ) : (
          <ModuleRenderer lang={lang} modules={getPage(route.key).modules} pageKey={route.key} />
        ))}
    </SiteShell>
  );
}

import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { allRoutes, pathFor } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const abs = (path: string) => new URL(path, site.url).toString();
  return allRoutes().flatMap((route) =>
    (["en", "me"] as const).map((lang) => ({
      url: abs(pathFor(route, lang)),
      changeFrequency: "monthly" as const,
      priority: route.kind === "page" && route.key === "home" ? 1 : route.kind === "unit" ? 0.8 : 0.6,
      alternates: { languages: { en: abs(pathFor(route, "en")), "sr-ME": abs(pathFor(route, "me")) } },
    })),
  );
}

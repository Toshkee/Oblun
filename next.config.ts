import type { NextConfig } from "next";
import { legacyRedirects } from "./src/lib/redirects";

const nextConfig: NextConfig = {
  // The site is fully static apart from two API routes, so the classic
  // static rendering model is enough (no Cache Components).
  experimental: {
    globalNotFound: true,
  },
  images: {
    qualities: [70, 80],
    formats: ["image/avif", "image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      // English lives at the root; /en/... is only an internal path.
      { source: "/en", destination: "/", permanent: true },
      { source: "/en/:path*", destination: "/:path*", permanent: true },
      ...legacyRedirects,
    ];
  },
  async rewrites() {
    // Plain array = "afterFiles": runs after static files and before the
    // dynamic [lang] segment, so every non-Montenegrin URL is served by /en.
    return [
      { source: "/", destination: "/en" },
      { source: "/:path((?!me/|me$|en/|en$|api/|_next/).*)", destination: "/en/:path" },
    ];
  },
};

export default nextConfig;

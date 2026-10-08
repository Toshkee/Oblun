import type { Metadata, Viewport } from "next";
import { Baskervville, Poppins } from "next/font/google";
import { notFound } from "next/navigation";
import { Analytics } from "@/components/layout/Analytics";
import { site } from "@/content/site";
import { locales } from "@/content/types";
import { htmlLang } from "@/content/ui";
import { isLocale } from "@/lib/routes";
import "../globals.css";

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
  display: "swap",
});

const baskervville = Baskervville({
  subsets: ["latin", "latin-ext"],
  variable: "--font-baskervville",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  robots: site.indexable ? undefined : { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfaf6",
};

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={htmlLang[lang]} className={`${poppins.variable} ${baskervville.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}

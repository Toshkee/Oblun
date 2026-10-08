import type { Metadata } from "next";
import { Baskervville, Poppins } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundContent } from "@/components/modules/NotFoundContent";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500", "600"], variable: "--font-poppins" });
const baskervville = Baskervville({ subsets: ["latin", "latin-ext"], variable: "--font-baskervville" });

export const metadata: Metadata = {
  title: "404 – Oblun Eco Resort",
};

/** Used for URLs that don't match any route at all. */
export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${poppins.variable} ${baskervville.variable}`}>
      <body>
        <SiteShell lang="en">
          <NotFoundContent lang="en" />
        </SiteShell>
      </body>
    </html>
  );
}

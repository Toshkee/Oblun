import type { ReactNode } from "react";
import type { Locale } from "@/content/types";
import type { Route } from "@/lib/routes";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { StructuredData } from "./StructuredData";
import { WhatsAppButton } from "./WhatsAppButton";

/** Header, footer and floating WhatsApp button around every page. */
export function SiteShell({ lang, route, children }: { lang: Locale; route?: Route; children: ReactNode }) {
  // Unit pages have a fixed booking bar at the bottom on phones.
  const bottomBar = route?.kind === "unit";
  return (
    <>
      <Header lang={lang} route={route} />
      <main id="main">{children}</main>
      <Footer lang={lang} bottomBar={bottomBar} />
      <WhatsAppButton lang={lang} raised={bottomBar} />
      {route && <StructuredData lang={lang} route={route} />}
    </>
  );
}

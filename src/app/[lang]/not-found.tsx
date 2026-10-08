import { lang as rootLang } from "next/root-params";
import { SiteShell } from "@/components/layout/SiteShell";
import { NotFoundContent } from "@/components/modules/NotFoundContent";
import { isLocale } from "@/lib/routes";

/** Shown when a page doesn't exist. Rendered inside the [lang] layout. */
export default async function NotFound() {
  const value = await rootLang();
  const lang = value && isLocale(value) ? value : "en";
  return (
    <SiteShell lang={lang}>
      <NotFoundContent lang={lang} />
    </SiteShell>
  );
}

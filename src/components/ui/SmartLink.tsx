import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { opensNewTab } from "@/lib/links";

/** Link that opens other sites and PDFs in a new tab and uses client-side navigation otherwise. */
export function SmartLink({ href, children, ...rest }: { href: string; children: ReactNode } & Omit<ComponentProps<"a">, "href">) {
  if (opensNewTab(href) || href.startsWith("mailto:") || href.startsWith("tel:")) {
    const external = opensNewTab(href);
    return (
      <a href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
}

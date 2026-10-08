/** Links that should open in a new tab (other sites and PDF brochures). */
export const opensNewTab = (href: string) => /^https?:/.test(href) || href.endsWith(".pdf");

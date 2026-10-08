const defaultText = "text-14 leading-170 font-light text-brown-900 xl:text-16";

/** Renders trusted HTML from the content files. `textClass` overrides size, weight and color. */
export function Prose({ html, className = "", textClass = defaultText }: { html?: string; className?: string; textClass?: string }) {
  if (!html) return null;
  return <div className={`prose-oblun ${textClass} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

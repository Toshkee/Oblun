const defaultText = "text-[0.9375rem] leading-[1.7] text-brown-900";

/** Renders trusted HTML from the content files. `textClass` overrides size and color. */
export function Prose({ html, className = "", textClass = defaultText }: { html?: string; className?: string; textClass?: string }) {
  if (!html) return null;
  return <div className={`prose-oblun ${textClass} ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}

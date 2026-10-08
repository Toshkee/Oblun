/* eslint-disable @next/next/no-img-element -- decorative SVG stretched to full width */

/** Decorative woven pattern from the Oblun brand, used between sections (original module A050). */
export function PatternBand() {
  return (
    <section aria-hidden className="w-full">
      <div className="mb-22 mt-28 hidden h-37 w-full md:flex">
        <img src="/brand/pattern.svg" alt="" className="h-full w-full object-cover" />
      </div>
      <div className="mb-11 mt-22 flex h-30 w-full md:hidden">
        <img src="/brand/pattern-mobile.svg" alt="" className="h-full w-full object-cover" />
      </div>
    </section>
  );
}

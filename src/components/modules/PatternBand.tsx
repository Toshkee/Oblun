/** Decorative woven pattern from the Oblun brand, used between sections. */
export function PatternBand() {
  return (
    <div aria-hidden className="bg-beige-500 py-12 md:py-16">
      <div
        className="h-[122px] bg-[url(/brand/pattern-mobile.svg)] bg-repeat-x bg-center md:h-[154px] md:bg-[url(/brand/pattern.svg)]"
      />
    </div>
  );
}

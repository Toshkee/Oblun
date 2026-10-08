"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Swipeable image carousel with arrows and dots (CSS scroll-snap, no library). */
export function ImageCarousel({
  images,
  sizes,
  labels,
  className = "aspect-[4/3]",
}: {
  images: { src: string; alt: string }[];
  sizes: string;
  labels: { previous: string; next: string };
  className?: string;
}) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  const go = (to: number) => {
    const el = track.current;
    if (!el) return;
    const next = (to + images.length) % images.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: "smooth" });
  };

  return (
    <div className={`group relative overflow-hidden bg-brown-100 ${className}`}>
      <div
        ref={track}
        onScroll={(e) => setIndex(Math.round(e.currentTarget.scrollLeft / e.currentTarget.clientWidth))}
        className="flex size-full snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {images.map((img, i) => (
          <div key={img.src} className="relative size-full shrink-0 snap-center">
            <Image src={img.src} alt={img.alt} fill sizes={sizes} loading={i === 0 ? "eager" : "lazy"} className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => go(index - 1)}
            className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
            aria-label={labels.previous}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => go(index + 1)}
            className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink shadow transition hover:bg-white"
            aria-label={labels.next}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5" aria-hidden>
            {images.map((img, i) => (
              <span key={img.src} className={`size-1.5 rounded-full transition ${i === index ? "bg-white" : "bg-white/50"}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

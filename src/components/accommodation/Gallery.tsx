"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Photo = { src: string; alt: string };

/**
 * Photos like on the original: a large 3:2 photo (16/24) next to two smaller
 * ones (8/24), the last one showing "+N photos". Click opens a lightbox.
 */
export function Gallery({ photos, labels }: { photos: Photo[]; labels: { more: string; previous: string; next: string; close: string; photos: string } }) {
  const [open, setOpen] = useState<number | null>(null);
  const show = useCallback((i: number) => setOpen((i + photos.length) % photos.length), [photos.length]);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") show(open + 1);
      if (e.key === "ArrowLeft") show(open - 1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, show]);

  const [first, ...rest] = photos;
  const side = photos.length >= 3 ? rest.slice(0, 2) : [];
  const remaining = photos.length - 3;

  return (
    <>
      <div className="flex w-full pb-6">
        <div className={`w-full ${side.length ? "md:w-16-24 md:shrink" : ""}`}>
          <button type="button" onClick={() => show(0)} className="relative block aspect-3/2 w-full overflow-hidden">
            <Image src={first.src} alt={first.alt} fill sizes="(min-width: 1176px) 784px, (min-width: 768px) 66vw, 100vw" preload className="object-cover object-center" />
            <span className="absolute bottom-3 right-3 bg-white/90 px-3 py-1 text-14 font-medium text-brown-900 md:hidden">
              {labels.photos} ({photos.length})
            </span>
          </button>
        </div>
        {side.length > 0 && (
          // Two photos that together are exactly as tall as the large one.
          <div className="ml-4 hidden w-8-24 shrink-0 flex-col gap-4 md:flex">
            {side.map((photo, i) => (
              <button key={photo.src} type="button" onClick={() => show(i + 1)} className="relative block w-full flex-1 overflow-hidden">
                <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1176px) 380px, 33vw" className="object-cover object-center" />
                {i === 1 && remaining > 0 && (
                  <span className="absolute inset-0 flex items-center justify-center bg-[#1f140c66] text-18 font-medium leading-200 text-white underline">
                    {labels.more}
                  </span>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={labels.photos} className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white">
          <div className="flex items-center justify-between p-4 text-14">
            <span className="tabular-nums">
              {open + 1} / {photos.length}
            </span>
            <button type="button" onClick={() => setOpen(null)} className="p-2" autoFocus>
              <X className="size-6" aria-hidden />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <div className="relative flex-1">
            <Image src={photos[open].src} alt={photos[open].alt} fill sizes="100vw" className="object-contain" />
            <button type="button" onClick={() => show(open - 1)} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 md:left-6">
              <ChevronLeft className="size-6" aria-hidden />
              <span className="sr-only">{labels.previous}</span>
            </button>
            <button type="button" onClick={() => show(open + 1)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 hover:bg-white/20 md:right-6">
              <ChevronRight className="size-6" aria-hidden />
              <span className="sr-only">{labels.next}</span>
            </button>
          </div>
          <p className="p-4 text-center text-14 text-white/80">{photos[open].alt}</p>
        </div>
      )}
    </>
  );
}

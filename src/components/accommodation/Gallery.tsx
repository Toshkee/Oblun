"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type Photo = { src: string; alt: string };

/** Photo grid (one large + two small) that opens a full-screen lightbox. */
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
      <div className={`grid gap-2 ${side.length ? "md:grid-cols-[2fr_1fr] md:grid-rows-2" : ""}`}>
        <button type="button" onClick={() => show(0)} className="relative aspect-[3/2] overflow-hidden md:row-span-2 md:aspect-auto md:min-h-[26rem]">
          <Image src={first.src} alt={first.alt} fill sizes="(min-width: 768px) 660px, 100vw" preload className="object-cover transition-transform duration-500 hover:scale-[1.02]" />
        </button>
        {side.map((photo, i) => (
          <button key={photo.src} type="button" onClick={() => show(i + 1)} className="relative hidden aspect-[3/2] overflow-hidden md:block md:aspect-auto">
            <Image src={photo.src} alt={photo.alt} fill sizes="330px" className="object-cover transition-transform duration-500 hover:scale-[1.02]" />
            {i === 1 && remaining > 0 && (
              <span className="absolute inset-0 flex items-center justify-center bg-black/40 text-sm font-medium text-white underline underline-offset-4">
                {labels.more}
              </span>
            )}
          </button>
        ))}
        <button type="button" onClick={() => show(0)} className="justify-self-start text-sm text-brown-900 underline underline-offset-4 md:hidden">
          {labels.photos} ({photos.length})
        </button>
      </div>

      {open !== null && (
        <div role="dialog" aria-modal="true" aria-label={labels.photos} className="fixed inset-0 z-50 flex flex-col bg-black/95 text-white">
          <div className="flex items-center justify-between p-4 text-sm">
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
          <p className="p-4 text-center text-sm text-white/80">{photos[open].alt}</p>
        </div>
      )}
    </>
  );
}

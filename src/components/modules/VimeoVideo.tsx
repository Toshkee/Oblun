"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Silent, looping Vimeo video. The iframe is only loaded once the video
 * scrolls into view, so it doesn't slow down the first page load.
 */
export function VimeoVideo({ id, poster, title }: { id: string; poster: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-video overflow-hidden bg-brown-100">
      <Image src={poster} alt="" fill sizes="(min-width: 1024px) 1000px, 100vw" className="object-cover" />
      {visible && (
        <iframe
          src={`https://player.vimeo.com/video/${id}?background=1&autoplay=1&loop=1&muted=1&dnt=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          className="absolute inset-0 size-full"
        />
      )}
    </div>
  );
}

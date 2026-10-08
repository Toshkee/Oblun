"use client";

import Script from "next/script";

/** Elfsight reviews widget (Airbnb / Booking.com / Google reviews) managed in the Elfsight account. */
export function Reviews({ widgetId }: { widgetId: string }) {
  return (
    <>
      <div className={`elfsight-app-${widgetId}`} data-elfsight-app-lazy />
      <Script src="https://elfsightcdn.com/platform.js" strategy="lazyOnload" />
    </>
  );
}

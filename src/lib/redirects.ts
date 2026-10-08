/** Old oblun.com URLs that should keep working (and keep their Google ranking). */
export const legacyRedirects = [
  { source: "/homepage", destination: "/", permanent: true },
  { source: "/accommodation-offer", destination: "/accommodation", permanent: true },
  { source: "/sala-za-sastanke", destination: "/events", permanent: true },
  {
    source: "/accommodation/villa-oblun/the-entire-floor",
    destination: "/accommodation/villa-oblun/entire-villa",
    permanent: true,
  },
  {
    source: "/accommodation/campsite/campsite",
    destination: "/accommodation/campsite/tent-pitch",
    permanent: true,
  },
  { source: "/me/naslovna", destination: "/me", permanent: true },
  { source: "/me/ponuda-smjestaja", destination: "/me/smjestaj", permanent: true },
  { source: "/ponuda-smjestaja", destination: "/me/smjestaj", permanent: true },
  { source: "/me/smjestaj/kuce", destination: "/me/smjestaj/vila-oblun", permanent: true },
  {
    source: "/me/smjestaj/kuce/dvosobna-kuca",
    destination: "/me/smjestaj/vila-oblun/cijela-vila",
    permanent: true,
  },
  { source: "/me/smjestaj/auto-kamp", destination: "/me/smjestaj/autokamp", permanent: true },
  { source: "/smjestaj", destination: "/me/smjestaj", permanent: true },
  { source: "/smjestaj/kuce", destination: "/me/smjestaj/vila-oblun", permanent: true },
  { source: "/smjestaj/:path*", destination: "/me/smjestaj/:path*", permanent: true },
];

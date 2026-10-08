# Oblun Eco Resort – web sajt

Nova verzija sajta [oblun.com](https://www.oblun.com): isti izgled i sadržaj kao stari sajt (Angular + Laravel CMS agencije Fleka), napravljen iznova u **Next.js 16 + Tailwind CSS 4**, sa ispravkama i poboljšanjima.

## Pokretanje

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # produkcijski build (statički generisane stranice)
npm start          # pokreće build
npm run lint
```

## Šta sajt ima

- **Dva jezika**: engleski na `/`, crnogorski na `/me` (svaka stranica ima prevod i hreflang oznake).
- **Stranice**: Naslovna, Smještaj (+ 5 kategorija i 8 jedinica), Restoran, Iskustva, Događaji, O nama, Kontakt, Politika privatnosti, Uslovi korišćenja.
- **Rezervacije**: gost bira datume i broj gostiju → sajt računa cijenu po sezonama → šalje upit e-mailom (resortu ide upit, gostu potvrda prijema). Plaćanje se ne vrši online.
- **Pretraga dostupnosti** svih jedinica odjednom na stranici Smještaj.
- Kontakt forma, Google mapa, WhatsApp dugme, Elfsight recenzije (Airbnb / Booking.com / Google), Vimeo video.
- SEO: naslovi i opisi za svaku stranicu, Open Graph slike, `sitemap.xml`, `robots.txt`, strukturirani podaci (Resort, Restaurant, Breadcrumbs).
- Stari URL-ovi (`/homepage`, `/me/smjestaj/kuce/...`, `/accommodation/villa-oblun/the-entire-floor` …) se preusmjeravaju na nove – vidi `src/lib/redirects.ts`.

## Gdje se šta mijenja

| Šta | Fajl |
| --- | --- |
| Tekstovi stranica (oba jezika) | `src/content/pages.ts` |
| Smještaj: opisi, sadržaji, galerije, **cijene i sezone**, linkovi ka Airbnb/Booking | `src/content/accommodation.ts` |
| Kontakt podaci, društvene mreže, video | `src/content/site.ts` |
| Dugmad i poruke interfejsa | `src/content/ui.ts` |
| Politika privatnosti i uslovi korišćenja | `src/content/legal.ts` |
| Fotografije (dimenzije + alt tekst) | `src/content/images.ts`, fajlovi u `public/images/` |

Cijene su u eurima po noći: `pricing.base` važi van sezone, a `pricing.seasons` definiše periode (npr. `{ from: "06-01", to: "09-30", price: 180 }`).

## Podešavanja (`.env.local`)

Kopiraj `.env.example` u `.env.local`:

- `SMTP_*` – mailbox preko kog se šalju upiti (bez ovoga, u produkciji forma prijavljuje grešku; lokalno se e-mail samo ispiše u konzoli).
- `ICAL_<JEDINICA>` – opcionalno: iCal linkovi iz Airbnb-a i Booking.com-a. Tada sajt prikazuje zauzete datume kao nedostupne.
- `NEXT_PUBLIC_GTM_ID` – opcionalno: Google Tag Manager.
- `ALLOW_INDEXING=true` – tek kada sajt pređe na www.oblun.com. Do tada je sajt sakriven od pretraživača (`noindex` + `robots.txt`), da test verzija na vercel.app ne konkuriše postojećem sajtu.

## Prije puštanja u rad – provjeriti

- **Cijene i granice sezona** u `accommodation.ts` (preuzete iz starog sistema uzorkovanjem po mjesecima, oktobar 2026).
- **Fotografije restorana i događaja** – na starom serveru te slike više ne postoje (45 od 100 slika vraća 404), pa su privremeno korišćene druge fotografije resorta.
- **Pravni tekstovi** – dopunjeni dijelom o upitima za rezervaciju preko sajta.
- Elfsight recenzije mogu biti vezane za domen oblun.com.

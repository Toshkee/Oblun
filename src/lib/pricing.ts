import type { Pricing, Unit } from "@/content/types";

export type Guests = { adults: number; children: number; infants: number };

export type Quote = {
  nights: { date: string; price: number }[];
  total: number;
};

const DAY = 24 * 60 * 60 * 1000;

/** Parses "YYYY-MM-DD" as a UTC date; returns null for anything else. */
export function parseDate(value: string | null | undefined): Date | null {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== value ? null : date;
}

export const formatISO = (date: Date) => date.toISOString().slice(0, 10);

export function nightlyPrice(pricing: Pricing, date: Date): number {
  const md = formatISO(date).slice(5);
  const season = pricing.seasons.find((s) =>
    s.from <= s.to ? md >= s.from && md <= s.to : md >= s.from || md <= s.to,
  );
  return season ? season.price : pricing.base;
}

/** Lowest nightly price of a unit, for "from €X" labels. */
export const fromPrice = (unit: Unit) => Math.min(unit.pricing.base, ...unit.pricing.seasons.map((s) => s.price));

export function quote(unit: Unit, checkIn: Date, checkOut: Date): Quote {
  const nights: Quote["nights"] = [];
  for (let t = checkIn.getTime(); t < checkOut.getTime(); t += DAY) {
    const date = new Date(t);
    nights.push({ date: formatISO(date), price: nightlyPrice(unit.pricing, date) });
  }
  return { nights, total: nights.reduce((sum, n) => sum + n.price, 0) };
}

export type StayError = "dates" | "past" | "guests" | "capacity" | "minNights" | "tooLong";

export function validateStay(
  unit: Unit,
  checkIn: Date | null,
  checkOut: Date | null,
  guests: Guests,
  today: Date,
): StayError | null {
  if (!checkIn || !checkOut || checkOut <= checkIn) return "dates";
  if (checkIn < today) return "past";
  if (guests.adults < 1) return "guests";
  if (unit.maxGuests && guests.adults + guests.children > unit.maxGuests) return "capacity";
  const nights = Math.round((checkOut.getTime() - checkIn.getTime()) / DAY);
  if (nights < unit.pricing.minNights) return "minNights";
  if (nights > 60) return "tooLong";
  return null;
}

export const formatEUR = (amount: number, lang: "en" | "me") =>
  new Intl.NumberFormat(lang === "en" ? "en-IE" : "sr-Latn-ME", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);

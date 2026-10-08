import "server-only";
import type { Unit } from "@/content/types";
import { formatISO, quote, validateStay, type Guests, type Quote, type StayError } from "./pricing";

/*
 * Optional calendar sync. Airbnb and Booking.com both export an iCal link per
 * listing. Put them in an environment variable named after the unit, e.g.
 *   ICAL_VILLA="https://www.airbnb.com/calendar/ical/123.ics,https://ical.booking.com/v1/export?t=..."
 *   ICAL_MIRROR_CABIN=...
 * Without it every date is shown as available and the team confirms by e-mail.
 */

type Range = { start: string; end: string };

const envName = (unit: Unit) => `ICAL_${unit.id.toUpperCase().replace(/-/g, "_")}`;
export const hasCalendar = (unit: Unit) => Boolean(process.env[envName(unit)]);

function parseICal(text: string): Range[] {
  const lines = text.replace(/\r?\n[ \t]/g, "").split(/\r?\n/);
  const ranges: Range[] = [];
  let start: string | null = null;
  let end: string | null = null;
  const toDate = (value: string) => `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;

  for (const line of lines) {
    if (line.startsWith("BEGIN:VEVENT")) start = end = null;
    else if (line.startsWith("DTSTART")) start = toDate(line.split(":").pop()!.trim());
    else if (line.startsWith("DTEND")) end = toDate(line.split(":").pop()!.trim());
    else if (line.startsWith("END:VEVENT") && start) {
      ranges.push({ start, end: end ?? start });
    }
  }
  return ranges;
}

async function bookedRanges(unit: Unit): Promise<Range[]> {
  const urls = (process.env[envName(unit)] ?? "").split(",").map((u) => u.trim()).filter(Boolean);
  const results = await Promise.all(
    urls.map(async (url) => {
      try {
        const res = await fetch(url, { next: { revalidate: 900 } });
        return res.ok ? parseICal(await res.text()) : [];
      } catch {
        return [];
      }
    }),
  );
  return results.flat();
}

export type StayCheck =
  | { ok: false; error: StayError }
  | { ok: true; available: boolean; confirmed: boolean; quote: Quote };

export async function checkStay(unit: Unit, checkIn: Date | null, checkOut: Date | null, guests: Guests): Promise<StayCheck> {
  const today = new Date(`${formatISO(new Date())}T00:00:00Z`);
  const error = validateStay(unit, checkIn, checkOut, guests, today);
  if (error) return { ok: false, error };

  const from = formatISO(checkIn!);
  const to = formatISO(checkOut!);
  const booked = hasCalendar(unit) ? await bookedRanges(unit) : [];
  const available = !booked.some((r) => r.start < to && r.end > from);

  return { ok: true, available, confirmed: hasCalendar(unit), quote: quote(unit, checkIn!, checkOut!) };
}

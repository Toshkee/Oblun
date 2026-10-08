import { units } from "@/content/accommodation";
import { checkStay } from "@/lib/availability";
import { parseDate, type Guests } from "@/lib/pricing";

const count = (value: string | null, fallback: number) => {
  const n = Number.parseInt(value ?? "", 10);
  return Number.isFinite(n) && n >= 0 && n <= 20 ? n : fallback;
};

/**
 * GET /api/availability?checkIn=2027-05-10&checkOut=2027-05-12&adults=2[&children=0&infants=0][&unit=mirror-cabin]
 * Returns the price quote (and availability, if calendars are connected) for one unit or all units.
 */
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const checkIn = parseDate(params.get("checkIn"));
  const checkOut = parseDate(params.get("checkOut"));
  const guests: Guests = {
    adults: count(params.get("adults"), 1),
    children: count(params.get("children"), 0),
    infants: count(params.get("infants"), 0),
  };

  const unitId = params.get("unit");
  const selected = unitId ? units.filter((u) => u.id === unitId) : units;
  if (selected.length === 0) return Response.json({ error: "unknown-unit" }, { status: 404 });

  const results = await Promise.all(
    selected.map(async (unit) => ({ unit: unit.id, ...(await checkStay(unit, checkIn, checkOut, guests)) })),
  );

  return Response.json(unitId ? results[0] : { results }, {
    headers: { "Cache-Control": "no-store" },
  });
}

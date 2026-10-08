import { categories, units } from "@/content/accommodation";
import type { Locale } from "@/content/types";
import { checkStay } from "@/lib/availability";
import { escapeHtml, resortInbox, sendMail } from "@/lib/mail";
import { formatEUR, parseDate } from "@/lib/pricing";

type Body = Record<string, unknown>;

const str = (value: unknown, max = 200) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const int = (value: unknown) => {
  const n = Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) && n >= 0 && n <= 20 ? n : 0;
};
const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
const formatDate = (iso: string) => iso.split("-").reverse().join(".");

/* Very small in-memory rate limit: max 5 messages per IP per 10 minutes. */
const recent = new Map<string, number[]>();
function rateLimited(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

const lines = (rows: [string, string][]) => rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
const table = (rows: [string, string][]) =>
  `<table cellpadding="6" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="color:#66594f"><b>${escapeHtml(k)}</b></td><td>${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`)
    .join("")}</table>`;

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400 });
  }

  // Spam bots fill the hidden field or submit instantly; pretend it worked.
  if (str(body.website) || Number(body.elapsed) < 2500) return Response.json({ ok: true });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) return Response.json({ error: "too-many-requests" }, { status: 429 });

  const lang: Locale = body.lang === "me" ? "me" : "en";
  const email = str(body.email, 120);
  const phone = str(body.phone, 40);
  const message = str(body.message, 3000);
  if (!isEmail(email)) return Response.json({ error: "invalid-email" }, { status: 400 });

  try {
    if (body.type === "booking") {
      const unit = units.find((u) => u.id === body.unit);
      const name = str(body.name, 120);
      if (!unit || !name) return Response.json({ error: "invalid-request" }, { status: 400 });

      const guests = { adults: int(body.adults), children: int(body.children), infants: int(body.infants) };
      const checkIn = parseDate(str(body.checkIn));
      const checkOut = parseDate(str(body.checkOut));
      const stay = await checkStay(unit, checkIn, checkOut, guests);
      if (!stay.ok) return Response.json({ error: stay.error }, { status: 400 });

      const category = categories.find((c) => c.id === unit.category)!;
      const from = formatDate(str(body.checkIn));
      const to = formatDate(str(body.checkOut));
      const nights = stay.quote.nights.length;
      const rows: [string, string][] = [
        ["Smještaj", `${unit.title.me} (${category.title.me})`],
        ["Dolazak", from],
        ["Odlazak", to],
        ["Noći", String(nights)],
        ["Gosti", `${guests.adults} odraslih, ${guests.children} djece, ${guests.infants} beba`],
        ["Cijena po sajtu", `${formatEUR(stay.quote.total, "me")} (${stay.quote.nights.map((n) => formatEUR(n.price, "me")).join(" + ")})`],
        ["Kalendar", stay.confirmed ? (stay.available ? "slobodno po kalendaru" : "ZAUZETO po kalendaru") : "nije povezan – provjeriti ručno"],
        ["Ime", name],
        ["E-mail", email],
        ["Telefon", phone],
        ["Poruka", message],
        ["Jezik", lang === "en" ? "engleski" : "crnogorski"],
      ];

      await sendMail({
        to: resortInbox(),
        replyTo: email,
        subject: `Upit za rezervaciju: ${unit.title.me}, ${from}–${to} (${nights} noći)`,
        text: lines(rows),
        html: `<h2 style="font-family:Georgia,serif;color:#66594f">Novi upit za rezervaciju</h2>${table(rows)}`,
      });

      const guestRows: [string, string][] =
        lang === "en"
          ? [
              ["Accommodation", unit.title.en],
              ["Check-in", from],
              ["Check-out", to],
              ["Guests", `${guests.adults} adults, ${guests.children} children, ${guests.infants} babies`],
              ["Estimated price", formatEUR(stay.quote.total, "en")],
            ]
          : [
              ["Smještaj", unit.title.me],
              ["Dolazak", from],
              ["Odlazak", to],
              ["Gosti", `${guests.adults} odraslih, ${guests.children} djece, ${guests.infants} beba`],
              ["Okvirna cijena", formatEUR(stay.quote.total, "me")],
            ];
      const intro =
        lang === "en"
          ? `Dear ${name},\n\nthank you for your booking request. We will check availability and reply to you shortly. Your booking is confirmed only once we confirm it by e-mail.`
          : `Poštovani/a ${name},\n\nhvala na upitu za rezervaciju. Provjerićemo dostupnost i uskoro vam odgovoriti. Rezervacija je potvrđena tek kada je potvrdimo putem e-maila.`;
      await sendMail({
        to: email,
        replyTo: resortInbox(),
        subject: lang === "en" ? "We received your booking request – Oblun Eco Resort" : "Primili smo vaš upit – Oblun Eco Resort",
        text: `${intro}\n\n${lines(guestRows)}\n\nOblun Eco Resort\ninfo@oblun.com · +382 69 777 595`,
        html: `<p style="font-family:Arial,sans-serif;font-size:14px">${escapeHtml(intro).replace(/\n/g, "<br>")}</p>${table(guestRows)}<p style="font-family:Arial,sans-serif;font-size:14px">Oblun Eco Resort<br>info@oblun.com · +382 69 777 595</p>`,
      });
      return Response.json({ ok: true });
    }

    const firstName = str(body.firstName, 80);
    const lastName = str(body.lastName, 80);
    if (!firstName || !message) return Response.json({ error: "invalid-request" }, { status: 400 });
    const rows: [string, string][] = [
      ["Ime", `${firstName} ${lastName}`.trim()],
      ["E-mail", email],
      ["Telefon", phone],
      ["Poruka", message],
      ["Jezik", lang === "en" ? "engleski" : "crnogorski"],
    ];
    await sendMail({
      to: resortInbox(),
      replyTo: email,
      subject: `Poruka sa sajta: ${firstName} ${lastName}`.trim(),
      text: lines(rows),
      html: `<h2 style="font-family:Georgia,serif;color:#66594f">Nova poruka sa sajta</h2>${table(rows)}`,
    });
    return Response.json({ ok: true });
  } catch (error) {
    console.error("[enquiry] failed to send", error);
    return Response.json({ error: "send-failed" }, { status: 502 });
  }
}

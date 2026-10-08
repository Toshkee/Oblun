"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Minus, Plus } from "lucide-react";
import type { UiStrings } from "@/content/ui";
import type { Guests } from "@/lib/pricing";

export type Stay = { checkIn: string; checkOut: string; guests: Guests };

const addDays = (iso: string, days: number) => {
  const d = new Date(`${iso}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
};

const localToday = () => {
  const d = new Date();
  return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())).toISOString().slice(0, 10);
};

// Same look as the original filter fields. 16px text on phones keeps iOS from
// zooming in, and min-w-0 lets the native date inputs shrink inside narrow boxes.
export const fieldClass =
  "h-11 w-full min-w-0 border border-brown-900 bg-white px-3 text-16 font-medium leading-170 text-brown-900 outline-none focus:border-ink md:h-[42px] md:text-14";
export const fieldLabel = "block text-14 font-light leading-200 text-brown-900";

/** Reads ?checkIn=&checkOut=&adults=&children=&infants= from the address bar once on mount. */
export function useStayState(defaultAdults = 2) {
  const [stay, setStay] = useState<Stay>({ checkIn: "", checkOut: "", guests: { adults: defaultAdults, children: 0, infants: 0 } });
  const [today, setToday] = useState("");

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const num = (key: string, fallback: number) => {
      const n = Number.parseInt(p.get(key) ?? "", 10);
      return Number.isFinite(n) && n >= 0 && n <= 20 ? n : fallback;
    };
    // Syncing from the URL can only happen after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday(localToday());
    setStay((s) => ({
      checkIn: p.get("checkIn") ?? s.checkIn,
      checkOut: p.get("checkOut") ?? s.checkOut,
      guests: { adults: num("adults", s.guests.adults), children: num("children", 0), infants: num("infants", 0) },
    }));
  }, []);

  return { stay, setStay, today };
}

export const stayQuery = (stay: Stay) =>
  new URLSearchParams({
    checkIn: stay.checkIn,
    checkOut: stay.checkOut,
    adults: String(stay.guests.adults),
    children: String(stay.guests.children),
    infants: String(stay.guests.infants),
  }).toString();

export function DateFields({
  stay,
  onChange,
  today,
  t,
  idPrefix,
}: {
  stay: Stay;
  onChange: (stay: Stay) => void;
  today: string;
  t: UiStrings;
  idPrefix: string;
}) {
  return (
    <>
      <div className="min-w-0">
        <label htmlFor={`${idPrefix}-in`} className={fieldLabel}>{t.checkIn}</label>
        <input
          id={`${idPrefix}-in`}
          type="date"
          required
          min={today || undefined}
          value={stay.checkIn}
          onChange={(e) => {
            const checkIn = e.target.value;
            const checkOut = checkIn && (!stay.checkOut || stay.checkOut <= checkIn) ? addDays(checkIn, 1) : stay.checkOut;
            onChange({ ...stay, checkIn, checkOut });
          }}
          className={fieldClass}
        />
      </div>
      <div className="min-w-0">
        <label htmlFor={`${idPrefix}-out`} className={fieldLabel}>{t.checkOut}</label>
        <input
          id={`${idPrefix}-out`}
          type="date"
          required
          min={stay.checkIn ? addDays(stay.checkIn, 1) : today || undefined}
          value={stay.checkOut}
          onChange={(e) => onChange({ ...stay, checkOut: e.target.value })}
          className={fieldClass}
        />
      </div>
    </>
  );
}

function Stepper({ label, hint, value, min, onChange }: { label: string; hint: string; value: number; min: number; onChange: (n: number) => void }) {
  const btn = "flex size-8 items-center justify-center rounded-full border border-brown-900/50 text-brown-900 disabled:opacity-30";
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-14 font-normal text-ink">{label}</p>
        <p className="text-12 text-gray-600">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className={btn} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label={`${label} −1`}>
          <Minus className="size-3.5" aria-hidden />
        </button>
        <span className="w-4 text-center text-14 font-medium tabular-nums" aria-live="polite">{value}</span>
        <button type="button" className={btn} disabled={value >= 12} onClick={() => onChange(value + 1)} aria-label={`${label} +1`}>
          <Plus className="size-3.5" aria-hidden />
        </button>
      </div>
    </div>
  );
}

export function GuestPicker({ guests, onChange, t, id }: { guests: Guests; onChange: (g: Guests) => void; t: UiStrings; id: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", close);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", close);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative min-w-0">
      <span id={`${id}-label`} className={fieldLabel}>{t.guests}</span>
      <button
        type="button"
        aria-labelledby={`${id}-label`}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((o) => !o)}
        className={`${fieldClass} flex items-center justify-between text-left`}
      >
        <span className="truncate">{t.guestSummary(guests.adults, guests.children, guests.infants)}</span>
        <ChevronDown className={`size-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open && (
        <div id={`${id}-panel`} className="absolute left-0 right-0 top-full z-20 mt-1 min-w-64 border border-brown-900 bg-white px-4 py-2 shadow-4">
          <Stepper label={t.adults} hint={t.adultsHint} value={guests.adults} min={1} onChange={(adults) => onChange({ ...guests, adults })} />
          <Stepper label={t.children} hint={t.childrenHint} value={guests.children} min={0} onChange={(children) => onChange({ ...guests, children })} />
          <Stepper label={t.infants} hint={t.infantsHint} value={guests.infants} min={0} onChange={(infants) => onChange({ ...guests, infants })} />
        </div>
      )}
    </div>
  );
}

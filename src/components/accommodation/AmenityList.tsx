"use client";

import { useState } from "react";
import type { AmenityId } from "@/content/types";
import { AmenityIcon } from "./AmenityIcon";

const VISIBLE = 8;

export function AmenityList({ amenities, labels }: { amenities: { id: AmenityId; label: string }[]; labels: { showAll: string; showFewer: string } }) {
  const [all, setAll] = useState(false);
  const shown = all ? amenities : amenities.slice(0, VISIBLE);
  return (
    <>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-2">
        {shown.map((a) => (
          <li key={a.id} className="flex items-center gap-3 text-[15px] text-brown-900">
            <AmenityIcon id={a.id} className="size-5 shrink-0" />
            {a.label}
          </li>
        ))}
      </ul>
      {amenities.length > VISIBLE && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="mt-6 border border-brown-900 px-4 py-2 text-[13px] font-medium text-brown-900 hover:bg-brown-900 hover:text-white"
        >
          {all ? labels.showFewer : labels.showAll}
        </button>
      )}
    </>
  );
}

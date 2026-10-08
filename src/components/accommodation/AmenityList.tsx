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
      <ul className="mt-6 grid w-full grid-cols-1 gap-x-4 gap-y-3 md:mt-8 md:w-11-24 md:grid-cols-2">
        {shown.map((a) => (
          <li key={a.id} className="flex w-full items-center justify-start">
            <AmenityIcon id={a.id} className="size-6 shrink-0" />
            <span className="ml-3 text-16 font-light leading-200 md:text-18">{a.label}</span>
          </li>
        ))}
      </ul>
      {amenities.length > VISIBLE && (
        <button
          type="button"
          onClick={() => setAll((v) => !v)}
          aria-expanded={all}
          className="mt-8 border border-brown-900 px-5 py-2 text-14 font-medium leading-170 hover:bg-brown-900 hover:text-white"
        >
          {all ? labels.showFewer : labels.showAll}
        </button>
      )}
    </>
  );
}

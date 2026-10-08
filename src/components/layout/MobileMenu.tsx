"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type Item = { key: string; href: string; label: string; active: boolean };

export function MobileMenu({ items, labels }: { items: Item[]; labels: { open: string; close: string } }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="-ml-2 flex items-center p-2"
      >
        <Menu className="size-5" aria-hidden />
        <span className="sr-only">{labels.open}</span>
      </button>

      {open && (
        <div id="mobile-menu" role="dialog" aria-modal="true" className="fixed inset-0 z-50 flex flex-col bg-beige-100">
          <div className="flex h-14 items-center justify-end px-4">
            <button type="button" onClick={() => setOpen(false)} className="p-2" autoFocus>
              <X className="size-6 text-brown-900" aria-hidden />
              <span className="sr-only">{labels.close}</span>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-6 pb-10">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={item.active ? "page" : undefined}
                    className={`block border-b border-brown-100 py-4 font-serif text-3xl ${
                      item.active ? "text-ink" : "text-brown-900"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}

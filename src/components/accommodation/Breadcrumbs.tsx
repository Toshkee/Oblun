import Link from "next/link";
import { ChevronRight } from "lucide-react";

/** Breadcrumb trail, styled like the original (16px, light brown, hidden on phones). */
export function Breadcrumbs({ items, label, className = "" }: { items: { href?: string; label: string }[]; label: string; className?: string }) {
  return (
    <nav aria-label={label} className={`hidden md:block ${className}`}>
      <ol className="flex flex-wrap items-center">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center text-16 leading-150">
            {i > 0 && <ChevronRight className="mx-3 size-4 text-brown-600" aria-hidden />}
            {item.href ? (
              <Link href={item.href} className="font-normal text-brown-600 hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-brown-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

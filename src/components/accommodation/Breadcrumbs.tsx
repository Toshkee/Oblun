import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items, label }: { items: { href?: string; label: string }[]; label: string }) {
  return (
    <nav aria-label={label} className="text-xs text-brown-600">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, i) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3" aria-hidden />}
            {item.href ? (
              <Link href={item.href} className="hover:text-brown-900 hover:underline">
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

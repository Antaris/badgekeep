"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "", label: "Overview" },
  { href: "/checklist", label: "Checklist" },
  { href: "/photo", label: "Photo guide" },
  { href: "/reminders", label: "Reminders" },
  { href: "/share", label: "Carer share" },
];

export function PackNav({ id }: { id: string }) {
  const pathname = usePathname();
  const base = `/pack/${id}`;

  return (
    <nav
      aria-label="Renewal pack"
      className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0"
    >
      <ul className="flex min-w-max gap-1 border-b border-border">
        {LINKS.map((item) => {
          const href = `${base}${item.href}`;
          const current = item.href === "" ? pathname === base : pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex min-h-12 items-center border-b-2 px-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60",
                  current
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

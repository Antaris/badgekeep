import Link from "next/link";
import { LogoMark } from "./logo";
import { OFFICIAL } from "@/lib/constants";

const NAV = [
  { href: "/official", label: "Official links" },
  { href: "/about", label: "About this prototype" },
  { href: "/privacy", label: "Privacy" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-border/80 bg-card/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 rounded-lg px-1 text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
        >
          <LogoMark className="size-8 text-primary" />
          <span className="font-heading text-xl tracking-tight">BadgeKeep</span>
        </Link>
        <nav aria-label="Primary" className="flex flex-wrap items-center gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-lg px-3 text-sm font-medium text-foreground/80 hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={OFFICIAL.applyEngland}
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex min-h-11 items-center rounded-lg bg-primary px-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
          >
            Official apply
          </a>
        </nav>
      </div>
    </header>
  );
}

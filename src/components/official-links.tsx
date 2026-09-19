import { OFFICIAL } from "@/lib/constants";

const LINKS = [
  {
    href: OFFICIAL.applyEngland,
    title: "Apply or renew a Blue Badge",
    body: "The only official England application. Start here. Never use a lookalike site.",
    primary: true,
  },
  {
    href: OFFICIAL.findCouncil,
    title: "Find your local council",
    body: "The national form is decided by the council for the badge holder’s address.",
  },
  {
    href: OFFICIAL.canIGetOne,
    title: "Can I get a Blue Badge?",
    body: "Official eligibility overview, including automatic and assessed routes.",
  },
  {
    href: OFFICIAL.citizensAdvice,
    title: "Citizens Advice — applying",
    body: "Independent plain-English help. Still apply on GOV.UK, not here.",
  },
];

export function OfficialLinks({ compact = false }: { compact?: boolean }) {
  return (
    <ul className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
      {LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            className={
              link.primary
                ? "flex min-h-24 flex-col justify-center rounded-xl bg-primary px-5 py-4 text-primary-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
                : "flex min-h-24 flex-col justify-center rounded-xl border border-border bg-card px-5 py-4 hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60"
            }
          >
            <span className="font-medium">{link.title}</span>
            <span className={link.primary ? "mt-1 text-sm text-primary-foreground/85" : "mt-1 text-sm text-muted-foreground"}>
              {link.body}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

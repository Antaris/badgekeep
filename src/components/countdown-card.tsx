import { daysUntil, daysUntilPhrase, formatLongDate } from "@/lib/dates";
import { NATION_LABEL, PATHWAY_LABEL, type BadgeProfile } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

export function CountdownCard({ profile }: { profile: BadgeProfile }) {
  const days = daysUntil(profile.expiryDate);
  const urgent = days <= 14;
  const expired = days < 0;

  return (
    <section
      aria-labelledby="countdown-heading"
      className="rounded-2xl border border-border bg-card p-6 shadow-sm"
    >
      <p className="text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {profile.label}
      </p>
      <h2 id="countdown-heading" className="font-heading mt-2 text-3xl text-foreground sm:text-4xl">
        {daysUntilPhrase(days)}
      </h2>
      <p className="mt-2 text-base text-foreground/80">
        Expiry date: <strong>{formatLongDate(profile.expiryDate)}</strong>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge variant="secondary">{NATION_LABEL[profile.nation]}</Badge>
        <Badge variant="outline">{PATHWAY_LABEL[profile.pathway]}</Badge>
        {expired ? (
          <Badge variant="destructive">Cannot be used</Badge>
        ) : urgent ? (
          <Badge>Act this month</Badge>
        ) : null}
      </div>
      {expired ? (
        <p className="mt-4 text-sm text-destructive">
          An expired badge cannot lawfully be used for parking concessions. There is no UK-wide
          grace period. Apply on GOV.UK if you still need a badge.
        </p>
      ) : days <= 84 ? (
        <p className="mt-4 text-sm text-foreground/80">
          Councils usually decide within 12 weeks. If you have not applied yet, start the official
          form as soon as the checklist is ready.
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/80">
          You are more than 12 weeks out. Use this time to gather evidence and take a usable photo.
        </p>
      )}
    </section>
  );
}

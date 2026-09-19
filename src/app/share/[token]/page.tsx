import { notFound } from "next/navigation";
import { ChecklistList } from "@/components/checklist-list";
import { CountdownCard } from "@/components/countdown-card";
import { OfficialLinks } from "@/components/official-links";
import { Timeline } from "@/components/timeline";
import { ActionLink } from "@/components/ui/action";
import { checklistStats } from "@/lib/checklists";
import { loadShare } from "@/lib/share-store";
import { verifyShareToken } from "@/lib/share";
import type { BadgeProfile } from "@/lib/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Shared renewal pack",
};

async function resolveSnapshot(token: string) {
  const decoded = decodeURIComponent(token);
  return verifyShareToken(decoded) ?? (await loadShare(decoded));
}

export default async function CarerSharePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const snapshot = await resolveSnapshot(token);
  if (!snapshot) notFound();

  const profile: BadgeProfile = {
    id: "shared",
    label: snapshot.label,
    expiryDate: snapshot.expiryDate,
    nation: snapshot.nation,
    pathway: snapshot.pathway,
    createdAt: snapshot.createdAt,
    updatedAt: snapshot.createdAt,
  };
  const stats = checklistStats(snapshot.pathway, snapshot.checklist);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <p className="text-sm font-semibold tracking-wide text-primary uppercase">
        Read-only carer view
      </p>
      <h1 className="font-heading mt-2 text-3xl">Shared renewal pack</h1>
      <p className="mt-3 text-foreground/80">
        You can see the expiry date and checklist progress. You cannot edit ticks
        from this link. BadgeKeep is independent — not GOV.UK and not a council.
      </p>

      <div className="mt-8 space-y-8">
        <CountdownCard profile={profile} />
        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-2xl">Checklist snapshot</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {stats.done} of {stats.total} items were ticked when this link was created.
          </p>
        </section>
        <ChecklistList pathway={snapshot.pathway} progress={snapshot.checklist} readOnly />
        <section>
          <h2 className="font-heading mb-4 text-2xl">Timeline</h2>
          <Timeline expiryDate={snapshot.expiryDate} />
        </section>
        <OfficialLinks />
        <ActionLink href="/" variant="outline">
          About BadgeKeep
        </ActionLink>
      </div>
    </div>
  );
}

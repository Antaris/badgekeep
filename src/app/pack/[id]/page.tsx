"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { CountdownCard } from "@/components/countdown-card";
import { OfficialLinks } from "@/components/official-links";
import { Timeline } from "@/components/timeline";
import { ActionButton, ActionLink } from "@/components/ui/action";
import { Progress } from "@/components/ui/progress";
import { downloadIcs } from "@/lib/ics";
import { useProfile } from "@/lib/storage";

export default function PackOverviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, stats, deleteProfile, hydrated } = useProfile(id);
  const router = useRouter();
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!hydrated || !profile) return null;

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
      <div className="space-y-8">
        <CountdownCard profile={profile} />
        <section aria-labelledby="progress-heading" className="rounded-2xl border border-border bg-card p-6">
          <h2 id="progress-heading" className="font-heading text-2xl">
            Checklist progress
          </h2>
          <p className="mt-2 text-foreground/80">
            {stats.done} of {stats.total} items ticked for this pathway.
          </p>
          <Progress
            value={stats.total ? Math.round((stats.done / stats.total) * 100) : 0}
            className="mt-4"
          >
            <span className="sr-only">
              {stats.done} of {stats.total} complete
            </span>
          </Progress>
          <div className="mt-5">
            <ActionLink href={`/pack/${profile.id}/checklist`}>Open checklist</ActionLink>
          </div>
        </section>
        <section aria-labelledby="links-heading">
          <h2 id="links-heading" className="font-heading mb-4 text-2xl">
            Official apply
          </h2>
          <OfficialLinks compact />
        </section>
      </div>

      <div className="space-y-8">
        <section aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="font-heading mb-4 text-2xl">
            Renewal timeline
          </h2>
          <Timeline expiryDate={profile.expiryDate} />
          <ActionButton
            variant="outline"
            className="mt-4"
            onClick={() => downloadIcs(profile)}
          >
            Download calendar file
          </ActionButton>
        </section>

        <section className="rounded-2xl border border-border bg-card p-6">
          <h2 className="font-heading text-2xl">Edit or remove</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Change the label, date or pathway, or delete this pack from this browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <ActionLink href={`/pack/${profile.id}/edit`} variant="outline">
              Edit profile
            </ActionLink>
            {confirmDelete ? (
              <ActionButton
                variant="danger"
                onClick={() => {
                  deleteProfile(profile.id);
                  router.push("/");
                }}
              >
                Yes, delete this pack
              </ActionButton>
            ) : (
              <ActionButton variant="ghost" onClick={() => setConfirmDelete(true)}>
                Delete pack
              </ActionButton>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

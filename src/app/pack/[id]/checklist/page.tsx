"use client";

import { use } from "react";
import { ChecklistList } from "@/components/checklist-list";
import { ActionLink } from "@/components/ui/action";
import { NATION_LABEL, PATHWAY_LABEL } from "@/lib/types";
import { useProfile } from "@/lib/storage";

export default function ChecklistPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, progress, stats, setChecklistItem, hydrated } = useProfile(id);

  if (!hydrated || !profile) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="text-sm text-muted-foreground">
        {NATION_LABEL[profile.nation]} · {PATHWAY_LABEL[profile.pathway]} · {stats.done} of{" "}
        {stats.total} ticked. Ticks stay in this browser.
      </p>
      {profile.nation !== "ENG" ? (
        <p className="mt-4 rounded-xl border border-amber-900/15 bg-amber-50 p-4 text-sm text-amber-950">
          This checklist is written for England. Use the official apply page for{" "}
          {NATION_LABEL[profile.nation]}.
        </p>
      ) : null}
      <p className="mt-4 text-foreground/80">
        Plain-English prompts only. We do not ask you to upload evidence here. Keep
        documents on your own device for the official form.
      </p>
      <div className="mt-8">
        <ChecklistList
          pathway={profile.pathway}
          progress={progress}
          onToggle={(key, done) => setChecklistItem(profile.id, key, done)}
        />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <ActionLink href={`/pack/${profile.id}/photo`}>Photo guide</ActionLink>
        <ActionLink href={`/pack/${profile.id}`} variant="outline">
          Back to overview
        </ActionLink>
      </div>
    </div>
  );
}

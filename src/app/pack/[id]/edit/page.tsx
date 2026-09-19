"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import { Choice } from "@/components/choice";
import { ActionButton, ActionLink } from "@/components/ui/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/lib/storage";
import type { BadgeProfile, Nation, Pathway } from "@/lib/types";

export default function EditPackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, hydrated } = useProfile(id);
  if (!hydrated || !profile) return null;
  return <EditForm profile={profile} />;
}

function EditForm({ profile }: { profile: BadgeProfile }) {
  const router = useRouter();
  const { upsertProfile } = useProfile(profile.id);
  const [label, setLabel] = useState(profile.label);
  const [expiryDate, setExpiryDate] = useState(profile.expiryDate);
  const [nation, setNation] = useState<Nation>(profile.nation);
  const [pathway, setPathway] = useState<Pathway>(profile.pathway);
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!label.trim() || !expiryDate) {
      setError("Label and expiry date are required.");
      return;
    }
    upsertProfile({
      ...profile,
      label: label.trim(),
      expiryDate,
      nation,
      pathway,
      updatedAt: new Date().toISOString(),
    });
    router.push(`/pack/${profile.id}`);
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-xl space-y-8">
      <div className="space-y-2">
        <Label htmlFor="label" className="text-base">
          Pack label
        </Label>
        <Input
          id="label"
          className="h-12 text-base"
          value={label}
          onChange={(event) => setLabel(event.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="expiry" className="text-base">
          Expiry date
        </Label>
        <Input
          id="expiry"
          type="date"
          className="h-12 text-base"
          value={expiryDate}
          onChange={(event) => setExpiryDate(event.target.value)}
        />
      </div>
      <fieldset className="space-y-3">
        <legend className="text-base font-medium">Nation</legend>
        <div className="grid gap-2">
          <Choice name="nation" value="ENG" checked={nation === "ENG"} onChange={(next) => setNation(next as Nation)}>
            England
          </Choice>
          <Choice name="nation" value="SCT" checked={nation === "SCT"} onChange={(next) => setNation(next as Nation)}>
            Scotland
          </Choice>
          <Choice name="nation" value="WLS" checked={nation === "WLS"} onChange={(next) => setNation(next as Nation)}>
            Wales
          </Choice>
          <Choice name="nation" value="NIR" checked={nation === "NIR"} onChange={(next) => setNation(next as Nation)}>
            Northern Ireland
          </Choice>
        </div>
      </fieldset>
      <fieldset className="space-y-3">
        <legend className="text-base font-medium">Pathway</legend>
        <div className="grid gap-2">
          <Choice name="pathway" value="automatic" checked={pathway === "automatic"} onChange={(next) => setPathway(next as Pathway)}>
            Automatic eligibility
          </Choice>
          <Choice name="pathway" value="assessed" checked={pathway === "assessed"} onChange={(next) => setPathway(next as Pathway)}>
            Further assessment
          </Choice>
          <Choice name="pathway" value="unsure" checked={pathway === "unsure"} onChange={(next) => setPathway(next as Pathway)}>
            Not sure yet
          </Choice>
        </div>
      </fieldset>
      {error ? (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-3">
        <ActionButton type="submit">Save changes</ActionButton>
        <ActionLink href={`/pack/${profile.id}`} variant="outline">
          Cancel
        </ActionLink>
      </div>
    </form>
  );
}

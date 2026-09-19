"use client";

import { use } from "react";
import { PhotoGuide } from "@/components/photo-guide";
import { ActionLink } from "@/components/ui/action";
import { useProfile } from "@/lib/storage";

export default function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, hydrated } = useProfile(id);
  if (!hydrated || !profile) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h2 className="font-heading text-2xl">Photo guide</h2>
      <p className="mt-3 text-foreground/80">
        Councils ask for a recent digital head-and-shoulders photo. BadgeKeep never
        stores the image. Take it with the ordinary camera app and keep it on your
        device for the GOV.UK form.
      </p>
      <div className="mt-8">
        <PhotoGuide />
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <ActionLink href={`/pack/${profile.id}/checklist`}>Return to checklist</ActionLink>
        <ActionLink href="/official" variant="outline">
          Official apply links
        </ActionLink>
      </div>
    </div>
  );
}

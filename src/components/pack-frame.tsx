"use client";

import { use } from "react";
import { PackNav } from "@/components/pack-nav";
import { ActionLink } from "@/components/ui/action";
import { useProfile } from "@/lib/storage";
import type { ReactNode } from "react";

export function PackFrame({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: ReactNode;
}) {
  const { id } = use(params);
  const { hydrated, profile } = useProfile(id);

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <p className="text-muted-foreground">Loading this pack…</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <h1 className="font-heading text-3xl">Pack not found on this device</h1>
        <p className="mt-3 text-foreground/80">
          BadgeKeep stores packs in this browser. If you opened someone else’s computer,
          or cleared site data, the pack will not be here. A carer share link still works
          if you were sent one.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <ActionLink href="/">Back home</ActionLink>
          <ActionLink href="/pack/new" variant="outline">
            Create a pack
          </ActionLink>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <ActionLink href="/" variant="ghost" className="px-0 text-sm">
        ← All packs
      </ActionLink>
      <div className="mt-4 mb-6">
        <p className="text-sm text-muted-foreground">Renewal pack</p>
        <h1 className="font-heading text-3xl">{profile.label}</h1>
      </div>
      <PackNav id={profile.id} />
      <div className="py-8">{children}</div>
    </div>
  );
}

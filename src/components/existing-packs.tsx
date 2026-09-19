"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActionButton, ActionLink } from "@/components/ui/action";
import { daysUntil, daysUntilPhrase, formatShortDate } from "@/lib/dates";
import { seedDemoStore } from "@/lib/demo";
import { useAppStore } from "@/lib/storage";
import { NATION_LABEL, PATHWAY_LABEL } from "@/lib/types";

export function ExistingPacks() {
  const { store, hydrated, replaceStore } = useAppStore();
  const router = useRouter();

  function loadDemo() {
    replaceStore(seedDemoStore(store));
    router.push("/pack/demo_mum");
  }

  return (
    <div className="space-y-4">
      {!hydrated ? (
        <p className="text-sm text-muted-foreground">Looking for packs saved in this browser…</p>
      ) : store.profiles.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No packs saved in this browser yet. Create one, or load the walkthrough sample.
        </p>
      ) : (
        <ul className="grid gap-3">
          {store.profiles.map((profile) => (
            <li key={profile.id}>
              <Link
                href={`/pack/${profile.id}`}
                className="flex min-h-16 flex-col justify-center rounded-xl border border-border bg-card px-4 py-3 hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/60 sm:flex-row sm:items-center sm:justify-between"
              >
                <span>
                  <span className="font-medium text-foreground">{profile.label}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    {NATION_LABEL[profile.nation]} · {PATHWAY_LABEL[profile.pathway]} · expires{" "}
                    {formatShortDate(profile.expiryDate)}
                  </span>
                </span>
                <span className="mt-2 text-sm font-medium text-primary sm:mt-0">
                  {daysUntilPhrase(daysUntil(profile.expiryDate))}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-3">
        <ActionLink href="/pack/new">Create a badge profile</ActionLink>
        <ActionButton variant="outline" onClick={loadDemo}>
          Load demo pack
        </ActionButton>
      </div>
    </div>
  );
}

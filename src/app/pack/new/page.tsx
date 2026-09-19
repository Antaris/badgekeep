"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Choice } from "@/components/choice";
import { ActionButton, ActionLink } from "@/components/ui/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newId, useAppStore } from "@/lib/storage";
import type { Nation, Pathway } from "@/lib/types";

export default function NewPackPage() {
  const router = useRouter();
  const { upsertProfile } = useAppStore();
  const [label, setLabel] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [nation, setNation] = useState<Nation>("ENG");
  const [pathway, setPathway] = useState<Pathway>("assessed");
  const [error, setError] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!label.trim()) {
      setError("Add a short label so you can recognise this pack.");
      return;
    }
    if (!expiryDate) {
      setError("Enter the badge expiry date printed on the badge.");
      return;
    }
    const id = newId("pack");
    const now = new Date().toISOString();
    upsertProfile({
      id,
      label: label.trim(),
      expiryDate,
      nation,
      pathway,
      createdAt: now,
      updatedAt: now,
    });
    router.push(`/pack/${id}`);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <ActionLink href="/" variant="ghost" className="px-0 text-sm">
        ← Home
      </ActionLink>
      <h1 className="font-heading mt-4 text-3xl">Create a badge profile</h1>
      <p className="mt-3 text-foreground/80">
        Only a label, expiry date, nation and pathway. Do not enter an NI number,
        badge serial, medical details, or upload a photo.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-8" noValidate>
        <div className="space-y-2">
          <Label htmlFor="label" className="text-base">
            Pack label
          </Label>
          <Input
            id="label"
            name="label"
            className="h-12 text-base"
            autoComplete="off"
            value={label}
            onChange={(event) => setLabel(event.target.value)}
            aria-describedby="label-help"
            placeholder="Mum’s badge"
          />
          <p id="label-help" className="text-sm text-muted-foreground">
            A name you will recognise. Not the holder’s full official name unless you want that.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiry" className="text-base">
            Expiry date
          </Label>
          <Input
            id="expiry"
            name="expiry"
            type="date"
            className="h-12 text-base"
            value={expiryDate}
            onChange={(event) => setExpiryDate(event.target.value)}
            aria-describedby="expiry-help"
            required
          />
          <p id="expiry-help" className="text-sm text-muted-foreground">
            Printed on the badge. If it has already passed, you can still create a pack and apply on GOV.UK.
          </p>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-base font-medium">Nation</legend>
          <div className="grid gap-2">
            {(
              [
                ["ENG", "England (default)"],
                ["SCT", "Scotland"],
                ["WLS", "Wales"],
                ["NIR", "Northern Ireland"],
              ] as const
            ).map(([value, text]) => (
              <Choice
                key={value}
                name="nation"
                value={value}
                checked={nation === value}
                onChange={(next) => setNation(next as Nation)}
              >
                {text}
              </Choice>
            ))}
          </div>
          {nation !== "ENG" ? (
            <p className="rounded-xl border border-amber-900/15 bg-amber-50 p-3 text-sm text-amber-950">
              Checklists in this prototype are written for England. Scotland, Wales and
              Northern Ireland have different fees, forms and some eligibility rules.
              Use the official apply page for that nation — linked from Official links.
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              England-first prototype. Other UK nations are supported for the countdown
              and share link, with a warning that their rules differ.
            </p>
          )}
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-base font-medium">Application pathway</legend>
          <div className="grid gap-2">
            <Choice
              name="pathway"
              value="automatic"
              checked={pathway === "automatic"}
              onChange={(next) => setPathway(next as Pathway)}
            >
              <span className="block font-medium">Automatic eligibility</span>
              <span className="text-sm text-muted-foreground">
                Qualifying benefits or other automatic criteria. Still need identity, address and a photo.
              </span>
            </Choice>
            <Choice
              name="pathway"
              value="assessed"
              checked={pathway === "assessed"}
              onChange={(next) => setPathway(next as Pathway)}
            >
              <span className="block font-medium">Further assessment</span>
              <span className="text-sm text-muted-foreground">
                Extra medical or functional evidence. About 60% of badges held in England.
              </span>
            </Choice>
            <Choice
              name="pathway"
              value="unsure"
              checked={pathway === "unsure"}
              onChange={(next) => setPathway(next as Pathway)}
            >
              <span className="block font-medium">Not sure yet</span>
              <span className="text-sm text-muted-foreground">
                Shows both lists. Check GOV.UK “Can I get a Blue Badge?” before you apply.
              </span>
            </Choice>
          </div>
        </fieldset>

        {error ? (
          <p role="alert" className="text-sm text-destructive">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <ActionButton type="submit">Save pack</ActionButton>
          <ActionLink href="/" variant="outline">
            Cancel
          </ActionLink>
        </div>
      </form>
    </div>
  );
}

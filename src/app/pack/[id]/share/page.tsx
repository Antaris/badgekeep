"use client";

import { use, useState } from "react";
import { ActionButton, ActionLink } from "@/components/ui/action";
import { useProfile } from "@/lib/storage";

export default function SharePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, progress, share, hydrated, setLastShare, stats } = useProfile(id);
  const [url, setUrl] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (!hydrated || !profile) return null;

  const current = profile;

  async function createShare() {
    setBusy(true);
    setError("");
    setCopied("");
    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: current.label,
          expiryDate: current.expiryDate,
          nation: current.nation,
          pathway: current.pathway,
          checklist: progress,
        }),
      });
      const result = (await response.json()) as {
        token?: string;
        shortCode?: string;
        error?: string;
      };
      if (!response.ok || !result.token) {
        setError(result.error || "Could not create a share link.");
        return;
      }
      const next = `${window.location.origin}/share/${result.token}`;
      setUrl(next);
      setCode(result.shortCode ?? "");
      setLastShare(current.id, result.token);
    } catch {
      setError("Could not create a share link.");
    } finally {
      setBusy(false);
    }
  }

  const existing = url || (share ? `${typeof window !== "undefined" ? window.location.origin : ""}/share/${share.token}` : "");

  async function copy(value: string, label: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      setCopied("Could not copy — select the text instead.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h2 className="font-heading text-2xl">Share with a carer</h2>
      <p className="mt-3 text-foreground/80">
        Creates a read-only link. The carer can see the expiry date and checklist
        progress. They cannot edit ticks, and they never see an NI number or badge
        serial — we do not store those.
      </p>
      <p className="mt-3 text-sm text-muted-foreground">
        The link is a signed snapshot of the current ticks ({stats.done} of {stats.total}).
        Generate again after you tick more items.
      </p>

      <ActionButton className="mt-6" disabled={busy} onClick={createShare}>
        {existing ? "Refresh share link" : "Create share link"}
      </ActionButton>

      {error ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      ) : null}

      {existing ? (
        <div className="mt-6 space-y-4 rounded-2xl border border-border bg-card p-5">
          <p className="text-sm font-medium">Read-only link</p>
          <p className="break-all rounded-lg bg-muted px-3 py-3 text-sm">{existing}</p>
          <div className="flex flex-wrap gap-3">
            <ActionButton variant="outline" onClick={() => copy(existing, "Link copied.")}>
              Copy link
            </ActionButton>
            <ActionLink href={existing.replace(window.location.origin, "")} variant="outline">
              Open as carer
            </ActionLink>
          </div>
          {code ? (
            <p className="text-sm text-muted-foreground">
              Short code on this computer: <strong>{code}</strong> — also at{" "}
              <a className="underline" href={`/share/${code}`}>
                /share/{code}
              </a>{" "}
              while the local file store is available.
            </p>
          ) : null}
          {copied ? <p role="status">{copied}</p> : null}
        </div>
      ) : null}
    </div>
  );
}

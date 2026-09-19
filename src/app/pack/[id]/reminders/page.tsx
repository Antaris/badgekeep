"use client";

import { use, useMemo, useState } from "react";
import { ActionButton } from "@/components/ui/action";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newId, useProfile } from "@/lib/storage";
import { buildReminder } from "@/lib/reminders";
import { ALL_MILESTONES, MILESTONE_LABEL, type MilestoneId } from "@/lib/types";

export default function RemindersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { profile, progress, prefs, logs, hydrated, setReminderPrefs, addReminderLog } =
    useProfile(id);
  const [previewMilestone, setPreviewMilestone] = useState<MilestoneId>("12w");
  const [status, setStatus] = useState("");
  const [busy, setBusy] = useState(false);

  const draft = useMemo(() => {
    if (!profile) return null;
    return buildReminder(profile, previewMilestone, progress);
  }, [profile, previewMilestone, progress]);

  if (!hydrated || !profile || !draft) return null;

  const current = profile;
  const emailDraft = draft;

  async function simulate(sendReal: boolean) {
    if (!prefs.email.trim() || !prefs.email.includes("@")) {
      setStatus("Add an email address first. Nothing is sent until you simulate or send.");
      return;
    }
    setBusy(true);
    setStatus("");
    try {
      const response = await fetch("/api/reminders/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: prefs.email.trim(),
          subject: emailDraft.subject,
          text: emailDraft.text,
          html: emailDraft.html,
          send: sendReal,
        }),
      });
      const result = (await response.json()) as {
        ok?: boolean;
        status?: "simulated" | "sent" | "failed";
        error?: string;
        resendConfigured?: boolean;
      };
      addReminderLog({
        id: newId("log"),
        profileId: current.id,
        milestone: previewMilestone,
        to: prefs.email.trim(),
        subject: emailDraft.subject,
        status: result.status ?? "failed",
        at: new Date().toISOString(),
        error: result.error,
      });
      if (result.status === "sent") setStatus("Sent with Resend. Check the inbox.");
      else if (result.status === "simulated") {
        setStatus(
          sendReal
            ? "Resend is not configured. Logged as a local simulation only."
            : "Logged locally. No email left this device.",
        );
      } else setStatus(result.error || "Could not log this reminder.");
    } catch {
      setStatus("The preview request failed. Try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <section>
        <h2 className="font-heading text-2xl">Email reminder preview</h2>
        <p className="mt-3 text-foreground/80">
          This prototype does not need Resend. You can preview the wording and
          “simulate send” to log it in this browser. If <code>RESEND_API_KEY</code> is
          set on the server, a real send is available.
        </p>

        <div className="mt-6 space-y-2">
          <Label htmlFor="email" className="text-base">
            Reminder email
          </Label>
          <Input
            id="email"
            type="email"
            className="h-12 text-base"
            autoComplete="email"
            value={prefs.email}
            onChange={(event) =>
              setReminderPrefs(profile.id, { ...prefs, email: event.target.value })
            }
          />
        </div>

        <fieldset className="mt-6 space-y-3">
          <legend className="text-base font-medium">Milestones to keep</legend>
          {ALL_MILESTONES.map((milestone) => {
            const checked = prefs.milestones.includes(milestone);
            return (
              <label
                key={milestone}
                className="flex min-h-12 items-center gap-3 rounded-xl border border-border bg-card px-3"
              >
                <input
                  type="checkbox"
                  className="size-5 accent-primary"
                  checked={checked}
                  onChange={(event) => {
                    const next = new Set(prefs.milestones);
                    if (event.target.checked) next.add(milestone);
                    else next.delete(milestone);
                    setReminderPrefs(profile.id, {
                      ...prefs,
                      milestones: ALL_MILESTONES.filter((item) => next.has(item)),
                    });
                  }}
                />
                {MILESTONE_LABEL[milestone]}
              </label>
            );
          })}
        </fieldset>

        <div className="mt-6 space-y-2">
          <Label htmlFor="which" className="text-base">
            Preview which email
          </Label>
          <select
            id="which"
            className="h-12 w-full rounded-lg border border-input bg-card px-3 text-base focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            value={previewMilestone}
            onChange={(event) => setPreviewMilestone(event.target.value as MilestoneId)}
          >
            {ALL_MILESTONES.map((milestone) => (
              <option key={milestone} value={milestone}>
                {MILESTONE_LABEL[milestone]}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <ActionButton disabled={busy} onClick={() => simulate(false)}>
            Simulate send
          </ActionButton>
          <ActionButton variant="outline" disabled={busy} onClick={() => simulate(true)}>
            Send if Resend is configured
          </ActionButton>
        </div>
        {status ? (
          <p role="status" className="mt-4 text-sm text-foreground/80">
            {status}
          </p>
        ) : null}
      </section>

      <section>
        <h2 className="font-heading text-2xl">What would be sent</h2>
        <article className="mt-4 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <header className="border-b border-border bg-muted/60 px-5 py-3 text-sm">
            <p>
              <span className="text-muted-foreground">Subject: </span>
              {draft.subject}
            </p>
            <p className="mt-1">
              <span className="text-muted-foreground">To: </span>
              {prefs.email || "not set yet"}
            </p>
          </header>
          <div className="p-5" dangerouslySetInnerHTML={{ __html: draft.html }} />
        </article>

        <h3 className="font-heading mt-8 text-xl">Local log</h3>
        {logs.length === 0 ? (
          <p className="mt-2 text-sm text-muted-foreground">No simulated or sent reminders yet.</p>
        ) : (
          <ol className="mt-3 space-y-2">
            {logs.map((entry) => (
              <li key={entry.id} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                <p className="font-medium">
                  {entry.status === "sent" ? "Sent" : entry.status === "simulated" ? "Simulated" : "Failed"}{" "}
                  · {MILESTONE_LABEL[entry.milestone]}
                </p>
                <p className="text-muted-foreground">
                  {new Date(entry.at).toLocaleString("en-GB")} · {entry.to}
                </p>
                {entry.error ? <p className="text-destructive">{entry.error}</p> : null}
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

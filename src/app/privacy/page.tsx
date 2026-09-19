import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/action";

export const metadata: Metadata = {
  title: "Privacy",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl">What we collect — and refuse to</h1>
      <p className="mt-4 text-foreground/80">
        This is a local prototype. Packs live in your browser. Share links carry a
        signed snapshot of a label, expiry date, nation, pathway and checklist ticks.
      </p>

      <h2 className="font-heading mt-8 text-2xl">Stored in this browser</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Pack label and expiry date</li>
        <li>Nation and pathway</li>
        <li>Checklist ticks</li>
        <li>Reminder email and which milestones you selected</li>
        <li>A local log of simulated or sent reminder previews</li>
      </ul>

      <h2 className="font-heading mt-8 text-2xl">Never collect</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>National Insurance numbers</li>
        <li>Badge serial numbers</li>
        <li>Medical documents, diagnoses, or PIP scores</li>
        <li>Passport or badge photos</li>
        <li>Payment card details or “badge fees”</li>
      </ul>

      <h2 className="font-heading mt-8 text-2xl">Delete</h2>
      <p className="mt-3 text-foreground/80">
        Delete a single pack from its overview, or clear this site’s data in your
        browser to remove everything.
      </p>
      <p className="mt-6">
        <ActionLink href="/">Back home</ActionLink>
      </p>
    </div>
  );
}

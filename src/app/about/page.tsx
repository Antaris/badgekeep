import type { Metadata } from "next";
import { ActionLink } from "@/components/ui/action";

export const metadata: Metadata = {
  title: "About this prototype",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl">Prototype, not a paid product</h1>
      <p className="mt-4 text-lg text-foreground/80">
        BadgeKeep is a demoable renewal pack while product validation continues.
        It is independent. It is not GOV.UK and not your council.
      </p>

      <h2 className="font-heading mt-8 text-2xl">In this prototype</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Create a badge profile and countdown</li>
        <li>England checklists that persist in the browser</li>
        <li>Photo guide and official deep-links</li>
        <li>Carer share via a signed token (and an optional local short code)</li>
        <li>Email preview and local “simulate send”</li>
        <li>A demo pack for walkthroughs</li>
      </ul>

      <h2 className="font-heading mt-8 text-2xl">Not in this prototype</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5">
        <li>Native apps, SMS, or cold outreach</li>
        <li>Stripe or any badge-fee payment</li>
        <li>AI photo scoring or a document vault</li>
        <li>Full Scotland / Wales / NI eligibility engines</li>
        <li>Guaranteed approval, or submitting a form for you</li>
      </ul>

      <h2 className="font-heading mt-8 text-2xl">Your responsibility</h2>
      <p className="mt-3 text-foreground/80">
        Reminders are best-effort. You remain responsible for applying on time.
        An expired badge cannot lawfully be used. There is no UK-wide grace period.
      </p>
      <p className="mt-8">
        <ActionLink href="/pack/new">Create a pack</ActionLink>
      </p>
    </div>
  );
}

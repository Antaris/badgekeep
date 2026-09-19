import type { Metadata } from "next";
import { OfficialLinks } from "@/components/official-links";
import { OFFICIAL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Official links",
};

export default function OfficialPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-4xl">Official links</h1>
      <p className="mt-4 text-lg text-foreground/80">
        BadgeKeep never submits an application. Use these government pages. They
        open in a new tab.
      </p>
      <div className="mt-8">
        <OfficialLinks />
      </div>

      <h2 className="font-heading mt-12 text-2xl">If you are not in England</h2>
      <ul className="mt-4 space-y-3">
        <li className="rounded-xl border border-border bg-card p-4">
          <a className="font-medium underline underline-offset-2" href={OFFICIAL.scotland} rel="noopener noreferrer" target="_blank">
            Scotland — mygov.scot apply for a Blue Badge
          </a>
          <p className="mt-1 text-sm text-muted-foreground">
            Reapply at least 12 weeks before expiry. Most councils charge £20.
          </p>
        </li>
        <li className="rounded-xl border border-border bg-card p-4">
          <a className="font-medium underline underline-offset-2" href={OFFICIAL.wales} rel="noopener noreferrer" target="_blank">
            Wales — apply or renew a Blue Badge
          </a>
          <p className="mt-1 text-sm text-muted-foreground">Usually free in Wales. Processing can still take around 12 weeks.</p>
        </li>
        <li className="rounded-xl border border-border bg-card p-4">
          <a className="font-medium underline underline-offset-2" href={OFFICIAL.ni} rel="noopener noreferrer" target="_blank">
            Northern Ireland — nidirect apply or renew
          </a>
          <p className="mt-1 text-sm text-muted-foreground">Separate process. Fee up to £10 on the GOV.UK fee summary.</p>
        </li>
      </ul>
    </div>
  );
}

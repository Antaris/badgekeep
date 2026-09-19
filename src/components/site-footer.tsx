import Link from "next/link";
import { OFFICIAL } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-card">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 text-sm leading-relaxed text-muted-foreground sm:grid-cols-3 sm:px-6">
        <div>
          <p className="font-heading text-base text-foreground">BadgeKeep</p>
          <p className="mt-2">
            An independent Blue Badge renewal pack for holders and carers. A
            validation prototype — not a government service.
          </p>
        </div>
        <div>
          <p className="font-medium text-foreground">Official services</p>
          <ul className="mt-2 space-y-2">
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href={OFFICIAL.applyEngland} rel="noopener noreferrer" target="_blank">
                Apply or renew on GOV.UK
              </a>
            </li>
            <li>
              <a className="underline underline-offset-2 hover:text-foreground" href={OFFICIAL.findCouncil} rel="noopener noreferrer" target="_blank">
                Find your local council
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-medium text-foreground">This site</p>
          <ul className="mt-2 space-y-2">
            <li>
              <Link className="underline underline-offset-2 hover:text-foreground" href="/privacy">
                What we do not collect
              </Link>
            </li>
            <li>
              <Link className="underline underline-offset-2 hover:text-foreground" href="/about">
                Prototype vs production
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

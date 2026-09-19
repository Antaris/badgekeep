import { OFFICIAL } from "@/lib/constants";

export function TrustBanner() {
  return (
    <div className="border-b border-amber-900/15 bg-amber-50 text-amber-950">
      <p className="mx-auto max-w-6xl px-4 py-3 text-sm leading-relaxed sm:px-6">
        <strong className="font-semibold">Independent — not GOV.UK and not your council.</strong>{" "}
        BadgeKeep does not approve, renew, or submit applications. Never pay fake badge fees.
        Official apply only via{" "}
        <a
          className="font-medium underline underline-offset-2 hover:text-amber-800"
          href={OFFICIAL.applyEngland}
          rel="noopener noreferrer"
          target="_blank"
        >
          gov.uk/apply-blue-badge
        </a>
        .
      </p>
    </div>
  );
}

import { ExistingPacks } from "@/components/existing-packs";
import { OfficialLinks } from "@/components/official-links";
import { OFFICIAL } from "@/lib/constants";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-border/70 bg-[radial-gradient(1200px_400px_at_10%_-10%,rgba(61,86,120,0.12),transparent)]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <p className="text-sm font-semibold tracking-wide text-primary uppercase">
            For Blue Badge holders and carers
          </p>
          <h1 className="font-heading mt-3 max-w-3xl text-4xl leading-tight text-foreground sm:text-5xl">
            A renewal pack — not another reminder app.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-foreground/80">
            Blue Badges last up to three years and do not renew themselves. Councils
            often take up to 12 weeks to decide. BadgeKeep helps you get a checklist,
            a usable photo, a timeline, and a link a carer can open — then you apply
            on GOV.UK.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <h2 className="font-heading text-2xl">Your packs in this browser</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Saved on this device only. No account. Nothing here is sent to a council.
        </p>
        <div className="mt-6">
          <ExistingPacks />
        </div>
      </section>

      <section className="border-y border-border bg-card/60">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {[
            {
              title: "England checklists",
              body: "Separate lists for automatic eligibility and further assessment. Tick boxes stay saved.",
            },
            {
              title: "Photo guide",
              body: "Head and shoulders, no filters, recent, plain background. Councils do reject filtered photos.",
            },
            {
              title: "12 / 8 / 4 / 2 week timeline",
              body: "A countdown that matches how long a decision can take — plus an optional 3-day nudge.",
            },
            {
              title: "Carer share",
              body: "A read-only link so someone helping can see expiry and checklist progress.",
            },
          ].map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-card p-5">
              <h3 className="font-heading text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl">What BadgeKeep does not do</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-foreground/80">
            <li>Does not approve, renew, or submit applications.</li>
            <li>Does not collect National Insurance numbers, badge serials, medical documents, or passport photos.</li>
            <li>Does not replace GOV.UK, your council, or Citizens Advice.</li>
            <li>Does not promise a grace period if a badge expires.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-900/15 bg-amber-50 p-6 text-amber-950">
          <h2 className="font-heading text-2xl">Scam warning</h2>
          <p className="mt-3 leading-relaxed">
            Fake sites charge more than the official fee and harvest details. In
            England the official fee is up to £10, usually only if the badge is
            approved. Never pay a “badge fee” to anyone else.
          </p>
          <p className="mt-3 leading-relaxed">
            Official apply only via{" "}
            <a className="font-medium underline underline-offset-2" href={OFFICIAL.applyEngland} rel="noopener noreferrer" target="_blank">
              gov.uk/apply-blue-badge
            </a>
            .
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <h2 className="font-heading text-2xl">Official links</h2>
        <p className="mt-2 mb-6 text-muted-foreground">
          These leave BadgeKeep and open government or advice sites.
        </p>
        <OfficialLinks />
      </section>
    </div>
  );
}

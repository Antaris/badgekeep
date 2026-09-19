# BadgeKeep

An independent **Blue Badge renewal pack** for holders and carers in the UK. This is a demoable prototype for product validation — not a government service and not a paid SaaS.

BadgeKeep helps someone prepare: a checklist, a photo guide, a 12-week timeline, and a read-only link for a carer. It does **not** approve, renew, or submit applications.

Official apply only via [gov.uk/apply-blue-badge](https://www.gov.uk/apply-blue-badge). Never pay fake badge fees.

## How to run locally

```bash
npm install
npm run dev
```

Open [http://127.0.0.1:43123](http://127.0.0.1:43123). Dev uses webpack (not Turbopack) so client hydration works when you open the app via `127.0.0.1`.

```bash
npm run build
npm start
```

No account, database, or paid service is required.

## Environment variables

Copy `.env.example` if you want them. All are optional.

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | If set, reminder “send” really emails via Resend |
| `RESEND_FROM` | From address (must be a verified Resend sender) |
| `SHARE_SECRET` | HMAC key for carer share tokens (a prototype default is used if unset) |

## What works in this prototype

- Home / trust copy, scam warning, and “not GOV.UK” banner on every page
- Create a badge profile (label, expiry, nation, pathway)
- Countdown and 12 / 8 / 4 / 2 week + 3-day timeline
- England checklists for automatic vs further-assessment (ticks persist in `localStorage`)
- Photo guide (no filters; councils reject filtered photos)
- Official GOV.UK apply + find-your-council links
- Carer share: signed snapshot token (works on Vercel) and optional local short code (`data/shares.json` during `npm run dev`)
- Email reminder preview + simulate send (local log). Real send only if Resend is configured
- Demo pack button (“Mum’s badge”)
- Calendar download (`.ics`)
- Keyboard-first layout, visible focus, large tap targets, `en-GB`

## What is deliberately missing

Native apps, SMS, Stripe, AI photo scoring, document vault / OCR, full multi-nation eligibility engines, cold outreach, accounts.

**Never collected:** National Insurance numbers, badge serials, medical files, passport photos.

## Persistence

| Data | Where |
| --- | --- |
| Profiles, ticks, reminder prefs, local send log | Browser `localStorage` (`badgekeep.v1`) |
| Carer share | Signed URL token (HMAC). Optional JSON file cache for short codes in local dev |

Deployable to Vercel as a standard Next.js app. Serverless filesystems will not keep short codes; use the signed link.

## Key routes

| Route | Purpose |
| --- | --- |
| `/` | Home, trust, demo seed, saved packs |
| `/pack/new` | Create a profile |
| `/pack/[id]` | Countdown, timeline, progress |
| `/pack/[id]/checklist` | Pathway checklist |
| `/pack/[id]/photo` | Photo guide |
| `/pack/[id]/reminders` | Email preview |
| `/pack/[id]/share` | Generate carer link |
| `/share/[token]` | Read-only carer view |
| `/official` | GOV.UK and nation links |
| `/privacy` | Data we refuse to collect |
| `/about` | Prototype vs production |

See [DEMO.md](./DEMO.md) for a walkthrough.

## Stack

Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui. Zero paid services for the default path.

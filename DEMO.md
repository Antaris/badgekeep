# BadgeKeep walkthrough (Matthew)

Use this after `npm run dev`. The app is a **renewal pack**, not a reminder toy, and it is **not GOV.UK**.

## 1. Home and trust (30 seconds)

1. Open `/`.
2. Read the amber banner: independent, no approvals, official apply only on GOV.UK, scam warning.
3. Confirm the hero says “renewal pack — not another reminder app”.
4. Click **Load demo pack**. You should land on **Mum’s badge** (~10 weeks out, further assessment, some ticks already done).

## 2. Overview, countdown, timeline

1. Check days-until-expiry and the pathway badge.
2. Scan the timeline: 12 / 8 / 4 / 2 weeks and 3 days. One row should read **Current window**.
3. Optional: **Download calendar file** and open the `.ics` in a calendar app.

## 3. Checklist

1. Open **Checklist**.
2. You should see common England items plus **further assessment extras**.
3. Tick **A recent digital photo**. Refresh — the tick must remain.
4. Note the copy: NI number “ready, not typed here”; no badge serial field; no file uploads.

## 4. Photo guide

1. Open **Photo guide**.
2. Compare the “likely accepted” vs “often rejected” frames.
3. Confirm the Oldham / filtered-photo warning is visible.

## 5. Official links

1. From the pack or `/official`, open **Apply or renew a Blue Badge**.
2. Confirm it is `https://www.gov.uk/apply-blue-badge`.
3. Open **Find your local council**.

## 6. Carer share

1. Open **Carer share** → **Create share link**.
2. **Copy link**, then **Open as carer** (or paste in a private window).
3. Carer view is read-only: expiry, snapshot ticks, timeline, official apply. Checkboxes are disabled.
4. Tick another item back in the holder view, refresh the old share link — it should still show the old snapshot. **Refresh share link** to update.

## 7. Email preview

1. Open **Reminders**.
2. Email is prefilled as `carer@example.com` on the demo pack.
3. Choose **8 weeks before expiry**.
4. Read the preview: not-GOV.UK header, expiry, checklist counts, official apply, scam line.
5. Click **Simulate send**. A row appears in **Local log**. No email is sent unless `RESEND_API_KEY` is set.

## 8. Create from scratch (optional)

1. Home → **Create a badge profile**.
2. Label e.g. `Dad’s badge`, pick an expiry ~16 weeks out, leave England, choose **Automatic eligibility**.
3. Confirm the automatic extras (Searchlight note) appear and assessed items do not.

## Talking points if someone asks “is this official?”

- Independent product concept. Not the council. Not DfT.
- We never take the £10 badge fee.
- Official reminders from the national service / some councils already exist and are patchy — this pack is the evidence and photo work, plus a carer link.
- Production would still need validation on willingness to pay; this build is the clickable argument.

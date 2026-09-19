import type { Pathway } from "./types";

export interface ChecklistItem {
  key: string;
  title: string;
  body: string;
  group: "common" | "automatic" | "assessed";
}

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    key: "identity",
    group: "common",
    title: "Proof of identity",
    body: "Have a passport, photocard driving licence, or birth certificate ready for the official form. BadgeKeep never stores these documents.",
  },
  {
    key: "address",
    group: "common",
    title: "Proof of address",
    body: "A recent council tax bill, utility bill, or bank statement is typically accepted. Use the address the council will check.",
  },
  {
    key: "photo",
    group: "common",
    title: "A recent digital photo",
    body: "Head and shoulders, plain background, no filters or beauty apps. Open the photo guide before you take it — some councils reject filtered photos.",
  },
  {
    key: "current-badge",
    group: "common",
    title: "Current badge to hand (if this is a renewal)",
    body: "You will need it for the official form. We never ask you to type the badge serial number into BadgeKeep.",
  },
  {
    key: "ni-ready",
    group: "common",
    title: "National Insurance number ready — not typed here",
    body: "The GOV.UK form may ask for it. Do not enter an NI number, or any other official identity number, into this prototype.",
  },
  {
    key: "council",
    group: "common",
    title: "Know which council covers the address",
    body: "You start on GOV.UK, but the local council decides. Use the official “find your council” link if you are unsure.",
  },
  {
    key: "timing",
    group: "common",
    title: "Start at least 12 weeks before expiry",
    body: "Councils usually decide within 12 weeks. There is no UK-wide grace period. An expired badge cannot lawfully be used for parking concessions.",
  },
  {
    key: "fee",
    group: "common",
    title: "Be ready for the official England fee only",
    body: "In England the fee is up to £10, typically charged only if the badge is approved. Never pay a third-party “badge fee”. Official apply only via GOV.UK.",
  },
  {
    key: "auto-route",
    group: "automatic",
    title: "Confirm you are on the automatic route",
    body: "This path is for people who qualify without a further assessment — for example some PIP moving-around scores, being registered severely sight impaired, or certain armed forces payments. Check the current GOV.UK rules; they change.",
  },
  {
    key: "searchlight",
    group: "automatic",
    title: "You may not need to upload a benefits letter",
    body: "From 20 May 2025, many England online applications with qualifying PIP or HRMCDLA awards are checked with DWP Searchlight instead of an upload. You still need identity, address and a photo.",
  },
  {
    key: "functional",
    group: "assessed",
    title: "Evidence of how walking or journeys are affected",
    body: "Write down everyday examples, not just a diagnosis name. Renewal is treated as a new application. The council reassesses eligibility.",
  },
  {
    key: "medical-letters",
    group: "assessed",
    title: "Medical or care documents to hand",
    body: "Consultant letters, care plans or EHC plans can help on the official form. Keep them on your own device. BadgeKeep does not store medical files.",
  },
  {
    key: "non-visible",
    group: "assessed",
    title: "If the disability is not always visible",
    body: "Describe planning a journey, severe distress, or risk — not only walking distance. Further assessment is common on this route.",
  },
  {
    key: "assessment-ready",
    group: "assessed",
    title: "Be ready for a possible council assessment",
    body: "Some councils invite a mobility or desk assessment. That decision is theirs, not BadgeKeep’s.",
  },
];

export function itemsForPathway(pathway: Pathway): ChecklistItem[] {
  const common = CHECKLIST_ITEMS.filter((item) => item.group === "common");
  if (pathway === "automatic") {
    return [...common, ...CHECKLIST_ITEMS.filter((item) => item.group === "automatic")];
  }
  if (pathway === "assessed") {
    return [...common, ...CHECKLIST_ITEMS.filter((item) => item.group === "assessed")];
  }
  return CHECKLIST_ITEMS;
}

export function checklistStats(
  pathway: Pathway,
  progress: Record<string, boolean> | undefined,
) {
  const items = itemsForPathway(pathway);
  const done = items.filter((item) => progress?.[item.key]).length;
  return { total: items.length, done, remaining: items.length - done };
}

export function groupHeading(group: ChecklistItem["group"]): string {
  if (group === "common") return "Needed on almost every England application";
  if (group === "automatic") return "Automatic eligibility extras";
  return "Further assessment extras";
}

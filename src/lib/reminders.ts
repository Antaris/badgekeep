import { checklistStats } from "./checklists";
import { OFFICIAL } from "./constants";
import { daysUntil, daysUntilPhrase, formatLongDate } from "./dates";
import type { BadgeProfile, MilestoneId, Pathway } from "./types";
import { MILESTONE_LABEL } from "./types";

export interface ReminderDraft {
  milestone: MilestoneId;
  subject: string;
  text: string;
  html: string;
}

function pathwayLine(pathway: Pathway) {
  if (pathway === "automatic") return "This pack is on the automatic eligibility checklist.";
  if (pathway === "assessed") return "This pack is on the further-assessment checklist.";
  return "This pack is on the “not sure yet” checklist, which includes both routes.";
}

export function buildReminder(
  profile: BadgeProfile,
  milestone: MilestoneId,
  progress: Record<string, boolean>,
): ReminderDraft {
  const days = daysUntil(profile.expiryDate);
  const stats = checklistStats(profile.pathway, progress);
  const subject = `BadgeKeep: ${MILESTONE_LABEL[milestone]} — ${profile.label}`;
  const text = [
    `This is a BadgeKeep reminder you asked for. BadgeKeep is independent — not GOV.UK and not your council.`,
    ``,
    `${profile.label} expires on ${formatLongDate(profile.expiryDate)} (${daysUntilPhrase(days)}).`,
    `Milestone: ${MILESTONE_LABEL[milestone]}.`,
    pathwayLine(profile.pathway),
    `Checklist progress: ${stats.done} of ${stats.total} items ticked.`,
    ``,
    `BadgeKeep does not approve, renew, or submit applications.`,
    `Apply only on the official service: ${OFFICIAL.applyEngland}`,
    `Never pay a fake badge fee. Official fees in England are up to £10 and are usually charged only if the badge is approved.`,
    ``,
    `If you did not ask BadgeKeep for this email, ignore it.`,
  ].join("\n");

  const html = `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #1d2433; line-height: 1.55; max-width: 560px;">
      <p style="margin: 0 0 16px; padding: 12px 14px; background: #f4efe4; border: 1px solid #d9cfc0; border-radius: 8px; font-size: 14px;">
        This email is from <strong>BadgeKeep</strong>, an independent renewal pack.
        It is <strong>not GOV.UK</strong> and <strong>not your council</strong>.
        We do not approve, renew, or submit applications.
      </p>
      <p style="margin: 0 0 8px; font-size: 13px; letter-spacing: 0.04em; text-transform: uppercase; color: #4d5b75;">${MILESTONE_LABEL[milestone]}</p>
      <h1 style="margin: 0 0 12px; font-size: 22px;">${escapeHtml(profile.label)}</h1>
      <p style="margin: 0 0 16px;">Expires <strong>${formatLongDate(profile.expiryDate)}</strong> — ${daysUntilPhrase(days)}.</p>
      <p style="margin: 0 0 16px;">${pathwayLine(profile.pathway)} Checklist: <strong>${stats.done} of ${stats.total}</strong> items ticked.</p>
      <p style="margin: 0 0 20px;">
        <a href="${OFFICIAL.applyEngland}" style="display: inline-block; background: #3d5678; color: #fff; text-decoration: none; padding: 12px 18px; border-radius: 8px; font-family: Arial, sans-serif; font-size: 15px;">
          Official apply on GOV.UK
        </a>
      </p>
      <p style="margin: 0 0 8px; font-size: 14px; color: #5a4630;">
        Scam warning: never pay fake badge fees. Official apply only via
        <a href="${OFFICIAL.applyEngland}">gov.uk/apply-blue-badge</a>.
      </p>
      <p style="margin: 16px 0 0; font-size: 13px; color: #5c6678;">
        You asked BadgeKeep to preview or send this reminder. If that is not right, ignore this message.
      </p>
    </div>
  `.trim();

  return { milestone, subject, text, html };
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

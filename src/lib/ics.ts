import { ALL_MILESTONES } from "./types";
import type { BadgeProfile } from "./types";
import { milestoneDate, parseISODate } from "./dates";
import { MILESTONE_LABEL } from "./types";
import { OFFICIAL } from "./constants";

function compact(isoDate: string) {
  return isoDate.replaceAll("-", "");
}

function stamp(now = new Date()) {
  return now.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
}

export function packCalendar(profile: BadgeProfile): string {
  const events = ALL_MILESTONES.map((milestone) => {
    const date = milestoneDate(profile.expiryDate, milestone);
    const start = compact(date);
    const endDate = parseISODate(date);
    endDate.setDate(endDate.getDate() + 1);
    const y = endDate.getFullYear();
    const m = String(endDate.getMonth() + 1).padStart(2, "0");
    const d = String(endDate.getDate()).padStart(2, "0");
    const uid = `${profile.id}-${milestone}@badgekeep.local`;
    return [
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${stamp()}`,
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${y}${m}${d}`,
      `SUMMARY:BadgeKeep: ${MILESTONE_LABEL[milestone]} — ${profile.label}`,
      `DESCRIPTION:Independent reminder — not GOV.UK. Apply only at ${OFFICIAL.applyEngland}`,
      "END:VEVENT",
    ].join("\r\n");
  });

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//BadgeKeep//Renewal pack//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...events,
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(profile: BadgeProfile) {
  const blob = new Blob([packCalendar(profile)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `badgekeep-${profile.id}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}

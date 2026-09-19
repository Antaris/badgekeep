import { daysUntil, milestoneDate } from "./dates";
import type { MilestoneId } from "./types";
import { MILESTONE_LABEL } from "./types";

export interface TimelinePoint {
  id: MilestoneId;
  label: string;
  date: string;
  daysFromExpiry: number;
  status: "upcoming" | "current" | "passed";
  hint: string;
}

const HINTS: Record<MilestoneId, string> = {
  "12w": "Start the pack. Councils often take up to 12 weeks to decide.",
  "8w": "Photo, identity and address should be ready. Begin the official form.",
  "4w": "The application should already be with the council. Chase if it is not.",
  "2w": "If you have not applied, do it today. Ask the council about a paper form if the site fails.",
  "3d": "Last days. An expired badge cannot be used. Apply only on GOV.UK.",
};

const ORDER: MilestoneId[] = ["12w", "8w", "4w", "2w", "3d"];

export function buildTimeline(expiryDate: string): TimelinePoint[] {
  const daysLeft = daysUntil(expiryDate);
  return ORDER.map((id, index) => {
    const daysFromExpiry = id === "3d" ? 3 : id === "2w" ? 14 : id === "4w" ? 28 : id === "8w" ? 56 : 84;
    const next = ORDER[index + 1];
    const nextDays = next ? (next === "3d" ? 3 : next === "2w" ? 14 : next === "4w" ? 28 : 56) : 0;
    let status: TimelinePoint["status"] = "upcoming";
    if (daysLeft < nextDays) status = "passed";
    else if (daysLeft <= daysFromExpiry) status = "current";
    return {
      id,
      label: MILESTONE_LABEL[id],
      date: milestoneDate(expiryDate, id),
      daysFromExpiry,
      status,
      hint: HINTS[id],
    };
  });
}

export function currentMilestone(expiryDate: string): TimelinePoint | undefined {
  const points = buildTimeline(expiryDate);
  return points.find((point) => point.status === "current") ?? points[0];
}

import type { MilestoneId } from "./types";

const MS_DAY = 24 * 60 * 60 * 1000;

export function parseISODate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m ?? 1) - 1, d ?? 1);
}

export function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function daysUntil(isoDate: string, from = startOfToday()): number {
  const target = parseISODate(isoDate);
  return Math.round((target.getTime() - from.getTime()) / MS_DAY);
}

export function addDays(isoDate: string, days: number): string {
  const date = parseISODate(isoDate);
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function formatLongDate(isoDate: string): string {
  return parseISODate(isoDate).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatShortDate(isoDate: string): string {
  return parseISODate(isoDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export const MILESTONE_DAYS: Record<MilestoneId, number> = {
  "12w": 84,
  "8w": 56,
  "4w": 28,
  "2w": 14,
  "3d": 3,
};

export function milestoneDate(expiryDate: string, milestone: MilestoneId): string {
  return addDays(expiryDate, -MILESTONE_DAYS[milestone]);
}

export function daysUntilPhrase(days: number): string {
  if (days > 1) return `${days} days until expiry`;
  if (days === 1) return "Expires tomorrow";
  if (days === 0) return "Expires today";
  if (days === -1) return "Expired yesterday";
  return `Expired ${Math.abs(days)} days ago`;
}

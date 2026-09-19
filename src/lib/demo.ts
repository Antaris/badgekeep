import { addDays, toISODate, startOfToday } from "./dates";
import type { AppStore, BadgeProfile } from "./types";

export const DEMO_ID = "demo_mum";

export function buildDemoProfile(now = startOfToday()): BadgeProfile {
  return {
    id: DEMO_ID,
    label: "Mum's badge",
    expiryDate: addDays(toISODate(now), 70),
    nation: "ENG",
    pathway: "assessed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function seedDemoStore(current: AppStore): AppStore {
  const profile = buildDemoProfile();
  const others = current.profiles.filter((item) => item.id !== DEMO_ID);
  return {
    ...current,
    profiles: [profile, ...others],
    checklist: {
      ...current.checklist,
      [DEMO_ID]: {
        identity: true,
        address: true,
        photo: false,
        "current-badge": true,
        "ni-ready": false,
        council: true,
        timing: true,
        fee: true,
        functional: false,
        "medical-letters": false,
        "non-visible": true,
        "assessment-ready": false,
      },
    },
    reminderPrefs: {
      ...current.reminderPrefs,
      [DEMO_ID]: {
        email: "carer@example.com",
        milestones: ["12w", "8w", "4w", "2w", "3d"],
      },
    },
  };
}

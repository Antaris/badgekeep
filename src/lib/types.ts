export type Nation = "ENG" | "SCT" | "WLS" | "NIR";
export type Pathway = "automatic" | "assessed" | "unsure";
export type MilestoneId = "12w" | "8w" | "4w" | "2w" | "3d";

export interface BadgeProfile {
  id: string;
  label: string;
  expiryDate: string;
  nation: Nation;
  pathway: Pathway;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderPrefs {
  email: string;
  milestones: MilestoneId[];
}

export interface ReminderLogEntry {
  id: string;
  profileId: string;
  milestone: MilestoneId;
  to: string;
  subject: string;
  status: "simulated" | "sent" | "failed";
  at: string;
  error?: string;
}

export interface ShareSnapshot {
  v: 1;
  label: string;
  expiryDate: string;
  nation: Nation;
  pathway: Pathway;
  checklist: Record<string, boolean>;
  createdAt: string;
}

export interface AppStore {
  profiles: BadgeProfile[];
  checklist: Record<string, Record<string, boolean>>;
  reminderPrefs: Record<string, ReminderPrefs>;
  reminderLog: ReminderLogEntry[];
  lastShare: Record<string, { token: string; createdAt: string }>;
}

export const EMPTY_STORE: AppStore = {
  profiles: [],
  checklist: {},
  reminderPrefs: {},
  reminderLog: [],
  lastShare: {},
};

export const NATION_LABEL: Record<Nation, string> = {
  ENG: "England",
  SCT: "Scotland",
  WLS: "Wales",
  NIR: "Northern Ireland",
};

export const PATHWAY_LABEL: Record<Pathway, string> = {
  automatic: "Automatic eligibility",
  assessed: "Further assessment",
  unsure: "Not sure yet",
};

export const MILESTONE_LABEL: Record<MilestoneId, string> = {
  "12w": "12 weeks before expiry",
  "8w": "8 weeks before expiry",
  "4w": "4 weeks before expiry",
  "2w": "2 weeks before expiry",
  "3d": "3 days before expiry",
};

export const ALL_MILESTONES: MilestoneId[] = ["12w", "8w", "4w", "2w", "3d"];

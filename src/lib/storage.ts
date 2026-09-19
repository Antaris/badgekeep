"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { STORAGE_KEY } from "./constants";
import { checklistStats } from "./checklists";
import type {
  AppStore,
  BadgeProfile,
  MilestoneId,
  ReminderLogEntry,
  ReminderPrefs,
} from "./types";
import { EMPTY_STORE } from "./types";

const listeners = new Set<() => void>();
let memoryStore: AppStore = EMPTY_STORE;
let cachedJson = JSON.stringify(EMPTY_STORE);

function emit() {
  cachedJson = JSON.stringify(memoryStore);
  listeners.forEach((listener) => listener());
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("badgekeep:update"));
  }
}

function readFromWindow(): AppStore {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return structuredClone(EMPTY_STORE);
    const parsed = JSON.parse(raw) as Partial<AppStore>;
    return {
      profiles: parsed.profiles ?? [],
      checklist: parsed.checklist ?? {},
      reminderPrefs: parsed.reminderPrefs ?? {},
      reminderLog: parsed.reminderLog ?? [],
      lastShare: parsed.lastShare ?? {},
    };
  } catch {
    return structuredClone(EMPTY_STORE);
  }
}

function persist(next: AppStore) {
  memoryStore = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // Quota or private mode — keep working in memory for this session.
  }
  emit();
}

function mutate(updater: (current: AppStore) => AppStore) {
  persist(updater(structuredClone(memoryStore)));
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const EMPTY_JSON = JSON.stringify(EMPTY_STORE);

function getSnapshot() {
  return cachedJson;
}

function getServerSnapshot() {
  return EMPTY_JSON;
}

function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);
  return hydrated;
}

if (typeof window !== "undefined") {
  memoryStore = readFromWindow();
  cachedJson = JSON.stringify(memoryStore);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      memoryStore = readFromWindow();
      emit();
    }
  });
}

export function newId(prefix: string): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function useAppStore() {
  const json = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const store = useMemo(() => JSON.parse(json) as AppStore, [json]);
  const hydrated = useHydrated();

  const upsertProfile = useCallback((profile: BadgeProfile) => {
    mutate((current) => {
      const index = current.profiles.findIndex((item) => item.id === profile.id);
      if (index === -1) current.profiles.push(profile);
      else current.profiles[index] = profile;
      return current;
    });
  }, []);

  const deleteProfile = useCallback((id: string) => {
    mutate((current) => {
      current.profiles = current.profiles.filter((item) => item.id !== id);
      delete current.checklist[id];
      delete current.reminderPrefs[id];
      delete current.lastShare[id];
      current.reminderLog = current.reminderLog.filter((item) => item.profileId !== id);
      return current;
    });
  }, []);

  const setChecklistItem = useCallback((profileId: string, key: string, done: boolean) => {
    mutate((current) => {
      current.checklist[profileId] = { ...current.checklist[profileId], [key]: done };
      return current;
    });
  }, []);

  const setReminderPrefs = useCallback((profileId: string, prefs: ReminderPrefs) => {
    mutate((current) => {
      current.reminderPrefs[profileId] = prefs;
      return current;
    });
  }, []);

  const addReminderLog = useCallback((entry: ReminderLogEntry) => {
    mutate((current) => {
      current.reminderLog = [entry, ...current.reminderLog].slice(0, 40);
      return current;
    });
  }, []);

  const setLastShare = useCallback((profileId: string, token: string) => {
    mutate((current) => {
      current.lastShare[profileId] = { token, createdAt: new Date().toISOString() };
      return current;
    });
  }, []);

  const replaceStore = useCallback((next: AppStore) => {
    persist(next);
  }, []);

  const clearAll = useCallback(() => {
    persist(structuredClone(EMPTY_STORE));
  }, []);

  return {
    store,
    hydrated,
    upsertProfile,
    deleteProfile,
    setChecklistItem,
    setReminderPrefs,
    addReminderLog,
    setLastShare,
    replaceStore,
    clearAll,
  };
}

export function useProfile(id: string | undefined) {
  const api = useAppStore();
  const profile = api.store.profiles.find((item) => item.id === id);
  const progress = id ? api.store.checklist[id] ?? {} : {};
  const prefs = id
    ? api.store.reminderPrefs[id] ?? { email: "", milestones: ["12w", "8w", "4w", "2w"] as MilestoneId[] }
    : { email: "", milestones: ["12w", "8w", "4w", "2w"] as MilestoneId[] };
  const stats = profile ? checklistStats(profile.pathway, progress) : { total: 0, done: 0, remaining: 0 };
  const logs = id ? api.store.reminderLog.filter((item) => item.profileId === id) : [];
  const share = id ? api.store.lastShare[id] : undefined;
  return { ...api, profile, progress, prefs, stats, logs, share };
}

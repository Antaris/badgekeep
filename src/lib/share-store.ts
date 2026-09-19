import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ShareSnapshot } from "./types";

const FILE = path.join(process.cwd(), "data", "shares.json");

type ShareFile = Record<string, { snapshot: ShareSnapshot; createdAt: string }>;

async function readAll(): Promise<ShareFile> {
  try {
    const raw = await readFile(FILE, "utf8");
    return JSON.parse(raw) as ShareFile;
  } catch {
    return {};
  }
}

async function writeAll(data: ShareFile) {
  await mkdir(path.dirname(FILE), { recursive: true });
  await writeFile(FILE, JSON.stringify(data, null, 2), "utf8");
}

export function shortCode(): string {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 8; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return out;
}

export async function saveShare(code: string, snapshot: ShareSnapshot) {
  try {
    const all = await readAll();
    all[code] = { snapshot, createdAt: new Date().toISOString() };
    await writeAll(all);
    return true;
  } catch {
    return false;
  }
}

export async function loadShare(code: string): Promise<ShareSnapshot | null> {
  try {
    const all = await readAll();
    return all[code]?.snapshot ?? null;
  } catch {
    return null;
  }
}

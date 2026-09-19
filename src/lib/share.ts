import { createHmac, timingSafeEqual } from "node:crypto";
import type { ShareSnapshot } from "./types";

const DEFAULT_SECRET = "badgekeep-prototype-not-for-production";

function secret() {
  return process.env.SHARE_SECRET || DEFAULT_SECRET;
}

function toBase64Url(value: string | Buffer) {
  const buf = typeof value === "string" ? Buffer.from(value, "utf8") : value;
  return buf.toString("base64url");
}

function signPayload(encoded: string) {
  return createHmac("sha256", secret()).update(encoded).digest("base64url");
}

export function createShareToken(snapshot: ShareSnapshot): string {
  const encoded = toBase64Url(JSON.stringify(snapshot));
  return `${encoded}.${signPayload(encoded)}`;
}

export function verifyShareToken(token: string): ShareSnapshot | null {
  const [encoded, signature] = token.split(".");
  if (!encoded || !signature) return null;
  const expected = signPayload(encoded);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const parsed = JSON.parse(Buffer.from(encoded, "base64url").toString("utf8")) as ShareSnapshot;
    if (parsed.v !== 1 || !parsed.label || !parsed.expiryDate) return null;
    return parsed;
  } catch {
    return null;
  }
}

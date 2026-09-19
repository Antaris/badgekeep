import { NextResponse } from "next/server";
import { createShareToken } from "@/lib/share";
import { saveShare, shortCode } from "@/lib/share-store";
import type { Nation, Pathway, ShareSnapshot } from "@/lib/types";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    label?: string;
    expiryDate?: string;
    nation?: Nation;
    pathway?: Pathway;
    checklist?: Record<string, boolean>;
  };

  if (!body.label?.trim() || !body.expiryDate) {
    return NextResponse.json({ error: "Label and expiry date are required." }, { status: 400 });
  }

  const snapshot: ShareSnapshot = {
    v: 1,
    label: body.label.trim(),
    expiryDate: body.expiryDate,
    nation: body.nation ?? "ENG",
    pathway: body.pathway ?? "unsure",
    checklist: body.checklist ?? {},
    createdAt: new Date().toISOString(),
  };

  const token = createShareToken(snapshot);
  const code = shortCode();
  await saveShare(code, snapshot);

  return NextResponse.json({ token, shortCode: code });
}

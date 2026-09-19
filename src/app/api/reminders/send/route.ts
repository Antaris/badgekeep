import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as {
    to?: string;
    subject?: string;
    text?: string;
    html?: string;
    send?: boolean;
  };

  const resendConfigured = Boolean(process.env.RESEND_API_KEY);

  if (!body.to || !body.subject || !body.text) {
    return NextResponse.json({ error: "Missing email fields." }, { status: 400 });
  }

  if (!body.send || !resendConfigured) {
    return NextResponse.json({
      ok: true,
      status: "simulated",
      resendConfigured,
    });
  }

  const from = process.env.RESEND_FROM || "BadgeKeep <beth.t@example.com>";
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [body.to],
      subject: body.subject,
      text: body.text,
      html: body.html ?? body.text,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    return NextResponse.json({
      ok: false,
      status: "failed",
      resendConfigured,
      error: detail.slice(0, 280) || "Resend rejected the message.",
    });
  }

  return NextResponse.json({ ok: true, status: "sent", resendConfigured });
}

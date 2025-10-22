// app/api/contact/route.ts
import { NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email: string;
  message: string;
  subject?: string;
  phone?: string;
};

export async function POST(req: Request) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, email, message, subject, phone } = (raw ?? {}) as Partial<ContactPayload>;

  if (typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // ...tu lógica (guardar en Supabase, etc.)

  return NextResponse.json({ ok: true });
}

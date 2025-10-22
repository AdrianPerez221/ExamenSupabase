// app/api/contact/route.ts
import { NextResponse } from "next/server";

type ContactPayload = {
  email: string;
  message: string;
  // Si más adelante los usas, vuelve a añadirlos:
  // name?: string;
  // subject?: string;
  // phone?: string;
};

export async function POST(req: Request) {
  let raw: unknown;

  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { email, message } = (raw ?? {}) as Partial<ContactPayload>;

  if (typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  // Aquí tu lógica (guardar en Supabase, etc.)
  // const supabase = await createClient();
  // const { error } = await supabase.from("contacts").insert({ email, message });
  // if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}

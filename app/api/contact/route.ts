import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // usamos anon
);

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const payload = {
      first_name: String(form.get("firstName") || "").trim(),
      last_name:  String(form.get("lastName")  || "").trim(),
      email:      String(form.get("email")     || "").trim(),
      message:    String(form.get("message")   || "").trim(),
      accept_terms: form.get("acceptTerms") === "on",
    };

    if (!payload.first_name || !payload.last_name || !payload.email) {
      return NextResponse.json({ ok: false, error: "Faltan campos obligatorios." }, { status: 400 });
    }

    const { error } = await supabase.from("contact_messages").insert([payload]);
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Error inesperado" }, { status: 500 });
  }
}

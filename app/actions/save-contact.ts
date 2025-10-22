// app/actions/save-contact.ts
"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function saveContact(formData: FormData) {
  const supabase = await createClient();


  const payload = {
    first_name: String(formData.get("firstName") || "").trim(),
    last_name: String(formData.get("lastName") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    message: String(formData.get("message") || "").trim(),
    accept_terms: formData.get("acceptTerms") === "on",
  };

  if (!payload.first_name || !payload.last_name || !payload.email) {
    return { ok: false, error: "Faltan campos obligatorios." };
  }

  const { error } = await supabase.from("contact_messages").insert([payload]);

  if (error) {
    console.error(error);
    return { ok: false, error: "No se pudo guardar el mensaje." };
  }

  // Opcional: revalida la página si lees datos ahí
  revalidatePath("/");

  return { ok: true };
}

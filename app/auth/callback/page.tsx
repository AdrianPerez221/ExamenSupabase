"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      // Si es OAuth o magic link, esto crea la sesión y setea la cookie.
      if (error) {
        alert("No se pudo iniciar sesión: " + error.message);
        router.replace("/login"); // o donde prefieras
      } else {
        // Opcional: data.session tiene el usuario
        router.replace("/"); // destino tras loguear
      }
    };
    run();
  }, [router]);

  return null; // o un loader/spinner
}

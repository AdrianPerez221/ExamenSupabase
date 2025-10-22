// utils/supabase/server.ts
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies(); // <-- importante

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // En Next 15, set recibe un objeto
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // No hay remove: se hace con maxAge=0
          cookieStore.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}

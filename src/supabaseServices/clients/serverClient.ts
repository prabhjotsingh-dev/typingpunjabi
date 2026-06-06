import { createServerClient as createSSRClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/supabaseServices/database.types";

// For data operations (bypasses RLS with service role key)
export async function createServerClient() {
  const cookieStore = await cookies();

  return createSSRClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}

// For auth operations (uses publishable key so cookies work with browser client)
export async function createAuthServerClient() {
  const cookieStore = await cookies();

  return createSSRClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        },
      },
    },
  );
}

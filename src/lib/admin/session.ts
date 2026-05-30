import { createServerClient, type CookieMethodsServer } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/lib/database.types";
import type { User } from "@supabase/supabase-js";
import { getLocalBypassAdminUser, isAdminLocalBypass } from "./local-bypass";

/** Sessão admin ou null (para route handlers sem redirect). */
export async function getAdminUser(): Promise<User | null> {
  if (isAdminLocalBypass()) return getLocalBypassAdminUser();

  const cookieStore = await cookies();
  const cookieMethods: CookieMethodsServer = {
    getAll: () => cookieStore.getAll(),
    setAll: (toSet) => {
      try {
        for (const { name, value, options } of toSet) {
          cookieStore.set(name, value, options);
        }
      } catch {
        // Server Components are read-only; token refresh is handled by middleware.
      }
    },
  };

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: cookieMethods },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;
  return user;
}

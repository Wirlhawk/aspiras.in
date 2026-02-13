import { createClient } from "@supabase/supabase-js"

/**
 * Admin client using service role key — bypasses RLS.
 * Only use in trusted server actions (never expose to client).
 */
export function createAdminClient() {
    return createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { autoRefreshToken: false, persistSession: false } }
    )
}

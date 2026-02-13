import { db } from "@/lib/db"
import { createServerClient } from "@/lib/supabase/server"

export async function getSession() {
    const supabase = await createServerClient()
    const {
        data: { session },
        error,
    } = await supabase.auth.getSession()

    if (error) {
        console.error("getCurrentSession error:", error.message)
        return null
    }

    return session
}

export async function getSessionWithProfile() {
    const supabase = await createServerClient()
    const {
        data: { session },
        error: sessionError,
    } = await supabase.auth.getSession()

    if (sessionError) {
        console.error("getSession error:", sessionError.message)
        return null                                         
    }

    const user = session?.user
    if (!user) {
        return null
    }

    const profile = await db.profile.findUnique({
        where: { id: user.id },
    })

    return {
        session,
        profile,
    }
}

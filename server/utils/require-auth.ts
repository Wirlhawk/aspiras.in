
import { getSessionWithProfile } from '@/server/auth/auth.query'
import { redirect } from 'next/navigation'

export const requireAuth = async () => {
    const data = await getSessionWithProfile()

    if (!data?.session || !data?.profile) {
        return redirect("/")
    }

    return data
}

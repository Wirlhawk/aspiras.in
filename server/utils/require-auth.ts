
import { getSessionWithProfile } from '@/server/user/user.query'
import { redirect } from 'next/navigation'

export const requireAuth = async () => {
    const data = await getSessionWithProfile()

    if (!data?.session || !data?.profile) {
        return redirect("/")
    }

    return data
}

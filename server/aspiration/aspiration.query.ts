import { db } from "@/lib/db"
import { requireAuth } from '@/server/utils/require-auth'

export const getCurrentUserAspirations = async () => {
    const { profile } = await requireAuth()

    return await db.aspiration.findMany({
        where: { profileId: profile!.id },
        include: { category: true },
        orderBy: { createdAt: 'desc' },
    })
}

export const getAspirationById = async (id: string) => {
    return await db.aspiration.findUnique({
        where: { id },
        include: {
            category: true,
            profile: {
                include: { class: true },
            },
            comments: {
                include: {
                    profile: true,
                },
                orderBy: { createdAt: 'desc' },
            },
            responses: {
                include: {
                    profile: true,
                },
                orderBy: { createdAt: 'desc' },
            },
        },
    })
}

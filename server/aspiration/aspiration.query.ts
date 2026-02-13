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
                orderBy: { createdAt: 'asc' }, // Chat style: oldest first? Or newest? Usually chat is oldest at top, newest at bottom. Let's stick to standard behavior or user preference. If it's a chat, usually we want to see conversation flow. 
                // However, detailed view might show newest first if it's like a forum. 
                // The implementation plan said "Chat-like Comment Interface". 
                // Chat usually means chronological order (asc).
            },
        },
    })
}

export const getAspirations = async () => {
    // Admin query to get all aspirations
    // Potentially add pagination later, for now fetch all
    return await db.aspiration.findMany({
        include: {
            category: true,
            profile: {
                include: { class: true }
            },
            _count: {
                select: { comments: true }
            }
        },
        orderBy: { createdAt: 'desc' },
    })
}

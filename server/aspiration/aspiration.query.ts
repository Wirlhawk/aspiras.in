
import { db } from "@/lib/db"
import { aspirationCategories, aspirations } from "@/lib/db/schema"
import { requireAuth } from '@/server/utils/require-auth'
import { desc, eq } from "drizzle-orm"

export const getCurrentUserAspirations = async () => {
    const { profile } = await requireAuth()

    console.log("profile", profile)

    return await db.select().from(aspirations).where(eq(aspirations.profileId, profile.id)).orderBy(desc(aspirations.createdAt)).innerJoin(aspirationCategories, eq(aspirations.categoryId, aspirationCategories.id))
}

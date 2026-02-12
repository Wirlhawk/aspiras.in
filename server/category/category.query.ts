import { db } from "@/lib/db"

export const getAllCategories = async () => {
    return await db.aspirationCategory.findMany({
        orderBy: { name: 'asc' },
    })
}

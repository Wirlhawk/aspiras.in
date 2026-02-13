import { db } from "@/lib/db"

export const getAllClasses = async () => {
    return await db.schoolClass.findMany({
        orderBy: [{ grade: 'asc' }, { name: 'asc' }],
        include: {
            _count: { select: { profiles: true } },
        },
    })
}
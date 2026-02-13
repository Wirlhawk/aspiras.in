import { db } from "@/lib/db"

export const getAllStudents = async () => {
    return await db.profile.findMany({
        where: { role: 'STUDENT' },
        orderBy: { name: 'asc' },
        include: {
            class: true,
            _count: { select: { aspirations: true } }
        }
    })
}

export const getStudent = async (id: string) => {
    return await db.profile.findUnique({
        where: { id },
        include: {
            class: true,
            _count: { select: { aspirations: true } }
        }
    })
}

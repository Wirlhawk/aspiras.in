import { db } from "@/lib/db";
import { requireAuth } from "@/server/utils/require-auth";

export const getDashboardStats = async () => {
    await requireAuth();

    const [
        totalStudents,
        totalClasses,
        totalAspirations,
        aspirationsByStatus
    ] = await Promise.all([
        db.profile.count({ where: { role: "STUDENT" } }),
        db.schoolClass.count(),
        db.aspiration.count(),
        db.aspiration.groupBy({
            by: ['status'],
            _count: {
                status: true
            }
        })
    ]);

    // Transform groupBy result into a map or object for easier consumption
    const statusCounts = aspirationsByStatus.reduce((acc, curr) => {
        acc[curr.status] = curr._count.status;
        return acc;
    }, {} as Record<string, number>);

    return {
        totalStudents,
        totalClasses,
        totalAspirations,
        statusCounts
    };
};

import { db } from "@/lib/db";

export async function getAllClasses() {
    return await db.schoolClass.findMany();
}
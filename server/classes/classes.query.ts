import { db } from "@/lib/db";
import { schoolClasses } from "@/lib/db/schema";

export async function getAllClasses() {
    const data = await db.select().from(schoolClasses);
    return data;
}
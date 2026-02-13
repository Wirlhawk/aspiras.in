"use server"

import { actionClient } from "@/lib/safe-action"
import { CreateClassSchema, UpdateClassSchema, DeleteClassSchema } from "@/schema/class.schema"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createClass = actionClient
    .inputSchema(CreateClassSchema)
    .action(async ({ parsedInput: { name, grade } }) => {
        const existing = await db.schoolClass.findFirst({
            where: { name, grade },
        })

        if (existing) {
            throw new Error("A class with this name and grade already exists")
        }

        await db.schoolClass.create({
            data: { name, grade },
        })

        revalidatePath("/dashboard/class")
        return { success: true }
    })

export const updateClass = actionClient
    .inputSchema(UpdateClassSchema)
    .action(async ({ parsedInput: { id, name, grade } }) => {
        const existing = await db.schoolClass.findFirst({
            where: { name, grade, NOT: { id } },
        })

        if (existing) {
            throw new Error("A class with this name and grade already exists")
        }

        await db.schoolClass.update({
            where: { id },
            data: { name, grade },
        })

        revalidatePath("/dashboard/class")
        return { success: true }
    })

export const deleteClass = actionClient
    .inputSchema(DeleteClassSchema)
    .action(async ({ parsedInput: { id } }) => {
        const profileCount = await db.profile.count({
            where: { classId: id },
        })

        if (profileCount > 0) {
            throw new Error(`Cannot delete: ${profileCount} user(s) are in this class`)
        }

        await db.schoolClass.delete({
            where: { id },
        })

        revalidatePath("/dashboard/class")
        return { success: true }
    })

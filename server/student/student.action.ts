"use server"

import { actionClient } from "@/lib/safe-action"
import { CreateStudentSchema, UpdateStudentSchema, DeleteStudentSchema } from "@/schema/student.schema"
import { db } from "@/lib/db"
import { createAdminClient } from "@/lib/supabase/admin"
import { revalidatePath } from "next/cache"

export const createStudent = actionClient
    .inputSchema(CreateStudentSchema)
    .action(async ({ parsedInput: { name, email, password, classId } }) => {
        const supabase = createAdminClient()

        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
        })

        if (authError || !authData.user) {
            throw new Error(authError?.message || "Failed to create auth user")
        }

        try {
            await db.profile.create({
                data: {
                    id: authData.user.id,
                    name,
                    classId,
                    role: "STUDENT",
                },
            })
        } catch (error) {
            // Cleanup auth user if profile creation fails
            await supabase.auth.admin.deleteUser(authData.user.id)
            throw new Error("Failed to create student profile")
        }

        revalidatePath("/dashboard/users")
        return { success: true }
    })

export const updateStudent = actionClient
    .inputSchema(UpdateStudentSchema)
    .action(async ({ parsedInput: { id, name, classId } }) => {
        await db.profile.update({
            where: { id },
            data: { name, classId },
        })

        revalidatePath("/dashboard/users")
        return { success: true }
    })

export const deleteStudent = actionClient
    .inputSchema(DeleteStudentSchema)
    .action(async ({ parsedInput: { id } }) => {
        const aspirationCount = await db.aspiration.count({
            where: { profileId: id },
        })

        if (aspirationCount > 0) {
            throw new Error(`Cannot delete: this student has ${aspirationCount} aspiration(s)`)
        }

        // Delete profile first, then auth user (if possible, actually auth user delete cascade might be handled differently depending on DB setup, but here we do manual)
        // Actually best practice: delet auth user, let cascade delete profile. But since profile is in prisma/postgres and auth is supabase, they are separate.
        // We delete DB profile manually.
        await db.profile.delete({ where: { id } })

        const supabase = createAdminClient()
        await supabase.auth.admin.deleteUser(id)

        revalidatePath("/dashboard/users")
        return { success: true }
    })

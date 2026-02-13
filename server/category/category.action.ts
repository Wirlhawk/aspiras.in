    "use server"

import { actionClient } from "@/lib/safe-action"
import { CreateCategorySchema, UpdateCategorySchema, DeleteCategorySchema } from "@/schema/category.schema"
import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

export const createCategory = actionClient
    .inputSchema(CreateCategorySchema)
    .action(async ({ parsedInput: { name, slug } }) => {
        const existing = await db.aspirationCategory.findFirst({
            where: { slug },
        })

        if (existing) {
            throw new Error("A category with this slug already exists")
        }

        await db.aspirationCategory.create({
            data: { name, slug },
        })

        revalidatePath("/dashboard/categories")
        return { success: true }
    })

export const updateCategory = actionClient
    .inputSchema(UpdateCategorySchema)
    .action(async ({ parsedInput: { id, name, slug } }) => {
        const existing = await db.aspirationCategory.findFirst({
            where: { slug, NOT: { id } },
        })

        if (existing) {
            throw new Error("A category with this slug already exists")
        }

        await db.aspirationCategory.update({
            where: { id },
            data: { name, slug },
        })

        revalidatePath("/dashboard/categories")
        return { success: true }
    })

export const deleteCategory = actionClient
    .inputSchema(DeleteCategorySchema)
    .action(async ({ parsedInput: { id } }) => {
        const aspirationCount = await db.aspiration.count({
            where: { categoryId: id },
        })

        if (aspirationCount > 0) {
            throw new Error(`Cannot delete: ${aspirationCount} aspiration(s) are using this category`)
        }

        await db.aspirationCategory.delete({
            where: { id },
        })

        revalidatePath("/dashboard/categories")
        return { success: true }
    })

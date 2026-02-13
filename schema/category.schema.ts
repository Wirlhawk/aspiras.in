import { z } from "zod";

export const CreateCategorySchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    slug: z.string().min(2, { message: "Slug must be at least 2 characters" })
        .regex(/^[a-z0-9-]+$/, { message: "Slug must be lowercase letters, numbers, and hyphens only" }),
});

export type CreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = CreateCategorySchema.extend({
    id: z.string().uuid(),
});

export type UpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;

export const DeleteCategorySchema = z.object({
    id: z.string().uuid(),
});

export type DeleteCategoryInput = z.infer<typeof DeleteCategorySchema>;

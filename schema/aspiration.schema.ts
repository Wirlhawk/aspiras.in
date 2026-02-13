import z from "zod";

export const createAspirationSchema = z.object({
    content: z.string().min(10, { message: "Aspiration must be at least 10 characters" }),
    categoryId: z.string().uuid({ message: "Please select a category" }),
    isAnonymous: z.boolean(),
    image: z.instanceof(File).optional(),
});

export const createCommentSchema = z.object({
    aspirationId: z.string().uuid(),
    content: z.string().min(1, { message: "Comment cannot be empty" }),
    isAnonymous: z.boolean().default(false),
});

export const updateAspirationStatusSchema = z.object({
    id: z.string().uuid(),
    status: z.enum(["PENDING", "PROCESSING", "DONE", "REJECTED"]),
});

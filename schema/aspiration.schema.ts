import z from "zod";

export const createAspirationSchema = z.object({
    content: z.string().min(10, { message: "Aspiration must be at least 10 characters" }),
    categoryId: z.string().uuid({ message: "Please select a category" }),
    isAnonymous: z.boolean(),
    image: z.instanceof(File).optional(),
});

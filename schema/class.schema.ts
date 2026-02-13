import { z } from "zod";

export const CreateClassSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    grade: z.string().min(1, { message: "Grade is required" }),
});

export type CreateClassInput = z.infer<typeof CreateClassSchema>;

export const UpdateClassSchema = CreateClassSchema.extend({
    id: z.string().uuid(),
});

export type UpdateClassInput = z.infer<typeof UpdateClassSchema>;

export const DeleteClassSchema = z.object({
    id: z.string().uuid(),
});

export type DeleteClassInput = z.infer<typeof DeleteClassSchema>;

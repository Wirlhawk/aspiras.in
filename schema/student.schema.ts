import { z } from "zod";

export const CreateStudentSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    classId: z.string().uuid({ message: "Please select a class" }),
});

export type CreateStudentInput = z.infer<typeof CreateStudentSchema>;

export const UpdateStudentSchema = z.object({
    id: z.string().uuid(),
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    classId: z.string().uuid({ message: "Please select a class" }),
});

export type UpdateStudentInput = z.infer<typeof UpdateStudentSchema>;

export const DeleteStudentSchema = z.object({
    id: z.string().uuid(),
});

export type DeleteStudentInput = z.infer<typeof DeleteStudentSchema>;

"use server";

import { createServerClient } from "@/lib/supabase/server";
import { actionClient } from "@/lib/safe-action";
import { LoginSchema, SignUpSchema } from "@/schema/auth.schema";
import { db } from "@/lib/db";

export const signIn = actionClient
    .schema(LoginSchema)
    .action(async ({ parsedInput: { email, password } }) => {
        const supabase = await createServerClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            throw new Error(error.message);
        }

        return {
            message: "Logged in successfully!",
        };
    });

export const signUp = actionClient
    .schema(SignUpSchema)
    .action(async ({ parsedInput: { email, password, name, classId } }) => {
        const supabase = await createServerClient();

        const { data: authData, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name,
                },
            },
        });

        if (authError || !authData.user) {
            throw new Error(authError?.message || "Failed to create account");
        }

        try {
            await db.profile.create({
                data: {
                    id: authData.user.id,
                    name,
                    classId,
                    role: "STUDENT",
                },
            });
        } catch (error) {
            console.error("Profile creation failed:", error);
            // Optional: delete auth user if profile creation fails?
            // For public signup, we might rely on RLS or separate cleanup.
            throw new Error("Failed to create profile");
        }

        return {
            message: "Signed up successfully!",
        };
    });

export const signOut = actionClient
    .action(async () => {
        const supabase = await createServerClient();
        await supabase.auth.signOut();
        return { success: true };
    });

"use server";

import { actionClient } from "@/lib/safe-action";
import { createAspirationSchema } from "@/schema/aspiration.schema";
import { requireAuth } from "@/server/utils/require-auth";
import { uploadImage } from "@/server/utils/upload-image";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createAspiration = actionClient
    .inputSchema(createAspirationSchema)
    .action(async ({ parsedInput: { content, categoryId, isAnonymous, image } }) => {
        const { profile } = await requireAuth();

        let imageUrl: string | undefined;
        if (image) {
            imageUrl = await uploadImage(image);
        }

        await db.aspiration.create({
            data: {
                content,
                categoryId,
                isAnonymous,
                image: imageUrl,
                profileId: profile!.id,
            },
        });

        redirect("/home");
    });

export const deleteAspiration = actionClient
    .inputSchema(z.object({ id: z.string().uuid() }))
    .action(async ({ parsedInput: { id } }) => {
        const { profile } = await requireAuth();

        const aspiration = await db.aspiration.findUnique({
            where: { id },
        });

        if (!aspiration) {
            throw new Error("Aspiration not found");
        }

        if (aspiration.profileId !== profile!.id) {
            throw new Error("You can only delete your own aspirations");
        }

        if (aspiration.status !== "PENDING") {
            throw new Error("Only pending aspirations can be deleted");
        }

        await db.aspiration.delete({
            where: { id },
        });

        redirect("/home");
    });

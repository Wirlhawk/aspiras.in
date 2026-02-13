"use server";

import { actionClient } from "@/lib/safe-action";
import { createAspirationSchema, createCommentSchema, updateAspirationStatusSchema } from "@/schema/aspiration.schema";
import { requireAuth } from "@/server/utils/require-auth";
import { uploadImage } from "@/server/utils/upload-image";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const SPAM_KEYWORDS = [
    "slot", "gacor", "judol", "togel", "maxwin", "pragmatic", "scatter",
    "zeus", "depo", "wd", "link alternatif", "bonus", "cashback", "rtp",
    "hoki", "jackpot"
];

async function detectSpam(content: string): Promise<boolean> {
    try {
        console.log("Checking spam with Gemini...");
        const { text } = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: `Tugas Anda adalah mendeteksi apakah pesan berikut adalah SPAM atau HAM (bukan spam).
                Kategori SPAM meliputi:
                1. Promosi judi online (slot, gacor, maxwin, dll).
                2. Penipuan hadiah atau uang gratis.
                3. Tautan mencurigakan atau promosi tidak relevan.
                4. Kata-kata kasar atau tidak pantas yang berlebihan.
                
                Ketentuan:
                - Jawab HANYA dengan satu kata: "SPAM" atau "HAM".
                - Jika ragu, jawab "HAM".
            
            Pesan: "${content}"
            
            Hasil:`,
        });

        const result = text.trim().toUpperCase();
        console.log("Gemini Spam Detection Result:", result);

        if (result === "SPAM") {
            return true;
        }
    } catch (error) {
        console.error("Gemini Spam Detection Failed:", error);
    }

    // Fallback: Basic Keyword Detection (Indonesian)
    const lowerContent = content.toLowerCase();
    for (const keyword of SPAM_KEYWORDS) {
        if (lowerContent.includes(keyword)) {
            console.log("Detected as SPAM by fallback keywords:", keyword);
            return true;
        }
    }

    // Check for excessive repeated characters
    if (/(.)\1{4,}/.test(content)) {
        return true;
    }

    return false;
}

export const createAspiration = actionClient
    .inputSchema(createAspirationSchema)
    .action(async ({ parsedInput: { content, categoryId, isAnonymous, image } }) => {
        const { profile } = await requireAuth();

        let imageUrl: string | undefined;
        if (image) {
            imageUrl = await uploadImage(image);
        }

        const isSpam = await detectSpam(content);

        await db.aspiration.create({
            data: {
                content,
                categoryId,
                isAnonymous,
                image: imageUrl,
                profileId: profile!.id,
                isSpam,
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

export const createComment = actionClient
    .inputSchema(createCommentSchema)
    .action(async ({ parsedInput: { aspirationId, content, isAnonymous } }) => {
        const { profile } = await requireAuth();

        await db.aspirationComment.create({
            data: {
                content,
                aspirationId,
                profileId: profile!.id,
                isAnonymous,
            }
        });

        revalidatePath(`/dashboard/aspirations/${aspirationId}`);
        return { success: true };
    });

export const updateAspirationStatus = actionClient
    .inputSchema(updateAspirationStatusSchema)
    .action(async ({ parsedInput: { id, status } }) => {
        await requireAuth();
        // ideally check for admin role here, but currently requireAuth only checks if logged in. 
        // Assuming admin middleware or higher level check protects the dashboard. 
        // But for safety let's check role if possible. 
        // requireAuth returns { session, profile }.
        // Let's assume for now any logged in user *accessing this action* is authorized or we trust the route protection.
        // Better:
        const { profile } = await requireAuth();
        if (profile?.role !== "ADMIN") {
            throw new Error("Unauthorized");
        }

        await db.aspiration.update({
            where: { id },
            data: { status }
        });

        revalidatePath(`/dashboard/aspirations`);
        revalidatePath(`/dashboard/aspirations/${id}`);
        return { success: true };
    });

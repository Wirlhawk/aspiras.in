"use server";

import { actionClient } from "@/lib/safe-action";
import { z } from "zod";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { requireAuth } from "@/server/utils/require-auth";

const rewriteContentSchema = z.object({
    content: z.string().min(10, "Content must be at least 10 characters long to rewrite."),
});

export const rewriteAspiration = actionClient
    .inputSchema(rewriteContentSchema)
    .action(async ({ parsedInput: { content } }) => {
        await requireAuth();

        const { text } = await generateText({
            model: google("gemini-2.5-flash"),
            prompt: `Tugas Anda adalah memperbaiki aspirasi siswa berikut.
                1. Ubah menjadi bahasa Indonesia yang sangat formal, baku, dan sopan.
                2. Jika ada kata kasar atau tidak pantas, ganti dengan padanan kata yang halus dan profesional.
                3. Berikan HANYA satu hasil perbaikan terbaik saja, jangan memberikan opsi atau penjelasan tambahan
            
            Asli: "${content}"
            
            Hasil tulis ulang:`,
        });

        return { rewrittenContent: text };
    });

import { createServerClient } from "@/lib/supabase/server";

/**
 * Upload an image file to Supabase Storage and return the public URL.
 *
 * @param file - The File object to upload
 * @param bucket - The storage bucket name (default: "aspirations")
 * @returns The public URL of the uploaded image
 */
export async function uploadImage(
    file: File,
    bucket: string = "aspirations"
): Promise<string> {
    const supabase = await createServerClient();

    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error } = await supabase.storage
        .from(bucket)
        .upload(fileName, file);

    if (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
    }

    const {
        data: { publicUrl, },
    } = supabase.storage.from(bucket).getPublicUrl(fileName);

    return publicUrl;
}

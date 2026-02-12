"use client"

import { useState } from "react"
import { Button } from "@/components/retroui/Button"
import { Checkbox } from "@/components/retroui/Checkbox"
import { Input } from "@/components/retroui/Input"
import { Select } from "@/components/retroui/Select"
import { Textarea } from "@/components/retroui/Textarea"
import { useSafeAction } from "@/hooks/use-safe-action"
import { createAspirationSchema } from "@/schema/aspiration.schema"
import { createAspiration } from "@/server/aspiration/aspiration.action"
import { rewriteAspiration } from "@/server/aspiration/ai.action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { ArrowUpRight, FormIcon, Sparkles } from "lucide-react"

import type { AspirationCategory } from "@/lib/generated/prisma/client"
import { toast } from "sonner"
import { Card } from "@/components/retroui/Card"

type CreateAspirationFormProps = {
    categories: AspirationCategory[]
}

const CreateAspirationForm = ({ categories }: CreateAspirationFormProps) => {
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const form = useForm<z.infer<typeof createAspirationSchema>>({
        resolver: zodResolver(createAspirationSchema),
        defaultValues: {
            content: "",
            categoryId: "",
            isAnonymous: false,
        },
    })

    const { run: executeCreate, loading } = useSafeAction(createAspiration, {
        successMessage: "Aspiration created successfully!",
        onSuccess: () => {
            form.reset()
            setImagePreview(null)
        }
    })

    const { run: executeRewrite, loading: isRewriting } = useSafeAction(rewriteAspiration, {
        onSuccess: (data) => {
            if (data?.rewrittenContent) {
                form.setValue("content", data.rewrittenContent);
                toast.success("Content enhanced with AI!");
            }
        },
        onError: (error) => {
            toast.error("Failed to rewrite content.");
        }
    });


    function onSubmit(values: z.infer<typeof createAspirationSchema>) {
        executeCreate(values)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            form.setValue("image", file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    const handleRewrite = () => {
        const content = form.getValues("content");
        if (!content || content.length < 10) {
            toast.error("Content must be at least 10 characters long to rewrite.");
            return;
        }
        executeRewrite({ content });
    };

    return (
        <div className="relative mx-auto w-fit">
            <div className="absolute -top-6 -left-6 z-10 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border-2 border-secondary-foreground bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <FormIcon className="h-8 w-8 text-black" />
            </div>

            <Card>
                <div className="text-center px-6 pt-8">
                    <h1 className="mb-2 text-4xl font-head">Create Aspirasi</h1>
                    <p className="mb-8 text-sm font-medium text-muted-foreground">
                        Share your aspiration with the world. Let your dreams be known and inspire others.
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="px-6 space-y-6">
                        <div className="space-y-2">
                            <label className="font-bold">Content</label>

                            <Textarea
                                placeholder="Write your aspiration here... What do you wish for?"
                                {...form.register("content")}
                            />
                            {form.formState.errors.content && (
                                <p className="text-xs font-bold text-destructive">{form.formState.errors.content.message}</p>
                            )}
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                onClick={handleRewrite}
                                disabled={isRewriting}
                                className="text-xs flex items-center gap-2 ml-auto"
                            >
                                <Sparkles className="w-3 h-3" />
                                {isRewriting ? "Rewriting..." : "Rewrite with AI"}
                            </Button>
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold">Category</label>
                            <input type="hidden" {...form.register("categoryId")} />
                            <Select
                                onValueChange={(value) => form.setValue("categoryId", value, { shouldValidate: true })}
                                defaultValue={form.getValues("categoryId")}
                            >
                                <Select.Trigger className="w-full">
                                    <Select.Value placeholder="Select a category" />
                                </Select.Trigger>
                                <Select.Content>
                                    <Select.Group>
                                        {categories.map((category) => (
                                            <Select.Item key={category.id} value={category.id}>
                                                {category.name}
                                            </Select.Item>
                                        ))}
                                    </Select.Group>
                                </Select.Content>
                            </Select>
                            {form.formState.errors.categoryId && (
                                <p className="text-xs font-bold text-destructive">{form.formState.errors.categoryId.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label className="font-bold">Image (Optional)</label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                            />
                            {imagePreview && (
                                <div className="mt-2 relative w-full h-48 overflow-hidden border-2 border-dashed border-muted-foreground/25">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-full object-contain"
                                    />
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        className="absolute top-2 right-2 border-destructive text-destructive hover:bg-destructive hover:text-white"
                                        onClick={() => {
                                            form.setValue("image", undefined)
                                            setImagePreview(null)
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <Controller
                                control={form.control}
                                name="isAnonymous"
                                render={({ field }) => (
                                    <Checkbox
                                        id="isAnonymous"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                )}
                            />
                            <label htmlFor="isAnonymous" className="text-sm font-bold cursor-pointer select-none">
                                Post anonymously
                            </label>
                        </div>
                    </div>





                    <div className="bg-primary px-6 py-4 border-t-4 ">
                        <Button type="submit"
                            className="ml-auto text-center shadow-black group"
                            disabled={loading}
                            variant="secondary">
                            {loading ? "Submitting..." : "Submit Aspiration"} <ArrowUpRight className='ml-2 transition-all group-hover:rotate-45' />
                        </Button>
                    </div>
                </form>
            </Card>
        </div >
    )
}

export default CreateAspirationForm

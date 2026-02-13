"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { Label } from "@/components/retroui/Label"
import { Dialog } from "@/components/retroui/Dialog"
import { useSafeAction } from "@/hooks/use-safe-action"
import { createCategory, updateCategory } from "@/server/category/category.action"
import { CreateCategorySchema, type CreateCategoryInput } from "@/schema/category.schema"

type CategoryFormValues = CreateCategoryInput

type CategoryFormDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    editData?: { id: string; name: string; slug: string } | null
}

const CategoryFormDialog = ({ open, onOpenChange, editData }: CategoryFormDialogProps) => {
    const isEdit = !!editData

    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(CreateCategorySchema),
        defaultValues: { name: "", slug: "" },
    })

    useEffect(() => {
        if (editData) {
            form.reset({ name: editData.name, slug: editData.slug })
        } else {
            form.reset({ name: "", slug: "" })
        }
    }, [editData, form])

    const { run: runCreate, loading: creating } = useSafeAction(createCategory, {
        successMessage: "Category created!",
        onSuccess: () => {
            form.reset()
            onOpenChange(false)
        },
    })

    const { run: runUpdate, loading: updating } = useSafeAction(updateCategory, {
        successMessage: "Category updated!",
        onSuccess: () => {
            form.reset()
            onOpenChange(false)
        },
    })

    const loading = creating || updating

    const onSubmit = (values: CategoryFormValues) => {
        if (isEdit) {
            runUpdate({ ...values, id: editData.id })
        } else {
            runCreate(values)
        }
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const name = e.target.value
        form.setValue("name", name)
        if (!isEdit) {
            form.setValue("slug", name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content size="sm">
                <Dialog.Header>
                    {isEdit ? "Edit Category" : "Create Category"}
                </Dialog.Header>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. Lingkungan"
                            {...form.register("name", { onChange: handleNameChange })}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            placeholder="e.g. lingkungan"
                            {...form.register("slug")}
                        />
                        {form.formState.errors.slug && (
                            <p className="text-sm text-destructive">{form.formState.errors.slug.message}</p>
                        )}
                    </div>
                    <Dialog.Footer className="px-0 border-0">
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => onOpenChange(false)}
                            disabled={loading}
                            className="bg-white"
                        >
                            Cancel
                        </Button>
                        <Button type="submit" size="sm" disabled={loading}>
                            {loading ? "Saving..." : isEdit ? "Update" : "Create"}
                        </Button>
                    </Dialog.Footer>
                </form>
            </Dialog.Content>
        </Dialog>
    )
}

export default CategoryFormDialog

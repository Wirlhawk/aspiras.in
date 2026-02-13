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
import { createClass, updateClass } from "@/server/class/class.action"
import { CreateClassSchema, type CreateClassInput } from "@/schema/class.schema"

type ClassFormValues = CreateClassInput

type ClassFormDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    editData?: { id: string; name: string; grade: string } | null
}

const ClassFormDialog = ({ open, onOpenChange, editData }: ClassFormDialogProps) => {
    const isEdit = !!editData

    const form = useForm<ClassFormValues>({
        resolver: zodResolver(CreateClassSchema),
        defaultValues: { name: "", grade: "" },
    })

    useEffect(() => {
        if (editData) {
            form.reset({ name: editData.name, grade: editData.grade })
        } else {
            form.reset({ name: "", grade: "" })
        }
    }, [editData, form])

    const { run: runCreate, loading: creating } = useSafeAction(createClass, {
        successMessage: "Class created!",
        onSuccess: () => { form.reset(); onOpenChange(false) },
    })

    const { run: runUpdate, loading: updating } = useSafeAction(updateClass, {
        successMessage: "Class updated!",
        onSuccess: () => { form.reset(); onOpenChange(false) },
    })

    const loading = creating || updating

    const onSubmit = (values: ClassFormValues) => {
        if (isEdit) {
            runUpdate({ ...values, id: editData.id })
        } else {
            runCreate(values)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content size="sm">
                <Dialog.Header>
                    {isEdit ? "Edit Class" : "Create Class"}
                </Dialog.Header>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. XII IPA 1"
                            {...form.register("name")}
                        />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="grade">Grade</Label>
                        <Input
                            id="grade"
                            placeholder="e.g. 12"
                            {...form.register("grade")}
                        />
                        {form.formState.errors.grade && (
                            <p className="text-sm text-destructive">{form.formState.errors.grade.message}</p>
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

export default ClassFormDialog

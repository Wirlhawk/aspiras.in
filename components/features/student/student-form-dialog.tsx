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
import { createStudent, updateStudent } from "@/server/student/student.action"
import { CreateStudentSchema, UpdateStudentSchema } from "@/schema/student.schema"

type SchoolClass = { id: string; name: string; grade: string }

type StudentFormDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    editData?: { id: string; name: string; classId: string } | null
    classes: SchoolClass[]
}

const StudentFormDialog = ({ open, onOpenChange, editData, classes }: StudentFormDialogProps) => {
    const isEdit = !!editData

    const createForm = useForm<z.infer<typeof CreateStudentSchema>>({
        resolver: zodResolver(CreateStudentSchema),
        defaultValues: { name: "", email: "", password: "", classId: "" },
    })

    const editForm = useForm<z.infer<typeof UpdateStudentSchema>>({
        resolver: zodResolver(UpdateStudentSchema),
        defaultValues: { id: "", name: "", classId: "" },
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const form = (isEdit ? editForm : createForm) as any

    useEffect(() => {
        if (editData) {
            editForm.reset({ id: editData.id, name: editData.name, classId: editData.classId })
        } else {
            createForm.reset({ name: "", email: "", password: "", classId: "" })
        }
    }, [editData, createForm, editForm])

    const { run: runCreate, loading: creating } = useSafeAction(createStudent, {
        successMessage: "Student created!",
        onSuccess: () => { createForm.reset(); onOpenChange(false) },
    })

    const { run: runUpdate, loading: updating } = useSafeAction(updateStudent, {
        successMessage: "Student updated!",
        onSuccess: () => { editForm.reset(); onOpenChange(false) },
    })

    const loading = creating || updating

    const onSubmit = (values: any) => {
        if (isEdit) {
            runUpdate(values)
        } else {
            runCreate(values)
        }
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content size="sm">
                <Dialog.Header>
                    {isEdit ? "Edit Student" : "Create Student"}
                </Dialog.Header>
                <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" placeholder="e.g. John Doe" {...form.register("name")} />
                        {form.formState.errors.name && (
                            <p className="text-sm text-destructive">{form.formState.errors.name.message as string}</p>
                        )}
                    </div>

                    {!isEdit && (
                        <>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="e.g. john@school.id" {...createForm.register("email")} />
                                {createForm.formState.errors.email && (
                                    <p className="text-sm text-destructive">{createForm.formState.errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Min 6 characters" {...createForm.register("password")} />
                                {createForm.formState.errors.password && (
                                    <p className="text-sm text-destructive">{createForm.formState.errors.password.message}</p>
                                )}
                            </div>
                        </>
                    )}

                    <div className="space-y-2">
                        <Label htmlFor="classId">Class</Label>
                        <select
                            id="classId"
                            {...form.register("classId")}
                            className="w-full border-2 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="">Select a class...</option>
                            {classes.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name} — Grade {c.grade}
                                </option>
                            ))}
                        </select>
                        {form.formState.errors.classId && (
                            <p className="text-sm text-destructive">{form.formState.errors.classId.message as string}</p>
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

export default StudentFormDialog

"use client"

import { useState } from "react"
import { Badge } from "@/components/retroui/Badge"
import { useSafeAction } from "@/hooks/use-safe-action"
import { deleteStudent } from "@/server/student/student.action"
import DataTable, { type Column } from "@/components/shared/data-table/data-table"
import DeleteConfirmDialog from "@/components/shared/data-table/delete-confirm-dialog"
import PageHeader from "@/components/shared/data-table/page-header"
import StudentFormDialog from "./student-form-dialog"

type Student = {
    id: string
    name: string
    role: string
    classId: string
    class: { id: string; name: string; grade: string }
    _count: { aspirations: number }
}

type StudentTableProps = {
    students: Student[]
    classes: { id: string; name: string; grade: string }[]
}

const columns: Column<Student>[] = [
    {
        key: "name",
        label: "Name",
        render: (item) => <span className="font-semibold">{item.name}</span>,
    },
    {
        key: "class",
        label: "Class",
        render: (item) => <Badge variant="default" size="sm">{item.class.name}</Badge>,
    },
    {
        key: "grade",
        label: "Grade",
        render: (item) => item.class.grade,
    },
    {
        key: "aspirations",
        label: "Aspirations",
        className: "text-center",
        render: (item) => <Badge variant="solid" size="sm">{item._count.aspirations}</Badge>,
    },
]

const StudentTable = ({ students, classes }: StudentTableProps) => {
    const [formOpen, setFormOpen] = useState(false)
    const [editData, setEditData] = useState<{ id: string; name: string; classId: string } | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Student | null>(null)

    const { run: runDelete, loading: deleting } = useSafeAction(deleteStudent, {
        successMessage: "Student deleted!",
        onSuccess: () => setDeleteTarget(null),
    })

    const handleCreate = () => { setEditData(null); setFormOpen(true) }
    const handleEdit = (s: Student) => { setEditData({ id: s.id, name: s.name, classId: s.classId }); setFormOpen(true) }

    return (
        <div className="space-y-4">
            <PageHeader
                title="Students"
                description="Manage student accounts"
                actionLabel="Add Student"
                onAction={handleCreate}
            />

            <DataTable
                columns={columns}
                data={students}
                getRowKey={(s) => s.id}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
                emptyMessage="No students yet. Create your first one!"
            />

            <StudentFormDialog
                open={formOpen}
                onOpenChange={setFormOpen}
                editData={editData}
                classes={classes}
            />

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Delete Student"
                itemName={deleteTarget?.name || ""}
                warningMessage={
                    deleteTarget && deleteTarget._count.aspirations > 0
                        ? `This student has ${deleteTarget._count.aspirations} aspiration(s) and cannot be deleted.`
                        : undefined
                }
                canDelete={!deleteTarget || deleteTarget._count.aspirations === 0}
                onConfirm={() => deleteTarget && runDelete({ id: deleteTarget.id })}
                loading={deleting}
            />
        </div>
    )
}

export default StudentTable

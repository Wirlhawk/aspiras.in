"use client"

import { useState } from "react"
import { Badge } from "@/components/retroui/Badge"
import { useSafeAction } from "@/hooks/use-safe-action"
import { deleteClass } from "@/server/class/class.action"
import DataTable, { type Column } from "@/components/shared/data-table/data-table"
import DeleteConfirmDialog from "@/components/shared/data-table/delete-confirm-dialog"
import PageHeader from "@/components/shared/data-table/page-header"
import ClassFormDialog from "./class-form-dialog"

type SchoolClass = {
    id: string
    name: string
    grade: string
    _count: { profiles: number }
}

const columns: Column<SchoolClass>[] = [
    {
        key: "name",
        label: "Name",
        render: (item) => <span className="font-semibold">{item.name}</span>,
    },
    {
        key: "grade",
        label: "Grade",
        render: (item) => <Badge variant="default" size="sm">{item.grade}</Badge>,
    },
    {
        key: "students",
        label: "Students",
        className: "text-center",
        render: (item) => <Badge variant="solid" size="sm">{item._count.profiles}</Badge>,
    },
]

const ClassTable = ({ classes }: { classes: SchoolClass[] }) => {
    const [formOpen, setFormOpen] = useState(false)
    const [editData, setEditData] = useState<{ id: string; name: string; grade: string } | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<SchoolClass | null>(null)

    const { run: runDelete, loading: deleting } = useSafeAction(deleteClass, {
        successMessage: "Class deleted!",
        onSuccess: () => setDeleteTarget(null),
    })

    const handleCreate = () => { setEditData(null); setFormOpen(true) }
    const handleEdit = (c: SchoolClass) => { setEditData({ id: c.id, name: c.name, grade: c.grade }); setFormOpen(true) }

    return (
        <div className="space-y-4">
            <PageHeader
                title="Classes"
                description="Manage school classes"
                actionLabel="Add Class"
                onAction={handleCreate}
            />

            <DataTable
                columns={columns}
                data={classes}
                getRowKey={(c) => c.id}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
                emptyMessage="No classes yet. Create your first one!"
            />

            <ClassFormDialog open={formOpen} onOpenChange={setFormOpen} editData={editData} />

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Delete Class"
                itemName={deleteTarget?.name || ""}
                warningMessage={
                    deleteTarget && deleteTarget._count.profiles > 0
                        ? `This class has ${deleteTarget._count.profiles} student(s) and cannot be deleted.`
                        : undefined
                }
                canDelete={!deleteTarget || deleteTarget._count.profiles === 0}
                onConfirm={() => deleteTarget && runDelete({ id: deleteTarget.id })}
                loading={deleting}
            />
        </div>
    )
}

export default ClassTable

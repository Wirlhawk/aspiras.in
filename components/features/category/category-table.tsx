"use client"

import { useState } from "react"
import { Badge } from "@/components/retroui/Badge"
import { useSafeAction } from "@/hooks/use-safe-action"
import { deleteCategory } from "@/server/category/category.action"
import DataTable, { type Column } from "@/components/shared/data-table/data-table"
import DeleteConfirmDialog from "@/components/shared/data-table/delete-confirm-dialog"
import PageHeader from "@/components/shared/data-table/page-header"
import CategoryFormDialog from "./category-form-dialog"

type Category = {
    id: string
    name: string
    slug: string
    _count: { aspirations: number }
}

const columns: Column<Category>[] = [
    {
        key: "name",
        label: "Name",
        render: (item) => <span className="font-semibold">{item.name}</span>,
    },
    {
        key: "slug",
        label: "Slug",
        render: (item) => <Badge variant="default" size="sm">{item.slug}</Badge>,
    },
    {
        key: "aspirations",
        label: "Aspirations",
        className: "text-center",
        render: (item) => <Badge variant="solid" size="sm">{item._count.aspirations}</Badge>,
    },
]

const CategoryTable = ({ categories }: { categories: Category[] }) => {
    const [formOpen, setFormOpen] = useState(false)
    const [editData, setEditData] = useState<{ id: string; name: string; slug: string } | null>(null)
    const [deleteTarget, setDeleteTarget] = useState<Category | null>(null)

    const { run: runDelete, loading: deleting } = useSafeAction(deleteCategory, {
        successMessage: "Category deleted!",
        onSuccess: () => setDeleteTarget(null),
    })

    const handleCreate = () => { setEditData(null); setFormOpen(true) }
    const handleEdit = (c: Category) => { setEditData({ id: c.id, name: c.name, slug: c.slug }); setFormOpen(true) }

    return (
        <div className="space-y-4">
            <PageHeader
                title="Categories"
                description="Manage aspiration categories"
                actionLabel="Add Category"
                onAction={handleCreate}
            />

            <DataTable
                columns={columns}
                data={categories}
                getRowKey={(c) => c.id}
                onEdit={handleEdit}
                onDelete={setDeleteTarget}
                emptyMessage="No categories yet. Create your first one!"
            />

            <CategoryFormDialog open={formOpen} onOpenChange={setFormOpen} editData={editData} />

            <DeleteConfirmDialog
                open={!!deleteTarget}
                onOpenChange={() => setDeleteTarget(null)}
                title="Delete Category"
                itemName={deleteTarget?.name || ""}
                warningMessage={
                    deleteTarget && deleteTarget._count.aspirations > 0
                        ? `This category has ${deleteTarget._count.aspirations} aspiration(s) linked and cannot be deleted.`
                        : undefined
                }
                canDelete={!deleteTarget || deleteTarget._count.aspirations === 0}
                onConfirm={() => deleteTarget && runDelete({ id: deleteTarget.id })}
                loading={deleting}
            />
        </div>
    )
}

export default CategoryTable

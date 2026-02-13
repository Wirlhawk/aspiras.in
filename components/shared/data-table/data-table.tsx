"use client"

import { Table } from "@/components/retroui/Table"
import { Button } from "@/components/retroui/Button"
import { Pencil, Trash2 } from "lucide-react"
import { ReactNode } from "react"
import { cn } from "@/lib/utils"

export type Column<T> = {
    key: string
    label: string
    className?: string
    render: (item: T) => ReactNode
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    getRowKey: (item: T) => string
    onEdit?: (item: T) => void
    onDelete?: (item: T) => void
    emptyMessage?: string
}

const DataTable = <T,>({
    columns,
    data,
    getRowKey,
    onEdit,
    onDelete,
    emptyMessage = "No data found.",
}: DataTableProps<T>) => {
    const showActions = onEdit || onDelete

    return (
        <Table>
            <Table.Header>
                <Table.Row className="bg-muted/50 hover:bg-muted/50 border-b-2 border-black">
                    <Table.Head className="w-[50px] font-bold text-black border-r-2 border-black text-center">#</Table.Head>
                    {columns.map((col) => (
                        <Table.Head
                            key={col.key}
                            className={cn(" text-black border-r-2 border-black last:border-r-0", col.className)}
                        >
                            {col.label}
                        </Table.Head>
                    ))}
                    {showActions && <Table.Head className="w-[100px] font-bold text-black text-center">Actions</Table.Head>}
                </Table.Row>
            </Table.Header>
            <Table.Body className="bg-card">
                {data.length === 0 ? (
                    <Table.Row>
                        <Table.Cell
                            colSpan={columns.length + (showActions ? 2 : 1)} // +1 for index, +1 for actions if shown
                            className="h-24 text-center text-muted-foreground font-medium"
                        >
                            {emptyMessage}
                        </Table.Cell>
                    </Table.Row>
                ) : (
                    data.map((item, index) => (
                        <Table.Row key={getRowKey(item)} className="border-b-2 border-black last:border-b-0 group transition-colors ">
                            <Table.Cell className="font-medium text-center border-r-2 border-black/50">{index + 1}</Table.Cell>
                            {columns.map((col) => (
                                <Table.Cell key={col.key} className={cn("border-r-2 border-black/50 last:border-r-0", col.className)}>
                                    {col.render(item)}
                                </Table.Cell>
                            ))}
                            {showActions && (
                                <Table.Cell className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        {onEdit && (
                                            <Button
                                                variant="default"
                                                size="icon"
                                                onClick={() => onEdit(item)}
                                                className="h-8 w-8"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                variant="default"
                                                size="icon"
                                                onClick={() => onDelete(item)}
                                                className="h-8 w-8 bg-destructive hover:bg-destructive shadow-black"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </Table.Cell>
                            )}
                        </Table.Row>
                    ))
                )}
            </Table.Body>
        </Table>
    )
}

export default DataTable

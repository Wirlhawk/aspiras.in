"use client"

import { useState } from "react"
import { Button } from "@/components/retroui/Button"
import { Dialog } from "@/components/retroui/Dialog"
import { useSafeAction } from "@/hooks/use-safe-action"
import { deleteAspiration } from "@/server/aspiration/aspiration.action"
import { Trash2 } from "lucide-react"

type DeleteAspirationButtonProps = {
    id: string
}

const DeleteAspirationButton = ({ id }: DeleteAspirationButtonProps) => {
    const [open, setOpen] = useState(false)

    const { run, loading } = useSafeAction(deleteAspiration, {
        successMessage: "Aspiration deleted successfully!",
    })

    const handleDelete = () => {
        run({ id })
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <Dialog.Trigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-white bg-destructive hover:bg-destructive/80 group"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </Dialog.Trigger>
            <Dialog.Content size="sm" >
                <Dialog.Header>Delete Aspiration</Dialog.Header>
                <div className="p-6 space-y-2">
                    <p className="font-semibold text-lg">Are you sure?</p>
                    <Dialog.Description className="text-sm text-muted-foreground">
                        This action cannot be undone. This will permanently delete your aspiration.
                    </Dialog.Description>
                </div>
                <Dialog.Footer>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setOpen(false)}
                        disabled={loading}
                        className="bg-white"
                    >
                        Cancel
                    </Button>
                    <Button
                        size="sm"
                        onClick={handleDelete}
                        disabled={loading}
                        className="text-white bg-destructive hover:bg-destructive/80"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        {loading ? "Deleting..." : "Delete"}
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    )
}

export default DeleteAspirationButton

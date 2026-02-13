"use client"

import { Button } from "@/components/retroui/Button"
import { Dialog } from "@/components/retroui/Dialog"
import { AlertTriangle, Loader2 } from "lucide-react"

interface DeleteConfirmDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    itemName: string
    warningMessage?: string
    canDelete?: boolean
    onConfirm: () => void
    loading?: boolean
}

const DeleteConfirmDialog = ({
    open,
    onOpenChange,
    title,
    itemName,
    warningMessage,
    canDelete = true,
    onConfirm,
    loading = false,
}: DeleteConfirmDialogProps) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <Dialog.Content>
                <Dialog.Header>
                    <div className="flex items-center gap-2 text-destructive font-bold text-lg">
                        <AlertTriangle className="h-5 w-5" />
                        {title}
                    </div>
                    <Dialog.Description>
                        Are you sure you want to delete <span className="font-bold text-foreground">"{itemName}"</span>?
                        This action cannot be undone.
                    </Dialog.Description>
                </Dialog.Header>

                {warningMessage && (
                    <div className="p-3 border-2 border-destructive/20 bg-destructive/10 rounded text-sm text-destructive font-medium mt-2">
                        {warningMessage}
                    </div>
                )}

                <Dialog.Footer>
                    <Button variant="outline" onClick={() => onOpenChange(false)} disabled={loading}>
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        disabled={!canDelete || loading}
                        className="gap-2 shadow-black"
                    >
                        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                        Confirm Delete
                    </Button>
                </Dialog.Footer>
            </Dialog.Content>
        </Dialog>
    )
}

export default DeleteConfirmDialog

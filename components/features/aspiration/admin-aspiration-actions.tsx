"use client";

import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import { updateAspirationStatus } from "@/server/aspiration/aspiration.action";
import { Button } from "@/components/retroui/Button";
// ^ Note: I should checking if dropdown-menu is in retroui or ui. 
// I reinstalled standard shadcn components to components/retroui, but Menu.tsx was custom.
// However, Select or Dropdown might be needed. 
// Let's use Select from retroui if available or Dropdown from UI if installed. 
// Wait, I installed @radix-ui/react-dropdown-menu via standard shadcn add? No, I added specific ones.
// I think I missed 'dropdown-menu' in my reinstall command:
// "npx shadcn@latest add ... @retroui/select ..."
// I have Select. Let's use Select for status.

import { Badge } from "@/components/retroui/Badge";
import { Check, X, CheckCircle2 } from "lucide-react";

type Props = {
    id: string;
    currentStatus: "PENDING" | "PROCESSING" | "DONE" | "REJECTED";
};

export const AdminAspirationActions = ({ id, currentStatus }: Props) => {
    // We can rely on router refresh from the action to update the UI props, 
    // so local state might not be strictly needed if we want to force refresh,
    // but optimistically updating or just using the prop is fine. 
    // The previous implementation used local state for the select value.
    // Here, we just fire actions.

    const { execute, status: actionStatus } = useAction(updateAspirationStatus, {
        onSuccess: ({ data }) => {
            toast.success("Status updated");
            // The action revalidates path, so page should reload.
        },
        onError: (err) => {
            toast.error("Failed to update status");
        }
    });

    const updateStatus = (status: "PROCESSING" | "DONE" | "REJECTED") => {
        execute({ id, status });
    };

    if (currentStatus === "PENDING") {
        return (
            <div className="flex gap-2">
                <Button
                    size="sm"
                    variant="default"
                    onClick={() => updateStatus("REJECTED")}
                    disabled={actionStatus === 'executing'}
                    className="bg-destructive hover:bg-destructive shadow-black"
                >
                    <X size={16} className="mr-1" />
                    Reject
                </Button>
                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => updateStatus("PROCESSING")}
                    disabled={actionStatus === 'executing'}
                    // className="bg-blue-600 hover:bg-blue-700 text-white shadow-black"
                >
                    <Check size={16} className="mr-1" />
                    Accept
                </Button>
            </div>
        );
    }

    if (currentStatus === "PROCESSING") {
        return (
            <Button
                size="sm"
                variant="default"
                onClick={() => updateStatus("DONE")}
                disabled={actionStatus === 'executing'}
                className="bg-green-600 hover:bg-green-700 text-white shadow-black"
            >
                <CheckCircle2 size={16} className="mr-1" />
                Mark as Done
            </Button>
        );
    }

    // Done or Rejected
    return (
        <Badge variant={currentStatus === "DONE" ? "default" : "destructive"}>
            {currentStatus}
        </Badge>
    );
};

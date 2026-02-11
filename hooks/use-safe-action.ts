"use client";

import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

export function useSafeAction(
    action: any,
    options?: {
        onSuccess?: (data: any) => void;
        onError?: (error: any) => void;
        successMessage?: string;
        errorMessage?: string;
    }
) {
    const { execute, status, result, reset } = useAction(action, {
        onSuccess: ({ data }) => {
            if (options?.successMessage) {
                toast.success(options.successMessage);
            }
            options?.onSuccess?.(data);
        },
        onError: ({ error }) => {
            // Error handling for next-safe-action v7+
            const serverError = error.serverError as any;
            const message = serverError?.message || serverError?.errorMessage || options?.errorMessage || "Something went wrong";
            toast.error(message.toString());
            options?.onError?.(error);
        },
    });

    return {
        run: execute,
        status,
        result,
        reset,
        loading: status === "executing",
    };
}

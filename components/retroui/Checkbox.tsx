"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface CheckboxProps {
    checked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
    id?: string;
    className?: string;
    disabled?: boolean;
}

export const Checkbox = ({
    checked = false,
    onCheckedChange,
    id,
    className,
    disabled = false,
}: CheckboxProps) => {
    return (
        <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            id={id}
            disabled={disabled}
            onClick={() => onCheckedChange?.(!checked)}
            className={cn(
                "h-5 w-5 shrink-0 rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs flex items-center justify-center",
                checked
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-transparent border-border",
                disabled && "cursor-not-allowed opacity-50",
                className
            )}
        >
            {checked && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            )}
        </button>
    );
};

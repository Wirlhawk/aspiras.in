import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    className?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ placeholder = "Enter text", className = "", ...props }, ref) => {
        return (
            <textarea
                ref={ref}
                placeholder={placeholder}
                className={`px-4 py-2 w-full rounded border-2 shadow-md transition focus:outline-hidden focus:shadow-xs min-h-[120px] resize-y ${props["aria-invalid"]
                        ? "border-destructive text-destructive shadow-xs shadow-destructive"
                        : ""
                    } ${className}`}
                {...props}
            />
        );
    }
);
Textarea.displayName = "Textarea";

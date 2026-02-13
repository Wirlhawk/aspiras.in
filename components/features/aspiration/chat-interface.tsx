"use client";

import { Button } from "@/components/retroui/Button";
import { Input } from "@/components/retroui/Input";
import CircleAvatar from "@/components/shared/avatar/circle-avatar";
import { AspirationComment, Profile } from "@/lib/generated/prisma/client";
import { cn } from "@/lib/utils";
import { createComment } from "@/server/aspiration/aspiration.action";
import { format } from "date-fns";
import { Loader2, Send } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { toast } from "sonner";

type ChatInterfaceProps = {
    aspirationId: string;
    comments: (AspirationComment & { profile: Profile })[];
    currentUserId: string;
    aspirationStatus: string;
};

export const ChatInterface = ({ aspirationId, comments, currentUserId, aspirationStatus }: ChatInterfaceProps) => {
    const [content, setContent] = useState("");
    const { execute, status } = useAction(createComment, {
        onSuccess: () => {
            setContent("");
            // Optimistic update or wait for revalidatePath (which is handled in action)
        },
        onError: (error) => {
            const serverError = error.error?.serverError;
            const msg = typeof serverError === 'string' ? serverError : "Failed to send message";
            toast.error(msg);
        },
    });

    const handleSend = () => {
        if (!content.trim()) return;
        execute({ aspirationId, content, isAnonymous: false });
    };

    const isReadOnly = aspirationStatus === "DONE" || aspirationStatus === "REJECTED";

    return (
        <div className="flex flex-col h-[600px] border bg-background overflow-hidden relative">
            <div className="bg-muted p-4 border-b font-head text-lg sticky top-0 z-10 flex justify-between items-center">
                <span>Discussion</span>
                {isReadOnly && <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">Read Only</span>}
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
                {/* Flex col standard, new/old order depends entirely on the array order passed in. Query was ASC (oldest top). */}

                <div className="flex-1" /> {/* Spacer to push content down if few messages */}

                {comments.map((comment) => {
                    const isOwn = comment.profile.id === currentUserId;
                    const isAdmin = comment.profile.role === "ADMIN";

                    return (
                        <div
                            key={comment.id}
                            className={cn(
                                "flex w-full mb-4",
                                isOwn ? "justify-end" : "justify-start"
                            )}
                        >
                            <div className={cn(
                                "flex max-w-[80%] gap-2",
                                isOwn ? "flex-row-reverse" : "flex-row"
                            )}>
                                <CircleAvatar
                                    name={comment.isAnonymous ? "?" : comment.profile.name}
                                    className="w-8 h-8 shrink-0"
                                />
                                <div className={cn(
                                    "p-3 rounded-lg shadow-sm border",
                                    // Style distinction: 
                                    // If it's me (Own): Primary color (if admin? or just me?). 
                                    // Let's say: Own messages are Primary. Others are Card/Gray.
                                    // BUT, maybe we want to highlight Admin messages distinctively regardless of who views?
                                    // Let's stick to standard chat: Own = Right/Primary. Others = Left/Gray.
                                    // Maybe add an "Admin" badge or subtle indicator if the sender is admin?
                                    isOwn
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-card text-card-foreground rounded-tl-none",
                                    isAdmin && !isOwn && "border-primary/50 bg-primary/5" // Highlight admin messages received
                                )}>
                                    <div className="text-xs opacity-70 mb-1 flex justify-between gap-4">
                                        <span className="font-bold flex items-center gap-1">
                                            {comment.isAnonymous ? "Anonymous" : comment.profile.name}
                                            {isAdmin && <span className="text-[10px] bg-foreground/10 px-1 rounded">ADMIN</span>}
                                        </span>
                                        <span>
                                            {comment.createdAt ? format(comment.createdAt, "HH:mm") : ""}
                                        </span>
                                    </div>
                                    <p className="whitespace-pre-wrap text-sm">{comment.content}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="p-4 bg-muted border-t flex gap-2 sticky bottom-0 z-10">
                <Input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder={isReadOnly ? "This conversation is closed." : "Type a reply..."}
                    className="flex-1 bg-background"
                    disabled={isReadOnly}
                    onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                />
                <Button onClick={handleSend} disabled={status === "executing" || !content.trim() || isReadOnly}>
                    {status === "executing" ? <Loader2 className="animate-spin" /> : <Send size={18} />}
                </Button>
            </div>
        </div>
    );
};

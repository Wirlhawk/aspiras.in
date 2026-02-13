import { Button } from "@/components/retroui/Button"
import { Plus } from "lucide-react"

interface PageHeaderProps {
    title: string
    description?: string
    actionLabel?: string
    onAction?: () => void
}

const PageHeader = ({ title, description, actionLabel, onAction }: PageHeaderProps) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-head tracking-tight text-foreground shadow-black">{title}</h1>
                {description && <p className="text-muted-foreground mt-1 font-medium">{description}</p>}
            </div>
            {actionLabel && onAction && (
                <Button onClick={onAction} className="gap-2 shadow-black hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                    <Plus className="h-4 w-4" />
                    {actionLabel}
                </Button>
            )}
        </div>
    )
}

export default PageHeader

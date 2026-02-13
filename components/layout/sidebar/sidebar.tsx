"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type SidebarItem = {
    label: string
    href: string
    icon: React.ReactNode
}

export type SidebarGroup = {
    title: string
    items: SidebarItem[]
}

const Sidebar = ({ groups }: { groups: SidebarGroup[] }) => {
    const [collapsed, setCollapsed] = useState(false)
    const pathname = usePathname()

return (
        <aside
            className={cn(
                "bg-card border-r-2 border-black flex flex-col transition-all duration-300 ease-in-out h-screen sticky top-0",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b-2 border-black h-16">
                {!collapsed && (
                    <h1 className="text-xl font-head truncate">Aspirasi.Admin</h1>
                )}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="p-1 hover:bg-black/5 rounded transition-colors"
                >
                    {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
                {groups.map((group, groupIndex) => (
                    <div key={groupIndex}>
                        {!collapsed && (
                            <h3 className="px-3 mb-2 text-xs font-head text-muted-foreground uppercase tracking-wider">
                                {group.title}
                            </h3>
                        )}
                        {collapsed && (
                            <div className="mx-3 my-2 h-[2px] bg-border/50" />
                        )}
                        <div className="space-y-1">
                            {group.items.map((item) => {
                                const isActive = item.href === '/dashboard'
                                    ? pathname === '/dashboard'
                                    : pathname === item.href || pathname.startsWith(`${item.href}/`)
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2 rounded-md transition-all border-2",
                                            isActive
                                                ? "bg-primary text-primary-foreground border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px]"
                                                : "bg-transparent border-transparent hover:bg-black/5 hover:border-black/10 text-foreground"
                                        )}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <div className={cn("shrink-0", collapsed && "mx-auto")}>
                                            {item.icon}
                                        </div>
                                        {!collapsed && (
                                            <span className="font-medium text-sm truncate">{item.label}</span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-4 border-t-2 border-black">
                <Link
                    href="/logout"
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-md transition-all border-2 border-transparent hover:bg-destructive/10 hover:border-destructive text-destructive w-full",
                        collapsed ? "justify-center" : ""
                    )}
                    title="Logout"
                >
                    <div className="shrink-0">
                        {/* Simple logout icon if needed, or just text */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" x2="9" y1="12" y2="12" />
                        </svg>
                    </div>
                    {!collapsed && <span className="font-medium text-sm">Logout</span>}
                </Link>
            </div>
        </aside>
    )
}

export default Sidebar

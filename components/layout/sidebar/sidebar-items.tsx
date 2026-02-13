import { LayoutDashboard, MessageSquare, Users, FolderOpen, School, MessageCircle } from 'lucide-react'
import type { SidebarGroup } from './sidebar'

export const adminSidebarGroups: SidebarGroup[] = [
    {
        title: 'Overview',
        items: [
            {
                label: "Dashboard",
                href: "/dashboard",
                icon: <LayoutDashboard size={20} />,
            },
            {
                label: "Users",
                href: "/dashboard/users",
                icon: <Users size={20} />,
            },
            {
                label: "Classes",
                href: "/dashboard/class",
                icon: <School size={20} />,
            },
            {
                label: "Categories",
                href: "/dashboard/categories",
                icon: <FolderOpen size={20} />,
            },
            {
                label: 'Aspirations',
                href: '/dashboard/aspirations',
                icon: <MessageSquare size={20} />,
            },
        ],
    },
]

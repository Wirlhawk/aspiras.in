import Sidebar from '@/components/layout/sidebar/sidebar'
import { adminSidebarGroups } from '@/components/layout/sidebar/sidebar-items'
import React from 'react'

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen bg-secondary/20">
            <Sidebar groups={adminSidebarGroups} />
            <main className="flex-1 overflow-auto p-4 md:p-8">
                <div className="max-w-7xl mx-auto w-full space-y-8">
                    {children}
                </div>
            </main>
        </div>
    )
}

export default AdminLayout

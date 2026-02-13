
import Navbar from '@/components/layout/navbar/navbar'
import React from 'react'

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <div className="max-w-7xl w-full min-h-screen mx-auto ">
                {children}
            </div>
        </>
    )
}

export default HomeLayout
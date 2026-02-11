import { Card } from '@/components/retroui/Card'
import { Lock, Mail } from 'lucide-react'
import React from 'react'

interface AuthCardProps {
    children?: React.ReactNode
    title: string
    description: string
}

const AuthCard = ({ children, title, description }: AuthCardProps) => {
    return (
        <div className="relative">
            {/* Badge */}
            <div className="absolute -top-6 -left-6 z-10 flex h-16 w-16 -rotate-12 items-center justify-center rounded-full border-2 border-secondary-foreground bg-secondary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Lock className="h-8 w-8 text-black" />
            </div>

            <Card className="relative w-full max-w-md bg-card p-8 hover:shadow-md">
                <div className="text-center">
                    <h1 className="mb-2 text-4xl font-head">{title}</h1>
                    <p className="mb-8 text-sm font-medium text-muted-foreground">
                        {description}
                    </p>
                </div>
                {children}
            </Card>
        </div>
    )
}

export default AuthCard
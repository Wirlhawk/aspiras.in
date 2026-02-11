import React from 'react'
import Link from 'next/link'

interface AuthFooterProps {
    label: string
    linkText: string
    href: string
}

const AuthFooter = ({ label, linkText, href }: AuthFooterProps) => {
    return (
        <div className="mt-6 text-center text-sm font-medium">
            {label}{" "}
            <Link href={href} className="underline decoration-2 underline-offset-4 hover:text-gray-600">
                {linkText}
            </Link>
        </div>
    )
}

export default AuthFooter

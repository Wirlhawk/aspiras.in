"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import AuthCard from "@/components/features/auth/auth-card"
import AuthFooter from "@/components/features/auth/auth-footer"
import { useSafeAction } from "@/hooks/use-safe-action"
import { signOut } from "@/server/user/user.action"
import { Button } from "@/components/retroui/Button"
import { Check, Loader2, LogOut } from "lucide-react"
import Link from "next/link"

export default function LogoutPage() {
    const router = useRouter()
    const [isLoggedOut, setIsLoggedOut] = useState(false)
    const { run: executeSignOut, loading } = useSafeAction(signOut, {
        onSuccess: () => {
            setIsLoggedOut(true)
            // Optional: redirect after some delay
            // setTimeout(() => router.push("/login"), 3000)
        }
    })

    useEffect(() => {
        executeSignOut({})
    }, [executeSignOut])

    return (
        <div className="w-full grid place-items-center p-24 h-screen">
            <AuthCard
                title={isLoggedOut ? "Signed Out" : "Signing Out..."}
                description={isLoggedOut ? "You have been successfully logged out." : "Please wait while we secure your session."}
            >
                <div className="flex flex-col items-center justify-center py-8 space-y-6">
                    {isLoggedOut ? (
                        <div className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-primary bg-primary/10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <Check className="h-8 w-8 text-primary" />
                        </div>
                    ) : (
                        <div className="h-16 w-16 flex items-center justify-center rounded-full border-2 border-gray-200 bg-gray-50 animate-spin">
                            <Loader2 className="h-8 w-8 text-gray-400" />
                        </div>
                    )}

                    {isLoggedOut && (
                        <div className="flex flex-col items-center space-y-4">
                            <Button asChild className="w-full">
                                <Link href="/">Back to Home</Link>
                            </Button>
                        </div>
                    )}
                </div>

                {isLoggedOut && (
                    <AuthFooter
                        label="Need to get back in?"
                        linkText="Sign in"
                        href="/login"
                    />
                )}
            </AuthCard>
        </div>
    )
}

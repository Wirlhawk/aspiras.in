"use client"

import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { useSafeAction } from '@/hooks/use-safe-action'
import { signIn } from '@/server/auth/auth.action'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LoginSchema, type LoginInput } from "@/schema/auth.schema"

const LoginForm = () => {

    const form = useForm<LoginInput>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { run: executeLogin, loading } = useSafeAction(signIn, {
        successMessage: "Logged in successfully!",
    })

    const onSubmit = (values: LoginInput) => {
        executeLogin(values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-bold">Email</label>
                <Input
                    id="email"
                    placeholder="you@example.com"
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <p className="text-xs font-bold text-destructive">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-bold">Password</label>
                <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    {...form.register("password")}
                />
                {form.formState.errors.password && (
                    <p className="text-xs font-bold text-destructive">{form.formState.errors.password.message}</p>
                )}
            </div>

            <Button
                type="submit"
                className='w-full text-center'
                disabled={loading}
            >
                {loading ? "Signing in..." : "Sign In"}
            </Button>


        </form>
    )
}

export default LoginForm

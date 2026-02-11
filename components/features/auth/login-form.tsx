"use client"

import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { useSafeAction } from '@/hooks/use-safe-action'
import { signIn } from '@/server/user/user.action'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Schema for login - matching the server action schema appropriately
// Note: We can also export schema from action file if needed to stay in sync
const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const LoginForm = () => {

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { run: executeLogin, loading } = useSafeAction(signIn, {
        successMessage: "Logged in successfully!",
    })

    const onSubmit = (values: z.infer<typeof loginSchema>) => {
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

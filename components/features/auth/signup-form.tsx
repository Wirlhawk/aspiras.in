"use client"

import { signUp } from "@/server/auth/auth.action"
import { Button } from "@/components/retroui/Button"
import { Input } from "@/components/retroui/Input"
import { useSafeAction } from "@/hooks/use-safe-action"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { SignUpSchema } from "@/schema/auth.schema"
import { Select } from "@/components/retroui/Select"


import type { SchoolClass } from "@/lib/generated/prisma/client"

export function SignUpForm({ classes }: { classes: SchoolClass[] }) {
    const form = useForm<z.infer<typeof SignUpSchema>>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            classId: "",
        },
    })

    const { run: executeSignUp, loading } = useSafeAction(signUp, {
        successMessage: "Signed up successfully!",
    })

    function onSubmit(values: z.infer<typeof SignUpSchema>) {
        executeSignUp(values)
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-bold">Full Name</label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    {...form.register("name")}
                />
                {form.formState.errors.name && (
                    <p className="text-xs font-bold text-destructive">{form.formState.errors.name.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold">Email</label>
                <Input
                    type="email"
                    placeholder="m@example.com"
                    {...form.register("email")}
                />
                {form.formState.errors.email && (
                    <p className="text-xs font-bold text-destructive">{form.formState.errors.email.message}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold">
                    Class
                </label>
                <input type="hidden" {...form.register("classId")} />
                <Select
                    onValueChange={(value) => form.setValue("classId", value)}
                    defaultValue={form.getValues("classId")}
                >
                    <Select.Trigger className="w-full">
                        <Select.Value placeholder="Select your class" />
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            {classes.map((c) => (
                                <Select.Item key={c.id} value={c.id}>
                                    {c.grade} - {c.name}
                                </Select.Item>
                            ))}
                        </Select.Group>
                    </Select.Content>
                </Select>
                {form.formState.errors.classId && (
                    <p className="text-sm font-medium text-destructive">
                        {form.formState.errors.classId.message}
                    </p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-bold">Password</label>
                <Input
                    type="password"
                    placeholder="••••••••"
                    {...form.register("password")}
                />
                {form.formState.errors.password && (
                    <p className="text-xs font-bold text-destructive">{form.formState.errors.password.message}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Creating account..." : "Sign Up"}
            </Button>
        </form>
    )
}

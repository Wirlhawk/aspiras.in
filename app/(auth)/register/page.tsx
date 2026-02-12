import AuthCard from '@/components/features/auth/auth-card'
import AuthFooter from '@/components/features/auth/auth-footer'
import { SignUpForm } from "@/components/features/auth/signup-form"
import { getAllClasses } from "@/server/class/class.query"
import React from 'react'

const RegisterPage = async () => {
    const classes = await getAllClasses()

    return (
        <div className='w-full grid place-items-center p-24 h-screen'>
            <AuthCard title="Sign Up" description="Sign up to get started.">
                <SignUpForm classes={classes} />
                <AuthFooter label="Already have an account?" linkText="Sign in" href="/login" />
            </AuthCard>
        </div>
    )
}

export default RegisterPage

import AuthCard from '@/components/features/auth/auth-card'
import AuthFooter from '@/components/features/auth/auth-footer'
import LoginForm from '@/components/features/auth/login-form'
import React from 'react'

const LoginPage = () => {
    return (
        <div className='w-full grid place-items-center p-4 h-screen'>
            <AuthCard title="Sign In" description="Enter your email to receive a magic link for instant access.">
                <LoginForm />
                <AuthFooter label="Don't have an account?" linkText="Sign up" href="/register" />
            </AuthCard>
        </div>
    )
}

export default LoginPage
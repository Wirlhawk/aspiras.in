import { Button } from '@/components/retroui/Button'
import React from 'react'

const Navbar = () => {
    return (
        <header className="border-b-2  px-4 md:px-6">
            <div className="container mx-auto flex h-16 items-center justify-between max-w-7xl">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-head" >Aspiras.in</span>
                </div>
```tsx
                <nav className="hidden md:flex items-center gap-6">
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4 decoration-2 decoration-primary transition-all">Home</a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4 decoration-2 decoration-primary transition-all">About</a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4 decoration-2 decoration-primary transition-all">Services</a>
                    <a href="#" className="text-sm font-medium hover:underline underline-offset-4 decoration-2 decoration-primary transition-all">Contact</a>
                </nav>
```
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">Login</Button>
                    <Button size="sm">Sign Up</Button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
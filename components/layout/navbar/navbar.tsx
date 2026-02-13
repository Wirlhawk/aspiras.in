import { Button } from '@/components/retroui/Button'
import { getSessionWithProfile } from '@/server/auth/auth.query'
import Link from 'next/link'

const Navbar = async () => {
    const data = await getSessionWithProfile()
    const session = data?.session

    return (
        <header className="border-b-4 w-full bg-card z-20">
            <div className="container mx-auto flex h-20 items-center justify-between max-w-7xl px-4 md:px-6">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-head" >Aspirasi<span className='text-primary'>.in</span></span>
                </div>

                <nav className="hidden md:flex items-center gap-6 font-sans font-semibold transition-colors">
                    <Link href="/home" className="text-lg underline-offset-4 decoration-2 decoration-primary transition-all hover:text-primary">HOME</Link>
                    <Link href="/aspirasi" className="text-lg underline-offset-4 decoration-2 decoration-primary transition-all hover:text-primary">ASPIRASI</Link>
                </nav>

                {
                    session ? (
                        <div className="flex items-center gap-2">
                            <Button asChild>
                                <Link href="/logout">Sign Out</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Button asChild>
                                <Link href="/login">Sign In</Link>
                            </Button>
                        </div>
                    )
                }
            </div>
            {/* 
            <div className='container mx-auto flex h-72'>

            </div> */}
        </header>
    )
}

export default Navbar
import { Button } from '@/components/retroui/Button'
import { Card } from '@/components/retroui/Card'
import CircleAvatar from '@/components/shared/avatar/circle-avatar'
import Star9 from '@/components/stars/s9'
import { getSessionWithProfile } from '@/server/user/user.query'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { Badge } from '@/components/retroui/Badge'
import { ArrowUpRight, Clock } from 'lucide-react'
import { getCurrentUserAspirations } from '@/server/aspiration/aspiration.query'

const HomePage = async () => {
    const data = await getSessionWithProfile()
    const aspirations = await getCurrentUserAspirations()

    if (!data?.session || !data?.profile) {
        return redirect("/")
    }

    return (
        <section className='h-full w-full p-8 space-y-8'>
            <Card className='container mx-auto w-full p-4 hover:none relative'>
                <Card.Header className='flex flex-row items-center gap-4'>
                    <CircleAvatar name={data?.profile?.name || ""} />
                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-head'>{data?.profile?.name}</h1>
                        <p className='text-lg text-muted-foreground'>{data?.session.user.email}</p>
                    </div>
                    <Star9 color='yellow' stroke='black' strokeWidth={3} size={75} className='ml-auto' />
                </Card.Header>
            </Card>

            <div className='container mx-auto w-full space-y-4'>
                <div className='flex flex-row items-center justify-between bg'>
                    <h1 className='text-3xl font-head'>My Aspirasi</h1>
                    <Button variant="secondary" className='group'>
                        Add Aspirasi <ArrowUpRight className='ml-2 transition-all group-hover:rotate-45' />
                    </Button>

                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {aspirations.map((aspiration) => (
                        <div key={aspiration. } className='relative mt-10 w-[350px]'>
                            <div className="absolute top-0 right-0 -translate-x-4 -translate-y-1/2 z-10">
                                <Image src="/assets/quote.png" alt="Quote" width={75} height={75} />
                            </div>
                            <Card className="w-full p-0">

                                <Card.Content className="pb-0 pt-10 px-0 ">
                                    <img
                                        src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                                        className="w-full h-full border-y-2"
                                        alt="Gameboy"
                                    />
                                </Card.Content>
                                <Card.Header className="pb-0">
                                    <Card.Title className='font-sans font-normal text-xl'>{aspiration.aspirations.content}</Card.Title>
                                </Card.Header>
                                <Card.Content className="flex justify-between items-center">
                                    <Badge variant={"solid"} size={"sm"}>{aspiration.aspiration_categories.name}</Badge>
                                </Card.Content>
                                <div className='flex flex-row bg-primary p-4 mt-4 border-t-2 text-primary-foreground'>
                                    <p className="text-sm font-semibold flex flex-row items-center gap-2"><Clock className='text-sm' /> 30 Minutes ago</p>
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomePage
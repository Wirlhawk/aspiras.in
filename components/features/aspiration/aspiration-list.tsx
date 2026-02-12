import { Button } from '@/components/retroui/Button'
import { ArrowUpRight, InboxIcon } from 'lucide-react'
import React from 'react'
import AspirationCard from './aspiration-card'
import { Aspiration, AspirationCategory } from '@/lib/generated/prisma/client'
import { Empty } from '@/components/retroui/Empty'
import Link from 'next/link'

const AspirationList = ({ aspirations }: { aspirations: (Aspiration & { category: AspirationCategory })[] }) => {
    return (
        <div className='container mx-auto w-full space-y-4'>
            <div className='flex flex-row items-center justify-between bg'>
                <h1 className='text-3xl font-head'>My Aspirasi</h1>
                <Link href="/aspiration/create">
                    <Button variant="secondary" className='group'>
                        Add Aspirasi <ArrowUpRight className='ml-2 transition-all group-hover:rotate-45' />
                    </Button>
                </Link>

            </div>
            {aspirations.length === 0 ? (
                <EmptyAspiration />
            ) : (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {aspirations.map((aspiration) => (
                        <AspirationCard
                            key={aspiration.id}
                            id={aspiration.id}
                            image={aspiration.image}
                            status={aspiration.status}
                            createdAt={aspiration.createdAt!}
                            category={aspiration.category.name}
                            content={aspiration.content}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default AspirationList

export function EmptyAspiration() {
    return (
        <Empty>
            <Empty.Content>
                <Empty.Icon>
                    <InboxIcon className="size-10 md:size-12" />
                </Empty.Icon>
                <Empty.Title>No aspiration</Empty.Title>
                <Empty.Description>
                    Get started by creating your first aspiration
                </Empty.Description>
            </Empty.Content>
        </Empty>
    );
}
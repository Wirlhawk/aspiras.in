
import { Card } from '@/components/retroui/Card'
import CircleAvatar from '@/components/shared/avatar/circle-avatar'
import Star9 from '@/components/stars/s9'
import { Profile } from '@/lib/generated/prisma/client'
import { Session } from '@supabase/supabase-js'

const UserProfileCard = ({ data }: { data: { session: Session, profile: Profile } }) => {
    return (
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
    )
}

export default UserProfileCard
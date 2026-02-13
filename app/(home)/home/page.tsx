import AspirationList from '@/components/features/aspiration/aspiration-list'
import UserProfileCard from '@/components/features/user/user-profile-card'
import { getCurrentUserAspirations } from '@/server/aspiration/aspiration.query'
import { getSessionWithProfile } from '@/server/auth/auth.query'
import { redirect } from 'next/navigation'

const HomePage = async () => {
    const data = await getSessionWithProfile()
    const aspirations = await getCurrentUserAspirations()

    if (!data?.session || !data?.profile) {
        return redirect("/")
    }

    const { session, profile } = data

    return (
        <section className='h-full w-full p-4 sm:p-8 space-y-8 flex flex-col items-center'>
            <UserProfileCard data={{ session, profile }} />
            <AspirationList aspirations={aspirations} />
        </section>
    )
}

export default HomePage
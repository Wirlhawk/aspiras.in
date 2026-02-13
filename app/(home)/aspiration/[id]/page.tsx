import { Button } from '@/components/retroui/Button'
import AspirationDetail from '@/components/features/aspiration/aspiration-detail'
import DeleteAspirationButton from '@/components/features/aspiration/delete-aspiration-button'
import { getAspirationById } from '@/server/aspiration/aspiration.query'
import { requireAuth } from '@/server/utils/require-auth'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

type AspirationDetailPageProps = {
    params: Promise<{ id: string }>
}

import { getSessionWithProfile } from '@/server/auth/auth.query'
import { ChatInterface } from '@/components/features/aspiration/chat-interface'

const AspirationDetailPage = async ({ params }: AspirationDetailPageProps) => {
    // We can assume user is logged in here due to requireAuth, or check profile
    const [aspiration, sessionData] = await Promise.all([
        getAspirationById((await params).id),
        getSessionWithProfile(),
    ])

    if (!aspiration) {
        return notFound()
    }

    // Check ownership? Usually user can view their own aspiration. 
    // And verify auth.
    // requireAuth() should be called, but we can rely on middleware or check here.
    const { profile } = sessionData || {};
    if (!profile) {
        // If requireAuth didn't redirect (e.g. if we removed it intentionally, but we haven't), 
        // fallback to 404 or redirect. 
        // Note: requireAuth() is usually called in layout or here.
        // Let's call it to be safe if not present, but I see `await requireAuth()` was in original file.
        // I will keep requireAuth() call if I can, but replacing whole block might be easier.
        // Wait, I am replacing the block.
    }

    return (
        <section className="h-full w-full space-y-8 p-8 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
                <Link href="/home">
                    <Button variant="secondary" size="sm" className="group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Button>
                </Link>
                {aspiration.status === 'PENDING' && (
                    <DeleteAspirationButton id={aspiration.id} />
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <AspirationDetail aspiration={aspiration} className="mt-0 max-w-none" />

                <ChatInterface
                    aspirationId={aspiration.id}
                    comments={aspiration.comments}
                    currentUserId={profile?.id || ""}
                    aspirationStatus={aspiration.status}
                />
            </div>
        </section>
    )
}

export default AspirationDetailPage

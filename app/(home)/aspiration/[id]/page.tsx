import { Badge } from '@/components/retroui/Badge'
import { Card } from '@/components/retroui/Card'
import { Button } from '@/components/retroui/Button'
import { getAspirationById } from '@/server/aspiration/aspiration.query'
import { requireAuth } from '@/server/utils/require-auth'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, MessageCircle, ShieldCheck, User } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CircleAvatar from '@/components/shared/avatar/circle-avatar'
import DeleteAspirationButton from '@/components/features/aspiration/delete-aspiration-button'

dayjs.extend(relativeTime)

type AspirationDetailPageProps = {
    params: Promise<{ id: string }>
}

const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-200 text-yellow-800',
    PROCESSING: 'bg-blue-200 text-blue-800',
    DONE: 'bg-green-200 text-green-800',
    REJECTED: 'bg-red-200 text-red-800',
}

const AspirationDetailPage = async ({ params }: AspirationDetailPageProps) => {
    await requireAuth()
    const { id } = await params
    const aspiration = await getAspirationById(id)

    if (!aspiration) {
        return notFound()
    }

    return (
        <section className="h-full w-full space-y-8 p-8">
            {/* Back Button */}
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

            {/* Main Detail Card */}
            <div className="relative max-w-2xl mt-15">
                <div className="absolute top-0 left-0 -translate-x-4 -translate-y-1/2 z-10">
                    <Image src="/assets/quote.png" alt="Quote" width={75} height={75} />
                </div>

                <Card className="w-full p-0">
                    {/* Image */}

                    {aspiration.image && (
                        <Card.Content className="p-0 pt-8 ">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={aspiration.image}
                                alt="Aspiration image"
                                className="w-full max-h-96 object-contain border-y-2 "
                            />
                        </Card.Content>
                    )}

                    {/* Content */}
                    <Card.Header className={`pb-0 ${!aspiration.image ? 'pt-10' : ''}`}>
                        <Card.Title className="font-sans font-normal text-xl leading-relaxed whitespace-pre-wrap">
                            {aspiration.content}
                        </Card.Title>
                    </Card.Header>

                    {/* Meta */}
                    <Card.Content className="flex flex-wrap items-center gap-2">
                        <Badge variant="default" size="sm">{aspiration.category.name}</Badge>

                    </Card.Content>

                    <div className='w-full h-full p-4 border-t-2 flex flex-row items-center gap-2'>
                        <CircleAvatar name={aspiration.profile.name} size={10} />
                        <div>
                            <h1 className='text-sm font-semibold'>{aspiration.profile.name}</h1>
                            <p className='text-xs text-muted-foreground'>{aspiration.profile.class.name}</p>
                        </div>
                    </div>

                    {/* Author & Timestamp Footer */}
                    <div className="flex flex-row bg-primary p-4 border-t-2 text-primary-foreground justify-between items-center">
                        <p className="text-sm font-semibold flex flex-row items-center gap-2">
                            <Clock size={18} /> {dayjs(aspiration.createdAt).fromNow()}
                        </p>
                        <Badge
                            variant="default"
                            className={statusColors[aspiration.status] || ''}
                        >
                            {aspiration.status}
                        </Badge>
                    </div>
                </Card>
            </div>

        </section>
    )
}

export default AspirationDetailPage

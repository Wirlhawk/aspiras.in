
import { Badge } from '@/components/retroui/Badge'
import { Card } from '@/components/retroui/Card'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type AspirationCardProps = {
    id: string
    image: string | null
    status: string
    createdAt: Date
    category: string
    content: string
}

const AspirationCard = ({ id, image, status, createdAt, category, content }: AspirationCardProps) => {
    return (
        <Link href={`/aspiration/${id}`} className='relative mt-10 w-[350px] block'>
            <div className="absolute top-0 left-0 -translate-x-4 -translate-y-1/2 z-10">
                <Image src="/assets/quote.png" alt="Quote" width={75} height={75} />
            </div>
            <Card className="w-full p-0 cursor-pointer hover:shadow-lg transition-shadow">

                <Card.Content className="pb-0 pt-10 px-0 ">
                    {/* {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={image}
                            className="w-full h-48 object-cover border-y-2"
                            alt="Aspiration"
                        />
                    )} */}
                </Card.Content>
                <Card.Header className="pb-0">
                    <Card.Title className='font-sans font-normal text-xl truncate'>{content}</Card.Title>
                </Card.Header>
                <Card.Content className="flex justify-between items-center">
                    <Badge variant={"solid"} size={"sm"}>{category}</Badge>
                </Card.Content>
                <div className='flex flex-row bg-primary p-4 mt-4 border-t-2 text-primary-foreground justify-between'>
                    <p className="text-sm font-semibold flex flex-row items-center gap-2"><Clock size={18} /> {dayjs(createdAt).fromNow()}</p>
                    <Badge variant={"default"} className='bg-secondary'>{status}</Badge>
                </div>
            </Card>
        </Link>
    )
}

export default AspirationCard
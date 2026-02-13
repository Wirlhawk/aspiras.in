import { Badge } from "@/components/retroui/Badge";
import { Button } from "@/components/retroui/Button";
import { Card } from "@/components/retroui/Card";
import { Table } from "@/components/retroui/Table";
import { getAspirations } from "@/server/aspiration/aspiration.query";
import { format } from "date-fns";
import { Eye, MessageCircle, AlertTriangle } from "lucide-react";
import Link from "next/link";

const AspirationsPage = async () => {
    const aspirations = await getAspirations();

    return (
        <section>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-head">Aspirations</h1>
            </div>

            <Card className="p-0 overflow-hidden">
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.Head>Content</Table.Head>
                            <Table.Head>Category</Table.Head>
                            <Table.Head>Author</Table.Head>
                            <Table.Head>Status</Table.Head>
                            <Table.Head>Date</Table.Head>
                            <Table.Head>Stats</Table.Head>
                            <Table.Head className="text-right">Actions</Table.Head>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {aspirations.map((aspiration) => (
                            <Table.Row key={aspiration.id}>
                                <Table.Cell className="max-w-[300px] truncate font-medium">
                                    {aspiration.content}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge variant="outline">{aspiration.category.name}</Badge>
                                </Table.Cell>
                                <Table.Cell>
                                    {aspiration.isAnonymous ? (
                                        <span className="italic text-muted-foreground">Anonymous</span>
                                    ) : (
                                        aspiration.profile.name
                                    )}
                                </Table.Cell>
                                <Table.Cell>
                                    <Badge
                                        variant={
                                            aspiration.status === 'DONE' ? 'default' :
                                                aspiration.status === 'REJECTED' ? 'destructive' :
                                                    aspiration.status === 'PROCESSING' ? 'secondary' : 'outline'
                                        }
                                    >
                                        {aspiration.status}
                                    </Badge>
                                </Table.Cell>
                                <Table.Cell className="text-muted-foreground">
                                    {aspiration.createdAt ? format(aspiration.createdAt, 'MMM d, yyyy') : '-'}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className="flex items-center gap-3 text-muted-foreground text-xs">
                                        <span className="flex items-center gap-1">
                                            <MessageCircle size={14} /> {aspiration._count.comments}
                                        </span>
                                        {aspiration.isSpam && (
                                            <span className="flex items-center gap-1 text-destructive font-bold bg-destructive/10 px-2 py-0.5 rounded border border-destructive/20">
                                                <AlertTriangle size={14} /> SPAM
                                            </span>
                                        )}
                                    </div>
                                </Table.Cell>
                                <Table.Cell className="text-right">
                                    <Button size="icon" variant="default" asChild className="w-fit">
                                        <Link href={`/dashboard/aspirations/${aspiration.id}`} className="text-center">
                                            <Eye size={18} className="mr-3" /> View
                                        </Link>
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </Card>
        </section>
    );
};

export default AspirationsPage;

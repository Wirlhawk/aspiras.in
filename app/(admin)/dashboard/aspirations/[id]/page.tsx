import { AdminAspirationActions } from "@/components/features/aspiration/admin-aspiration-actions";
import AspirationDetail from "@/components/features/aspiration/aspiration-detail";
import { ChatInterface } from "@/components/features/aspiration/chat-interface";
import { Alert } from "@/components/retroui/Alert";
import { Button } from "@/components/retroui/Button";
import { getAspirationById } from "@/server/aspiration/aspiration.query";
import { getSessionWithProfile } from "@/server/auth/auth.query";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// ... imports

const AspirationDetailPage = async ({ params }: PageProps<"/dashboard/aspirations/[id]">) => {
    const { id } = await params;
    const [aspiration, sessionData] = await Promise.all([
        getAspirationById(id),
        getSessionWithProfile(),
    ]);

    if (!aspiration) {
        notFound();
    }

    const { profile } = sessionData || {};

    return (
        <section className="space-y-6">

            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/dashboard/aspirations">
                        <ArrowLeft size={18} />
                    </Link>
                </Button>
                <h1 className="text-2xl font-head">Aspiration Details</h1>
                <div className="ml-auto">
                    <AdminAspirationActions id={aspiration.id} currentStatus={aspiration.status} />
                </div>
            </div>

            {aspiration.isSpam && (
                <Alert status="error" variant="default" className="flex items-center gap-4 border-2 border-red-800 bg-red-50">
                    <AlertTriangle className="h-5 w-5 text-red-800" />
                    <div>
                        <Alert.Title className="text-red-900 font-bold">Spam Detected</Alert.Title>
                        <Alert.Description className="text-red-800 font-medium">
                            This aspiration has been automatically marked as spam or inappropriate content.
                        </Alert.Description>
                    </div>
                </Alert>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                <div className="space-y-6">
                    {/* Aspiration Content - using reusable component */}
                    <AspirationDetail
                        aspiration={aspiration}
                        className="mt-0 w-full max-w-none mt-5"
                    />
                </div>

                <ChatInterface
                    aspirationId={aspiration.id}
                    comments={aspiration.comments}
                    currentUserId={profile?.id || ""}
                    aspirationStatus={aspiration.status}
                />
            </div>

        </section>
    );
};

export default AspirationDetailPage;

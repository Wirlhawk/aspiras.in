import CreateAspirationForm from "@/components/features/aspiration/form/create-aspiration-form"
import { requireAuth } from "@/server/utils/require-auth"
import { getAllCategories } from "@/server/category/category.query"
import Link from "next/link"
import { Button } from "@/components/retroui/Button"
import { ArrowLeft } from "lucide-react"

const CreateAspirationPage = async () => {
    await requireAuth()
    const categories = await getAllCategories()

    return (
        <section className="h-full w-full space-y-8 p-8">
            <div className="flex items-center just gap-4">
                <Link href="/home">
                    <Button variant="secondary" size={"sm"} className="group">
                        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Back
                    </Button>
                </Link>
            </div>

            <CreateAspirationForm categories={categories} />


        </section>
    )
}

export default CreateAspirationPage

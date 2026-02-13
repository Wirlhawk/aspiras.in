import CategoryTable from '@/components/features/category/category-table'
import { getAllCategories } from '@/server/category/category.query'

const CategoriesPage = async () => {
    const categories = await getAllCategories()

    return (
        <section className="p-8">
            <CategoryTable categories={categories} />
        </section>
    )
}

export default CategoriesPage

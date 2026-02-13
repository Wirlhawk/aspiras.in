import ClassTable from '@/components/features/class/class-table'
import { getAllClasses } from '@/server/class/class.query'

const ClassPage = async () => {
    const classes = await getAllClasses()

    return (
        <section className="p-8">
            <ClassTable classes={classes} />
        </section>
    )
}

export default ClassPage

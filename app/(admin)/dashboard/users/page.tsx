import StudentTable from '@/components/features/student/student-table'
import { getAllClasses } from '@/server/class/class.query'
import { getAllStudents } from '@/server/student/student.query'

const UsersPage = async () => {
    const [students, classes] = await Promise.all([
        getAllStudents(),
        getAllClasses(),
    ])

    return (
        <section>
            <StudentTable students={students} classes={classes} />
        </section>
    )
}

export default UsersPage

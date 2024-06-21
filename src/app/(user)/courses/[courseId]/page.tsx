

export default function CoursePage({
    params
}: 
{
    params: { courseId: number }
}) {
    return (
        <div>
            <h1>Course ID: {params.courseId}</h1>
        </div>
    )
}
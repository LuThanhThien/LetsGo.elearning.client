import { z } from "zod";


export const CourseSearchSchema = z.object({
    filters: z.array(z.string()).optional(),
    searchValue: z.string().optional(),
    sortBy: z.string().optional(),
})

export type CourseSearchDto = z.infer<typeof CourseSearchSchema>

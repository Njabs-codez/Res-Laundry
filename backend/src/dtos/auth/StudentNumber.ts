import * as z from "zod"
import { studentNumberRegex } from "../../lib/regex.ts";

export const StudentNumber = z.object({
    studentNumber: z.string().regex(studentNumberRegex, { 
        error: "Invalid student number format. Must in format 'uXXXXXXXX', where X are the digits of your student number." 
    })
})
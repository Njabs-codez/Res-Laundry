import * as z from "zod"
import { studentNumberRegex } from "../../lib/regex.ts";
import sanitisedString from "../../lib/sanitisedString.ts";

export const StudentNumber = z.object({
    studentNumber: z.string().trim().regex(studentNumberRegex, { 
        error: "Invalid student number format. Must in format 'uXXXXXXXX', where X are the digits of your student number." 
    }).pipe(sanitisedString)
})
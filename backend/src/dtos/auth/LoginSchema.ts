import * as z from "zod"
import sanitisedString from "../../lib/sanitisedString.ts"
import { passwordRegex, studentNumberRegex } from "../../lib/regex.ts"

export const LoginSchema = z.object({
    studentNumber: z.string().trim().regex(studentNumberRegex, { 
        error: "Invalid student number format. Must in format 'uXXXXXXXX', where X are the digits of your student number." 
    }).pipe(sanitisedString),
    password: z.string().trim().regex(passwordRegex, { 
        error: "Invalid password format. Must be at least 8 characters and contain at least one number, symbol and capital letter." 
    }).pipe(sanitisedString),
})
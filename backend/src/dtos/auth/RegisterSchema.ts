import * as z from "zod"
import { passwordRegex, roomNoRegex, phoneNumberRegex, studentNumberRegex } from "../../lib/regex.ts"
import sanitisedString from "../../lib/sanitisedString.ts"

export const RegisterSchema = z.object({
    studentNumber: z.string().trim().regex(studentNumberRegex, { 
        error: "Invalid student number format. Must be in format 'uXXXXXXXX', where X are the digits of your student number." 
    }).pipe(sanitisedString),
    password: z.string().trim().regex(passwordRegex, { 
        error: "Invalid password format. Must be at least 8 characters and contain at least one number, symbol and capital letter." 
    }),
    cellNumber: z.string().trim().regex(phoneNumberRegex, { 
        error: "Invalid phone number format. Must be exactly 10 characters long, start with a zero and contain 9 numbers after the zero (e.g. 0123456789)." 
    }).pipe(sanitisedString)
})
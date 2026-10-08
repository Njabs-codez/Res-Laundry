import * as z from "zod"
import { passwordRegex, roomNoRegex, phoneNumberRegex, studentNumberRegex } from "../../lib/regex.ts"

export const RegisterSchema = z.object({
    studentNumber: z.string().regex(studentNumberRegex, { 
        error: "Invalid student number format. Must be in format 'uXXXXXXXX', where X are the digits of your student number." 
    }),
    firstName: z.string().min(3, { 
        error: "'First name' must be at least 3 characters long."
    }),
    lastName: z.string().min(3, { 
        error: "'Last name' must be at least 3 characters long."
    }),
    password: z.string().regex(passwordRegex, { 
        error: "Invalid password format. Must be at least 8 characters and contain at least one number, symbol and capital letter." 
    }),
    roomNumber: z.string().regex(roomNoRegex, { 
        error: "Invalid room number format. Must be in format 'AX-XX'/'BX-XX' or 'AX-XXX'/'BX-XXX', where X are the digits of your room number." 
    }),
    cellNumber: z.string().regex(phoneNumberRegex, { 
        error: "Invalid phone number format. Must be exactly 10 characters long, start with a zero and contain 9 numbers after the zero (e.g. 0123456789)." 
    })
})
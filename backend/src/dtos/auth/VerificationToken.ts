import * as z from "zod"
import sanitisedString from "../../lib/sanitisedString.ts"

export const VerificationToken = z.object({
    verificationToken: z.string().trim().min(64, {
        error: "Invalid verification token"
    }).max(128, {
        error: "Invalid verification token"
    }).pipe(sanitisedString)
})
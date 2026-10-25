import * as z from "zod"
import dotenv from "dotenv"
import path from "path"

dotenv.config({
    path: path.resolve(import.meta.dirname, "../../../.env")
})

const envSchema = z.object({
    PG_USER: z.string().min(1),
    PG_PASSWORD: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    APPLICATION_URL: z.string().min(1).default("http://localhost:3000")
})

const parsed = envSchema.safeParse(process.env)
if(!parsed.success){
    throw new Error(`Invalid env: ${parsed.error.message}`)
}

export const env = parsed.data
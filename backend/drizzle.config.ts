import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
import path from 'path'

config({ path: path.resolve(import.meta.dirname, '../.env')})

export default defineConfig({
    out: './src/database/migrations',
    schema: './src/database/models',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
})
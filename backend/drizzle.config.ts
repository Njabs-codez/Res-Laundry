import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'
config({ path: '../.env' })

export default defineConfig({
    out: './src/database/migrations',
    schema: './src/database/models/**/*',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL as string,
    },
    verbose: true,
    strict: true,
})
import { defineConfig } from 'drizzle-kit'
import { env } from './src/data/env'

export default defineConfig({
    out: './src/database/migrations',
    schema: './src/database/models',
    dialect: 'postgresql',
    dbCredentials: {
        url: env.DATABASE_URL,
    },
    verbose: true,
    strict: true,
})
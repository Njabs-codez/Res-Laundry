import { config } from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'

config({ path: '../../../.env' })

const db = drizzle(process.env.DATABASE_URL as string)

export default db
import { drizzle } from 'drizzle-orm/node-postgres'
import { machineUsageRelation } from './relations.ts'

const db = drizzle({ 
    connection: process.env.DATABASE_URL as string,
    relations: machineUsageRelation 
})

export default db
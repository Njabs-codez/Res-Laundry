import { drizzle } from 'drizzle-orm/node-postgres'
import { machineUsageRelation } from './relations.ts'
import { env } from '../data/env.ts'

const db = drizzle({ 
    connection: env.DATABASE_URL,
    relations: machineUsageRelation 
})

export default db
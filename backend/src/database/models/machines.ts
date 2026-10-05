import { integer, pgEnum, pgTable, primaryKey } from "drizzle-orm/pg-core";

export const machineTypeEnum = pgEnum("machine_type", [
    "washing machine",
    "dryer"
])

export const machineStatusEnum = pgEnum("machine_status", [
    "healthy",
    "unhealthy"
])

export const machine = pgTable("machines", {
    number: integer("number").notNull(),
    type: machineTypeEnum().notNull().default("washing machine"),
    status: machineStatusEnum().notNull().default("healthy"),
}, (table) => [
    primaryKey({ columns: [table.number, table.type] })
])
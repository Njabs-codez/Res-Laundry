import { machinesTable, machineTypeEnum } from "./machines.ts";
import { usersTable } from "./users.ts";
import { foreignKey, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const machineUsagesTable = pgTable("machine_usages", {
    id: uuid("id").notNull().defaultRandom().primaryKey(),
    studentNumber: varchar("student_number").notNull(),
    machineNumber: integer("machine_number").notNull(),
    machineType: machineTypeEnum('machine_type').notNull(),
    timeIn: timestamp("time_in").notNull().defaultNow(),
    timeOut: timestamp("time_out"),
    duration: integer("duration").notNull(),
}, (table) => [
    foreignKey({
        columns: [table.machineNumber, table.machineType],
        foreignColumns: [machinesTable.number, machinesTable.type],
    }).onDelete("restrict"),
    foreignKey({
        columns: [table.studentNumber],
        foreignColumns: [usersTable.studentNumber],
    }).onDelete("cascade")
])
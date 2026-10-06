import { defineRelations } from "drizzle-orm"
import { usersTable } from "./models/users.ts"
import { machinesTable } from "./models/machines.ts"
import { machineUsagesTable } from "./models/machineUsage.ts"

export const machineUsageRelation = defineRelations(
    { usersTable, machinesTable, machineUsagesTable }, 
    (rls) => ({
        machinesTable: {
            usage: rls.many.machineUsagesTable({
                from: [rls.machinesTable.number, rls.machinesTable.type],
                to: [rls.machineUsagesTable.machineNumber, rls.machineUsagesTable.machineType]
            })
        },
        usersTable: {
            usage: rls.many.machineUsagesTable({
                from: rls.usersTable.studentNumber,
                to: rls.machineUsagesTable.studentNumber
            })
        },
        machineUsagesTable: {
            resident: rls.one.usersTable({
                from: rls.machineUsagesTable.studentNumber,
                to: rls.usersTable.studentNumber
            }),
            machine: rls.one.machinesTable({
                from: rls.machineUsagesTable.machineNumber,
                to: rls.machinesTable.number
            })
        }
}))
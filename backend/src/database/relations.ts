import { defineRelations } from "drizzle-orm"
import { usersTable } from "./models/users.ts"
import { machinesTable } from "./models/machines.ts"
import { machineUsagesTable } from "./models/machineUsage.ts"

export const machineUsageRelation = defineRelations(
    { usersTable, machinesTable, machineUsagesTable }, 
    (rls) => ({
        machinesTable: {
            usage: rls.many.usersTable({
                from: [
                    rls.machinesTable.number.through(rls.machineUsagesTable.machineNumber),
                    rls.machinesTable.type.through(rls.machineUsagesTable.machineType)
                ],
                to: rls.usersTable.studentNumber.through(rls.machineUsagesTable.studentNumber),
            }),
            usageLog: rls.many.machineUsagesTable({
                from: [
                    rls.machinesTable.number,
                    rls.machinesTable.type
                ],
                to: [
                    rls.machineUsagesTable.machineNumber,
                    rls.machineUsagesTable.machineType
                ]
            }),
        },
        usersTable: {
            usage: rls.many.machinesTable({
                from: rls.usersTable.studentNumber.through(rls.machineUsagesTable.studentNumber),
                to: [
                    rls.machinesTable.number.through(rls.machineUsagesTable.machineNumber),
                    rls.machinesTable.type.through(rls.machineUsagesTable.machineType),
                ],
            }),
            usageLog: rls.many.machineUsagesTable({
                from: rls.usersTable.studentNumber,
                to: rls.machineUsagesTable.studentNumber
            }),
        },
        machineUsagesTable: {
            resident: rls.one.usersTable({
                from: rls.machineUsagesTable.studentNumber,
                to: rls.usersTable.studentNumber
            }),
            machine: rls.one.machinesTable({
                from: [
                    rls.machineUsagesTable.machineNumber,
                    rls.machineUsagesTable.machineType
                ],
                to: [
                    rls.machinesTable.number,
                    rls.machinesTable.type
                ]
            })
        }
}))
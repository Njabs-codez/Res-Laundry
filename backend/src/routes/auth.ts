import { Hono } from "hono"
import db from '../database/db.ts'
import { usersTable } from "../database/models/users.ts"
import { machineUsagesTable } from "../database/models/machineUsage.ts"
import { eq } from "drizzle-orm"

const app = new Hono()

app.get("/", async (ctx) => {
    const users = await db.select({ 
        firsName: usersTable.firstName,
        lastName: usersTable.lastName,
        roomNumber: usersTable.roomNumber,
        machineNumber: machineUsagesTable.machineNumber,
        machineType: machineUsagesTable.machineType,
    }).
    from(usersTable)
    .leftJoin(
        machineUsagesTable, 
        eq(usersTable.studentNumber, machineUsagesTable.studentNumber)
    )

    return ctx.json({
        users
    })
})


export default app;
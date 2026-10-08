import { Hono } from "hono"
import db from '../database/db.ts'
import { LoginSchema } from "../dtos/auth/LoginSchema.ts"
import { RegisterSchema } from "../dtos/auth/RegisterSchema.ts"
import { zValidator } from "@hono/zod-validator"
import { usersTable } from "../database/models/users.ts"
import { eq } from "drizzle-orm"
import { StudentNumber } from "../dtos/auth/StudentNumber.ts"


const app = new Hono({strict: false})

app.post("/", zValidator('json', StudentNumber), async (ctx) => {
    const data = ctx.req.valid("json")
    
    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.studentNumber, data.studentNumber))
    if(!user){
        return ctx.json({
            message: `Student number '${data.studentNumber}' might not be a College Man.`
        }, 404)
    }

    return ctx.json({
        studentNumber: user.studentNumber
    })
})

app.post("/register", zValidator("json", RegisterSchema), async (ctx) => {

})

app.post("/login", zValidator("json", LoginSchema), async (ctx) => {

})

app.post("/refresh", async (ctx) => {

})


export default app;
import { Hono } from "hono"
import { randomBytes } from "node:crypto"
import { zValidator } from "@hono/zod-validator"
import { eq, like } from "drizzle-orm"

import db from '../database/db.ts'
import { LoginSchema } from "../dtos/auth/LoginSchema.ts"
import { RegisterSchema } from "../dtos/auth/RegisterSchema.ts"
import { usersTable } from "../database/models/users.ts"
import { StudentNumber } from "../dtos/auth/StudentNumber.ts"
import { VerificationToken } from "../dtos/auth/VerificationToken.ts"

const app = new Hono({strict: false})


app.get("/", async (ctx) => {
    const query = ctx.req.query("search")?.trim()

    const studentNumbers = await db.select({ studentNumber: usersTable.studentNumber })
                                    .from(usersTable)
                                    .where(
                                        query ? 
                                        like(usersTable.studentNumber, `%${query}%`) :
                                        undefined
                                    )
                                    .limit(10)
    return ctx.json({
        studentNumbers
    })

})

app.post("/", zValidator('json', StudentNumber), async (ctx) => {
    const studentNumber = ctx.req.valid("json").studentNumber
    
    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.studentNumber, studentNumber))
    if(!user){
        return ctx.json({
            message: `Student number '${studentNumber}' might not be a College Man.`
        }, 404)
    }

    // send confirmation email
    const email = `${user.studentNumber}@tuks.co.za`
    const verificationToken = randomBytes(64).toString("hex")
    
    // swap this out for a call to send an email
    console.log("email: " + email, "\nverification token: " + verificationToken)


    return ctx.json({
        message: "Student number confirmed. A verification email has been sent to the relevant student email."
    })
})

app.post("/verification", zValidator("json", VerificationToken), async (ctx) => {
    const vToken = ctx.req.valid("json").verificationToken
    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.verificationToken, vToken))
    
    if(!user){
        return ctx.json({
            message: "No user associated with this token was found."
        }, 404)
    }

    await db.update(usersTable)
            .set({
                verificationToken: null
            })
            .where(eq(usersTable.studentNumber, user.studentNumber))

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
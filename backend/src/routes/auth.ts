import { Hono } from "hono"
import { randomBytes } from "node:crypto"
import { zValidator } from "@hono/zod-validator"
import { eq, like } from "drizzle-orm"
import { getCookie, setCookie } from "hono/cookie"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { sign } from "hono/jwt"
import { streamSSE } from "hono/streaming"
import DOMPurify from "isomorphic-dompurify"

import db from "../database/db.ts"
import { env } from "../data/env.ts"
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../lib/constants.ts"
import { LoginSchema } from "../dtos/auth/LoginSchema.ts"
import { RegisterSchema } from "../dtos/auth/RegisterSchema.ts"
import { usersTable } from "../database/models/users.ts"
import { StudentNumber } from "../dtos/auth/StudentNumber.ts"
import { VerificationSchema } from "../dtos/auth/VerificationSchema.ts"


const app = new Hono()


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
    let verificationToken = randomBytes(16).toString("hex")
    while(true){
        const [existing] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.verificationToken, verificationToken))
                        .limit(1)
        if(!existing)
            break

        verificationToken = randomBytes(16).toString("hex")
    }

    await db.update(usersTable)
            .set({ verificationToken })
            .where(eq(usersTable.studentNumber, studentNumber))

    
    // TODO: swap this out for a call to send an email
    console.log("email: " + email, "\nverification token: " + verificationToken)


    return ctx.json({
        message: "Student number confirmed. A verification email has been sent to the relevant student email."
    })
})

app.post("/verification", zValidator("json", VerificationSchema), async (ctx) => {
    const vToken = ctx.req.valid("json").verificationToken

    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.verificationToken, vToken))
    
    if(!user){
        return ctx.json({
            message: "Provided token was not issued or is no longer valid."
        }, 404)
    }

    const onboardingToken = randomBytes(16).toString("hex")
    await db.update(usersTable)
            .set({
                verificationToken: null,
                onboardingToken
            })
            .where(eq(usersTable.studentNumber, user.studentNumber))

    // give an onboarding token or sumn
    return ctx.json({
        onboardingToken
    })
})

app.post("/register", zValidator("json", RegisterSchema), async (ctx) => {
    const userData = ctx.req.valid("json")
    const onboardingToken = ctx.req.header("X-Onboarding-Token")

    if(!onboardingToken){
        return ctx.json({ message: "Missing onboarding token " }, 401)
    }

    if(!userData){
        return ctx.json({
            message: "Expected a body for this requested."
        }, 400)
    }

    // sanitise
    for(const key of Object.keys(userData) as (keyof typeof userData)[]){
        if(key !== "password")
            userData[key] = DOMPurify.sanitize(userData[key])
    }

    const salt = genSaltSync(12)
    const hashedPassword = hashSync(userData.password, salt)

    const [updated] = await db.update(usersTable)
                            .set({ ...userData, password: hashedPassword })
                            .where(eq(usersTable.studentNumber, userData.studentNumber))
                            .returning()

    // TODO: swap random text bytes field with a "better" string generation step
    const now = Date.now();
    const payload = {
        sub: updated.studentNumber,
        role: updated.role,
        exp: now + ACCESS_TOKEN_TTL
    }
    const access = await sign(payload, env.JWT_SECRET)

    payload.exp = now + REFRESH_TOKEN_TTL
    const refresh = await sign(payload, env.JWT_SECRET)

    setCookie(ctx, "refreshToken", refresh, {
        sameSite: "strict",
        httpOnly: true,
        secure: true
    })

    return ctx.json({ accessToken: access })
})

app.post("/login", zValidator("json", LoginSchema), async (ctx) => {
    
})

app.post("/refresh", async (ctx) => {

})


export default app;
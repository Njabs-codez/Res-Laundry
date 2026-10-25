import { Hono } from "hono"
import { randomBytes } from "node:crypto"
import { zValidator } from "@hono/zod-validator"
import { eq, like } from "drizzle-orm"
import { getCookie, setCookie } from "hono/cookie"
import { genSaltSync, hashSync, compareSync } from "bcrypt-ts"
import { sign } from "hono/jwt"
import DOMPurify from "isomorphic-dompurify"

import db from "../database/db.ts"
import { env } from "../data/env.ts"
import { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } from "../lib/constants.ts"
import { LoginSchema } from "../dtos/auth/LoginSchema.ts"
import { RegisterSchema } from "../dtos/auth/RegisterSchema.ts"
import { usersTable } from "../database/models/users.ts"
import { StudentNumber } from "../dtos/auth/StudentNumber.ts"
import { VerificationSchema } from "../dtos/auth/VerificationSchema.ts"
import sendEmail from "../emails/sendEmail.ts"


const app = new Hono()


app.get("/", async (c) => {
    const query = c.req.query("search")?.trim()

    const studentNumbers = await db.select({ studentNumber: usersTable.studentNumber })
                                    .from(usersTable)
                                    .where(
                                        query ? 
                                        like(usersTable.studentNumber, `%${query}%`) :
                                        undefined
                                    )
                                    .limit(10)
    return c.json({
        studentNumbers
    })

})

app.post("/", zValidator('json', StudentNumber), async (c) => {
    const studentNumber = c.req.valid("json").studentNumber
    
    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.studentNumber, studentNumber))
    if(!user){
        return c.json({
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

    sendEmail({
        studentNumber: user.studentNumber,
        firstName: user.firstName,
        lastName: user.lastName,
        email,
        resetPasswordToken: user.resetPasswordToken || "",
        verificationToken
    })
    
    return c.json({
        message: "Student number confirmed. A verification email has been sent to the relevant student email."
    })
})

app.post("/verification", zValidator("json", VerificationSchema), async (c) => {
    const vToken = c.req.valid("json").verificationToken

    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.verificationToken, vToken))
    
    if(!user){
        return c.json({
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
    return c.json({
        studentNumber: user.studentNumber,
        onboardingToken
    })
})

app.post("/register", zValidator("json", RegisterSchema), async (c) => {
    const userData = c.req.valid("json")
    const onboardingToken = c.req.header("X-Onboarding-Token")

    if(!onboardingToken){
        return c.json({ message: "Missing onboarding token " }, 401)
    }

    if(!userData){
        return c.json({
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

    setCookie(c, "refreshToken", refresh, {
        sameSite: "strict",
        httpOnly: true,
        secure: true
    })

    return c.json({ accessToken: access })
})

app.post("/login", zValidator("json", LoginSchema), async (c) => {
    const userData = c.req.valid("json")
    if(!userData){
        return c.json({
            message: "Expected a body for this requested."
        }, 400)
    }

    const [user] = await db.select()
                        .from(usersTable)
                        .where(eq(usersTable.studentNumber, userData.studentNumber))
    
    if(!user || (user && !compareSync(userData.password, user.password))){
        return c.json({ message: "Invalid credentials" }, 400)
    }

    const now = Date.now();
    const payload = {
        sub: user.studentNumber,
        role: user.role,
        exp: now + ACCESS_TOKEN_TTL
    }
    const access = await sign(payload, env.JWT_SECRET)

    payload.exp = now + REFRESH_TOKEN_TTL
    const refresh = await sign(payload, env.JWT_SECRET)

    setCookie(c, "refreshToken", refresh, {
        sameSite: "strict",
        httpOnly: true,
        secure: true
    })

    return c.json({ accessToken: access })
})

app.post("/refresh", async (c) => {
    const refToken = getCookie(c, "refreshToken")
    console.log("refreshToken from cookies", refToken)
    

    return c.json({ accessToken: "sumn slight" })
})

app.post("/reset-password", async (c) => {

})


export default app;
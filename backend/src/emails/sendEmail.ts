import { Resend } from "resend"
import { env } from "../data/env.ts"
import verificationEmailTemplate from "./templates/verification.ts"
import forgotPasswordEmailTemplate from "./templates/forgotPassword.ts"

const resend = new Resend(env.RESEND_API_KEY)

export default function sendEmail(
    user: {
        studentNumber: string,
        firstName: string,
        lastName: string,
        email: string,
        resetPasswordToken: string,
        verificationToken: string,
    }, 
    verification: boolean = true
){
    const { html, text } = verification ? verificationEmailTemplate(user) : forgotPasswordEmailTemplate(user)
    resend.emails.send({
        from: env.APP_EMAIL /* Gotta actually have this jawn */,
        to: user.email,
        subject: verification ? "Identity Verification" : "Password Reset",
        html,
        text
    })
}
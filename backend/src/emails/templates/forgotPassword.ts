import { env } from "../../data/env.ts"

export default function forgotPasswordEmailTemplate(user: {
    firstName: string,
    lastName: string,
    resetPasswordToken: string
}){
    const html = `
        <h1>Password Reset</h1>
        <p>Dear ${user.firstName} ${user.lastName}</p>
        <br/>
        <p>A password reset was requested for your account. If this wasn't you, please precautionary action and report this incident to the EC.</p>
        <p>To reset your password please click the button below</p>
        <a href="${env.APPLICATION_URL}/reset-password?token=${user.resetPasswordToken}">
          Reset Password
        </a>
        <br/>
        <p>Kind regards</p>
        <p>VDB Laundry</p>
    `
    const text = `
        Dear ${user.firstName} ${user.lastName}\n\n
        A password reset was requested for your account. If this wasn't you, please precautionary action and report this incident to the EC.
        To reset your password please click the link below:\n
        ${env.APPLICATION_URL}/reset-password?token=${user.resetPasswordToken}\n\n
        Kind regards\n
        VDB Laundry
    `

    return {
        html,
        text
    }
}
import { env } from "../../data/env.ts"

export default function verificationEmailTemplate(user: {
    studentNumber: string,
    firstName: string,
    lastName: string,
    verificationToken: string
}){
    const html = `
        <h1>Student Verification</h1>
        <p>Dear ${user.firstName} ${user.lastName}</p>
        <br/>
        <p>The following email was sent to you in order to verify whether your student number is <strong>${user.studentNumber}</strong>.</p>
        <p>Please click the button below to complete your verification and registration</p>
        <a href="${env.APPLICATION_URL}/onboarding?token=${user.verificationToken}">
          Complete Verification
        </a>
        <br/>
        <p>Kind regards</p>
        <p>VDB Laundry</p>
    `
    const text = `
        Dear ${user.firstName} ${user.lastName}\n\n
        The following email was sent to you in order to verify whether your student number is ${user.studentNumber}.
        Please click the link below to complete your verification and registration:\n
        ${env.APPLICATION_URL}/onboarding?token=${user.verificationToken}\n\n
        Kind regards\n
        VDB Laundry
    `

    return {
        html,
        text
    }
    
}
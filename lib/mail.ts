import { Resend } from "resend"
import { EmailTemplate } from "@/components/email-template"
import React from "react"

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendVerificationEmail = async (email: string, token: string, name = "User") => {
  const verificationLink = `${process.env.NEXT_PUBLIC_VERIFICATION_URL}?token=${token}`

  await resend.emails.send({
    from: "Coffeeandcream <office@coffeeandcream.net>",
    to: email,
    subject: "Welcome to Private Password Manager!",
    text: `Welcome, ${name}! Verify your email by clicking the link: ${verificationLink}`
    // react: EmailTemplate({ name, verificationLink }) as React.ReactElement
  })
}

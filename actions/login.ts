"use server"

import { signIn } from "@/auth"
import { getUserByEmail } from "@/lib/db-actions/user"
import { sendVerificationEmail } from "@/lib/mail"
import { AuthData, AuthDataType } from "@/lib/resolvers"
import { generateVerificationToken } from "@/lib/tokens"
import { AuthError } from "next-auth"

export const login = async (values: AuthDataType) => {
  const validatedFields = AuthData.safeParse(values)
  if (!validatedFields.success) return { error: "Invalid fields" }

  const { email, password } = validatedFields.data
  const existingUser = await getUserByEmail(email)

  if (!existingUser || !existingUser.email || !existingUser.password) return { error: "Invalid credentials!" }
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(existingUser.email)
    if (!verificationToken) return { error: "Something went wrong" }
    await sendVerificationEmail(email, verificationToken.token)
    return { success: "Confirmation email sent" }
  }

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
  return { success: "Logged in!" }
}

export const oauthLogin = async (provider: string) => {
  try {
    await signIn(provider, { callbackUrl: "/dashboard" })
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "OAuthSignInError":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
  return { success: "Logged in!" }
}

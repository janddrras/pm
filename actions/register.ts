"use server"

import { AuthData, AuthDataType } from "@/lib/resolvers"
import { encrypt } from "@/lib/utils"
import { createUser, getUserByEmail, updateUser } from "@/lib/db-actions/user"
import { generateVerificationToken } from "@/lib/tokens"
import { sendVerificationEmail } from "@/lib/mail"
import { deleteVerificationToken, getVerificationTokenByToken } from "@/lib/db-actions/token"
import { signIn } from "@/auth"
import { AuthError } from "next-auth"

export const register = async (values: AuthDataType) => {
  const validatedFields = AuthData.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, name, password } = validatedFields.data

  const encryptedPassword = encrypt(password)

  const user = await getUserByEmail(email)

  if (user) {
    return { error: "User already exists" }
  }

  await createUser({ email, name, password: encryptedPassword })

  const verificationToken = await generateVerificationToken(email)
  if (!verificationToken) return { error: "Something went wrong" }

  await sendVerificationEmail(email, verificationToken.token, name)

  return { success: "Confirmation email sent" }
}

export const tokenVerification = async (token: string) => {
  const verificationToken = await getVerificationTokenByToken(token)

  if (!verificationToken) {
    return { error: "Invalid token" }
  }

  if (new Date() > new Date(verificationToken.expires)) {
    return { error: "Token expired" }
  }

  const existingUser = await getUserByEmail(verificationToken.email)

  if (!existingUser) {
    return { error: "User not found" }
  }

  await updateUser(existingUser.id, { ...existingUser, emailVerified: new Date(), email: verificationToken.email })
  await deleteVerificationToken(verificationToken.id)

  return { success: "Email verified" }
}

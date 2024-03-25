"use server"

import { deleteResetToken, getResetTokenByToken } from "@/lib/db-actions/token"
import { getUserByEmail, updateUser } from "@/lib/db-actions/user"
import { sendResetPasswordEmail } from "@/lib/mail"
import { AuthDataType, NewPasswordType } from "@/lib/resolvers"
import { generateResetToken } from "@/lib/tokens"
import { encrypt } from "@/lib/utils"

export const resetPassword = async (values: AuthDataType) => {
  const { email } = values
  if (!email) return { error: "Invalid email" }

  const existingUser = await getUserByEmail(email)
  if (!existingUser) return { error: "User not found" }

  const resetToken = await generateResetToken(email)
  if (!resetToken) return { error: "Something went wrong" }

  await sendResetPasswordEmail(resetToken.email, resetToken.token)

  return { success: "Reset password link sent to your email" }
}

export const changePassword = async (values: NewPasswordType, token?: string | null) => {
  if (!token) return { error: "Invalid token" }
  const existingToken = await getResetTokenByToken(token)
  if (!existingToken) return { error: "Invalid token" }
  if (new Date() > new Date(existingToken.expires)) return { error: "Token expired" }

  const existingUser = await getUserByEmail(existingToken.email)
  if (!existingUser) return { error: "User not found" }
  const encryptedPassword = encrypt(values.password)

  await updateUser(existingUser.id, { ...existingUser, password: encryptedPassword })
  await deleteResetToken(existingToken.id)
  return { success: "Password updated" }
}

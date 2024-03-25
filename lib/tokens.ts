import { v4 as uuid } from "uuid"
import {
  createResetToken,
  createVerificationToken,
  deleteResetToken,
  deleteVerificationToken,
  getResetTokenByEmail,
  getVerificationTokenByEmail
} from "./db-actions/token"

export const generateVerificationToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24) // 24 hours

  const existingToken = await getVerificationTokenByEmail(email)
  if (existingToken) {
    await deleteVerificationToken(existingToken.id)
  }

  const verificationToken = await createVerificationToken(email, token, expires)

  return verificationToken
}

export const generateResetToken = async (email: string) => {
  const token = uuid()
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60 * 24) // 24 hours

  const existingToken = await getResetTokenByEmail(email)
  if (existingToken) {
    await deleteResetToken(existingToken.id)
  }

  const verificationToken = await createResetToken(email, token, expires)

  return verificationToken
}

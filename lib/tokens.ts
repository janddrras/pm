import { v4 as uuid } from "uuid"
import { createVerificationToken, deleteVerificationToken, getVerificationTokenByEmail } from "./db-actions/verification-token"

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

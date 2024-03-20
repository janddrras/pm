import db from "@/lib/db"

export const getVerificationTokenByEmail = async (email: string) => {
  try {
    const verificationToken = await db.verificationToken.findFirst({ where: { email } })
    return verificationToken
  } catch {
    return null
  }
}

export const getVerificationTokenByToken = async (token: string) => {
  try {
    const verificationToken = await db.verificationToken.findUnique({ where: { token } })
    return verificationToken
  } catch {
    return null
  }
}

export const createVerificationToken = async (email: string, token: string, expires: Date) => {
  try {
    const verificationToken = await db.verificationToken.create({
      data: {
        email,
        token,
        expires
      }
    })
    return verificationToken
  } catch {
    return null
  }
}

export const deleteVerificationToken = async (id: string) => {
  try {
    await db.verificationToken.delete({ where: { id } })
    return true
  } catch {
    return false
  }
}

import db from "@/db"

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
    return null
  }
}

export const getResetTokenByEmail = async (email: string) => {
  try {
    const resetToken = await db.resetToken.findFirst({ where: { email } })
    return resetToken
  } catch {
    return null
  }
}

export const getResetTokenByToken = async (token: string) => {
  try {
    const resetToken = await db.resetToken.findUnique({ where: { token } })
    return resetToken
  } catch {
    return null
  }
}

export const createResetToken = async (email: string, token: string, expires: Date) => {
  try {
    const resetToken = await db.resetToken.create({
      data: {
        email,
        token,
        expires
      }
    })
    return resetToken
  } catch {
    return null
  }
}

export const deleteResetToken = async (id: string) => {
  try {
    await db.resetToken.delete({ where: { id } })
    return true
  } catch {
    return null
  }
}

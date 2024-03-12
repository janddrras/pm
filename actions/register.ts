"use server"

import { AuthData, AuthDataType } from "@/lib/resolver"
import { decrypt, encrypt } from "@/lib/utils"
import db from "@/lib/db"

export const register = async (values: AuthDataType) => {
  const validatedFields = AuthData.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, name, password } = validatedFields.data

  const encryptedPassword = encrypt(password)

  const user = await db.user.findUnique({ where: { email } })

  if (user) {
    return { error: "User already exists" }
  }

  await db.user.create({
    data: {
      email,
      name,
      password: encryptedPassword
    }
  })

  return { success: "OK" }
}

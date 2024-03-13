"use server"

import { AuthData, AuthDataType } from "@/lib/resolver"
import { encrypt } from "@/lib/utils"
import { createUser, getUserByEmail } from "@/lib/db-actions/user"

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

  return { success: "OK" }
}

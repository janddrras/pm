import db from "@/lib/db"
import { AuthDataType } from "../resolver"

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } })
    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id } })
    return user
  } catch {
    return null
  }
}

export const createUser = async ({ email, name, password }: AuthDataType) => {
  try {
    const user = await db.user.create({
      data: {
        email,
        name,
        password
      }
    })
    return user
  } catch {
    return null
  }
}

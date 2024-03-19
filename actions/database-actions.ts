"use server"

import { auth } from "@/lib/auth"
import { getAllPasswords, createPassword, deleteData, updateData, getPassword } from "@/lib/db-actions/data"
import { getUserByEmail } from "@/lib/db-actions/user"
import { AccessDataType } from "@/lib/resolver"
import { revalidatePath } from "next/cache"

export const fetchPasswords = async () => {
  const user = await getUserFromAuth()
  const passwords = await getAllPasswords(user!.id)
  return passwords
}

export const findOnePassword = async (id: string) => {
  const password = await getPassword(id)
  return password
}

export const createNewPassword = async (values: AccessDataType) => {
  const user = await getUserFromAuth()
  createPassword({ ...values, userId: user!.id })
  revalidatePath("/dashboard")
  return { success: "OK" }
}

export const deletePassword = async (id: string) => {
  await deleteData(id)
  revalidatePath("/dashboard")
  return { success: "OK" }
}

export const updatePassword = async (id: string, values: AccessDataType) => {
  const updatedPassword = await updateData(id, values)
  revalidatePath("/dashboard")
  return updatedPassword
}

export const getUserFromAuth = async () => {
  const session = await auth()
    .then((res) => JSON.stringify(res))
    .then(JSON.parse)
    .catch(console.error)
  if (!session) return null
  const user = session.user
  const currentUser = await getUserByEmail(user.email)
  return currentUser
}

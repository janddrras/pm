"use server"

import { auth } from "@/lib/auth"
import { getAllPasswords, createPassword, deleteData, updateData, getPassword } from "@/lib/db-actions/data"
import { AccessDataType } from "@/lib/resolver"
import { revalidatePath } from "next/cache"

export const fetchPasswords = async () => {
  const session = await auth()
  if (!session?.user) throw new Error("No user found")
  const passwords = await getAllPasswords(session.user.id ?? "")
  return passwords
}

export const findOnePassword = async (id: string) => {
  const password = await getPassword(id)
  return password
}

export const createNewPassword = async (values: AccessDataType) => {
  const session = await auth()
  if (!session?.user) throw new Error("No user found")
  createPassword({ ...values, userId: session.user!.id ?? "" })
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

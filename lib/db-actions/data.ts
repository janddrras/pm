import db from "@/db"

import { AccessDataInputType, AccessDataType } from "../resolvers"
import { decrypt, encrypt } from "../utils"

export const getAllPasswords = async (userId: string) => {
  try {
    const passwords = await db.accessData.findMany({
      where: {
        userId
      }
    })
    return passwords.map((password) => ({
      ...password,
      password: decrypt(password.password)
    }))
  } catch (error) {
    throw error
  }
}

export const getPassword = async (id: string) => {
  try {
    const data = await db.accessData.findUnique({
      where: {
        id
      }
    })
    if (!data) {
      throw new Error("Password not found")
    }
    return { ...data, password: decrypt(data.password) }
  } catch (error) {
    throw error
  }
}

export const createPassword = async (values: AccessDataInputType) => {
  try {
    const passwordData = await db.accessData.create({
      data: { ...values, password: encrypt(values.password) }
    })
    return passwordData
  } catch (error) {
    throw error
  }
}

export const updateData = async (id: string, values: AccessDataType) => {
  try {
    const passwordData = await db.accessData.update({
      where: { id },
      data: {
        ...values,
        password: encrypt(values.password)
      }
    })
    return passwordData
  } catch (error) {
    throw error
  }
}

export const deleteData = async (id: string) => {
  try {
    await db.accessData.delete({ where: { id } })
  } catch (error) {
    throw error
  }
}

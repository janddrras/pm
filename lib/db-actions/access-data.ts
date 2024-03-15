import db from "@/lib/db"

import { AccessDataInputType, AccessDataType } from "../resolver"

export const getAllPasswords = async (userId: string) => {
  try {
    const passwords = await db.accessData.findMany({
      where: {
        userId
      }
    })
    return passwords
  } catch (error) {
    throw error
  }
}

export const getPassword = async (id: string) => {
  try {
    const password = await db.accessData.findUnique({
      where: {
        id
      }
    })
    return password
  } catch (error) {
    throw error
  }
}

export const createPassword = async (values: AccessDataInputType) => {
  try {
    const passwordData = await db.accessData.create({
      data: { ...values }
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
        ...values
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

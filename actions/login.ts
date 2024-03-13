"use server"

import { signIn } from "@/lib/auth"
import { AuthData, AuthDataType } from "@/lib/resolver"
import { AuthError } from "next-auth"

export const login = async (values: AuthDataType) => {
  const validatedFields = AuthData.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  const { email, password } = validatedFields.data

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" })
  } catch (error: any) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" }
        default:
          return { error: "Something went wrong!" }
      }
    }
    throw error
  }
}

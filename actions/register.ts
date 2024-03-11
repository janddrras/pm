"use server"

import { AuthData, AuthDataType } from "@/lib/resolver"

export const register = async (values: AuthDataType) => {
  const validatedFields = AuthData.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields" }
  }

  return { success: "Register success" }
  // 	const res = await fetch("/api/auth/login", {
  // 		method: "POST",
  // 		headers: {
  // 			"Content-Type": "application/json"
  // 		},
  // 		body: JSON.stringify({ email, password })
  // 	})
  //
  // 	if (!res.ok) {
  // 		throw new Error("Failed to login")
  // 	}
  //
  // 	return res.json()
}

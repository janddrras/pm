"use server"

import { AuthData, AuthDataType } from "@/lib/resolver"

export const login = async (values: AuthDataType) => {
  const validateFields = AuthData.safeParse(values)

  if (!validateFields.success) {
    throw new Error(validateFields.error.errors[0].message)
  }

  return { success: "ok" }
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

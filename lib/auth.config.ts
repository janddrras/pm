import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import { AuthData } from "./resolver"
import { getUserByEmail } from "./db-actions/user"
import { decrypt } from "./utils"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = await AuthData.safeParseAsync(credentials)
        if (validatedFields.success) {
          const { email, password } = validatedFields.data
          const user = await getUserByEmail(email)
          if (!user || !user.password) return null
          if (decrypt(user.password) === password) return user
        }
        return null
      }
    })
  ]
} satisfies NextAuthConfig

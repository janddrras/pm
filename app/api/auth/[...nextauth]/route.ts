import NextAuth from "next-auth/next"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    // Providers.Email({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // ...add more providers here
  ],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login",
    verifyRequest: "/verify-request"
    // newUser: null // Will be handled in pages/api/auth/[...nextauth].ts
  }
})

export { handler as GET, handler as POST }

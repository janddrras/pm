import authConfig from "@/lib/auth.config"
import NextAuth from "next-auth"

import { NextRequest } from "next/server"

const { auth: middleware } = NextAuth(authConfig)

type MiddlewareRequestType = NextRequest & { auth: any }

export default middleware((request: MiddlewareRequestType) => {
  const isLogged = !!request.auth

  if (isLogged && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup"))) {
    return Response.redirect(new URL("/dashboard", request.url))
  }

  if (!isLogged && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url))
  }
})

export const config = {
  matcher: ["/login", "/signup", "/dashboard"]
}

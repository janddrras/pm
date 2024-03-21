"use client"

import { tokenVerification } from "@/actions/register"
import Spinner from "@/components/Spinner"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { redirect, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import AuthMessage from "./AuthMessage"

interface TokenVerificationProps {}

const TokenVerification = ({}: TokenVerificationProps) => {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [message, setMessage] = useState<string | undefined>("")
  const [messageType, setMessageType] = useState<"error" | "success">("success")

  const onSubmit = useCallback(() => {
    if (message) return
    if (!token) return

    tokenVerification(token)
      .then((data) => {
        setMessage(data.error || data.success)
        setMessageType(data.error ? "error" : "success")
      })
      .catch((error) => {
        setMessage(error)
        setMessageType("error")
      })
  }, [token, message])

  useEffect(() => {
    onSubmit()
  }, [onSubmit])

  return (
    <Card className="w-84 px-12 pt-4 bg-card/40">
      <CardHeader>
        <CardTitle className="text-primary/70 text-center text-md font-medium">Verifying your email</CardTitle>
      </CardHeader>
      <CardContent className="py-12">{!message ? <Spinner /> : <AuthMessage message={message} messageType={messageType} />}</CardContent>
      <CardFooter className="text-foreground/50 text-center mx-auto">
        Back to{" "}
        <Link href="/signup" className="text-foreground/80 hover:underline ml-2">
          register page
        </Link>
      </CardFooter>
    </Card>
  )
}

export default TokenVerification

// custom react hook to handle form submission

import { useForm } from "react-hook-form"
import { useState, useTransition } from "react"
import { AuthData, AuthDataType } from "@/lib/resolvers"
import { zodResolver } from "@hookform/resolvers/zod"
import { login } from "@/actions/login"
import { register } from "@/actions/register"
import { AuthFormProps } from "@/app/(auth)/_components/AuthForm"
import { resetPassword } from "@/actions/reset"

export const useSubmitAuthForm = ({ mode }: AuthFormProps) => {
  const defaultPassword = mode === "Reset password" ? "password" : ""
  const form = useForm<AuthDataType>({
    resolver: zodResolver(AuthData),
    defaultValues: {
      email: "",
      password: defaultPassword
    }
  })

  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | undefined>("")
  const [messageType, setMessageType] = useState<"error" | "success">("success")

  const handleAuth = (values: AuthDataType) => {
    startTransition(() => {
      if (mode === "Sign up") {
        register(values).then((res) => {
          if (res.error) {
            setMessage(res.error)
            setMessageType("error")
          }
          if (res.success) {
            setMessage(res.success)
            setMessageType("success")
          }
        })
      }
      if (mode === "Log in") {
        login(values).then((res) => {
          if (res) {
            if (res.error) {
              setMessage(res.error)
              setMessageType("error")
            }
            if (res.success) {
              setMessage(res.success)
              setMessageType("success")
            }
          }
        })
      }
      if (mode === "Reset password") {
        resetPassword(values).then((res) => {
          if (res.error) {
            setMessage(res.error)
            setMessageType("error")
          }
          if (res.success) {
            setMessage(res.success)
            setMessageType("success")
          }
        })
      }
    })
  }

  return { form, isPending, handleAuth, message, messageType }
}

"use client"

import { AuthData, AuthDataType } from "@/lib/resolver"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { login } from "@/actions/login"
import { useState, useTransition } from "react"
import AuthMessage from "./AuthMessage"
import { register } from "@/actions/register"

interface AuthFormProps {
  mode: "Log in" | "Sign up"
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const form = useForm<AuthDataType>({
    resolver: zodResolver(AuthData),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const [isPending, startTransition] = useTransition()
  const [message, setMessage] = useState<string | undefined>("")
  const [messageType, setMessageType] = useState<"error" | "success">("success")

  const handleAuth = (values: AuthDataType) => {
    if (mode === "Sign up") {
      startTransition(() => {
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
      })
    }
    if (mode === "Log in") {
      startTransition(() => {
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
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleAuth)}>
        <div className="grid w-full items-center gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="" htmlFor="email">
                  Email
                </FormLabel>
                <FormControl>
                  <Input id="email" placeholder="Your email" {...field} type="email" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {mode === "Sign up" ? (
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="" htmlFor="name">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Your name" {...field} type="text" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="" htmlFor="password">
                  Password
                </FormLabel>
                <FormControl>
                  <Input id="password" placeholder="Your password" {...field} type="password" disabled={isPending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <AuthMessage message={message} messageType={messageType} />
        <Button type="submit" className="w-full mt-4" disabled={isPending}>
          {mode}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm

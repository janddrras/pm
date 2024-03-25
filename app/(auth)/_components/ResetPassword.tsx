"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import AuthMessage from "./AuthMessage"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { NewPasswordResolver, NewPasswordType } from "@/lib/resolvers"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useSearchParams } from "next/navigation"
import { changePassword } from "@/actions/reset"
import Link from "next/link"

const ResetPassword = () => {
  const [message, setMessage] = useState<string | undefined>("")
  const [messageType, setMessageType] = useState<"error" | "success">("success")
  const [isPending, startTransition] = useTransition()

  const params = useSearchParams()
  const token = params.get("token")

  const form = useForm<NewPasswordType>({
    resolver: zodResolver(NewPasswordResolver),
    defaultValues: { password: "" }
  })

  const submitNewPassword = (newPassword: NewPasswordType) => {
    setMessage("")
    startTransition(() => {
      changePassword(newPassword, token)
        .then((res) => {
          if (res.error) {
            setMessageType("error")
            setMessage(res.error)
          } else {
            setMessageType("success")
            setMessage(res.success)
          }
        })
        .catch((err) => {
          setMessageType("error")
          setMessage(err.error)
        })
    })
  }

  return (
    <Card className="w-84 px-12 pt-4 bg-card/40">
      <CardHeader>
        <CardTitle className="text-primary/70 text-center text-md font-medium">Set a new password</CardTitle>
      </CardHeader>
      <CardContent className="py-12">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitNewPassword)}>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="" htmlFor="password">
                    New password
                  </FormLabel>
                  <FormControl>
                    <Input id="password" {...field} type="password" disabled={isPending} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <AuthMessage message={message} messageType={messageType} />
            <Button type="submit" className="w-full mt-8" disabled={isPending}>
              Set password
            </Button>
          </form>
        </Form>
        <CardFooter>
          <div className="pt-6 flex items-center mx-auto">
            <p className="text-foreground/60">Back to</p>
            <Link href="/login" className={buttonVariants({ variant: "link" })}>
              Log in
            </Link>
          </div>
        </CardFooter>
      </CardContent>
    </Card>
  )
}

export default ResetPassword

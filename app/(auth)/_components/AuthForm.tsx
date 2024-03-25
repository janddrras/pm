"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Button, buttonVariants } from "../../../components/ui/button"
import AuthMessage from "./AuthMessage"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSubmitAuthForm } from "@/hooks/useSubmitAuthForm"

export interface AuthFormProps {
  mode: "Log in" | "Sign up" | "Reset password"
}

const AuthForm = ({ mode }: AuthFormProps) => {
  const { form, isPending, handleAuth, message, messageType } = useSubmitAuthForm({ mode })

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
                <FormLabel className={mode === "Reset password" ? "hidden" : ""} htmlFor="password">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    className={mode === "Reset password" ? "hidden" : ""}
                    id="password"
                    placeholder="Your password"
                    {...field}
                    type="password"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {mode === "Log in" && (
          <div className="inline-flex items-center pt-2">
            <p className="text-foreground/60 text-sm">Forgot your password?</p>
            <Link className={cn(buttonVariants({ variant: "link" }))} href="/reset-password">
              Click here!
            </Link>
          </div>
        )}
        <AuthMessage message={message} messageType={messageType} />
        <Button type="submit" className="w-full mt-8" disabled={isPending}>
          {mode}
        </Button>
      </form>
    </Form>
  )
}

export default AuthForm

"use client"

import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { AccessData, CategoryOptions } from "@/lib/resolver"
import type { AccessDataType } from "@/lib/resolver"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import PasswordGenerator from "./PasswordGenerator"

interface NewFormProps {
  rowData?: AccessDataType
}

const PasswordForm = ({ rowData }: NewFormProps) => {
  const form = useForm<AccessDataType>({
    resolver: zodResolver(AccessData),
    defaultValues: rowData || { name: "", username: "", email: "janddrras@gmail.com", category: "other", link: "", password: "" }
  })

  const handleSubmit = (values: AccessDataType) => {
    console.log(values)
  }

  const dialogTitle = rowData ? "Edit password" : "New password"

  const [hash, setHash] = useState(true)

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>Click save when you are done.</DialogDescription>
      </DialogHeader>
      <Separator />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="name">Site</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="username"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="username">Username</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="category"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="category">Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder={field.value} />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CategoryOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            name="link"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="link">Link</FormLabel>
                <FormControl>
                  <Input {...field} id="link" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel htmlFor="password">Password</FormLabel>
                <EyeIcon
                  className="absolute text-foreground/50 cursor-pointer right-2 top-1/2 transform -translate-y-1/4"
                  onClick={() => setHash(!hash)}
                />
                <FormControl>
                  <Input {...field} type={hash ? "password" : "text"} />
                </FormControl>
              </FormItem>
            )}
          />
          <Separator />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
        <Separator />
        <PasswordGenerator setHash={setHash} />
      </FormProvider>
    </DialogContent>
  )
}

export default PasswordForm

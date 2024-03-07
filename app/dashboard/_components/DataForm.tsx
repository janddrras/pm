"use client"

import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type { Access } from "@/lib/data"
import { Separator } from "@/components/ui/separator"
import { useState } from "react"
import { Form } from "@/components/ui/form"

interface NewFormProps {
  rowData?: Access
}

const NewForm = ({ rowData }: NewFormProps) => {
  const [form, setForm] = useState<Access>(
    rowData ?? { id: 0, name: "", username: "", email: "", category: "work", link: "", password: "" }
  )
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevFormData) => ({ ...prevFormData, [e.target.name]: e.target.value }))
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(form)
  }
  const dialogTitle = rowData ? "Edit password" : "New password"
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription>Click save when you are done.</DialogDescription>
      </DialogHeader>
      <Separator />
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Site name
            </Label>
            <Input id="name" value={form.name} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value={form.username} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" value={form.email} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Input id="category" value={form.category} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="link" className="text-right">
              Link
            </Label>
            <Input id="link" value={form.link} className="col-span-3" onChange={handleChange} />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" type="password" value={form.password} onChange={handleChange} className="col-span-3" />
          </div>
        </div>
      </form>
      <Separator />
      <DialogFooter>
        <Button type="submit">Save</Button>
      </DialogFooter>
    </DialogContent>
  )
}

export default NewForm

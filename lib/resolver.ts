import { z } from "zod"

export const CategoryOptions = ["work", "personal", "TV", "social", "other"] as const
const CategoryEnum = z.enum(CategoryOptions)

export const AccessData = z.object({
  id: z.string().optional(),
  name: z.string().min(3, { message: "Must be min 3 characters" }).max(50),
  username: z.string().optional(),
  email: z.string().email({ message: "Invalid email" }).optional(),
  category: CategoryEnum,
  link: z.string(),
  password: z.string().min(3, { message: "Must be min 3 characters" }).max(64)
})

export const PasswordGeneratorParams = z.object({
  new_password: z.string().optional(),
  length: z.number().min(8).max(64),
  numbers: z.boolean(),
  symbols: z.boolean(),
  uppercase: z.boolean()
})

export const AuthData = z.object({
  email: z.string().email({ message: "Invalid email" }),
  name: z.string().optional(),
  password: z.string().min(3, { message: "Must be min 3 characters" }).max(64)
})

export type AuthDataType = z.infer<typeof AuthData>

export type AccessDataInputType = z.infer<typeof AccessData> & { userId: string }

export type PasswordGeneratorParamsType = z.infer<typeof PasswordGeneratorParams>

export type AccessDataType = z.infer<typeof AccessData>

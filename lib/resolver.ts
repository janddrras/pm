import { z } from "zod"

export const CategoryOptions = ["work", "personal", "TV", "social", "other"] as const
const CategoryEnum = z.enum(CategoryOptions)

export const AccessData = z.object({
  id: z.number().optional(),
  name: z.string().min(3, { message: "Must be min 3 characters" }).max(50),
  username: z.string().optional(),
  email: z.string().email("Invalid email"),
  category: CategoryEnum,
  link: z.string(),
  password: z.string().min(3, { message: "Must be min 3 characters" }).max(64)
})

export type AccessData = z.infer<typeof AccessData>

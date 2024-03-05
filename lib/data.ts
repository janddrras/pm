type Category = "work" | "personal" | "TV" | "other"

export type Access = {
  id: number
  name: string
  username: string
  email: string
  category: Category
  link: string
  password: string
}

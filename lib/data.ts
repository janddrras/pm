export const CategoryOptions = ["work", "personal", "TV", "other"] as const
type Category = (typeof CategoryOptions)[number]

export type Access = {
  id: number
  name: string
  username: string
  email: string
  category: Category
  link: string
  password: string
}

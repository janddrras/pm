import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import { fetchPasswords } from "@/actions/database-actions"

export default async function Dashboard() {
  const data = await fetchPasswords()
  if (!data) {
    return <div>Something went wrong</div>
  }

  const formattedData = data.map((item) => ({
    ...item,
    username: item.username || undefined,
    email: item.email || undefined,
    password: item.password.toString()
  }))

  return (
    <main className="container mx-auto py-10 mt-28">
      <DataTable columns={columns} data={formattedData} />
    </main>
  )
}

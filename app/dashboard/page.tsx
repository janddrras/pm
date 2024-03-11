import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import type { AccessDataType } from "@/lib/resolver"
import MockData from "@/lib/MOCK_DATA.json"

async function getData(): Promise<AccessDataType[]> {
  const data = MockData as AccessDataType[]
  return data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <main className="container mx-auto py-10 mt-28">
      <DataTable columns={columns} data={data} />
    </main>
  )
}

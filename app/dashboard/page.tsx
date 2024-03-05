import { columns } from "./_components/columns"
import { DataTable } from "./_components/data-table"
import type { Access } from "@/lib/data"
import MockData from "@/lib/MOCK_DATA.json"

async function getData(): Promise<Access[]> {
  const data = MockData as Access[]
  return data
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

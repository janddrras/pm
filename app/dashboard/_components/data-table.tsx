"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState
} from "@tanstack/react-table"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button, buttonVariants } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import Link from "next/link"
import { CategoryOptions } from "@/lib/data"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: { sorting, columnFilters }
  })

  const pageNumber = table.getPageCount()
  const arr = new Array(pageNumber).fill(0)

  return (
    <div>
      <div className="flex items-center py-4 justify-between">
        <div className="flex items-center space-x-4 justify-between">
          <Input
            placeholder="Search site..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
            className="max-w-sm placeholder:text-foreground/30"
          />
          <Select
            onValueChange={(fieldValue) =>
              fieldValue === "all"
                ? table.getColumn("category")?.setFilterValue(null)
                : table.getColumn("category")?.setFilterValue(fieldValue)
            }
          >
            <SelectTrigger className="w-64">
              <SelectValue placeholder="Category" className="text-foreground/30" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {CategoryOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Link href="/dashboard/access/create" className={buttonVariants({ variant: "default" })}>
          Add new password
        </Link>
      </div>

      <div className="rounded-[var(--radius)] border">
        <Table>
          <TableHeader className=" bg-card/50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pageNumber > 1 && (
        <div className="flex items-center justify-center space-x-4 py-8">
          <Button variant="ghost" size="sm" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronsLeft />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
            <ChevronLeft />
          </Button>
          <div>
            {arr.map((_, index) => (
              <Button
                key={index}
                variant="ghost"
                size="sm"
                onClick={() => table.setPageIndex(index)}
                disabled={table.getState().pagination.pageIndex === index}
              >
                {index + 1}
              </Button>
            ))}
          </div>
          <Button variant="ghost" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            <ChevronRight />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
            <ChevronsRight />
          </Button>
        </div>
      )}
    </div>
  )
}

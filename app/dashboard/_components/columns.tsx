"use client"

import type { Access } from "@/lib/data"
import { ColumnDef } from "@tanstack/react-table"
import { ChevronRightCircle } from "lucide-react"
import ActiveCell from "./ActiveCell"

export const columns: ColumnDef<Access>[] = [
  {
    header: "Name",
    accessorKey: "name",
    cell: ({ row }) => {
      return <span className="text-primary">{row.getValue("name")}</span>
    }
  },
  {
    header: "Username",
    accessorKey: "username",
    cell: ({ row }) => {
      const text: string = row.getValue("username")
      return <ActiveCell text={text} />
    }
  },
  {
    header: "Email",
    accessorKey: "email",
    cell: ({ row }) => {
      const text: string = row.getValue("email")
      return <ActiveCell text={text} />
    }
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => {
      return <span className=" text-gray-600">{row.getValue("category")}</span>
    }
  },
  {
    header: "Link",
    accessorKey: "link",
    cell: ({ row }) => {
      return (
        <a href={`https://${row.getValue("link")}`} className="cursor-pointer text-primary" target="_blank">
          <ChevronRightCircle />
        </a>
      )
    }
  },
  {
    header: "Password",
    accessorKey: "password",
    cell: ({ row }) => {
      const text: string = row.getValue("password")
      return <ActiveCell text={text} />
    }
  }
]

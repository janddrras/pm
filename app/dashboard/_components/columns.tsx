"use client"

import type { AccessDataType } from "@/lib/resolvers"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRightCircle } from "lucide-react"
import ActiveCell from "./ActiveCell"
import RowActions from "./RowActions"

export const columns: ColumnDef<AccessDataType>[] = [
  {
    header: "ID",
    accessorKey: "id"
  },
  {
    header: ({ column }) => {
      return (
        <span
          className="flex space-x-2 items-center cursor-pointer hover:text-foreground"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Site <ArrowUpDown className="ml-2 h-4 w-4" />
        </span>
      )
    },
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
        <a href={`https://${row.getValue("link")}`} className="cursor-pointer text-primary/50 hover:text-primary" target="_blank">
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
  },
  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const formData: AccessDataType = {
        id: row.getValue("id"),
        name: row.getValue("name"),
        username: row.getValue("username"),
        email: row.getValue("email"),
        category: row.getValue("category"),
        link: row.getValue("link"),
        password: row.getValue("password")
      }

      return <RowActions formData={formData} />
    }
  }
]

"use client"

import type { AccessDataType } from "@/lib/resolver"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ChevronRightCircle, MoreHorizontal } from "lucide-react"
import ActiveCell from "./ActiveCell"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader,
  AlertDialogFooter
} from "@/components/ui/alert-dialog"
import DataForm from "./DataForm"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"

const deleteRow = (id: number) => {
  console.log(`Deleting row with id: ${id}`)
}

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

      return (
        <AlertDialog>
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DialogTrigger asChild>
                  <DropdownMenuItem onClick={() => console.log(formData)}>Edit</DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem>
                    <span className="text-red-600">Delete</span>
                  </DropdownMenuItem>
                </AlertDialogTrigger>
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently delete this password.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => deleteRow(formData.id!)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
            <DataForm rowData={formData} />
          </Dialog>
        </AlertDialog>
      )
    }
  }
]

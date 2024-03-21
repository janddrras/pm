import { AlertDialogHeader, AlertDialogFooter } from "@/components/ui/alert-dialog"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction
} from "@/components/ui/alert-dialog"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { MoreHorizontal } from "lucide-react"
import DataForm from "./DataForm"
import { deletePassword } from "@/actions/database-actions"
import { AccessDataType } from "@/lib/resolvers"
import { useState } from "react"

const deleteRow = (id: string) => deletePassword(id)

interface RowActionsProps {
  formData: AccessDataType
}

const RowActions = ({ formData }: RowActionsProps) => {
  const [openEditForm, setOpenEditForm] = useState(false)
  return (
    <AlertDialog>
      <Dialog open={openEditForm} onOpenChange={setOpenEditForm}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DialogTrigger asChild>
              <DropdownMenuItem>Edit</DropdownMenuItem>
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
        <DataForm rowData={formData} closeDialog={setOpenEditForm} />
      </Dialog>
    </AlertDialog>
  )
}

export default RowActions

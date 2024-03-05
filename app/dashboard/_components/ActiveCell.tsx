import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "@/components/ui/use-toast"

const action = (text: string) => {
  navigator.clipboard.writeText(text)
  toast({ title: `${text}`, description: "Copied to clipboard" })
}

const ActiveCell = ({ text }: { text: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="cursor-pointer text-gray-400" onClick={() => action(text)}>
            {text}
          </span>
        </TooltipTrigger>
        <TooltipContent>
          <p>Copy to clipboard</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ActiveCell

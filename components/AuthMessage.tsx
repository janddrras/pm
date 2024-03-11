import { CheckCircleIcon } from "lucide-react"
import { FaExclamationTriangle } from "react-icons/fa"

interface AuthMessageProps {
  message: string | undefined
  messageType: "error" | "success"
}

const AuthMessage = ({ message, messageType }: AuthMessageProps) => {
  if (!message) return null
  if (messageType === "error") {
    return (
      <div className="bg-destructive/30 p-3 rounded-md flex items-center gap-x-2 text-sm text-foreground/60 mt-4">
        <FaExclamationTriangle className="w-4 h-4" /> {message}
      </div>
    )
  }
  if (messageType === "success") {
    return (
      <div className="bg-primary/30 p-3 rounded-md flex items-center gap-x-2 text-sm text-foreground/60 mt-4">
        <CheckCircleIcon className="w-4 h-4" /> {message}
      </div>
    )
  }
}

export default AuthMessage

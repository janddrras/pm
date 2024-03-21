import { cn } from "@/lib/utils"
import { buttonVariants } from "./ui/button"

interface EmailTemplateProps {
  name: string
  verificationLink: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({ name, verificationLink }) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <link href={verificationLink} className={cn(buttonVariants({ variant: "default" }))}>
      Verify your email
    </link>
  </div>
)

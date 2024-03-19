import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

export default function NotFound() {
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <h1 className="text-9xl text-destructive font-black pb-4">404</h1>
      <h2 className="text-4xl text-foreground/50 pb-2">Not Found</h2>
      <p className="text-foreground/80 pb-8">Could not find requested resource!</p>
      <Link className={cn(buttonVariants({ variant: "outline" }), "text-primary")} href="/">
        Return Home
      </Link>
    </main>
  )
}

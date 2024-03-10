import { BackgroundBeams } from "@/components/Background"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="relative z-10 flex flex-col items-center justify-center space-y-12">
        <h1 className="text-center font-semibold text-3xl lg:text-5xl tracking-wide text-primary pt-8">
          Welcome <br /> to password manager!
        </h1>
        <p className="text-foreground/50 font-light pb-12">Please sign in to enter</p>
        <Link href="/dashboard" className={cn("text-primary/80", buttonVariants({ variant: "outline" }))}>
          Dashboard
        </Link>
      </div>
      <BackgroundBeams />
    </main>
  )
}

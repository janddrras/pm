"use client" // Error components must be Client Components

import { Button } from "@/components/ui/button"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center">
      <h2 className="text-4xl text-destructive pb-8">Something went wrong!</h2>
      <Button variant="ghost" className="text-primary" onClick={() => reset()}>
        Try again
      </Button>
    </main>
  )
}

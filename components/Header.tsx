import Link from "next/link"
import { Button } from "./ui/button"
import { auth, signOut } from "@/auth"

const Header = async () => {
  const session = await auth()

  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-between content-center p-8 mb-4">
      <Link href="/">
        <h1 className="text-primary  hover:text-foreground text-2xl font-semibold">PM</h1>
      </Link>
      {session?.user ? (
        <form
          action={async () => {
            "use server"
            await signOut()
          }}
        >
          <Button variant="outline" type="submit">
            Sign out
          </Button>
        </form>
      ) : (
        <Link className="text-foreground/20 hover:text-foreground" href="/login">
          Login
        </Link>
      )}
    </header>
  )
}

export default Header

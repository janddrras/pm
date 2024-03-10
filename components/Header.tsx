import Link from "next/link"

const Header = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-30 flex justify-between content-center p-8 mb-4">
      <Link href="/">
        <h1 className="text-primary  hover:text-foreground text-2xl font-semibold">PM</h1>
      </Link>
      <Link className="text-foreground/20 hover:text-foreground" href="/login">
        Login
      </Link>
    </header>
  )
}

export default Header

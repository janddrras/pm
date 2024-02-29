import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

const Login = () => {
  return (
    <div className="mt-24 rounded bg-card border border-accent py-10 px-6 md:px-14 md:max-w-sm md:mt-0">
      <form action="">
        <h1 className="text-3xl font-semibold text-center">Log In</h1>
        <div className="space-y-6 mt-10">
          <Input type="email" name="email" placeholder="Email" />
          <Button type="submit" className="w-full">
            Log In
          </Button>
        </div>
      </form>
      <div className="mt-6 flex text-sm">
        <p className="text-gray-600 mr-2">Dont have an account?</p>
        <Link className="hover:underline" href="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  )
}

export default Login

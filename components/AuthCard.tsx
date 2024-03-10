import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"

interface AuthCardProps {
  mode: "Log in" | "Sign up"
}

const AuthCard = ({ mode }: AuthCardProps) => {
  return (
    <Card className="w-[350px] bg-card/45">
      <CardHeader>
        <CardTitle className="text-primary">{mode}</CardTitle>
        <CardDescription>Please {mode.toLowerCase()} to get access.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-8">
            <div className="flex flex-col space-y-1.5">
              <Label className="pb-2" htmlFor="email">
                email
              </Label>
              <Input id="email" placeholder="Your email" type="email" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label className="pb-2" htmlFor="password">
                password
              </Label>
              <Input id="password" placeholder="Your password" type="password" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button className="w-full mt-4">{mode}</Button>
        <div className="mt-4 text-sm text-foreground/60">
          <p>
            {mode === "Log in" ? "Don't have an account? " : "Already have an account? "}
            <Link className="text-foreground hover:underline ml-2" href={mode === "Log in" ? "/signup" : "/login"}>
              {mode === "Log in" ? "Sign up." : "Log in."}
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  )
}

export default AuthCard

"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import Link from "next/link"
import AuthForm from "./AuthForm"
import { Button } from "../../../components/ui/button"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"
import { oauthLogin } from "@/actions/login"

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
        <AuthForm mode={mode} />
        {mode === "Log in" && (
          <div className="flex space-x-2 mt-4">
            <Button variant="outline" className="w-full bg-card/45" onClick={() => oauthLogin("google")}>
              <FcGoogle className="w-5 h-5" />
            </Button>
            <Button variant="outline" className="w-full  bg-card/45" onClick={() => oauthLogin("github")}>
              <FaGithub className="w-5 h-5" />
            </Button>
          </div>
        )}
        <div className="mt-4 text-sm text-foreground/60">
          <p>
            {mode === "Log in" ? "Don't have an account? " : "Already have an account? "}
            <Link className="text-foreground hover:underline ml-2" href={mode === "Log in" ? "/signup" : "/login"}>
              {mode === "Log in" ? "Sign up." : "Log in."}
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default AuthCard

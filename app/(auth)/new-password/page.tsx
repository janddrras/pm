import { useSearchParams } from "next/navigation"
import ResetPassword from "../_components/ResetPassword"

const VerificationPage = () => {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center">
      <ResetPassword />
    </main>
  )
}

export default VerificationPage

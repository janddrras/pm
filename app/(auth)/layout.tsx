interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="relative flex flex-col h-screen w-screen md:items-center md:justify-center bg">
      <h1 className="font-black absolute left-8 top-8 text-4xl text-primary">PM</h1>
      {children}
    </div>
  )
}

export default AuthLayout

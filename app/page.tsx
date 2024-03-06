import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between space-y-20">
      <h1 className="text-center font-semibold text-4xl tracking-wide text-primary pt-8">Welcome!</h1>
      <div className="flex flex-col space-y-6">
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-background" />
          <p className="text-slate-700">background</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-foreground" />
          <p className="text-slate-700">foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-card" />
          <p className="text-slate-700">card</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-popover" />
          <p className="text-slate-700">popover</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-popover-foreground" />
          <p className="text-slate-700">popover-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-primary" />
          <p className="text-slate-700">primary</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-primary-foreground" />
          <p className="text-slate-700">primary-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-secondary" />
          <p className="text-slate-700">secondary</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-secondary-foreground" />
          <p className="text-slate-700">secondary-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-muted" />
          <p className="text-slate-700">muted</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-muted-foreground" />
          <p className="text-slate-700">muted-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-accent" />
          <p className="text-slate-700">accent</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-accent-foreground" />
          <p className="text-slate-700">accent-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-destructive" />
          <p className="text-slate-700">destructive</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-destructive-foreground" />
          <p className="text-slate-700">destructive-foreground</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-border" />
          <p className="text-slate-700">border</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-input" />
          <p className="text-slate-700">input</p>
        </div>
        <div className="flex space-x-4">
          <div className="w-6 border h-6 bg-ring" />
          <p className="text-slate-700">ring</p>
        </div>
      </div>
      <Link href="/dashboard">Dashboard</Link>
    </main>
  )
}

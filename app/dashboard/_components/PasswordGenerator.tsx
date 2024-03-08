"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useState } from "react"

const PasswordGenerator = () => {
  const [params, setParams] = useState({ length: 16, numbers: false, symbols: false, uppercase: false })

  return (
    <div className="space-y-2 pb-6">
      <h2 className="text-primary/80">Password Generator</h2>
      <p className="text-xs font-light text-foreground/80">Generate your own secure password</p>
      <div className="space-y-4">
        <Input type="text" id="password" />
        <div className="flex space-x-4 items-center">
          <Label htmlFor="length">Length</Label>
          <Slider value={[params.length]} min={8} max={64} onChange={() => setParams((prev) => ({ ...prev, length: prev.length }))} />
          <Input type="number" id="length" className="w-36" min={8} max={64} value={params.length} onChange={() => {}} />
        </div>
        <div className="flex space-x-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="Uppercase">Uppercase</Label>
            <Checkbox id="uppercase" className="" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Checkbox id="numbers" className="" />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="symbols">Symbols</Label>
            <Checkbox id="symbols" className="" />
          </div>
        </div>
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" className="w-full">
            Generate new
          </Button>
          <Button variant="outline" className="w-full">
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator

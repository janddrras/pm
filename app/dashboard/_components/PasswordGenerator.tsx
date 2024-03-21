"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { PasswordGeneratorParamsType } from "@/lib/resolvers"
import { useState } from "react"
import { passwordGenerator } from "@/lib/utils"
import { useFormContext } from "react-hook-form"
import { toast } from "@/components/ui/use-toast"

const PasswordGenerator = ({ setHash }: { setHash: (value: boolean) => void }) => {
  const [params, setParams] = useState<PasswordGeneratorParamsType>({ length: 16, numbers: true, symbols: true, uppercase: true })
  const [newPassword, setNewPassword] = useState<string>("")
  const { setValue } = useFormContext()

  const accept = () => {
    setValue("password", newPassword, { shouldValidate: true, shouldTouch: true })
    navigator.clipboard.writeText(newPassword)
    setHash(false)
    toast({ title: `${newPassword}`, description: "Copied to clipboard" })
  }

  return (
    <div className="space-y-2 pb-6">
      <h2 className="text-primary/80">Password Generator</h2>
      <p className="text-xs font-light text-foreground/80">Generate your own secure password</p>
      <div className="space-y-4">
        <Input name="newPassword" type="text" id="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
        <div className="flex space-x-4 items-center">
          <Label htmlFor="length">Length</Label>
          <Slider
            name="length"
            min={8}
            max={64}
            onValueCommit={([value]) => setParams((prev) => ({ ...prev, length: value }))}
            value={[params.length]}
            onValueChange={(value) => setParams((prev) => ({ ...prev, length: Number(value[0]) }))}
          />
          <Input
            type="number"
            name="length"
            className="w-36"
            min={8}
            max={64}
            value={params.length}
            onChange={(e) => setParams((prev) => ({ ...prev, length: Number(e.target.value) }))}
          />
        </div>
        <div className="flex space-x-4 items-center justify-between">
          <div className="flex items-center space-x-2">
            <Label htmlFor="Uppercase">Uppercase</Label>
            <Checkbox
              name="uppercase"
              checked={params.uppercase}
              onCheckedChange={(checked) => setParams((prev) => ({ ...prev, uppercase: !!checked }))}
              id="uppercase"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="numbers">Numbers</Label>
            <Checkbox
              name="numbers"
              checked={params.numbers}
              onCheckedChange={(checked) => setParams((prev) => ({ ...prev, numbers: !!checked }))}
              id="numbers"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Label htmlFor="symbols">Symbols</Label>
            <Checkbox
              name="symbol"
              checked={params.symbols}
              onCheckedChange={(checked) => setParams((prev) => ({ ...prev, symbols: !!checked }))}
              id="symbols"
            />
          </div>
        </div>
        <div className="flex space-x-2 pt-2">
          <Button variant="outline" className="w-full" onClick={() => setNewPassword(passwordGenerator(params))}>
            Generate new
          </Button>
          <Button variant="outline" className="w-full border-primary" disabled={newPassword.length < 8} onClick={accept}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PasswordGenerator

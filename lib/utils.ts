import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function passwordGenerator({ length = 12, numbers = true, symbols = true, uppercase = true }) {
  const SYMBOLS = "!@#$%^&*()_+"

  const uppersLength = uppercase ? Math.ceil(length / 3) : 0
  const numbersLength = numbers ? Math.ceil(length / 4) : 0
  const symbolsLength = symbols ? Math.ceil(length / 6) : 0
  const lowersLength = length - uppersLength - numbersLength - symbolsLength

  const l = new Array(lowersLength)
    .fill(0)
    .map((a) => (a = Math.random()))
    .map((a) => (a = Math.floor(a * 26) + 97))
    .map((a) => String.fromCharCode(a))

  const n = new Array(numbersLength)
    .fill(0)
    .map((a) => (a = Math.random()))
    .map((a) => (a = Math.floor(a * 10)))
    .map((a) => a.toString())

  const s = new Array(symbolsLength)
    .fill(0)
    .map((a) => (a = Math.random()))
    .map((a) => (a = Math.floor(a * SYMBOLS.length)))
    .map((a) => SYMBOLS[a])

  const u = new Array(uppersLength)
    .fill(0)
    .map((a) => (a = Math.random()))
    .map((a) => (a = Math.floor(a * 26) + 65))
    .map((a) => String.fromCharCode(a))

  const password = [...l, ...n, ...s, ...u].sort(() => Math.random() - 0.5).join("")

  return password
}

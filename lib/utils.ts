import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import SimpleCripto from "simple-crypto-js"
import { PasswordGeneratorParamsType } from "./resolvers"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function passwordGenerator({ length, numbers, symbols, uppercase }: PasswordGeneratorParamsType) {
  const SYMBOLS = "!@#$%^&*()_+"

  const uppersLength = uppercase ? Math.floor(length / 4) : 0
  const numbersLength = numbers ? Math.floor(length / 5) : 0
  const symbolsLength = symbols ? Math.floor(length / 6) : 0
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

  return [...l, ...n, ...s, ...u].sort(() => Math.random() - 0.5).join("")
}
const secret = process.env.ENCRYPTION_KEY || "79SznUepcRuem5xk1mSrq5TWjIr15zhtn1szlfLPl5RDohFvoeBjs3Bw5wdiJE3c"
const simpleCrypto = new SimpleCripto(secret)

export function encrypt(data: string) {
  return simpleCrypto.encrypt(data)
}

export function decrypt(data: string) {
  return simpleCrypto.decrypt(data)
}

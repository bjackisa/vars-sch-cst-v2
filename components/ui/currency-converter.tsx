"use client"

import { useState } from "react"
import { Button } from "./button"

interface CurrencyConverterProps {
  amount: number
  className?: string
}

export function CurrencyConverter({ amount, className = "" }: CurrencyConverterProps) {
  const [currency, setCurrency] = useState<"UGX" | "USD">("UGX")

  // Conversion rates: 1 USD = 3,650 UGX
  const USD_TO_UGX = 3650
  const UGX_TO_USD = 0.0028

  const convertedAmount = currency === "UGX" ? Math.round(amount * USD_TO_UGX) : amount

  const formatAmount = (value: number, curr: string) => {
    if (curr === "UGX") {
      return `UGX ${value.toLocaleString()}`
    }
    return `$${value}`
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="font-semibold">{formatAmount(convertedAmount, currency)}</span>
      <Button
        onClick={() => setCurrency(currency === "UGX" ? "USD" : "UGX")}
        variant="ghost"
        size="sm"
        className="text-xs text-white/70 hover:text-white p-1 h-auto"
      >
        Switch to {currency === "UGX" ? "USD" : "UGX"}
      </Button>
    </div>
  )
}

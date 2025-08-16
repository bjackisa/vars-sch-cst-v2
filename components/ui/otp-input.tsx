"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "@/components/ui/input"

interface OTPInputProps {
  length?: number
  onComplete: (otp: string) => void
  disabled?: boolean
}

export function OTPInput({ length = 6, onComplete, disabled = false }: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    const newOtp = [...otp]

    // Handle pasted content
    if (value.length > 1) {
      const pastedData = value.slice(0, length).split("")
      for (let i = 0; i < length; i++) {
        newOtp[i] = pastedData[i] || ""
      }
      setOtp(newOtp)

      // Focus on the last filled input or the first empty one
      const lastFilledIndex = newOtp.findLastIndex((digit) => digit !== "")
      const focusIndex = lastFilledIndex < length - 1 ? lastFilledIndex + 1 : length - 1
      inputRefs.current[focusIndex]?.focus()

      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""))
      }
      return
    }

    // Handle single character input
    if (value === "" || /^\d$/.test(value)) {
      newOtp[index] = value
      setOtp(newOtp)

      // Move to next input if value is entered
      if (value !== "" && index < length - 1) {
        inputRefs.current[index + 1]?.focus()
      }

      // Call onComplete when all fields are filled
      if (newOtp.every((digit) => digit !== "")) {
        onComplete(newOtp.join(""))
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (disabled) return

    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="flex gap-2 justify-center">
      {otp.map((digit, index) => (
        <Input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold glass-input"
        />
      ))}
    </div>
  )
}

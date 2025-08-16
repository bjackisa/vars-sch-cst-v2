"use client"

import type React from "react"

import { useState } from "react"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { OTPInput } from "@/components/ui/otp-input"
import { Loader2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { signUp, verifyOtp, resendOtp } from "@/lib/auth-actions"

function SubmitButton({ isOtpStep }: { isOtpStep: boolean }) {
  const { pending } = useFormStatus()

  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-white text-black hover:bg-white/90 ios-bounce py-6 text-lg font-medium rounded-xl h-[60px]"
    >
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {isOtpStep ? "Verifying..." : "Creating account..."}
        </>
      ) : isOtpStep ? (
        "Verify Account"
      ) : (
        "Create Account"
      )}
    </Button>
  )
}

export default function SignUpForm() {
  const [step, setStep] = useState<"signup" | "otp">("signup")
  const [email, setEmail] = useState("")
  const [otpCode, setOtpCode] = useState("")
  const [isResending, setIsResending] = useState(false)

  const [signUpState, signUpAction] = useActionState(signUp, null)
  const [otpState, otpAction] = useActionState(verifyOtp, null)

  if (signUpState?.success && step === "signup") {
    setStep("otp")
  }

  const handleResendOtp = async () => {
    setIsResending(true)
    try {
      await resendOtp(email)
    } catch (error) {
      console.error("Resend OTP error:", error)
    } finally {
      setIsResending(false)
    }
  }

  const handleOtpComplete = (otp: string) => {
    setOtpCode(otp)
  }

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (otpCode.length === 6) {
      const formData = new FormData()
      formData.append("email", email)
      formData.append("token", otpCode)
      otpAction(formData)
    }
  }

  if (step === "otp") {
    return (
      <GlassCard className="w-full max-w-md">
        <div className="space-y-2 text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tight text-white font-serif">Verify your email</h1>
          <p className="text-lg text-white/70">
            We sent a 6-digit code to <br />
            <span className="font-medium text-white">{email}</span>
          </p>
        </div>

        <form onSubmit={handleOtpSubmit} className="space-y-6">
          {otpState?.error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
              {otpState.error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white/80 text-center">Enter verification code</label>
              <OTPInput onComplete={handleOtpComplete} />
            </div>
          </div>

          <SubmitButton isOtpStep={true} />

          <div className="text-center space-y-4">
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={isResending}
              className="text-white/70 hover:text-white text-sm underline disabled:opacity-50"
            >
              {isResending ? "Resending..." : "Didn't receive the code? Resend"}
            </button>

            <button
              type="button"
              onClick={() => setStep("signup")}
              className="flex items-center justify-center gap-2 text-white/70 hover:text-white text-sm mx-auto"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to signup
            </button>
          </div>
        </form>
      </GlassCard>
    )
  }

  return (
    <GlassCard className="w-full max-w-md">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white font-serif">Create an account</h1>
        <p className="text-lg text-white/70">Join thousands of students worldwide</p>
      </div>

      <form action={signUpAction} className="space-y-6">
        {signUpState?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
            {signUpState.error}
          </div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="fullName" className="block text-sm font-medium text-white/80">
              Full Name
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Your full name"
              required
              className="glass-input"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-white/80">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="glass-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <Input id="password" name="password" type="password" required className="glass-input" />
          </div>
        </div>

        <SubmitButton isOtpStep={false} />

        <div className="text-center text-white/70">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-white hover:underline">
            Sign in
          </Link>
        </div>
      </form>
    </GlassCard>
  )
}

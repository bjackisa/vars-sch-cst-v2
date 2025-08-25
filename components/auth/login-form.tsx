"use client"

import { useActionState, useEffect } from "react"
import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GlassCard } from "@/components/ui/glass-card"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signIn } from "@/lib/auth-actions"

function SubmitButton() {
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
          Signing in...
        </>
      ) : (
        "Sign In"
      )}
    </Button>
  )
}

interface LoginFormProps {
  redirectTo?: string
}

export default function LoginForm({ redirectTo }: LoginFormProps) {
  const router = useRouter()
  const [state, formAction] = useActionState(signIn, null)

  useEffect(() => {
    if (state?.success) {
      const destination = state.isAdmin ? "/admin" : redirectTo || "/dashboard"
      router.push(destination)
    }
  }, [state, router, redirectTo])

  return (
    <GlassCard className="w-full max-w-md">
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-white font-serif">Welcome back</h1>
        <p className="text-lg text-white/70">Sign in to your account</p>
      </div>

      <form action={formAction} className="space-y-6">
        {state?.error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-xl text-sm">
            {state.error}
          </div>
        )}

        <div className="space-y-4">
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
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-white/80">
              Password
            </label>
            <Input id="password" name="password" type="password" required className="glass-input" />
          </div>
        </div>

        <SubmitButton />

        <div className="text-center text-white/70">
          Don't have an account?{" "}
          <Link href="/auth/sign-up" className="text-white hover:underline">
            Sign up
          </Link>
        </div>
      </form>
    </GlassCard>
  )
}

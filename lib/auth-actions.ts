"use server"

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

export async function signIn(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const supabase = createClient()

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    // Determine if user is admin
    let isAdmin = false
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", user.id)
        .maybeSingle()
      isAdmin = profile?.is_admin ?? false
    }

    revalidatePath("/", "layout")
    return { success: true, isAdmin }
  } catch (error) {
    console.error("Login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signUp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const fullName = formData.get("fullName")

  if (!email || !password || !fullName) {
    return { error: "All fields are required" }
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        data: {
          full_name: fullName.toString(),
        },
      },
    })

    if (error) {
      return { error: error.message }
    }

    // Create user profile in our users table (will be confirmed after OTP verification)
    if (data.user) {
      const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email: email.toString(),
        full_name: fullName.toString(),
      })

      if (profileError) {
        console.error("Profile creation error:", profileError)
      }
    }

    return { success: "We've sent a verification code to your email." }
  } catch (error) {
    console.error("Sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  revalidatePath("/", "layout")
  redirect("/auth/login")
}

export async function verifyOtp(prevState: any, formData: FormData) {
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const token = formData.get("token")

  if (!email || !token) {
    return { error: "Email and verification code are required" }
  }

  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.toString(),
      token: token.toString(),
      type: "signup",
    })

    if (error) {
      return { error: error.message }
    }

    if (data.user) {
      let isAdmin = false
      const { data: profile } = await supabase
        .from("users")
        .select("is_admin")
        .eq("id", data.user.id)
        .maybeSingle()
      isAdmin = profile?.is_admin ?? false
      revalidatePath("/", "layout")
      redirect(isAdmin ? "/admin" : "/dashboard")
    }

    return { success: "Account verified successfully!" }
  } catch (error) {
    console.error("OTP verification error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

export async function resendOtp(email: string) {
  const supabase = createClient()

  try {
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })

    if (error) {
      throw error
    }

    return { success: "Verification code resent successfully!" }
  } catch (error) {
    console.error("Resend OTP error:", error)
    throw error
  }
}

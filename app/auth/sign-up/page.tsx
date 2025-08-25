import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import SignUpForm from "@/components/auth/sign-up-form"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default async function SignUpPage() {
  const supabase = createClient()

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    let isAdmin = false
    const { data: profile } = await supabase
      .from("users")
      .select("is_admin")
      .eq("id", session.user.id)
      .maybeSingle()
    isAdmin = profile?.is_admin ?? false
    redirect(isAdmin ? "/admin" : "/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 flex items-center justify-center px-4 py-12">
        <SignUpForm />
      </main>
      <Footer />
    </div>
  )
}

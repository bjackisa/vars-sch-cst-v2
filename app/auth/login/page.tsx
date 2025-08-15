import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import LoginForm from "@/components/auth/login-form"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // Check if user is already logged in
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) {
    const redirectTo = (searchParams.redirect as string) || "/dashboard"
    redirect(redirectTo)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 flex items-center justify-center px-4 py-12">
        <LoginForm redirectTo={searchParams.redirect as string} />
      </main>
      <Footer />
    </div>
  )
}

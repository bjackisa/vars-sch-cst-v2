import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { NewScholarshipForm } from "@/components/admin/new-scholarship-form"

export default async function NewScholarshipPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/scholarships/new")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Add Scholarship</h1>
              <p className="text-white/70">Create a new scholarship opportunity</p>
            </div>
            <NewScholarshipForm />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ApplicationDetails } from "@/components/admin/application-details"

interface ApplicationDetailPageProps {
  params: {
    id: string
  }
}

export default async function ApplicationDetailPage({ params }: ApplicationDetailPageProps) {
  const supabase = createClient()

  // Check admin access
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()

  const isAdmin = userProfile?.is_admin

  if (!isAdmin) {
    redirect("/dashboard")
  }

  // Get application details
  const { data: application, error } = await supabase
    .from("applications")
    .select(
      `
      *,
      scholarship:scholarships(
        *,
        country:countries(*)
      ),
      user:users(*)
    `,
    )
    .eq("id", params.id)
    .single()

  if (error || !application) {
    notFound()
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <ApplicationDetails application={application} adminUser={userProfile} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ApplicationsTable } from "@/components/admin/applications-table"
import { ApplicationFilters } from "@/components/admin/application-filters"

export default async function AdminApplicationsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // Check admin access
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/applications")
  }

  const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userProfile?.is_admin) {
    redirect("/dashboard")
  }

  // Build query based on filters
  let query = supabase.from("applications").select(
    `
    *,
    scholarship:scholarships(name, country:countries(name, flag_emoji)),
    user:users(full_name, email)
  `,
  )

  if (searchParams.status) {
    query = query.eq("status", searchParams.status)
  }

  if (searchParams.search) {
    query = query.or(
      `user.full_name.ilike.%${searchParams.search}%,user.email.ilike.%${searchParams.search}%,id.ilike.%${searchParams.search}%`,
    )
  }

  const { data: applications } = await query.order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Manage Applications</h1>
              <p className="text-white/70">Review and update scholarship applications</p>
            </div>

            <div className="space-y-6">
              <ApplicationFilters searchParams={searchParams} />
              <ApplicationsTable applications={applications || []} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

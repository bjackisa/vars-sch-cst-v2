import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { AdminStats } from "@/components/admin/admin-stats"
import { RecentApplications } from "@/components/admin/recent-applications"
import { QuickActions } from "@/components/admin/quick-actions"

export default async function AdminDashboard() {
  const supabase = createClient()

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userProfile?.is_admin) {
    redirect("/dashboard")
  }

  // Get dashboard stats
  const [
    { count: totalApplications },
    { count: pendingApplications },
    { count: totalScholarships },
    { count: totalUsers },
  ] = await Promise.all([
    supabase.from("applications").select("*", { count: "exact", head: true }),
    supabase.from("applications").select("*", { count: "exact", head: true }).eq("status", "pending"),
    supabase.from("scholarships").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("users").select("*", { count: "exact", head: true }),
  ])

  // Get recent applications
  const { data: recentApplications } = await supabase
    .from("applications")
    .select(
      `
      *,
      scholarship:scholarships(name, country:countries(name, flag_emoji)),
      user:users(full_name, email)
    `,
    )
    .order("created_at", { ascending: false })
    .limit(10)

  const stats = {
    totalApplications: totalApplications || 0,
    pendingApplications: pendingApplications || 0,
    totalScholarships: totalScholarships || 0,
    totalUsers: totalUsers || 0,
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Admin Dashboard</h1>
              <p className="text-white/70">Manage scholarships, applications, and user communications</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <AdminStats stats={stats} />
                <RecentApplications applications={recentApplications || []} />
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <QuickActions />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default async function AdminNotificationsPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/notifications")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  const { data: notifications } = await supabase
    .from("notifications")
    .select("id, title, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Notifications</h1>
              <p className="text-white/70">View system notifications</p>
            </div>
            <ul className="space-y-2">
              {notifications?.map((n) => (
                <li key={n.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-white/60">{new Date(n.created_at).toLocaleString()}</p>
                </li>
              ))}
              {!notifications?.length && (
                <li className="text-white/70">No notifications found</li>
              )}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

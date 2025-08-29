import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"

export default async function AdminSupportPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/support")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  const { data: requests } = await supabase
    .from("support_requests")
    .select("id, subject, status, created_at")
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto space-y-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Support Requests</h1>
              <p className="text-white/70">Handle user inquiries</p>
            </div>
            <ul className="space-y-2">
              {requests?.map((r) => (
                <li key={r.id} className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <p className="font-medium">{r.subject}</p>
                  <p className="text-xs text-white/60">{r.status} - {new Date(r.created_at).toLocaleString()}</p>
                </li>
              ))}
              {!requests?.length && <li className="text-white/70">No support requests</li>}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

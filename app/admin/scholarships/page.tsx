import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Link from "next/link"

export default async function AdminScholarshipsPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/scholarships")
  }

  const { data: profile } = await supabase
    .from("users")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle()

  if (!profile?.is_admin) {
    redirect("/dashboard")
  }

  const { data: scholarships } = await supabase
    .from("scholarships")
    .select(`id, name, application_fee, country:countries(name)`)
    .order("created_at", { ascending: false })

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Scholarships</h1>
                <p className="text-white/70">Manage available scholarships</p>
              </div>
              <Link
                href="/admin/scholarships/new"
                className="px-4 py-2 rounded-xl bg-white text-black text-sm font-medium hover:bg-white/90"
              >
                Add Scholarship
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-3">Name</th>
                    <th className="py-3">Country</th>
                    <th className="py-3">Fee</th>
                  </tr>
                </thead>
                <tbody>
                  {scholarships?.map((s) => (
                    <tr key={s.id} className="border-b border-white/5">
                      <td className="py-2">{s.name}</td>
                      <td className="py-2">{s.country?.name || "-"}</td>
                      <td className="py-2">{s.application_fee ?? 0}</td>
                    </tr>
                  ))}
                  {!scholarships?.length && (
                    <tr>
                      <td colSpan={3} className="py-4 text-center text-white/70">
                        No scholarships found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

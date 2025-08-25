import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

async function createPost(formData: FormData) {
  "use server"
  const supabase = createClient()
  const type = formData.get("type")?.toString()
  const title = formData.get("title")?.toString()
  const content = formData.get("content")?.toString()
  const image_url = formData.get("image_url")?.toString()
  const link = formData.get("link")?.toString()
  await supabase.from("timeline_posts").insert({ type, title, content, image_url, link })
  redirect("/admin")
}

export default async function TimelineAdminPage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login?redirect=/admin/timeline")
  }
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .maybeSingle()
  const isAdmin = profile?.is_admin
  if (!isAdmin) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <GlassCard>
              <h1 className="text-2xl font-bold mb-6">New Timeline Post</h1>
              <form action={createPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select name="type" className="glass-input w-full">
                    <option value="status">Status</option>
                    <option value="job">Job</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input name="title" className="glass-input" placeholder="Optional title" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Content</label>
                  <Textarea name="content" className="glass-input min-h-32" placeholder="Write your update" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Image URL</label>
                  <Input name="image_url" className="glass-input" placeholder="https://" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Link</label>
                  <Input name="link" className="glass-input" placeholder="https://" />
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 ios-bounce">Add Post</Button>
              </form>
            </GlassCard>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

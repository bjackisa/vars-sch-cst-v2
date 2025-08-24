import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { CreatePostForm } from "@/components/admin/create-post-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

export default async function AdminPostsPage() {
  const supabase = createClient()

  // Check if user is authenticated and is admin
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin/posts")
  }

  const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

  if (!userProfile?.is_admin) {
    redirect("/dashboard")
  }

  // Get recent posts
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(10)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2 text-white">Manage Posts</h1>
              <p className="text-white/70">Create and manage timeline posts for your community</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Create Post Form */}
              <div>
                <CreatePostForm authorName={userProfile.full_name || "Admin"} authorId={user.id} />
              </div>

              {/* Recent Posts */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white mb-4">Recent Posts</h2>
                {posts?.map((post) => (
                  <Card key={post.id} className="bg-white/10 backdrop-blur-md border-white/20">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">{post.title}</CardTitle>
                        <Badge
                          variant="secondary"
                          className={`
                            ${post.post_type === "status_update" ? "bg-blue-500/20 text-blue-300 border-blue-400/30" : ""}
                            ${post.post_type === "event" ? "bg-green-500/20 text-green-300 border-green-400/30" : ""}
                            ${post.post_type === "job_opportunity" ? "bg-purple-500/20 text-purple-300 border-purple-400/30" : ""}
                          `}
                        >
                          {post.post_type.replace("_", " ")}
                        </Badge>
                      </div>
                      <p className="text-white/60 text-sm">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 text-sm line-clamp-3">{post.content}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { TimelineFeed } from "@/components/timeline/timeline-feed"

export default async function TimelinePage() {
  const supabase = createClient()

  // Get all posts with interaction counts
  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      likes_count:post_likes(count),
      comments_count:post_comments(count)
    `)
    .order("created_at", { ascending: false })

  // Transform the data to include counts
  const postsWithCounts =
    posts?.map((post) => ({
      ...post,
      likesCount: post.likes_count?.[0]?.count || 0,
      commentsCount: post.comments_count?.[0]?.count || 0,
    })) || []

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2 text-foreground">Timeline</h1>
              <p className="text-muted-foreground">Stay updated with our latest news, events, and opportunities</p>
            </div>

            <TimelineFeed posts={postsWithCounts} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

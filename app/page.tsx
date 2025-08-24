import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Award, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { TimelineFeed } from "@/components/timeline/timeline-feed"

export default async function HomePage() {
  const supabase = createClient()

  const { data: posts } = await supabase
    .from("posts")
    .select(`
      *,
      likes_count:post_likes(count),
      comments_count:post_comments(count)
    `)
    .order("created_at", { ascending: false })
    .limit(3)

  // Transform the data to include counts
  const postsWithCounts =
    posts?.map((post) => ({
      ...post,
      likesCount: post.likes_count?.[0]?.count || 0,
      commentsCount: post.comments_count?.[0]?.count || 0,
    })) || []

  const services = [
    "Flight Itinerary (Airport Pickup and Arrangement)",
    "Teaching Assistantship (Internships and Research)",
    "Hostel & Housing",
    "Visa Support",
    "Consultation Services",
    "Scholarship Opportunities",
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold font-serif mb-6 leading-tight">
              Your Gateway to
              <span className="block bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                Global Education
              </span>
            </h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect Ugandan and East African students with life-changing scholarship opportunities worldwide. From
              application to acceptance, we're with you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scholarships">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 ios-bounce">
                  Explore Scholarships
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-button border-border/20 hover:bg-accent/10 bg-transparent"
                >
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <GlassCard className="text-center">
                <Globe className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p className="text-muted-foreground">Countries Worldwide</p>
              </GlassCard>

              <GlassCard className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">1000+</h3>
                <p className="text-muted-foreground">Students Helped</p>
              </GlassCard>

              <GlassCard className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-2xl font-bold mb-2">200+</h3>
                <p className="text-muted-foreground">Scholarships Available</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Services</h2>
              <p className="text-muted-foreground text-lg">
                We connect you to services that help make your educational journey seamless
              </p>
            </div>

            <GlassCard>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {services.map((service, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    <span className="text-foreground/80">{service}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Latest Updates</h2>
              <p className="text-muted-foreground text-lg">
                Stay informed with our latest news, events, and opportunities
              </p>
            </div>

            <TimelineFeed posts={postsWithCounts} showSeeMore={true} limit={3} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Ready to Start Your Journey?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Join thousands of students who have transformed their lives through global education opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 ios-bounce">
                    Create Account
                  </Button>
                </Link>

                <Link href="/scholarships">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-button border-border/20 hover:bg-accent/10 bg-transparent"
                  >
                    Browse Scholarships
                  </Button>
                </Link>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

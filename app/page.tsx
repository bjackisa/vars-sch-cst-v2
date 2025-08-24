import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  Globe,
  Users,
  Award,
  CheckCircle,
  Search,
  FileCheck2,
  Plane,
  GraduationCap,
  Quote,
} from "lucide-react"
import Link from "next/link"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { TimelinePost, TimelinePostCard } from "@/components/timeline/timeline-post-card"
import { TimelineSkeleton } from "@/components/timeline/timeline-skeleton"
import { ScholarshipCard } from "@/components/ui/scholarship-card"

interface Scholarship {
  id: string
  name: string
  description: string
  country: {
    name: string
    code: string
    flag_emoji: string
  }
  funding_type: string
  education_level: string[]
  application_deadline: string
  application_fee: number
}

export default async function HomePage() {
  const supabase = createClient()

  let posts: TimelinePost[] | null = null
  if (isSupabaseConfigured) {
    const { data } = await supabase
      .from("timeline_posts")
      .select("*")
      .order("posted_at", { ascending: true })
    posts = data
  }

  let featuredScholarships: Scholarship[] | null = null
  if (isSupabaseConfigured) {
    const { data } = await supabase
      .from("scholarships")
      .select(
        `
        *,
        country:countries(*)
      `,
      )
      .eq("is_active", true)
      .order("created_at", { ascending: false })
      .limit(3)
    featuredScholarships = data
  }

  const services = [
    "Flight Itinerary (Airport Pickup and Arrangement)",
    "Teaching Assistantship (Internships and Research)",
    "Hostel & Housing",
    "Visa Support",
    "Consultation Services",
    "Scholarship Opportunities",
  ]

  const steps = [
    {
      icon: Search,
      title: "Discover",
      description: "Find scholarships that match your goals.",
    },
    {
      icon: FileCheck2,
      title: "Apply",
      description: "Submit applications with expert guidance.",
    },
    {
      icon: Plane,
      title: "Prepare",
      description: "Get visa and travel support.",
    },
    {
      icon: GraduationCap,
      title: "Succeed",
      description: "Embark on your global education journey.",
    },
  ]

  const testimonials = [
    {
      name: "Amina N.",
      quote:
        "Varsity Scholars Consult helped me secure a fully funded scholarship in India. The process was seamless!",
    },
    {
      name: "Craig D.",
      quote:
        "Their guidance made my dream of studying abroad a reality. I can't thank them enough!",
    },
    {
      name: "Laura N.",
      quote:
        "From application to arrival, the support was exceptional. Highly recommended!",
    },
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
              <span className="block bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
                Global Education
              </span>
            </h1>

            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect Ugandan and East African students with life-changing scholarship opportunities worldwide. From
              application to acceptance, we're with you every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scholarships">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 ios-bounce">
                  Explore Scholarships
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
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
                <Globe className="h-12 w-12 mx-auto mb-4 text-white/70" />
                <h3 className="text-2xl font-bold mb-2">50+</h3>
                <p className="text-white/70">Countries Worldwide</p>
              </GlassCard>

              <GlassCard className="text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-white/70" />
                <h3 className="text-2xl font-bold mb-2">1000+</h3>
                <p className="text-white/70">Students Helped</p>
              </GlassCard>

              <GlassCard className="text-center">
                <Award className="h-12 w-12 mx-auto mb-4 text-white/70" />
                <h3 className="text-2xl font-bold mb-2">200+</h3>
                <p className="text-white/70">Scholarships Available</p>
              </GlassCard>
            </div>
          </div>
          </section>

          {/* How It Works Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">How It Works</h2>
                <p className="text-white/70 text-lg">
                  Your path to studying abroad in four simple steps.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <GlassCard key={index} className="text-center p-6">
                    <step.icon className="h-10 w-10 mx-auto mb-4 text-white/70" />
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-white/70 text-sm">{step.description}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Our Services</h2>
                <p className="text-white/70 text-lg">
                  We connect you to services that help make your educational journey seamless
                </p>
              </div>

              <GlassCard>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((service, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-white/70 flex-shrink-0" />
                      <span className="text-white/80">{service}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </section>

          {/* Featured Scholarships Section */}
          <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Featured Scholarships</h2>
                <p className="text-white/70 text-lg">Top opportunities handpicked for you.</p>
              </div>

          {featuredScholarships && featuredScholarships.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredScholarships.map((scholarship) => (
                <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
              ))}
            </div>
          ) : (
            <GlassCard className="text-center py-12">
              <p className="text-white/70">No featured scholarships available right now.</p>
            </GlassCard>
          )}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Community Timeline</h2>
              <p className="text-white/70 text-lg">Latest updates, jobs, and events.</p>
            </div>

            {posts && posts.length > 0 ? (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {posts.map((post) => (
                  <TimelinePostCard key={post.id} post={post} />
                ))}
              </div>
            ) : (
              <div className="flex overflow-x-auto space-x-6 pb-4">
                {[1, 2, 3].map((i) => (
                  <TimelineSkeleton key={i} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Success Stories</h2>
              <p className="text-white/70 text-lg">What our students say about us.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((t, index) => (
                <GlassCard key={index} className="p-6 flex flex-col h-full">
                  <Quote className="h-8 w-8 mb-4 text-white/70" />
                  <p className="text-white/80 italic mb-4 flex-1">{t.quote}</p>
                  <p className="text-white font-semibold">{t.name}</p>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard>
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Ready to Start Your Journey?</h2>
              <p className="text-white/70 text-lg mb-8">
                Join thousands of students who have transformed their lives through global education opportunities.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="bg-white text-black hover:bg-white/90 ios-bounce">
                    Create Account
                  </Button>
                </Link>

                <Link href="/scholarships">
                  <Button
                    size="lg"
                    variant="outline"
                    className="glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
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

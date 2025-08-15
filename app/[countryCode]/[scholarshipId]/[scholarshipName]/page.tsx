import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Calendar, GraduationCap, DollarSign, Clock, CheckCircle, Users } from "lucide-react"
import Link from "next/link"

interface ScholarshipPageProps {
  params: {
    countryCode: string
    scholarshipId: string
    scholarshipName: string
  }
}

export default async function ScholarshipPage({ params }: ScholarshipPageProps) {
  const supabase = createClient()

  const { data: scholarship, error } = await supabase
    .from("scholarships")
    .select(
      `
      *,
      country:countries(*)
    `,
    )
    .eq("id", params.scholarshipId)
    .single()

  if (error || !scholarship) {
    notFound()
  }

  const firstLetter = scholarship.name.charAt(0).toUpperCase()
  const deadline = new Date(scholarship.application_deadline)
  const isDeadlineSoon = deadline.getTime() - Date.now() < 30 * 24 * 60 * 60 * 1000 // 30 days

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start space-x-6 mb-8">
              <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {firstLetter}
              </div>

              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="text-2xl">{scholarship.country.flag_emoji}</span>
                  <span className="text-white/70">{scholarship.country.name}</span>
                  {isDeadlineSoon && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">Deadline Soon</span>
                  )}
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">{scholarship.name}</h1>

                <p className="text-white/70 text-lg leading-relaxed">{scholarship.description}</p>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <GlassCard className="text-center p-4">
                <Calendar className="h-6 w-6 mx-auto mb-2 text-white/70" />
                <p className="text-sm text-white/60">Deadline</p>
                <p className="font-semibold">{deadline.toLocaleDateString()}</p>
              </GlassCard>

              <GlassCard className="text-center p-4">
                <GraduationCap className="h-6 w-6 mx-auto mb-2 text-white/70" />
                <p className="text-sm text-white/60">Level</p>
                <p className="font-semibold capitalize">{scholarship.education_level.join(", ")}</p>
              </GlassCard>

              <GlassCard className="text-center p-4">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-white/70" />
                <p className="text-sm text-white/60">Funding</p>
                <p className="font-semibold capitalize">{scholarship.funding_type.replace("_", " ")}</p>
              </GlassCard>

              <GlassCard className="text-center p-4">
                <Users className="h-6 w-6 mx-auto mb-2 text-white/70" />
                <p className="text-sm text-white/60">Fee</p>
                <p className="font-semibold">${scholarship.application_fee}</p>
              </GlassCard>
            </div>
          </div>
        </section>

        {/* Details Section */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Requirements */}
                <GlassCard>
                  <h2 className="text-2xl font-bold mb-4">Requirements</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed">{scholarship.requirements}</p>
                  </div>
                </GlassCard>

                {/* Benefits */}
                <GlassCard>
                  <h2 className="text-2xl font-bold mb-4">Benefits</h2>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-white/80 leading-relaxed">{scholarship.benefits}</p>
                  </div>
                </GlassCard>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <GlassCard className="sticky top-24">
                  <h3 className="text-xl font-bold mb-6">Apply Now</h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">Free consultation included</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">Application tracking</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-sm">Expert guidance</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-white/70" />
                      <span className="text-sm">
                        {Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days remaining
                      </span>
                    </div>
                  </div>

                  <Link href={`/apply?scholarship=${scholarship.id}`}>
                    <Button className="w-full bg-white text-black hover:bg-white/90 ios-bounce mb-4">
                      Apply for ${scholarship.application_fee}
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      variant="outline"
                      className="w-full glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Free Consultation
                    </Button>
                  </Link>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

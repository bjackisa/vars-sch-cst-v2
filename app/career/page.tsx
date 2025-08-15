import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Clock, Bell, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CareerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <GlassCard className="p-12">
              <div className="mb-8">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-white/10 flex items-center justify-center">
                  <Clock className="h-12 w-12 text-white/70" />
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Career Opportunities</h1>

                <p className="text-white/70 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                  We're working hard to bring you amazing career opportunities and professional development resources.
                  This section will be available soon!
                </p>

                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 rounded-full text-sm text-white/80 mb-8">
                  <Bell className="h-4 w-4" />
                  <span>Coming Soon</span>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">What to expect:</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold mb-2">Job Opportunities</h4>
                    <p className="text-white/70 text-sm">
                      Access to international job postings and career opportunities
                    </p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold mb-2">Career Guidance</h4>
                    <p className="text-white/70 text-sm">Professional mentorship and career development resources</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold mb-2">Networking</h4>
                    <p className="text-white/70 text-sm">Connect with professionals and alumni worldwide</p>
                  </div>

                  <div className="p-4 bg-white/5 rounded-xl">
                    <h4 className="font-semibold mb-2">Skill Development</h4>
                    <p className="text-white/70 text-sm">Training programs and certification opportunities</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-white/60 mb-6">
                  In the meantime, explore our scholarship opportunities to advance your education
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/scholarships">
                    <Button size="lg" className="bg-white text-black hover:bg-white/90 ios-bounce">
                      Browse Scholarships
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      Get Notified
                    </Button>
                  </Link>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

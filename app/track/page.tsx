import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { TrackingForm } from "@/components/tracking/tracking-form"
import { GlassCard } from "@/components/ui/glass-card"
import { Search, MapPin, Clock } from "lucide-react"

export default function TrackPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Track Your Application</h1>
              <p className="text-white/70 text-lg">
                Enter your Varsity Track ID to check the status of your scholarship application
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Tracking Form */}
              <div className="lg:col-span-2">
                <TrackingForm />
              </div>

              {/* Help Section */}
              <div className="space-y-6">
                <GlassCard>
                  <h3 className="font-bold mb-4">How to Track</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        1
                      </div>
                      <p className="text-white/80 text-sm">Enter your Varsity Track ID in the search box</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        2
                      </div>
                      <p className="text-white/80 text-sm">Click "Track Application" to view your status</p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                        3
                      </div>
                      <p className="text-white/80 text-sm">View detailed information about your application</p>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-bold mb-4">Application Status</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <div>
                        <p className="text-sm font-medium">Pending</p>
                        <p className="text-xs text-white/60">Application received and queued for review</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Search className="h-4 w-4 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium">Under Review</p>
                        <p className="text-xs text-white/60">Application is being evaluated by our team</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <div>
                        <p className="text-sm font-medium">Approved</p>
                        <p className="text-xs text-white/60">Application approved and forwarded</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="font-bold mb-4">Need Help?</h3>
                  <p className="text-white/70 text-sm mb-4">
                    Can't find your tracking ID or have questions about your application?
                  </p>
                  <div className="space-y-2">
                    <p className="text-white/60 text-xs">📧 Email: support@varsityscholars.com</p>
                    <p className="text-white/60 text-xs">📞 Phone: +256 763253514</p>
                    <p className="text-white/60 text-xs">💬 WhatsApp: +91 73967 03904</p>
                  </div>
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

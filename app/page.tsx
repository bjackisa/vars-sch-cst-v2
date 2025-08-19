import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Users, Award, CheckCircle, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"

// Define the type for an event
interface Event {
  id: number
  name: string
  cover_photo_url: string | null
  start_datetime: string
  time_string: string | null
  location: string | null
  about: string | null
  organizer: string | null
  register_url: string | null
}

export default async function HomePage() {
  const supabase = createClient()

  // Fetch upcoming events
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .gt("start_datetime", new Date().toISOString())
    .order("start_datetime", { ascending: true })

  if (error) {
    console.error("Error fetching events:", error)
    // Decide how to handle the error, maybe show a message
  }

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

        {/* Events Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">Upcoming Events</h2>
              <p className="text-white/70 text-lg">
                Join us at our upcoming events to learn more about studying abroad.
              </p>
            </div>

            {events && events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {events.map((event: Event) => (
                  <GlassCard key={event.id} className="flex flex-col">
                    <div className="relative h-48 w-full mb-4">
                      <Image
                        src={event.cover_photo_url || "/placeholder.jpg"}
                        alt={event.name}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2">{event.name}</h3>
                      <div className="space-y-2 text-white/70 text-sm mb-4">
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(event.start_datetime).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{event.time_string}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-4 flex-grow">{event.about?.substring(0, 100)}...</p>
                      <Link href={event.register_url || "#"} target="_blank">
                        <Button className="w-full bg-white text-black hover:bg-white/90 ios-bounce mt-auto">
                          Register Now
                        </Button>
                      </Link>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="text-center py-12">
                <p className="text-white/70 text-lg">No upcoming events at the moment. Please check back soon!</p>
              </GlassCard>
            )}
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

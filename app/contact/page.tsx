import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, MessageCircle, Clock, Users } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Get in Touch</h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Have questions about scholarships or need guidance? We're here to help you every step of the way.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <GlassCard>
                <h2 className="text-2xl font-bold mb-6">Send us a Message</h2>

                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <Input className="glass-input" placeholder="Your full name" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input type="email" className="glass-input" placeholder="your@email.com" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <Input className="glass-input" placeholder="+256 xxx xxx xxx" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <Input className="glass-input" placeholder="How can we help you?" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <Textarea
                      className="glass-input min-h-32 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>

                  <Button className="w-full bg-white text-black hover:bg-white/90 ios-bounce">Send Message</Button>
                </form>
              </GlassCard>

              {/* Contact Information */}
              <div className="space-y-6">
                {/* Contact Details */}
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Contact Information</h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-white/70" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-white/70 text-sm">+91 73967 03904</p>
                        <p className="text-white/70 text-sm">+256 763253514</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-white/70" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-white/70 text-sm">info@varsityscholars.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-white/70" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-white/70 text-sm">Old Kampala, Uganda</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>

                {/* Free Consultation */}
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Free Consultation</h3>
                  <p className="text-white/70 mb-4">
                    Book a free consultation session with our education experts to discuss your scholarship goals.
                  </p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Clock className="h-4 w-4 text-white/70" />
                      <span className="text-sm">30-minute session</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <Users className="h-4 w-4 text-white/70" />
                      <span className="text-sm">One-on-one guidance</span>
                    </div>

                    <div className="flex items-center space-x-3">
                      <MessageCircle className="h-4 w-4 text-white/70" />
                      <span className="text-sm">Personalized advice</span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full glass-button border-white/20 text-white hover:bg-white/10 bg-transparent"
                  >
                    Book Free Consultation
                  </Button>
                </GlassCard>

                {/* Office Hours */}
                <GlassCard>
                  <h3 className="text-xl font-bold mb-4">Office Hours</h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/70">Monday - Friday</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/70">Saturday</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-white/70">Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-xs mt-4">East Africa Time (EAT)</p>
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

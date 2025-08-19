import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle, Award, Users, Globe, Building, Star, TrendingUp, Mail, Phone } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">About Us</h1>
              <p className="text-white/70 text-lg max-w-3xl mx-auto">
                At the nexus of ambition and opportunity, we are dedicated to empowering the next generation of global scholars.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <GlassCard>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <CheckCircle className="h-6 w-6 mr-3 text-green-400" />
                  Our Mission & Promise
                </h2>
                <p className="text-white/80">
                  Varsity Scholars Consult is a legally registered consultancy devoted to guiding students toward their academic and professional aspirations. We passionately strive to fuel dreams with faith and ignite hope by making education accessible to all, equipping learners with the tools they need to succeed globally.
                </p>
              </GlassCard>
              <GlassCard>
                <h2 className="text-2xl font-bold mb-4 flex items-center">
                  <Users className="h-6 w-6 mr-3 text-blue-400" />
                  Who We Are
                </h2>
                <p className="text-white/80">
                  As a fully registered entity, Varsity Scholars Consult specializes in sourcing both fully funded and partial scholarships, offering education and career consultancy, and delivering tailored support every step of the way—from scholarship searches and VISA processing to accommodation and pre-departure arrangements.
                </p>
              </GlassCard>
            </div>

            <GlassCard className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">What We Do</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { title: "Scholarship Assistance", description: "Support in sourcing and applying for both fully funded and partial scholarships globally." },
                  { title: "Educational Consultancy", description: "Custom guidance on school and program selection, application processes, and overall academic strategy." },
                  { title: "VISA Support", description: "Dedicated guidance for flight booking and visa processing, ensuring seamless transitions." },
                  { title: "Fight Itinerary", description: "Expert airport pick-up and onward travel coordination—so students arrive calm, supported, and ready." },
                  { title: "Hostel & Housing", description: "Carefully arranged hostel or accommodation matches—secure, convenient, and stress-free." },
                  { title: "Teaching Assistantship", description: "Internships and research placements to deepen academic experience and enhance professional development." },
                ].map(service => (
                  <div key={service.title} className="p-4 rounded-lg bg-white/5">
                    <h3 className="font-bold mb-2">{service.title}</h3>
                    <p className="text-sm text-white/70">{service.description}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                <GlassCard>
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Globe className="h-6 w-6 mr-3 text-purple-400" />
                    Global Opportunities
                    </h2>
                    <ul className="space-y-2 text-white/80">
                    {[
                        "Chevening Scholarships",
                        "Commonwealth Scholarships",
                        "Erasmus Scholarships",
                        "Study in India programs",
                        "And many more...",
                    ].map(item => (
                        <li key={item} className="flex items-start">
                        <Award className="h-5 w-5 mr-2 mt-1 text-yellow-400 flex-shrink-0" />
                        <span>{item}</span>
                        </li>
                    ))}
                    </ul>
                </GlassCard>
                <GlassCard>
                    <h2 className="text-2xl font-bold mb-4 flex items-center">
                    <Building className="h-6 w-6 mr-3 text-teal-400" />
                    Regions We Serve
                    </h2>
                    <div className="flex flex-wrap gap-4">
                    {["India", "Russia", "Europe", "USA"].map(region => (
                        <div key={region} className="bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                        {region}
                        </div>
                    ))}
                    </div>
                </GlassCard>
            </div>

            <GlassCard className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Proven Impact</h2>
              <div className="flex justify-around text-center">
                <div>
                  <p className="text-4xl font-bold text-green-400">98</p>
                  <p className="text-white/70">Fully Funded Scholars</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-400">42</p>
                  <p className="text-white/70">Partial Scholarships</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-yellow-400">70</p>
                  <p className="text-white/70">Visa Approvals</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">What Students Say</h2>
              <div className="text-center italic text-white/80 max-w-2xl mx-auto">
                <p>"Nakiboneka Amina, Atugonza Craig Dan, and Ndoko Laura are among the bright minds who have studied abroad thanks to our support—specifically in India—highlighting the personal and enduring relationships we build."</p>
              </div>
            </GlassCard>

            <GlassCard className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8">Featured Initiatives & Summits</h2>
              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-white/5">
                    <h3 className="font-bold">World Health Summit Stipend Program 2025 (Germany)</h3>
                    <p className="text-sm text-white/70">Fully funded—including travel, accommodation, daily allowance; open to global students and professionals in health fields. Deadline: April 30, 2025.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                    <h3 className="font-bold">SRM Institute of Science and Technology, Chennai</h3>
                    <p className="text-sm text-white/70">A renowned private university in India offering research and academic collaboration opportunities.</p>
                </div>
                <div className="p-4 rounded-lg bg-white/5">
                    <h3 className="font-bold">ICCR Open Admission 2024/2025</h3>
                    <p className="text-sm text-white/70">A fully funded scholarship program inclusive of flight and monthly living allowance.</p>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="text-3xl font-bold text-center mb-8">Let’s Connect</h2>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 text-center">
                <div className="flex items-center">
                  <Mail className="h-6 w-6 mr-3 text-red-400" />
                  <a href="mailto:varsityscholarsconsult@gmail.com" className="hover:underline">varsityscholarsconsult@gmail.com</a>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 mr-3 text-green-400" />
                  <div>
                    <p>+256 757 992 736</p>
                    <p>+97 999 514 0053</p>
                  </div>
                </div>
              </div>
              <p className="text-center text-white/70 mt-6 text-sm">(Protected and responsive assistance whenever you need it.)</p>
            </GlassCard>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

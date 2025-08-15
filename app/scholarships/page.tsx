import { createClient } from "@/lib/supabase/server"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ScholarshipFilters } from "@/components/scholarships/scholarship-filters"
import { ScholarshipGrid } from "@/components/scholarships/scholarship-grid"
import { GlassCard } from "@/components/ui/glass-card"
import { Search, Filter } from "lucide-react"

export default async function ScholarshipsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // Build query based on search parameters
  let query = supabase
    .from("scholarships")
    .select(
      `
      *,
      country:countries(*)
    `,
    )
    .eq("is_active", true)

  // Apply filters
  if (searchParams.country) {
    query = query.eq("country.code", searchParams.country)
  }

  if (searchParams.funding_type) {
    query = query.eq("funding_type", searchParams.funding_type)
  }

  if (searchParams.education_level) {
    query = query.contains("education_level", [searchParams.education_level])
  }

  if (searchParams.gender) {
    query = query.in("gender_requirement", ["any", searchParams.gender])
  }

  if (searchParams.ugandans === "true") {
    query = query.eq("available_for_ugandans", true)
  }

  if (searchParams.search) {
    query = query.ilike("name", `%${searchParams.search}%`)
  }

  const { data: scholarships, error } = await query.order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching scholarships:", error)
  }

  // Get countries for filter
  const { data: countries } = await supabase.from("countries").select("*").order("name")

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Global Scholarships</h1>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Discover life-changing scholarship opportunities from universities and organizations worldwide
              </p>
            </div>

            {/* Search Bar */}
            <GlassCard className="mb-8">
              <div className="flex items-center space-x-4">
                <Search className="h-5 w-5 text-white/50" />
                <form method="GET" className="flex-1">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search scholarships..."
                    defaultValue={searchParams.search as string}
                    className="w-full bg-transparent border-none outline-none text-white placeholder-white/50"
                  />
                  <input type="hidden" name="country" value={searchParams.country as string} />
                  <input type="hidden" name="funding_type" value={searchParams.funding_type as string} />
                  <input type="hidden" name="education_level" value={searchParams.education_level as string} />
                  <input type="hidden" name="gender" value={searchParams.gender as string} />
                  <input type="hidden" name="ugandans" value={searchParams.ugandans as string} />
                </form>
                <Filter className="h-5 w-5 text-white/50" />
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Filters and Results */}
        <section className="pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <ScholarshipFilters countries={countries || []} searchParams={searchParams} />
              </div>

              {/* Scholarships Grid */}
              <div className="lg:col-span-3">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{scholarships?.length || 0} Scholarships Found</h2>
                </div>

                <ScholarshipGrid scholarships={scholarships || []} />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ApplicationForm } from "@/components/application/application-form"

export default async function ApplyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/apply")
  }

  // Get user profile
  const { data: userProfile } = await supabase.from("users").select("*").eq("id", user.id).single()

  // Get scholarship if specified
  let scholarship = null
  if (searchParams.scholarship) {
    const { data } = await supabase
      .from("scholarships")
      .select(
        `
        *,
        country:countries(*)
      `,
      )
      .eq("id", searchParams.scholarship as string)
      .single()

    scholarship = data
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4">Apply for Scholarship</h1>
              <p className="text-white/70 text-lg">
                Complete your application in 3 simple steps. We'll guide you through the entire process.
              </p>
            </div>

            <ApplicationForm user={user} userProfile={userProfile} preselectedScholarship={scholarship} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

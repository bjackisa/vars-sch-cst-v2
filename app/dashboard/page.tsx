import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, FileText, Bell, Plus } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage({
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
    redirect("/auth/login")
  }

  // Get user applications
  const { data: applications } = await supabase
    .from("applications")
    .select(
      `
      *,
      scholarship:scholarships(
        name,
        country:countries(name, flag_emoji)
      )
    `,
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Get notifications
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .eq("is_read", false)
    .order("created_at", { ascending: false })
    .limit(5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400"
      case "rejected":
        return "text-red-400"
      case "under_review":
        return "text-yellow-400"
      default:
        return "text-white/70"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return CheckCircle
      case "rejected":
        return FileText
      default:
        return Clock
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Success Message */}
            {searchParams.success && (
              <GlassCard className="mb-8 bg-green-500/10 border-green-500/20">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                  <div>
                    <h3 className="font-semibold text-green-400">Application Submitted Successfully!</h3>
                    <p className="text-white/70">
                      Your tracking ID is: <span className="font-mono">{searchParams.tracking_id}</span>
                    </p>
                  </div>
                </div>
              </GlassCard>
            )}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Dashboard</h1>
                <p className="text-white/70">Track your applications and manage your profile</p>
              </div>

              <Link href="/apply">
                <Button className="bg-white text-black hover:bg-white/90 ios-bounce">
                  <Plus className="mr-2 h-4 w-4" />
                  New Application
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Applications */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Your Applications</h2>

                {applications && applications.length > 0 ? (
                  <div className="space-y-4">
                    {applications.map((application: any) => {
                      const StatusIcon = getStatusIcon(application.status)

                      return (
                        <GlassCard key={application.id} hover>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold">
                                {application.scholarship?.name?.charAt(0) || "S"}
                              </div>

                              <div>
                                <h3 className="font-semibold text-lg mb-1">
                                  {application.scholarship?.name || "Scholarship"}
                                </h3>
                                <p className="text-white/70 text-sm mb-2">
                                  {application.scholarship?.country?.flag_emoji}{" "}
                                  {application.scholarship?.country?.name}
                                </p>
                                <p className="text-white/60 text-xs">
                                  Tracking ID: <span className="font-mono">{application.id}</span>
                                </p>
                                <p className="text-white/60 text-xs">
                                  Applied: {new Date(application.created_at).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <div className={`flex items-center space-x-2 ${getStatusColor(application.status)}`}>
                                <StatusIcon className="h-4 w-4" />
                                <span className="text-sm font-medium capitalize">
                                  {application.status.replace("_", " ")}
                                </span>
                              </div>
                              <p className="text-white/60 text-xs mt-1">${application.amount_paid}</p>
                            </div>
                          </div>
                        </GlassCard>
                      )
                    })}
                  </div>
                ) : (
                  <GlassCard className="text-center py-12">
                    <FileText className="h-12 w-12 mx-auto mb-4 text-white/50" />
                    <h3 className="text-xl font-semibold mb-2">No Applications Yet</h3>
                    <p className="text-white/70 mb-6">Start your journey by applying for a scholarship</p>
                    <Link href="/scholarships">
                      <Button className="bg-white text-black hover:bg-white/90 ios-bounce">Browse Scholarships</Button>
                    </Link>
                  </GlassCard>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Notifications */}
                <GlassCard>
                  <div className="flex items-center space-x-2 mb-4">
                    <Bell className="h-5 w-5 text-white/70" />
                    <h3 className="font-semibold">Recent Notifications</h3>
                  </div>

                  {notifications && notifications.length > 0 ? (
                    <div className="space-y-3">
                      {notifications.map((notification: any) => (
                        <div key={notification.id} className="p-3 bg-white/5 rounded-lg">
                          <h4 className="font-medium text-sm mb-1">{notification.title}</h4>
                          <p className="text-white/70 text-xs">{notification.message}</p>
                          <p className="text-white/50 text-xs mt-1">
                            {new Date(notification.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/60 text-sm">No new notifications</p>
                  )}
                </GlassCard>

                {/* Quick Actions */}
                <GlassCard>
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Link href="/apply">
                      <Button variant="outline" className="w-full glass-button justify-start bg-transparent">
                        <Plus className="mr-2 h-4 w-4" />
                        New Application
                      </Button>
                    </Link>
                    <Link href="/scholarships">
                      <Button variant="outline" className="w-full glass-button justify-start bg-transparent">
                        <FileText className="mr-2 h-4 w-4" />
                        Browse Scholarships
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline" className="w-full glass-button justify-start bg-transparent">
                        <Bell className="mr-2 h-4 w-4" />
                        Get Support
                      </Button>
                    </Link>
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

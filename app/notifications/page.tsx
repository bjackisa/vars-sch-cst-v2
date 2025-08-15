import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { NotificationsList } from "@/components/notifications/notifications-list"
import { GlassCard } from "@/components/ui/glass-card"
import { Bell } from "lucide-react"

export default async function NotificationsPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/notifications")
  }

  // Get all notifications for the user
  const { data: notifications } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  // Mark all notifications as read
  await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false)

  const unreadCount = notifications?.filter((n) => !n.is_read).length || 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold font-serif mb-2">Notifications</h1>
                <p className="text-white/70">Stay updated on your applications and important announcements</p>
              </div>

              {unreadCount > 0 && (
                <div className="flex items-center space-x-2 px-3 py-1 bg-blue-500/20 rounded-full">
                  <Bell className="h-4 w-4 text-blue-400" />
                  <span className="text-blue-400 text-sm font-medium">{unreadCount} new</span>
                </div>
              )}
            </div>

            {notifications && notifications.length > 0 ? (
              <NotificationsList notifications={notifications} />
            ) : (
              <GlassCard className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto mb-4 text-white/50" />
                <h3 className="text-xl font-semibold mb-2">No Notifications Yet</h3>
                <p className="text-white/70">
                  You'll receive notifications here when there are updates to your applications or important
                  announcements.
                </p>
              </GlassCard>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

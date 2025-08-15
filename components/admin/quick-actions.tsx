import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Plus, Users, MessageSquare, Settings, Bell, FileText } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Add Scholarship",
      description: "Create new scholarship opportunity",
      icon: Plus,
      href: "/admin/scholarships/new",
      color: "bg-blue-500/20 text-blue-400",
    },
    {
      title: "Manage Applications",
      description: "Review and update applications",
      icon: FileText,
      href: "/admin/applications",
      color: "bg-green-500/20 text-green-400",
    },
    {
      title: "Send Notification",
      description: "Broadcast message to users",
      icon: Bell,
      href: "/admin/notifications",
      color: "bg-yellow-500/20 text-yellow-400",
    },
    {
      title: "User Management",
      description: "Manage user accounts",
      icon: Users,
      href: "/admin/users",
      color: "bg-purple-500/20 text-purple-400",
    },
    {
      title: "Support Requests",
      description: "Handle user inquiries",
      icon: MessageSquare,
      href: "/admin/support",
      color: "bg-red-500/20 text-red-400",
    },
    {
      title: "Settings",
      description: "System configuration",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500/20 text-gray-400",
    },
  ]

  return (
    <GlassCard>
      <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action, index) => {
          const Icon = action.icon
          return (
            <Link key={index} href={action.href}>
              <Button
                variant="outline"
                className="w-full glass-button justify-start bg-transparent p-4 h-auto hover:bg-white/10"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 ${action.color}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <p className="font-medium">{action.title}</p>
                  <p className="text-white/60 text-xs">{action.description}</p>
                </div>
              </Button>
            </Link>
          )
        })}
      </div>
    </GlassCard>
  )
}

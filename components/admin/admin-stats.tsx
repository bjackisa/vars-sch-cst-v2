import { GlassCard } from "@/components/ui/glass-card"
import { Users, FileText, GraduationCap, Clock } from "lucide-react"

interface AdminStatsProps {
  stats: {
    totalApplications: number
    pendingApplications: number
    totalScholarships: number
    totalUsers: number
  }
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statCards = [
    {
      title: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "text-blue-400",
    },
    {
      title: "Pending Reviews",
      value: stats.pendingApplications,
      icon: Clock,
      color: "text-yellow-400",
    },
    {
      title: "Active Scholarships",
      value: stats.totalScholarships,
      icon: GraduationCap,
      color: "text-green-400",
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-400",
    },
  ]

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <GlassCard key={index} className="text-center">
              <Icon className={`h-8 w-8 mx-auto mb-3 ${stat.color}`} />
              <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
              <p className="text-white/70 text-sm">{stat.title}</p>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}

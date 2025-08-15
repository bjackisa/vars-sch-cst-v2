import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Eye, CheckCircle, XCircle, Clock, FileText } from "lucide-react"
import Link from "next/link"

interface Application {
  id: string
  status: string
  created_at: string
  amount_paid: number
  scholarship: {
    name: string
    country: {
      name: string
      flag_emoji: string
    }
  }
  user: {
    full_name: string
    email: string
  }
}

interface RecentApplicationsProps {
  applications: Application[]
}

export function RecentApplications({ applications }: RecentApplicationsProps) {
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
        return XCircle
      default:
        return Clock
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Recent Applications</h2>
        <Link href="/admin/applications">
          <Button variant="outline" className="glass-button bg-transparent">
            View All
          </Button>
        </Link>
      </div>

      <GlassCard>
        {applications.length > 0 ? (
          <div className="space-y-4">
            {applications.map((application) => {
              const StatusIcon = getStatusIcon(application.status)

              return (
                <div key={application.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                      {application.scholarship?.name?.charAt(0) || "S"}
                    </div>

                    <div>
                      <h3 className="font-semibold">{application.user.full_name}</h3>
                      <p className="text-white/70 text-sm">
                        {application.scholarship?.country?.flag_emoji} {application.scholarship?.name}
                      </p>
                      <p className="text-white/60 text-xs">
                        {new Date(application.created_at).toLocaleDateString()} • ${application.amount_paid}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className={`flex items-center space-x-2 ${getStatusColor(application.status)}`}>
                      <StatusIcon className="h-4 w-4" />
                      <span className="text-sm font-medium capitalize">{application.status.replace("_", " ")}</span>
                    </div>

                    <Link href={`/admin/applications/${application.id}`}>
                      <Button size="sm" variant="outline" className="glass-button bg-transparent">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <FileText className="h-12 w-12 mx-auto mb-4 text-white/50" />
            <p className="text-white/70">No applications yet</p>
          </div>
        )}
      </GlassCard>
    </div>
  )
}

import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Eye, Clock } from "lucide-react"
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

interface ApplicationsTableProps {
  applications: Application[]
}

export function ApplicationsTable({ applications }: ApplicationsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-400 bg-green-500/20"
      case "rejected":
        return "text-red-400 bg-red-500/20"
      case "under_review":
        return "text-yellow-400 bg-yellow-500/20"
      default:
        return "text-white/70 bg-white/10"
    }
  }

  return (
    <GlassCard>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 font-semibold">Applicant</th>
              <th className="text-left py-3 px-4 font-semibold">Scholarship</th>
              <th className="text-left py-3 px-4 font-semibold">Status</th>
              <th className="text-left py-3 px-4 font-semibold">Date</th>
              <th className="text-left py-3 px-4 font-semibold">Amount</th>
              <th className="text-left py-3 px-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{application.user.full_name}</p>
                    <p className="text-white/60 text-sm">{application.user.email}</p>
                    <p className="text-white/50 text-xs font-mono">{application.id}</p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium">{application.scholarship.name}</p>
                    <p className="text-white/60 text-sm">
                      {application.scholarship.country.flag_emoji} {application.scholarship.country.name}
                    </p>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                    {application.status.replace("_", " ").toUpperCase()}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <p className="text-sm">{new Date(application.created_at).toLocaleDateString()}</p>
                </td>
                <td className="py-4 px-4">
                  <p className="font-medium">${application.amount_paid}</p>
                </td>
                <td className="py-4 px-4">
                  <Link href={`/admin/applications/${application.id}`}>
                    <Button size="sm" variant="outline" className="glass-button bg-transparent">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {applications.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 mx-auto mb-4 text-white/50" />
            <p className="text-white/70">No applications found</p>
          </div>
        )}
      </div>
    </GlassCard>
  )
}

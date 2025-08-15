import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle, Clock, AlertCircle, XCircle, User, FileText, CreditCard } from "lucide-react"

interface ApplicationTrackingResultProps {
  application: any
}

export function ApplicationTrackingResult({ application }: ApplicationTrackingResultProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "approved":
        return {
          icon: CheckCircle,
          color: "text-green-400",
          bgColor: "bg-green-500/20",
          title: "Application Approved",
          description: "Congratulations! Your application has been approved and forwarded to the scholarship provider.",
        }
      case "rejected":
        return {
          icon: XCircle,
          color: "text-red-400",
          bgColor: "bg-red-500/20",
          title: "Application Not Approved",
          description: "Unfortunately, your application was not approved at this time. Please check admin notes below.",
        }
      case "under_review":
        return {
          icon: AlertCircle,
          color: "text-yellow-400",
          bgColor: "bg-yellow-500/20",
          title: "Under Review",
          description: "Your application is currently being reviewed by our team. We'll update you soon.",
        }
      default:
        return {
          icon: Clock,
          color: "text-blue-400",
          bgColor: "bg-blue-500/20",
          title: "Application Received",
          description: "Your application has been received and is in the queue for review.",
        }
    }
  }

  const statusInfo = getStatusInfo(application.status)
  const StatusIcon = statusInfo.icon

  const timeline = [
    {
      title: "Application Submitted",
      date: new Date(application.created_at),
      completed: true,
      icon: CheckCircle,
      color: "text-green-400",
    },
    {
      title: "Payment Processed",
      date: new Date(application.created_at),
      completed: application.payment_status === "completed",
      icon: CreditCard,
      color: application.payment_status === "completed" ? "text-green-400" : "text-white/50",
    },
    {
      title: "Under Review",
      date: application.reviewed_at ? new Date(application.reviewed_at) : null,
      completed: ["under_review", "approved", "rejected"].includes(application.status),
      icon: AlertCircle,
      color: ["under_review", "approved", "rejected"].includes(application.status)
        ? "text-yellow-400"
        : "text-white/50",
    },
    {
      title: "Decision Made",
      date: application.reviewed_at ? new Date(application.reviewed_at) : null,
      completed: ["approved", "rejected"].includes(application.status),
      icon: application.status === "approved" ? CheckCircle : application.status === "rejected" ? XCircle : Clock,
      color:
        application.status === "approved"
          ? "text-green-400"
          : application.status === "rejected"
            ? "text-red-400"
            : "text-white/50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <GlassCard className={`${statusInfo.bgColor} border-opacity-50`}>
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center ${statusInfo.color}`}>
            <StatusIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-2">{statusInfo.title}</h3>
            <p className="text-white/80 mb-4">{statusInfo.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-white/60">Tracking ID:</span>
                <span className="ml-2 font-mono">{application.id}</span>
              </div>
              <div>
                <span className="text-white/60">Submitted:</span>
                <span className="ml-2">{new Date(application.created_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Details */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4">Application Details</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <User className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="font-medium">{application.user.full_name}</p>
                <p className="text-white/70 text-sm">{application.user.email}</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <FileText className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="font-medium">{application.scholarship.name}</p>
                <p className="text-white/70 text-sm">
                  {application.scholarship.country.flag_emoji} {application.scholarship.country.name}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <CreditCard className="h-5 w-5 text-white/70 mt-0.5" />
              <div>
                <p className="font-medium">${application.amount_paid} Paid</p>
                <p className="text-white/70 text-sm capitalize">
                  via {application.payment_method?.replace("_", " ")} • {application.payment_status}
                </p>
              </div>
            </div>
          </div>

          {application.admin_notes && (
            <div className="mt-6 p-4 bg-white/5 rounded-lg">
              <h4 className="font-medium mb-2">Admin Notes</h4>
              <p className="text-white/80 text-sm">{application.admin_notes}</p>
            </div>
          )}
        </GlassCard>

        {/* Timeline */}
        <GlassCard>
          <h3 className="text-xl font-bold mb-4">Application Timeline</h3>
          <div className="space-y-4">
            {timeline.map((item, index) => {
              const ItemIcon = item.icon
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full bg-white/10 flex items-center justify-center ${item.color}`}>
                    <ItemIcon className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium ${item.completed ? "text-white" : "text-white/50"}`}>{item.title}</p>
                    {item.date && <p className="text-white/60 text-xs">{item.date.toLocaleDateString()}</p>}
                    {!item.date && !item.completed && <p className="text-white/40 text-xs">Pending</p>}
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      </div>

      {/* Next Steps */}
      <GlassCard>
        <h3 className="text-xl font-bold mb-4">What's Next?</h3>
        <div className="space-y-3">
          {application.status === "pending" && (
            <p className="text-white/80">
              Your application is in the queue for review. Our team will evaluate your documents and get back to you
              within 5-7 business days.
            </p>
          )}
          {application.status === "under_review" && (
            <p className="text-white/80">
              Our team is currently reviewing your application. We'll notify you as soon as a decision is made.
            </p>
          )}
          {application.status === "approved" && (
            <div className="space-y-2">
              <p className="text-white/80">
                Congratulations! Your application has been approved and forwarded to the scholarship provider.
              </p>
              <p className="text-white/70 text-sm">
                You should expect to hear from them directly within the next few weeks. Keep an eye on your email!
              </p>
            </div>
          )}
          {application.status === "rejected" && (
            <div className="space-y-2">
              <p className="text-white/80">
                While this application wasn't successful, don't give up! There are many other opportunities available.
              </p>
              <p className="text-white/70 text-sm">
                Browse our other scholarships or contact us for guidance on improving future applications.
              </p>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  )
}

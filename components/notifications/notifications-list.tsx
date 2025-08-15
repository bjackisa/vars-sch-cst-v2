import { GlassCard } from "@/components/ui/glass-card"
import { Bell, CheckCircle, Info, Clock } from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: string
  is_read: boolean
  created_at: string
  application_id?: string
}

interface NotificationsListProps {
  notifications: Notification[]
}

export function NotificationsList({ notifications }: NotificationsListProps) {
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application_update":
        return CheckCircle
      case "reminder":
        return Clock
      case "system":
        return Info
      default:
        return Bell
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "application_update":
        return "text-green-400"
      case "reminder":
        return "text-yellow-400"
      case "system":
        return "text-blue-400"
      default:
        return "text-white/70"
    }
  }

  const groupNotificationsByDate = (notifications: Notification[]) => {
    const groups: { [key: string]: Notification[] } = {}

    notifications.forEach((notification) => {
      const date = new Date(notification.created_at).toDateString()
      if (!groups[date]) {
        groups[date] = []
      }
      groups[date].push(notification)
    })

    return groups
  }

  const groupedNotifications = groupNotificationsByDate(notifications)

  const formatDateGroup = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday"
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    }
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedNotifications).map(([dateString, dayNotifications]) => (
        <div key={dateString}>
          <h2 className="text-lg font-semibold mb-4 text-white/80">{formatDateGroup(dateString)}</h2>

          <div className="space-y-3">
            {dayNotifications.map((notification) => {
              const Icon = getNotificationIcon(notification.type)
              const iconColor = getNotificationColor(notification.type)

              return (
                <GlassCard
                  key={notification.id}
                  className={`${!notification.is_read ? "bg-white/10 border-white/20" : ""} hover:bg-white/5 transition-colors`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center ${iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-white mb-1">{notification.title}</h3>
                        {!notification.is_read && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 mt-2"></div>
                        )}
                      </div>

                      <p className="text-white/80 text-sm mb-2 leading-relaxed">{notification.message}</p>

                      <div className="flex items-center justify-between">
                        <p className="text-white/50 text-xs">
                          {new Date(notification.created_at).toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>

                        {notification.application_id && (
                          <p className="text-white/50 text-xs font-mono">App: {notification.application_id}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

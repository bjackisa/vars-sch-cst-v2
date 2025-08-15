"use client"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, FileText, CreditCard, MessageSquare, CheckCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface ApplicationDetailsProps {
  application: any
  adminUser: any
}

export function ApplicationDetails({ application, adminUser }: ApplicationDetailsProps) {
  const [status, setStatus] = useState(application.status)
  const [adminNotes, setAdminNotes] = useState(application.admin_notes || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleStatusUpdate = async () => {
    setLoading(true)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from("applications")
        .update({
          status,
          admin_notes: adminNotes,
          reviewed_by: adminUser.id,
          reviewed_at: new Date().toISOString(),
        })
        .eq("id", application.id)

      if (error) throw error

      // Create notification for user
      await supabase.from("notifications").insert({
        user_id: application.user_id,
        application_id: application.id,
        title: `Application ${status.replace("_", " ")}`,
        message: `Your application for ${application.scholarship.name} has been ${status.replace("_", " ")}.${
          adminNotes ? ` Admin notes: ${adminNotes}` : ""
        }`,
        type: "application_update",
      })

      router.refresh()
    } catch (error) {
      console.error("Error updating application:", error)
      alert("Failed to update application")
    } finally {
      setLoading(false)
    }
  }

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin/applications">
            <Button variant="outline" className="glass-button bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold font-serif">Application Details</h1>
            <p className="text-white/70">Tracking ID: {application.id}</p>
          </div>
        </div>

        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(application.status)}`}>
          {application.status.replace("_", " ").toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <GlassCard>
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-5 w-5 text-white/70" />
              <h2 className="text-xl font-bold">Personal Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Full Name</label>
                <p className="font-medium">{application.full_name}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Email</label>
                <p className="font-medium">{application.email}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Phone</label>
                <p className="font-medium">{application.phone}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Date of Birth</label>
                <p className="font-medium">{new Date(application.date_of_birth).toLocaleDateString()}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Gender</label>
                <p className="font-medium capitalize">{application.gender}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Nationality</label>
                <p className="font-medium">{application.nationality}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/60 mb-1">Address</label>
                <p className="font-medium">{application.address}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Emergency Contact</label>
                <p className="font-medium">{application.emergency_contact_name}</p>
                <p className="text-white/70 text-sm">{application.emergency_contact_phone}</p>
              </div>
            </div>
          </GlassCard>

          {/* Documents */}
          <GlassCard>
            <div className="flex items-center space-x-3 mb-4">
              <FileText className="h-5 w-5 text-white/70" />
              <h2 className="text-xl font-bold">Documents</h2>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span>Passport Photo</span>
                <Button size="sm" variant="outline" className="glass-button bg-transparent">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span>Academic Documents</span>
                <Button size="sm" variant="outline" className="glass-button bg-transparent">
                  View
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <span>Passport Document</span>
                <Button size="sm" variant="outline" className="glass-button bg-transparent">
                  View
                </Button>
              </div>
            </div>
          </GlassCard>

          {/* Payment Information */}
          <GlassCard>
            <div className="flex items-center space-x-3 mb-4">
              <CreditCard className="h-5 w-5 text-white/70" />
              <h2 className="text-xl font-bold">Payment Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-white/60 mb-1">Payment Method</label>
                <p className="font-medium capitalize">{application.payment_method?.replace("_", " ")}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Payment Status</label>
                <p className="font-medium capitalize">{application.payment_status}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Amount Paid</label>
                <p className="font-medium">${application.amount_paid}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Payment Reference</label>
                <p className="font-medium font-mono text-sm">{application.payment_reference}</p>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Scholarship Info */}
          <GlassCard>
            <h3 className="font-bold mb-4">Scholarship Details</h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium">{application.scholarship.name}</p>
                <p className="text-white/70 text-sm">
                  {application.scholarship.country.flag_emoji} {application.scholarship.country.name}
                </p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Funding Type</label>
                <p className="text-sm capitalize">{application.scholarship.funding_type.replace("_", " ")}</p>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-1">Education Level</label>
                <p className="text-sm capitalize">{application.scholarship.education_level.join(", ")}</p>
              </div>
            </div>
          </GlassCard>

          {/* Admin Actions */}
          <GlassCard>
            <div className="flex items-center space-x-3 mb-4">
              <MessageSquare className="h-5 w-5 text-white/70" />
              <h3 className="font-bold">Admin Actions</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full glass-input p-3">
                  <option value="pending" className="bg-black">
                    Pending
                  </option>
                  <option value="under_review" className="bg-black">
                    Under Review
                  </option>
                  <option value="approved" className="bg-black">
                    Approved
                  </option>
                  <option value="rejected" className="bg-black">
                    Rejected
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Admin Notes</label>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  className="glass-input min-h-24 resize-none"
                  placeholder="Add notes about this application..."
                />
              </div>

              <Button
                onClick={handleStatusUpdate}
                disabled={loading}
                className="w-full bg-white text-black hover:bg-white/90 ios-bounce"
              >
                {loading ? "Updating..." : "Update Application"}
              </Button>
            </div>
          </GlassCard>

          {/* Application Timeline */}
          <GlassCard>
            <h3 className="font-bold mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <div>
                  <p className="text-sm font-medium">Application Submitted</p>
                  <p className="text-xs text-white/60">{new Date(application.created_at).toLocaleString()}</p>
                </div>
              </div>

              {application.reviewed_at && (
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <div>
                    <p className="text-sm font-medium">Last Reviewed</p>
                    <p className="text-xs text-white/60">{new Date(application.reviewed_at).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  )
}

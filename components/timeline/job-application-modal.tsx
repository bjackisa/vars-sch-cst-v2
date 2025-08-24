"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { applyForJob } from "@/lib/post-actions"
import { Briefcase, DollarSign, Clock } from "lucide-react"
import { format } from "date-fns"

interface JobApplicationModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: string
    title: string
    job_position?: string
    job_salary_range?: string
    application_deadline?: string
  }
}

export function JobApplicationModal({ isOpen, onClose, post }: JobApplicationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await applyForJob(post.id, formData)
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({ name: "", email: "", phone: "", resumeUrl: "", coverLetter: "" })
      }, 2000)
    } catch (error: any) {
      console.error("Error applying for job:", error)
      alert(error.message || "Failed to submit application")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="glass-card">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-purple-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Application Submitted!</h3>
            <p className="text-muted-foreground">
              Your application for {post.job_position} has been submitted successfully. We'll review it and get back to
              you soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-foreground">Apply for Position</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Job Details */}
          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
            <h3 className="font-semibold text-purple-300 mb-3">{post.title}</h3>
            <div className="space-y-2 text-sm">
              {post.job_position && (
                <div className="flex items-center gap-2 text-purple-300">
                  <Briefcase className="w-4 h-4" />
                  <span>{post.job_position}</span>
                </div>
              )}
              {post.job_salary_range && (
                <div className="flex items-center gap-2 text-purple-300">
                  <DollarSign className="w-4 h-4" />
                  <span>{post.job_salary_range}</span>
                </div>
              )}
              {post.application_deadline && (
                <div className="flex items-center gap-2 text-purple-300">
                  <Clock className="w-4 h-4" />
                  <span>Apply by {format(new Date(post.application_deadline), "PPP")}</span>
                </div>
              )}
            </div>
          </div>

          {/* Application Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">
                  Full Name
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-muted/50 border-border/20"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-muted/50 border-border/20"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-foreground">
                  Phone (Optional)
                </Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="bg-muted/50 border-border/20"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumeUrl" className="text-foreground">
                  Resume URL (Optional)
                </Label>
                <Input
                  id="resumeUrl"
                  type="url"
                  value={formData.resumeUrl}
                  onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                  className="bg-muted/50 border-border/20"
                  placeholder="https://drive.google.com/..."
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="coverLetter" className="text-foreground">
                Cover Letter
              </Label>
              <Textarea
                id="coverLetter"
                value={formData.coverLetter}
                onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                className="bg-muted/50 border-border/20 min-h-[120px]"
                placeholder="Tell us why you're interested in this position..."
                required
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

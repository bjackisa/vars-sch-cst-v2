"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { bookEvent } from "@/lib/post-actions"
import { Calendar, MapPin, DollarSign } from "lucide-react"
import { format } from "date-fns"

interface EventBookingModalProps {
  isOpen: boolean
  onClose: () => void
  post: {
    id: string
    title: string
    event_date?: string
    event_location?: string
    event_cost?: number
  }
}

export function EventBookingModal({ isOpen, onClose, post }: EventBookingModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await bookEvent(post.id, formData)
      setSuccess(true)
      setTimeout(() => {
        onClose()
        setSuccess(false)
        setFormData({ name: "", email: "", phone: "" })
      }, 2000)
    } catch (error: any) {
      console.error("Error booking event:", error)
      alert(error.message || "Failed to book event")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="glass-card">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-green-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h3>
            <p className="text-muted-foreground">
              You have successfully booked your spot for {post.title}. We'll send you more details soon.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="glass-card">
        <DialogHeader>
          <DialogTitle className="text-foreground">Book Event</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Event Details */}
          <div className="bg-green-500/10 rounded-lg p-4 border border-green-400/20">
            <h3 className="font-semibold text-green-300 mb-3">{post.title}</h3>
            <div className="space-y-2 text-sm">
              {post.event_date && (
                <div className="flex items-center gap-2 text-green-300">
                  <Calendar className="w-4 h-4" />
                  <span>{format(new Date(post.event_date), "PPP p")}</span>
                </div>
              )}
              {post.event_location && (
                <div className="flex items-center gap-2 text-green-300">
                  <MapPin className="w-4 h-4" />
                  <span>{post.event_location}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-green-300">
                <DollarSign className="w-4 h-4" />
                <span>{post.event_cost === 0 ? "Free" : `UGX ${post.event_cost?.toLocaleString()}`}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? "Booking..." : "Book Event"}
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

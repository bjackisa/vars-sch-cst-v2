"use client"

import type React from "react"

import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { ApplicationTrackingResult } from "./application-tracking-result"

export function TrackingForm() {
  const [trackingId, setTrackingId] = useState("")
  const [loading, setLoading] = useState(false)
  const [application, setApplication] = useState<any>(null)
  const [error, setError] = useState("")

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!trackingId.trim()) {
      setError("Please enter a tracking ID")
      return
    }

    setLoading(true)
    setError("")
    setApplication(null)

    try {
      const supabase = createClient()
      const { data, error: fetchError } = await supabase
        .from("applications")
        .select(
          `
          *,
          scholarship:scholarships(
            name,
            country:countries(name, flag_emoji)
          ),
          user:users(full_name, email)
        `,
        )
        .eq("id", trackingId.trim())
        .single()

      if (fetchError || !data) {
        setError("Application not found. Please check your tracking ID and try again.")
        return
      }

      setApplication(data)
    } catch (err) {
      console.error("Tracking error:", err)
      setError("An error occurred while tracking your application. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <h2 className="text-2xl font-bold mb-6">Enter Your Tracking ID</h2>

        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Varsity Track ID</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
              <Input
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="glass-input pl-12"
                placeholder="e.g., VSC12345678"
                disabled={loading}
              />
            </div>
            <p className="text-white/60 text-xs mt-2">
              Your tracking ID was provided when you submitted your application
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <AlertCircle className="h-4 w-4 text-red-400" />
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !trackingId.trim()}
            className="w-full bg-white text-black hover:bg-white/90 ios-bounce"
          >
            {loading ? "Tracking..." : "Track Application"}
          </Button>
        </form>
      </GlassCard>

      {application && <ApplicationTrackingResult application={application} />}
    </div>
  )
}

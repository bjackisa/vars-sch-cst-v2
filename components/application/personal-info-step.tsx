"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"
import { ArrowRight } from "lucide-react"

interface PersonalInfoStepProps {
  data: any
  updateData: (data: any) => void
  onNext: () => void
  preselectedScholarship: any
}

export function PersonalInfoStep({ data, updateData, onNext, preselectedScholarship }: PersonalInfoStepProps) {
  const [scholarships, setScholarships] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchScholarships = async () => {
      const supabase = createClient()
      const { data: scholarshipsData } = await supabase
        .from("scholarships")
        .select(
          `
          *,
          country:countries(*)
        `,
        )
        .eq("is_active", true)
        .order("name")

      setScholarships(scholarshipsData || [])
    }

    fetchScholarships()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate required fields
    const requiredFields = [
      "full_name",
      "email",
      "phone",
      "date_of_birth",
      "gender",
      "nationality",
      "address",
      "emergency_contact_name",
      "emergency_contact_phone",
      "scholarship_id",
    ]

    const missingFields = requiredFields.filter((field) => !data[field])

    if (missingFields.length > 0) {
      alert("Please fill in all required fields")
      setLoading(false)
      return
    }

    setLoading(false)
    onNext()
  }

  return (
    <GlassCard>
      <h2 className="text-2xl font-bold mb-6">Personal Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <Input
              value={data.full_name}
              onChange={(e) => updateData({ full_name: e.target.value })}
              className="glass-input"
              placeholder="Your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <Input
              type="email"
              value={data.email}
              onChange={(e) => updateData({ email: e.target.value })}
              className="glass-input"
              placeholder="your@email.com"
              required
              disabled
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Phone Number <span className="text-red-400">*</span>
            </label>
            <Input
              value={data.phone}
              onChange={(e) => updateData({ phone: e.target.value })}
              className="glass-input"
              placeholder="+256 xxx xxx xxx"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Date of Birth <span className="text-red-400">*</span>
            </label>
            <Input
              type="date"
              value={data.date_of_birth}
              onChange={(e) => updateData({ date_of_birth: e.target.value })}
              className="glass-input"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Gender <span className="text-red-400">*</span>
            </label>
            <select
              value={data.gender}
              onChange={(e) => updateData({ gender: e.target.value })}
              className="w-full glass-input p-3"
              required
            >
              <option value="">Select Gender</option>
              <option value="male" className="bg-black">
                Male
              </option>
              <option value="female" className="bg-black">
                Female
              </option>
              <option value="other" className="bg-black">
                Other
              </option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Nationality <span className="text-red-400">*</span>
            </label>
            <Input
              value={data.nationality}
              onChange={(e) => updateData({ nationality: e.target.value })}
              className="glass-input"
              placeholder="Uganda"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Address <span className="text-red-400">*</span>
          </label>
          <Input
            value={data.address}
            onChange={(e) => updateData({ address: e.target.value })}
            className="glass-input"
            placeholder="Your full address"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Emergency Contact Name <span className="text-red-400">*</span>
            </label>
            <Input
              value={data.emergency_contact_name}
              onChange={(e) => updateData({ emergency_contact_name: e.target.value })}
              className="glass-input"
              placeholder="Contact person name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Emergency Contact Phone <span className="text-red-400">*</span>
            </label>
            <Input
              value={data.emergency_contact_phone}
              onChange={(e) => updateData({ emergency_contact_phone: e.target.value })}
              className="glass-input"
              placeholder="+256 xxx xxx xxx"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Scholarship <span className="text-red-400">*</span>
          </label>
          <select
            value={data.scholarship_id}
            onChange={(e) => updateData({ scholarship_id: e.target.value })}
            className="w-full glass-input p-3"
            required
            disabled={!!preselectedScholarship}
          >
            <option value="">Select Scholarship</option>
            {scholarships.map((scholarship) => (
              <option key={scholarship.id} value={scholarship.id} className="bg-black">
                {scholarship.name} - {scholarship.country.name} (${scholarship.application_fee})
              </option>
            ))}
          </select>
          {preselectedScholarship && (
            <p className="text-white/60 text-sm mt-2">
              Pre-selected: {preselectedScholarship.name} - {preselectedScholarship.country.name}
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="bg-white text-black hover:bg-white/90 ios-bounce">
            {loading ? "Validating..." : "Continue to Documents"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </GlassCard>
  )
}

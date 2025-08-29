"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlassCard } from "@/components/ui/glass-card"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface Country {
  id: number
  name: string
}

export function NewScholarshipForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [applicationFee, setApplicationFee] = useState(0)
  const [countryId, setCountryId] = useState<number | null>(null)
  const [fundingType, setFundingType] = useState("fully_funded")
  const [educationLevel, setEducationLevel] = useState<string[]>([])
  const [genderRequirement, setGenderRequirement] = useState("any")
  const [availableForUgandans, setAvailableForUgandans] = useState(true)
  const [applicationDeadline, setApplicationDeadline] = useState("")
  const [requirements, setRequirements] = useState("")
  const [benefits, setBenefits] = useState("")
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const loadCountries = async () => {
      const supabase = createClient()
      const { data } = await supabase.from("countries").select("id, name").order("name")
      setCountries(data || [])
    }
    loadCountries()
  }, [])

  const toggleEducationLevel = (level: string) => {
    setEducationLevel((prev) =>
      prev.includes(level) ? prev.filter((l) => l !== level) : [...prev, level]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const id = Math.floor(Math.random() * (99999999 - 99999) + 99999).toString()

    const { error } = await supabase.from("scholarships").insert({
      id,
      name,
      description,
      country_id: countryId,
      funding_type: fundingType,
      education_level: educationLevel,
      gender_requirement: genderRequirement,
      available_for_ugandans: availableForUgandans,
      application_deadline: applicationDeadline || null,
      requirements,
      benefits,
      application_fee: applicationFee,
      is_active: true,
    })

    setLoading(false)
    if (error) {
      alert("Failed to create scholarship")
      return
    }

    router.push("/admin/scholarships")
  }

  return (
    <GlassCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required className="glass-input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="glass-input"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Country</label>
          <select
            value={countryId ?? ""}
            onChange={(e) => setCountryId(e.target.value ? Number(e.target.value) : null)}
            className="glass-input w-full bg-transparent border rounded-md px-3 py-2"
          >
            <option value="">Select country</option>
            {countries.map((c) => (
              <option key={c.id} value={c.id} className="text-black">
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Funding Type</label>
          <select
            value={fundingType}
            onChange={(e) => setFundingType(e.target.value)}
            className="glass-input w-full bg-transparent border rounded-md px-3 py-2"
          >
            <option value="fully_funded">Fully Funded</option>
            <option value="partial">Partial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm mb-1">Education Level</label>
          <div className="space-x-4">
            {[
              { label: "Undergraduate", value: "undergraduate" },
              { label: "Postgraduate", value: "postgraduate" },
              { label: "PhD", value: "phd" },
            ].map((level) => (
              <label key={level.value} className="text-sm">
                <input
                  type="checkbox"
                  checked={educationLevel.includes(level.value)}
                  onChange={() => toggleEducationLevel(level.value)}
                  className="mr-1"
                />
                {level.label}
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm mb-1">Gender Requirement</label>
          <select
            value={genderRequirement}
            onChange={(e) => setGenderRequirement(e.target.value)}
            className="glass-input w-full bg-transparent border rounded-md px-3 py-2"
          >
            <option value="any">Any</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="availableForUgandans"
            checked={availableForUgandans}
            onChange={(e) => setAvailableForUgandans(e.target.checked)}
          />
          <label htmlFor="availableForUgandans" className="text-sm">
            Available to Ugandans
          </label>
        </div>
        <div>
          <label className="block text-sm mb-1">Application Deadline</label>
          <Input
            type="date"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            className="glass-input"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Requirements</label>
          <Textarea
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            className="glass-input"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Benefits</label>
          <Textarea
            value={benefits}
            onChange={(e) => setBenefits(e.target.value)}
            className="glass-input"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Application Fee (UGX)</label>
          <Input
            type="number"
            value={applicationFee}
            onChange={(e) => setApplicationFee(Number(e.target.value))}
            className="glass-input"
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Create Scholarship"}
        </Button>
      </form>
    </GlassCard>
  )
}


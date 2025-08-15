"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Country {
  id: number
  name: string
  code: string
  flag_emoji: string
}

interface ScholarshipFiltersProps {
  countries: Country[]
  searchParams: { [key: string]: string | string[] | undefined }
}

export function ScholarshipFilters({ countries, searchParams }: ScholarshipFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/scholarships?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/scholarships")
  }

  const hasActiveFilters = Object.keys(searchParams).some((key) => key !== "search" && searchParams[key])

  return (
    <GlassCard>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Filters</h3>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-white/70 hover:text-white">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Country</label>
          <select
            value={(searchParams.country as string) || ""}
            onChange={(e) => updateFilter("country", e.target.value)}
            className="w-full glass-input text-white text-sm p-3"
          >
            <option value="">All Countries</option>
            {countries.map((country) => (
              <option key={country.code} value={country.code} className="bg-black">
                {country.flag_emoji} {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* Funding Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Funding Type</label>
          <select
            value={(searchParams.funding_type as string) || ""}
            onChange={(e) => updateFilter("funding_type", e.target.value)}
            className="w-full glass-input text-white text-sm p-3"
          >
            <option value="">All Types</option>
            <option value="fully_funded" className="bg-black">
              Fully Funded
            </option>
            <option value="partial" className="bg-black">
              Partial Funding
            </option>
          </select>
        </div>

        {/* Education Level Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Education Level</label>
          <select
            value={(searchParams.education_level as string) || ""}
            onChange={(e) => updateFilter("education_level", e.target.value)}
            className="w-full glass-input text-white text-sm p-3"
          >
            <option value="">All Levels</option>
            <option value="undergraduate" className="bg-black">
              Undergraduate
            </option>
            <option value="postgraduate" className="bg-black">
              Postgraduate
            </option>
            <option value="phd" className="bg-black">
              PhD
            </option>
          </select>
        </div>

        {/* Gender Filter */}
        <div>
          <label className="block text-sm font-medium mb-3">Gender</label>
          <select
            value={(searchParams.gender as string) || ""}
            onChange={(e) => updateFilter("gender", e.target.value)}
            className="w-full glass-input text-white text-sm p-3"
          >
            <option value="">Any Gender</option>
            <option value="male" className="bg-black">
              Male
            </option>
            <option value="female" className="bg-black">
              Female
            </option>
          </select>
        </div>

        {/* Ugandans Filter */}
        <div>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={searchParams.ugandans === "true"}
              onChange={(e) => updateFilter("ugandans", e.target.checked ? "true" : "")}
              className="rounded border-white/20 bg-white/5 text-white focus:ring-white/20"
            />
            <span className="text-sm">Available for Ugandans</span>
          </label>
        </div>
      </div>
    </GlassCard>
  )
}

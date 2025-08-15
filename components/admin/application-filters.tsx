"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

interface ApplicationFiltersProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export function ApplicationFilters({ searchParams }: ApplicationFiltersProps) {
  const router = useRouter()
  const currentSearchParams = useSearchParams()

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(currentSearchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`/admin/applications?${params.toString()}`)
  }

  const clearFilters = () => {
    router.push("/admin/applications")
  }

  const hasActiveFilters = Object.keys(searchParams).length > 0

  return (
    <GlassCard>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" />
            <Input
              placeholder="Search by name, email, or tracking ID..."
              defaultValue={searchParams.search as string}
              onChange={(e) => updateFilter("search", e.target.value)}
              className="glass-input pl-10"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <select
            value={(searchParams.status as string) || ""}
            onChange={(e) => updateFilter("status", e.target.value)}
            className="glass-input text-white text-sm p-3 min-w-40"
          >
            <option value="">All Status</option>
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

          {hasActiveFilters && (
            <Button variant="outline" onClick={clearFilters} className="glass-button bg-transparent">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  )
}

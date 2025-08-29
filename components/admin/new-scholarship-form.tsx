"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function NewScholarshipForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [applicationFee, setApplicationFee] = useState(0)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const id = Math.floor(Math.random() * (99999999 - 99999) + 99999).toString()

    const { error } = await supabase.from("scholarships").insert({
      id,
      name,
      description,
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
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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


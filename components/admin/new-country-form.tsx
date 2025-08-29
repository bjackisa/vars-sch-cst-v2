"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/ui/glass-card"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export function NewCountryForm() {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [flagEmoji, setFlagEmoji] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = createClient()
    const { error } = await supabase.from("countries").insert({
      name,
      code,
      flag_emoji: flagEmoji || null,
    })
    setLoading(false)
    if (error) {
      alert("Failed to create country")
      return
    }
    router.push("/admin")
  }

  return (
    <GlassCard>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} required className="glass-input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Code</label>
          <Input value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} required className="glass-input" />
        </div>
        <div>
          <label className="block text-sm mb-1">Flag Emoji</label>
          <Input value={flagEmoji} onChange={(e) => setFlagEmoji(e.target.value)} className="glass-input" />
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Saving..." : "Create Country"}
        </Button>
      </form>
    </GlassCard>
  )
}


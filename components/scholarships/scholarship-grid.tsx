import { ScholarshipCard } from "@/components/ui/scholarship-card"

interface Scholarship {
  id: string
  name: string
  description: string
  country: {
    name: string
    code: string
    flag_emoji: string
  }
  funding_type: string
  education_level: string[]
  application_deadline: string
  application_fee: number
}

interface ScholarshipGridProps {
  scholarships: Scholarship[]
}

export function ScholarshipGrid({ scholarships }: ScholarshipGridProps) {
  if (scholarships.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold mb-2">No scholarships found</h3>
          <p className="text-white/70">Try adjusting your filters to see more results.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {scholarships.map((scholarship) => (
        <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
      ))}
    </div>
  )
}

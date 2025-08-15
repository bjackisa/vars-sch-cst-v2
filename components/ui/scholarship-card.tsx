import { GlassCard } from "./glass-card"
import { Button } from "./button"
import { Calendar, MapPin, GraduationCap, DollarSign } from "lucide-react"
import Link from "next/link"

interface ScholarshipCardProps {
  scholarship: {
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
}

export function ScholarshipCard({ scholarship }: ScholarshipCardProps) {
  const firstLetter = scholarship.name.charAt(0).toUpperCase()

  return (
    <GlassCard hover className="group">
      <div className="flex items-start space-x-4">
        {/* Scholarship Letter Icon */}
        <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-lg">
          {firstLetter}
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white text-lg mb-2 group-hover:text-white/90 transition-colors">
            {scholarship.name}
          </h3>

          <p className="text-white/70 text-sm mb-4 line-clamp-2">{scholarship.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <MapPin className="h-3 w-3" />
              <span>
                {scholarship.country.flag_emoji} {scholarship.country.name}
              </span>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <GraduationCap className="h-3 w-3" />
              <span className="capitalize">{scholarship.education_level.join(", ")}</span>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <Calendar className="h-3 w-3" />
              <span>{new Date(scholarship.application_deadline).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center space-x-2 text-white/60 text-xs">
              <DollarSign className="h-3 w-3" />
              <span className="capitalize">{scholarship.funding_type.replace("_", " ")}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/50 text-xs">Fee: ${scholarship.application_fee}</span>

            <Link
              href={`/${scholarship.country.code}/${scholarship.id}/${scholarship.name.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <Button size="sm" className="bg-white text-black hover:bg-white/90 ios-bounce">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}

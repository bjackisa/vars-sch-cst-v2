"use client"

import { useEffect, useRef } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { TimelineSkeleton } from "./timeline-skeleton"

const demoSlides = [
  {
    title: "Future events will shine here",
    content: "You'll be able to book appointments and secure event entries right on our website.",
  },
  {
    title: "No job openings yet",
    content: "Sorry, there are currently no vacancies. Please check in again soon!",
  },
  {
    title: "Global opportunities are coming",
    content: "We'll share the best internships and scholarships from around the globe.",
  },
  {
    title: "Stay tuned for updates",
    content: "Our posts will feature here—we can't wait to have you follow our timeline.",
  },
]

export function TimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let index = 0
    const interval = setInterval(() => {
      if (!container) return
      index = (index + 1) % container.children.length
      const child = container.children[index] as HTMLElement
      child.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" })
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="flex overflow-x-auto space-x-6 pb-4 snap-x snap-mandatory">
      {[1, 2, 3].map((i) => (
        <TimelineSkeleton key={`skeleton-${i}`} />
      ))}
      {demoSlides.map((slide, i) => (
        <GlassCard key={i} className="min-w-[300px] max-w-sm flex-shrink-0 snap-center">
          <div className="flex flex-col h-full p-4">
            <h3 className="text-lg font-bold mb-2">{slide.title}</h3>
            <p className="text-sm text-white/80 flex-1">{slide.content}</p>
          </div>
        </GlassCard>
      ))}
    </div>
  )
}


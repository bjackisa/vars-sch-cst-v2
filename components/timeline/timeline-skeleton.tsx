import { GlassCard } from "@/components/ui/glass-card"

export function TimelineSkeleton() {
  return (
    <GlassCard className="min-w-[300px] max-w-sm flex-shrink-0 overflow-hidden animate-pulse">
      <div className="h-40 bg-white/10" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/2" />
        <div className="h-3 bg-white/10 rounded w-full" />
        <div className="h-3 bg-white/10 rounded w-3/4" />
      </div>
    </GlassCard>
  )
}

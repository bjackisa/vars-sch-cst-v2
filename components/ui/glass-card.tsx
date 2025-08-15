import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={cn("glass-card p-6", hover && "hover:bg-white/10 transition-all duration-300 ios-bounce", className)}
    >
      {children}
    </div>
  )
}

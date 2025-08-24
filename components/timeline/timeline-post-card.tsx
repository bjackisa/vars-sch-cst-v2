import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export interface TimelinePost {
  id: number
  type: "job" | "status" | "event"
  title: string | null
  content: string | null
  image_url: string | null
  link: string | null
  posted_at: string
}

export function TimelinePostCard({ post }: { post: TimelinePost }) {
  return (
    <GlassCard className="min-w-[300px] max-w-sm flex-shrink-0">
      {post.image_url && (
        <div className="relative h-40 w-full mb-4">
          <Image src={post.image_url} alt={post.title || post.type} fill className="object-cover rounded-t-lg" />
        </div>
      )}
      <div className="flex flex-col h-full p-4">
        <span className="text-xs uppercase tracking-wider text-white/60 mb-2">{post.type}</span>
        {post.title && <h3 className="text-lg font-bold mb-2">{post.title}</h3>}
        {post.content && <p className="text-sm text-white/80 mb-4 flex-1">{post.content}</p>}
        {post.link && (
          <Link href={post.link} target="_blank" className="mt-auto">
            <Button className="w-full bg-white text-black hover:bg-white/90 ios-bounce">Learn More</Button>
          </Link>
        )}
      </div>
    </GlassCard>
  )
}

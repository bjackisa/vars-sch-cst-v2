"use client"

import { PostCard } from "./post-card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface TimelineFeedProps {
  posts: any[]
  showSeeMore?: boolean
  limit?: number
}

export function TimelineFeed({ posts, showSeeMore = false, limit }: TimelineFeedProps) {
  const displayPosts = limit ? posts.slice(0, limit) : posts

  const handleLike = (postId: string) => {
    console.log("[v0] Like post:", postId)
    // TODO: Implement like functionality
  }

  const handleComment = (postId: string) => {
    console.log("[v0] Comment on post:", postId)
    // TODO: Implement comment functionality
  }

  const handleShare = (postId: string) => {
    console.log("[v0] Share post:", postId)
    // TODO: Implement share functionality
  }

  const handleEventBook = (postId: string) => {
    console.log("[v0] Book event:", postId)
    // TODO: Implement event booking
  }

  const handleJobApply = (postId: string) => {
    console.log("[v0] Apply for job:", postId)
    // TODO: Implement job application
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No posts available yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {displayPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          likesCount={Math.floor(Math.random() * 50)} // TODO: Get real counts
          commentsCount={Math.floor(Math.random() * 20)}
          isLiked={false} // TODO: Get real like status
          onLike={() => handleLike(post.id)}
          onComment={() => handleComment(post.id)}
          onShare={() => handleShare(post.id)}
          onEventBook={() => handleEventBook(post.id)}
          onJobApply={() => handleJobApply(post.id)}
        />
      ))}

      {showSeeMore && posts.length > (limit || 0) && (
        <div className="text-center pt-6">
          <Link href="/timeline">
            <Button variant="outline" className="glass-button bg-transparent">
              See More Posts
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

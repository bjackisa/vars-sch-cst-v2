"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Heart,
  MessageCircle,
  Share2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Briefcase,
  CheckCircle,
  Clock,
} from "lucide-react"
import { formatDistanceToNow, format } from "date-fns"
import { EventBookingModal } from "./event-booking-modal"
import { JobApplicationModal } from "./job-application-modal"
import { CommentForm } from "./comment-form"
import { toggleLike } from "@/lib/post-actions"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    post_type: "status_update" | "event" | "job_opportunity"
    author_name: string
    is_verified: boolean
    image_url?: string
    created_at: string

    // Event fields
    event_date?: string
    event_location?: string
    event_cost?: number
    max_attendees?: number

    // Job fields
    job_position?: string
    job_requirements?: string
    job_salary_range?: string
    application_deadline?: string
  }
  likesCount?: number
  commentsCount?: number
  isLiked?: boolean
  onLike?: () => void
  onComment?: () => void
  onShare?: () => void
  onEventBook?: () => void
  onJobApply?: () => void
}

export function PostCard({
  post,
  likesCount = 0,
  commentsCount = 0,
  isLiked = false,
  onLike,
  onComment,
  onShare,
  onEventBook,
  onJobApply,
}: PostCardProps) {
  const [localIsLiked, setLocalIsLiked] = useState(isLiked)
  const [localLikesCount, setLocalLikesCount] = useState(likesCount)
  const [showComments, setShowComments] = useState(false)
  const [showEventModal, setShowEventModal] = useState(false)
  const [showJobModal, setShowJobModal] = useState(false)

  const handleLike = async () => {
    try {
      await toggleLike(post.id)
      setLocalIsLiked(!localIsLiked)
      setLocalLikesCount((prev) => (localIsLiked ? prev - 1 : prev + 1))
      onLike?.()
    } catch (error) {
      console.error("Error toggling like:", error)
    }
  }

  const handleShare = () => {
    const message = `Check out this post from Varsity Scholars Consult: ${post.title}`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    onShare?.()
  }

  const getPostTypeColor = () => {
    switch (post.post_type) {
      case "status_update":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30"
      case "event":
        return "bg-green-500/20 text-green-300 border-green-400/30"
      case "job_opportunity":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/30"
    }
  }

  const getPostTypeLabel = () => {
    switch (post.post_type) {
      case "status_update":
        return "Status Update"
      case "event":
        return "Event"
      case "job_opportunity":
        return "Job Opportunity"
      default:
        return "Post"
    }
  }

  return (
    <>
      <Card className="post-card">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback className="bg-accent text-accent-foreground font-semibold">VS</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Varsity Scholars Consult</h3>
                  {post.is_verified && <CheckCircle className="w-4 h-4 text-blue-500" />}
                </div>
                <p className="text-sm text-muted-foreground">by {post.author_name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
            <Badge variant="secondary" className={getPostTypeColor()}>
              {getPostTypeLabel()}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Post Content */}
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">{post.title}</h2>
            <p className="text-foreground/80 leading-relaxed">{post.content}</p>
          </div>

          {/* Image */}
          {post.image_url && (
            <div className="rounded-lg overflow-hidden">
              <img src={post.image_url || "/placeholder.svg"} alt={post.title} className="w-full h-64 object-cover" />
            </div>
          )}

          {/* Event Details */}
          {post.post_type === "event" && (
            <div className="bg-green-500/10 rounded-lg p-4 border border-green-400/20">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {post.event_date && (
                  <div className="flex items-center gap-2 text-green-300">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(post.event_date), "PPP p")}</span>
                  </div>
                )}
                {post.event_location && (
                  <div className="flex items-center gap-2 text-green-300">
                    <MapPin className="w-4 h-4" />
                    <span>{post.event_location}</span>
                  </div>
                )}
                {post.event_cost !== undefined && (
                  <div className="flex items-center gap-2 text-green-300">
                    <DollarSign className="w-4 h-4" />
                    <span>{post.event_cost === 0 ? "Free" : `UGX ${post.event_cost.toLocaleString()}`}</span>
                  </div>
                )}
                {post.max_attendees && (
                  <div className="flex items-center gap-2 text-green-300">
                    <Users className="w-4 h-4" />
                    <span>Max {post.max_attendees} attendees</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Job Details */}
          {post.post_type === "job_opportunity" && (
            <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-400/20">
              <div className="space-y-3 text-sm">
                {post.job_position && (
                  <div className="flex items-center gap-2 text-purple-300">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-medium">{post.job_position}</span>
                  </div>
                )}
                {post.job_salary_range && (
                  <div className="flex items-center gap-2 text-purple-300">
                    <DollarSign className="w-4 h-4" />
                    <span>{post.job_salary_range}</span>
                  </div>
                )}
                {post.application_deadline && (
                  <div className="flex items-center gap-2 text-purple-300">
                    <Clock className="w-4 h-4" />
                    <span>Apply by {format(new Date(post.application_deadline), "PPP")}</span>
                  </div>
                )}
                {post.job_requirements && (
                  <div className="text-purple-200">
                    <p className="font-medium mb-1">Requirements:</p>
                    <p className="text-sm opacity-90">{post.job_requirements}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Interaction Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-border/20">
            <div className="flex items-center gap-4">
              <button onClick={handleLike} className={`post-interaction-button ${localIsLiked ? "text-red-500" : ""}`}>
                <Heart className={`w-4 h-4 ${localIsLiked ? "fill-current" : ""}`} />
                <span>{localLikesCount}</span>
              </button>

              <button onClick={() => setShowComments(!showComments)} className="post-interaction-button">
                <MessageCircle className="w-4 h-4" />
                <span>{commentsCount}</span>
              </button>

              <button onClick={handleShare} className="post-interaction-button">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {post.post_type === "event" && (
                <Button
                  onClick={() => setShowEventModal(true)}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  {post.event_cost === 0 ? "Book Free" : "Book Event"}
                </Button>
              )}

              {post.post_type === "job_opportunity" && (
                <Button
                  onClick={() => setShowJobModal(true)}
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Apply Now
                </Button>
              )}
            </div>
          </div>

          {/* Comments Section */}
          {showComments && (
            <div className="pt-4 border-t border-border/20 space-y-4">
              <CommentForm postId={post.id} onCommentAdded={() => {}} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <EventBookingModal isOpen={showEventModal} onClose={() => setShowEventModal(false)} post={post} />

      <JobApplicationModal isOpen={showJobModal} onClose={() => setShowJobModal(false)} post={post} />
    </>
  )
}

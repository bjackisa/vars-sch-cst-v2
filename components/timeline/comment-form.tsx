"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { addComment } from "@/lib/post-actions"
import { Send } from "lucide-react"

interface CommentFormProps {
  postId: string
  onCommentAdded?: () => void
}

export function CommentForm({ postId, onCommentAdded }: CommentFormProps) {
  const [content, setContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setIsSubmitting(true)
    try {
      await addComment(postId, content)
      setContent("")
      onCommentAdded?.()
    } catch (error) {
      console.error("Error adding comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 min-h-[80px] bg-muted/50 border-border/20 resize-none"
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        size="sm"
        disabled={!content.trim() || isSubmitting}
        className="bg-accent hover:bg-accent/90 text-accent-foreground self-end"
      >
        <Send className="w-4 h-4" />
      </Button>
    </form>
  )
}

"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, BriefcaseIcon } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface CreatePostFormProps {
  authorName: string
  authorId: string
}

export function CreatePostForm({ authorName, authorId }: CreatePostFormProps) {
  const [postType, setPostType] = useState<string>("")
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [imageUrl, setImageUrl] = useState("")

  // Event fields
  const [eventDate, setEventDate] = useState("")
  const [eventLocation, setEventLocation] = useState("")
  const [eventCost, setEventCost] = useState("")
  const [maxAttendees, setMaxAttendees] = useState("")

  // Job fields
  const [jobPosition, setJobPosition] = useState("")
  const [jobRequirements, setJobRequirements] = useState("")
  const [jobSalaryRange, setJobSalaryRange] = useState("")
  const [applicationDeadline, setApplicationDeadline] = useState("")

  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const postData: any = {
        title,
        content,
        post_type: postType,
        author_id: authorId,
        author_name: authorName,
        is_verified: true,
        image_url: imageUrl || null,
      }

      // Add type-specific fields
      if (postType === "event") {
        postData.event_date = eventDate ? new Date(eventDate).toISOString() : null
        postData.event_location = eventLocation || null
        postData.event_cost = eventCost ? Number.parseInt(eventCost) : 0
        postData.max_attendees = maxAttendees ? Number.parseInt(maxAttendees) : null
      }

      if (postType === "job_opportunity") {
        postData.job_position = jobPosition || null
        postData.job_requirements = jobRequirements || null
        postData.job_salary_range = jobSalaryRange || null
        postData.application_deadline = applicationDeadline ? new Date(applicationDeadline).toISOString() : null
      }

      const { error } = await supabase.from("posts").insert([postData])

      if (error) throw error

      // Reset form
      setTitle("")
      setContent("")
      setImageUrl("")
      setPostType("")
      setEventDate("")
      setEventLocation("")
      setEventCost("")
      setMaxAttendees("")
      setJobPosition("")
      setJobRequirements("")
      setJobSalaryRange("")
      setApplicationDeadline("")

      router.refresh()
    } catch (error) {
      console.error("Error creating post:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          Create New Post
          <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-400/30">
            {authorName}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type Selection */}
          <div className="space-y-2">
            <Label htmlFor="postType" className="text-white">
              Post Type
            </Label>
            <Select value={postType} onValueChange={setPostType}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select post type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="status_update">Status Update</SelectItem>
                <SelectItem value="event">Event</SelectItem>
                <SelectItem value="job_opportunity">Job Opportunity</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Basic Fields */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-white">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content" className="text-white">
              Content
            </Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
              placeholder="Write your post content..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl" className="text-white">
              Image URL (Optional)
            </Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Event-specific fields */}
          {postType === "event" && (
            <div className="space-y-4 p-4 bg-green-500/10 rounded-lg border border-green-400/20">
              <div className="flex items-center gap-2 text-green-300">
                <CalendarIcon className="w-4 h-4" />
                <span className="font-medium">Event Details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="eventDate" className="text-white">
                    Event Date & Time
                  </Label>
                  <Input
                    id="eventDate"
                    type="datetime-local"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="eventCost" className="text-white">
                    Cost (UGX)
                  </Label>
                  <Input
                    id="eventCost"
                    type="number"
                    value={eventCost}
                    onChange={(e) => setEventCost(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="eventLocation" className="text-white">
                  Location
                </Label>
                <Input
                  id="eventLocation"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Event location"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxAttendees" className="text-white">
                  Max Attendees
                </Label>
                <Input
                  id="maxAttendees"
                  type="number"
                  value={maxAttendees}
                  onChange={(e) => setMaxAttendees(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="50"
                />
              </div>
            </div>
          )}

          {/* Job-specific fields */}
          {postType === "job_opportunity" && (
            <div className="space-y-4 p-4 bg-purple-500/10 rounded-lg border border-purple-400/20">
              <div className="flex items-center gap-2 text-purple-300">
                <BriefcaseIcon className="w-4 h-4" />
                <span className="font-medium">Job Details</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jobPosition" className="text-white">
                    Position
                  </Label>
                  <Input
                    id="jobPosition"
                    value={jobPosition}
                    onChange={(e) => setJobPosition(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Job title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="jobSalaryRange" className="text-white">
                    Salary Range (UGX)
                  </Label>
                  <Input
                    id="jobSalaryRange"
                    value={jobSalaryRange}
                    onChange={(e) => setJobSalaryRange(e.target.value)}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="2,000,000 - 3,500,000 per month"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobRequirements" className="text-white">
                  Requirements
                </Label>
                <Textarea
                  id="jobRequirements"
                  value={jobRequirements}
                  onChange={(e) => setJobRequirements(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  placeholder="Job requirements and qualifications..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="applicationDeadline" className="text-white">
                  Application Deadline
                </Label>
                <Input
                  id="applicationDeadline"
                  type="datetime-local"
                  value={applicationDeadline}
                  onChange={(e) => setApplicationDeadline(e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>
            </div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !postType || !title || !content}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isLoading ? "Creating Post..." : "Create Post"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

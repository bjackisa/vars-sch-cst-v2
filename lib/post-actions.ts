"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function toggleLike(postId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // Check if user already liked this post
  const { data: existingLike } = await supabase
    .from("post_likes")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single()

  if (existingLike) {
    // Unlike the post
    const { error } = await supabase.from("post_likes").delete().eq("post_id", postId).eq("user_id", user.id)

    if (error) throw error
    return { liked: false }
  } else {
    // Like the post
    const { error } = await supabase.from("post_likes").insert([{ post_id: postId, user_id: user.id }])

    if (error) throw error
    return { liked: true }
  }
}

export async function addComment(postId: string, content: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  const { error } = await supabase.from("post_comments").insert([
    {
      post_id: postId,
      user_id: user.id,
      content: content.trim(),
    },
  ])

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/timeline")
}

export async function bookEvent(
  postId: string,
  attendeeData: {
    name: string
    email: string
    phone?: string
  },
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // Check if user already booked this event
  const { data: existingBooking } = await supabase
    .from("event_bookings")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single()

  if (existingBooking) {
    throw new Error("You have already booked this event")
  }

  const { error } = await supabase.from("event_bookings").insert([
    {
      post_id: postId,
      user_id: user.id,
      attendee_name: attendeeData.name,
      attendee_email: attendeeData.email,
      attendee_phone: attendeeData.phone || null,
      payment_status: "pending",
    },
  ])

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/timeline")
}

export async function applyForJob(
  postId: string,
  applicationData: {
    name: string
    email: string
    phone?: string
    resumeUrl?: string
    coverLetter: string
  },
) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    throw new Error("User not authenticated")
  }

  // Check if user already applied for this job
  const { data: existingApplication } = await supabase
    .from("job_applications")
    .select("id")
    .eq("post_id", postId)
    .eq("user_id", user.id)
    .single()

  if (existingApplication) {
    throw new Error("You have already applied for this position")
  }

  const { error } = await supabase.from("job_applications").insert([
    {
      post_id: postId,
      user_id: user.id,
      applicant_name: applicationData.name,
      applicant_email: applicationData.email,
      applicant_phone: applicationData.phone || null,
      resume_url: applicationData.resumeUrl || null,
      cover_letter: applicationData.coverLetter,
      status: "pending",
    },
  ])

  if (error) throw error

  revalidatePath("/")
  revalidatePath("/timeline")
}

export async function getPostInteractions(postId: string) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Get likes count and user's like status
  const { count: likesCount } = await supabase
    .from("post_likes")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)

  let isLiked = false
  if (user) {
    const { data: userLike } = await supabase
      .from("post_likes")
      .select("id")
      .eq("post_id", postId)
      .eq("user_id", user.id)
      .single()

    isLiked = !!userLike
  }

  // Get comments count
  const { count: commentsCount } = await supabase
    .from("post_comments")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId)

  // Get comments with user info
  const { data: comments } = await supabase
    .from("post_comments")
    .select(`
      *,
      user:users(full_name, email)
    `)
    .eq("post_id", postId)
    .order("created_at", { ascending: true })

  return {
    likesCount: likesCount || 0,
    commentsCount: commentsCount || 0,
    isLiked,
    comments: comments || [],
  }
}

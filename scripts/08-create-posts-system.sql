-- Drop existing events table and create new posts system
DROP TABLE IF EXISTS events CASCADE;

-- Posts table for timeline content
CREATE TABLE posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  post_type TEXT NOT NULL CHECK (post_type IN ('status_update', 'event', 'job_opportunity')),
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  
  -- Event specific fields
  event_date TIMESTAMP WITH TIME ZONE,
  event_location TEXT,
  event_cost INTEGER DEFAULT 0, -- in UGX
  max_attendees INTEGER,
  
  -- Job specific fields
  job_position TEXT,
  job_requirements TEXT,
  job_salary_range TEXT,
  application_deadline TIMESTAMP WITH TIME ZONE,
  
  -- Media
  image_url TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Comments table
CREATE TABLE post_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table
CREATE TABLE post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Event bookings table
CREATE TABLE event_bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  attendee_name TEXT NOT NULL,
  attendee_email TEXT NOT NULL,
  attendee_phone TEXT,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Job applications table
CREATE TABLE job_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES posts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  applicant_name TEXT NOT NULL,
  applicant_email TEXT NOT NULL,
  applicant_phone TEXT,
  resume_url TEXT,
  cover_letter TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'accepted', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, user_id)
);

-- Enable RLS
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for posts (public read, admin write)
CREATE POLICY "Posts are viewable by everyone" ON posts FOR SELECT USING (true);
CREATE POLICY "Only admins can insert posts" ON posts FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));
CREATE POLICY "Only admins can update posts" ON posts FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));
CREATE POLICY "Only admins can delete posts" ON posts FOR DELETE USING (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));

-- RLS Policies for comments (authenticated users can comment)
CREATE POLICY "Comments are viewable by everyone" ON post_comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments" ON post_comments FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own comments" ON post_comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON post_comments FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for likes (authenticated users can like)
CREATE POLICY "Likes are viewable by everyone" ON post_likes FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert likes" ON post_likes FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can delete their own likes" ON post_likes FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for event bookings (users can book events)
CREATE POLICY "Users can view their own bookings" ON event_bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all bookings" ON event_bookings FOR SELECT USING (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));
CREATE POLICY "Authenticated users can book events" ON event_bookings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own bookings" ON event_bookings FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for job applications (users can apply for jobs)
CREATE POLICY "Users can view their own applications" ON job_applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all applications" ON job_applications FOR SELECT USING (auth.uid() IN (SELECT id FROM users WHERE is_admin = true));
CREATE POLICY "Authenticated users can apply for jobs" ON job_applications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own applications" ON job_applications FOR UPDATE USING (auth.uid() = user_id);

-- Insert sample posts
INSERT INTO posts (title, content, post_type, author_id, author_name, is_verified) VALUES
(
  'Welcome to Varsity Scholars Consult!',
  'We are excited to announce the launch of our new platform connecting students with international scholarship opportunities. Our team is dedicated to helping you achieve your academic dreams abroad.',
  'status_update',
  (SELECT id FROM users WHERE email = 'admin@varsityscholarsconsult.com' LIMIT 1),
  'Daniel Barack',
  true
),
(
  'Scholarship Information Session - January 2025',
  'Join us for an exclusive information session about available scholarships for the 2025 academic year. Learn about application processes, requirements, and success tips from our experts.',
  'event',
  (SELECT id FROM users WHERE email = 'admin@varsityscholarsconsult.com' LIMIT 1),
  'Daniel Barack',
  true
),
(
  'We are Hiring: Student Counselor Position',
  'Are you passionate about helping students achieve their dreams? We are looking for a dedicated Student Counselor to join our team. Experience in education consulting preferred.',
  'job_opportunity',
  (SELECT id FROM users WHERE email = 'admin@varsityscholarsconsult.com' LIMIT 1),
  'Daniel Barack',
  true
);

-- Update the event post with event details
UPDATE posts 
SET 
  event_date = '2025-01-15 14:00:00+03',
  event_location = 'Level 2, Echo Plaza, Martin Rd, Old Kampala (UG)',
  event_cost = 0,
  max_attendees = 50
WHERE post_type = 'event';

-- Update the job post with job details
UPDATE posts 
SET 
  job_position = 'Student Counselor',
  job_requirements = 'Bachelor''s degree in Education, Psychology, or related field. 2+ years experience in student counseling or education consulting. Excellent communication skills.',
  job_salary_range = 'UGX 2,000,000 - 3,500,000 per month',
  application_deadline = '2025-02-15 23:59:59+03'
WHERE post_type = 'job_opportunity';

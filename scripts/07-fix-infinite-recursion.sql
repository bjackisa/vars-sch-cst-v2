-- Fix infinite recursion in RLS policies by simplifying admin checks

-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view all support requests" ON support_requests;

-- Create simplified policies that don't cause recursion
-- For users table - allow basic access without recursive admin checks
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- For applications - allow users to manage their own
CREATE POLICY "Users can view own applications" ON applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create applications" ON applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own applications" ON applications FOR UPDATE USING (auth.uid() = user_id);

-- For notifications - allow users to manage their own
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- For support requests - allow users to manage their own
CREATE POLICY "Users can view own support requests" ON support_requests FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create support requests" ON support_requests FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Disable RLS on public tables that don't need user-level security
ALTER TABLE countries DISABLE ROW LEVEL SECURITY;
ALTER TABLE scholarships DISABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests DISABLE ROW LEVEL SECURITY;

-- Create events table if it doesn't exist and disable RLS
CREATE TABLE IF NOT EXISTS public.events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cover_photo_url TEXT,
  start_datetime TIMESTAMP WITH TIME ZONE NOT NULL,
  time_string TEXT,
  location TEXT,
  about TEXT,
  organizer TEXT,
  register_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Disable RLS on events table to prevent recursion
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Grant public access to read-only tables
GRANT SELECT ON countries TO anon, authenticated;
GRANT SELECT ON scholarships TO anon, authenticated;
GRANT SELECT ON events TO anon, authenticated;
GRANT SELECT ON consultation_requests TO authenticated;

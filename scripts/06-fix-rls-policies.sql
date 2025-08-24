-- Fix infinite recursion in RLS policies by simplifying admin checks
-- Drop existing problematic policies
DROP POLICY IF EXISTS "Admins can view all users" ON users;
DROP POLICY IF EXISTS "Admins can view all applications" ON applications;
DROP POLICY IF EXISTS "Admins can create notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view all support requests" ON support_requests;
DROP POLICY IF EXISTS "Allow admins to manage events" ON events;

-- Create simplified policies that don't cause recursion
-- For users table - only allow self-access, admins will use service role
CREATE POLICY "Users can view and update own profile" ON users FOR ALL USING (auth.uid() = id);

-- For applications - users can manage their own, service role handles admin access
CREATE POLICY "Users can manage own applications" ON applications FOR ALL USING (auth.uid() = user_id);

-- For notifications - users can view/update their own
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);
-- Allow authenticated users to create notifications (for system notifications)
CREATE POLICY "Authenticated users can create notifications" ON notifications FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- For support requests - users can manage their own
CREATE POLICY "Users can manage own support requests" ON support_requests FOR ALL USING (auth.uid() = user_id);

-- For events - allow public read access and authenticated users to manage
CREATE POLICY "Public can view events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage events" ON events FOR ALL USING (auth.uid() IS NOT NULL);

-- Simplified RLS policies to avoid infinite recursion by removing admin checks that query the same table

-- Add demo users to the system
-- Note: These users will be created in Supabase Auth and our users table

-- First, we need to disable RLS temporarily to insert users directly
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Insert the demo users into our users table
-- Note: The auth.users entries will be created through the signup process
INSERT INTO users (id, email, full_name, is_admin, created_at, updated_at) VALUES
  -- User: Jackisa Daniel Barack
  ('550e8400-e29b-41d4-a716-446655440001', 'barackdanieljackisa@gmail.com', 'Jackisa Daniel Barack', false, NOW(), NOW()),
  -- Admin: Daniel Barack  
  ('550e8400-e29b-41d4-a716-446655440002', 'daniel@varsityscholarsconsult.com', 'Daniel Barack', true, NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Note: The actual auth users need to be created through Supabase Auth
-- This script only creates the profile entries in our users table
-- The auth entries will be created when these users first sign up through the app

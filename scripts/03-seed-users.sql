-- Seed a new user into the public.users table
--
-- IMPORTANT:
-- This script assumes that a corresponding user has already been created in Supabase's `auth.users` table.
-- You must replace the placeholder UUID '00000000-0000-0000-0000-000000000000' with the actual user's ID from `auth.users`.
--
-- Supabase handles passwords in the `auth.users` table, so no password is needed here.

INSERT INTO public.users (id, email, full_name, gender, is_admin)
VALUES (
  '00000000-0000-0000-0000-000000000000', -- <-- REPLACE THIS WITH THE ACTUAL USER ID FROM auth.users
  'barackdanieljackisa@gmail.com',
  'jackisa daniel barack',
  'male',
  FALSE
);

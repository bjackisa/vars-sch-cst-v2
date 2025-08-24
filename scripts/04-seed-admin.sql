-- Seed an initial admin user
-- Inserts an admin into auth.users and public.users

-- Ensure pgcrypto extension is available for gen_random_uuid() and password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

WITH existing_user AS (
  SELECT id, email FROM auth.users WHERE email = 'barackdanieljackisa@gmail.com'
), inserted_user AS (
  INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at)
  VALUES (
    gen_random_uuid(),
    'barackdanieljackisa@gmail.com',
    crypt('changeme', gen_salt('bf')),
    now()
  )
  ON CONFLICT (email) DO NOTHING
  RETURNING id, email
), target_user AS (
  SELECT * FROM inserted_user
  UNION
  SELECT * FROM existing_user
)
INSERT INTO public.users (id, email, full_name, is_admin)
SELECT id, email, 'Admin User', TRUE FROM target_user
ON CONFLICT (id) DO UPDATE SET is_admin = TRUE;

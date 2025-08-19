-- Create events table
CREATE TABLE IF NOT EXISTS public.events (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  cover_photo_url TEXT,
  start_datetime TIMESTAMPTZ NOT NULL,
  end_datetime TIMESTAMPTZ,
  time_string TEXT,
  location TEXT,
  about TEXT,
  organizer TEXT,
  register_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events are public, so no RLS is needed for reads.
-- However, we should ensure anon users can read from it.
-- This is usually the default, but let's ensure a policy exists for public access.
-- First, enable RLS on the table.
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow public read access
CREATE POLICY "Allow public read access to all events"
ON public.events
FOR SELECT
USING (true);

-- Create a policy for admins to manage events
CREATE POLICY "Allow admins to manage events"
ON public.events
FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));


-- Seed the events table with sample data
INSERT INTO public.events (name, cover_photo_url, start_datetime, end_datetime, time_string, location, about, organizer, register_url)
VALUES
(
  'Uganda Study Abroad Expo 2025',
  '/placeholder.jpg',
  '2025-10-11 10:00:00+03',
  '2025-10-11 12:00:00+03',
  '10am - 12pm EAT',
  'Four Points By Sheraton Kampala',
  'Welcome to the Uganda Study Abroad Expo 2025! Join us at the Four Points By Sheraton Kampala for an exciting in-person event where you can explore various study abroad opportunities in Uganda. Whether you''re interested in cultural immersion, language learning, or academic programs, this expo is the perfect place to discover your options. Meet representatives from top universities, attend informative seminars, and network with fellow students. Don''t miss this chance to kickstart your international education journey!',
  'Lekkside Education Consultant',
  'https://www.eventbrite.com/e/uganda-study-abroad-expo-2025-tickets-1391859231429?aff=ebdssbdestsearch&keep_tld=1'
),
(
  'Kampala International Education Fair October 2025',
  'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F1043095613%2F292352659919%2F1%2Foriginal.20250531-223639?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C480%2C5760%2C2880&s=33e76e8b92da050a3fb7856c7a8ae49f',
  '2025-10-11 10:00:00+03',
  '2025-10-11 16:00:00+03',
  '10am - 4pm EAT',
  'Four Points By Sheraton Kampala',
  'Come join us at the Kampala International Education Fair in October 2025 for a chance to explore study opportunities worldwide!',
  'STUDY ABROAD EDUCATION FAIR',
  'https://www.eventbrite.com/e/kampala-international-education-fair-october-2025-tickets-1391124443659?aff=ebdssbdestsearch&keep_tld=1'
)
ON CONFLICT (name) DO NOTHING; -- Simple way to avoid duplicate entries on re-runs

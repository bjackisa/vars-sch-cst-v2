-- Create timeline_posts table
CREATE TABLE IF NOT EXISTS public.timeline_posts (
  id SERIAL PRIMARY KEY,
  type TEXT CHECK (type IN ('job','status','event')) NOT NULL,
  title TEXT,
  content TEXT,
  image_url TEXT,
  link TEXT,
  posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS and policies
ALTER TABLE public.timeline_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to timeline posts"
ON public.timeline_posts FOR SELECT USING (true);

CREATE POLICY "Allow admins to manage timeline posts"
ON public.timeline_posts FOR ALL
USING (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE))
WITH CHECK (EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = TRUE));

-- Seed sample posts
INSERT INTO public.timeline_posts (type, title, content, image_url, link, posted_at)
VALUES
  ('job', 'Campus Ambassador', 'Looking for campus ambassadors for the fall semester.', NULL, 'https://example.com/job', NOW() + INTERVAL '7 days'),
  ('status', NULL, 'We just launched our new community timeline!', NULL, NULL, NOW() + INTERVAL '14 days'),
  ('event', 'Scholarship Webinar', 'Join our webinar on applying to scholarships abroad.', '/placeholder.jpg', 'https://example.com/event', NOW() + INTERVAL '21 days')
ON CONFLICT DO NOTHING;

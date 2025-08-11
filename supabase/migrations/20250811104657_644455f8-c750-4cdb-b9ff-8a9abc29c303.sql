-- Create lightweight analytics tables
-- 1) Pageviews table
CREATE TABLE IF NOT EXISTS public.web_pageviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT NOT NULL,
  screen_width INTEGER,
  screen_height INTEGER,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT
);

-- 2) Events table
CREATE TABLE IF NOT EXISTS public.web_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  path TEXT,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT NOT NULL,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT
);

-- Enable RLS
ALTER TABLE public.web_pageviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_events ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public inserts so the site can log analytics without auth
CREATE POLICY IF NOT EXISTS "Anyone can insert pageviews" 
ON public.web_pageviews
FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Anyone can insert events" 
ON public.web_events
FOR INSERT
TO public
WITH CHECK (true);

-- Restrict reads to employees/admins only (via helper function get_user_role)
CREATE POLICY IF NOT EXISTS "Employees can read pageviews" 
ON public.web_pageviews
FOR SELECT
TO authenticated
USING (get_user_role() = ANY (ARRAY['employee'::text, 'admin'::text]));

CREATE POLICY IF NOT EXISTS "Employees can read events" 
ON public.web_events
FOR SELECT
TO authenticated
USING (get_user_role() = ANY (ARRAY['employee'::text, 'admin'::text]));

-- Optional: allow employees/admins to delete analytics rows if needed
CREATE POLICY IF NOT EXISTS "Employees can delete analytics pageviews" 
ON public.web_pageviews
FOR DELETE
TO authenticated
USING (get_user_role() = ANY (ARRAY['employee'::text, 'admin'::text]));

CREATE POLICY IF NOT EXISTS "Employees can delete analytics events" 
ON public.web_events
FOR DELETE
TO authenticated
USING (get_user_role() = ANY (ARRAY['employee'::text, 'admin'::text]));

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_web_pageviews_created_at ON public.web_pageviews (created_at);
CREATE INDEX IF NOT EXISTS idx_web_pageviews_session ON public.web_pageviews (session_id);
CREATE INDEX IF NOT EXISTS idx_web_pageviews_path ON public.web_pageviews (path);

CREATE INDEX IF NOT EXISTS idx_web_events_created_at ON public.web_events (created_at);
CREATE INDEX IF NOT EXISTS idx_web_events_session ON public.web_events (session_id);
CREATE INDEX IF NOT EXISTS idx_web_events_name ON public.web_events (name);

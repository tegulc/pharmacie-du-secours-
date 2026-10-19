-- Create table to store site edits (drafts and published)
-- Run this in Supabase SQL editor (or via psql) in your project

CREATE TABLE IF NOT EXISTS public.site_edits (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  path text NOT NULL,
  edits jsonb NOT NULL,
  status text NOT NULL CHECK (status IN ('draft','published')),
  author_id text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Unique published per path
CREATE UNIQUE INDEX IF NOT EXISTS site_edits_published_unique ON public.site_edits (path) WHERE (status = 'published');

-- One draft per (path, author)
CREATE UNIQUE INDEX IF NOT EXISTS site_edits_draft_unique ON public.site_edits (path, author_id) WHERE (status = 'draft');

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON public.site_edits;
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON public.site_edits
FOR EACH ROW EXECUTE FUNCTION public.trigger_set_timestamp();

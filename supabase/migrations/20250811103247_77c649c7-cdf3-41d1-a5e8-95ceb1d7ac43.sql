
-- 1) Web analytics tables

create table if not exists public.web_pageviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text,
  screen_width int,
  screen_height int,
  session_id text not null,
  profile_id uuid references public.profiles(id)
);

alter table public.web_pageviews enable row level security;

-- Anyone (including anon) can insert pageviews
create policy if not exists "Anyone can insert pageviews"
on public.web_pageviews
for insert
with check (true);

-- Only employees/admins can read/update/delete pageviews
create policy if not exists "Employees can read pageviews"
on public.web_pageviews
for select
using (get_user_role() = any (array['employee','admin']));

create policy if not exists "Employees can update pageviews"
on public.web_pageviews
for update
using (get_user_role() = any (array['employee','admin']))
with check (get_user_role() = any (array['employee','admin']));

create policy if not exists "Employees can delete pageviews"
on public.web_pageviews
for delete
using (get_user_role() = any (array['employee','admin']));

-- Helpful indexes
create index if not exists idx_web_pageviews_created_at on public.web_pageviews (created_at);
create index if not exists idx_web_pageviews_path on public.web_pageviews (path);
create index if not exists idx_web_pageviews_session_id on public.web_pageviews (session_id);


create table if not exists public.web_events (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  path text,
  referrer text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_term text,
  utm_content text,
  user_agent text,
  session_id text not null,
  profile_id uuid references public.profiles(id),
  metadata jsonb not null default '{}'::jsonb
);

alter table public.web_events enable row level security;

-- Anyone (including anon) can insert events
create policy if not exists "Anyone can insert events"
on public.web_events
for insert
with check (true);

-- Only employees/admins can read/update/delete events
create policy if not exists "Employees can read events"
on public.web_events
for select
using (get_user_role() = any (array['employee','admin']));

create policy if not exists "Employees can update events"
on public.web_events
for update
using (get_user_role() = any (array['employee','admin']))
with check (get_user_role() = any (array['employee','admin']));

create policy if not exists "Employees can delete events"
on public.web_events
for delete
using (get_user_role() = any (array['employee','admin']));

-- Helpful indexes
create index if not exists idx_web_events_created_at on public.web_events (created_at);
create index if not exists idx_web_events_name on public.web_events (name);
create index if not exists idx_web_events_path on public.web_events (path);


-- 1) Create table to store contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text,
  service_needed text,
  vehicle_info text,
  message text,
  source_page text,
  status text not null default 'new', -- 'new' | 'in_progress' | 'resolved' | 'archived'
  assigned_to uuid references public.profiles(id) on delete set null,
  internal_notes text
);

-- 2) Enable Row Level Security
alter table public.contact_submissions enable row level security;

-- 3) RLS Policies
-- Allow anyone (including anonymous) to submit the form (INSERT only)
create policy "Anyone can submit contact form"
  on public.contact_submissions
  for insert
  to anon
  with check (true);

create policy "Authenticated users can submit contact form"
  on public.contact_submissions
  for insert
  to authenticated
  with check (true);

-- Only employees/admins can read/update/delete (manage inbox)
create policy "Employees can read contact submissions"
  on public.contact_submissions
  for select
  to authenticated
  using (public.get_user_role() = any (array['employee','admin']));

create policy "Employees can update contact submissions"
  on public.contact_submissions
  for update
  to authenticated
  using (public.get_user_role() = any (array['employee','admin']))
  with check (public.get_user_role() = any (array['employee','admin']));

create policy "Employees can delete contact submissions"
  on public.contact_submissions
  for delete
  to authenticated
  using (public.get_user_role() = any (array['employee','admin']));

-- 4) Auto-update updated_at on change
create trigger contact_submissions_set_updated_at
before update on public.contact_submissions
for each row execute function public.update_updated_at_column();

-- 5) Helpful indexes for the inbox
create index if not exists contact_submissions_status_created_at_idx
  on public.contact_submissions (status, created_at desc);

create index if not exists contact_submissions_assigned_to_idx
  on public.contact_submissions (assigned_to);

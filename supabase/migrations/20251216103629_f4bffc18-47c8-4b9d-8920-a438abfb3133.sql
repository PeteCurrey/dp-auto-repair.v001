-- Drop the security definer view and recreate as regular view
DROP VIEW IF EXISTS public.mot_reminders;

CREATE VIEW public.mot_reminders WITH (security_invoker = true) AS
SELECT 
  v.id,
  v.registration,
  v.make,
  v.model,
  v.year,
  v.mot_expiry as mot_expiry_date,
  false as reminder_sent,
  (v.mot_expiry - INTERVAL '14 days')::date as reminder_date,
  c.email as client_email,
  c.phone as client_phone,
  v.created_at
FROM public.vehicles v
LEFT JOIN public.clients c ON v.client_id = c.id
WHERE v.mot_expiry IS NOT NULL 
  AND v.mot_expiry <= CURRENT_DATE + INTERVAL '30 days';
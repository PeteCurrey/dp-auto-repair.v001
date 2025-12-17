-- Enable realtime for appointments and contact_submissions tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.appointments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.contact_submissions;
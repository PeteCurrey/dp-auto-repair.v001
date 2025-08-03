-- Fix function search path issues
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Fix appointment conflict function search path
CREATE OR REPLACE FUNCTION public.check_appointment_conflict(
  appointment_date DATE,
  appointment_time TIME,
  duration_minutes INTEGER,
  exclude_appointment_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  start_time TIME := appointment_time;
  end_time TIME := appointment_time + (duration_minutes || ' minutes')::INTERVAL;
  conflict_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO conflict_count
  FROM public.appointments a
  WHERE a.appointment_date = check_appointment_conflict.appointment_date
    AND a.status NOT IN ('cancelled', 'completed')
    AND (exclude_appointment_id IS NULL OR a.id != exclude_appointment_id)
    AND (
      (a.appointment_time < end_time AND 
       (a.appointment_time + (a.duration_minutes || ' minutes')::INTERVAL) > start_time)
    );
  
  RETURN conflict_count = 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';
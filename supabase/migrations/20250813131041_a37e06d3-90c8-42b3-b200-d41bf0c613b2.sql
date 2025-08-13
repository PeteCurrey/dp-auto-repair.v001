-- Create vehicle_lookups table to store DVLA lookup results
CREATE TABLE public.vehicle_lookups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration TEXT NOT NULL UNIQUE,
  make TEXT,
  model TEXT,
  year INTEGER,
  fuel_type TEXT,
  engine_capacity INTEGER,
  colour TEXT,
  mot_status TEXT,
  mot_expiry_date DATE,
  tax_status TEXT,
  tax_expiry_date DATE,
  vin TEXT,
  lookup_count INTEGER DEFAULT 1,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicle_lookups ENABLE ROW LEVEL SECURITY;

-- Create policies for vehicle_lookups
CREATE POLICY "Employees can manage all vehicle lookups" 
ON public.vehicle_lookups 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])
));

-- Create MOT reminders table
CREATE TABLE public.mot_reminders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  registration TEXT NOT NULL,
  mot_expiry_date DATE NOT NULL,
  reminder_sent BOOLEAN DEFAULT false,
  reminder_date DATE,
  client_email TEXT,
  client_phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for MOT reminders
ALTER TABLE public.mot_reminders ENABLE ROW LEVEL SECURITY;

-- Create policies for MOT reminders
CREATE POLICY "Employees can manage MOT reminders" 
ON public.mot_reminders 
FOR ALL 
USING (EXISTS (
  SELECT 1 FROM profiles 
  WHERE profiles.user_id = auth.uid() 
  AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])
));

-- Create indexes for better performance
CREATE INDEX idx_vehicle_lookups_registration ON public.vehicle_lookups(registration);
CREATE INDEX idx_vehicle_lookups_mot_expiry ON public.vehicle_lookups(mot_expiry_date);
CREATE INDEX idx_mot_reminders_expiry_date ON public.mot_reminders(mot_expiry_date);
CREATE INDEX idx_mot_reminders_registration ON public.mot_reminders(registration);

-- Create function to update updated_at timestamp
CREATE TRIGGER update_vehicle_lookups_updated_at
  BEFORE UPDATE ON public.vehicle_lookups
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_mot_reminders_updated_at
  BEFORE UPDATE ON public.mot_reminders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check MOT expiry and create reminders
CREATE OR REPLACE FUNCTION public.check_mot_expiry()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- If MOT expires within 30 days, create/update reminder
  IF NEW.mot_expiry_date IS NOT NULL AND 
     NEW.mot_expiry_date <= (CURRENT_DATE + INTERVAL '30 days') AND
     NEW.mot_expiry_date > CURRENT_DATE THEN
    
    INSERT INTO public.mot_reminders (
      registration, 
      mot_expiry_date, 
      reminder_date
    ) VALUES (
      NEW.registration,
      NEW.mot_expiry_date,
      NEW.mot_expiry_date - INTERVAL '14 days'
    )
    ON CONFLICT (registration) 
    DO UPDATE SET 
      mot_expiry_date = EXCLUDED.mot_expiry_date,
      reminder_date = EXCLUDED.reminder_date,
      updated_at = now();
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger to automatically check MOT expiry on vehicle lookup updates
CREATE TRIGGER trigger_check_mot_expiry
  AFTER INSERT OR UPDATE ON public.vehicle_lookups
  FOR EACH ROW
  EXECUTE FUNCTION public.check_mot_expiry();
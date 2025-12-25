-- Create employee_schedules table for managing staff availability
CREATE TABLE public.employee_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME WITHOUT TIME ZONE,
  end_time TIME WITHOUT TIME ZONE,
  is_available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(employee_id, day_of_week)
);

-- Create employee_time_off table for holidays/leave
CREATE TABLE public.employee_time_off (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  reason TEXT,
  approved BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_date_range CHECK (end_date >= start_date)
);

-- Add technician_id to appointments table for assigning work to specific employees
ALTER TABLE public.appointments 
ADD COLUMN IF NOT EXISTS technician_id UUID REFERENCES public.profiles(id);

-- Enable RLS on new tables
ALTER TABLE public.employee_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.employee_time_off ENABLE ROW LEVEL SECURITY;

-- RLS policies for employee_schedules
CREATE POLICY "Employees can view all schedules"
ON public.employee_schedules
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid()
  AND profiles.user_type IN ('employee', 'admin')
));

CREATE POLICY "Admins can manage all schedules"
ON public.employee_schedules
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid()
  AND profiles.user_type = 'admin'
));

CREATE POLICY "Employees can manage own schedule"
ON public.employee_schedules
FOR ALL
USING (
  employee_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
  )
);

-- RLS policies for employee_time_off
CREATE POLICY "Employees can view all time off"
ON public.employee_time_off
FOR SELECT
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid()
  AND profiles.user_type IN ('employee', 'admin')
));

CREATE POLICY "Admins can manage all time off"
ON public.employee_time_off
FOR ALL
USING (EXISTS (
  SELECT 1 FROM profiles
  WHERE profiles.user_id = auth.uid()
  AND profiles.user_type = 'admin'
));

CREATE POLICY "Employees can request own time off"
ON public.employee_time_off
FOR INSERT
WITH CHECK (
  employee_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
  )
);

CREATE POLICY "Employees can view own time off"
ON public.employee_time_off
FOR SELECT
USING (
  employee_id IN (
    SELECT id FROM profiles WHERE user_id = auth.uid()
  )
);

-- Create trigger for updated_at
CREATE TRIGGER update_employee_schedules_updated_at
BEFORE UPDATE ON public.employee_schedules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_employee_time_off_updated_at
BEFORE UPDATE ON public.employee_time_off
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to check employee availability
CREATE OR REPLACE FUNCTION public.check_employee_availability(
  p_employee_id UUID,
  p_date DATE,
  p_time TIME
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_day_of_week INTEGER;
  v_is_available BOOLEAN;
  v_on_leave BOOLEAN;
BEGIN
  -- Get day of week (0 = Sunday, 6 = Saturday)
  v_day_of_week := EXTRACT(DOW FROM p_date)::INTEGER;
  
  -- Check if employee is scheduled to work on this day
  SELECT is_available INTO v_is_available
  FROM public.employee_schedules
  WHERE employee_id = p_employee_id
    AND day_of_week = v_day_of_week
    AND (start_time IS NULL OR p_time >= start_time)
    AND (end_time IS NULL OR p_time <= end_time);
  
  IF v_is_available IS NULL OR v_is_available = false THEN
    RETURN false;
  END IF;
  
  -- Check if employee is on approved time off
  SELECT EXISTS (
    SELECT 1 FROM public.employee_time_off
    WHERE employee_id = p_employee_id
      AND approved = true
      AND p_date BETWEEN start_date AND end_date
  ) INTO v_on_leave;
  
  RETURN NOT v_on_leave;
END;
$$;
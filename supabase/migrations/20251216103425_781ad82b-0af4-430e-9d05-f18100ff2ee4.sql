-- Fix function search paths for security
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE OR REPLACE FUNCTION public.check_appointment_conflict(
  p_date DATE,
  p_time TIME,
  p_duration INTEGER,
  p_exclude_id UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
  v_end_time TIME;
  v_conflict_count INTEGER;
BEGIN
  v_end_time := p_time + (p_duration || ' minutes')::INTERVAL;
  
  SELECT COUNT(*) INTO v_conflict_count
  FROM public.appointments
  WHERE appointment_date = p_date
    AND status NOT IN ('cancelled', 'completed', 'no_show')
    AND (p_exclude_id IS NULL OR id != p_exclude_id)
    AND (
      (appointment_time <= p_time AND appointment_time + (duration_minutes || ' minutes')::INTERVAL > p_time)
      OR (appointment_time < v_end_time AND appointment_time >= p_time)
    );
  
  RETURN v_conflict_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE OR REPLACE FUNCTION public.generate_booking_reference()
RETURNS TEXT AS $$
DECLARE
  v_ref TEXT;
  v_exists BOOLEAN;
BEGIN
  LOOP
    v_ref := 'DP' || TO_CHAR(NOW(), 'YYMM') || '-' || UPPER(SUBSTRING(MD5(RANDOM()::TEXT) FROM 1 FOR 4));
    SELECT EXISTS(SELECT 1 FROM public.appointments WHERE booking_reference = v_ref) INTO v_exists;
    EXIT WHEN NOT v_exists;
  END LOOP;
  RETURN v_ref;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Add invoice_items and quote_items tables that the code expects
CREATE TABLE IF NOT EXISTS public.invoice_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id UUID REFERENCES public.invoices(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'labour',
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  part_number TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.quote_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'labour',
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  part_number TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Employees can manage invoice items" ON public.invoice_items FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Employees can manage quote items" ON public.quote_items FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
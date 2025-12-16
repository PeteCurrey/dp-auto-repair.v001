-- Add missing tables and functions

-- Vehicle lookups table
CREATE TABLE IF NOT EXISTS public.vehicle_lookups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration TEXT NOT NULL,
  make TEXT,
  model TEXT,
  year INTEGER,
  colour TEXT,
  fuel_type TEXT,
  mot_status TEXT,
  mot_expiry_date DATE,
  tax_status TEXT,
  tax_due_date DATE,
  lookup_count INTEGER DEFAULT 1,
  last_updated TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.vehicle_lookups ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Employees can manage vehicle lookups" ON public.vehicle_lookups FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- MOT reminders view (not a table, just vehicle data)
CREATE OR REPLACE VIEW public.mot_reminders AS
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
  c.phone as client_phone
FROM public.vehicles v
LEFT JOIN public.clients c ON v.client_id = c.id
WHERE v.mot_expiry IS NOT NULL 
  AND v.mot_expiry <= CURRENT_DATE + INTERVAL '30 days';

-- Generate invoice number function
CREATE OR REPLACE FUNCTION public.generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  v_num TEXT;
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO v_count FROM public.invoices;
  v_num := 'INV-' || TO_CHAR(NOW(), 'YYMM') || '-' || LPAD(v_count::TEXT, 4, '0');
  RETURN v_num;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Generate quote number function
CREATE OR REPLACE FUNCTION public.generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  v_num TEXT;
  v_count INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO v_count FROM public.quotes;
  v_num := 'QTE-' || TO_CHAR(NOW(), 'YYMM') || '-' || LPAD(v_count::TEXT, 4, '0');
  RETURN v_num;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Convert quote to invoice function
CREATE OR REPLACE FUNCTION public.convert_quote_to_invoice(quote_id UUID)
RETURNS UUID AS $$
DECLARE
  v_quote RECORD;
  v_invoice_id UUID;
  v_invoice_number TEXT;
BEGIN
  -- Get quote data
  SELECT * INTO v_quote FROM public.quotes WHERE id = quote_id;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quote not found';
  END IF;
  
  -- Generate invoice number
  SELECT public.generate_invoice_number() INTO v_invoice_number;
  
  -- Create invoice
  INSERT INTO public.invoices (
    invoice_number, quote_id, client_id, vehicle_id, title, description,
    items, subtotal, tax_rate, tax_amount, total_amount, amount_due, status
  ) VALUES (
    v_invoice_number, quote_id, v_quote.client_id, v_quote.vehicle_id, v_quote.title,
    v_quote.description, v_quote.items, v_quote.subtotal, v_quote.tax_rate,
    v_quote.tax_amount, v_quote.total_amount, v_quote.total_amount, 'draft'
  ) RETURNING id INTO v_invoice_id;
  
  -- Update quote status
  UPDATE public.quotes SET status = 'accepted' WHERE id = quote_id;
  
  RETURN v_invoice_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;
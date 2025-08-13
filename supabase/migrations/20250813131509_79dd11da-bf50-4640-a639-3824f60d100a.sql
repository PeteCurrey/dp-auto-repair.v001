-- Create clients table (enhanced from profiles for business management)
CREATE TABLE public.clients (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT,
  contact_person TEXT,
  phone TEXT,
  email TEXT NOT NULL,
  address TEXT,
  preferred_contact_method TEXT DEFAULT 'email',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quotes table
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  title TEXT NOT NULL,
  description TEXT,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  valid_until DATE,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create quote line items table
CREATE TABLE public.quote_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'service',
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  part_number TEXT,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoices table
CREATE TABLE public.invoices (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_number TEXT NOT NULL UNIQUE,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  title TEXT NOT NULL,
  description TEXT,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 20.00,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  amount_due DECIMAL(10,2) DEFAULT 0,
  due_date DATE,
  payment_method TEXT,
  payment_date TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create invoice line items table
CREATE TABLE public.invoice_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  invoice_id UUID NOT NULL REFERENCES public.invoices(id) ON DELETE CASCADE,
  item_type TEXT NOT NULL DEFAULT 'service',
  description TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  part_number TEXT,
  supplier TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create parts inventory table
CREATE TABLE public.parts_inventory (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  part_number TEXT NOT NULL,
  part_name TEXT NOT NULL,
  description TEXT,
  supplier TEXT,
  cost_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  sell_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 5,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create service templates table
CREATE TABLE public.service_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  estimated_duration_minutes INTEGER,
  labor_rate DECIMAL(10,2) NOT NULL DEFAULT 0,
  parts TEXT[], -- Array of common part numbers
  instructions TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoice_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parts_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_templates ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for employees to manage all business data
CREATE POLICY "Employees can manage all clients" ON public.clients FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage all quotes" ON public.quotes FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage all quote items" ON public.quote_items FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage all invoices" ON public.invoices FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage all invoice items" ON public.invoice_items FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage parts inventory" ON public.parts_inventory FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

CREATE POLICY "Employees can manage service templates" ON public.service_templates FOR ALL 
USING (EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.user_type = ANY(ARRAY['employee'::text, 'admin'::text])));

-- Create indexes for better performance
CREATE INDEX idx_clients_email ON public.clients(email);
CREATE INDEX idx_quotes_client_id ON public.quotes(client_id);
CREATE INDEX idx_quotes_status ON public.quotes(status);
CREATE INDEX idx_quotes_number ON public.quotes(quote_number);
CREATE INDEX idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX idx_invoices_status ON public.invoices(status);
CREATE INDEX idx_invoices_number ON public.invoices(invoice_number);
CREATE INDEX idx_parts_part_number ON public.parts_inventory(part_number);

-- Create triggers for updated_at timestamps
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parts_inventory_updated_at BEFORE UPDATE ON public.parts_inventory FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_service_templates_updated_at BEFORE UPDATE ON public.service_templates FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to generate quote numbers
CREATE OR REPLACE FUNCTION generate_quote_number()
RETURNS TEXT AS $$
DECLARE
  year_suffix TEXT;
  next_num INTEGER;
  quote_num TEXT;
BEGIN
  year_suffix := TO_CHAR(CURRENT_DATE, 'YY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(quote_number FROM 'Q' || year_suffix || '-(\d+)') AS INTEGER)), 0) + 1
  INTO next_num
  FROM quotes
  WHERE quote_number ~ ('^Q' || year_suffix || '-\d+$');
  
  quote_num := 'Q' || year_suffix || '-' || LPAD(next_num::TEXT, 4, '0');
  RETURN quote_num;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate invoice numbers
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TEXT AS $$
DECLARE
  year_suffix TEXT;
  next_num INTEGER;
  invoice_num TEXT;
BEGIN
  year_suffix := TO_CHAR(CURRENT_DATE, 'YY');
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(invoice_number FROM 'INV' || year_suffix || '-(\d+)') AS INTEGER)), 0) + 1
  INTO next_num
  FROM invoices
  WHERE invoice_number ~ ('^INV' || year_suffix || '-\d+$');
  
  invoice_num := 'INV' || year_suffix || '-' || LPAD(next_num::TEXT, 4, '0');
  RETURN invoice_num;
END;
$$ LANGUAGE plpgsql;

-- Function to convert quote to invoice
CREATE OR REPLACE FUNCTION convert_quote_to_invoice(quote_uuid UUID)
RETURNS UUID AS $$
DECLARE
  new_invoice_id UUID;
  quote_record RECORD;
  item_record RECORD;
BEGIN
  -- Get the quote details
  SELECT * INTO quote_record FROM quotes WHERE id = quote_uuid;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Quote not found';
  END IF;
  
  -- Create the invoice
  INSERT INTO invoices (
    invoice_number,
    quote_id,
    client_id,
    vehicle_id,
    title,
    description,
    subtotal,
    tax_rate,
    tax_amount,
    total_amount,
    amount_due,
    due_date,
    notes,
    created_by
  ) VALUES (
    generate_invoice_number(),
    quote_record.id,
    quote_record.client_id,
    quote_record.vehicle_id,
    quote_record.title,
    quote_record.description,
    quote_record.subtotal,
    quote_record.tax_rate,
    quote_record.tax_amount,
    quote_record.total_amount,
    quote_record.total_amount,
    CURRENT_DATE + INTERVAL '30 days',
    quote_record.notes,
    quote_record.created_by
  ) RETURNING id INTO new_invoice_id;
  
  -- Copy quote items to invoice items
  FOR item_record IN SELECT * FROM quote_items WHERE quote_id = quote_uuid LOOP
    INSERT INTO invoice_items (
      invoice_id,
      item_type,
      description,
      quantity,
      unit_price,
      total_price,
      part_number,
      supplier
    ) VALUES (
      new_invoice_id,
      item_record.item_type,
      item_record.description,
      item_record.quantity,
      item_record.unit_price,
      item_record.total_price,
      item_record.part_number,
      item_record.supplier
    );
  END LOOP;
  
  -- Update quote status
  UPDATE quotes SET status = 'converted' WHERE id = quote_uuid;
  
  RETURN new_invoice_id;
END;
$$ LANGUAGE plpgsql;

-- Insert sample service templates
INSERT INTO public.service_templates (name, description, category, estimated_duration_minutes, labor_rate, instructions) VALUES
('Basic Service', 'Oil change, filter replacement, basic checks', 'Maintenance', 60, 45.00, 'Change oil and filter, check fluid levels, tire pressure, lights'),
('MOT Test', 'Ministry of Transport test', 'Testing', 45, 54.85, 'Complete MOT inspection as per DVSA guidelines'),
('Brake Inspection', 'Full brake system check', 'Safety', 90, 45.00, 'Check brake pads, discs, fluid, and brake lines'),
('Diagnostic Scan', 'Engine diagnostic and fault code reading', 'Diagnostics', 30, 50.00, 'Connect diagnostic equipment and analyze fault codes'),
('Timing Belt Replacement', 'Replace timing belt and associated components', 'Major Service', 240, 45.00, 'Replace timing belt, tensioners, and water pump if required');

-- Insert sample parts inventory
INSERT INTO public.parts_inventory (part_number, part_name, description, cost_price, sell_price, stock_quantity, min_stock_level) VALUES
('OF001', 'Oil Filter - Universal', 'Standard oil filter for most vehicles', 3.50, 8.99, 25, 5),
('BP001', 'Brake Pads - Front Set', 'Front brake pad set', 15.00, 35.99, 10, 3),
('SP001', 'Spark Plugs - Set of 4', 'Standard spark plug set', 12.00, 24.99, 15, 5),
('TB001', 'Timing Belt Kit', 'Complete timing belt kit with tensioners', 45.00, 89.99, 5, 2),
('EO001', 'Engine Oil 5W-30', '5 litre container semi-synthetic oil', 18.00, 32.99, 20, 5);
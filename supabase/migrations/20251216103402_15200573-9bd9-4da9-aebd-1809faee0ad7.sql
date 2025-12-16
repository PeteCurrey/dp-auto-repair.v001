-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================
-- CORE TABLES
-- =====================

-- Profiles table (extends auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  phone TEXT,
  user_type TEXT NOT NULL DEFAULT 'client' CHECK (user_type IN ('client', 'employee', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Clients table (for non-auth clients managed by staff)
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  address TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vehicles table
CREATE TABLE public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  registration TEXT NOT NULL,
  vin TEXT,
  engine_code TEXT,
  colour TEXT,
  fuel_type TEXT,
  mileage INTEGER,
  mot_expiry DATE,
  service_due_date DATE,
  service_due_mileage INTEGER,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Services (completed work records)
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  description TEXT,
  cost DECIMAL(10,2),
  service_date DATE NOT NULL DEFAULT CURRENT_DATE,
  technician_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed', 'cancelled')),
  parts_used TEXT,
  labour_hours DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Appointments table
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  managed_client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  service_type TEXT NOT NULL,
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  estimated_cost DECIMAL(10,2),
  booked_online BOOLEAN DEFAULT false,
  booking_reference TEXT UNIQUE,
  customer_name TEXT,
  customer_email TEXT,
  customer_phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Contact submissions (leads from contact form)
CREATE TABLE public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_needed TEXT,
  vehicle_info TEXT,
  message TEXT,
  source_page TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'responded', 'closed')),
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Quotes table
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_number TEXT NOT NULL UNIQUE,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 20,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  valid_until DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'accepted', 'rejected', 'expired')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Invoices table
CREATE TABLE public.invoices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number TEXT NOT NULL UNIQUE,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE SET NULL,
  client_id UUID REFERENCES public.clients(id) ON DELETE SET NULL,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  items JSONB DEFAULT '[]'::jsonb,
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  tax_rate DECIMAL(5,2) DEFAULT 20,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  amount_paid DECIMAL(10,2) DEFAULT 0,
  amount_due DECIMAL(10,2) NOT NULL DEFAULT 0,
  due_date DATE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'partial', 'overdue', 'cancelled')),
  notes TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reminders table
CREATE TABLE public.reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE CASCADE,
  reminder_type TEXT NOT NULL,
  reminder_date DATE NOT NULL,
  message TEXT,
  is_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Suppliers table
CREATE TABLE public.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  website TEXT,
  category TEXT,
  account_number TEXT,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Analytics tables
CREATE TABLE public.web_pageviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.web_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  event_name TEXT NOT NULL,
  event_data JSONB,
  session_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================
-- BOOKING SYSTEM TABLES
-- =====================

-- Bookable services (services available for online booking)
CREATE TABLE public.bookable_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  price DECIMAL(10,2),
  price_from BOOLEAN DEFAULT false,
  category TEXT,
  is_active BOOLEAN DEFAULT true,
  online_booking_enabled BOOLEAN DEFAULT true,
  max_daily_slots INTEGER,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business hours
CREATE TABLE public.business_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  slot_interval_minutes INTEGER DEFAULT 30,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(day_of_week)
);

-- Blocked time slots
CREATE TABLE public.blocked_times (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  all_day BOOLEAN DEFAULT false,
  reason TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =====================
-- ENABLE RLS
-- =====================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_pageviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookable_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blocked_times ENABLE ROW LEVEL SECURITY;

-- =====================
-- RLS POLICIES
-- =====================

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by authenticated users" ON public.profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Clients: employees/admins can manage
CREATE POLICY "Employees can manage clients" ON public.clients FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Vehicles: owners can see their own, employees can see all
CREATE POLICY "Users can view own vehicles" ON public.vehicles FOR SELECT TO authenticated 
  USING (owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR 
         EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Employees can manage vehicles" ON public.vehicles FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Services: similar to vehicles
CREATE POLICY "Users can view own services" ON public.services FOR SELECT TO authenticated 
  USING (vehicle_id IN (SELECT id FROM public.vehicles WHERE owner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid())) OR 
         EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Employees can manage services" ON public.services FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Appointments: users can see own, employees see all
CREATE POLICY "Users can view own appointments" ON public.appointments FOR SELECT TO authenticated 
  USING (client_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR 
         EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Employees can manage appointments" ON public.appointments FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Public can create appointments" ON public.appointments FOR INSERT TO anon WITH CHECK (booked_online = true);

-- Contact submissions: public can insert, employees can manage
CREATE POLICY "Public can submit contact forms" ON public.contact_submissions FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can submit contact forms" ON public.contact_submissions FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Employees can manage submissions" ON public.contact_submissions FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Quotes/Invoices: employees only
CREATE POLICY "Employees can manage quotes" ON public.quotes FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));
CREATE POLICY "Employees can manage invoices" ON public.invoices FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Reminders: users see own
CREATE POLICY "Users can view own reminders" ON public.reminders FOR SELECT TO authenticated 
  USING (profile_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()) OR 
         EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Suppliers: employees only
CREATE POLICY "Employees can manage suppliers" ON public.suppliers FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Analytics: anyone can insert, employees can read
CREATE POLICY "Anyone can log pageviews" ON public.web_pageviews FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can log pageviews" ON public.web_pageviews FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Employees can read pageviews" ON public.web_pageviews FOR SELECT TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

CREATE POLICY "Anyone can log events" ON public.web_events FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Authenticated can log events" ON public.web_events FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Employees can read events" ON public.web_events FOR SELECT TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Bookable services: public can read active, employees manage
CREATE POLICY "Public can view active bookable services" ON public.bookable_services FOR SELECT TO anon 
  USING (is_active = true AND online_booking_enabled = true);
CREATE POLICY "Authenticated can view bookable services" ON public.bookable_services FOR SELECT TO authenticated USING (true);
CREATE POLICY "Employees can manage bookable services" ON public.bookable_services FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Business hours: public can read, employees manage
CREATE POLICY "Public can view business hours" ON public.business_hours FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can view business hours" ON public.business_hours FOR SELECT TO authenticated USING (true);
CREATE POLICY "Employees can manage business hours" ON public.business_hours FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- Blocked times: public can read, employees manage
CREATE POLICY "Public can view blocked times" ON public.blocked_times FOR SELECT TO anon USING (true);
CREATE POLICY "Authenticated can view blocked times" ON public.blocked_times FOR SELECT TO authenticated USING (true);
CREATE POLICY "Employees can manage blocked times" ON public.blocked_times FOR ALL TO authenticated 
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE user_id = auth.uid() AND user_type IN ('employee', 'admin')));

-- =====================
-- FUNCTIONS
-- =====================

-- Update timestamp trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add update triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_clients_updated_at BEFORE UPDATE ON public.clients FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON public.vehicles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_appointments_updated_at BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_quotes_updated_at BEFORE UPDATE ON public.quotes FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_suppliers_updated_at BEFORE UPDATE ON public.suppliers FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_bookable_services_updated_at BEFORE UPDATE ON public.bookable_services FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Function to check appointment conflicts
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
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Generate booking reference
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
$$ LANGUAGE plpgsql;

-- =====================
-- SEED DATA
-- =====================

-- Insert default business hours (Mon-Fri 9-5)
INSERT INTO public.business_hours (day_of_week, open_time, close_time, is_closed, slot_interval_minutes) VALUES
  (0, NULL, NULL, true, 30),      -- Sunday closed
  (1, '09:00', '17:00', false, 30), -- Monday
  (2, '09:00', '17:00', false, 30), -- Tuesday
  (3, '09:00', '17:00', false, 30), -- Wednesday
  (4, '09:00', '17:00', false, 30), -- Thursday
  (5, '09:00', '17:00', false, 30), -- Friday
  (6, NULL, NULL, true, 30);      -- Saturday closed

-- Insert default bookable services
INSERT INTO public.bookable_services (name, description, duration_minutes, price, price_from, category, sort_order) VALUES
  ('Basic Service', 'Oil and filter change, fluid checks, visual inspection', 60, 89.00, false, 'Servicing', 1),
  ('Full Service', 'Comprehensive service including all filters, fluids and full inspection', 120, 179.00, false, 'Servicing', 2),
  ('MOT Test', 'Annual MOT test for vehicles over 3 years old', 60, 54.85, false, 'MOT', 3),
  ('Diagnostic Check', 'Full diagnostic scan and fault code reading', 45, 45.00, false, 'Diagnostics', 4),
  ('Brake Inspection', 'Full brake system inspection and report', 30, 0.00, true, 'Brakes', 5),
  ('Air Con Regas', 'Air conditioning system regas and leak check', 60, 59.00, false, 'Air Con', 6);
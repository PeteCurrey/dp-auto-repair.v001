-- Create permissions table to store granular permissions for each role
CREATE TABLE public.role_permissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  role public.app_role NOT NULL,
  permission_key TEXT NOT NULL,
  permission_type TEXT NOT NULL DEFAULT 'feature',
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(role, permission_key)
);

-- Enable RLS
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

-- Only admins can manage permissions
CREATE POLICY "Admins can manage permissions" 
ON public.role_permissions 
FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Staff can view permissions
CREATE POLICY "Staff can view permissions" 
ON public.role_permissions 
FOR SELECT 
USING (auth.uid() IS NOT NULL);

-- Create trigger for updated_at
CREATE TRIGGER update_role_permissions_updated_at
BEFORE UPDATE ON public.role_permissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default permissions for all roles
INSERT INTO public.role_permissions (role, permission_key, permission_type, enabled) VALUES
-- Admin has all permissions
('admin', 'view_dashboard', 'feature', true),
('admin', 'view_enquiries', 'feature', true),
('admin', 'view_analytics', 'feature', true),
('admin', 'view_vehicle_lookup', 'feature', true),
('admin', 'view_suppliers', 'feature', true),
('admin', 'view_schedule', 'feature', true),
('admin', 'view_clients', 'feature', true),
('admin', 'view_vehicles', 'feature', true),
('admin', 'view_quotes', 'feature', true),
('admin', 'view_invoices', 'feature', true),
('admin', 'view_pos', 'feature', true),
('admin', 'view_services', 'feature', true),
('admin', 'view_settings', 'feature', true),
('admin', 'view_users', 'feature', true),
('admin', 'view_api_keys', 'feature', true),
('admin', 'create_appointments', 'action', true),
('admin', 'edit_appointments', 'action', true),
('admin', 'delete_appointments', 'action', true),
('admin', 'create_quotes', 'action', true),
('admin', 'edit_quotes', 'action', true),
('admin', 'delete_quotes', 'action', true),
('admin', 'create_invoices', 'action', true),
('admin', 'edit_invoices', 'action', true),
('admin', 'delete_invoices', 'action', true),
('admin', 'process_payments', 'action', true),
('admin', 'manage_users', 'action', true),
('admin', 'manage_roles', 'action', true),

-- Employee permissions
('employee', 'view_dashboard', 'feature', true),
('employee', 'view_enquiries', 'feature', true),
('employee', 'view_schedule', 'feature', true),
('employee', 'view_clients', 'feature', true),
('employee', 'view_vehicles', 'feature', true),
('employee', 'view_quotes', 'feature', true),
('employee', 'view_invoices', 'feature', true),
('employee', 'view_services', 'feature', true),
('employee', 'create_appointments', 'action', true),
('employee', 'edit_appointments', 'action', true),

-- Mechanic permissions
('mechanic', 'view_dashboard', 'feature', true),
('mechanic', 'view_schedule', 'feature', true),
('mechanic', 'view_vehicles', 'feature', true),
('mechanic', 'view_services', 'feature', true),
('mechanic', 'view_vehicle_lookup', 'feature', true),
('mechanic', 'edit_appointments', 'action', true),

-- Receptionist permissions
('receptionist', 'view_dashboard', 'feature', true),
('receptionist', 'view_enquiries', 'feature', true),
('receptionist', 'view_schedule', 'feature', true),
('receptionist', 'view_clients', 'feature', true),
('receptionist', 'view_vehicles', 'feature', true),
('receptionist', 'create_appointments', 'action', true),
('receptionist', 'edit_appointments', 'action', true),

-- Sales permissions
('sales', 'view_dashboard', 'feature', true),
('sales', 'view_enquiries', 'feature', true),
('sales', 'view_clients', 'feature', true),
('sales', 'view_vehicles', 'feature', true),
('sales', 'view_quotes', 'feature', true),
('sales', 'view_invoices', 'feature', true),
('sales', 'create_quotes', 'action', true),
('sales', 'edit_quotes', 'action', true),
('sales', 'create_invoices', 'action', true),

-- Accounts permissions
('accounts', 'view_dashboard', 'feature', true),
('accounts', 'view_analytics', 'feature', true),
('accounts', 'view_invoices', 'feature', true),
('accounts', 'view_pos', 'feature', true),
('accounts', 'view_suppliers', 'feature', true),
('accounts', 'create_invoices', 'action', true),
('accounts', 'edit_invoices', 'action', true),
('accounts', 'process_payments', 'action', true);
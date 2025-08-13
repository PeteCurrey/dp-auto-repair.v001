-- Security fix for clients table - Comprehensive RLS policies

-- First, ensure RLS is explicitly enabled
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them with more granular security
DROP POLICY IF EXISTS "Employees can manage all clients" ON public.clients;

-- Create comprehensive RLS policies for clients table

-- 1. SELECT policy - Only employees/admins can view client data
CREATE POLICY "Employees can view all clients" 
ON public.clients 
FOR SELECT 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.user_type = ANY (ARRAY['employee'::text, 'admin'::text])
  )
);

-- 2. INSERT policy - Only employees/admins can create clients
CREATE POLICY "Employees can insert clients" 
ON public.clients 
FOR INSERT 
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.user_type = ANY (ARRAY['employee'::text, 'admin'::text])
  )
);

-- 3. UPDATE policy - Only employees/admins can update clients
CREATE POLICY "Employees can update clients" 
ON public.clients 
FOR UPDATE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.user_type = ANY (ARRAY['employee'::text, 'admin'::text])
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.user_type = ANY (ARRAY['employee'::text, 'admin'::text])
  )
);

-- 4. DELETE policy - Only admins can delete clients (more restrictive)
CREATE POLICY "Admins can delete clients" 
ON public.clients 
FOR DELETE 
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE profiles.user_id = auth.uid() 
    AND profiles.user_type = 'admin'::text
  )
);

-- 5. Deny all access to anonymous users (explicit denial)
CREATE POLICY "Block anonymous access to clients" 
ON public.clients 
FOR ALL 
TO anon
USING (false);

-- Create audit logging function for client access
CREATE OR REPLACE FUNCTION public.log_client_access()
RETURNS trigger AS $$
BEGIN
  -- Log any access attempts to clients table
  INSERT INTO public.web_events (
    name,
    session_id,
    path,
    metadata,
    profile_id,
    created_at
  ) VALUES (
    'client_table_access',
    COALESCE(current_setting('application_name', true), 'unknown'),
    '/admin/clients',
    jsonb_build_object(
      'operation', TG_OP,
      'table_name', TG_TABLE_NAME,
      'user_id', auth.uid(),
      'timestamp', now()
    ),
    (SELECT id FROM public.profiles WHERE user_id = auth.uid()),
    now()
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for audit logging
DROP TRIGGER IF EXISTS client_access_audit ON public.clients;
CREATE TRIGGER client_access_audit
  BEFORE SELECT OR INSERT OR UPDATE OR DELETE ON public.clients
  FOR EACH ROW EXECUTE FUNCTION public.log_client_access();

-- Create additional security function to validate user permissions
CREATE OR REPLACE FUNCTION public.validate_client_access()
RETURNS boolean AS $$
BEGIN
  -- Additional validation for client data access
  IF auth.uid() IS NULL THEN
    RAISE EXCEPTION 'Authentication required for client data access';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND user_type = ANY (ARRAY['employee'::text, 'admin'::text])
  ) THEN
    RAISE EXCEPTION 'Insufficient permissions for client data access';
  END IF;
  
  RETURN true;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
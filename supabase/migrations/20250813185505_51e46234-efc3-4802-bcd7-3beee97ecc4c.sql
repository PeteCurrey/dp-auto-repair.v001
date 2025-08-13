-- Fix for clients table security - simplified version without problematic dependencies

-- Ensure RLS is enabled on clients table
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to recreate them
DROP POLICY IF EXISTS "Employees can manage all clients" ON public.clients;
DROP POLICY IF EXISTS "Employees can view all clients" ON public.clients;
DROP POLICY IF EXISTS "Employees can insert clients" ON public.clients;
DROP POLICY IF EXISTS "Employees can update clients" ON public.clients;
DROP POLICY IF EXISTS "Admins can delete clients" ON public.clients;
DROP POLICY IF EXISTS "Block anonymous access to clients" ON public.clients;

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

-- 4. DELETE policy - Only admins can delete clients
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

-- 5. Explicitly deny all access to anonymous users
CREATE POLICY "Block anonymous access to clients" 
ON public.clients 
FOR ALL 
TO anon
USING (false);
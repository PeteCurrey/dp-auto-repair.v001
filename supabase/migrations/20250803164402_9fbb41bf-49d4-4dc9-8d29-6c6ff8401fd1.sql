-- Create a security definer function to safely get user role
CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS TEXT AS $$
  SELECT user_type FROM public.profiles WHERE user_id = auth.uid();
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- Drop the problematic policy that causes infinite recursion
DROP POLICY IF EXISTS "Employees can view all profiles" ON public.profiles;

-- Create a new policy using the security definer function
CREATE POLICY "Employees can view all profiles" ON public.profiles
FOR SELECT USING (public.get_user_role() IN ('employee', 'admin'));
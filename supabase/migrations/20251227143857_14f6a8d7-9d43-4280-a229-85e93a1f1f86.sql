-- Add new roles to the app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'mechanic';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'receptionist';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'sales';
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'accounts';
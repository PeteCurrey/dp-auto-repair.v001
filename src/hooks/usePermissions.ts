import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';

export type PermissionKey = 
  | 'view_dashboard'
  | 'view_enquiries'
  | 'view_analytics'
  | 'view_vehicle_lookup'
  | 'view_suppliers'
  | 'view_schedule'
  | 'view_clients'
  | 'view_vehicles'
  | 'view_quotes'
  | 'view_invoices'
  | 'view_pos'
  | 'view_services'
  | 'view_settings'
  | 'view_users'
  | 'view_api_keys'
  | 'create_appointments'
  | 'edit_appointments'
  | 'delete_appointments'
  | 'create_quotes'
  | 'edit_quotes'
  | 'delete_quotes'
  | 'create_invoices'
  | 'edit_invoices'
  | 'delete_invoices'
  | 'process_payments'
  | 'manage_users'
  | 'manage_roles';

interface RolePermission {
  id: string;
  role: string;
  permission_key: string;
  permission_type: string;
  enabled: boolean;
}

export const usePermissions = () => {
  const { roles, isAdmin, loading: rolesLoading } = useUserRole();
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (rolesLoading) return;
    
    const fetchPermissions = async () => {
      try {
        const { data, error } = await supabase
          .from('role_permissions')
          .select('*');

        if (error) {
          console.error('Error fetching permissions:', error);
          return;
        }

        setPermissions(data || []);
      } catch (error) {
        console.error('Error in usePermissions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissions();
  }, [rolesLoading]);

  const hasPermission = (permissionKey: PermissionKey): boolean => {
    // Admin always has all permissions
    if (isAdmin) return true;
    
    // Check if any of the user's roles have this permission enabled
    return roles.some(role => {
      const permission = permissions.find(
        p => p.role === role && p.permission_key === permissionKey && p.enabled
      );
      return !!permission;
    });
  };

  const hasFeature = (featureKey: PermissionKey): boolean => {
    return hasPermission(featureKey);
  };

  const hasAction = (actionKey: PermissionKey): boolean => {
    return hasPermission(actionKey);
  };

  return {
    permissions,
    hasPermission,
    hasFeature,
    hasAction,
    loading: loading || rolesLoading,
  };
};

export const PERMISSION_LABELS: Record<PermissionKey, string> = {
  view_dashboard: 'View Dashboard',
  view_enquiries: 'View Enquiries',
  view_analytics: 'View Analytics',
  view_vehicle_lookup: 'View Vehicle Lookup',
  view_suppliers: 'View Suppliers',
  view_schedule: 'View Schedule',
  view_clients: 'View Clients',
  view_vehicles: 'View Vehicles',
  view_quotes: 'View Quotes',
  view_invoices: 'View Invoices',
  view_pos: 'View POS',
  view_services: 'View Services',
  view_settings: 'View Settings',
  view_users: 'View Users',
  view_api_keys: 'View API Keys',
  create_appointments: 'Create Appointments',
  edit_appointments: 'Edit Appointments',
  delete_appointments: 'Delete Appointments',
  create_quotes: 'Create Quotes',
  edit_quotes: 'Edit Quotes',
  delete_quotes: 'Delete Quotes',
  create_invoices: 'Create Invoices',
  edit_invoices: 'Edit Invoices',
  delete_invoices: 'Delete Invoices',
  process_payments: 'Process Payments',
  manage_users: 'Manage Users',
  manage_roles: 'Manage Roles',
};

export const FEATURE_PERMISSIONS: PermissionKey[] = [
  'view_dashboard',
  'view_enquiries',
  'view_analytics',
  'view_vehicle_lookup',
  'view_suppliers',
  'view_schedule',
  'view_clients',
  'view_vehicles',
  'view_quotes',
  'view_invoices',
  'view_pos',
  'view_services',
  'view_settings',
  'view_users',
  'view_api_keys',
];

export const ACTION_PERMISSIONS: PermissionKey[] = [
  'create_appointments',
  'edit_appointments',
  'delete_appointments',
  'create_quotes',
  'edit_quotes',
  'delete_quotes',
  'create_invoices',
  'edit_invoices',
  'delete_invoices',
  'process_payments',
  'manage_users',
  'manage_roles',
];

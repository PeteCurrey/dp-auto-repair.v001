import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type AppRole = 'admin' | 'employee' | 'client' | 'mechanic' | 'receptionist' | 'sales' | 'accounts';

interface UserRoleState {
  roles: AppRole[];
  isAdmin: boolean;
  isEmployee: boolean;
  isStaff: boolean; // admin OR employee
  loading: boolean;
}

export const useUserRole = () => {
  const { user } = useAuth();
  const [state, setState] = useState<UserRoleState>({
    roles: [],
    isAdmin: false,
    isEmployee: false,
    isStaff: false,
    loading: true,
  });

  useEffect(() => {
    if (!user) {
      setState({
        roles: [],
        isAdmin: false,
        isEmployee: false,
        isStaff: false,
        loading: false,
      });
      return;
    }

    const fetchRoles = async () => {
      try {
        console.log('Fetching roles for user:', user.id);
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user roles:', error);
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        console.log('User roles data:', data);
        const roles = (data || []).map(r => r.role as AppRole);
        const isAdmin = roles.includes('admin');
        const isEmployee = roles.includes('employee') || 
          roles.includes('mechanic') || 
          roles.includes('receptionist') || 
          roles.includes('sales') || 
          roles.includes('accounts');
        const isStaff = isAdmin || isEmployee;

        console.log('Role state:', { roles, isAdmin, isEmployee, isStaff });
        
        setState({
          roles,
          isAdmin,
          isEmployee,
          isStaff,
          loading: false,
        });
      } catch (error) {
        console.error('Error in useUserRole:', error);
        setState(prev => ({ ...prev, loading: false }));
      }
    };

    fetchRoles();
  }, [user]);

  return state;
};

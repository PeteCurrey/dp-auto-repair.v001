import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

export type AppRole = 'admin' | 'employee' | 'client';

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
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id);

        if (error) {
          console.error('Error fetching user roles:', error);
          setState(prev => ({ ...prev, loading: false }));
          return;
        }

        const roles = (data || []).map(r => r.role as AppRole);
        const isAdmin = roles.includes('admin');
        const isEmployee = roles.includes('employee');
        const isStaff = isAdmin || isEmployee;

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

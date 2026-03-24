"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Shield, Settings2 } from 'lucide-react';
import { 
  PERMISSION_LABELS, 
  FEATURE_PERMISSIONS, 
  ACTION_PERMISSIONS,
  PermissionKey 
} from '@/hooks/usePermissions';

type AppRole = 'admin' | 'employee' | 'client' | 'mechanic' | 'receptionist' | 'sales' | 'accounts';

interface RolePermission {
  id: string;
  role: AppRole;
  permission_key: string;
  permission_type: string;
  enabled: boolean;
}

const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Admin (Super Admin)',
  employee: 'Employee (General)',
  client: 'Client',
  mechanic: 'Mechanic',
  receptionist: 'Receptionist',
  sales: 'Sales',
  accounts: 'Accounts',
};

const ROLE_DESCRIPTIONS: Record<AppRole, string> = {
  admin: 'Full access to all features and settings',
  employee: 'General staff with standard access',
  client: 'Customer access only',
  mechanic: 'Workshop technicians',
  receptionist: 'Front desk staff',
  sales: 'Sales and quotes team',
  accounts: 'Finance and payments team',
};

const RolePermissionsTab = () => {
  const { toast } = useToast();
  const [permissions, setPermissions] = useState<RolePermission[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<AppRole>('employee');

  const staffRoles: AppRole[] = ['employee', 'mechanic', 'receptionist', 'sales', 'accounts'];

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    try {
      const { data, error } = await supabase
        .from('role_permissions')
        .select('*')
        .order('role')
        .order('permission_key');

      if (error) throw error;

      setPermissions((data || []) as RolePermission[]);
    } catch (error) {
      console.error('Error fetching permissions:', error);
      toast({
        title: 'Error',
        description: 'Failed to load permissions',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const togglePermission = async (role: AppRole, permissionKey: string, currentEnabled: boolean) => {
    const permId = `${role}-${permissionKey}`;
    setUpdating(permId);

    try {
      // Check if permission exists
      const existingPerm = permissions.find(
        p => p.role === role && p.permission_key === permissionKey
      );

      if (existingPerm) {
        // Update existing
        const { error } = await supabase
          .from('role_permissions')
          .update({ enabled: !currentEnabled })
          .eq('id', existingPerm.id);

        if (error) throw error;
      } else {
        // Insert new
        const permType = FEATURE_PERMISSIONS.includes(permissionKey as PermissionKey) ? 'feature' : 'action';
        const { error } = await supabase
          .from('role_permissions')
          .insert({
            role: role,
            permission_key: permissionKey,
            permission_type: permType,
            enabled: true,
          });

        if (error) throw error;
      }

      toast({
        title: 'Permission Updated',
        description: `${PERMISSION_LABELS[permissionKey as PermissionKey]} has been ${!currentEnabled ? 'enabled' : 'disabled'} for ${ROLE_LABELS[role]}`,
      });

      await fetchPermissions();
    } catch (error) {
      console.error('Error updating permission:', error);
      toast({
        title: 'Error',
        description: 'Failed to update permission',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  };

  const isPermissionEnabled = (role: AppRole, permissionKey: string): boolean => {
    const perm = permissions.find(
      p => p.role === role && p.permission_key === permissionKey
    );
    return perm?.enabled ?? false;
  };

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Role Permissions
        </CardTitle>
        <CardDescription className="text-white/70">
          Configure what each staff role can access and do. Admin always has full access.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedRole} onValueChange={(v) => setSelectedRole(v as AppRole)}>
          <TabsList className="flex flex-wrap gap-1 w-full bg-white/10 h-auto p-2 mb-6">
            {staffRoles.map((role) => (
              <TabsTrigger
                key={role}
                value={role}
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {ROLE_LABELS[role].split(' ')[0]}
              </TabsTrigger>
            ))}
          </TabsList>

          {staffRoles.map((role) => (
            <TabsContent key={role} value={role} className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4 mb-4">
                <h3 className="text-white font-medium">{ROLE_LABELS[role]}</h3>
                <p className="text-white/60 text-sm">{ROLE_DESCRIPTIONS[role]}</p>
              </div>

              {/* Feature Permissions */}
              <div>
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Feature Access
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FEATURE_PERMISSIONS.map((permKey) => {
                    const isEnabled = isPermissionEnabled(role, permKey);
                    const isUpdating = updating === `${role}-${permKey}`;
                    
                    return (
                      <div
                        key={permKey}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <span className="text-white/80 text-sm">
                          {PERMISSION_LABELS[permKey]}
                        </span>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => togglePermission(role, permKey, isEnabled)}
                          disabled={isUpdating}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Permissions */}
              <div>
                <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                  <Settings2 className="h-4 w-4" />
                  Action Permissions
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {ACTION_PERMISSIONS.map((permKey) => {
                    const isEnabled = isPermissionEnabled(role, permKey);
                    const isUpdating = updating === `${role}-${permKey}`;
                    
                    return (
                      <div
                        key={permKey}
                        className="flex items-center justify-between bg-white/5 rounded-lg p-3"
                      >
                        <span className="text-white/80 text-sm">
                          {PERMISSION_LABELS[permKey]}
                        </span>
                        <Switch
                          checked={isEnabled}
                          onCheckedChange={() => togglePermission(role, permKey, isEnabled)}
                          disabled={isUpdating}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default RolePermissionsTab;

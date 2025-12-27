import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Users, Shield, UserCog, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

type AppRole = 'admin' | 'employee' | 'client';

interface UserWithRole {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  created_at: string;
  roles: AppRole[];
}

const UserManagementTab = () => {
  const { user: currentUser } = useAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Fetch all profiles
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      // Fetch all roles
      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');

      if (rolesError) throw rolesError;

      // Map profiles with their roles
      const usersWithRoles: UserWithRole[] = (profiles || []).map(profile => ({
        id: profile.id,
        user_id: profile.user_id,
        email: profile.email,
        full_name: profile.full_name,
        created_at: profile.created_at,
        roles: (roles || [])
          .filter(r => r.user_id === profile.user_id)
          .map(r => r.role as AppRole),
      }));

      setUsers(usersWithRoles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: AppRole) => {
    if (!userId) return;
    
    setUpdating(userId);
    try {
      // First, delete existing roles for this user
      const { error: deleteError } = await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      // Then insert the new role
      const { error: insertError } = await supabase
        .from('user_roles')
        .insert({ user_id: userId, role: newRole });

      if (insertError) throw insertError;

      toast({
        title: 'Role Updated',
        description: `User role has been updated to ${newRole}`,
      });

      // Refresh the list
      await fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Error',
        description: 'Failed to update user role',
        variant: 'destructive',
      });
    } finally {
      setUpdating(null);
    }
  };

  const getRoleBadgeVariant = (role: AppRole) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'employee':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getRoleIcon = (role: AppRole) => {
    switch (role) {
      case 'admin':
        return <Shield className="h-3 w-3" />;
      case 'employee':
        return <UserCog className="h-3 w-3" />;
      default:
        return <UserCheck className="h-3 w-3" />;
    }
  };

  const getCurrentRole = (roles: AppRole[]): AppRole => {
    if (roles.includes('admin')) return 'admin';
    if (roles.includes('employee')) return 'employee';
    return 'client';
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
          <Users className="h-5 w-5" />
          User Management
        </CardTitle>
        <CardDescription className="text-white/70">
          Manage user roles and permissions. Admins have full access, employees can manage bookings and clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-white/20">
              <TableHead className="text-white/80">User</TableHead>
              <TableHead className="text-white/80">Email</TableHead>
              <TableHead className="text-white/80">Current Role</TableHead>
              <TableHead className="text-white/80">Joined</TableHead>
              <TableHead className="text-white/80">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => {
              const currentRole = getCurrentRole(user.roles);
              const isCurrentUser = user.user_id === currentUser?.id;
              
              return (
                <TableRow key={user.id} className="border-white/10">
                  <TableCell className="text-white font-medium">
                    {user.full_name || 'No name'}
                    {isCurrentUser && (
                      <Badge variant="outline" className="ml-2 text-xs border-white/30 text-white/70">
                        You
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-white/80">{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={getRoleBadgeVariant(currentRole)} className="flex items-center gap-1 w-fit">
                      {getRoleIcon(currentRole)}
                      {currentRole.charAt(0).toUpperCase() + currentRole.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white/60">
                    {new Date(user.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={currentRole}
                      onValueChange={(value: AppRole) => updateUserRole(user.user_id, value)}
                      disabled={isCurrentUser || updating === user.user_id}
                    >
                      <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {users.length === 0 && (
          <div className="text-center py-8 text-white/60">
            No users found
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UserManagementTab;

"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { User, Building, Save, Lock, Bell, Mail, Shield, Clock, Users, Key } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useUserRole } from '@/hooks/useUserRole';
import ApiKeysTab from './ApiKeysTab';
import UserManagementTab from './UserManagementTab';
import RolePermissionsTab from './RolePermissionsTab';

interface Profile {
  id: string;
  user_id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  user_type: string;
  created_at: string;
  updated_at: string;
}

interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  description: string;
  website: string;
  vatNumber: string;
  companyNumber: string;
}

interface NotificationSettings {
  emailNewBookings: boolean;
  emailCancellations: boolean;
  emailEnquiries: boolean;
  emailReminders: boolean;
  smsReminders: boolean;
}

interface SettingsTabProps {
  profile: Profile;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

const SettingsTab = ({ profile, onProfileUpdate }: SettingsTabProps) => {
  const { isAdmin, isStaff, roles } = useUserRole();
  const [userInfo, setUserInfo] = useState({
    full_name: profile.full_name || '',
    phone: profile.phone || '',
    email: profile.email || ''
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    name: 'DP Auto Repair & Diagnostics',
    address: 'Unit 5 Vanguard Trading Estate, Chesterfield, S40 2TZ',
    phone: '01246 233483',
    email: 'hello@dpautorepair.co.uk',
    description: 'Professional automotive repair and diagnostics in Chesterfield. ASE certified technicians with 15+ years experience.',
    website: 'https://dpautorepair.co.uk',
    vatNumber: '',
    companyNumber: ''
  });

  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNewBookings: true,
    emailCancellations: true,
    emailEnquiries: true,
    emailReminders: true,
    smsReminders: false
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load business info from localStorage if available
    const savedBusinessInfo = localStorage.getItem('businessInfo');
    if (savedBusinessInfo) {
      try {
        setBusinessInfo(prev => ({ ...prev, ...JSON.parse(savedBusinessInfo) }));
      } catch (error) {
        console.error('Error loading business info:', error);
      }
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      try {
        setNotifications(JSON.parse(savedNotifications));
      } catch (error) {
        console.error('Error loading notification settings:', error);
      }
    }
  }, []);

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: keyof NotificationSettings, value: boolean) => {
    setNotifications(prev => ({ ...prev, [field]: value }));
  };

  const saveUserInfo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({
          full_name: userInfo.full_name || null,
          phone: userInfo.phone || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', profile.id)
        .select()
        .single();

      if (error) throw error;

      if (data) {
        onProfileUpdate(data);
        toast({
          title: "Success",
          description: "Your profile has been updated successfully."
        });
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const saveBusinessInfo = () => {
    try {
      localStorage.setItem('businessInfo', JSON.stringify(businessInfo));
      toast({
        title: "Success",
        description: "Business information has been saved successfully."
      });
    } catch (error) {
      console.error('Error saving business info:', error);
      toast({
        title: "Error",
        description: "Failed to save business information.",
        variant: "destructive"
      });
    }
  };

  const saveNotifications = () => {
    try {
      localStorage.setItem('notificationSettings', JSON.stringify(notifications));
      toast({
        title: "Success",
        description: "Notification preferences saved."
      });
    } catch (error) {
      console.error('Error saving notifications:', error);
      toast({
        title: "Error",
        description: "Failed to save notification preferences.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(profile.email, {
        redirectTo: `${window.location.origin}/auth?reset=true`
      });
      
      if (error) throw error;
      
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for a password reset link."
      });
    } catch (error: any) {
      console.error('Error sending reset email:', error);
      toast({
        title: "Error",
        description: "Failed to send password reset email.",
        variant: "destructive"
      });
    }
  };

  const getRoleDisplayName = () => {
    if (roles.includes('admin')) return 'Super Admin';
    if (roles.includes('employee')) return 'Staff Member';
    return 'Client';
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white/20 backdrop-blur-md border-white/30">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Settings
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage your account, business information, and preferences
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="flex flex-wrap gap-1 bg-white/10 border-white/20 h-auto p-1">
              <TabsTrigger value="profile" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                <User className="h-4 w-4 mr-2" />
                Profile
              </TabsTrigger>
              {isStaff && (
                <TabsTrigger value="business" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                  <Building className="h-4 w-4 mr-2" />
                  Business
                </TabsTrigger>
              )}
              <TabsTrigger value="notifications" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                <Lock className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              {isAdmin && (
                <TabsTrigger value="users" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                  <Users className="h-4 w-4 mr-2" />
                  Users
                </TabsTrigger>
              )}
              {isAdmin && (
                <TabsTrigger value="permissions" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                  <Shield className="h-4 w-4 mr-2" />
                  Permissions
                </TabsTrigger>
              )}
              {isAdmin && (
                <TabsTrigger value="api-keys" className="text-white/80 data-[state=active]:bg-white/20 data-[state=active]:text-white px-3 py-2">
                  <Key className="h-4 w-4 mr-2" />
                  API Keys
                </TabsTrigger>
              )}
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name" className="text-white">Full Name</Label>
                  <Input
                    id="full_name"
                    value={userInfo.full_name}
                    onChange={(e) => handleUserInfoChange('full_name', e.target.value)}
                    placeholder="Enter your full name"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => handleUserInfoChange('phone', e.target.value)}
                    placeholder="Enter your phone number"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email Address</Label>
                <Input
                  id="email"
                  value={userInfo.email}
                  disabled
                  className="bg-white/10 border-white/20 text-white/70 cursor-not-allowed"
                />
                <p className="text-sm text-white/60">
                  Email cannot be changed. Contact support if you need to update your email.
                </p>
              </div>

              <div className="p-4 bg-white/10 rounded-lg border border-white/20">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-white font-medium">Account Role</p>
                    <p className="text-white/70 text-sm">{getRoleDisplayName()}</p>
                  </div>
                </div>
              </div>

              <Button 
                onClick={saveUserInfo} 
                disabled={loading}
                className="gradient-primary shadow-glow"
              >
                <Save className="h-4 w-4 mr-2" />
                {loading ? 'Saving...' : 'Save Profile'}
              </Button>
            </TabsContent>

            {/* Business Tab - Only for Staff */}
            {isStaff && (
              <TabsContent value="business" className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_name" className="text-white">Business Name</Label>
                    <Input
                      id="business_name"
                      value={businessInfo.name}
                      onChange={(e) => handleBusinessInfoChange('name', e.target.value)}
                      placeholder="Enter business name"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_phone" className="text-white">Business Phone</Label>
                    <Input
                      id="business_phone"
                      value={businessInfo.phone}
                      onChange={(e) => handleBusinessInfoChange('phone', e.target.value)}
                      placeholder="Enter business phone"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="business_email" className="text-white">Business Email</Label>
                    <Input
                      id="business_email"
                      value={businessInfo.email}
                      onChange={(e) => handleBusinessInfoChange('email', e.target.value)}
                      placeholder="Enter business email"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="business_website" className="text-white">Website</Label>
                    <Input
                      id="business_website"
                      value={businessInfo.website}
                      onChange={(e) => handleBusinessInfoChange('website', e.target.value)}
                      placeholder="Enter website URL"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vat_number" className="text-white">VAT Number</Label>
                    <Input
                      id="vat_number"
                      value={businessInfo.vatNumber}
                      onChange={(e) => handleBusinessInfoChange('vatNumber', e.target.value)}
                      placeholder="GB123456789"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company_number" className="text-white">Company Number</Label>
                    <Input
                      id="company_number"
                      value={businessInfo.companyNumber}
                      onChange={(e) => handleBusinessInfoChange('companyNumber', e.target.value)}
                      placeholder="12345678"
                      className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_address" className="text-white">Business Address</Label>
                  <Textarea
                    id="business_address"
                    value={businessInfo.address}
                    onChange={(e) => handleBusinessInfoChange('address', e.target.value)}
                    placeholder="Enter business address"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="business_description" className="text-white">Business Description</Label>
                  <Textarea
                    id="business_description"
                    value={businessInfo.description}
                    onChange={(e) => handleBusinessInfoChange('description', e.target.value)}
                    placeholder="Enter business description"
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60"
                    rows={4}
                  />
                </div>

                <Button 
                  onClick={saveBusinessInfo}
                  className="gradient-primary shadow-glow"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Business Info
                </Button>
              </TabsContent>
            )}

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="mt-6 space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Email Notifications
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <p className="text-white font-medium">New Booking Alerts</p>
                      <p className="text-sm text-white/60">Get notified when a new booking is made</p>
                    </div>
                    <Switch
                      checked={notifications.emailNewBookings}
                      onCheckedChange={(checked) => handleNotificationChange('emailNewBookings', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <p className="text-white font-medium">Cancellation Alerts</p>
                      <p className="text-sm text-white/60">Get notified when a booking is cancelled</p>
                    </div>
                    <Switch
                      checked={notifications.emailCancellations}
                      onCheckedChange={(checked) => handleNotificationChange('emailCancellations', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <p className="text-white font-medium">Enquiry Notifications</p>
                      <p className="text-sm text-white/60">Get notified when a new enquiry is submitted</p>
                    </div>
                    <Switch
                      checked={notifications.emailEnquiries}
                      onCheckedChange={(checked) => handleNotificationChange('emailEnquiries', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                    <div>
                      <p className="text-white font-medium">Appointment Reminders</p>
                      <p className="text-sm text-white/60">Receive reminders about upcoming appointments</p>
                    </div>
                    <Switch
                      checked={notifications.emailReminders}
                      onCheckedChange={(checked) => handleNotificationChange('emailReminders', checked)}
                    />
                  </div>
                </div>

                <h3 className="text-lg font-medium text-white flex items-center gap-2 pt-4">
                  <Bell className="h-5 w-5" />
                  SMS Notifications
                </h3>
                
                <div className="flex items-center justify-between p-3 bg-white/10 rounded-lg border border-white/20">
                  <div>
                    <p className="text-white font-medium">SMS Reminders</p>
                    <p className="text-sm text-white/60">Receive SMS reminders for appointments</p>
                  </div>
                  <Switch
                    checked={notifications.smsReminders}
                    onCheckedChange={(checked) => handleNotificationChange('smsReminders', checked)}
                  />
                </div>

                <Button 
                  onClick={saveNotifications}
                  className="gradient-primary shadow-glow"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Notification Preferences
                </Button>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="mt-6 space-y-4">
              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <Lock className="h-4 w-4" />
                  Password Management
                </h4>
                <p className="text-sm text-white/70 mb-4">
                  Click the button below to receive a password reset link via email.
                </p>
                <Button 
                  variant="outline" 
                  onClick={handlePasswordReset}
                  className="bg-white/10 text-white border-white/30 hover:bg-white/20"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Password Reset Email
                </Button>
              </div>

              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Account Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-white/70">Account Role:</span>
                    <span className="text-white font-medium">{getRoleDisplayName()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Account Created:</span>
                    <span className="text-white">{new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/70">Last Updated:</span>
                    <span className="text-white">{new Date(profile.updated_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
                <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Session Information
                </h4>
                <p className="text-sm text-white/70">
                  Your session is active. You'll be automatically signed out after a period of inactivity.
                </p>
              </div>
            </TabsContent>

            {/* Users Tab - Admin Only */}
            {isAdmin && (
              <TabsContent value="users" className="mt-6">
                <UserManagementTab />
              </TabsContent>
            )}

            {/* Permissions Tab - Admin Only */}
            {isAdmin && (
              <TabsContent value="permissions" className="mt-6">
                <RolePermissionsTab />
              </TabsContent>
            )}

            {/* API Keys Tab - Admin Only */}
            {isAdmin && (
              <TabsContent value="api-keys" className="mt-6">
                <ApiKeysTab />
              </TabsContent>
            )}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;

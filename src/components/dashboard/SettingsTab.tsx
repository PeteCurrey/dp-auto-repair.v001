import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { User, Building, Save, Lock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

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
}

interface SettingsTabProps {
  profile: Profile;
  onProfileUpdate: (updatedProfile: Profile) => void;
}

const SettingsTab = ({ profile, onProfileUpdate }: SettingsTabProps) => {
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
    website: 'https://dpautorepair.co.uk'
  });

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Load business info from localStorage if available
    const savedBusinessInfo = localStorage.getItem('businessInfo');
    if (savedBusinessInfo) {
      try {
        setBusinessInfo(JSON.parse(savedBusinessInfo));
      } catch (error) {
        console.error('Error loading business info:', error);
      }
    }
  }, []);

  const handleUserInfoChange = (field: string, value: string) => {
    setUserInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleBusinessInfoChange = (field: string, value: string) => {
    setBusinessInfo(prev => ({ ...prev, [field]: value }));
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

  return (
    <div className="space-y-6">
      {/* User Profile Settings */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <User className="h-5 w-5" />
            User Profile
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage your personal account information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <div className="flex items-center gap-2 pt-4">
            <Button 
              onClick={saveUserInfo} 
              disabled={loading}
              className="gradient-primary shadow-glow"
            >
              <Save className="h-4 w-4 mr-2" />
              {loading ? 'Saving...' : 'Save Profile'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Business Information */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Building className="h-5 w-5" />
            Business Information
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage your business details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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

          <div className="flex items-center gap-2 pt-4">
            <Button 
              onClick={saveBusinessInfo}
              className="gradient-primary shadow-glow"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Business Info
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Security Settings */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Lock className="h-5 w-5" />
            Security Settings
          </CardTitle>
          <CardDescription className="text-white/80">
            Manage your account security and authentication
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
            <h4 className="font-medium text-white mb-2">Password Management</h4>
            <p className="text-sm text-white/70 mb-4">
              To change your password, you'll need to use the password reset feature.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                // This would typically trigger a password reset email
                toast({
                  title: "Password Reset",
                  description: "Password reset functionality will be implemented in the next phase.",
                });
              }}
              className="bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              <Lock className="h-4 w-4 mr-2" />
              Reset Password
            </Button>
          </div>

          <div className="p-4 bg-white/10 border border-white/20 rounded-lg">
            <h4 className="font-medium text-white mb-2">Account Type</h4>
            <p className="text-sm text-white/70 mb-2">
              Current role: <span className="font-medium capitalize">{profile.user_type}</span>
            </p>
            <p className="text-sm text-white/60">
              Contact an administrator to change your account permissions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsTab;
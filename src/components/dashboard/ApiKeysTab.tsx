import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Key, Eye, EyeOff, Save, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ApiKey {
  name: string;
  description: string;
  envVar: string;
  value: string;
  isSet: boolean;
  masked: boolean;
}

const API_KEYS_CONFIG = [
  {
    name: 'Resend API Key',
    description: 'For sending booking confirmation and reminder emails',
    envVar: 'RESEND_API_KEY',
  },
  {
    name: 'Twilio Account SID',
    description: 'For sending SMS appointment reminders',
    envVar: 'TWILIO_ACCOUNT_SID',
  },
  {
    name: 'Twilio Auth Token',
    description: 'Authentication token for Twilio SMS service',
    envVar: 'TWILIO_AUTH_TOKEN',
  },
  {
    name: 'Twilio Phone Number',
    description: 'Your Twilio phone number for sending SMS (format: +44...)',
    envVar: 'TWILIO_PHONE_NUMBER',
  },
  {
    name: 'DVLA API Key',
    description: 'For vehicle registration lookups',
    envVar: 'DVLA_API_KEY',
  },
];

const ApiKeysTab = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [showValues, setShowValues] = useState<Record<string, boolean>>({});
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchApiKeys();
  }, []);

  const fetchApiKeys = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_key, setting_value')
        .eq('is_secret', true);

      if (error) throw error;

      const savedKeys: Record<string, string> = {};
      data?.forEach(row => {
        savedKeys[row.setting_key] = row.setting_value || '';
      });

      const initialKeys = API_KEYS_CONFIG.map(config => ({
        ...config,
        value: savedKeys[config.envVar] || '',
        isSet: !!savedKeys[config.envVar],
        masked: true,
      }));

      setApiKeys(initialKeys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      // Fallback to localStorage if not authorized
      const savedKeys = localStorage.getItem('admin_api_keys');
      const parsedKeys = savedKeys ? JSON.parse(savedKeys) : {};
      
      const initialKeys = API_KEYS_CONFIG.map(config => ({
        ...config,
        value: parsedKeys[config.envVar] || '',
        isSet: !!parsedKeys[config.envVar],
        masked: true,
      }));
      
      setApiKeys(initialKeys);
    } finally {
      setIsLoading(false);
    }
  };

  const handleValueChange = (envVar: string, value: string) => {
    setApiKeys(prev => prev.map(key => 
      key.envVar === envVar ? { ...key, value, isSet: !!value } : key
    ));
    setHasChanges(true);
  };

  const toggleShowValue = (envVar: string) => {
    setShowValues(prev => ({ ...prev, [envVar]: !prev[envVar] }));
  };

  const saveApiKeys = async () => {
    setIsSaving(true);
    try {
      // Save to database
      for (const key of apiKeys) {
        if (key.value) {
          const { error } = await supabase
            .from('admin_settings')
            .upsert({
              setting_key: key.envVar,
              setting_value: key.value,
              is_secret: true,
              description: key.description
            }, {
              onConflict: 'setting_key'
            });

          if (error) throw error;
        }
      }

      // Also save to localStorage as backup
      const keysToSave = apiKeys.reduce((acc, key) => {
        if (key.value) {
          acc[key.envVar] = key.value;
        }
        return acc;
      }, {} as Record<string, string>);
      
      localStorage.setItem('admin_api_keys', JSON.stringify(keysToSave));
      setHasChanges(false);
      
      toast({
        title: "API Keys Saved",
        description: "Your API keys have been saved securely to the database.",
      });
    } catch (error: any) {
      console.error('Error saving API keys:', error);
      
      // Fallback to localStorage only
      const keysToSave = apiKeys.reduce((acc, key) => {
        if (key.value) {
          acc[key.envVar] = key.value;
        }
        return acc;
      }, {} as Record<string, string>);
      
      localStorage.setItem('admin_api_keys', JSON.stringify(keysToSave));
      setHasChanges(false);
      
      toast({
        title: "API Keys Saved Locally",
        description: "Keys saved to browser storage. For production use, configure in Lovable Cloud secrets.",
        variant: "default",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (isSet: boolean) => {
    if (isSet) {
      return (
        <Badge variant="outline" className="bg-green-500/20 text-green-300 border-green-500/30">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          Configured
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">
        <AlertCircle className="h-3 w-3 mr-1" />
        Not Set
      </Badge>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Key className="h-5 w-5" />
            API Keys & Secrets
          </CardTitle>
          <CardDescription className="text-white/80">
            Configure third-party API keys for email notifications, SMS reminders, and vehicle lookups.
            These keys are stored securely in the database and used by backend functions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-300 mt-0.5" />
              <div>
                <h4 className="font-medium text-amber-200">Security Notice</h4>
                <p className="text-sm text-amber-200/80 mt-1">
                  API keys are sensitive credentials. Never share them publicly. For production use, 
                  these keys should also be configured in Lovable Cloud secrets via the backend panel.
                </p>
              </div>
            </div>
          </div>

          {apiKeys.map((key) => (
            <div key={key.envVar} className="space-y-2 p-4 bg-white/10 rounded-lg border border-white/20">
              <div className="flex items-center justify-between">
                <Label htmlFor={key.envVar} className="text-white font-medium">
                  {key.name}
                </Label>
                {getStatusBadge(key.isSet)}
              </div>
              <p className="text-sm text-white/60 mb-2">{key.description}</p>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id={key.envVar}
                    type={showValues[key.envVar] ? 'text' : 'password'}
                    value={key.value}
                    onChange={(e) => handleValueChange(key.envVar, e.target.value)}
                    placeholder={`Enter ${key.name}...`}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/40 pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-white/60 hover:text-white hover:bg-white/10"
                    onClick={() => toggleShowValue(key.envVar)}
                  >
                    {showValues[key.envVar] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-white/40 mt-1">
                Environment variable: <code className="bg-white/10 px-1 rounded">{key.envVar}</code>
              </p>
            </div>
          ))}

          <div className="flex items-center gap-4 pt-4">
            <Button 
              onClick={saveApiKeys}
              disabled={!hasChanges || isSaving}
              className="gradient-primary shadow-glow"
            >
              {isSaving ? (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Save className="h-4 w-4 mr-2" />
              )}
              Save API Keys
            </Button>
            {hasChanges && (
              <span className="text-sm text-amber-300">You have unsaved changes</span>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Setup Instructions */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="text-white">Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-white">Resend (Email Notifications)</h4>
            <ol className="list-decimal list-inside text-sm text-white/70 space-y-1">
              <li>Sign up at <a href="https://resend.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">resend.com</a></li>
              <li>Verify your domain at resend.com/domains</li>
              <li>Create an API key at resend.com/api-keys</li>
              <li>Paste the key above</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-white">Twilio (SMS Reminders)</h4>
            <ol className="list-decimal list-inside text-sm text-white/70 space-y-1">
              <li>Sign up at <a href="https://twilio.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">twilio.com</a></li>
              <li>Get your Account SID and Auth Token from the Console</li>
              <li>Purchase or verify a phone number</li>
              <li>Enter all three values above</li>
            </ol>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-white">DVLA (Vehicle Lookups)</h4>
            <ol className="list-decimal list-inside text-sm text-white/70 space-y-1">
              <li>Apply for API access at <a href="https://dvla.gov.uk" target="_blank" rel="noopener noreferrer" className="text-primary underline">DVLA API services</a></li>
              <li>Once approved, obtain your API key</li>
              <li>Enter the key above</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeysTab;
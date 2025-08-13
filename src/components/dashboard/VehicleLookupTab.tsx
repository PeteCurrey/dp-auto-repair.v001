import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Car, Calendar, AlertTriangle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  fuelType: string;
  motStatus: string;
  motExpiryDate: string;
  taxStatus: string;
  taxExpiryDate: string;
}

interface SearchHistoryItem {
  registration: string;
  vehicleData?: VehicleInfo | null;
  timestamp: number;
}

interface VehicleLookupTabProps {
  initialRegistration?: string;
}

const VehicleLookupTab = ({ initialRegistration = '' }: VehicleLookupTabProps) => {
  const [registration, setRegistration] = useState(initialRegistration);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    loadSearchHistory();
    if (initialRegistration) {
      handleSearch();
    }
  }, [initialRegistration]);

  const loadSearchHistory = () => {
    const saved = localStorage.getItem('vehicleSearchHistory');
    if (saved) {
      try {
        setSearchHistory(JSON.parse(saved));
      } catch (error) {
        console.error('Error loading search history:', error);
      }
    }
  };

  const saveSearchHistory = (newHistory: SearchHistoryItem[]) => {
    localStorage.setItem('vehicleSearchHistory', JSON.stringify(newHistory));
    setSearchHistory(newHistory);
  };

  const deleteSearchHistoryItem = (indexToDelete: number) => {
    const updatedHistory = searchHistory.filter((_, index) => index !== indexToDelete);
    saveSearchHistory(updatedHistory);
    toast({
      title: "Search Deleted",
      description: "Search entry has been removed from history.",
    });
  };

  const clearSearchHistory = () => {
    localStorage.removeItem('vehicleSearchHistory');
    setSearchHistory([]);
    toast({
      title: "Search History Cleared",
      description: "All previous searches have been removed.",
    });
  };

  const validateRegistration = (reg: string): boolean => {
    const cleaned = reg.replace(/\s/g, '').toUpperCase();
    const ukRegPattern = /^[A-Z]{1,3}\d{1,4}[A-Z]{1,3}$|^[A-Z]\d{1,3}[A-Z]{3}$|^[A-Z]{2}\d{2}[A-Z]{3}$/;
    return ukRegPattern.test(cleaned) && cleaned.length >= 4 && cleaned.length <= 8;
  };

  const lookupVehicle = async (reg: string): Promise<VehicleInfo | null> => {
    const { data, error } = await supabase.functions.invoke('dvla-lookup', {
      body: { registrationNumber: reg }
    });

    if (error) {
      console.error('DVLA lookup error:', error);
      throw new Error(error.message || 'Failed to lookup vehicle');
    }

    if (!data || data.error) {
      const errorType = data?.errorType || 'UNKNOWN_ERROR';
      
      switch (errorType) {
        case 'VEHICLE_NOT_FOUND':
          throw new Error('Vehicle not found. Please check the registration number.');
        case 'RATE_LIMITED':
          throw new Error('Too many requests. Please wait a moment and try again.');
        case 'ACCESS_DENIED':
          throw new Error('Access denied. Please contact support.');
        case 'SERVICE_ERROR':
          throw new Error('DVLA service temporarily unavailable. Please try again later.');
        default:
          throw new Error(data?.error || 'Failed to lookup vehicle information');
      }
    }

    return data;
  };

  const handleSearch = async () => {
    if (!registration.trim()) {
      toast({
        title: "Invalid Registration",
        description: "Please enter a registration number.",
        variant: "destructive"
      });
      return;
    }

    const cleanedReg = registration.trim().toUpperCase();

    if (!validateRegistration(cleanedReg)) {
      toast({
        title: "Invalid Registration Format",
        description: "Please enter a valid UK registration number (e.g., AB12 CDE, A123 BCD, AB12CDE).",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setVehicleInfo(null);

    try {
      const result = await lookupVehicle(cleanedReg);
      setVehicleInfo(result);

      // Add to search history
      const newHistoryItem: SearchHistoryItem = {
        registration: cleanedReg,
        vehicleData: result,
        timestamp: Date.now()
      };

      const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)];
      saveSearchHistory(updatedHistory);

      toast({
        title: "Vehicle Found",
        description: `Successfully retrieved information for ${cleanedReg}`,
      });
    } catch (error: any) {
      console.error('Vehicle lookup error:', error);
      toast({
        title: "Lookup Failed",
        description: error.message || "Failed to lookup vehicle information",
        variant: "destructive"
      });

      // Still add to history even if failed
      const newHistoryItem: SearchHistoryItem = {
        registration: cleanedReg,
        vehicleData: null,
        timestamp: Date.now()
      };

      const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)];
      saveSearchHistory(updatedHistory);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getMotStatusColor = (status: string) => {
    const normalizedStatus = status?.toLowerCase() || '';
    if (normalizedStatus.includes('valid') || normalizedStatus.includes('current')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    if (normalizedStatus.includes('expired') || normalizedStatus.includes('overdue')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    if (normalizedStatus.includes('due') || normalizedStatus.includes('soon')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const isMotDueSoon = (expiryDate: string) => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30 && diffDays >= 0;
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Car className="h-5 w-5" />
            Vehicle Lookup
          </CardTitle>
          <CardDescription className="text-white/80">
            Enter a UK registration number to retrieve vehicle information and MOT status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Input
              placeholder="Enter registration (e.g., AB12 CDE, AB12CDE, A123 BCD)"
              value={registration}
              onChange={(e) => setRegistration(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60"
            />
            <Button onClick={handleSearch} disabled={loading} className="gradient-primary shadow-glow">
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Information */}
      {vehicleInfo && (
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader>
            <CardTitle className="text-white">Vehicle Information</CardTitle>
            <CardDescription className="text-white/80">Registration: {registration}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <span className="text-white/70">Make & Model:</span>
                <p className="font-medium text-white">{vehicleInfo.make} {vehicleInfo.model}</p>
              </div>
              <div>
                <span className="text-white/70">Year:</span>
                <p className="font-medium text-white">{vehicleInfo.year}</p>
              </div>
              <div>
                <span className="text-white/70">Fuel Type:</span>
                <p className="font-medium text-white">{vehicleInfo.fuelType}</p>
              </div>
              <div>
                <span className="text-white/70">MOT Status:</span>
                <p className="font-medium text-white">{vehicleInfo.motStatus?.replace('_', ' ') || 'Unknown'}</p>
              </div>
              <div>
                <span className="text-white/70">Tax Status:</span>
                <p className="font-medium text-white">{vehicleInfo.taxStatus}</p>
              </div>
            </div>

            <Separator />

            {/* MOT Information */}
            <div className="space-y-3">
              <h4 className="font-medium text-white">MOT Information</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge className={getMotStatusColor(vehicleInfo.motStatus)}>
                  {vehicleInfo.motStatus?.replace('_', ' ') || 'Unknown'}
                </Badge>
                {vehicleInfo.motExpiryDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-white/70" />
                    <span className="text-sm text-white/80">
                      Expires: {new Date(vehicleInfo.motExpiryDate).toLocaleDateString()}
                    </span>
                    {isMotDueSoon(vehicleInfo.motExpiryDate) && (
                      <Badge variant="destructive" className="ml-2">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Due Soon
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Tax Information */}
            {vehicleInfo.taxExpiryDate && (
              <div className="space-y-3">
                <h4 className="font-medium text-white">Tax Information</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-white/70" />
                  <span className="text-sm text-white/80">
                    Tax expires: {new Date(vehicleInfo.taxExpiryDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white">Recent Searches</CardTitle>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={clearSearchHistory}
                className="text-destructive hover:text-destructive bg-white/10 border-white/30 hover:bg-white/20"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>
          </CardHeader>
          <CardContent>
              <div className="space-y-2">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border border-white/30 hover:bg-white/10"
                  >
                    <div 
                      className="flex items-center gap-3 flex-1 cursor-pointer"
                      onClick={() => {
                        setRegistration(item.registration);
                        if (item.vehicleData) {
                          setVehicleInfo(item.vehicleData);
                        }
                      }}
                    >
                      <Car className="h-4 w-4 text-white/70" />
                      <div>
                        <p className="font-medium text-white">{item.registration}</p>
                        {item.vehicleData && (
                          <p className="text-sm text-white/70">
                            {item.vehicleData.make} {item.vehicleData.model} ({item.vehicleData.year})
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/60">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRegistration(item.registration);
                          if (item.vehicleData) {
                            setVehicleInfo(item.vehicleData);
                          }
                        }}
                        className="text-white hover:bg-white/20"
                      >
                        Use
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteSearchHistoryItem(index)}
                        className="text-red-300 hover:bg-red-500/20 hover:text-red-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default VehicleLookupTab;
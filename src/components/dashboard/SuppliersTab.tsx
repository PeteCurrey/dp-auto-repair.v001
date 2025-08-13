import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, ExternalLink, Car, Clock, Bookmark, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { logEvent } from '@/lib/analytics';
import { supabase } from '@/integrations/supabase/client';

interface VehicleInfo {
  make: string;
  model: string;
  year: number;
  fuelType: string;
  engineCapacity: number;
  colour: string;
  motStatus: 'valid' | 'due_soon' | 'expired';
  motExpiryDate: string;
  taxStatus: string;
}

interface SearchHistory {
  registration: string;
  vehicle?: VehicleInfo;
  timestamp: Date;
}

interface SupplierLink {
  name: string;
  url: string;
  icon: string;
  description: string;
}

const suppliers: SupplierLink[] = [
  {
    name: 'Euro Car Parts',
    url: 'https://www.eurocarparts.com/search?registration=',
    icon: '🔧',
    description: 'Wide range of car parts and accessories'
  },
  {
    name: 'GSF Car Parts',
    url: 'https://www.gsfcarparts.com/catalogue/parts/',
    icon: '⚙️',
    description: 'Motor factors with competitive prices'
  },
  {
    name: 'Car Parts 4 Less',
    url: 'https://www.carparts4less.co.uk/search?registration=',
    icon: '💰',
    description: 'Discount car parts online'
  },
  {
    name: 'Motor Factors',
    url: 'https://www.motorfactors.co.uk/search?reg=',
    icon: '🚗',
    description: 'Professional automotive parts supplier'
  }
];

const SuppliersTab = ({ profile }: { profile: { id: string } }) => {
  const [registration, setRegistration] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [vehicleInfo, setVehicleInfo] = useState<VehicleInfo | null>(null);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load search history and bookmarks from localStorage
    const savedHistory = localStorage.getItem('supplier-search-history');
    const savedBookmarks = localStorage.getItem('supplier-bookmarks');
    
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const historyWithDates = parsedHistory.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp)
        }));
        setSearchHistory(historyWithDates);
      } catch (e) {
        console.error('Failed to parse search history');
      }
    }
    
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (e) {
        console.error('Failed to parse bookmarks');
      }
    }
  }, []);

  const validateRegistration = (reg: string): boolean => {
    // Basic UK registration validation
    const ukRegex = /^[A-Z]{2}[0-9]{2}\s?[A-Z]{3}$|^[A-Z][0-9]{1,3}\s?[A-Z]{3}$|^[A-Z]{3}\s?[0-9]{1,3}[A-Z]$/;
    return ukRegex.test(reg.toUpperCase().replace(/\s/g, ''));
  };

  const lookupVehicle = async (reg: string): Promise<VehicleInfo | null> => {
    setIsSearching(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('dvla-lookup', {
        body: { registrationNumber: reg }
      });

      if (error) {
        console.error('DVLA lookup error:', error);
        throw new Error(error.message || 'Failed to lookup vehicle');
      }

      setIsSearching(false);
      return data;
    } catch (error) {
      setIsSearching(false);
      throw error;
    }
  };

  const handleSearch = async () => {
    if (!registration.trim()) {
      toast({
        title: "Missing Registration",
        description: "Please enter a vehicle registration number.",
        variant: "destructive"
      });
      return;
    }

    if (!validateRegistration(registration)) {
      toast({
        title: "Invalid Registration",
        description: "Please enter a valid UK registration number.",
        variant: "destructive"
      });
      return;
    }

    logEvent('supplier_search', { registration: registration.toUpperCase() }, { profileId: profile.id });

    try {
      const vehicle = await lookupVehicle(registration);
      setVehicleInfo(vehicle);
      
      // Add to search history
      const newHistoryItem: SearchHistory = {
        registration: registration.toUpperCase(),
        vehicle: vehicle || undefined,
        timestamp: new Date()
      };
      
      const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)]; // Keep last 10
      setSearchHistory(updatedHistory);
      localStorage.setItem('supplier-search-history', JSON.stringify(updatedHistory));
      
      if (vehicle) {
        toast({
          title: "Vehicle Found",
          description: `Found ${vehicle.make} ${vehicle.model} (${vehicle.year})`
        });
      } else {
        toast({
          title: "No Vehicle Data",
          description: "Registration not found in database.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Search Error",
        description: "Failed to lookup vehicle details.",
        variant: "destructive"
      });
    }
  };

  const toggleBookmark = (reg: string) => {
    const newBookmarks = bookmarks.includes(reg) 
      ? bookmarks.filter(b => b !== reg)
      : [...bookmarks, reg];
    
    setBookmarks(newBookmarks);
    localStorage.setItem('supplier-bookmarks', JSON.stringify(newBookmarks));
    
    toast({
      title: bookmarks.includes(reg) ? "Bookmark Removed" : "Bookmark Added",
      description: `Registration ${reg} ${bookmarks.includes(reg) ? 'removed from' : 'added to'} bookmarks.`
    });
  };

  const openSupplierSearch = (supplier: SupplierLink) => {
    if (!registration.trim()) {
      toast({
        title: "No Registration",
        description: "Enter a registration number first.",
        variant: "destructive"
      });
      return;
    }

    const cleanReg = registration.toUpperCase().replace(/\s/g, '');
    const url = supplier.url + cleanReg;
    
    logEvent('supplier_link_clicked', { 
      supplier: supplier.name, 
      registration: cleanReg 
    }, { profileId: profile.id });
    
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Vehicle Parts Search
          </CardTitle>
          <CardDescription>
            Search for parts using vehicle registration number
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Enter vehicle registration (e.g. AB12 CDE)"
              value={registration}
              onChange={(e) => setRegistration(e.target.value.toUpperCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Search
            </Button>
            {registration && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => toggleBookmark(registration.toUpperCase())}
              >
                <Bookmark 
                  className={`h-4 w-4 ${bookmarks.includes(registration.toUpperCase()) ? 'fill-current' : ''}`} 
                />
              </Button>
            )}
          </div>

          {/* Vehicle Information */}
          {vehicleInfo && (
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Vehicle Details</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Make:</span>
                    <p className="font-medium">{vehicleInfo.make}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Model:</span>
                    <p className="font-medium">{vehicleInfo.model}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Year:</span>
                    <p className="font-medium">{vehicleInfo.year}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Engine:</span>
                    <p className="font-medium">{vehicleInfo.engineCapacity}cc</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Fuel:</span>
                    <p className="font-medium">{vehicleInfo.fuelType}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Colour:</span>
                    <p className="font-medium">{vehicleInfo.colour}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">MOT Status:</span>
                    <p className="font-medium">{vehicleInfo.motStatus.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tax Status:</span>
                    <p className="font-medium">{vehicleInfo.taxStatus}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Suppliers */}
      <Card>
        <CardHeader>
          <CardTitle>Parts Suppliers</CardTitle>
          <CardDescription>
            Click to search for parts on supplier websites
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {suppliers.map((supplier, index) => (
              <div key={index} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{supplier.icon}</span>
                    <div>
                      <h3 className="font-semibold">{supplier.name}</h3>
                      <p className="text-sm text-muted-foreground">{supplier.description}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openSupplierSearch(supplier)}
                    disabled={!registration.trim()}
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search History & Bookmarks */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Bookmarks */}
        {bookmarks.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" />
                Bookmarked Registrations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {bookmarks.map((reg, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="font-mono font-medium">{reg}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setRegistration(reg);
                          handleSearch();
                        }}
                      >
                        Search
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleBookmark(reg)}
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Searches */}
        {searchHistory.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" />
                Recent Searches
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {searchHistory.slice(0, 5).map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <span className="font-mono font-medium">{item.registration}</span>
                      {item.vehicle && (
                        <p className="text-sm text-muted-foreground">
                          {item.vehicle.make} {item.vehicle.model}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {item.timestamp.toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRegistration(item.registration);
                          setVehicleInfo(item.vehicle || null);
                        }}
                      >
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SuppliersTab;
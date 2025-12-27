import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Database, FileText, Settings, BarChart3, AlertTriangle, HardDrive, Search, Download, Clipboard, LogOut } from 'lucide-react';
import LiveBusinessDashboard from '@/components/dashboard/LiveBusinessDashboard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/useAuth';
import { useUserRole } from '@/hooks/useUserRole';

const AvirriaAdmin = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading, signOut } = useAuth();
  const { isAdmin, loading: roleLoading } = useUserRole();
  const [searchTerm, setSearchTerm] = useState('');

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !roleLoading) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, authLoading, roleLoading, navigate]);

  // Show loading while checking auth
  if (authLoading || roleLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Don't render if not admin
  if (!user || !isAdmin) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* SEO blocking meta tags */}
      <div style={{ display: 'none' }}>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-montserrat font-thin text-gray-800 mb-2">Avorria System Control</h1>
            <p className="text-gray-600">Project management & technical documentation hub</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 w-80"
              />
            </div>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button variant="outline" onClick={handleSignOut} className="border-gray-300 text-gray-700 hover:bg-gray-100">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>

        <Tabs defaultValue="build-plan" className="space-y-6">
          <TabsList className="bg-gray-100/50 backdrop-blur-md border-gray-300 p-1 flex flex-wrap gap-1">
            <TabsTrigger value="build-plan" className="data-[state=active]:bg-white text-gray-700">
              <Clipboard className="h-4 w-4 mr-2" />
              Build Plan
            </TabsTrigger>
            <TabsTrigger value="build-log" className="data-[state=active]:bg-white text-gray-700">
              <FileText className="h-4 w-4 mr-2" />
              Build Log
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white text-gray-700">
              <Search className="h-4 w-4 mr-2" />
              SEO Strategy
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-white text-gray-700">
              <Database className="h-4 w-4 mr-2" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white text-gray-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-white text-gray-700">
              <HardDrive className="h-4 w-4 mr-2" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-white text-gray-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Error Logs
            </TabsTrigger>
          </TabsList>

          {/* Build Plan Section */}
          <TabsContent value="build-plan" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Project Development Plan & Phases</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive breakdown of project phases, time investment, and technical implementations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8 text-gray-800">
                
                {/* Phase 1 */}
                <div className="border-l-4 border-blue-500 pl-6 bg-blue-50/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-blue-800">Phase 1: Foundation & Setup</h3>
                    <Badge className="bg-blue-100 text-blue-800">Week 1-2</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Established core project architecture with modern React stack and design system foundation.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Technical Stack:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• React 18 + TypeScript + Vite</li>
                        <li>• Tailwind CSS design system</li>
                        <li>• Supabase backend integration</li>
                        <li>• shadcn/ui component library</li>
                        <li>• React Router for navigation</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Time Investment:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Project setup: 4 hours</li>
                        <li>• Design system: 8 hours</li>
                        <li>• Component architecture: 12 hours</li>
                        <li>• Authentication setup: 6 hours</li>
                        <li><strong>Total: 30 hours</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 2 */}
                <div className="border-l-4 border-green-500 pl-6 bg-green-50/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-green-800">Phase 2: Core Business Logic</h3>
                    <Badge className="bg-green-100 text-green-800">Week 3-5</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Developed comprehensive garage management system with client tracking, vehicle registry, and appointment scheduling.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Database Implementation:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Client management system</li>
                        <li>• Vehicle registry with DVLA integration</li>
                        <li>• Appointment booking system</li>
                        <li>• Quote generation & tracking</li>
                        <li>• Invoice management</li>
                        <li>• Parts inventory system</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Time Investment:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Database design: 10 hours</li>
                        <li>• CRUD operations: 16 hours</li>
                        <li>• Dashboard UI: 20 hours</li>
                        <li>• Business logic: 14 hours</li>
                        <li><strong>Total: 60 hours</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 3 */}
                <div className="border-l-4 border-purple-500 pl-6 bg-purple-50/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-purple-800">Phase 3: Landing Page System</h3>
                    <Badge className="bg-purple-100 text-purple-800">Week 6-8</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Created templated landing page system for SEO optimization with manufacturer-specific and service-based pages.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Template System:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• ServiceLandingTemplate</li>
                        <li>• ManufacturerLandingTemplate</li>
                        <li>• InformationalLandingTemplate</li>
                        <li>• TuningLandingTemplate</li>
                        <li>• 30+ manufacturer pages</li>
                        <li>• 20+ service-specific pages</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Time Investment:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Template architecture: 12 hours</li>
                        <li>• SEO optimization: 8 hours</li>
                        <li>• Content creation: 25 hours</li>
                        <li>• Page generation: 15 hours</li>
                        <li><strong>Total: 60 hours</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 4 */}
                <div className="border-l-4 border-orange-500 pl-6 bg-orange-50/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-orange-800">Phase 4: Advanced Features</h3>
                    <Badge className="bg-orange-100 text-orange-800">Week 9-11</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Integrated external APIs, analytics systems, and advanced business features for enhanced functionality.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">API Integrations:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• DVLA vehicle lookup API</li>
                        <li>• Mapbox location services</li>
                        <li>• MOT reminder system</li>
                        <li>• Email notification system</li>
                        <li>• Analytics & reporting</li>
                        <li>• Contact form processing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Time Investment:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• API integration: 18 hours</li>
                        <li>• Analytics setup: 8 hours</li>
                        <li>• Advanced features: 16 hours</li>
                        <li>• Testing & debugging: 12 hours</li>
                        <li><strong>Total: 54 hours</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Phase 5 */}
                <div className="border-l-4 border-red-500 pl-6 bg-red-50/50 p-4 rounded-r-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-semibold text-red-800">Phase 5: Optimization & Polish</h3>
                    <Badge className="bg-red-100 text-red-800">Week 12-13</Badge>
                  </div>
                  <p className="text-gray-700 mb-4">
                    Performance optimization, SEO enhancements, responsive design improvements, and final quality assurance.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Optimizations:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Image optimization & lazy loading</li>
                        <li>• Code splitting & performance</li>
                        <li>• SEO schema markup</li>
                        <li>• Mobile responsiveness</li>
                        <li>• Accessibility improvements</li>
                        <li>• Cross-browser testing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2 text-gray-800">Time Investment:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Performance optimization: 10 hours</li>
                        <li>• SEO enhancements: 8 hours</li>
                        <li>• Design polish: 12 hours</li>
                        <li>• QA & testing: 10 hours</li>
                        <li><strong>Total: 40 hours</strong></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Separator className="bg-gray-300" />

                {/* Project Summary */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Project Summary</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">244</div>
                      <div className="text-sm text-gray-600">Total Hours Invested</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">50+</div>
                      <div className="text-sm text-gray-600">Landing Pages Created</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">15+</div>
                      <div className="text-sm text-gray-600">Core Features Delivered</div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Value Delivered:</h4>
                    <p className="text-blue-700 text-sm">
                      Complete automotive garage management platform with SEO-optimized marketing website, 
                      comprehensive business management tools, and integrated third-party services. 
                      Ready for immediate deployment and customer acquisition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Build Log Section */}
          <TabsContent value="build-log" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Comprehensive Build Log</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete implementation history and technical decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <p className="text-gray-600">Build log documentation available for admin review.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Section */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">SEO Strategy</CardTitle>
                <CardDescription className="text-gray-600">
                  Search engine optimization implementation details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <p className="text-gray-600">SEO strategy documentation available for admin review.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Section */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Infrastructure</CardTitle>
                <CardDescription className="text-gray-600">
                  System architecture and backend services
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <p className="text-gray-600">Infrastructure documentation available for admin review.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Section */}
          <TabsContent value="analytics" className="space-y-6">
            <LiveBusinessDashboard />
          </TabsContent>

          {/* Storage Section */}
          <TabsContent value="storage" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Storage</CardTitle>
                <CardDescription className="text-gray-600">
                  File storage and asset management
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <p className="text-gray-600">Storage management coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Errors Section */}
          <TabsContent value="errors" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Error Logs</CardTitle>
                <CardDescription className="text-gray-600">
                  System error monitoring and debugging
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <p className="text-gray-600">Error monitoring coming soon.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AvirriaAdmin;

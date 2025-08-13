import { useState, useEffect } from 'react';
import { Shield, Database, FileText, Settings, BarChart3, AlertTriangle, HardDrive, Search, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
const AvirriaAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // Admin password (in production, this should be more secure)
  const ADMIN_PASSWORD = 'avorria2024admin';

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  // Show authentication form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-white" />
            </div>
            <CardTitle className="text-2xl font-signature text-white">Avorria Admin</CardTitle>
            <CardDescription className="text-white/80">
              Enter admin password to access system controls
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAuth()}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}
            <Button 
              onClick={handleAuth} 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              Access Admin Panel
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* SEO blocking meta tags */}
      <div style={{ display: 'none' }}>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-signature text-white mb-2">Avorria System Control</h1>
            <p className="text-white/80">Project management & technical documentation hub</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 h-4 w-4" />
              <Input
                placeholder="Search documentation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 w-80"
              />
            </div>
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="build-log" className="space-y-6">
          <TabsList className="bg-white/10 backdrop-blur-md border-white/20 p-1">
            <TabsTrigger value="build-log" className="data-[state=active]:bg-white/20 text-white">
              <FileText className="h-4 w-4 mr-2" />
              Build Log
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-white/20 text-white">
              <Search className="h-4 w-4 mr-2" />
              SEO Strategy
            </TabsTrigger>
            <TabsTrigger value="infrastructure" className="data-[state=active]:bg-white/20 text-white">
              <Database className="h-4 w-4 mr-2" />
              Infrastructure
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20 text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="storage" className="data-[state=active]:bg-white/20 text-white">
              <HardDrive className="h-4 w-4 mr-2" />
              Storage
            </TabsTrigger>
            <TabsTrigger value="errors" className="data-[state=active]:bg-white/20 text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Error Logs
            </TabsTrigger>
          </TabsList>

          {/* Build Log Section */}
          <TabsContent value="build-log" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Comprehensive Build Log</CardTitle>
                <CardDescription className="text-white/80">
                  Complete implementation history and technical decisions
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-white">
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-lg">Project Foundation</h3>
                    <p className="text-white/80 mt-2">
                      Built on React 18 + TypeScript + Vite stack with comprehensive Tailwind CSS design system.
                      Implemented authentication via Supabase with row-level security policies.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="border-purple-400 text-purple-300">React 18</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-300">TypeScript</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-300">Tailwind CSS</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-300">Supabase</Badge>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">UI Component Architecture</h3>
                    <p className="text-white/80 mt-2">
                      Implemented shadcn/ui component library with custom design system tokens.
                      Created reusable template components for landing pages, service pages, and manufacturer-specific content.
                    </p>
                    <ul className="list-disc list-inside text-white/80 mt-2 space-y-1">
                      <li>ServiceLandingTemplate - Dynamic service page generation</li>
                      <li>ManufacturerLandingTemplate - Brand-specific service pages</li>
                      <li>InformationalLandingTemplate - Educational content pages</li>
                      <li>TuningLandingTemplate - Performance service pages</li>
                    </ul>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-lg">Business Management System</h3>
                    <p className="text-white/80 mt-2">
                      Full garage management dashboard with client management, vehicle tracking, appointments, quotes, invoices, and analytics.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <h4 className="font-medium">Database Tables:</h4>
                        <ul className="text-sm text-white/70 space-y-1">
                          <li>• clients - Customer information</li>
                          <li>• vehicles - Vehicle registry</li>
                          <li>• appointments - Booking system</li>
                          <li>• quotes - Estimate generation</li>
                          <li>• invoices - Billing system</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Features:</h4>
                        <ul className="text-sm text-white/70 space-y-1">
                          <li>• DVLA integration for vehicle lookup</li>
                          <li>• MOT reminder system</li>
                          <li>• Parts inventory management</li>
                          <li>• Analytics & reporting</li>
                          <li>• Contact form processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-white/20" />

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-lg">Performance & Optimization</h3>
                    <p className="text-white/80 mt-2">
                      Implemented lazy loading, image optimization, code splitting, and SEO best practices throughout the application.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-300">React.lazy()</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-300">Image Optimization</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-300">Code Splitting</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-300">SEO Metadata</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Strategy Section */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">SEO Strategy & Implementation</CardTitle>
                <CardDescription className="text-white/80">
                  Complete SEO optimization strategy and landing page documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Service-Based Landing Pages</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>MOT Testing</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Car Servicing</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Brake Repairs</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>ECU Remapping</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Diagnostics</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Manufacturer-Specific Pages</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>BMW Servicing Chesterfield</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Audi Servicing Chesterfield</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Mercedes Servicing Chesterfield</span>
                        <Badge variant="outline" className="border-green-400 text-green-300">Live</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>+ 25 more manufacturer pages</span>
                        <Badge variant="outline" className="border-blue-400 text-blue-300">Template</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div>
                  <h3 className="font-semibold text-lg mb-3">SEO Technical Implementation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Schema Markup</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• LocalBusiness schema</li>
                        <li>• Service schema</li>
                        <li>• FAQ schema</li>
                        <li>• Review schema</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Meta Optimization</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• Dynamic title tags</li>
                        <li>• Meta descriptions</li>
                        <li>• Open Graph tags</li>
                        <li>• Canonical URLs</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Performance</h4>
                      <ul className="text-sm text-white/80 space-y-1">
                        <li>• Image optimization</li>
                        <li>• Lazy loading</li>
                        <li>• Core Web Vitals</li>
                        <li>• Mobile optimization</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Infrastructure Section */}
          <TabsContent value="infrastructure" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Technical Infrastructure</CardTitle>
                <CardDescription className="text-white/80">
                  APIs, integrations, and technical components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">External APIs & Services</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <span className="font-medium">DVLA Vehicle API</span>
                          <p className="text-sm text-white/70">Vehicle registration lookup</p>
                        </div>
                        <Badge variant="outline" className="border-green-400 text-green-300">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <span className="font-medium">Mapbox API</span>
                          <p className="text-sm text-white/70">Location services & maps</p>
                        </div>
                        <Badge variant="outline" className="border-green-400 text-green-300">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                        <div>
                          <span className="font-medium">Supabase Database</span>
                          <p className="text-sm text-white/70">Backend & authentication</p>
                        </div>
                        <Badge variant="outline" className="border-green-400 text-green-300">Active</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Database Functions</h3>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="font-medium block">generate_quote_number()</span>
                        <p className="text-sm text-white/70">Auto-generates quote numbers</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="font-medium block">convert_quote_to_invoice()</span>
                        <p className="text-sm text-white/70">Quote to invoice conversion</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg">
                        <span className="font-medium block">check_mot_expiry()</span>
                        <p className="text-sm text-white/70">MOT reminder trigger</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator className="bg-white/20" />

                <div>
                  <h3 className="font-semibold text-lg mb-4">Edge Functions</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium">dvla-lookup</h4>
                      <p className="text-sm text-white/70 mt-1">
                        Secure server-side DVLA API integration for vehicle data retrieval
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-xs text-green-300">Operational</span>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-lg">
                      <h4 className="font-medium">mapbox-token</h4>
                      <p className="text-sm text-white/70 mt-1">
                        Secure token management for Mapbox API integration
                      </p>
                      <div className="flex items-center mt-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                        <span className="text-xs text-green-300">Operational</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other tabs would continue similarly... */}
          
          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Enhanced Analytics</CardTitle>
                <CardDescription className="text-white/80">
                  Comprehensive analytics beyond standard dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <p className="text-white/80">Enhanced analytics section - tracking landing page performance, conversion funnels, and campaign effectiveness.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Storage Management</CardTitle>
                <CardDescription className="text-white/80">
                  File management and asset organization
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <p className="text-white/80">Storage management section - tracking uploads, file organization, and asset optimization.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Error Monitoring</CardTitle>
                <CardDescription className="text-white/80">
                  System health and error tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-white">
                <p className="text-white/80">Error monitoring section - tracking application errors, performance issues, and system health.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AvirriaAdmin;

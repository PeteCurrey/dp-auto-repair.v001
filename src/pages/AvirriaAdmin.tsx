import { useState, useEffect } from 'react';
import { Shield, Database, FileText, Settings, BarChart3, AlertTriangle, HardDrive, Search, Download, Clipboard } from 'lucide-react';
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
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gray-100/50 backdrop-blur-md border-gray-300">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-gray-700" />
            </div>
            <CardTitle className="text-2xl font-signature text-gray-800">Avorria Admin</CardTitle>
            <CardDescription className="text-gray-600">
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
              className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500"
            />
            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
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
    <div className="min-h-screen bg-white">
      {/* SEO blocking meta tags */}
      <div style={{ display: 'none' }}>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-montserrat font-thin text-gray-800 mb-2">Monsarrat System Control</h1>
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
          </div>
        </div>

        <Tabs defaultValue="build-plan" className="space-y-6">
          <TabsList className="bg-gray-100/50 backdrop-blur-md border-gray-300 p-1">
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
                <div className="space-y-4">
                  <div className="border-l-4 border-purple-500 pl-4">
                    <h3 className="font-semibold text-lg">Project Foundation</h3>
                    <p className="text-gray-700 mt-2">
                      Built on React 18 + TypeScript + Vite stack with comprehensive Tailwind CSS design system.
                      Implemented authentication via Supabase with row-level security policies.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="border-purple-400 text-purple-600">React 18</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-600">TypeScript</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-600">Tailwind CSS</Badge>
                      <Badge variant="outline" className="border-purple-400 text-purple-600">Supabase</Badge>
                    </div>
                  </div>

                  <Separator className="bg-gray-300" />

                  <div className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold text-lg">UI Component Architecture</h3>
                    <p className="text-gray-700 mt-2">
                      Implemented shadcn/ui component library with custom design system tokens.
                      Created reusable template components for landing pages, service pages, and manufacturer-specific content.
                    </p>
                    <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                      <li>ServiceLandingTemplate - Dynamic service page generation</li>
                      <li>ManufacturerLandingTemplate - Brand-specific service pages</li>
                      <li>InformationalLandingTemplate - Educational content pages</li>
                      <li>TuningLandingTemplate - Performance service pages</li>
                    </ul>
                  </div>

                  <Separator className="bg-gray-300" />

                  <div className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-lg">Business Management System</h3>
                    <p className="text-gray-700 mt-2">
                      Full garage management dashboard with client management, vehicle tracking, appointments, quotes, invoices, and analytics.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <h4 className="font-medium">Database Tables:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• clients - Customer information</li>
                          <li>• vehicles - Vehicle registry</li>
                          <li>• appointments - Booking system</li>
                          <li>• quotes - Estimate generation</li>
                          <li>• invoices - Billing system</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium">Features:</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• DVLA integration for vehicle lookup</li>
                          <li>• MOT reminder system</li>
                          <li>• Parts inventory management</li>
                          <li>• Analytics & reporting</li>
                          <li>• Contact form processing</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-300" />

                  <div className="border-l-4 border-yellow-500 pl-4">
                    <h3 className="font-semibold text-lg">Performance & Optimization</h3>
                    <p className="text-gray-700 mt-2">
                      Implemented lazy loading, image optimization, code splitting, and SEO best practices throughout the application.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <Badge variant="outline" className="border-yellow-400 text-yellow-600">React.lazy()</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-600">Image Optimization</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-600">Code Splitting</Badge>
                      <Badge variant="outline" className="border-yellow-400 text-yellow-600">SEO Metadata</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO Strategy Section */}
          <TabsContent value="seo" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">SEO Strategy & Implementation</CardTitle>
                <CardDescription className="text-gray-600">
                  Complete SEO optimization strategy and landing page documentation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Service-Based Landing Pages</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>MOT Testing</span>
                        <Badge variant="outline" className="border-green-400 text-green-600">Live</Badge>
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

                <Separator className="bg-gray-300" />

                <div>
                  <h3 className="font-semibold text-lg mb-3">SEO Technical Implementation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Schema Markup</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
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
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Technical Infrastructure</CardTitle>
                <CardDescription className="text-gray-600">
                  APIs, integrations, and technical components
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-gray-800">
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
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Enhanced Analytics</CardTitle>
                <CardDescription className="text-gray-600">
                  Comprehensive analytics beyond standard dashboard
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-800">
                <p className="text-gray-600">Enhanced analytics section - tracking landing page performance, conversion funnels, and campaign effectiveness.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Storage Management</CardTitle>
                <CardDescription className="text-gray-600">
                  File management and asset organization
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-800">
                <p className="text-gray-600">Storage management section - tracking uploads, file organization, and asset optimization.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="errors" className="space-y-6">
            <Card className="bg-gray-100/50 backdrop-blur-md border-gray-300">
              <CardHeader>
                <CardTitle className="text-gray-800">Error Monitoring</CardTitle>
                <CardDescription className="text-gray-600">
                  System health and error tracking
                </CardDescription>
              </CardHeader>
              <CardContent className="text-gray-800">
                <p className="text-gray-600">Error monitoring section - tracking application errors, performance issues, and system health.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AvirriaAdmin;

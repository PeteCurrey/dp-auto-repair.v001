import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertCircle, 
  Search, 
  TrendingUp, 
  Globe, 
  Link,
  FileText,
  Users,
  MapPin
} from 'lucide-react';

interface SEOMetric {
  title: string;
  value: string;
  status: 'good' | 'warning' | 'info';
  description: string;
  icon: React.ReactNode;
}

interface SEODashboardProps {
  className?: string;
}

const SEODashboard = ({ className = "" }: SEODashboardProps) => {
  const seoMetrics: SEOMetric[] = [
    {
      title: "Total Pages",
      value: "546",
      status: 'good',
      description: "Complete site coverage with all services",
      icon: <FileText className="h-5 w-5" />
    },
    {
      title: "Internal Links",
      value: "1,200+",
      status: 'good', 
      description: "Strong internal linking structure",
      icon: <Link className="h-5 w-5" />
    },
    {
      title: "Local SEO",
      value: "Optimized",
      status: 'good',
      description: "Chesterfield + surrounding areas coverage",
      icon: <MapPin className="h-5 w-5" />
    },
    {
      title: "Structured Data",
      value: "100%",
      status: 'good',
      description: "Schema markup on all pages",
      icon: <Search className="h-5 w-5" />
    },
    {
      title: "Mobile Friendly",
      value: "Yes",
      status: 'good',
      description: "Responsive design across all pages",
      icon: <Globe className="h-5 w-5" />
    },
    {
      title: "Page Speed",
      value: "Good",
      status: 'good',
      description: "Optimized for Core Web Vitals",
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  const recentImprovements = [
    {
      title: "Related Services Components",
      description: "Added intelligent cross-linking between related automotive services",
      status: 'completed',
      impact: 'high'
    },
    {
      title: "Local Area Coverage",
      description: "Enhanced local SEO with surrounding area targeting",
      status: 'completed',
      impact: 'high'
    },
    {
      title: "Service Category Navigation", 
      description: "Improved site architecture with category-based navigation",
      status: 'completed',
      impact: 'medium'
    },
    {
      title: "Popular Services Integration",
      description: "Added dynamic popular services showcasing",
      status: 'completed',
      impact: 'medium'
    },
    {
      title: "Breadcrumb Enhancement",
      description: "Comprehensive breadcrumb navigation across all templates",
      status: 'completed',
      impact: 'medium'
    }
  ];

  const nextActions = [
    {
      title: "Submit Sitemap to Google Search Console",
      priority: 'high',
      estimated: '1 day'
    },
    {
      title: "Set up Google Analytics Goal Tracking",
      priority: 'high', 
      estimated: '1 day'
    },
    {
      title: "Monitor Search Console for Crawl Errors",
      priority: 'medium',
      estimated: 'ongoing'
    },
    {
      title: "Track Keyword Rankings",
      priority: 'medium',
      estimated: 'weekly'
    },
    {
      title: "Add Customer Review Schema",
      priority: 'low',
      estimated: '2 days'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-green-600';
      case 'warning': return 'text-yellow-600';
      case 'info': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* SEO Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            SEO Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {seoMetrics.map((metric, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {metric.icon}
                    <span className="font-medium text-sm">{metric.title}</span>
                  </div>
                  {getStatusIcon(metric.status)}
                </div>
                <div className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                  {metric.value}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Improvements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Recent SEO Improvements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentImprovements.map((improvement, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{improvement.title}</span>
                    <Badge variant={improvement.impact === 'high' ? 'default' : 'secondary'}>
                      {improvement.impact} impact
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {improvement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Next Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Recommended Next Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {nextActions.map((action, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium">{action.title}</span>
                    <Badge variant={getPriorityColor(action.priority) as any}>
                      {action.priority} priority
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Estimated time: {action.estimated}
                  </p>
                </div>
                <Button size="sm" variant="outline">
                  View Guide
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Key Performance Targets */}
      <Card>
        <CardHeader>
          <CardTitle>SEO Performance Targets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Primary Keywords</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• "MOT Chesterfield" - Target: Top 3</li>
                <li>• "Car Service Chesterfield" - Target: Top 3</li>
                <li>• "ECU Remapping Chesterfield" - Target: Top 5</li>
                <li>• "BMW Servicing Chesterfield" - Target: Top 5</li>
              </ul>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-medium text-blue-800 mb-2">Traffic Goals</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• 50% increase in organic traffic</li>
                <li>• 30% increase in local searches</li>
                <li>• 25% improvement in conversion rate</li>
                <li>• Top 3 for "garage near me" Chesterfield</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SEODashboard;
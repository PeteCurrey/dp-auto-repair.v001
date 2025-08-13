import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { subDays, format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";

type Pageview = {
  id: string;
  created_at: string;
  path: string;
  referrer?: string | null;
  session_id: string;
};

type EventRow = {
  id: string;
  created_at: string;
  name: string;
  path?: string | null;
  session_id: string;
  metadata?: Record<string, any>;
};

const fetchLast30Days = async () => {
  const since = subDays(new Date(), 30).toISOString();

  const [pageviewsRes, eventsRes] = await Promise.all([
    supabase
      .from("web_pageviews")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: true }),
    
    supabase
      .from("web_events")
      .select("*")
      .gte("created_at", since)
      .order("created_at", { ascending: true }),
  ]);

  if (pageviewsRes.error) throw pageviewsRes.error;
  if (eventsRes.error) throw eventsRes.error;

  return {
    pageviews: pageviewsRes.data as Pageview[],
    events: eventsRes.data as EventRow[],
  };
};

const groupByDay = (data: Pageview[]) => {
  const grouped = data.reduce((acc, item) => {
    const day = format(new Date(item.created_at), "yyyy-MM-dd");
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

const topPages = (data: Pageview[], limit = 5) => {
  const counts = data.reduce((acc, pv) => {
    acc[pv.path] = (acc[pv.path] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, limit)
    .map(([path, count]) => ({ path, count }));
};

const topReferrers = (data: Pageview[], limit = 5) => {
  const map = new Map<string, number>();
  data.forEach((r) => {
    const k = (r.referrer as string) || "(direct)";
    map.set(k, (map.get(k) || 0) + 1);
  });
  return Array.from(map.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));
};

const AnalyticsPanel = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["analytics", "last30d"],
    queryFn: fetchLast30Days,
  });

  const visits = data?.pageviews?.length || 0;
  const eventsCount = data?.events?.length || 0;

  const trendData = useMemo(() => groupByDay(data?.pageviews || []), [data?.pageviews]);
  const topPagesData = useMemo(() => topPages(data?.pageviews || []), [data?.pageviews]);
  const topReferrersData = useMemo(() => topReferrers(data?.pageviews || []), [data?.pageviews]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card className="bg-white/20 backdrop-blur-md border-white/30">
          <CardHeader>
            <Skeleton className="h-6 w-48 bg-white/20" />
            <Skeleton className="h-4 w-64 bg-white/20" />
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24 bg-white/20" />
                  <Skeleton className="h-8 w-16 bg-white/20" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
        <CardContent className="p-6">
          <p className="text-red-300">Error loading analytics: {(error as Error).message}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Total Pageviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{visits.toLocaleString()}</div>
            <p className="text-xs text-white/70">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Events Tracked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{eventsCount.toLocaleString()}</div>
            <p className="text-xs text-white/70">Last 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Avg. Daily Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{Math.round(visits / 30).toLocaleString()}</div>
            <p className="text-xs text-white/70">Per day</p>
          </CardContent>
        </Card>

        <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-white">Top Pages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{topPagesData.length}</div>
            <p className="text-xs text-white/70">Unique pages</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="traffic" className="space-y-4">
        <TabsList className="bg-white/20 backdrop-blur-md border-white/30">
          <TabsTrigger value="traffic" className="data-[state=active]:bg-white/30 text-white">
            Traffic Trends
          </TabsTrigger>
          <TabsTrigger value="pages" className="data-[state=active]:bg-white/30 text-white">
            Top Pages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardHeader>
              <CardTitle className="text-white">Daily Pageviews (Last 30 Days)</CardTitle>
              <CardDescription className="text-white/80">
                Track your website traffic over time
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="date" 
                    stroke="rgba(255,255,255,0.7)"
                    fontSize={12}
                    tickFormatter={(value) => format(new Date(value), "MMM dd")}
                  />
                  <YAxis stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                    labelFormatter={(value) => format(new Date(value), "MMM dd, yyyy")}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="count" 
                    stroke="hsl(var(--primary-glow))" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: "hsl(var(--primary-glow))", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          <Card className="bg-white/20 backdrop-blur-md border-white/30 text-white">
            <CardHeader>
              <CardTitle className="text-white">Most Visited Pages</CardTitle>
              <CardDescription className="text-white/80">
                Your most popular content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={topPagesData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis type="number" stroke="rgba(255,255,255,0.7)" fontSize={12} />
                  <YAxis 
                    dataKey="path" 
                    type="category" 
                    stroke="rgba(255,255,255,0.7)" 
                    fontSize={12}
                    width={120}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.8)', 
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="count" 
                    fill="hsl(var(--primary))" 
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
};

export default AnalyticsPanel;
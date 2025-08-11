
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

  const { data: pageviews, error: pvErr } = await supabase
    .from("web_pageviews")
    .select("*")
    .gte("created_at", since)
    .limit(10000); // safety cap

  if (pvErr) throw pvErr;

  const { data: events, error: evErr } = await supabase
    .from("web_events")
    .select("*")
    .gte("created_at", since)
    .limit(10000);

  if (evErr) throw evErr;

  return { pageviews: (pageviews || []) as Pageview[], events: (events || []) as EventRow[] };
};

const groupByDay = (rows: { created_at: string }[]) => {
  const map = new Map<string, number>();
  rows.forEach((r) => {
    const d = format(new Date(r.created_at), "MMM d");
    map.set(d, (map.get(d) || 0) + 1);
  });
  // Ensure continuous days for the last 30 days
  const days: string[] = [];
  for (let i = 29; i >= 0; i--) {
    days.push(format(subDays(new Date(), i), "MMM d"));
  }
  return days.map((d) => ({ day: d, count: map.get(d) || 0 }));
};

const topCounts = (rows: Record<string, any>[], key: string, limit = 5) => {
  const map = new Map<string, number>();
  rows.forEach((r) => {
    const k = (r[key] as string) || "(none)";
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
  const topPages = useMemo(() => topCounts(data?.pageviews || [], "path"), [data?.pageviews]);
  const topEvents = useMemo(() => topCounts(data?.events || [], "name"), [data?.events]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid gap-4 md:grid-cols-3">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-destructive">Failed to load analytics.</p>;
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Visits</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{visits}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Events</CardTitle>
            <CardDescription>Last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{eventsCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Pages</CardTitle>
            <CardDescription>Top 5 in last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {topPages.map((p) => (
                <div key={p.name} className="flex justify-between text-sm">
                  <span className="truncate max-w-[75%]" title={p.name}>{p.name}</span>
                  <span className="text-muted-foreground">{p.count}</span>
                </div>
              ))}
              {topPages.length === 0 && <p className="text-sm text-muted-foreground">No data</p>}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="trend" className="space-y-4">
        <TabsList>
          <TabsTrigger value="trend">Visits Trend</TabsTrigger>
          <TabsTrigger value="events">Top Events</TabsTrigger>
        </TabsList>

        <TabsContent value="trend">
          <Card>
            <CardHeader>
              <CardTitle>Daily Visits</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Top Events</CardTitle>
              <CardDescription>Most frequent actions</CardDescription>
            </CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topEvents}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="count" fill="hsl(var(--primary))" />
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

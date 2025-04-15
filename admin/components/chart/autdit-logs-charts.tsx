"use client";

import React, { useState, useEffect } from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// Define interfaces (Keep these as they are)
interface EntityCountData {
  entity: string;
  count: number;
}
interface DailyStatsData {
  date: string;
  total: number;
}
interface HourlyStatsData {
  hour: number;
  total: number;
}
interface ErrorStatsData {
  response_status: number;
  total: number;
}
interface ResponseDistributionData {
  response_status: number;
  total: number;
}
interface TopApiUsageData {
  entity: string;
  action: string;
  total: number;
}

// API Base URL
const API_BASE_URL = "http://localhost:3003/api/v1/audit-logs";

// Updated Colors for Pie Chart (include more if needed)
const PIE_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--chart-6))", // Added color 6
  "hsl(var(--chart-7))", // Added color 7
  "hsl(var(--chart-8))", // Added color 8
];

// fetchData function (Keep as is)
async function fetchData<T>(endpoint: string): Promise<T[]> {
  // ... (fetchData implementation remains the same)
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = await response.json();
    if (result.status !== 200 || !Array.isArray(result.data)) {
      console.error("API Error or unexpected format:", result);
      throw new Error(result.message || "Invalid data format from API");
    }
    return result.data as T[];
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    throw error; // Re-throw to be caught by individual state setters
  }
}

export default function AuditLogCharts() {
  // State declarations (Keep as they are)
  const [entityCount, setEntityCount] = useState<{ data: EntityCountData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [dailyStats, setDailyStats] = useState<{ data: DailyStatsData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [hourlyStats, setHourlyStats] = useState<{ data: HourlyStatsData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [errorStats, setErrorStats] = useState<{ data: ErrorStatsData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [responseDist, setResponseDist] = useState<{ data: ResponseDistributionData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [topApiUsage, setTopApiUsage] = useState<{ data: TopApiUsageData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });

  // useEffect for data fetching (Keep as is)
  useEffect(() => {
    const fetchAllData = async () => {
      // ... (fetchAllData implementation remains the same)
      fetchData<EntityCountData>("/count/entity")
        .then((data) => setEntityCount({ data, loading: false, error: null }))
        .catch((error) => setEntityCount({ data: [], loading: false, error }));

      fetchData<DailyStatsData>("/daily-stats")
        .then((data) => setDailyStats({ data, loading: false, error: null }))
        .catch((error) => setDailyStats({ data: [], loading: false, error }));

      fetchData<HourlyStatsData>("/hourly-stats")
        .then((data) => data.sort((a, b) => a.hour - b.hour))
        .then((data) => setHourlyStats({ data, loading: false, error: null }))
        .catch((error) => setHourlyStats({ data: [], loading: false, error }));

      fetchData<ErrorStatsData>("/error-stats")
        .then((data) => setErrorStats({ data, loading: false, error: null }))
        .catch((error) => setErrorStats({ data: [], loading: false, error }));

      fetchData<ResponseDistributionData>("/response-distribution")
        .then((data) => setResponseDist({ data, loading: false, error: null }))
        .catch((error) => setResponseDist({ data: [], loading: false, error }));

      fetchData<TopApiUsageData>("/top-api-usage")
        .then((data) => setTopApiUsage({ data, loading: false, error: null }))
        .catch((error) => setTopApiUsage({ data: [], loading: false, error }));
    };
    fetchAllData();
  }, []);

  // renderChartContent helper (Keep as is)
  const renderChartContent = (
    state: { loading: boolean; error: Error | null; data: any[] },
    ChartComponent: React.ReactNode,
    noDataMessage = "No data available."
  ) => {
    // ... (renderChartContent implementation remains the same)
    if (state.loading) {
      return <div className="flex justify-center items-center h-full min-h-[300px]">Loading...</div>;
    }
    if (state.error) {
      return <div className="flex justify-center items-center h-full min-h-[300px] text-destructive">Error: {state.error.message}</div>;
    }
    if (state.data.length === 0) {
      return <div className="flex justify-center items-center h-full min-h-[300px] text-muted-foreground">{noDataMessage}</div>;
    }
    return ChartComponent;
  };

  // sortedTopApiUsage memo (Keep as is)
  const sortedTopApiUsage = React.useMemo(() => {
    // ... (sorting implementation remains the same)
    return [...topApiUsage.data].sort((a, b) => b.total - a.total);
  }, [topApiUsage.data]);

  return (
    // Changed from grid to flex flex-col as per your last snippet
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* 1. Entity Count - Bar Chart */}
      {/* ADD background class here */}
      <Card className="bg-[hsl(var(--chart-bg-1))]">
        <CardHeader>
          <CardTitle>Audit Logs by Entity</CardTitle>
          <CardDescription>Count of log entries per entity type.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            entityCount,
            <ChartContainer config={{ count: { label: "Count", color: "hsl(var(--chart-1))" } }} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={entityCount.data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="entity" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  {/* Ensure var name matches config */}
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 2. Daily Stats - Line Chart */}
      {/* ADD background class here */}
      <Card className="bg-[hsl(var(--chart-bg-2))]">
        <CardHeader>
          <CardTitle>Daily Audit Log Activity</CardTitle>
          <CardDescription>Total log entries generated per day.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            dailyStats,
            <ChartContainer config={{ total: { label: "Total Logs", color: "hsl(var(--chart-2))" } }} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dailyStats.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  {/* Ensure var name matches config */}
                  <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 3. Hourly Stats - Bar Chart */}
      {/* ADD background class here */}
      <Card className="bg-[hsl(var(--chart-bg-3))]">
        <CardHeader>
          <CardTitle>Hourly Audit Log Activity</CardTitle>
          <CardDescription>Total log entries generated per hour of the day (UTC).</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            hourlyStats,
            <ChartContainer config={{ total: { label: "Total Logs", color: "hsl(var(--chart-3))" } }} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={hourlyStats.data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="hour"
                    stroke="hsl(var(--foreground)/.6)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}:00`}
                  />
                  <YAxis stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  {/* Ensure var name matches config */}
                  <Bar dataKey="total" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 4. Error Stats - Bar Chart */}
      {/* ADD background class here */}
      <Card className="bg-[hsl(var(--chart-bg-4))]">
        <CardHeader>
          <CardTitle>API Error Status Codes</CardTitle>
          <CardDescription>Count of logs with error response status codes (4xx, 5xx).</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            errorStats,
            <ChartContainer config={{ total: { label: "Count", color: "hsl(var(--chart-3))" } }} className="min-h-[300px]">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={errorStats.data} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="response_status"
                    type="category"
                    stroke="hsl(var(--foreground)/.6)"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  {/* Ensure var name matches config */}
                  <Bar dataKey="total" fill="hsl(var(--chart-3))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 5. Response Distribution - Pie Chart */}
      {/* ADD background class here */}
      <Card className="flex flex-col bg-[hsl(var(--chart-bg-5))]">
        <CardHeader>
          <CardTitle>API Response Status Distribution</CardTitle>
          <CardDescription>Distribution of all API response status codes.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {renderChartContent(
            responseDist,
            <ChartContainer config={{}} className="mx-auto aspect-square max-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="response_status" />} />
                  <Pie
                    data={responseDist.data}
                    dataKey="total"
                    nameKey="response_status" // Use status code as the name key for tooltip/legend
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60}
                    paddingAngle={2}
                    labelLine={false}
                  >
                    {responseDist.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={40} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 6. Top API Usage - Horizontal Bar Chart */}
      {/* ADD background class here */}
      <Card className="bg-[hsl(var(--chart-bg-6))]">
        <CardHeader>
          <CardTitle>Top API Endpoint Usage</CardTitle>
          <CardDescription>Most frequently called API endpoints.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            topApiUsage,
            // Use chart-6 for this distinct chart's color config
            <ChartContainer config={{ total: { label: "Requests", color: "hsl(var(--chart-1))" } }} className="min-h-[400px]">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={sortedTopApiUsage} layout="vertical" margin={{ top: 5, right: 10, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="action"
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--foreground)/.6)"
                    fontSize={10}
                    width={150}
                    tickFormatter={(value) => (value.length > 35 ? `${value.substring(0, 35)}...` : value)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                  {/* Ensure var name matches config */}
                  <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

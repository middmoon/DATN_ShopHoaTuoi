"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Bar, BarChart, Line, LineChart, Pie, PieChart, XAxis, YAxis, CartesianGrid, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

// --- Interfaces based on API samples ---
interface QueryObject {
  q?: string; // Query text is optional
  is_public?: boolean;
  // Add other potential filter keys if they exist
  [key: string]: any; // Allow other properties
}

interface TopSearchData {
  search_query: QueryObject | {}; // Can be an empty object
  count: number;
}

interface DailyVolumeData {
  date: string;
  total: number;
}

interface SuccessDistributionData {
  label: "Success" | "No Results";
  total: number;
}

interface NoResultData {
  label: QueryObject | {}; // Can be an empty object
  total: number;
}

// Interface for data processed for display (with stringified label)
interface ProcessedQueryData {
  formattedLabel: string;
  originalQuery: QueryObject | {};
  count: number; // For top search
  total?: number; // For no-result (using same interface for simplicity)
}

// --- API Base URL ---
const API_BASE_URL = "http://localhost:3003/api/v1/search-logs";

// --- Colors ---
const PIE_COLORS_SUCCESS_DIST = ["hsl(var(--chart-1))", "hsl(var(--chart-3))"]; // Orange for Success, Purple for No Results (example)

// --- Helper Function to Format Query Objects for Display ---
// --- Helper Function to Format Query Objects for Display (Corrected) ---
const formatQueryObject = (queryObj: QueryObject | {}): string => {
  // 1. Basic type check
  if (typeof queryObj !== "object" || queryObj === null) {
    return "[Invalid Query]";
  }

  // 2. Handle empty object specifically
  if (Object.keys(queryObj).length === 0) {
    return "[Empty Query]";
  }

  // 3. Type Guard: Check if 'q' exists and is a non-empty string
  //    We use the 'in' operator which is a safe way to check for property existence.
  if ("q" in queryObj && typeof queryObj.q === "string" && queryObj.q.trim() !== "") {
    const qValue = queryObj.q; // TypeScript now knows qValue is a string here

    // Gather other filters, ensuring we don't include 'q' itself
    const otherFilters = Object.entries(queryObj)
      .filter(([key]) => key !== "q" && queryObj[key] !== undefined) // Exclude 'q' and undefined values
      .map(([key, value]) => {
        try {
          // Stringify value for consistent display, handle potential circular refs
          return `${key}: ${JSON.stringify(value)}`;
        } catch {
          return `${key}: [Unserializable]`; // Fallback for unserializable values
        }
      })
      .join(", ");

    return otherFilters ? `${qValue} (${otherFilters})` : qValue;
  }

  // 4. Fallback: Stringify the whole object if 'q' isn't the primary identifier
  try {
    const str = JSON.stringify(queryObj);
    // Limit length for display
    return str.length > 50 ? str.substring(0, 47) + "..." : str;
  } catch (e) {
    return "[Unstringifiable Query]"; // Handle potential stringify errors
  }
};

// --- Generic Fetch Function (reuse or adapt) ---
async function fetchSearchData<T>(endpoint: string): Promise<T[]> {
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
    throw error;
  }
}

// --- Main Component ---
export default function SearchAnalyticsCharts() {
  // --- State ---
  const [topSearch, setTopSearch] = useState<{ data: TopSearchData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [dailyVolume, setDailyVolume] = useState<{ data: DailyVolumeData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [successDist, setSuccessDist] = useState<{ data: SuccessDistributionData[]; loading: boolean; error: Error | null }>({
    data: [],
    loading: true,
    error: null,
  });
  const [noResult, setNoResult] = useState<{ data: NoResultData[]; loading: boolean; error: Error | null }>({ data: [], loading: true, error: null });

  // --- Data Fetching ---
  useEffect(() => {
    const fetchAllData = async () => {
      fetchSearchData<TopSearchData>("/top-search")
        .then((data) => setTopSearch({ data, loading: false, error: null }))
        .catch((error) => setTopSearch({ data: [], loading: false, error }));

      fetchSearchData<DailyVolumeData>("/daily-search-volume")
        .then((data) => setDailyVolume({ data, loading: false, error: null }))
        .catch((error) => setDailyVolume({ data: [], loading: false, error }));

      fetchSearchData<SuccessDistributionData>("/search-success-distribution")
        .then((data) => setSuccessDist({ data, loading: false, error: null }))
        .catch((error) => setSuccessDist({ data: [], loading: false, error }));

      fetchSearchData<NoResultData>("/no-result-queries")
        .then((data) => setNoResult({ data, loading: false, error: null }))
        .catch((error) => setNoResult({ data: [], loading: false, error }));
    };

    fetchAllData();
  }, []);

  // --- Render Helper ---
  const renderChartContent = (
    state: { loading: boolean; error: Error | null; data: any[] },
    ChartComponent: React.ReactNode,
    noDataMessage = "No data available."
  ) => {
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

  // --- Processed Data with Formatted Labels (using useMemo) ---
  const processedTopSearch = useMemo(() => {
    return topSearch.data
      .map((item) => ({
        formattedLabel: formatQueryObject(item.search_query),
        originalQuery: item.search_query,
        count: item.count,
      }))
      .sort((a, b) => b.count - a.count); // Sort descending by count
    // Optional: Take top N, e.g., .slice(0, 15);
  }, [topSearch.data]);

  const processedNoResult = useMemo(() => {
    return noResult.data
      .map((item) => ({
        formattedLabel: formatQueryObject(item.label),
        originalQuery: item.label,
        total: item.total, // Keep original key name
      }))
      .sort((a, b) => b.total - a.total); // Sort descending
    // Optional: Take top N, e.g., .slice(0, 15);
  }, [noResult.data]);

  // --- JSX ---
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      {/* 1. Top Search Queries - Horizontal Bar Chart */}
      <Card className="bg-[hsl(var(--chart-bg-1))]">
        <CardHeader>
          <CardTitle>Top Search Queries</CardTitle>
          <CardDescription>Most frequent search queries entered.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            topSearch, // Use original state for loading/error check
            <ChartContainer config={{ count: { label: "Frequency", color: "hsl(var(--chart-1))" } }} className="min-h-[350px]">
              <ResponsiveContainer width="100%" height={350}>
                {/* Use processedTopSearch for chart data */}
                <BarChart data={processedTopSearch} layout="vertical" margin={{ top: 5, right: 10, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" dataKey="count" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="formattedLabel" // Use the formatted label
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--foreground)/.6)"
                    fontSize={10}
                    width={150} // Adjust width for potentially long formatted labels
                    // Truncation can still be useful
                    tickFormatter={(value) => (value.length > 30 ? `${value.substring(0, 27)}...` : value)}
                  />
                  {/* Customize tooltip content if needed to show original query object */}
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" nameKey="formattedLabel" labelKey="count" />} />
                  <Bar dataKey="count" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 2. Daily Search Volume - Line Chart */}
      <Card className="bg-[hsl(var(--chart-bg-1))]">
        <CardHeader>
          <CardTitle>Daily Search Volume</CardTitle>
          <CardDescription>Total searches performed each day.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            dailyVolume,
            <ChartContainer config={{ total: { label: "Total Searches", color: "hsl(var(--chart-1))" } }} className="min-h-[350px]">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={dailyVolume.data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis dataKey="total" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                  <Line type="monotone" dataKey="total" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 3. Search Success Distribution - Pie/Donut Chart */}
      <Card className="flex flex-col bg-[hsl(var(--chart-bg-1))]">
        <CardHeader>
          <CardTitle>Search Success Rate</CardTitle>
          <CardDescription>Distribution of searches returning results vs. none.</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {renderChartContent(
            successDist,
            <ChartContainer config={{}} className="mx-auto aspect-square max-h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* Ensure nameKey="label" matches the data property */}
                  <ChartTooltip content={<ChartTooltipContent hideLabel nameKey="label" />} />
                  <Pie
                    data={successDist.data}
                    dataKey="total"
                    nameKey="label" // Key for Legend/Tooltip labels
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    innerRadius={60} // Donut style
                    paddingAngle={2}
                  >
                    {successDist.data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS_SUCCESS_DIST[index % PIE_COLORS_SUCCESS_DIST.length]} />
                    ))}
                  </Pie>
                  <Legend verticalAlign="bottom" height={40} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          )}
        </CardContent>
      </Card>

      {/* 4. Top No-Result Queries - Horizontal Bar Chart */}
      <Card className="bg-[hsl(var(--chart-bg-1))]">
        <CardHeader>
          <CardTitle>Top No-Result Queries</CardTitle>
          <CardDescription>Frequent searches that returned no products.</CardDescription>
        </CardHeader>
        <CardContent>
          {renderChartContent(
            noResult, // Use original state for loading/error check
            <ChartContainer config={{ total: { label: "Frequency", color: "hsl(var(--chart-1))" } }} className="min-h-[350px]">
              <ResponsiveContainer width="100%" height={350}>
                {/* Use processedNoResult for chart data */}
                <BarChart data={processedNoResult} layout="vertical" margin={{ top: 5, right: 10, left: 150, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" dataKey="total" stroke="hsl(var(--foreground)/.6)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis
                    dataKey="formattedLabel" // Use the formatted label
                    type="category"
                    tickLine={false}
                    axisLine={false}
                    stroke="hsl(var(--foreground)/.6)"
                    fontSize={10}
                    width={150}
                    tickFormatter={(value) => (value.length > 1000 ? `${value.substring(0, 27)}...` : value)}
                  />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" nameKey="formattedLabel" labelKey="total" />} />
                  <Bar dataKey="total" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>,
            "No zero-result queries found." // Custom message for no data
          )}
        </CardContent>
      </Card>
    </div>
  );
}
